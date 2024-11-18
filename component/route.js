const express = require('express');
const router = express.Router();
const userRecord = require('./controller');
const { verifyToken } = require('../config/verify_token');

// Create new training record
router.post('/register', userRecord.create);

router.post('/login', userRecord.login);

router.get('/me', verifyToken, userRecord.findMe);

module.exports = router;
