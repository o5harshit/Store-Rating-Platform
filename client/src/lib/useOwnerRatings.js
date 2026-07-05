/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { apiClient } from "@/lib/api-client";
import { GET_STORE_RATINGS } from "@/utils/constants";

export default function useOwnerRatings() {
  const [stores, setStores] = useState([]);
  const [loadingRatings, setLoadingRatings] = useState(true);

  const fetchRatings = async () => {
    try {
      setLoadingRatings(true);

      const response = await apiClient.get(
        GET_STORE_RATINGS,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setStores(response.data.stores);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load store ratings."
      );
    } finally {
      setLoadingRatings(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  return {
    stores,
    loadingRatings,
    fetchRatings,
  };
}