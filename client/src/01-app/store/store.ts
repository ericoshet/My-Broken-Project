import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/05-entities/user/redux/userSlice";
import bookReducer from "@/05-entities/book/redux/bookSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    book: bookReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
