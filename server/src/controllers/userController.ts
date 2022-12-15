import { ILogUser, IReqAuth } from './../config/interface';
import { Request, Response } from "express";
import User from "../models/userModel"
import Blog from "../models/blogModel"
import bcrypt from "bcrypt"

const userCtrl = {
    getOneUser: async (req: Request, res: Response) => {
        const user = <ILogUser>await User.findOne({ _id: req.params.id }).select('-password')
        const blogs = await Blog.find({ user: user._id })
        res.status(200).json({ user, blogs })
    },
    getAllUsers: async (req: Request, res: Response) => {

    },
    updateUser: async (req: IReqAuth, res: Response) => {
        //console.log(req.user)
        if (!req.user) return res.status(400).json({ message: "Invalid user authentication!" })
        try {
            const { avatar, name } = req.body

            const user = await User.findOneAndUpdate({ _id: req.user._id }, { avatar, name }, { new: true })
            res.status(200).json({ user, message: "Profile updated successfully" })
        } catch (err: any) {
            return res.status(500).json({ message: err.message })
        }
    },
    updatePassword: async (req: IReqAuth, res: Response) => {
        const { current_password, new_password } = req.body;
        if (!req.user) return res.status(400).json({ message: "Invalid user authentication!" })
        const user = <ILogUser>await User.findById(req.user._id);

        const isPasswordMatch: boolean = await bcrypt.compare(current_password, user.password);

        if (!isPasswordMatch) {
            return res.status(500).json({ message: "Invalid credentials!" })
        }

        const hashed_password = await bcrypt.hash(new_password, 10);

        await User.findByIdAndUpdate(user._id, { password: hashed_password });
        res.status(201).json({ message: "Password has been updated" });
    },
}

export default userCtrl
