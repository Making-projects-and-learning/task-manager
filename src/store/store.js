/** Libraries */
import { configureStore } from "@reduxjs/toolkit";

/** Slices - Store */
import { authSlice } from "./slices/authSlice";
import { taskSlice } from "./slices/taskSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    tasks: taskSlice.reducer,
  },
});
