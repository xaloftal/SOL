const express = require('express');

const router = express.Router();

const formularioService = require('../services/formularioService');

router.post('/formulario', formularioService.Create);
router.get('/formulario', formularioService.Read);
router.put('/formulario', formularioService.Update);
router.delete('/formulario', formularioService.Delete);

module.exports = router;
