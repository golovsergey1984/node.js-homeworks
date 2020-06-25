import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    subscription: String,
    password: String,
    token: String
})



class Contact {
    constructor() {
        this.contact = mongoose.model('contacts', userSchema)
    }
    getContact = () => {
        return this.contact.find()
    }
    createContact = (user) => {
        return this.contact.create(user)
    }
    getContactById = (id) => {
        return this.contact.findById(id)
    }
    updateUser = (user) => {
        const { id, ...userModel } = user //из объекта вычленяет id, а всё остальное равно userModel
        return this.contact.findByIdAndUpdate(id, userModel, { new: true })
    }
    deleteUser = (id) => {
        return this.contact.findByIdAndDelete(id)
    }

}

export default new Contact
