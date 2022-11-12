import { createSlice } from "@reduxjs/toolkit";
import { removeCookie, setCookie } from "../helpers/cokieesFunc";


const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    isRegistered: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      setCookie("token", action.payload.token)
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.isRegistered = action.payload.message;
    },
    registerFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    clearErrorLogin: (state) => {
      state.error = false
    },
    clearErrorRegister: (state) => {
      state.error = false
    },
    clearIsRegisteredSucces: (state) => {
      state.isRegistered = false;
    },

    logoutUser: (state) => {
      state.isFetching = false;
      state.currentUser = null;
      state.error = false;
      removeCookie("token");
      localStorage.removeItem("cartItems")
    }

  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutUser,
  clearErrorLogin,
  clearErrorRegister,
  clearIsRegisteredSucces
} = userSlice.actions;
export default userSlice.reducer;
