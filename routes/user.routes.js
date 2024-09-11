const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');


// Ruta para obtener todos los vehículos (accesible para cualquier usuario)
router.get('/', userController.getAllUsers);

// Ruta para obtener un vehículo específico (accesible para cualquier usuario)
router.get('/:userId', userController.getUser);
// Ruta para registrar un nuevo usuario
router.post('/register', userController.register);

// Ruta para el inicio de sesión
router.post('/login', userController.login);

// Ruta para actualizar el perfil de usuario
// Asegúrate de que solo usuarios logueados puedan acceder a esta ruta
router.patch('/:userId', userController.updateProfile);

module.exports = router;
