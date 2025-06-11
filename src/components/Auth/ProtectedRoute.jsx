import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { authPaths } from "../../lib/constants";

const ProtectedRoute = ({ children, authentication = true, role = "user" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    // Check if user should be authenticated
    if (authentication) {
      if (!userData || !userData?.isAuthenticated) {
        toast.error("Please Login to continue!");
        navigate("/login");
      }

      //   if loggedIn user should be admin only
      if (role === "admin" && (!userData?.role || userData?.role !== "admin")) {
        toast.error("You cannot acces this resource!");
        navigate("/");
      }
    }

    // Check if user should not be authenticated
    else if (!authentication && userData && userData?.isAuthenticated) {
      if (authPaths.includes(location.pathname)) {
        navigate("/");
      }
    }
  }, [userData, navigate, authentication]);

  return <>{children}</>;
};

export default ProtectedRoute;
