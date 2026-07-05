import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { apiClient } from "@/lib/api-client";
import { UPDATE_PASSWORD } from "@/utils/constants";

export default function UpdatePasswordDialog({
  open,
  setOpen,
}) {
  const user = useSelector((state) => state.auth.user);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const userName = user?.name || "";

  const avatar =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "";

  const resetForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleDialogChange = (value) => {
    setOpen(value);

    if (!value) {
      resetForm();
    }
  };

  const handleUpdatePassword = async () => {
    if (!currentPassword.trim()) {
      return toast.error("Current password is required.");
    }

    if (!newPassword.trim()) {
      return toast.error("New password is required.");
    }

    if (newPassword.length < 6) {
      return toast.error(
        "New password must be at least 6 characters.",
      );
    }

    if (!confirmPassword.trim()) {
      return toast.error(
        "Confirm password is required.",
      );
    }

    if (newPassword !== confirmPassword) {
      return toast.error(
        "New password and confirm password do not match.",
      );
    }

    if (currentPassword === newPassword) {
      return toast.error(
        "New password must be different from current password.",
      );
    }

    try {
      setLoading(true);

      const response = await apiClient.post(
        UPDATE_PASSWORD,
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        {
          withCredentials: true,
        },
      );

      if (response.data.success) {
        toast.success(
          response.data.message ||
            "Password updated successfully.",
        );

        resetForm();

        setOpen(false);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update password.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleDialogChange}
    >
      <DialogContent className="border-slate-800 bg-slate-950 text-white sm:max-w-md">

        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Update Password
          </DialogTitle>

          <DialogDescription className="text-center text-slate-400">
            Verify your current password and enter a new password.
          </DialogDescription>
        </DialogHeader>

        {/* User Info */}

        <div className="flex flex-col items-center py-4">

          <Avatar className="h-20 w-20">
            <AvatarFallback className="bg-indigo-600 text-2xl text-white">
              {avatar}
            </AvatarFallback>
          </Avatar>

          <h2 className="mt-3 text-lg font-semibold">
            {userName}
          </h2>

        </div>

        {/* Password Form */}

        <div className="space-y-4">

          {/* Current Password */}

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Current Password
            </label>

            <Input
              type="password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(e.target.value)
              }
              placeholder="Enter current password"
              className="border-slate-700 bg-slate-900 text-white"
            />
          </div>

          {/* New Password */}

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              New Password
            </label>

            <Input
              type="password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              placeholder="Enter new password"
              className="border-slate-700 bg-slate-900 text-white"
            />
          </div>

          {/* Confirm Password */}

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Confirm Password
            </label>

            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              placeholder="Confirm new password"
              className="border-slate-700 bg-slate-900 text-white"
            />
          </div>

          <Button
            onClick={handleUpdatePassword}
            disabled={loading}
            className="w-full"
          >
            {loading
              ? "Updating..."
              : "Update Password"}
          </Button>

        </div>

      </DialogContent>
    </Dialog>
  );
}