const Joi = require('joi');

exports.userValidationSchema = Joi.object({
    username: Joi.string().required().messages({
        'any.required': 'username is required.'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Email must be a valid email address.',
        'any.required': 'Email is required.'
    }),
    password: Joi.string().required().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
        .messages({
            'string.min': 'Password must be at least 8 characters long.',
            'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, and one digit.'
        }),
    age: Joi.number().integer().min(18).required().messages({
        'number.base': 'Age must be a number.',
        'number.integer': 'Age must be an integer.',
        'number.min': 'Age must be at least 18 years old.',
        'any.required': 'Age is required.'
    }),
    gender: Joi.string().valid('male', 'female', 'other').required().messages({
        'any.only': 'Gender must be one of "male", "female", or "other".',
        'any.required': 'Gender is required.'
    }),
    country: Joi.string().required().messages({
        'any.required': 'Country is required.'
    }),
    city: Joi.string().required().messages({
        'any.required': 'City is required.'
    })
}).messages({
    'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, and one digit.'
});
