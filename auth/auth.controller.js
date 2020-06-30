import bcrypt from "bcrypt"
import { salt } from "../config"
import User from "../users/users.model"
import { userLoginValidator } from "./auth.validator"
import { createToken } from "../services/auth.service"

export const registrationController = async (req, res) => {

    try {
        const emailIsset = await User.getUserbyQuery({ email: req.body.email });
        if (emailIsset) {
            res.status(409).json({ "message": "Email in use" })
            return
        }
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        const user = { ...req.body, password: hashPassword }
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
