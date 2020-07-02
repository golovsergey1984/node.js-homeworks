import { Router } from "express"
import { userValidateMiddleware } from "../users/user.validator"
import { registrationController, loginController, logOutController, verifyMailTokenController } from "./auth.controller"
import { tokenMiddleware } from "../middlewares/auth.middleware"


const authRouter = Router()

authRouter.post("/register", userValidateMiddleware, registrationController)

authRouter.post("/login", loginController)

authRouter.post("/logout", tokenMiddleware, logOutController)

authRouter.get("/verify/:verificationToken", verifyMailTokenController)


export default authRouter