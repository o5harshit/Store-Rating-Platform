import { RouterProvider } from "react-router-dom";

import router from "./AppRouter";

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}