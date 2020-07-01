import mongoose, { Schema } from "mongoose";
import fs from 'fs'

const userSchema = new Schema({
    email: String,
    password: String,
    subscription: {
        type: String,
        enum: ["free", "pro", "premium"],
        default: "free"
    },
    avatarURL: String,
    token: String
})



class User {
    constructor() {
        this.contact = mongoose.model('users', userSchema)
    }
    getUserbyQuery = (query) => {
        return this.contact.findOne(query)
    }

    getUser = (query) => {
        return this.contact.find(query, { password: false, token: false })//второй параметр - исключение из объекта передаваемого значения
    }
    createUser = (user) => {
        return this.contact.create(user)
    }
    getUserById = (id) => {

        return this.contact.findById(id, { password: false, token: false })
    }
    updateUser = (user) => {
        const { id, ...userModel } = user //из объекта вычленяет id, а всё остальное равно userModel
        return this.contact.findByIdAndUpdate(id, userModel, { new: true })
    }
    deleteUser = (id) => {
        return this.contact.findByIdAndDelete(id)
    }

    updateToken = (id, tokenData) => {
        return this.contact.findByIdAndUpdate(id, { token: tokenData })
    }
    deleteUserAvatar = (oldAvatarFileName) => {
        const pathToFileToDelete = 'public/images/' + oldAvatarFileName
        fs.unlink(pathToFileToDelete, function (err) {
            if (err) return console.log(err);
            console.log('file deleted successfully');
        });
    }
}

export default new User();