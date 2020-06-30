import jwt from "jsonwebtoken"

export const tokenMiddleware = async (req, res, next) => {

    const { authorization: token } = req.headers;

    if (!token) {
        res.status(401).json({ "message": "Not authorized" })
        return
    }
    try {
        const { id } = await jwt.verify(token, process.env.PRIVATE_KEY)
        req.user = { id }
        next()
    }
    catch (error) {
        if (!req.user) {
            res.status(401).json({ "message": "Not authorized" })
            return
        }
        res.status(400).send("Server error")
    }
}