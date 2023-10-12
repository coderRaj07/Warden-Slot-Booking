const express = require('express');
const bookingController = require('../controllers/bookingController');
const authenticateUser = require('../middleware/authenticateUser');

const router = express.Router();

router.post('/book', authenticateUser, bookingController.bookMeeting);

module.exports = router;
