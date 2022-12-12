import { IReqAuth } from './../config/interface';
import { Request, Response } from "express";
import Category from "../models/categoryModel"

const categoryCtrl = {
    createCategory: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(403).json({ message: "Invalid user authentication!" })
        //console.log(req.user)
        if (req.user.role !== "Admin") return res.status(403).json({ message: "Invalid user authentication!" })
        try {
            const { name } = req.body;
            const category = await Category.findOne({ name })
            if (category) return res.status(400).json({ message: "Category with name: " + category.name + " already exists" })

            const newCategory = await Category.create({ name: name.toLowerCase() })
            return res.status(201).json(newCategory)
        } catch (err: any) {
            let errMessage;
            if (err.code === 11000) {
                const obj = err.keyValue
                errMessage = obj.name + " already exist!"
            } else if (err.name === "TokenExpiredError") {
                errMessage = "Oooppsss! You should activate your account through the mail/sms which has been sent, max in 30 minutes!"
            }
            return res.status(500).json({ message: errMessage })
        }
    },
    getCategory: async (req: Request, res: Response) => {
        try {
            const category = await Category.findById(req.params.id)
            if (!category) return res.status(404).json({ message: "Category not found" })
            res.status(201).json(category)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    },
    getCategories: async (req: Request, res: Response) => {
        try {
            const categories = await Category.find().sort("-createdAt")
            res.status(201).json(categories)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    },
    updateCategory: async (req: IReqAuth, res: Response) => {
        if (!req.user) return res.status(403).json({ message: "Invalid user authentication!" })
        //console.log(req.user)
        if (req.user.role !== "Admin") return res.status(403).json({ message: "Invalid user authentication!" })
        try {
            const { name } = req.body;
            const category = await Category.findById(req.params.id)
            if (!category) return res.status(404).json({ message: "Category not found" })
            const updatedCategory = await Category.findByIdAndUpdate(req.params.id, { name: name.toLowerCase() }, { new: true });
            res.status(201).json({ updatedCategory, message: "Category updated successfully" })
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    },
    deleteCategory: async (req: IReqAuth, res: Response) => {
        try {
            await Category.findByIdAndDelete(req.params.id)
            res.status(204).json({ message: "Category deleted successfully" })
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    },
}

export default categoryCtrl