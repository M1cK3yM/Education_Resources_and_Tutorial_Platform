const User = require("../models/users.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUsers = async (_req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const verifyUser = await User.findOne({ email });

  try {
    if (verifyUser) {
      return res.status(403).json({
        message: "Email already in used"
      })

    } else {
      bcrypt.hash(password, 10, (_err, hash) => {
        User.create({ name, email, role, password: hash })
          .then(result => {
            return res.status(201).json({
              message: "User Successfully Created",
              result: result,

            })
          })



      })
    }

  } catch (
  err
  ) {
    console.log("unable to create user: " + err);
    return res.status(412).json({
      message: "Failed to registrer user",

      success: false,
    })
  }

}

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
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
    if (!users) {
      return res.status(404).json({ message: 'There is no regestered students' });
    }
    res.json(users);
  } catch {
    res.status(500).json(
      { message: err.message }
    );
  }
}

const updateProfile = async (req, res) => {
  if (
    req.body.name ||
    req.body.profile ||
    req.body.mobile
  ) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!user) {
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
      res.status(404).json({ message: "User Not found" });
    }

    res.status(200).json({ message: "User Deleted Successfully" })

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const loginAccount = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, });

    if (!user) {
      return res.status(404).json({ message: "Invaild Email or Password" });
    }
    console.log(user);
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(404).json({ message: "Invalid Email or Password" });
    }

    const jwtToken = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      token: jwtToken,
      message: "Logged in Successfully"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Login failed" });
  }
}
module.exports = {
  getAllUsers,
  getUserById,
  updateProfile,
  deleteAccount,
  createUser,
  getUserByRole,
  loginAccount
}
