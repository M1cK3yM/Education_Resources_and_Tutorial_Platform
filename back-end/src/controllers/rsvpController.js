const Event = require("../models/event.model");

const addRsvp = async (req, res) => {
  const { eventId } = req.body;

  try {
    const user = res.locals.user;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the user has already RSVPed
    if (event.rsvp.includes(user._id)) {
      return res.status(400).json({ message: "User already RSVPed" });
    }

    event.rsvp.push(user._id);
    await event.save();

    res
      .status(201)
      .json({ message: "RSVP added successfully", rsvp: event.rsvp });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
    console.log(err.message);
  }
};

const deleteRsvp = async (req, res) => {
  const { eventId } = req.body;

  try {
    const user = res.locals.user;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.rsvp.length === 0) {
      return res.status(404).json({ message: "RSVP list is empty" });
    }

    // Find the index of the user in the RSVP list
    const rsvpIndex = event.rsvp.indexOf(user._id);

    if (rsvpIndex !== -1) {
      event.rsvp.splice(rsvpIndex, 1);
      await event.save();

      return res.status(200).json({
        message: "RSVP removed successfully",
        rsvp: event.rsvp,
      });
    }

    return res.status(404).json({ message: "User not RSVPed" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
    console.log(err.message);
  }
};

module.exports = {
  addRsvp,
  deleteRsvp,
};
