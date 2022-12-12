import express from "express"
const router = express.Router()

import { protect } from "../middlewares/auth"
import categoryCtrl from "../controllers/categoryController"

router.get("/get_one/:id", categoryCtrl.getCategory)
router.get("/get_all", categoryCtrl.getCategories)
router.post("/create", protect, categoryCtrl.createCategory)
router.patch("/update/:id", protect, categoryCtrl.updateCategory)
router.delete("/delete/:id", protect, categoryCtrl.deleteCategory)

export default router