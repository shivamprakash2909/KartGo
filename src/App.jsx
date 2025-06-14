import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { useDispatch } from "react-redux";
import { addAllProducts, setProductLoader } from "./features/productSlice";

function App() {
  const dispatch = useDispatch();
  const getUserOnMount = async () => {
    try {
      const res = await fetch("https://dummyjson.com/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("kartgo-accessToken")}`,
        },
        credentials: "include", // Include cookies (e.g., accessToken) in the request
      });

      const userData = await res.json();

      // send this to redux
      dispatch(loginUser(userData));
    } catch (error) {
      // toast to show login fail message
    }
  };

  const getAllProductsOnMount = async () => {
    try {
      dispatch(setProductLoader(true));

      const productRes = await fetch("https://dummyjson.com/products");
      const productResData = await productRes.json();

      if (productResData) {
        dispatch(addAllProducts(productResData));

        return;
      }

      dispatch(
        addAllProducts({
          limit: 0,
          products: [],
          skip: 0,
          total: 0,
        })
      );
    } catch (error) {
      console.error("Error in food display: ", error);
      dispatch(
        addAllProducts({
          limit: 0,
          products: [],
          skip: 0,
          total: 0,
        })
      );
    } finally {
      dispatch(setProductLoader(false));
    }
  };

  useEffect(() => {
    getUserOnMount();
    getAllProductsOnMount();
  }, []);

  return (
    <div className="app-container">
      <Navbar />

      <div className="bottom-container">
        {/* <Breadcrumbs /> */}

        <div id="page-container-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
