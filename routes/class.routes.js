const express = require('express');
const router = express.Router();

// Middleware para proteger rutas y restringir acceso solo a roles específicos
const { protect, restrictTo } = require('../middlewares/auth.middlware');
const classController = require('../controllers/class.controller');

// Ruta para agregar un nuevo vehículo (solo accesible para administradores)
router.post('/', protect, restrictTo('admin'), classController.addClass);

// Ruta para obtener todos los vehículos (accesible para cualquier usuario)
router.get('/', classController.getAllClasses);

// Ruta para obtener un vehículo específico (accesible para cualquier usuario)
router.get('/:id', classController.getClass);

// Ruta para actualizar un vehículo (solo accesible para administradores)
router.patch('/:id', protect, restrictTo('admin'), classController.updateClass);

// Ruta para eliminar un vehículo (solo accesible para administradores)
router.delete('/:id', protect, restrictTo('admin'), classController.deleteClass);

module.exports = router;