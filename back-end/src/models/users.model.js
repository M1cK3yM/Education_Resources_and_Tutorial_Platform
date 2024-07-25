const mongoose = require("mongoose");

const Role = Object.freeze({
  ADMIN: 0,
  MENTOR: 1,
  STUDENT: 2
})
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
    type: number,
    required: false
},
  role: {
    type: Role,
    required: true
  }
});

const users = mongoose.model('users', usersSchema);

export default users;
