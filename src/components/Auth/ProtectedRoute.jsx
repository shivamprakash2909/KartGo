import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { authPaths } from "../../lib/constants";

const ProtectedRoute = ({ children, authentication = true, role = "user" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    setIsChecking(true);

    // Immediate check for authentication requirements
    if (authentication && (!userData || !userData.isAuthenticated)) {
      toast.error("Please login to continue!", { id: "not-logged-in" });
      navigate("/login", { replace: true });
      return;
    }

    // Admin role check
    if (authentication && role === "admin" && userData?.role !== "admin") {
      toast.error("You cannot access this resource!", { id: "access-denied" });
      navigate("/", { replace: true });
      return;
    }

    // Check for already authenticated users trying to access auth paths
    if (!authentication && userData?.isAuthenticated && authPaths.includes(location.pathname)) {
      navigate("/", { replace: true });
      return;
    }

    setIsChecking(false);
  }, [userData, navigate, authentication, role, location.pathname]);

  if (isChecking) {
    return null; // or a loading spinner
  }

  return children;
};

export default ProtectedRoute;
