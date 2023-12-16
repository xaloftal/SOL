const express = require('express');

const router = express.Router();

const especialidadeService = require('../services/especialidadeService');

router.post('/especialidade', especialidadeService.Create);
router.get('/especialidade', especialidadeService.Read);
router.get('/especialidade/count', especialidadeService.Count);

module.exports = router;