import express from "express"
const router = express.Router()
import userCtrl from "../controllers/userController"

router.get("/get_user/:id", userCtrl.getOneUser)

export default router