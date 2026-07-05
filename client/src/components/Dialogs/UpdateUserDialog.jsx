import { useEffect, useState } from "react";
import { UserRound } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UpdateUserDialog({
  open,
  setOpen,
  user,
  onUpdate,
  updating,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
        role: user.role || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onUpdate(formData);
  };

  const avatar =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent className="border-slate-800 bg-slate-950 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Update User
          </DialogTitle>

          <DialogDescription className="text-slate-400">
            Change only the fields you want to update.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center py-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
            {avatar}
          </div>

          <h3 className="mt-3 font-semibold">
            {user?.name}
          </h3>

          <p className="text-sm text-slate-400">
            {user?.email}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Name
            </label>

            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter new name"
              className="border-slate-700 bg-slate-900"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Email
            </label>

            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter new email"
              className="border-slate-700 bg-slate-900"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              New Password
            </label>

            <Input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave empty to keep current password"
              className="border-slate-700 bg-slate-900"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Role
            </label>

            <Select
              value={formData.role}
              onValueChange={(value) =>
                setFormData((previous) => ({
                  ...previous,
                  role: value,
                }))
              }
            >
              <SelectTrigger className="border-slate-700 bg-slate-900">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ADMIN">
                  Admin
                </SelectItem>

                <SelectItem value="USER">
                  User
                </SelectItem>

                <SelectItem value="OWNER">
                  Store Owner
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={updating}
            className="w-full bg-indigo-600 hover:bg-indigo-700"
          >
            <UserRound className="mr-2 h-4 w-4" />

            {updating
              ? "Updating..."
              : "Update User"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}