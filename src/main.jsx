import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import reduxStore from "./store/reduxStore.js";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/Auth/ProtectedRoute.jsx";
import { PathConstants } from "./lib/constants.js";
import Home from "./pages/Home/Home.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";
import Login from "./components/Login/Login.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={reduxStore}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route
              path={PathConstants.HOME}
              element={
                <ProtectedRoute authentication={false}>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path={PathConstants.LOGIN}
              element={
                <ProtectedRoute authentication={false}>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path={PathConstants.DASHBOARD}
              element={
                <ProtectedRoute authentication={true} role="admin">
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>

        <Toaster position="bottom-center" reverseOrder={false} />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
