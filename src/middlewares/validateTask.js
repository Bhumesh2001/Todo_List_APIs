const { taskValidationSchema } = require('../validations/taskValidations');

exports.validateToTask = (req, res, next) => {
    const { _id, ...data } = req.body;
    const { error } = taskValidationSchema.validate(data, { abortEarly: false });
    if (error) {
        const messages = [];
        error.details.forEach((element) => {
            messages.push(element.message.split('\"').join(''));
        });
        res.status(403).send({ success: false, messages });
    } else {
        next();
    };
};
