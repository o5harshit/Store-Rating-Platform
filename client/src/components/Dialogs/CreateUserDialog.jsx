import { useState } from "react";
import { toast } from "sonner";

import { apiClient } from "@/lib/api-client";
import { CREATE_USER } from "@/utils/constants";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreateUserDialog({
  open,
  setOpen,
  refreshUsers
}) {

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({

    name: "",

    email: "",

    password: "",

    address: "",

    role: "USER",

  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async () => {

    if (!formData.name.trim())
      return toast.error("Name is required");

    if (!formData.email.trim())
      return toast.error("Email is required");

    if (!formData.password.trim())
      return toast.error("Password is required");

    if (!formData.address.trim())
      return toast.error("Address is required");

    try {

      setLoading(true);

      const response = await apiClient.post(
        CREATE_USER,
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {

        toast.success(
          response.data.message
        );
        refreshUsers();

        setFormData({
          name: "",
          email: "",
          password: "",
          address: "",
          role: "USER",
        });

        setOpen(false);

        // here you can refresh users

      }

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to create user."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

      <DialogContent className="max-w-lg bg-slate-950 border-slate-800 text-white">

        <DialogHeader>

          <DialogTitle>
            Create New User
          </DialogTitle>

        </DialogHeader>

        <div className="space-y-5">

          <div>

            <Label>Name</Label>

            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

          </div>

          <div>

            <Label>Email</Label>

            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />

          </div>

          <div>

            <Label>Password</Label>

            <Input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />

          </div>

          <div>

            <Label>Address</Label>

            <Textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
            />

          </div>

          <div>

            <Label>Role</Label>

            <Select
              value={formData.role}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  role: value,
                })
              }
            >

              <SelectTrigger>

                <SelectValue />

              </SelectTrigger>

              <SelectContent>

                <SelectItem value="ADMIN">
                  Admin
                </SelectItem>

                <SelectItem value="OWNER">
                  Store Owner
                </SelectItem>

                <SelectItem value="USER">
                  User
                </SelectItem>

              </SelectContent>

            </Select>

          </div>

          <Button
            className="w-full"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading
              ? "Creating..."
              : "Create User"}
          </Button>

        </div>

      </DialogContent>

    </Dialog>

  );

}