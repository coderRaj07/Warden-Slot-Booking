const express = require('express');
const authenticationController = require('../controllers/authenticationController');

const router = express.Router();

router.post('/authenticate', authenticationController.authenticateUser);

module.exports = router;
