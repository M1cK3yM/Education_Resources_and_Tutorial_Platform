const Event = require("../models/event.model");

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
    console.log(req.params.id);
  } catch {
    res.status(500).json({ message: err.message });
  }
};

const createEvent = async (req, res) => {
  const event = new Event({
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    time: req.body.time,
    image: req.body.image,
  });
  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateEvent = async (req, res) => {
  if (
    req.body.title ||
    req.body.description ||
    req.body.location ||
    req.body.startDate ||
    req.body.endDate ||
    req.body.time ||
    req.body.image
  ) {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } else {
    res.status(400).json({ message: "No updated field provided" });
  }
};

module.exports = {
  getAllEvents,
  createEvent,
  getEventById,
  updateEvent,
};
