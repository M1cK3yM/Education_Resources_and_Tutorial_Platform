const mongoose = require("mongoose");

const universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, 
  },
  location: {
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  establishedYear: {
    type: Number,
    required: true,
  },
  programs: [
    {
      name: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
        enum: ["Bachelor's", "Master's", "Doctorate"],
      },
      duration: {
        type: String,
        required: true,
      },
    },
  ],
  website: {
    type: String,
    required: true,
    match: /^(http|https):\/\/[^\s$.?#].[^\s]*$/i, // URL format validation
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update `updatedAt` before saving the document
universitySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const University = mongoose.model("University", universitySchema);

module.exports = University;
