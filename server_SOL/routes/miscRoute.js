const express = require('express');

const router = express.Router();

const miscService = require('../services/miscService');

router.get('/misc/GetUtentesFormConsultasMedicosCount', miscService.GetUtentesFormConsultasMedicosCount);
router.get('/misc/GetMedicosByEspecialidade', miscService.GetMedicosByEspecialidade);

module.exports = router;