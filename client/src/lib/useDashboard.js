import { useEffect, useState } from "react";
import { toast } from "sonner";

import { apiClient } from "./api-client";
import { ADMIN_DASHBOARD } from "@/utils/constants";

export default function useDashboard() {
  const [loading, setLoading] = useState(true);

  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const response = await apiClient.get(
          ADMIN_DASHBOARD,
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          setDashboardStats(response.data.dashboard);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return {
    dashboardStats,
    loading,
  };
}