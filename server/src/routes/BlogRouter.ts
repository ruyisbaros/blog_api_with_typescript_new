import express from "express"
const router = express.Router();
import { protect } from './../middlewares/auth';
import BlogCtrl from "../controllers/blogController"

router.post("/create", protect, BlogCtrl.create)

router.get("/get_one/:id", BlogCtrl.getOne)
router.get("/home/get_all", BlogCtrl.getHomeBlogs)
router.patch("/update/:id", protect, BlogCtrl.getOne)
router.delete("/delete/:id", protect, BlogCtrl.getOne)

export default router;