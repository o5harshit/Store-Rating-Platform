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

const adminRoutes = express.Router();

adminRoutes.post("/createusers",authenticate,authorizeRoles("ADMIN"),createUser);

adminRoutes.post("/createstores",authenticate,authorizeRoles("ADMIN"),createStore);

adminRoutes.get("/dashboard",authenticate,authorizeRoles("ADMIN"),adminDashboard);

adminRoutes.get("/getusers",authenticate,authorizeRoles("ADMIN"),getAllUsers);

adminRoutes.get("/getownerinfo",authenticate,authorizeRoles("ADMIN"),getStoreOwners);

adminRoutes.post("/updateUserInfo/:id",authenticate,authorizeRoles("ADMIN"),updateUser);

// adminRoutes.get("/filterusers",authenticate,authorizeRoles("ADMIN","USER"), filterUsers);

adminRoutes.post("/deleteUser/:id",authenticate,authorizeRoles("ADMIN"),deleteUser);

// adminRoutes.get("/filterstores",authenticate,authorizeRoles("ADMIN","USER"),filterStores);

adminRoutes.post("/updateStore/:id",authenticate,authorizeRoles("ADMIN"),updateStore);

adminRoutes.post("/deleteStore/:id",authenticate,authorizeRoles("ADMIN"),deleteStore);


export default adminRoutes;
