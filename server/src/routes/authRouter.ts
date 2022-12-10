import { validateRegister, validateLogin, validateSmsLogin } from '../middlewares/validator';
import { userExist } from "../middlewares/isUserExist"
import express from "express"
const router = express.Router()
import authController from "../controllers/authController";

//just to skip user email confirmation check during development, register_dev route
router.post("/register_dev", validateRegister, userExist, authController.registerDevelopment)
router.post("/register", validateRegister, userExist, authController.register)
router.get("/activate_account/:token", authController.activateAccount)
router.post("/login", validateLogin, authController.login);
router.post("/login_with_sms", validateSmsLogin, authController.loginWithSms);
router.post("/sms_verify", authController.verifySMS);
router.get("/refresh_token", authController.refresh_token);
router.get("/logout", authController.logout);

export default router