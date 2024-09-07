const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "student", "mentor"],
    required: true,
  },
  bookmark: [
    {
      itemId: {
        type: String,
        required: true,
      },
      itemType: {
        type: String,
        enum: ["Event", "Resource"],
        required: true,
      },
    },
  ],
  refreshToken: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("users", usersSchema);

User.createSearchIndex({
  name: "searchUsers",
  definition: {
    mappings: {
      dynamic: true,
    },
  },
});

module.exports = User;
