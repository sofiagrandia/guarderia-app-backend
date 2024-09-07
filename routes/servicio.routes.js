const express = require('express');
const router = express.Router();

// Middleware para proteger rutas y restringir acceso solo a roles específicos
const { protect, restrictTo } = require('../middlewares/auth.middlware');
const servicioController = require('../controllers/servicio.controller');

// Ruta para agregar un nuevo vehículo (solo accesible para administradores)
router.post('/', protect, restrictTo('admin'), servicioController.addServicio);

// Ruta para obtener todos los vehículos (accesible para cualquier usuario)
router.get('/', servicioController.getAllServicios);

// Ruta para obtener un vehículo específico (accesible para cualquier usuario)
router.get('/:id', servicioController.getServicio);

// Ruta para actualizar un vehículo (solo accesible para administradores)
router.patch('/:id', protect, restrictTo('admin'), servicioController.updateServicio);

// Ruta para eliminar un vehículo (solo accesible para administradores)
router.delete('/:id', protect, restrictTo('admin'), servicioController.deleteServicio);

module.exports = router;