'use strict';
const router = require('express').Router();
const userCtrl = require('../controllers/userphoto.controller');

router.post('/api/uploadPhoto', userCtrl.addUserPhoto);

module.exports = router;
