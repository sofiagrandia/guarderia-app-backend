const mongoose = require('mongoose');

const centroSchema = new mongoose.Schema({
    direccion:{
        type: String,
        required: true,
    },
    image: {
        type: [String],
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    plazasDisponibles:{
        type: Number,
        required: true
    },
    precioBase:{
        type: Number,
        required: true
    },
    servicios:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:'Servicio',
        required: true
    }
    
});

const Centro = mongoose.model('Centro', centroSchema);

module.exports = Centro;