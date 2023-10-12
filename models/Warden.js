const mongoose = require('mongoose');

const wardenSchema = new mongoose.Schema({
  id: String,
  password: String,
});

const Warden = mongoose.model('Warden', wardenSchema);

module.exports = Warden;


