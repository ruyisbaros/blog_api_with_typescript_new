import mongoose from "mongoose"
import { IComment } from "../config/interface"

const commentSchema = new mongoose.Schema({
    owner: { type: mongoose.Types.ObjectId, ref: "User" },

    blog_id: mongoose.Types.ObjectId,
    blog_user_id: mongoose.Types.ObjectId,
    replyCM: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    reply_user: { type: mongoose.Types.ObjectId, ref: "User" },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: true })


export default mongoose.model<IComment>("Comments", commentSchema)