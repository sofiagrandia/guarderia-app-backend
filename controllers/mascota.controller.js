const Mascota = require('../models/mascota.model');

const mascotaController = {
  // Agregar una nueva mascota
  addMascota: async (req, res) => {
    try {
      const { name, type, raza, fechaNacimiento } = req.body;
      const newMascota = new Mascota({
        name,
        type,
        raza,
        fechaNacimiento
      });

      await newMascota.save();
      res
        .status(201)
        .json({ message: 'Mascota agregada con éxito', mascota: newMascota });
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'Error al agregar la mascota',
          error: error.message,
        });
    }
  },

  // Obtener todas las mascotas
  getAllMascotas: async (req, res) => {
    try {
      const mascotas = await Mascota.find({});
      res.status(200).json(mascotas);
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'Error al obtener las mascotas',
          error: error.message,
        });
    }
  },

  // Obtener una mascota específica
  getMascota: async (req, res) => {
    try {
      const { id } = req.params;
      const mascota = await Mascota.findById(id);

      if (!mascota) {
        return res.status(404).json({ message: 'Mascota no encontrada' });
      }

      res.status(200).json(mascota);
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'Error al obtener la mascota',
          error: error.message,
        });
    }
  },

  // Actualizar una mascota
  updateMascota: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, type, raza, fechaNacimiento } = req.body;
      const updatedMascota = await Mascota.findByIdAndUpdate(
        id,
        {
          name,
          type,
          raza,
          fechaNacimiento
        },
        { new: true }
      );

      if (!updatedMascota) {
        return res.status(404).json({ message: 'Mascota no encontrada' });
      }

      res
        .status(200)
        .json({
          message: 'Mascota actualizada con éxito',
          mascota: updatedMascota,
        });
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'Error al actualizar la mascota',
          error: error.message,
        });
    }
  },

  // Eliminar una mascota
  deleteMascota: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedMascota = await Mascota.findByIdAndDelete(id);

      if (!deletedMascota) {
        return res.status(404).json({ message: 'Mascota no encontrada' });
      }

      res.status(200).json({ message: 'Mascota eliminada con éxito' });
    } catch (error) {
      res
        .status(500)
        .json({
          message: 'Error al eliminar la mascota',
          error: error.message,
        });
    }
  },
};

module.exports = mascotaController;
