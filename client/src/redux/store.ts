
import { configureStore } from "@reduxjs/toolkit";
import blogSlicer from "./blogSlicer";
import categorySlicer from "./categorySlicer";
import commentsSlicer from "./commentsSlicer";
import currentUserSlicer from "./currentUserSlicer";
import loadSlicer from "./loadSlicer";
import otherUserSlicer from "./otherUserSlicer";

export const store = configureStore({
  reducer: {
    loadStatus: loadSlicer,
    currentUser: currentUserSlicer,
    categories: categorySlicer,
    blogs: blogSlicer,
    otherUser: otherUserSlicer,
    comments: commentsSlicer
  },
});
