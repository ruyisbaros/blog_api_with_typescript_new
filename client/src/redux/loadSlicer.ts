import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const loadingSlicer = createSlice({
  name: "loadStatus",
  initialState,
  reducers: {
    loadingStart: (state) => {
      state.loading = true;
    },
    loadingFinish: (state) => {
      state.loading = false;
    },
    loadingFail: (state) => {
      state.loading = false;
    },
  },
});

export const { loadingStart, loadingFinish, loadingFail } =
  loadingSlicer.actions;

export default loadingSlicer.reducer;
