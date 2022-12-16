import { Request, Response } from "express"
import Comment from "../models/commentModel"
import User from "../models/userModel"
import { IReqAuth } from "../config/interface"

const commentCtrl = {
    create: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ message: "Invalid user authentication!" })
        try {
            const { content, blog_id, blog_user_id, } = req.body

            const newComment = await Comment.create({
                content,
                blog_id,
                blog_user_id,
                owner: req.user._id
            })
            return res.status(201).json(newComment)

        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    },
    getOne: async (req: IReqAuth, res: Response) => {
        try {

        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    },
    getAll: async (req: IReqAuth, res: Response) => {
        try {

        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    },
    delete: async (req: IReqAuth, res: Response) => {
        try {

        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    },
    update: async (req: IReqAuth, res: Response) => {
        try {

        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    },
}

export default commentCtrl