
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
      state.otherUser = action.payload.user
      state.blogs = action.payload.blogs
    },


  },
});

export const {

  otherUserFetched
} = otherUserSlicer.actions;

export default otherUserSlicer.reducer;
