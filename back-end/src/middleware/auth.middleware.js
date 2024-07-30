const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

const autherizeJwt = async (req, res, next) => {
  try {

    const authHeader = req.header('Authorization');

    if (!authHeader) {
      throw new Error('Authorization Header Not Found');
    }

    const [authType, token] = authHeader.split(' ');

    if (authType !== 'Bearer' || !token) {
      throw new Error('Invalid Authorization Header');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({ message: "unauthorized" });
    }

    next();

  } catch (err) {
    console.error('Authentication Error: ', err);
    res.status(401).json({ message: "unauthorized" })
  }
}

const checkAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Forbidden: Admin only" })
  }

  next()
}

module.exports = {
  autherizeJwt,
  checkAdmin
}
