import { Request, Response, NextFunction } from "express";
import User from "../models/userModel"
import jwt from "jsonwebtoken";
import { IDecodedToken, IReqAuth } from "../config/interface"



export const protect = async (req: IReqAuth, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization");
        //const token = req.headers.authorization;
        //console.log(token)
        if (!token) {
            return res.status(401).json({ message: "You should Sign In!" });
        }
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY!);
        if (!decoded) {
            return res.status(401).json({ message: "Authentication error" });
        }
        const { id } = decoded as IDecodedToken
        const user = await User.findOne({ _id: id })

        if (user) {
            req.user = user
        }

        next()
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

