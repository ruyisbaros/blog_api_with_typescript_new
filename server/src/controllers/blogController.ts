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

    getOne: async (req: Request, res: Response) => {
        const blog = await Blog.findById(req.params.id)
            .populate({ path: "user", select: "-password" })
            .populate({ path: "category" })
        if (!blog) return res.status(404).json({ message: "Blog not found" })
        return res.status(200).json(blog)
    },

    getByCreator: async (req: Request, res: Response) => {
        try {
            const blogs = await Blog.find({ user: req.params.id })
                .populate({ path: "user", select: "-password" })
                .populate({ path: "category" })
                .sort("-createdAt")

            return res.status(200).json(blogs)
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },

    getAllBlogs: async (req: Request, res: Response) => {
        let options = {}
        if (req.query.category) {
            options = {
                ...options,
                category: req.query.category
            }
        }
        if (req.query.user) {
            options = {
                ...options,
                user: req.query.user
            }
        }

        const blogCount = await Blog.count(options)
        console.log(blogCount);
        //console.log(options);
        let limit: number;
        req.query.limit ? limit = Number(req.query.limit) : limit = 20
        //console.log(limit);
        try {
            const blogs = await Blog.find(options)
                .populate({ path: "user", select: "-password" })
                .populate({ path: "category" })
                .sort("-createdAt")
                .limit(limit)

            return res.status(200).json({ blogs, blogCount })
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },

    update: async (req: Request, res: Response) => { },
    delete: async (req: Request, res: Response) => { },
}

export default blogCtrl;