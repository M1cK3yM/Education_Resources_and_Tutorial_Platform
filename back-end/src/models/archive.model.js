const mongoose = require("mongoose");

const archivedEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  archivedAt: {
    type: Date,
    default: Date.now,
  },
});

const ArchivedEvent = mongoose.model("ArchivedEvent", archivedEventSchema);

module.exports = ArchivedEvent;
