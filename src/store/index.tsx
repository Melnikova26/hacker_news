import { AnyAction, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { fetchNewsIds } from "./reducer";
import newsIds from "./reducer";

const stringMiddleware =
  () => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    if (typeof action === "string") {
      return next({
        type: action,
      });
    }
    return next(action);
  };

const store = configureStore({
  reducer: {
    newsIds,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
