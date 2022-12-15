
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: "",
  blogs: [],
  token: "",
  message: "",
  logging: false,
};

const currentUserSlicer = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    userLoggedStart: (state) => {
      state.logging = true;
    },
    userLoggedFinish: (state) => {
      state.logging = false;
    },
    userLoggedSuccess: (state, action) => {
      state.logging = false;
      state.currentUser = action.payload.currentUser;
      state.blogs = action.payload.blogs;
      state.message = action.payload.message;
      state.token = action.payload.token;
    },
    updateCurrentUser: (state, action) => {
      state.token = action.payload.token;
      state.currentUser = action.payload.currentUser;
    },
    refreshToken: (state, action) => {
      state.token = action.payload.token;
      state.currentUser = action.payload.currentUser;
    },
    authLogout: (state) => {
      state.logging = false;
      state.currentUser = "";
      state.token = "";
    },
  },
});

export const {
  userLoggedStart,
  userLoggedFinish,
  userLoggedSuccess,
  refreshToken,
  authLogout,
  updateCurrentUser
} = currentUserSlicer.actions;

export default currentUserSlicer.reducer;
