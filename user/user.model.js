const path = require("path");
const fs = require("fs");
const { promises: fsPromises } = fs;
const shortid = require("shortid");
const contactsPath = path.join(__dirname, "../db/contacts.json");
const bd = require(contactsPath)

const listContacts = () => bd

const getById = contactId => bd.find(item => item.id === contactId) || null

const removeContact = async function (contactId) {
    const newDb = bd.filter(item => item.id !== contactId)
    if (newDb.length !== bd.length) {
        await fsPromises.writeFile(contactsPath, JSON.stringify(newDb))
        return true
    }
    return false

}


const addContact = async function addContact(name, email, phone) {

    const newContact = {
        "id": shortid(),
        "name": name,
        "email": email,
        "phone": phone
    }
    let data = await fsPromises.readFile(contactsPath, "utf-8")
    let contactsFromDb = JSON.parse(data)
    contactsFromDb.push(newContact)
    await fsPromises.writeFile(contactsPath, JSON.stringify(contactsFromDb))
    return newContact
}
const updateContact = function updateContact(req, id) {
    const targetUserIndex = bd.findIndex(item => item.id === id)
    if (!targetUserIndex) {
        return false
    }

    bd[targetUserIndex] = {
        ...bd[targetUserIndex],
        ...req
    }


    return bd[targetUserIndex]
}


module.exports = {
    listContacts: listContacts,
    getById: getById,
    addContact: addContact,
    removeContact: removeContact,
    updateContact: updateContact

}
