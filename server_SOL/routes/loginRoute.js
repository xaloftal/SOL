
const express = require('express');

const router = express.Router();

const loginService = require('../services/loginService');

router.get('/login/DoLogin', loginService.DoLogin);

module.exports = router;
