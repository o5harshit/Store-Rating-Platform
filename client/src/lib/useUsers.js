import { useEffect, useState } from "react";
import { toast } from "sonner";

import { apiClient } from "./api-client";
import {
  DELETE_USER,
  FILTER_USERS,
  UPDATE_USER,
} from "@/utils/constants";

export default function useUsers() {
  const [users, setUsers] = useState([]);

  const [loadingUsers, setLoadingUsers] = useState(false);

  const [updatingUser, setUpdatingUser] = useState(false);

  const [deletingUser, setDeletingUser] = useState(false);

  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: "",
    role: "ALL",
  });

  const [page, setPage] = useState(1);

  const limit = 10;

  const [totalPages, setTotalPages] = useState(1);

  const [totalRecords, setTotalRecords] = useState(0);

  const fetchUsers = async (
    currentPage = page,
    currentFilters = filters
  ) => {
    try {
      setLoadingUsers(true);

      const response = await apiClient.get(
        FILTER_USERS,
        {
          params: {
            page: currentPage,
            limit,

            name: currentFilters.name,

            email: currentFilters.email,

            address: currentFilters.address,

            role:
              currentFilters.role === "ALL"
                ? ""
                : currentFilters.role,
          },

          withCredentials: true,
        }
      );

      if (response.data.success) {
        setUsers(response.data.users);

        setTotalPages(response.data.totalPages);

        setTotalRecords(response.data.totalRecords);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load users."
      );
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, []);

  const handleSearch = () => {
    setPage(1);

    fetchUsers(1, filters);
  };

  const handleReset = () => {
    const resetFilters = {
      name: "",
      email: "",
      address: "",
      role: "ALL",
    };

    setFilters(resetFilters);

    setPage(1);

    fetchUsers(1, resetFilters);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);

    fetchUsers(newPage, filters);
  };

  const updateUser = async (
    userId,
    updatedFields
  ) => {
    try {
      setUpdatingUser(true);

      const response = await apiClient.post(
        `${UPDATE_USER}/${userId}`,
        updatedFields,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(
          response.data.message ||
            "User updated successfully."
        );

        await fetchUsers(page, filters);

        return true;
      }

      return false;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update user."
      );

      return false;
    } finally {
      setUpdatingUser(false);
    }
  };

  const deleteUser = async (userId) => {
  try {
    setDeletingUser(true);

    const response = await apiClient.post(
      `${DELETE_USER}/${userId}`,{},
      {
        withCredentials: true,
      }
    );

    if (response.data.success) {
      toast.success(
        response.data.message ||
          "User deleted successfully."
      );

      // If deleting the last user on the current page,
      // move to the previous page
      const nextPage =
        users.length === 1 && page > 1
          ? page - 1
          : page;

      if (nextPage !== page) {
        setPage(nextPage);
      }

      await fetchUsers(
        nextPage,
        filters
      );

      return true;
    }

    return false;
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Failed to delete user."
    );

    return false;
  } finally {
    setDeletingUser(false);
  }
};

  return {
    users,

    filters,

    setFilters,

    page,

    totalPages,

    totalRecords,

    loadingUsers,

    updatingUser,

    handleSearch,

    handleReset,

    handlePageChange,

    fetchUsers,

    updateUser,

    deleteUser,
  };
}