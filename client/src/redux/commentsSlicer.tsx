import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [] as any,
};

const commentSlicer = createSlice({
  name: "comments",
  initialState,
  reducers: {
    fetchComments: (state, action) => {
      state.comments = action.payload;
    },
    addToComments: (state, action) => {
      state.comments = [action.payload, ...state.comments];
    },
    removeFromComments: (state, action) => {
      state.comments = state.comments.filter(
        (crt: any) => crt._id !== action.payload
      );
    },
    updateComment: (state, action) => {
      state.comments = state.comments.map((blog: any) =>
        blog._id === action.payload.id ? action.payload.blog : blog
      );
    },
  },
});

export const {
  fetchComments,
  addToComments,
  removeFromComments,
  updateComment,
} = commentSlicer.actions;
export default commentSlicer.reducer;
