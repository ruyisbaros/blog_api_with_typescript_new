import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: "",
  token: "",
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
      state.token = action.payload.token;
    },
    refreshToken: (state, action) => {
      state.token = action.payload.token;
      state.currentUser = action.payload.currentUser;
    },
    authLogout: (state, action) => {
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
} = currentUserSlicer.actions;

export default currentUserSlicer.reducer;
