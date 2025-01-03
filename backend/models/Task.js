const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    msg : {
        type: String,
        required: true
    },
    desc : {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Task' , taskSchema);