const express = require('express');
const { listUsers, userFind, userRemove, contactAdded, updateData } = require("./user.controller")

const userRouter = express.Router();

userRouter.get('/', listUsers)

userRouter.get('/:contactId', userFind)

userRouter.delete('/:contactId', userRemove)

userRouter.post('/', contactAdded)

userRouter.patch('/:contactId', updateData)

exports.userRouter = userRouter;