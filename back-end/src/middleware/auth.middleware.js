const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
const Resource = require("../models/resource.model");

// Middleware to verify JWT and authenticate the user
const authorizeJwt = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Authorization Header Not Found" });
    }

    const [authType, token] = authHeader.split(" ");
    if (authType !== "Bearer" || !token) {
      return res.status(401).json({ message: "Invalid Authorization Header" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      res.locals.user = await User.findById(decoded.id);

      if (!res.locals.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      next();
    });
  } catch (err) {
    console.error("Authentication Error: ", err);
    res.status(401).json({ message: "Unauthorized" });
  }
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (res.locals.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admin only" });
  }
  next();
};

// Middleware to check if the user is a student or mentor
const isUser = (req, res, next) => {
  const allowedRoles = ["student", "mentor"];
  if (!allowedRoles.includes(req.body.role)) {
    return res.status(403).json({ message: "Forbidden: User only" });
  }
  next();
};

// Middleware to check if the user is not an admin (for user management operations)
const checkAdmin = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.role === "admin") {
      return res.status(403).json({ message: "Forbidden: Admin not allowed" });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Middleware to check if the user is the resource owner
const isResourceOwner = async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    // Assuming `createdBy` is a field in the Resource model representing the owner's user ID
    if (
      resource.createdBy.toString() !== res.locals.user._id.toString() &&
      res.locals.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Forbidden: You do not own this resource" });
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
  isResourceOwner,
};
