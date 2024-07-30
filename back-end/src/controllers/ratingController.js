const Rating = require("../models/rating.model");



const getAllRating= async (req, res) => {
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
  } catch {
    res.status(500).json({ message: err.message });
  }
};

const createRating = async (req, res) => {
  const rating = new rating({
    user: req.body.user,
    item: req.body.item,
    rating: req.body.rating,
    comment: req.body.comment,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,

  });
  try {
    const newRating = await Rating.save();
    res.status(201).json(newRating);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateRating = async (req, res) => {
  if (
    req.body.user ||
    req.body.item ||
    req.body.rating ||
    req.body.comment ||
    req.body.createdAt ||
    req.body.updatedAt 
   
  ) {
    const rating = await Rating.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!rating) {
      return res.status(404).json({ message: "rating not found" });
    }
    res.json(rating);
  } else {
    res.status(400).json({ message: "No updated field provided" });
  }
};

const deleteRating= async (req, res) => {
  console.log("Deleting  Rating by the id : ", req.params.id);
  try {
    const rating = await Rating.findByIdAndDelete(req.params.id);
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
};
