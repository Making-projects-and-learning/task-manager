/** Libraries */
import { configureStore } from "@reduxjs/toolkit";

/** Slices - Store */
import { authSlice } from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
