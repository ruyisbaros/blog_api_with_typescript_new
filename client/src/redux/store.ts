
import { configureStore } from "@reduxjs/toolkit";
import blogSlicer from "./blogSlicer";
import categorySlicer from "./categorySlicer";
import currentUserSlicer from "./currentUserSlicer";
import loadSlicer from "./loadSlicer";

export const store = configureStore({
  reducer: {
    loadStatus: loadSlicer,
    currentUser: currentUserSlicer,
    categories: categorySlicer,
    blogs: blogSlicer
  },
});
