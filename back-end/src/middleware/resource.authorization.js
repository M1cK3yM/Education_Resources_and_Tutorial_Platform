// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  res.status(403).json({ message: "Forbidden" });
};

// Middleware to check if the user is the owner of the resource
const isOwner = (req, res, next) => {
  Resource.findById(req.params.id, (err, resource) => {
    if (err || !resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    if (resource.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  });
};

module.exports = {
  isAdmin,
  isOwner,
};
