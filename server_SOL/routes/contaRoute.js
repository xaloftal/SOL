const express = require('express');

const router = express.Router();

const contaService = require('../services/contaService');

router.post('/contas', contaService.GetContasMedico);
router.post('/contas', contaService.GetContasUtente);
module.exports = router;