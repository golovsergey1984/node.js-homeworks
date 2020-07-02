import bcrypt from "bcrypt"
import { salt } from "../config"
import User from "../users/users.model"
import { userLoginValidator } from "./auth.validator"
import { createToken } from "../services/auth.service"
import { firstAvatarGenerator } from "../services/avatar_generator"
import { sendVerificationToken } from "../services/mail.service"
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs.extra'



export const registrationController = async (req, res) => {
    firstAvatarGenerator(req)

    try {
        const emailIsset = await User.getUserbyQuery({ email: req.body.email });
        if (emailIsset) {
            res.status(409).json({ "message": "Email in use" })
            return
        }
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        const oldPath = req.user.avatarPath
        const newFile = Date.now() + '.png'
        const newPath = './public/images/' + newFile
        fs.move(oldPath, newPath, function (err) {
            if (err) { throw err; }
            console.log("All files successfully moved");

        });
        const firstAvatarImg = req.protocol + '://' + req.headers.host + '/images/' + newFile
        const verifyMailToken = uuidv4();
        const user = { ...req.body, password: hashPassword, avatarURL: firstAvatarImg, verificationToken: verifyMailToken }
        sendVerificationToken(req.body.email, verifyMailToken)
        await User.createUser(user)
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json(error)
    }

}

export const loginController = async (req, res) => {

    try {
        const { error } = await userLoginValidator.validate(req.body)

        if (error) {
            res.status(400).json({ "message": error.details[0].message })
            return
        }


        let emailIsset = await User.getUserbyQuery({ email: req.body.email });
        if (!emailIsset) {
            res.status(401).json({ "ResponseBody": "Email is wrong" })
            return
        }

        if (emailIsset.verificationToken) {
            res.status(401).send("Your email is not verifyed!")
            return
        }
        const isValidPassword = await bcrypt.compare(req.body.password, emailIsset.password)//метод сравнения паролей
        if (!isValidPassword) {
            res.status(401).json({ "ResponseBody": "Password is wrong" })
        }
        const token = await createToken(emailIsset._id)
        await User.updateToken(emailIsset._id, token)

        const user = {
            "email": emailIsset.email,
            "subscription": emailIsset.subscription
        }

        res.status(200).json({ token, user })
    }
    catch (error) {
        res.status(500).send("Internal server error")
    }
}


export const logOutController = async (req, res) => {
    try {
        const deletedToken = await User.updateToken(req.user.id, null)
        res.status(204).send()
    } catch (error) {
        res.status(500).send("Internal server error")
    }
}

export const verifyMailTokenController = async (req, res) => {

    const verifyMailToken = req.params.verificationToken

    if (!verifyMailToken) {
        res.status(401).send("No token provided")
    }
    try {
        const user = await User.getUserbyQuery({ verificationToken: verifyMailToken })
        const id = {
            "id": user.id,
        }
        const deletedVerifyToken = await User.deleteUserVerificationToken(id)
        res.status(200).send("Your mail successfully verifyed. You are in system")
    } catch (error) {
        res.status(404).send("User not found")
    }
}