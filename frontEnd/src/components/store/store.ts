import { configureStore } from "@reduxjs/toolkit";
import playerSlice from "../player/playerSlice";

export const store = configureStore({
  reducer: playerSlice,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
