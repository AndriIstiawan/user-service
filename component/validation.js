//Validation
const Joi = require('joi');

//Ar Validation
exports.userValidation = data => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        phone: Joi.string().required()
    }).options({ allowUnknown: true });
    return schema.validate(data);
};

exports.loginValidation = data => {
    const schema = Joi.object({
        identify: Joi.string().required(),
    }).options({ allowUnknown: true });
    return schema.validate(data);
};