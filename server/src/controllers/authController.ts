import { Request, Response } from "express";
import User from "../models/userModel"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

import { generateAccessToken, generateActiveToken, generateReFreshToken } from "../config/token_generator"


const authController = {
    registerDevelopment: async (req: Request, res: Response) => {
        try {
            const { name, account, password } = req.body
            const userObj = { name, account, password }

            const access_token = generateAccessToken(userObj)

            const newUser = await User.create({ name, account, password })
            res.status(201).json({ status: "success", message: "Registration success", newUser, access_token })

        } catch (err: any) {
            return res.status(500).json({ message: err.message })
        }
    },
    register: async (req: Request, res: Response) => {
        try {
            const { name, account, password } = req.body
            const userObj = { name, account, password }

            const active_token = generateActiveToken(userObj)

            const newUser = await User.create({ name, account, password })
            res.status(201).json({ status: "success", message: "Registration success", newUser, active_token })

        } catch (err: any) {
            return res.status(500).json({ message: err.message })
        }
    },
    activateAccount: async (req: Request, res: Response) => {
        try {

        } catch (err: any) {
            return res.status(500).json({ message: err.message })
        }
    },
    login: async (req: Request, res: Response) => {
        try {

        } catch (err: any) {
            return res.status(500).json({ message: err.message })
        }
    },
    logout: async (req: Request, res: Response) => {
        try {

        } catch (err: any) {
            return res.status(500).json({ message: err.message })
        }
    },
}

export default authController