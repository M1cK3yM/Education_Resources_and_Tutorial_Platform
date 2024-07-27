const User = require("../models/users.model.js");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message});
  }
};

const createUser = async (req, res) =>  {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  })

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
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

const getUserByRole = async (req, res) => {
  try {
    const users = await User.find({ role: req.params.role });
    if(!users) {
    return res.status(404).json({ message: 'There is no regestered students' });
  }
    res.json(users);
  } catch {
    res.status(500).json(
      {message: err.message}
    );
  }
}

const updateProfile = async (req, res) => {
  if (
    req.body.name ||
    req.body.profile ||
    req.body.mobile 
  ) {
    const user = await User.findByIdAndUpdate( req.params.id, req.body, {
      new: true
    });
    if(!user) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(user);
  } else {
    res.status(400).json({ message: "No updated field provided" })
  }
}

const deleteAccount = async (req, res) => {
  try {
    const user = User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User Not found"});
    }

    res.status(200).json({message: "User Deleted Successfully"})
    
  } catch (err) {
    res.status(500).json({message: err.message});
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  updateProfile,
  deleteAccount,
  createUser,
  getUserByRole
}
