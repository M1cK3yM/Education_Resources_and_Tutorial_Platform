const mongoose = require("mongoose");

const universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  founded: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["public", "private", "community college"],
  },
 
  resources: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const University = mongoose.model("University", universitySchema);

module.exports = University;