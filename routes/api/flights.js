const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Flight = require('../../models/Flights');

// @route   POST api/flights
// @desc    add flight
router.post('/', auth, async (req, res) => {
  try {
    const newFlight = new Flight({
      code: req.body.code,
      from: req.body.from,
      to: req.body.to,
      date: req.body.date,
      duration: req.body.duration,
      weather: req.body.weather,
    });

    const flight = await newFlight.save();

    res.json(flight);
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/flights
// @desc    Get all flights
router.get('/', auth, async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/flight/:code
// @desc    Get flight by code
router.get('/:code', auth, async (req, res) => {
  try {
    const flight = await Flight.findOne({ code: req.params.code });
    if (!flight) {
      return res.status(404).json({ msg: 'Flight not found' });
    }
    res.json(flight);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/flights/:code
// @desc    Delete a flight
router.delete('/:code', auth, async (req, res) => {
  try {
    const flight = await Flight.findOne({ code: req.params.code });
    if (!flight) {
      return res.status(404).json({ msg: 'Flight not found' });
    }

    await flight.remove();
    res.json({ msg: 'Flight removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/flight/:code
// @desc    update flight by code
router.put('/:code', auth, async (req, res) => {
  try {
    const flight = await Flight.findOne({ code: req.params.code });
    if (!flight) {
      return res.status(404).json({ msg: 'Flight not found' });
    }
    flight.code = req.body.code || flight.code;
    flight.from = req.body.from || flight.code;
    flight.to = req.body.to || flight.code;
    flight.date = req.body.date || flight.code;
    flight.duration = req.body.duration || flight.code;
    flight.weather = req.body.weather || flight.code;

    await flight.save();
    res.json(flight);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
