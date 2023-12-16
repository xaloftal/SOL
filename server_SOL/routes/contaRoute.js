const express = require('express');

const router = express.Router();

const contaService = require('../services/contaService');

router.get('/GetContasMedico', contaService.GetContasMedico);
router.get('/GetContasUtente', contaService.GetContasUtente);
router.put('/EliminarConta', contaService.RemoveConta);

module.exports = router;