import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import AuthCard from "@/components/Auth/AuthCard";
import AuthLayout from "@/components/Auth/AuthLayout";
import PasswordInput from "@/components/Auth/PasswordInput";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { apiClient } from "@/lib/api-client";
import { LOGIN_ROUTE } from "@/utils/constants";
import { loginSuccess } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const roleRedirects = {
  ADMIN: "/admin/dashboard",
  OWNER: "/owner/dashboard",
  USER: "/user/dashboard",
};

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => emailRegex.test(email);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error("Email is required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    if (!password.trim()) {
      return toast.error("Password is required");
    }

    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    try {
      setLoading(true);

      const response = await apiClient.post(
        LOGIN_ROUTE,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch(loginSuccess(response.data.user));

        toast.success(response.data.message);

        navigate(roleRedirects[response.data.user.role]);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Login to continue exploring stores, manage ratings, and access your personalized dashboard."
    >
      <AuthCard
        title="Sign In"
        description="Welcome back! Please login to your account."
      >
        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label className="text-slate-200">
              Email
            </Label>

            <Input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="border-slate-700 bg-slate-900 text-white placeholder:text-slate-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-200">
              Password
            </Label>

            <PasswordInput
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-slate-400">
              <input
                type="checkbox"
                className="accent-indigo-600"
              />
              Remember Me
            </label>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="h-12 w-full bg-indigo-600 hover:bg-indigo-700"
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>

          <p className="text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() =>
                navigate("/register")
              }
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Create Account
            </button>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}