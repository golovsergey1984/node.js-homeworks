import { Router } from "express"
import {
    getUsersController,
    createUserController,
    findUserController,
    updateUserController,
    deleteUserController,
    findUserByToken,
    uploadAvatarController,
} from "./user.controller"
import { userValidateMiddleware } from "./user.validator"
import { tokenMiddleware } from "../middlewares/auth.middleware"
import { avatarUploader } from "../middlewares/fileUploader.middleware"

const userRouter = Router()
userRouter.get("/current", tokenMiddleware, findUserByToken)
userRouter.get("/", tokenMiddleware, getUsersController)
userRouter.post("/", userValidateMiddleware, createUserController)
userRouter.get("/:id", tokenMiddleware, findUserController)
userRouter.post("/uploadAvatar", tokenMiddleware, avatarUploader().single('avatarURL'), uploadAvatarController)

userRouter.patch("/", tokenMiddleware, updateUserController)
userRouter.delete("/:id", tokenMiddleware, deleteUserController)



export default userRouter