import express from "express";
import { authenticate } from "../../middleware/auth.js";
import { getAllUsers } from "../../Controllers/Admin/GetUsers.js";
import { authorizeRoles } from "../../middleware/role.js";
import { createUser } from "../../Controllers/Admin/CreateUsers.js";
import { adminDashboard } from "../../Controllers/Admin/DashboardStats.js";
import { filterUsers } from "../../Controllers/Admin/filterusers.js";
import { filterStores } from "../../Controllers/Admin/filterstores.js";
import { createStore } from "../../Controllers/Admin/createstore.js";
import { getStoreOwners } from "../../Controllers/Admin/GetOwner.js";
import { updateUser } from "../../Controllers/Admin/updateUser.js";
import { deleteUser } from "../../Controllers/Admin/deleteUser.js";
import { updateStore } from "../../Controllers/Admin/updateStore.js";
import { deleteStore } from "../../Controllers/Admin/deleteStore.js";

const commonRoutes = express.Router();



commonRoutes.get("/filterusers",authenticate,authorizeRoles("ADMIN","USER"), filterUsers);


commonRoutes.get("/filterstores",authenticate,authorizeRoles("ADMIN","USER"),filterStores);



export default commonRoutes;
