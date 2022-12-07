import { Request, Response, NextFunction } from "express";
import User from "../models/userModel"

export const userExist = async (req: Request, res: Response, next: NextFunction) => {
    const { name, account, password } = req.body
    const user = await User.findOne({ account })
    if (user) {
        return res.status(400).json({ message: "User with this email address or phone number already exists" })
    }else{
        next()
    }
    
}