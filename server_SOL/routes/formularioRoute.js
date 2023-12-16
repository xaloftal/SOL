const express = require('express');

const router = express.Router();

const formularioService = require('../services/formularioService');

router.post('/formulario', formularioService.Create);
router.get('/formulario', formularioService.GetFormulariosNaoRespondidos);
router.get('/formulario', formularioService.GetFormulariosNaoRespondidos);
router.put('/formulario', formularioService.IgnorarFormulario);

module.exports = router;