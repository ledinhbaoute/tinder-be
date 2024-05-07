'use strict';
const router = require('express').Router();
const userCtrl = require('../controllers/user.controller');

router.post('/api/register', userCtrl.addUser);
router.post('/api/sendOTP', userCtrl.sendOTP);

module.exports = router;
