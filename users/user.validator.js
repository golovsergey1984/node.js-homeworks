import Joi from '@hapi/joi';

const newUserValidationSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    phone: Joi.string()
        .required(),
    subscription: Joi.string()
        .required(),
    password: Joi.string()
        .required(),
    token: Joi.string().allow('')

})

export const userValidateMiddleware = (req, res, next) => {
    const { error } = newUserValidationSchema.validate(req.body)
    if (error) {
        res.status(400).json({ "message": error.details[0].message })
        return
    }
    next()
}
