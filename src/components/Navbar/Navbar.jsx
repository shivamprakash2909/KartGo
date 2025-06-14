import { useState } from "react";
import "./Navbar.css";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/userSlice";
import { PathConstants } from "../../lib/constants";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateToSection = (pageRoute, sectionId) => {
    navigate(pageRoute);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 10);
  };

  const { userData } = useSelector((state) => state.user);

  const [menu, setMenu] = useState("home");

  const logoutHandler = (e) => {
    e.preventDefault();

    localStorage.removeItem("kartgo-accessToken");
    localStorage.removeItem("kartgo-refreshToken");

    dispatch(logoutUser());
  };

  return (
    <div className="navbar">
      <Link to="/" className="prevent-select" style={{ textDecoration: "none" }}>
        <h2 className="logo">KartGo</h2>
      </Link>

      <ul className="navbar-menu prevent-select">
        <span
          onClick={() => {
            navigateToSection("/", "slogan-Banner");
            setMenu("home");
          }}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </span>
        <span
          onClick={() => {
            navigateToSection("/", "itemList");
            setMenu("menu");
          }}
          className={menu === "menu" ? "active" : ""}
        >
          Products
        </span>
      </ul>
      <div className="navbar-right">
        {userData && userData?.isAuthenticated && (
          <Link to={PathConstants.DASHBOARD}>
            <button>Dashboard</button>
          </Link>
        )}

        {userData && userData?.isAuthenticated ? (
          <button onClick={logoutHandler}>Logout</button>
        ) : (
          <Link to={PathConstants.LOGIN}>
            <button>Log in</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
