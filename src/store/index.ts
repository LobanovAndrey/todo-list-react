import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "store/slices/todoSlice";
import userReducer from "store/slices/userSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
