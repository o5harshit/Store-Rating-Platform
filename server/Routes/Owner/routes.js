import express from "express";

import { authenticate } from "../../middleware/auth.js";
import { getStoreRatings } from "../../Controllers/Owner/getStoreRatings.js";
import { authorizeRoles } from "../../middleware/role.js";

const ownerRoutes = express.Router();

ownerRoutes.get("/ratings",authenticate,authorizeRoles("OWNER"),getStoreRatings);

export default ownerRoutes;