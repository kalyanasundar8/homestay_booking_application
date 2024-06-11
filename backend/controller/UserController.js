import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../Models/UserModel.js";
import asyncHandler from "express-async-handler";

//? [ Create user, Route => POST/api/users/register_user ]
const registerUser = asyncHandler(async (req, res) => {
  //? Destructure a user
  const { name, email } = req.body;

  //? Check all fields are filled
  if (!name || !email) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  //? Check the user email it is already exists
  const userExists = await User.findOne({ email });

  if (userExists === null) {
    //? Create a user account
    const user = await User.create({
      name,
      email,
      verified: false,
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

//? [ setpassword user, Route => POST/api/users/set_password ]
const setPassword = asyncHandler(async (req, res) => {
  const { password, confirmPassword, token } = req.body;

  if (!password || !confirmPassword) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decoded.id;

  const userExists = await User.findOne({ _id: userId });

  if (userExists === null) {
    res
      .status(400)
      .json({ mssg: "We can't find the user, Please create an account" });
  } else {
    //? Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);

    const user = await User.findOneAndUpdate(
      { _id: userExists.id },
      { $set: { verified: true, password: hasedPassword } },
      { new: true }
    );
    if (user) {
      res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400).json({ mssg: "Invalid credentials" });
    }
  }
});

//? [ Login user, Route => POST/api/users/login_user ]
const loginUser = asyncHandler(async (req, res) => {
  //? Destructure users email and password from the model
  const { email, password } = req.body;

  //? find the user email
  const userExists = await User.findOne({ email });

  if (userExists.verified === true) {
    //? hash the password and allow to login
    if (userExists && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: userExists.id,
        name: userExists.name,
        email: userExists.email,
        token: generateToken(userExists._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user credentials");
    }
  } else {
    res.status(400).json({
      id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      token: generateToken(userExists._id)
    })
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

export { registerUser, setPassword, loginUser, logoutUser };
