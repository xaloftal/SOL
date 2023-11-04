const express = require('express');

const router = express.Router();

const concelhoService = require('../services/concelhoService');

router.post('/concelho', concelhoService.Create);
router.get('/concelho', concelhoService.Read);
router.put('/concelho', concelhoService.Update);
router.delete('/concelho', concelhoService.Delete);

module.exports = router;