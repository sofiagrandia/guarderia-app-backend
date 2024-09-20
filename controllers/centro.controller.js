const Centro = require("../models/centro.model");

const centroController = {
  // Agregar un nuevo centro
  addCentro: async (req, res) => {
    try {
      const {
        direccion,
        image,
        telefono,
        plazasDisponibles,
        precioBase,
        servicios
      } = req.body;
      const newCentro = new Centro({
        direccion,
        image,
        telefono,
        plazasDisponibles,
        precioBase,
        servicios
      });

      await newCentro.save();
      res
        .status(201)
        .json({ message: "Centro agregado con éxito", centro: newCentro });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error al agregar el centro",
          error: error.message,
        });
    }
  },

  // Obtener todas los centros
  getAllCentros: async (req, res) => {
    try {
      const centros = await Centro.find({});
      res.status(200).json(centros);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error al obtener los centros",
          error: error.message,
        });
    }
  },


  // Obtener un centro específico
  getCentro: async (req, res) => {
    try {
      const { id } = req.params;
      const centro = await Centro.findById(id);

      if (!centro) {
        return res.status(404).json({ message: "centro no encontrado" });
      }

      res.status(200).json(centro);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error al obtener el centro",
          error: error.message,
        });
    }
  },

  // Actualizar un centro
  updateCentro: async (req, res) => {
    try {
      const { id } = req.params;
      const {   direccion,
        image,
        telefono,
        plazasDisponibles,
        servicios } = req.body;
      const updatedCentro = await Centro.findByIdAndUpdate(
        id,
        {
          direccion,
          image,
          telefono,
          plazasDisponibles,
          servicios
        },
        { new: true }
      );

      if (!updatedCentro) {
        return res.status(404).json({ message: "Centro no encontrado" });
      }

      res
        .status(200)
        .json({
          message: "Centro actualizado con éxito",
          centro: updatedCentro,
        });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error al actualizar el Centro",
          error: error.message,
        });
    }
  },

  // Eliminar un Centro
  deleteCentro: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedCentro = await Centro.findByIdAndDelete(id);

      if (!deletedCentro) {
        return res.status(404).json({ message: "Centro no encontrado" });
      }

      res.status(200).json({ message: "Centro eliminado con éxito" });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error al eliminar el Centro",
          error: error.message,
        });
    }
  },
};

module.exports = centroController;
