import express from "express"
const router = express.Router()
import userCtrl from "../controllers/userController"
import { protect } from "../middlewares/auth"

router.get("/get_user/:id", userCtrl.getOneUser)
router.patch("/update_user", protect, userCtrl.updateUser)

export default router