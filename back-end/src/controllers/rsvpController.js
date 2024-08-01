const RSVP = require('../models/rsvp.model');

const addRSVP = async (req, res) => {
  const { userId, eventId, status, notes } = req.body;
  const rsvp = new RSVP({ userId, eventId, status, notes });

  try {
    const newRSVP = await rsvp.save();
    res.status(201).json(newRSVP);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getRSVPsByEvent = async (req, res) => {
  try {
    const rsvps = await RSVP.find({ eventId: req.params.eventId }).populate('userId', 'name');
    res.status(200).json(rsvps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addRSVP,
  getRSVPsByEvent
};
