import {
  Bell,
  KeyRound,
  LogOut,
  Store,
} from "lucide-react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import UpdatePasswordDialog from "@/components/Dialogs/UpdatePasswordDialog";

import { apiClient } from "@/lib/api-client";
import { LOGOUT_USER } from "@/utils/constants";
import { logout } from "@/redux/slices/authSlice";

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openPasswordDialog, setOpenPasswordDialog] =
    useState(false);

  const dashboardTitle =
    user?.role === "ADMIN"
      ? "Admin Dashboard"
      : user?.role === "OWNER"
        ? "Store Owner Dashboard"
        : "User Dashboard";

  const userName = user?.name || "";

  const avatar =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "";

  const handleLogout = async () => {
    try {
      const response = await apiClient.post(
        LOGOUT_USER,
        {},
        {
          withCredentials: true,
        },
      );

      if (response.data.success) {
        dispatch(logout());

        toast.success(response.data.message);

        navigate("/login", {
          replace: true,
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Logout failed.",
      );
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-indigo-600 p-3">
              <Store className="h-6 w-6 text-white" />
            </div>

            <div>

              <h1 className="text-xl font-bold text-white">
                Store Rating Platform
              </h1>

              <p className="text-sm text-slate-400">
                {dashboardTitle}
              </p>

            </div>

          </div>

          <div className="flex items-center gap-5">


            <div className="hidden text-right md:block">

              <p className="font-medium text-white">
                {userName}
              </p>

              <p className="text-xs text-slate-400">
                Welcome Back
              </p>

            </div>

            <Avatar>

              <AvatarFallback className="bg-indigo-600 text-white">
                {avatar}
              </AvatarFallback>

            </Avatar>

            <Button
              variant="outline"
              onClick={() =>
                setOpenPasswordDialog(true)
              }
              className="border-slate-700 bg-slate-900 text-white hover:bg-slate-800"
            >
              <KeyRound className="mr-2 h-4 w-4" />

              Update Password
            </Button>

            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-slate-700 bg-slate-900 text-white hover:bg-slate-800"
            >
              <LogOut className="mr-2 h-4 w-4" />

              Logout
            </Button>

          </div>

        </div>

      </header>

      <UpdatePasswordDialog
        open={openPasswordDialog}
        setOpen={setOpenPasswordDialog}
      />
    </>
  );
}