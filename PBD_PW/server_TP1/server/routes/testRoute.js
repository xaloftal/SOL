const express = require('express');

const router = express.Router();

const testService = require('../services/testService');

router.post('/test', testService.Create);
router.get('/test', testService.Read);
router.put('/test', testService.Update);
router.delete('/test', testService.Delete);

module.exports = router;