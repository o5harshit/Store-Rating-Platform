import express from "express";
import { register } from "../../Controllers/Auth/Register.js";
import { login } from "../../Controllers/Auth/Login.js";
import { logout } from "../../Controllers/Auth/Logout.js";
import { authenticate } from "../../middleware/auth.js";
import { UpdatePassword } from "../../Controllers/Auth/UpdatePassword.js";
import { getCurrentUser } from "../../Controllers/Auth/GetUserInfo.js";



const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/userInfo",authenticate,getCurrentUser);
authRoutes.post("/logout", authenticate,logout);
authRoutes.post("/updatePassword",authenticate,UpdatePassword);


export default authRoutes;