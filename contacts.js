const fs = require("fs");
const { promises: fsPromises } = fs;
const path = require("path");


const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async function listContacts() {
    const data = await fsPromises.readFile(contactsPath, "utf-8")
    const contactsFromDb = JSON.parse(data)
    console.table(contactsFromDb)
}

const getContactById = async function getContactById(contactId) {
    const data = await fsPromises.readFile(contactsPath, "utf-8")
    const contactsFromDb = JSON.parse(data)
    const contactFind = contactsFromDb.find(item => item.id === contactId)
    console.table(contactFind)
}

const addContact = async function addContact(name, email, phone) {
    let data = await fsPromises.readFile(contactsPath, "utf-8")
    let contactsFromDb = JSON.parse(data)
    const id = contactsFromDb[contactsFromDb.length - 1].id + 1;
    const newContact = {
        "id": id,
        "name": name,
        "email": email,
        "phone": phone
    }
    contactsFromDb.push(newContact)
    await fsPromises.writeFile(contactsPath, JSON.stringify(contactsFromDb))
    data = await fsPromises.readFile(contactsPath, "utf-8");
    contactsFromDb = JSON.parse(data)
    console.table(contactsFromDb)
}


const removeContact = async function removeContact(contactId) {
    let data = await fsPromises.readFile(contactsPath, "utf-8")
    let contactsFromDb = JSON.parse(data)
    const contactFind = contactsFromDb.filter(item => item.id !== contactId)
    await fsPromises.writeFile(contactsPath, JSON.stringify(contactFind))
    data = await fsPromises.readFile(contactsPath, "utf-8");
    contactsFromDb = JSON.parse(data)
    console.table(contactsFromDb)
}



module.exports = {
    listContacts: listContacts,
    getContactById: getContactById,
    addContact: addContact,
    removeContact: removeContact

}
