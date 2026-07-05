import { useState } from "react";
import { motion } from "framer-motion";

import Navbar from "@/components/Common/Navbar";
import Pagination from "@/components/Common/Pagination";

import DashboardStats from "@/components/Dashboard/Admin/DashboardStats";
import UserFilterBar from "@/components/Dashboard/Admin/UserFilterBar";
import UserTable from "@/components/Dashboard/Admin/UserTable";
import StoreTable from "@/components/Dashboard/Admin/StoreTable";

import CreateUserDialog from "@/components/Dialogs/CreateUserDialog";
import CreateStoreDialog from "@/components/Dialogs/CreateStoreDialog";
import UpdateUserDialog from "@/components/Dialogs/UpdateUserDialog";
import DeleteUserDialog from "@/components/Dialogs/DeleteUserDialog";

import UpdateStoreDialog from "@/components/Dialogs/UpdateStoreDialog";
import DeleteStoreDialog from "@/components/Dialogs/DeleteStoreDialog";

import useDashboard from "@/lib/useDashboard";
import useUsers from "@/lib/useUsers";
import useStores from "@/lib/useStores";

export default function AdminDashboard() {
  const { dashboardStats, loading } = useDashboard();

  // ================= CREATE DIALOGS =================

  const [openCreateUser, setOpenCreateUser] =
    useState(false);

  const [openCreateStore, setOpenCreateStore] =
    useState(false);

  // ================= USER DIALOGS =================

  const [openUpdateUser, setOpenUpdateUser] =
    useState(false);

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [openDeleteUser, setOpenDeleteUser] =
    useState(false);

  const [userToDelete, setUserToDelete] =
    useState(null);

  // ================= STORE DIALOGS =================

  const [openUpdateStore, setOpenUpdateStore] =
    useState(false);

  const [selectedStore, setSelectedStore] =
    useState(null);

  const [openDeleteStore, setOpenDeleteStore] =
    useState(false);

  const [storeToDelete, setStoreToDelete] =
    useState(null);

  // ================= USERS =================

  const {
    users,
    filters,
    setFilters,
    page,
    totalPages,
    totalRecords,
    loadingUsers,
    updatingUser,
    deletingUser,
    handleSearch,
    handleReset,
    handlePageChange,
    fetchUsers,
    updateUser,
    deleteUser,
  } = useUsers();

  // ================= STORES =================

  const {
    stores,
    filters: storeFilters,
    setFilters: setStoreFilters,
    page: storePage,
    totalPages: storeTotalPages,
    totalRecords: storeTotalRecords,
    loadingStores,
    updatingStore,
    deletingStore,
    handleSearch: handleStoreSearch,
    handleReset: handleStoreReset,
    handlePageChange: handleStorePage,
    fetchStores,
    updateStore,
    deleteStore,
  } = useStores();

  // ================= UPDATE USER =================

  const handleOpenUpdateUser = (user) => {
    setSelectedUser(user);

    setOpenUpdateUser(true);
  };

  const handleUpdateUser = async (updatedFields) => {
    if (!selectedUser) {
      return;
    }

    const success = await updateUser(
      selectedUser.id,
      updatedFields
    );

    if (success) {
      setOpenUpdateUser(false);

      setSelectedUser(null);
    }
  };

  // ================= DELETE USER =================

  const handleOpenDeleteUser = (user) => {
    setUserToDelete(user);

    setOpenDeleteUser(true);
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) {
      return;
    }

    const success = await deleteUser(
      userToDelete.id
    );

    if (success) {
      setOpenDeleteUser(false);

      setUserToDelete(null);
    }
  };

  // ================= UPDATE STORE =================

  const handleOpenUpdateStore = (store) => {
    setSelectedStore(store);

    setOpenUpdateStore(true);
  };

  const handleUpdateStore = async (updatedFields) => {
    if (!selectedStore) {
      return;
    }

    const success = await updateStore(
      selectedStore.id,
      updatedFields
    );

    if (success) {
      setOpenUpdateStore(false);

      setSelectedStore(null);
    }
  };

  // ================= DELETE STORE =================

  const handleOpenDeleteStore = (store) => {
    setStoreToDelete(store);

    setOpenDeleteStore(true);
  };

  const handleDeleteStore = async () => {
    if (!storeToDelete) {
      return;
    }

    const success = await deleteStore(
      storeToDelete.id
    );

    if (success) {
      setOpenDeleteStore(false);

      setStoreToDelete(null);
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10">

        {/* ================= HERO ================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold text-white">
              Welcome Back, Admin 👋
            </h1>

            <p className="mt-3 text-slate-400">
              Manage users, stores and monitor platform activities.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setOpenCreateUser(true)}
              className="rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
            >
              + Add User
            </button>

            <button
              onClick={() => setOpenCreateStore(true)}
              className="rounded-lg bg-emerald-600 px-5 py-3 font-medium text-white transition hover:bg-emerald-700"
            >
              + Add Store
            </button>
          </div>
        </motion.div>

        {/* ================= DASHBOARD STATS ================= */}

        <DashboardStats
          totalUsers={dashboardStats.totalUsers}
          totalStores={dashboardStats.totalStores}
          totalRatings={dashboardStats.totalRatings}
        />

        {/* ================= USERS ================= */}

        <section className="mt-12">
          <h2 className="mb-6 text-3xl font-bold text-white">
            Users
          </h2>

          <UserFilterBar
            filters={filters}
            setFilters={setFilters}
            onSearch={handleSearch}
            onReset={handleReset}
            showRole={true}
          />

          <div className="mt-8">
            {loadingUsers ? (
              <div className="py-10 text-center text-white">
                Loading Users...
              </div>
            ) : (
              <>
                <UserTable
                  users={users}
                  onUpdateUser={handleOpenUpdateUser}
                  onDeleteUser={handleOpenDeleteUser}
                />

                <Pagination
                  page={page}
                  totalPages={totalPages}
                  totalRecords={totalRecords}
                  limit={10}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </section>

        {/* ================= STORES ================= */}

        <section className="mt-16">
          <h2 className="mb-6 text-3xl font-bold text-white">
            Stores
          </h2>

          <UserFilterBar
            filters={storeFilters}
            setFilters={setStoreFilters}
            onSearch={handleStoreSearch}
            onReset={handleStoreReset}
          />

          <div className="mt-8">
            {loadingStores ? (
              <div className="py-10 text-center text-white">
                Loading Stores...
              </div>
            ) : (
              <>
                <StoreTable
                  stores={stores}
                  onUpdateStore={handleOpenUpdateStore}
                  onDeleteStore={handleOpenDeleteStore}
                />

                <Pagination
                  page={storePage}
                  totalPages={storeTotalPages}
                  totalRecords={storeTotalRecords}
                  limit={10}
                  onPageChange={handleStorePage}
                />
              </>
            )}
          </div>
        </section>

        {/* ================= USER DIALOGS ================= */}

        <CreateUserDialog
          open={openCreateUser}
          setOpen={setOpenCreateUser}
          refreshUsers={fetchUsers}
        />

        <UpdateUserDialog
          open={openUpdateUser}
          setOpen={setOpenUpdateUser}
          user={selectedUser}
          onUpdate={handleUpdateUser}
          updating={updatingUser}
        />

        <DeleteUserDialog
          open={openDeleteUser}
          setOpen={setOpenDeleteUser}
          user={userToDelete}
          onDelete={handleDeleteUser}
          deleting={deletingUser}
        />

        {/* ================= STORE DIALOGS ================= */}

        <CreateStoreDialog
          open={openCreateStore}
          setOpen={setOpenCreateStore}
          fetchStores={fetchStores}
        />

        <UpdateStoreDialog
          open={openUpdateStore}
          setOpen={setOpenUpdateStore}
          store={selectedStore}
          onUpdate={handleUpdateStore}
          updating={updatingStore}
        />

        <DeleteStoreDialog
          open={openDeleteStore}
          setOpen={setOpenDeleteStore}
          store={storeToDelete}
          onDelete={handleDeleteStore}
          deleting={deletingStore}
        />
      </main>
    </div>
  );
}