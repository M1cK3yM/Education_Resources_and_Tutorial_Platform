const Event = require("../models/event.model");
const { uploadImage } = require("../middleware/cloudinaryConfig");

const getAllEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * 10;

    const events = await Event.find({ status: "active" })
      .sort({ date: 1 })
      .skip(skip)
      .limit(10);

    const totalEvents = await Event.countDocuments({ status: "active" });
    const pages = Math.ceil(totalEvents / 10);

    res.status(200).json({ events: events, pages: pages });
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
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
    console.error(err);
  }
};

const createEvent = async (req, res) => {
  try {
    const event = new Event({
      title: req.body.title,
      description: req.body.description,
      note: req.body.note,
      location: req.body.location,
      date: req.body.date,
      time: req.body.time,
      image: req.file ? req.file.path : null, // Store Cloudinary URL in the database
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
      note: req.body.note,
      location: req.body.location,
      date: req.body.date,
      time: req.body.time,
    };

    if (req.file) {
      updateData.image = req.file.path; // Update Cloudinary URL in the database
    }
if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
  return res.status(400).json({ message: "Invalid Event ID" });
}
const event = await Event.findByIdAndUpdate(req.params.id, updateData, {
  new: true,
});

if (!event) {
  return res.status(404).json({ message: "Event not found" });
}

res.json(event);
} catch (err) {
console.error("Error updating event:", err);
res.status(500).json({ message: "Server Error" });
}
};

// const updateEvent = async (req, res) => {
//   try {
//     const { title, description, note, location, date, time } = req.body;

//     const updateData = { title, description, note, location, date, time };

//     // Handle image if file is uploaded
//     if (req.file) {
//       updateData.image = req.file.path; // Update Cloudinary URL in the database
//     }

//     // Validate the event ID
//     if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
//       return res.status(400).json({ message: "Invalid Event ID" });
//     }

//     // Find and update the event
//     const event = await Event.findByIdAndUpdate(req.params.id, updateData, {
//       new: true,
//     });

//     if (!event) {
//       return res.status(404).json({ message: "Event not found" });
//     }

//     res.json(event);
//   } catch (err) {
//     console.error("Error updating event:", err);
//     res.status(500).json({ message: "Server Error" });
//   }
// };


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
  createEvent: [uploadImage.single("image"), createEvent],
  getEventById,
  updateEvent: [uploadImage.single("image"), updateEvent],
  deleteEvent,
};
