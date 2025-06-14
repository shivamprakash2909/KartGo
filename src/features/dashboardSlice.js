import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProducts: {
    limit: 0,
    products: [],
    skip: 0,
    total: 0,
  },
  dashboardStats: {
    totalInventoryValue: 0,
    tottalProducts: 0,
  },
  dashboardItemsPerCategory: {
    totalCategories: 0,
    categoryData: [],
  },
};

const dashboardSlice = createSlice({
  initialState,
  name: "dashboard",
  reducers: {
    setAllDashboardProducts: (state, actions) => {
      state.allProducts = actions.payload;
    },

    setDashboadStats: (state, actions) => {
      state.dashboardStats = actions.payload;
    },
    setCategoryWiseStats: (state, actions) => {
      state.dashboardItemsPerCategory = actions.payload;
    },

    updateDashboardProductList: (state, actions) => {
      state.allProducts.products = actions.payload;
    },
    addProduct: (state, action) => {
      state.allProducts.products.push(action.payload);
    },
  },
});

const dashboardReducer = dashboardSlice.reducer;
export const {
  setAllDashboardProducts,
  setDashboadStats,
  setCategoryWiseStats,
  updateDashboardProductList,
  addProduct,
} = dashboardSlice.actions;
export default dashboardReducer;
