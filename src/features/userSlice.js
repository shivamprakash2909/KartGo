import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, actions) => {
      state.userData = { ...actions.payload, isAuthenticated: true };
    },
    logoutUser: (state) => {
      state.userData = { isAuthenticated: false };
    },
  },
});

const userReducer = userSlice.reducer;
export const { loginUser, logoutUser } = userSlice.actions;
export default userReducer;
