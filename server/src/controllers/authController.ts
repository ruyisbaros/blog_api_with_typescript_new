import { Request, Response } from "express";
import User from "../models/userModel"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import sendMail from "../alerts/send_email"
import { generateAccessToken, generateActiveToken, generateReFreshToken } from "../config/token_generator"
import { validateEmail, validatePhoneNumber } from "../middlewares/validator";
import { sendSMS } from "../alerts/send_sms";
import { INewUser, ILogUser, IDecodedToken } from "../config/interface"

const authController = {
    registerDevelopment: async (req: Request, res: Response) => {
        try {
            const { name, account, password } = req.body
            const userObj = { name, account, password }

            const access_token = generateAccessToken(userObj)
            const refreshToken = generateReFreshToken(userObj)
            const newUser = await User.create({ name, account, password })
            res.status(201).json({ status: "success", message: "Registration success", newUser, access_token })

        } catch (err: any) {
            return res.status(500).json({ message: err.message })
        }
    },
    register: async (req: Request, res: Response) => {
        try {
            const { name, account, password } = req.body

            const hashedPassword = await bcrypt.hash(password, 10);
            const userObj = { name, account, password: hashedPassword }

            const active_token = generateActiveToken(userObj)

            const url = `${process.env.ROOT_URL}/activate_account/${active_token}`

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
            const { token } = req.params
            const decoded = jwt.verify(token, process.env.JWT_ACTIVE_KEY!)
            const { name, account, password } = decoded as INewUser

            if (!account) return res.status(500).json({ message: "Invalid authentication. Please retry for registering!" })
            //console.log(account)
            const newUser = await User.create({ name, account, password })
            const access_token = generateAccessToken({ id: newUser._id })
            const refreshToken = generateReFreshToken({ id: newUser._id })

            res.cookie("refresh_token", refreshToken, {
                httpOnly: true,
                path: "/api/v1/auth/refresh_token",
                maxAge: 15 * 24 * 60 * 60 * 1000 //15 days
            })

            res.status(200).json({
                message: "Account has been activated",
                newUser,
                access_token
            })
        } catch (err: any) {
            //console.log({...err})
            let errMessage;
            if (err.code === 11000) {
                const obj = err.keyValue
                errMessage = obj.account + " already exist!"
            } else if (err.name === "TokenExpiredError") {
                errMessage = "Oooppsss! You should activate your account through the mail/sms which has been sent, max in 30 minutes!"
            }
            return res.status(500).json({ message: errMessage })
        }
    },
    login: async (req: Request, res: Response) => {
        try {
            const { account, password } = req.body
            const loggedUser = await User.findOne({ account })
            if (!loggedUser) {
                return res.status(500).json({ message: "Invalid credentials!" })
            }
            loginUser(loggedUser, password, res)
            //console.log(loggedUser.password)

        } catch (err: any) {
            return res.status(500).json({ message: err.message })
        }
    },
    logout: async (req: Request, res: Response) => {
        try {
            res.clearCookie("refresh_token", { path: "/api/v1/auth/refresh_token" })
            return res.status(200).json({ message: "You have been logged out!" })
        } catch (err: any) {
            return res.status(500).json({ message: err.message })
        }
    },
    refresh_token: async (req: Request, res: Response) => {
        try {
            //const access_token = generateAccessToken({ id: loggedUser._id })
            const token = req.cookies.refresh_token
            if (!token) return res.status(500).json({ message: "Please login again" })
            const decoded = jwt.verify(token, process.env.JWT_REFRESH_KEY!)
            if (!decoded) return res.status(500).json({ message: "Please login again" })
            //console.log(decoded)
            const { id } = decoded as IDecodedToken
            const user = await User.findOne({ _id: id }).select("-password")
            if (!user) return res.status(500).json({ message: "This account does not exist!" })
            //console.log(user)
            const access_token = generateAccessToken({ id: user._id })

            res.status(200).json({ access_token })
        } catch (err: any) {
            return res.status(500).json({ message: err.message })
        }
    },
}

async function loginUser(loggedUser: ILogUser, password: string, res: Response) {

    const isPasswordMatch: boolean = await bcrypt.compare(password, loggedUser.password);
    //const hashedPassword = await bcrypt.hash(password, 10)
    //console.log(isPasswordMatch);
    if (!isPasswordMatch) {
        return res.status(500).json({ message: "Invalid credentials!" })
    }
    const refreshToken = generateReFreshToken({ id: loggedUser._id })
    const access_token = generateAccessToken({ id: loggedUser._id })
    res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        path: "/api/v1/auth/refresh_token",
        maxAge: 15 * 24 * 60 * 60 * 1000 //15 days
    })

    res.status(200).json({
        message: "Login Success",
        user: { ...loggedUser._doc, password: "" },
        access_token
    })
}

export default authController