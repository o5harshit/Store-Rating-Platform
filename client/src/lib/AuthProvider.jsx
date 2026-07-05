import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { apiClient } from "@/lib/api-client";
import { loginSuccess } from "@/redux/slices/authSlice";
import { GET_USER_INFO} from "@/utils/constants";

export default function AuthProvider({
  children,
}) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await apiClient.get(
          GET_USER_INFO,
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          dispatch(
            loginSuccess(response.data.user)
          );
        }
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        // User is not logged in
      } finally {
        setLoading(false);
      } 
    };

    verifyUser();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <h1 className="text-lg text-white">
          Loading...
        </h1>
      </div>
    );
  }

  return children;
}