import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogs: [] as any,

};

const blogSlicer = createSlice({
    name: "blogs",
    initialState,
    reducers: {
        fetchBlogs: (state, action) => {
            state.blogs = action.payload;
        },
        addToBlogs: (state, action) => {
            state.blogs = [action.payload, ...state.blogs];
        },
        removeFromBlogs: (state, action) => {
            state.blogs = state.blogs.filter(
                (crt: any) => crt._id !== action.payload
            );
        },
        updateBlog: (state, action) => {
            state.blogs = state.blogs.map(
                (blog: any) => blog._id === action.payload.id ? action.payload.blog : blog
            );
        },

    },
});

export const {
    fetchBlogs, addToBlogs, removeFromBlogs, updateBlog } = blogSlicer.actions
export default blogSlicer.reducer    