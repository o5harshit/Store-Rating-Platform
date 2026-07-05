import express from "express";
import { submitOrUpdateRating } from "../../Controllers/User/submitOrUpdateRating.js";
import { authorizeRoles } from "../../middleware/role.js";
import { authenticate } from "../../middleware/auth.js";


const userRoutes = express.Router();

userRoutes.post("/rating",authenticate,authorizeRoles("USER"),submitOrUpdateRating);

export default userRoutes;