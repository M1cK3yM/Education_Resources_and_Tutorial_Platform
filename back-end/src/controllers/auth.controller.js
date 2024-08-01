const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginAccount = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    console.log(user);
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(404).json({ message: "Invalid Email or Password" });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
    );

    const refreshToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: "strict",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // 15 minutes
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Logged in Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Login failed" });
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const link = `http://${process.env.HOST}:${process.env.PORT}/reset-password/${token}`;

    res.status(200).json({ message: "Password reset link sent to your email" });

    console.log(link);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const verifyUser = await User.findOne({ email });

  try {
    if (verifyUser) {
      return res.status(403).json({
        message: "Email already in used",
      });
    } else {
      bcrypt.hash(password, 10, (_err, hash) => {
        User.create({ name, email, role, password: hash }).then((result) => {
          return res.status(201).json({
            message: "User Successfully Created",
            result: result,
          });
        });
      });
    }
  } catch (err) {
    console.log("unable to create user: " + err);
    return res.status(412).json({
      message: "Failed to registrer user",

      success: false,
    });
  }
};

const logout = (_req, res) => {
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");
  console.log("Logged out successfully");
  res.status(200).json({ message: "Logged out successfully" });
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // 15 minutes
      sameSite: "strict",
    });
    return res.status(200).send("Access token refreshed");
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = {
  loginAccount,
  forgetPassword,
  resetPassword,
  registerUser,
  logout,
  refreshToken,
};
