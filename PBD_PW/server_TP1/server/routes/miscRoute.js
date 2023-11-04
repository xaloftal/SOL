
const express = require('express');

const router = express.Router();

const miscService = require('../services/miscService');

router.get('/misc/GetDoentesFormConsultasMedicosCount', miscService.GetDoentesFormConsultasMedicosCount);
router.get('/misc/GetMedicosByEspecialidade', miscService.GetMedicosByEspecialidade);
router.get('/misc/DoLogin', miscService.DoLogin);
module.exports = router;
