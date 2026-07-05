import { createStore } from "../Controllers/Store/CreateStore.js";
import { getStores } from "../Controllers/Store/GetStores.js";
import { getStoreById } from "../Controllers/Store/GetStoreById.js";
import { updateStore } from "../Controllers/Store/UpdateStore.js";
import { deleteStore } from "../Controllers/Store/DeleteStore.js";

router.post(
  "/createStore",
  authenticate,
  authorizeRoles("ADMIN"),
  createStore
);

router.get(
  "/getStores",
  authenticate,
  getStores
);

router.get(
  "/getStoreById/:id",
  authenticate,
  getStoreById
);

router.put(
  "/updateStore/:id",
  authenticate,
  authorizeRoles("ADMIN"),
  updateStore
);

router.delete(
  "/deleteStore/:id",
  authenticate,
  authorizeRoles("ADMIN"),
  deleteStore
);