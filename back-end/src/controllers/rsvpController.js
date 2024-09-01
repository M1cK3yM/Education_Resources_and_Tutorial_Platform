const Rsvp = require("../models/rsvp.model");

const createRsvp = async (req, res) => {
  const { eventId, name, email, numberOfGuests } = req.body;
  const userId = res.locals.user._id;
  try {
    const existingRsvp = await Rsvp.findOne({ event: eventId, user: userId });
    console.log("Existing Rsvp User : ", existingRsvp);
    if (existingRsvp) {
      return res
        .status(400)
        .json({ message: "You have already responded to this event" });
    }
    const newRsvp = new Rsvp({
      event: eventId,
      user: userId,
      name,
      email,
      numberOfGuests,
    });
    await newRsvp.save();
    res.status(201).json(newRsvp);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
    console.log(err);
  }
};
const getRsvp = async (req, res) => {
  try {
    const rsvp = await Rsvp.find();
    res.status(200).json(rsvp);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
    console.log(err);
  }
};

module.exports = {
  getRsvp,
  createRsvp,
};
