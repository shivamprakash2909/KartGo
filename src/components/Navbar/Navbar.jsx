import { useState } from "react";
import "./navbar.css";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/userSlice";
import { PathConstants } from "../../lib/constants";

const Navbar = () => {
  const dispatch = useDispatch();
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
      <h2 className="logo">KartGo</h2>
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>
          Home
        </Link>
        <a href="#itemList" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>
          Products
        </a>
      </ul>
      <div className="navbar-right">
        {userData && userData?.isAuthenticated ? (
          <button onClick={logoutHandler}>Logout</button>
        ) : (
          <Link to={PathConstants.LOGIN}>
            <button>Log in</button>
          </Link>
        )}

        <Link to={PathConstants.DASHBOARD}>
          <button>Dashboard</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
