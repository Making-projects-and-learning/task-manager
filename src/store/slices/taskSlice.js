import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "task",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    removeTask: (state, action) => {
      return state.filter((task) => task._id !== action.payload.id);
    },
    updateTask: (state, action) => {
      return state.map((task) => {
        return task._id !== action.payload._id ? task : action.payload;
      });
    },
    allTasks: (state, action) => {
      return action.payload;
    },
  },
});

export const { addTask, removeTask, updateTask, allTasks } = taskSlice.actions;
