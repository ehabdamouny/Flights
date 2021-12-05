const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  from: {
    type: String,
    require: true,
  },
  to: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  weather: {
    type: String,
    required: true,
  },
});

module.exports = Flight = mongoose.model('flight', FlightSchema);
