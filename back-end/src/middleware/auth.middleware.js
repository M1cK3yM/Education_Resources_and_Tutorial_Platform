const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

const authorizeJwt = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      throw new Error("Authorization Header Not Found");
    }

    const [authType, token] = authHeader.split(" ");

    if (authType !== "Bearer" || !token) {
      throw new Error("Invalid Authorization Header");
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    res.locals.user = await User.findById(decoded.id);

    if (!res.locals.user) {
      return res.status(401).json({ message: "unauthorized" });
    }

    next();
  } catch (err) {
    console.error("Authentication Error: ", err);
    res.status(401).json({ message: "unauthorized" });
  }
};

const isAdmin = (req, res, next) => {
  if (res.locals.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admin only" });
  }

  next();
};

const isUser = (req, res, next) => {
  if (req.body.role === "student" || req.body.role === "mentor") {
    next();
  } else {
    return res.status(403).json({ message: "Forbidden: User only" });
  }
};

const checkAdmin = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.role === "admin") {
      return res.status(403).json({ message: "Invalid email or password " });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  authorizeJwt,
  isAdmin,
  isUser,
  checkAdmin,
};
