const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Event'
  },
  status: {
    type: String,
    required: true,
    enum: ['attending', 'not attending', 'maybe']
  },
  notes: String
});

const RSVP = mongoose.model('RSVP', rsvpSchema);

module.exports = RSVP;
