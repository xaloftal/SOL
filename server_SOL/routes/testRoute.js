const express = require('express');

const router = express.Router();

const testService = require('../services/testService');

router.get('/test', testService.Read);

module.exports = router;