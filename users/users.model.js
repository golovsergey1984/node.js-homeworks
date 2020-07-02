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
    verificationToken: String,
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
        return this.contact.findByIdAndUpdate(id, userModel, { $unset: { "verificationToken": "" } }, { new: true })
    }
    deleteUser = (id) => {
        return this.contact.findByIdAndDelete(id)
    }

    updateToken = (id, tokenData) => {
        return this.contact.findByIdAndUpdate(id, { token: tokenData })
    }

    deleteUserVerificationToken = (user) => {
        const { id } = user //из объекта вычленяет id, а всё остальное равно userModel
        return this.contact.findByIdAndUpdate(id, { $unset: { "verificationToken": "" } }, { new: true })
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