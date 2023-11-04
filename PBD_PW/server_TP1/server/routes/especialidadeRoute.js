const express = require('express');

const router = express.Router();

const especialidadeService = require('../services/especialidadeService');

router.post('/especialidade', especialidadeService.Create);
router.get('/especialidade', especialidadeService.Read);
router.put('/especialidade', especialidadeService.Update);
router.delete('/especialidade', especialidadeService.Delete);
router.get('/especialidade/count', especialidadeService.Count);

module.exports = router;