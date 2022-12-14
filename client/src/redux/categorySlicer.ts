import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [] as any,

};

const categorySlicer = createSlice({
    name: "categories",
    initialState,
    reducers: {
        fetchCategories: (state, action) => {
            state.categories = action.payload;
        },
        addToCategories: (state, action) => {
            state.categories = [action.payload, ...state.categories];
        },
        removeFromCategories: (state, action) => {
            state.categories = state.categories.filter(
                (ctg: any) => ctg._id !== action.payload
            );
        },
        updateCategory: (state, action) => {
            state.categories = state.categories.map(
                (ctg: any) => ctg._id === action.payload.id ? action.payload.category : ctg
            );
        },

    },
});

export const {
    fetchCategories,
    addToCategories,
    removeFromCategories, updateCategory } = categorySlicer.actions
export default categorySlicer.reducer    