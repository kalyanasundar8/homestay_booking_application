import express from "express";
import{
  registerUser,
  loginUser,
  logoutUser,
} from "../controller/UserController.js";

const router = express.Router();

router.post("/register_user", registerUser);

router.post("/login_user", loginUser);

router.post("/logout_user", logoutUser);

export default router;
