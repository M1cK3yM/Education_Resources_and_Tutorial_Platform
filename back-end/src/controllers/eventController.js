const Event = require("../models/event.model");
const upload = require("../middleware/multerConfig");

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
    console.error(err);
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
    res.status(500).json({ message: "Server Error" });
    console.error(err);
  }
};

const createEvent = async (req, res) => {
  try {
    const event = new Event({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      time: req.body.time,
      image: req.file ? req.file.filename : null, // Store filename in the database
    });

    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: "Server Error" });
    console.error(err);
  }
};

const updateEvent = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      time: req.body.time,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const event = await Event.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
    console.error(err);
  }
};
const deleteEvent = async (req, res) => {
  console.log("Deleting event by the id : ", req.params.id);
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
    console.error(err);
  }
};

module.exports = {
  getAllEvents,
  createEvent: [upload.single("image"), createEvent],
  getEventById,
  updateEvent: [upload.single("image"), updateEvent],
  deleteEvent,
};
