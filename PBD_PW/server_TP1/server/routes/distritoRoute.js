const express = require('express');

const router = express.Router();

const distritoService = require('../services/distritoService');

router.post('/distrito', distritoService.Create);
router.get('/distrito', distritoService.Read);
router.put('/distrito', distritoService.Update);
router.delete('/distrito', distritoService.Delete);

module.exports = router;