import { IReqAuth } from './../config/interface';
import { Request, Response } from "express";
import User from "../models/userModel"

const userCtrl = {
    getOneUser: async (req: Request, res: Response) => {
        const user = await User.findOne({ _id: req.params.id }).select('-password')
        res.status(200).json(user)
    },
    getAllUsers: async (req: Request, res: Response) => {

    },
    updateUser: async (req: IReqAuth, res: Response) => {
        //console.log(req.user)
        if (!req.user) return res.status(400).json({ message: "Invalid user authentication!" })
        try {
            const { avatar, name } = req.body

            const user = await User.findOneAndUpdate({ _id: req.user._id }, { avatar, name }, { new: true })
            res.status(200).json(user)
        } catch (err: any) {
            return res.status(500).json({ message: err.message })
        }
    },
    deleteUser: async (req: Request, res: Response) => { },
}

export default userCtrl
