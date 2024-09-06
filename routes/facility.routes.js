const express = require('express');
const router = express.Router();

// Middleware para proteger rutas y restringir acceso solo a roles específicos
const { protect, restrictTo } = require('../middlewares/auth.middlware');
const classController = require('../controllers/facility.controller');
const facilityController = require('../controllers/facility.controller');

// Ruta para agregar un nuevo vehículo (solo accesible para administradores)
router.post('/', protect, restrictTo('admin'), facilityController.addFacility);

// Ruta para obtener todos los vehículos (accesible para cualquier usuario)
router.get('/', facilityController.getAllFacilities);

// Ruta para obtener un vehículo específico (accesible para cualquier usuario)
router.get('/:id', facilityController.getFacility);

// Ruta para actualizar un vehículo (solo accesible para administradores)
router.patch('/:id', protect, restrictTo('admin'), facilityController.updateFacility);

// Ruta para eliminar un vehículo (solo accesible para administradores)
router.delete('/:id', protect, restrictTo('admin'), facilityController.deleteFacility);

module.exports = router;