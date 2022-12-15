
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  otherUser: "",
  blogs: []
};

const otherUserSlicer = createSlice({
  name: "otherUser",
  initialState,
  reducers: {

    otherUserFetched: (state, action) => {
      state.otherUser = action.payload
    },
    otherUserBlogs: (state, action) => {
      state.blogs = action.payload
    },

  },
});

export const {
  otherUserBlogs,
  otherUserFetched
} = otherUserSlicer.actions;

export default otherUserSlicer.reducer;
