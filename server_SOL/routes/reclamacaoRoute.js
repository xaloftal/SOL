const express = require('express');

const router = express.Router();

const reclamacaoService = require('../services/reclamacaoService');

router.post('/reclamacao', reclamacaoService.Create);
router.get('/reclamacao', reclamacaoService.Read);
router.put('/reclamacao', reclamacaoService.Update);
router.delete('/reclamacao', reclamacaoService.Delete);

module.exports = router;