const express = require('express');

const router = express.Router();

const medicamentoService = require('../services/medicamentoService');

router.post('/medicamento', medicamentoService.Create);
router.get('/medicamento', medicamentoService.Read);

module.exports = router;