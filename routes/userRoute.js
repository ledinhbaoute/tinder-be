'use strict';
const router = require('express').Router();
const userCtrl = require('../controllers/user.controller');

router.post('/api/register', userCtrl.addUser);

module.exports = router;
