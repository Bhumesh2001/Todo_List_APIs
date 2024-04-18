const Joi = require('joi');

exports.taskValidationSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    completed: Joi.boolean().required(),
    image: Joi.string().uri().optional(),
});
