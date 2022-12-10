import { Request, Response } from "express";
import User from "../models/userModel"

const userCtrl = {
    getOneUser: async (req: Request, res: Response) => {
        const user = await User.findOne({ _id: req.params.id }).select('-password')
        res.status(200).json(user)
    }
}

export default userCtrl
