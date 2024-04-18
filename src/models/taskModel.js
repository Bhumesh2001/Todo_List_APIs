const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
    }
});

exports.Task = mongoose.model('Task', taskSchema);