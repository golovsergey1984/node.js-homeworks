import { Router } from "express"
import { userValidateMiddleware } from "../users/user.validator"
import { registrationController, loginController, logOutController } from "./auth.controller"
import { tokenMiddleware } from "../middlewares/auth.middleware"


const authRouter = Router()

authRouter.post("/register", userValidateMiddleware, registrationController)

authRouter.post("/login", loginController)

authRouter.post("/logout", tokenMiddleware, logOutController)

export default authRouter