const express = require('express');
const router = express.Router();

// Middleware para proteger rutas y restringir acceso solo a roles específicos
const { protect, restrictTo } = require('../middlewares/auth.middlware');
const centroController = require('../controllers/centro.controller');

// Ruta para agregar un nuevo vehículo (solo accesible para administradores)
router.post('/', protect, restrictTo('admin'), centroController.addCentro);

// Ruta para obtener todos los vehículos (accesible para cualquier usuario)
router.get('/', centroController.getAllCentros);

// Ruta para obtener un vehículo específico (accesible para cualquier usuario)
router.get('/:id', centroController.getCentro);

// Ruta para actualizar un vehículo (solo accesible para administradores)
router.patch('/:id', protect, restrictTo('admin'), centroController.updateCentro);

// Ruta para eliminar un vehículo (solo accesible para administradores)
router.delete('/:id', protect, restrictTo('admin'), centroController.deleteCentro);

module.exports = router;