import User from "./users.model"

export const getUsersController = async (req, res) => {
    try {
        const contacts = await User.getUser()
        res.status(200).json(contacts)

    } catch (err) {
        res.status(500).send("Server error")
    }
}

export const createUserController = async (req, res) => {
    try {
        const createdContact = await User.createUser(req.body)
        res.status(201).json(createdContact)
    }
    catch (err) {
        res.status(500).send(err)
    }
}

export const findUserController = async (req, res) => {
    try {
        const contacts = await User.getUserById(req.params.id)

        res.status(200).json(contacts)

    } catch (err) {
        res.status(500).send("Server error")
    }
}

export const updateUserController = async (req, res) => {
    const isQueryHasProps = !!Object.keys(req.body).length
    if (isQueryHasProps === false) {
        return res.status(400).json({ "message": "missing fields" })
    }
    try {
        const contacts = await User.updateUser(req.body)
        res.status(200).json(contacts)

    } catch (err) {
        res.status(500).send("Server error")
    }
}

export const deleteUserController = async (req, res) => {
    try {
        await User.deleteUser(req.params.id)
        res.status(200).json({ "message": "contact deleted" })

    } catch (err) {
        res.status(500).send("Server error")
    }
}


export const findUserByToken = async (req, res) => {
    try {
        const contact = await User.getUserById(req.user.id)
        const user = {
            "email": contact.email,
            "subscription": contact.subscription
        }
        res.status(200).json(user)

    } catch (err) {
        res.status(500).send("Server error")
    }
}

export const uploadAvatarController = async (req, res) => {

    try {
        const oldUserAvatar = await User.getUserById(req.user.id)
        const oldAvatarFileName = oldUserAvatar.avatarURL.substr(oldUserAvatar.avatarURL.lastIndexOf('/') + 1);
        User.deleteUserAvatar(oldAvatarFileName)
    } catch (e) { res.status(500).send("Server error") }
    try {
        const { path } = req.file;
        const data = {
            id: req.user.id,
            avatarURL: req.protocol + '://' + req.headers.host + '/images/' + req.file.filename,
            /* avatarURL: path, */
        }
        const user = await User.updateUser(data)
        const newUserAvatar = user.avatarURL
        res.status(200).json({ "avatarURL": newUserAvatar })
    }
    catch (err) {
        res.status(500).send("Server error")
    }

}