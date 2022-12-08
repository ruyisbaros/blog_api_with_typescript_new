import { validateRegister, validateLogin } from '../middlewares/validator';
import { userExist } from "../middlewares/isUserExist"
import express from "express"
const router = express.Router()
import authController from "../controllers/authController";

//just to skip user email confirmation check during development, register_dev route
router.post("/register_dev", validateRegister, userExist, authController.registerDevelopment)
router.post("/register", validateRegister, userExist, authController.register)
router.get("/activate_account/:token", authController.activateAccount)
router.post("/login", validateLogin, authController.login);
router.get("/refresh_token", authController.refresh_token);
router.get("/logout", authController.logout);

export default router