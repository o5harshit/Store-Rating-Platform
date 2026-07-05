import ProtectedAuthRoute from "@/lib/ProtectedAuthRoute";
import Login from "@/Pages/Auth/Login";
import Register from "@/Pages/Auth/Register";
import { Navigate } from "react-router-dom";

export const authRoutes = [
  {
    path: "/",
    element: <Navigate to="/register" replace />,
  },

  {
    path: "*",
    element: <Navigate to="/register" replace />,
  },

  {
    path: "/login",
    element: (
      <ProtectedAuthRoute>
        <Login />
      </ProtectedAuthRoute>
    ),
  },

  {
    path: "/register",
    element: (
      <ProtectedAuthRoute>
        <Register />
      </ProtectedAuthRoute>
    ),
  },
];