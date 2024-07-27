const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }, 
  profile: {
    type: String,
    required: false
  },
  email: {
    type: String, 
    required: true
  },
  mobile: {
    type: Number,
    required: false
},
  role: {
    type: String,
    enum: ['ADMIN', 'STUDENT', 'MENTOR'],
    required: true
  }
});

const User = mongoose.model('users', usersSchema);

module.exports = User 
