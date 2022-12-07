import { Request, Response } from "express";
import User from "../models/userModel"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import sendMail from "../alerts/send_email"
import { generateAccessToken, generateActiveToken, generateReFreshToken } from "../config/token_generator"
import { validateEmail, validatePhoneNumber } from "../middlewares/validator";
import { sendSMS } from "../alerts/send_sms";

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

            const url = `${process.env.ROOT_URL}/api/v1/auth/activate_account/${active_token}`

            if (validateEmail(account)) {
                sendMail(name, account, url, "Please verify your Email address!")
                return res.json({ message: "Success! Please check your email and verify your account!" })
            } else if (validatePhoneNumber(account)) {
                sendSMS(name, account, url, "Verify your phone number")
                return res.json({ message: "Success! Please check your phone and verify your account!" })
            }

        } catch (err: any) {
            return res.status(500).json({ message: err.message })
        }
    },
    activateAccount: async (req: Request, res: Response) => {
        try {
            res.send({ your_token: req.params.token })
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