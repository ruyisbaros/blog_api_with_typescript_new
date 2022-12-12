
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add category name"],
        trim: true,
        unique: true,
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/ruyisbaros/image/upload/v1666022159/frnuturkacwbwlwh00bs.jpg"
    },
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

export default Category;
