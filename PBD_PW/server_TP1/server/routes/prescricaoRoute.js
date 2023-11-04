const express = require('express');

const router = express.Router();

const prescricaoService = require('../services/prescricaoService');

router.post('/prescricao', prescricaoService.Create);
router.get('/prescricao', prescricaoService.Read);
router.put('/prescricao', prescricaoService.Update);
router.delete('/prescricao', prescricaoService.Delete);

module.exports = router;