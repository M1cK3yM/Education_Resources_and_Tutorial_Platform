const User = require("../models/users.model");

const getAllUsers = async (_req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserByRole = async (req, res) => {
  try {
    const users = await User.find({ role: req.params.role });
    if (!users) {
      return res
        .status(404)
        .json({ message: "There is no regestered students" });
    }
    res.json(users);
  } catch {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByRole,
};
