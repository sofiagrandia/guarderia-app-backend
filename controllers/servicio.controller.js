const Servicio = require("../models/servicio.model");

const servicioController = {
  // Agregar un nuevo servicio
  addServicio: async (req, res) => {
    try {
      const { titulo, description, image, available, precio } = req.body;
      const newServicio = new Servicio({
        titulo, description, image, available, precio
      });

      await newServicio.save();
      res
        .status(201)
        .json({
          message: "Servicio agregado con éxito",
          servicio: newServicio,
        });
    } catch (error) {
      res.status(500).json({
        message: "Error al agregar el servicio",
        error: error.message,
      });
    }
  },

  // Obtener todas los servicios
  getAllServicios: async (req, res) => {
    try {
      const servicios = await Servicio.find({});
      res.status(200).json(servicios);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los servicios",
        error: error.message,
      });
    }
  },

  // Obtener un servicio específico
  getServicio: async (req, res) => {
    try {
      const { id } = req.params;
      const servicio = await Servicio.findById(id);

      if (!servicio) {
        return res.status(404).json({ message: "servicio no encontrado" });
      }

      res.status(200).json(servicio);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener el servicio",
        error: error.message,
      });
    }
  },

  // Actualizar un servicio
  updateServicio: async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo, description, image, available, precio } = req.body;
      const updatedServicio = await Servicio.findByIdAndUpdate(
        id,
        {
          titulo, description, image, available, precio
        },
        { new: true }
      );

      if (!updatedServicio) {
        return res.status(404).json({ message: "Servicio no encontrado" });
      }

      res.status(200).json({
        message: "Servicio actualizado con éxito",
        servicio: updatedServicio,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar el servicio",
        error: error.message,
      });
    }
  },

  // Eliminar un servicio
  deleteServicio: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedServicio = await Servicio.findByIdAndDelete(id);

      if (!deletedServicio) {
        return res.status(404).json({ message: "Servicio no encontrado" });
      }

      res.status(200).json({ message: "Servicio eliminado con éxito" });
    } catch (error) {
      res.status(500).json({
        message: "Error al eliminar el servicio",
        error: error.message,
      });
    }
  },
};

module.exports = servicioController;
