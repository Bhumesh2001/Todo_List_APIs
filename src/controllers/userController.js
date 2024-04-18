const { User } = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.registerUser = async (req, res) => {
    try {
        const { password, ...data } = req.body;
        const dataObj = {
            ...data,
            password: await bcrypt.hash(password, saltRounds),
        };
        const user = new User(dataObj);
        await user.save();
        res.status(201).send({ success: true, message: "User registerd successfully..." });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    };
};

exports.loginUser = async (req, res) => {
    try {
        console.log('logged in successfully...');
        res.status(200).send({ success: true, message: 'logged in successfull....' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    };
};