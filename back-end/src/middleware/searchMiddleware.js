const checkQuery = (req, res, next) => {
  if (!req.params.q) {
    return res.status(400).json({ message: "Query parameter 'q' is required" });
  }
  next();
};

module.exports = { checkQuery };
