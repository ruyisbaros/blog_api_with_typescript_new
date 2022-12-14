import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxLength: 50
    },
    content: {
        type: String,
        required: true,
        trim: true,
        maxLength: 2000
    },
    thumbnail: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 200
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },

}, { timestamps: true });

export default mongoose.model("Blog", blogSchema)