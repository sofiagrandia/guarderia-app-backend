const mongoose = require('mongoose');

const servicioSchema = new mongoose.Schema({
    titulo: {
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
    available: {
        type: Boolean,
        required: true
    }, 
    precio: {
        type: Number,
        required: true
    }
});

const Servicio = mongoose.model('Servicio', servicioSchema);

module.exports = Servicio;