import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import AuthCard from "@/components/Auth/AuthCard";
import AuthLayout from "@/components/Auth/AuthLayout";
import PasswordInput from "@/components/Auth/PasswordInput";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { apiClient } from "@/lib/api-client";
import { REGISTER_ROUTE } from "@/utils/constants";
import { loginSuccess } from "@/redux/slices/authSlice";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const roleRedirects = {
  ADMIN: "/admin/dashboard",
  OWNER: "/owner/dashboard",
  USER: "/user/dashboard",
};

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => emailRegex.test(email);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name.trim())
      return toast.error("Full Name is required");

    if (!name.trim()) {
      return toast.error("Name is required");
    }

    if (!email.trim())
      return toast.error("Email is required");

    if (!validateEmail(email))
      return toast.error("Please enter a valid email");

    if (!address.trim())
      return toast.error("Address is required");

    if (address.length > 400)
      return toast.error(
        "Address cannot exceed 400 characters"
      );

    if (!password)
      return toast.error("Password is required");

    if (password.length < 8 || password.length > 16)
      return toast.error(
        "Password should be between 8 and 16 characters"
      );

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;

    if (!passwordRegex.test(password))
      return toast.error(
        "Password must contain one uppercase letter and one special character"
      );

    if (password !== confirmPassword)
      return toast.error("Passwords do not match");

    try {
      setLoading(true);

      const response = await apiClient.post(
        REGISTER_ROUTE,
        {
          name,
          email,
          address,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);

      if (response.data.success) {
        dispatch(loginSuccess(response.data.user));

        toast.success(response.data.message);

        navigate(
          roleRedirects[response.data.user.role]
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Join the smartest rating community."
      subtitle="Discover stores, submit ratings, and help others make better decisions with our modern rating platform."
    >
      <AuthCard
        title="Create Account"
        description="Register as a normal user to start rating stores."
      >
        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >
          {/* Full Name */}

          <div className="space-y-2">
            <Label className="text-slate-200">
              Full Name
            </Label>

            <Input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Enter your full name"
              className="border-slate-700 bg-slate-900 text-white placeholder:text-slate-500"
            />
          </div>

          {/* Email */}

          <div className="space-y-2">
            <Label className="text-slate-200">
              Email
            </Label>

            <Input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="example@gmail.com"
              className="border-slate-700 bg-slate-900 text-white placeholder:text-slate-500"
            />
          </div>

          {/* Address */}

          <div className="space-y-2">
            <Label className="text-slate-200">
              Address
            </Label>

            <Textarea
              rows={3}
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              placeholder="Enter your address"
              className="border-slate-700 bg-slate-900 text-white placeholder:text-slate-500"
            />
          </div>

          {/* Password */}

          <div className="space-y-2">
            <Label className="text-slate-200">
              Password
            </Label>

            <PasswordInput
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="********"
            />
          </div>

          {/* Confirm Password */}

          <div className="space-y-2">
            <Label className="text-slate-200">
              Confirm Password
            </Label>

            <PasswordInput
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              placeholder="********"
            />
          </div>

          {/* Button */}

          <Button
            type="submit"
            disabled={loading}
            className="h-12 w-full bg-indigo-600 hover:bg-indigo-700"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </Button>

          {/* Login */}

          <p className="text-center text-sm text-slate-400">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Sign In
            </button>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}