import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  user: null,
  isAuth: false,
  error: null,
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    fetchLoginLoading: (state) => {
      state.isLoading = true;
      state.isAuth = false;
    },
    fetchLoginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isAuth = true;
    },
    fetchLoginFail: (state, action) => {
      state.isLoading = false;
      state.isAuth = false;
      state.user = null;
      state.error = action.payload;
    },
    fetchRegisterLoading: (state) => {
      state.isLoading = true;
      state.isAuth = false;
    },
    fetchRegisterSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isAuth = true;
    },
    fetchRegisterFail: (state, action) => {
      state.isLoading = false;
      state.isAuth = false;
      state.user = null;
      state.error = action.payload;
    },
    getUserRequest: (state) => {
      state.isLoading = true;
      state.isAuth = false;
    },
    getUserSuccess: (state, action) => {
      state.user = action.payload.user;
      state.isLoading = false;
      state.isAuth = true;
    },
    getUserFail: (state,action) => {
      state.isLoading = false;
      state.user = null;
      state.isAuth = false;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.isLoading = false;
      state.user = null;
      state.isAuth = false;
    },
    logoutFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

const { reducer, actions } = accountSlice;
export const {
  fetchLoginLoading,
  fetchLoginSuccess,
  fetchLoginFail,
  clearErrors,
  fetchRegisterLoading,
  fetchRegisterSuccess,
  fetchRegisterFail,
  getUserRequest,
  getUserSuccess,
  getUserFail,
  logoutSuccess,
  logoutFail,
} = actions;
export default reducer;
