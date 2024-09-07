const mongoose = require("mongoose");

const universitySchema = new mongoose.Schema(
  {
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
    logo: {
      type: String,
      required: true,
    },
    resources: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resource",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const University = mongoose.model("University", universitySchema);

University.createSearchIndex({
  name: "searchUniversities",
  definition: {
    mappings: {
      dynamic: true,
    },
  },
});

module.exports = University;
