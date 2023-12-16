const express = require('express');

const router = express.Router();

const registoService = require('../services/registoService');

router.post('/RegistoUtente', registoService.RegistoUtente);
router.post('/RegistoMedico', registoService.RegistoMedico);
router.post('/RegistoMedico', registoService.RegistoAdm);
module.exports = router;