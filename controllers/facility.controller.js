const Facility = require("../models/facility.model");

const facilityController = {
  // Agregar un nueva Facility
  addFacility: async (req, res) => {
    try {
      const { name, description, image, equipment, floor, size } = req.body;
      const newFacility = new Facility({
        name,
        description,
        image,
        equipment,
        floor,
        size,
      });

      await newFacility.save();
      res
        .status(201)
        .json({
          message: "Facility agregado con éxito",
          facility: newFacility,
        });
    } catch (error) {
      res.status(500).json({
        message: "Error al agregar la Facility",
        error: error.message,
      });
    }
  },

  // Obtener todas las Facility
  getAllFacilities: async (req, res) => {
    try {
      const facilities = await Facility.find({});
      res.status(200).json(facilities);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener las facilities",
        error: error.message,
      });
    }
  },

  // Obtener una Facility específica
  getFacility: async (req, res) => {
    try {
      const { id } = req.params;
      const facility = await Facility.findById(id);

      if (!facility) {
        return res.status(404).json({ message: "Facility no encontrado" });
      }

      res.status(200).json(facility);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener el Facility",
        error: error.message,
      });
    }
  },

  // Actualizar un vehículo
  updateFacility: async (req, res) => {
    try {
      const { id } = req.params;
      const { brand, model, image, pricePerDay, available } = req.body;
      const updatedFacility = await Facility.findByIdAndUpdate(
        id,
        {
          name,
          description,
          image,
          equipment,
          floor,
          size,
        },
        { new: true }
      );

      if (!updatedFacility) {
        return res.status(404).json({ message: "Facility no encontrado" });
      }

      res.status(200).json({
        message: "Facility actualizado con éxito",
        facility: updatedFacility,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar el Facility",
        error: error.message,
      });
    }
  },

  // Eliminar un vehículo
  deleteFacility: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedFacility = await Facility.findByIdAndDelete(id);

      if (!deletedFacility) {
        return res.status(404).json({ message: "Facility no encontrado" });
      }

      res.status(200).json({ message: "Facility eliminado con éxito" });
    } catch (error) {
      res.status(500).json({
        message: "Error al eliminar el Facility",
        error: error.message,
      });
    }
  },
};

module.exports = facilityController;
