import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const roleRedirects = {
  ADMIN: "/admin/dashboard",
  OWNER: "/owner/dashboard",
  USER: "/user/dashboard",
};

const ProtectedAuthRoute = ({ children }) => {
  const { user} = useSelector((state) => state.auth);

  if (user) {
    return (
      <Navigate
        to={roleRedirects[user.role] || "/user/dashboard"}
        replace
      />
    );
  }

  return children;
};

export default ProtectedAuthRoute;