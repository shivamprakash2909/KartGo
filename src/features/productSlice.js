import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  productData: {
    limit: 0,
    products: [],
    skip: 0,
    total: 0,
  },
  loading: false,
};

const productSLice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductLoader: (state, actions) => {
      state.loading = actions.payload;
    },
    addAllProducts: (state, actions) => {
      state.productData = actions.payload;
    },
  },
});
const productReducer = productSLice.reducer;
export const { setProductLoader, addAllProducts } = productSLice.actions;
export default productReducer;
