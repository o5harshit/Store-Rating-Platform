import PrivateRoute from "@/lib/PrivateRoute";
import RoleRoute from "@/lib/RoleRoute";
import AdminDashboard from "@/Pages/Dashboard/AdminDashboard";
import OwnerDashboard from "@/Pages/Dashboard/OwnerDashboard";
import UserDashboard from "@/Pages/Dashboard/UserDashboard";


export const dashboardRoutes = [
  {
    path: "/user/dashboard",
    element: (
      <PrivateRoute>
        <RoleRoute allowedRoles={["USER"]}>
          <UserDashboard />
        </RoleRoute>
      </PrivateRoute>
    ),
  },

  {
    path: "/owner/dashboard",
    element: (
      <PrivateRoute>
        <RoleRoute allowedRoles={["OWNER"]}>
          <OwnerDashboard />
        </RoleRoute>
      </PrivateRoute>
    ),
  },

  {
    path: "/admin/dashboard",
    element: (
      <PrivateRoute>
        <RoleRoute allowedRoles={["ADMIN"]}>
          <AdminDashboard />
        </RoleRoute>
      </PrivateRoute>
    ),
  },
];