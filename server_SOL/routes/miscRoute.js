const express = require('express');

const router = express.Router();

const miscService = require('../services/miscService');

router.get('/GetUtentesFormConsultasMedicosCount', miscService.GetUtentesFormConsultasMedicosCount);
router.get('/GetMedicosByEspecialidade', miscService.GetMedicosByEspecialidade);

module.exports = router;