const Booking = require("../models/booking.model");
const Class = require("../models/class.model");

const bookingController = {
  // Crear una nueva reserva
  createBooking: async (req, res) => {
    try {
      const { myClass, date, price, extras, discount } = req.body;

      // Verificar disponibilidad del vehículo
      const classAvailable = await Class.findById(myClass);
      if (!classAvailable.availableSpaces > 0) {
        return res.status(400).json({ message: "Vehículo no disponible" });
      }

      const newBooking = new Booking({
        user: req.user._id,
        myClass,
        date,
        price,
        extras,
        discount,
      });

      await newBooking.save();

      // Actualizar la disponibilidad de la clase
      await Class.findByIdAndUpdate(myClass, { availableSpaces: availableSpaces-1 });

      res
        .status(201)
        .json({ message: "Booking created successfully", booking: newBooking });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al crear la reserva", error: error.message });
    }
  },

  // Obtener reservas por usuario
  getBookingsByUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const bookings = await Booking.find({ user: userId }).populate("class");

      res.status(200).json(bookings);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error al obtener las reservas",
          error: error.message,
        });
    }
  },

  // Obtener una reserva específica
  getBooking: async (req, res) => {
    try {
      const { id } = req.params;
      const booking = await Booking.findById(id).populate("class");

      if (!booking) {
        return res.status(404).json({ message: "Reserva no encontrada" });
      }

      res.status(200).json(booking);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener la reserva", error: error.message });
    }
  },

  // Cancelar una reserva
  cancelBooking: async (req, res) => {
    try {
      const { id } = req.params;

      const booking = await Booking.findById(id);
      if (!booking) {
        return res.status(404).json({ message: "Reserva no encontrada" });
      }

      // Actualizar la disponibilidad del vehículo
      await Class.findByIdAndUpdate(booking.class, { availableSpaces: availableSpaces+1 });

      await Booking.findByIdAndDelete(id);

      res.status(200).json({ message: "Booking cancelled successfully" });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error al cancelar la reserva",
          error: error.message,
        });
    }
  },
};

module.exports = bookingController;
