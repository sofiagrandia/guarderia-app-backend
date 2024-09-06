const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
    name: {
        type: String,
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
    equipment: {
        type: [String],
        required: true
    },
    floor:{
        type: Number,
        required: true
    },
    size:{
        type: Number,
        required: true
    }
});

const Facility = mongoose.model('Facility', facilitySchema);

module.exports = Facility;