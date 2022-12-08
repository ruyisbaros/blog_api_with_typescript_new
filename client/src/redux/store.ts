
import { configureStore } from "@reduxjs/toolkit";
import currentUserSlicer from "./currentUserSlicer";
import loadSlicer from "./loadSlicer";

export const store = configureStore({
  reducer: {
    loadStatus: loadSlicer,
    currentUser: currentUserSlicer
  },
});
