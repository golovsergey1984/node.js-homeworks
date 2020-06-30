import jwt from "jsonwebtoken"

export const createToken = async (id) => {
    return jwt.sign({ id }, process.env.PRIVATE_KEY, { expiresIn: 2 * 24 * 60 * 60 })//expiresIn - срок жизни Токена (измеряется в секундах)
}