import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { generateToken } from "../services/GenerateToken.js";

import Admin from "../Models/AdminModel.js";

//! [ Create admin, GET/api/admin/register_admin ]
const registerAdmin = asyncHandler(async (req, res) => {
    const { adminName, email } = req.body;

    //? Check all fields are filled
  if (!adminName || !email) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  //? Check the user email it is already exists
  const adminExists = await Admin.findOne({ email });

  if (adminExists === null) {
    //? Create a user account
    const admin = await Admin.create({
      adminName,
      email,
      verified: false,
    });

    //? Check the user
    if (admin) {
      res.status(201).json({
        id: admin.id,
        name: admin.name,
        email: admin.email,
        verified: admin.verified,
        rooms: [],
        token: generateToken(admin.id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  } else {
    res.status(400);
    throw new Error("Already exists");
  }
});

//? [ setpassword admin, Route => POST/api/admin/setpassword_admin ]
const setPassword = asyncHandler(async (req, res) => {
  const { password, confirmPassword, token } = req.body;

  if (!password || !confirmPassword) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const adminId = decoded.id;

  const adminExists = await Admin.findOne({ _id: adminId });

  if (adminExists === null) {
    res
      .status(400)
      .json({ mssg: "We can't find the user, Please create an account" });
  } else {
    //? Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);

    const admin = await Admin.findOneAndUpdate(
      { _id: adminExists.id },
      { $set: { verified: true, password: hasedPassword } },
      { new: true }
    );
    if (admin) {
      res.status(200).json({
        id: admin._id,
        name: admin.name,
        email: admin.email,
        verified: admin.verified
      });
    } else {
      res.status(400).json({ mssg: "Invalid credentials" });
    }
  }
});

//? [ Login user, Route => POST/api/admin/login_admin ]
const loginAdmin = asyncHandler(async (req, res) => {
  //? Destructure admin email and password
  const { email, password } = req.body;

  //? find the admin email
  const adminExists = await Admin.findOne({ email });

  if (adminExists.verified === true) {
    //? hash the password and allow to login
    if (adminExists && (await bcrypt.compare(password, adminExists.password))) {
      res.json({
        id: adminExists.id,
        name: adminExists.name,
        email: adminExists.email,
        verified: adminExists.verified,
        token: generateToken(adminExists._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user credentials");
    }
  } else {
    res.status(400).json({
      id: adminExists._id,
      name: adminExists.name,
      email: adminExists.email,
      verified: adminExists.verified,
      token: generateToken(adminExists._id)
    })
  }
});

export { registerAdmin, setPassword, loginAdmin };