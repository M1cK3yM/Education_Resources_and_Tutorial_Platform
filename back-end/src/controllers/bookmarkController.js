const Bookmark = require("../models/bookmark.model");

const addBookmark = async (req, res) => {
  const bookmark = new Bookmark({
    userId: req.user._id,
    eventId: req.params.eventId,
  });
  try {
    const newBookmark = bookmark.save();
    res.status(201).json(newBookmark);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.user.id });
    res.status(200).json(bookmarks);
  } catch (err) {
    res.status(500).json({ message: err.meassage });
  }
};

const deleteBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({
      userId: req.user.id,
      eventId: req.params.eventId,
    });
    if (!bookmark) {
      return res.status(400).json({ message: "Bookmark not found" });
    }
    res.status(200).json({ message: "Bookmark deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.meassge });
  }
};

module.exports = {
  addBookmark,
  deleteBookmark,
  getBookmarks,
};
