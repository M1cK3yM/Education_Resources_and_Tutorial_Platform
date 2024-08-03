const Rating = require("../models/rating.model");

const getAllRating = async (req, res) => {
  try {
    const Rating = await Rating.find();
    res.status(200).json(Rating);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRatingById = async (req, res) => {
  try {
    const rating = await rating.findById(req.params.id);
    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }
    res.status(200).json(rating);
    console.log(req.params.rating);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRatingByItem = async (_req, res) => {
  try {
    const rating = await Rating.find({ item: res.locals.item._id });
    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }
    res.status(200).json(rating);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createRating = async (req, res) => {
  const user = res.locals.user;
  const { item } = req.body;

  const ratingExists = await Rating.findOne({ user: user._id, item: item });
  if (ratingExists) {
    return res.status(400).json({ message: "Rating already exists" });
  }

  const rating = new Rating({
    user: user._id,
    item: item,
    ...req.body,
  });
  try {
    const newRating = await rating.save();
    res.status(201).json(newRating);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateRating = async (req, res) => {
  const { _id } = res.locals.user;

  if (req.body.user || req.body.rating || req.body.comment) {
    const rating = await Rating.findOneAndUpdate(
      { _id: req.params.id, user: _id, item: req.body.item },
      req.body,
      {
        new: true,
      },
    );

    if (!rating) {
      return res.status(404).json({ message: "rating not found" });
    }

    res.json(rating);
  } else {
    res.status(400).json({ message: "No updated field provided" });
  }
};

const deleteRating = async (req, res) => {
  const { _id } = res.locals.user;

  try {
    const rating = await Rating.findOneAndDelete({
      _id: req.params.id,
      user: _id,
    });

    if (!rating) {
      return res.status(404).json({ message: "rating not found" });
    }

    res.status(200).json({ message: "rating deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllRating,
  createRating,
  getRatingById,
  updateRating,
  deleteRating,
  getRatingByItem,
};
