import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import productReducer from "../features/productSlice";
import dashboardReducer from "../features/dashboardSlice";

const reduxStore = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    dashboard: dashboardReducer,
  },
});

export default reduxStore;
