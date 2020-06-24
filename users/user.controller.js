import Contact from "./users.model"

export const getUsersController = async (req, res) => {
    try {
        const contacts = await Contact.getContact()
        res.status(200).json(contacts)

    } catch (err) {
        console.log(err)
        res.status(500).send("Server error")
    }
}

export const createUserController = async (req, res) => {
    try {
        const createdContact = await Contact.createContact(req.body)
        res.status(201).json(createdContact)
    }
    catch (err) {
        res.status(500).send(err)
    }
}

export const findUserController = async (req, res) => {
    try {
        const contacts = await Contact.getContactById(req.params.id)
        res.status(200).json(contacts)

    } catch (err) {
        console.log(err)
        res.status(500).send("Server error")
    }
}

export const updateUserController = async (req, res) => {
    const isQueryHasProps = !!Object.keys(req.body).length
    if (isQueryHasProps === false) {
        return res.status(400).json({ "message": "missing fields" })
    }
    try {
        const contacts = await Contact.updateUser(req.body)
        res.status(200).json(contacts)

    } catch (err) {
        console.log(err)
        res.status(500).send("Server error")
    }
}

export const deleteUserController = async (req, res) => {
    try {
        await Contact.deleteUser(req.params.id)
        res.status(200).json({ "message": "contact deleted" })

    } catch (err) {
        console.log(err)
        res.status(500).send("Server error")
    }
}

