const express = require('express');

const router = express.Router();

const exameService = require('../services/exameService');

router.post('/exame', exameService.Create);
router.get('/exame', exameService.Read);

module.exports = router;