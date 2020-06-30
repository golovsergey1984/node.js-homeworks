import { Router } from "express"
import {
    getUsersController,
    createUserController,
    findUserController,
    updateUserController,
    deleteUserController,
    findUserByToken,
} from "./user.controller"
import { userValidateMiddleware } from "./user.validator"
import { tokenMiddleware } from "../middlewares/auth.middleware"

const userRouter = Router()
userRouter.get("/current", tokenMiddleware, findUserByToken)
userRouter.get("/", tokenMiddleware, getUsersController)
userRouter.post("/", tokenMiddleware, userValidateMiddleware, createUserController)
userRouter.get("/:id", tokenMiddleware, findUserController)

userRouter.patch("/", tokenMiddleware, updateUserController)
userRouter.delete("/:id", tokenMiddleware, deleteUserController)



export default userRouter