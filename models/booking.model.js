const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    centro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Centro',
        required: true
    },
    servicio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Servicio',
        required: true
    },
    dateIn: {
        type: Date,
        required: true
    },
    dateOut: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0,
        validate: {
            validator: function(value) {
                return value >= 0;
            },
            message: 'El descuento no puede ser negativo.'
        }
    }
});

// Método para calcular el precio final después del descuento
bookingSchema.methods.calculateFinalPrice = function() {
    return this.price - this.discount;
};

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
