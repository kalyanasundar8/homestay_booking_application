import express from "express";
import { loginAdmin, registerAdmin, setPassword } from "../controller/AdminController.js";

const adminRouter = express.Router();

adminRouter.post("/register_admin", registerAdmin);
adminRouter.post("/setpassword_admin", setPassword);
adminRouter.post("/login_admin", loginAdmin);

export default adminRouter;