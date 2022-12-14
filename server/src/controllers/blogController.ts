import Blog from "../models/blogModel"
import { Request, Response } from "express";
import { IReqAuth } from './../config/interface';



const blogCtrl = {
    create: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(400).json({ message: "Invalid user authentication!" })

        try {
            const { content, title, description, thumbnail, category } = req.body

            const blog = await Blog.findOne({ title })
            if (blog) return res.status(400).json({ message: `Blog with title: ${title} already exists` })
            const newBlog = await Blog.create({
                content,
                title: title.toLowerCase(),
                description,
                thumbnail,
                category,
                user: req.user._id
            });
            return res.status(201).json(newBlog)
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },
    getAll: async (req: Request, res: Response) => {

    },
    getOne: async (req: Request, res: Response) => {
        const blog = await Blog.findById(req.params.id)
        if (!blog) return res.status(404).json({ message: "Blog not found" })
        return res.status(200).json(blog)
    },
    getHomeBlogs: async (req: Request, res: Response) => {
        /* const blogs = await Blog.aggregate([
            {
                $lookup: {
                    from: "User",
                    let: { user_id: "$user" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                        { $project: { password: 0 } }
                    ],
                    as: "user"
                }
            },
            { $unwind: "$user" },
            // Category
            {
                $lookup: {
                    "from": "Category",
                    "localField": "category",
                    "foreignField": "_id",
                    "as": "category"
                }
            },
            // array -> object
            { $unwind: "$category" },
            // Sorting
            { $sort: { "createdAt": -1 } },
        ]) */
        const blogs = await Blog.find()
            .populate({ path: "user", select: "-password" })
            .populate({ path: "category" })
            .sort("-createdAt")

        return res.status(200).json(blogs)
    },
    update: async (req: Request, res: Response) => { },
    delete: async (req: Request, res: Response) => { },
}

export default blogCtrl;