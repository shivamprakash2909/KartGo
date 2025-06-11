import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/userSlice";

const Login = () => {
  const dispatch = useDispatch();

  const [formInput, setFormInput] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const fetchUserData = async (userId) => {
    try {
      const res = await fetch(`https://dummyjson.com/users/${userId}`);
      const userData = await res.json();

      // send this to redux
      dispatch(loginUser(userData));
    } catch (error) {
      console.error("Login Failed, error: ", error);
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formInput.username,
          password: formInput.password,
          expiresInMins: 30,
        }),
      });

      const data = await res.json();

      // Optional: Navigate based on role
      if (data && data.accessToken) {
        localStorage.setItem("kartgo-accessToken", data.accessToken);
        localStorage.setItem("kartgo-refreshToken", data.refreshToken);
        await fetchUserData(data.id);
      }
    } catch (error) {
      console.error("Login Failed, error: ", error);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={loginHandler} className="login-popup-container">
        <div className="login-popup-title">
          <h2>Login</h2>
          <img onClick={() => navigate("/")} src="./cross_icon.png" alt="cross-icon" />
        </div>

        <div className="login-popup-input">
          <input
            name="username"
            value={formInput.username}
            onChange={changeHandler}
            type="text"
            placeholder="Your Username"
            required
          />
          <input
            name="password"
            value={formInput.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
