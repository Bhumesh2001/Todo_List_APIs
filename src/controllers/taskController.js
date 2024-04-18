const { Task } = require('../models/taskModel');

exports.addNewTask = async (req, res) => {
    try {
        const existingTask = await Task.findOne({ title: req.body.title });
        if (existingTask) {
            return res.status(200).send({ success: false, message: "Task allready exists" });
        };
        const task = new Task(req.body);
        await task.save();
        res.status(201).send({ success: true, message: "New task added successfully..." });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    };
};

exports.tasksList = async (req, res) => {
    try {
        const tasks = await Task.find({}, { __v: 0 });
        res.status(200).send({ success: true, tasks });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    };
};

exports.taskDetails = async (req, res) => {
    try {
        const _id = req.query.id;
        if (!_id) {
            return res.status(404).send({
                success: false,
                message: "id is required in query parameter."
            });
        };
        const task = await Task.findById(_id, { _id: 0, __v: 0 });
        if (!task) {
            return res.status(404).send({ success: false, message: "Task not found" });
        };
        res.status(200).send({ success: true, task });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    };
};

exports.updateTask = async (req, res) => {
    try {
        const { _id, ...taskData } = req.body;
        if (!_id) {
            return res.status(404).send({
                success: false,
                message: "id is required"
            });
        };
        const taskInfo = await Task.findByIdAndUpdate({ _id }, { $set: taskData }, { new: true });
        res.status(200).send({ success: true, message: "task updated successfully....", taskInfo });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    };
};

exports.deleteTask = async (req, res) => {
    try {
        const _id = req.query.id;
        if (!_id) {
            return res.status(404).send({
                success: false,
                message: "id is required in query parameter."
            });
        };
        await Task.findByIdAndDelete({ _id });
        res.status(200).send({ success: true, message: "task deleted successfull..." });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    };
};