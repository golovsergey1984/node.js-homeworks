const dbFunctions = require("./user.model");
const { newUserValidation } = require("./user.validator")

exports.listUsers = (req, res) => {
    const users = dbFunctions.listContacts();
    res.status(200).json(users)
}

exports.userFind = (req, res) => {
    let id = Number(req.params.contactId)
    if (!Number.isInteger(id)) {
        id = req.params.contactId
    }
    const userFind = dbFunctions.getById(id);
    if (userFind !== null) {
        res.status(200).json(userFind)
    }
    else {
        res.status(404).json({ "message": "Not found" })
    }

}

exports.userRemove = (req, res) => {
    let id = Number(req.params.contactId)
    if (!Number.isInteger(id)) {
        id = req.params.contactId
    }

    dbFunctions.removeContact(id).then(action => {
        if (action === true) {
            res.status(200).json({ "message": "contact deleted" })
        }
        else {
            res.status(404).json({ "message": "Not found" })
        }
    });
}

exports.contactAdded = (req, res) => {
    const { error } = newUserValidation.validate(req.body)
    if (error) {
        res.status(400).json({ "message": error.details[0].message })
        return
    }

    dbFunctions.addContact(req.body.name, req.body.email, req.body.phone)
        .then(data => { res.status(201).json(data) })

}

function isEmpty(obj) {
    for (let key in obj) {
        return true;
    }
    return false;
}

exports.updateData = (req, res) => {
    if (isEmpty(req.body) === false) {
        return res.status(400).json({ "message": "missing fields" })
    }

    let id = Number(req.params.contactId)
    if (!Number.isInteger(id)) {
        id = req.params.contactId
    }
    const updateItemContactFunc = dbFunctions.updateContact(req.body, id)
    if (updateItemContactFunc === false) {
        res.status(404).send('User does not exist')
    }
    else {
        res.status(200).send(updateItemContactFunc)
    }


}
