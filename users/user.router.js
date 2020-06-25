import { Router } from "express"
import { getUsersController, createUserController, findUserController, updateUserController, deleteUserController } from "./user.controller"
import { userValidateMiddleware } from "./user.validator"

const userRouter = Router()

userRouter.get("/", getUsersController)
userRouter.post("/", userValidateMiddleware, createUserController)
userRouter.get("/:id", findUserController)
userRouter.patch("/", updateUserController)
userRouter.delete("/:id", deleteUserController)

export default userRouter