const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const mascotaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    raza: {
        type: String,
        required: true
    },
    fechaNacimient: {
        type: Date,
        required: true
    }
});

// Hash the password before saving


const Mascota = mongoose.model('Mascota', mascotaSchema);

module.exports = Mascota;