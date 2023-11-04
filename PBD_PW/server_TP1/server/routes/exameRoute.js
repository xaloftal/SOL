const express = require('express');

const router = express.Router();

const exameService = require('../services/exameService');

router.post('/concelho', exameService.Create);
router.get('/concelho', exameService.Read);
router.put('/concelho', exameService.Update);
router.delete('/concelho', exameService.Delete);

module.exports = router;