import express from "express"
const router = express.Router()
import commentCtrl from "../controllers/commentController"
import { protect } from "../middlewares/auth"

router.post("/create", protect, commentCtrl.create)

export default router