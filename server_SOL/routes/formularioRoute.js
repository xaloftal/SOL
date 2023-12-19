const express = require('express');

const router = express.Router();

const formularioService = require('../services/formularioService');

router.post('/formulario', formularioService.Create);
router.get('/formulario', formularioService.GetFormulariosNaoRespondidos);
router.get('/formulariorespondidos', formularioService.GetFormulariosRespondidos);
router.put('/formulario', formularioService.IgnorarFormulario);
router.put('/formulario/responder', formularioService.ResponderFormulario);
router.post('/formulario/prescricao/exame', formularioService.PrescreverExameForm);
router.post('/formulario/prescricao/medicamento', formularioService.PrescreverMedicamentoForm);
router.post('/formulario/prescricao', formularioService.PrescreverForm);
router.post('/formulario/prescricao/consulta', formularioService.PrescreverConsulta);
module.exports = router;