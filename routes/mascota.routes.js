const express = require('express');
const router = express.Router();
const mascotaController = require('../controllers/mascota.controller');
const { protect, restrictTo } = require('../middlewares/auth.middlware');

// Routes for mascotas
router.post('/',  mascotaController.addMascota);
router.get('/', mascotaController.getAllMascotas);
router.get('/:id', mascotaController.getMascota);
router.put('/:id', mascotaController.updateMascota);
router.delete('/:id', mascotaController.deleteMascota);

module.exports = router;
