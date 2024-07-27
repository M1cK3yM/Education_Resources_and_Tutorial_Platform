const User = require("../models/users.model.js");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message});
  }
};

const createStudent = async (req, res) =>  {
  const student = new User({
    name: req.body.name,
    email: req.body.email,
    role: "STUDENT",
  })

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

const createMentors = async (req, res) => {
  const mentors = new User({
    name: req.body.name,
    email: req.body.email,
    role: "MENTOR",
  })

  try {
    const newMentor = await mentors.save();
    res.status(201).json(newMentor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

const getUserById = async (req, res) => {
  try {
  const user = await User.findById(req.params.id);
  if(!user) {
    return res.status(404).json({ message: 'User not found' });
  }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const getStudents = async (req, res) => {
  try {
    const student = await User.find({role: "STUDENT"});
    if(!student) {
    return res.status(404).json({ message: 'There is no regestered students' });
  }
    res.json(student);
  } catch {
    res.status(500).json(
      {message: err.message}
    );
  }
}

module.exports = {
  getAllUsers,
  createStudent,
  getUserById,
  getStudents,
  createMentors
}
