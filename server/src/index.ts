import dotenv from "dotenv"
dotenv.config()
import express, { Request, Response } from "express";
import cors from "cors"
import morgan from "morgan"
import cookie_parser from "cookie-parser"

//Routes
import routes from "./routes/index"

const app = express()

//Required Middleware
app.use(morgan("dev"))
app.use(cors())

app.use(express.json())
app.use(cookie_parser())
app.use(express.urlencoded({ extended: true }))

//app.use(express.static("public"))

//DB API
import "./config/db_set"

//Routes Middleware
app.use("/api/v1/auth", routes.authRouter)
app.use("/api/v1/users", routes.userRouter)

//Server configuration
const port = process.env.PORT || 3002

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
