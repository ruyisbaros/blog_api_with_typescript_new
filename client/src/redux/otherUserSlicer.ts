
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  otherUser: "",

};

const otherUserSlicer = createSlice({
  name: "otherUser",
  initialState,
  reducers: {

    otherUserFetched: (state, action) => {
      state.otherUser = action.payload
    },


  },
});

export const {

  otherUserFetched
} = otherUserSlicer.actions;

export default otherUserSlicer.reducer;
