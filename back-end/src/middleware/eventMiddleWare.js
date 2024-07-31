const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  // Retrieve the token from the Authorization header
  const authHeader = req.headers.authorization;
  console.log(req.header.authorization);

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Extract the token part from the header
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Malformed token" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Attach the user information to the request object
    req.user = decoded;
    next();
  });
};

module.exports = authenticate;
