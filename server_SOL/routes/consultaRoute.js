const express = require('express');

const router = express.Router();

const consultaService = require('../services/consultaService');

router.get('/consulta', consultaService.Read);

module.exports = router;