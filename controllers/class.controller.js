const Class = require("../models/class.model");

const classController = {
  // Agregar un nueva clase
  addClass: async (req, res) => {
    try {
      const {
        name,
        facility,
        description,
        image,
        availableSpaces,
        difficulty,
        time,
        duration
      } = req.body;
      const newClass = new Class({
        name,
        facility,
        description,
        image,
        availableSpaces,
        difficulty,
        time,
        duration
      });

      await newClass.save();
      res
        .status(201)
        .json({ message: "Clase agregado con éxito", class: newClass });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error al agregar la clase",
          error: error.message,
        });
    }
  },

  // Obtener todas las clases
  getAllClasses: async (req, res) => {
    try {
      const classes = await Class.find({});
      res.status(200).json(classes);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error al obtener las clases",
          error: error.message,
        });
    }
  },

  // Obtener una clase específica
  getClass: async (req, res) => {
    try {
      const { id } = req.params;
      const myClass = await Class.findById(id);

      if (!myClass) {
        return res.status(404).json({ message: "Class no encontrado" });
      }

      res.status(200).json(myClass);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error al obtener el Class",
          error: error.message,
        });
    }
  },

  // Actualizar un vehículo
  updateClass: async (req, res) => {
    try {
      const { id } = req.params;
      const { name,
        facility,
        description,
        image,
        availableSpaces,
        difficulty,
        time,
        duration } = req.body;
      const updatedClass = await Class.findByIdAndUpdate(
        id,
        {
            name,
            facility,
            description,
            image,
            availableSpaces,
            difficulty,
            time,
            duration
        },
        { new: true }
      );

      if (!updatedClass) {
        return res.status(404).json({ message: "Class no encontrado" });
      }

      res
        .status(200)
        .json({
          message: "Class actualizado con éxito",
          class: updatedClass,
        });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error al actualizar el Class",
          error: error.message,
        });
    }
  },

  // Eliminar un vehículo
  deleteClass: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedClass = await Class.findByIdAndDelete(id);

      if (!deletedClass) {
        return res.status(404).json({ message: "Class no encontrado" });
      }

      res.status(200).json({ message: "Class eliminado con éxito" });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error al eliminar el class",
          error: error.message,
        });
    }
  },
};

module.exports = classController;
