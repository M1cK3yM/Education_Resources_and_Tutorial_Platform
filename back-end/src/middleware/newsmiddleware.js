const validateNews = async (req, res, next) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (typeof title !== "string" || title.trim().length === 0) {
    return res
      .status(400)
      .json({ message: "Title must be a non-empty string" });
  }

  if (typeof content !== "string" || content.trim().length === 0) {
    return res
      .status(400)
      .json({ message: "Content must be a non-empty string" });
  }

  if (typeof author !== "string" || author.trim().length === 0) {
    return res
      .status(400)
      .json({ message: "Author must be a non-empty string" });
  }

  next();
};

module.exports = { validateNews };

