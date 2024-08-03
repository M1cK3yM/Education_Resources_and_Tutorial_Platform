const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    itemType: {
      type: String,
      enum: ["event", "resource", "university"],
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      maxlength: 500,
    },
  },
  { timestamps: true },
);

ratingSchema.index({ user: 1, item: 1 }, { unique: true });

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;

