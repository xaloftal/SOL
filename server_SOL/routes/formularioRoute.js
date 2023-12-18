const express = require('express');

const router = express.Router();

const formularioService = require('../services/formularioService');

router.post('/formulario', formularioService.Create);
router.get('/formulario', formularioService.GetFormulariosNaoRespondidos);
router.get('/formulariorespondidos', formularioService.GetFormulariosRespondidos);
router.put('/formulario', formularioService.IgnorarFormulario);

module.exports = router;