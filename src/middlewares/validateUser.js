const { userValidationSchema } = require('../validations/userValidations');

exports.validateToUser = (req, res, next) => {
    const { error } = userValidationSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const messages = [];
        error.details.forEach((element) => {
            messages.push(element.message);
        });
        res.status(403).send({ success: false, messages });
    } else {
        next();
    };
};