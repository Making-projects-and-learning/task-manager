/** Libraries */
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    checking: true,
    uid: null,
    name: null,
    email: null,
  },
  reducers: {
    authLogin: (state, action) => {
      state.checking = false;
      state.uid = action.payload.uid;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    authCheckingFinish: (state) => {
      state.checking = false;
    },
    authLogout: (state) => {
      state.uid = null;
      state.name = null;
      state.email = null;
      state.checking = false;
    },
  },
});

export const { authLogin, authCheckingFinish, authLogout } = authSlice.actions;
