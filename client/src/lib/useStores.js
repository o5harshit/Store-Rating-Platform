/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { apiClient } from "./api-client";

import {
  FILTER_STORES,
  UPDATE_STORE,
  DELETE_STORE,
} from "@/utils/constants";

export default function useStores() {
  const [stores, setStores] = useState([]);

  const [loadingStores, setLoadingStores] = useState(false);

  const [updatingStore, setUpdatingStore] = useState(false);

  const [deletingStore, setDeletingStore] = useState(false);

  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [page, setPage] = useState(1);

  const limit = 10;

  const [totalPages, setTotalPages] = useState(1);

  const [totalRecords, setTotalRecords] = useState(0);

  // ================= FETCH STORES =================

  
  const fetchStores = async (
    currentPage = page,
    currentFilters = filters
  ) => {
    try {
        console.log("fetchStores called");
      setLoadingStores(true);

      const response = await apiClient.get(
        FILTER_STORES,
        {
          params: {
            page: currentPage,
            limit,

            name: currentFilters.name,

            email: currentFilters.email,

            address: currentFilters.address,
          },

          withCredentials: true,
        }
      );

      if (response.data.success) {
        setStores(response.data.stores);

        setTotalPages(response.data.totalPages);

        setTotalRecords(response.data.totalRecords);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load stores."
      );
    } finally {
      setLoadingStores(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  // ================= SEARCH =================

  const handleSearch = () => {
    setPage(1);

    fetchStores(1, filters);
  };

  // ================= RESET =================

  const handleReset = () => {
    const resetFilters = {
      name: "",
      email: "",
      address: "",
    };

    setFilters(resetFilters);

    setPage(1);

    fetchStores(1, resetFilters);
  };

  // ================= PAGINATION =================

  const handlePageChange = (newPage) => {
    setPage(newPage);

    fetchStores(newPage, filters);
  };

  // ================= UPDATE STORE =================

  const updateStore = async (
    storeId,
    updatedFields
  ) => {
    try {
      setUpdatingStore(true);

      const response = await apiClient.post(
        `${UPDATE_STORE}/${storeId}`,
        updatedFields,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(
          response.data.message ||
            "Store updated successfully."
        );

        await fetchStores(page, filters);

        return true;
      }

      return false;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update store."
      );

      return false;
    } finally {
      setUpdatingStore(false);
    }
  };

  // ================= DELETE STORE =================

  const deleteStore = async (storeId) => {
    try {
      setDeletingStore(true);

      const response = await apiClient.post(
        `${DELETE_STORE}/${storeId}`,{},
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(
          response.data.message ||
            "Store deleted successfully."
        );

        const nextPage =
          stores.length === 1 && page > 1
            ? page - 1
            : page;

        if (nextPage !== page) {
          setPage(nextPage);
        }

        await fetchStores(
          nextPage,
          filters
        );

        return true;
      }

      return false;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete store."
      );

      return false;
    } finally {
      setDeletingStore(false);
    }
  };

  return {
    stores,

    filters,

    setFilters,

    page,

    totalPages,

    totalRecords,

    loadingStores,

    updatingStore,

    deletingStore,

    handleSearch,

    handleReset,

    handlePageChange,

    fetchStores,

    updateStore,

    deleteStore,
  };
}