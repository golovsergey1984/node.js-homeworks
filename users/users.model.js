import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    email: String,
    password: String,
    subscription: {
        type: String,
        enum: ["free", "pro", "premium"],
        default: "free"
    },
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

}

export default new User();