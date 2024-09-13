const mongoose = require("mongoose");
const User = require("../models/users.model");

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["Engineering", "Health", "Science", "Technology", "Other"],
  },
  resource: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  numberOfPages: {
    type: Number,
    required: false,
  },
  coverImage: {
    type: String,
  },
  tags: [{ type: String, required: true }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
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

const Resource = mongoose.model("Resource", resourceSchema);

// Resource.createSearchIndex({
//   name: "searchResources",
//   definition: {
//     mappings: {
//       dynamic: true,
//     },
//   },
// });
module.exports = Resource;
