import { configureStore } from "@reduxjs/toolkit";
import newsIds from "./reducer";

const store = configureStore({
  reducer: {
    newsIds,
  },
  devTools: process.env.NODE_ENV !== "production",
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
