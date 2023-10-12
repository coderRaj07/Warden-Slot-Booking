const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  wardenId: String,
  bookedBy: String,
  date: Date,
});

module.exports = mongoose.model('Booking', bookingSchema);
