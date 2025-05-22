import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { messageSlice } from "./message/messageSlice";

export const store = configureStore({
  reducer: {
    user: authSlice.reducer,
    message: messageSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
