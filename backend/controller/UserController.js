import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../Models/UserModel.js";
import asyncHandler from "express-async-handler";

//? [ Create user, Route => POST/api/users/register_user ]
const registerUser = asyncHandler(async (req, res) => {
  //? Destructure a user from the model
  const { name, email, password } = req.body;

  //? Check all fields are filled
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  //? Check the user email it is already exists
  const userExists = await User.findOne({ email });

  if (userExists === null) {
    //? Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);

    //? Create a user account
    const user = await User.create({
      name,
      email,
      password: hasedPassword,
    });

    //? Check the user
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user credentials");
    }
  } else {
    res.status(400);
    throw new Error("User already exists");
  }
});

//? [ Login user, Route => POST/api/users/login_user ]
const loginUser = asyncHandler(async (req, res) => {
  //? Destructure users email and password from the model
  const { email, password } = req.body;

  //? find the user email
  const user = await User.findOne({ email });

  //? hash the password and allow to login
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user credentials");
  }
});

//? [ Logout user, Route => POST/api/users/logout_user ]
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Logout a user" });
});

//! Generate authentication token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
};

export { registerUser, loginUser, logoutUser };
