const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controller/UserController");

const router = express.Router();

router.post("/register_user", registerUser);

router.post("/login_user", loginUser);

router.post("/logout_user", logoutUser);

module.exports = router;
