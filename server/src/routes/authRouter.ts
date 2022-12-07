import { validateRegister, validateLogin } from '../middlewares/validator';
import { userExist } from "../middlewares/isUserExist"
import express from "express"
const router = express.Router()
import authController from "../controllers/authController";

//just to skip user email confirmation check during development, register_dev route
router.post("/register_dev", validateRegister, userExist, authController.registerDevelopment)
router.post("/register", validateRegister, userExist, authController.register)
router.post("/activate_account", authController.activateAccount)
router.post("/login", validateLogin, authController.login);
router.post("/logout/:id", authController.logout);

export default router