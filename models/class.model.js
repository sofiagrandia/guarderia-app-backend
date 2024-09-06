const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    facility: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Facility',
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    availableSpaces: {
        type: Number,
        required: true
    },
    difficulty:{
        type: Number,
        required: true,
    },
    time:{
        type: String,
        required: true
    },
    duration:{
        type: Number,
        required: true,
    }
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;