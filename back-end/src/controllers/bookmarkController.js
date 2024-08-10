const User = require("../models/users.model");

const addBookmark = async (req, res) => {
  const { itemId, itemType } = req.body;
  try {
    const user = res.locals.user;
    const checkBookmark = user.bookmark.find(
      (bookmark) =>
        bookmark.itemId.toString() === itemId && bookmark.itemType === itemType
    );
    console.log(checkBookmark);
    if (checkBookmark) {
      res.status(409).json({ message: "Bookmark already exists" });
    } else {
      const bookmark = { itemId, itemType };
      user.bookmark.push(bookmark);

      await user.save();
      res.status(201).json({ message: "Bookmark added successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
    console.error(err);
  }
};
const getBookmarks = async (req, res) => {
  try {
    const user = res.locals.user;
    res.status(200).json(user.bookmark);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
    console.error(err);
  }
};

const deleteBookmark = async (req, res) => {
  const { itemId, itemType } = req.body;
  try {
    const user = res.locals.user;
    const bookmarkIndex = user.bookmark.findIndex(
      (bookmark) =>
        bookmark.itemId.toString() === itemId && bookmark.itemType === itemType
    );
    if (bookmarkIndex !== -1) {
      user.bookmark.splice(bookmarkIndex, 1);
      await user.save();
      res.status(200).json({
        message: "Bookmark deleted successfully",
        bookmarks: user.bookmark,
      });
    } else {
      res.status(404).json({ message: "Bookmark not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  addBookmark,
  deleteBookmark,
  getBookmarks,
};
