const Booking = require("../models/booking.model");
const Centro = require("../models/centro.model");

const bookingController = {
  // Crear una nueva reserva
  createBooking: async (req, res) => {
    try {
      const { centro, dateIn, dateOut, price, discount, services } = req.body;
      console.log("Servicios en back", services);
      console.log(req.body);


      // Verificar disponibilidad del centro
      const centroAvailable = await Centro.findById(centro);

       // Convert dateIn and dateOut to Date objects for querying
       const startDate = new Date(dateIn);
       const endDate = new Date(dateOut);
 
       // Check if the centro exists
       if (!centroAvailable) {
         return res.status(404).json({ message: "Centro no encontrado" });
       }
 
       // Check for existing bookings that overlap with the desired date range
       const overlappingBookings = await Booking.find({
         centro,
         $or: [
           // Existing booking starts during the requested period
           { dateIn: { $lt: endDate }, dateOut: { $gte: startDate } },
           // Existing booking ends during the requested period
           { dateOut: { $gt: startDate }, dateIn: { $lte: endDate } }
         ]
       });
 
       // Calculate the number of spaces that are already booked during this period
       const bookedSpaces = overlappingBookings.length;
 
       // Check if there are enough available spaces
       if (bookedSpaces >= centroAvailable.plazasDisponibles) {
         return res.status(400).json({
           message: `No hay suficientes plazas disponibles para las fechas seleccionadas. ${bookedSpaces} ya están reservadas.`
         });
       }
      if (centroAvailable.plazasDisponibles <= 0) {
        return res.status(400).json({ message: "No hay plazas disponibles" });
      }

      const newBooking = new Booking({
        user: req.user._id,
        centro,
        dateIn,
        dateOut,
        
        price,
        discount,
        services,
      });

      console.log(newBooking);
      await newBooking.save();

      // Actualizar la disponibilidad de la centro
      /*await Centro.findByIdAndUpdate(centro, {
        availableSpaces: availableSpaces - 1,
      });*/

      res
        .status(201)
        .json({ message: "Booking created successfully", booking: newBooking });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al crear la reserva", error: error.message });
      console.log(error);
    }
  },

  // Obtener reservas por usuario
  getBookingsByUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const bookings = await Booking.find({ user: userId }).populate("centro");

      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener las reservas",
        error: error.message,
      });
    }
  },

  // Obtener una reserva específica
  getBooking: async (req, res) => {
    try {
      const { id } = req.params;
      const booking = await Booking.findById(id).populate("centro");

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

  getAllBookings: async (req, res) => {
    try {

      const booking = await Booking.find({});

      res.status(200).json(booking);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener las reservas", error: error.message });
    }
  },
  // Cancelar una reserva
  cancelBooking: async (req, res) => {
    try {
      const { userId, id } = req.params;

      const booking = await Booking.findById(id);
      if (!booking) {
        return res.status(404).json({ message: "Reserva no encontrada" });
      }

      // Actualizar la disponibilidad del vehículo
      const centro = await Centro.findById(booking.centro);
      if (!centro) {
        return res.status(404).json({ message: "Centro no encontrado" });
      }

      // Update the available spaces
      const updatedPlazasDisponibles = centro.plazasDisponibles + 1;

      await Centro.findByIdAndUpdate(booking.centro, {
        plazasDisponibles: updatedPlazasDisponibles,
      });

      await Booking.findByIdAndDelete(id);

      res.status(200).json({ message: "Booking cancelled successfully" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        message: "Error al cancelar la reserva",
        error: error.message,
      });
    }
  },
};

module.exports = bookingController;
