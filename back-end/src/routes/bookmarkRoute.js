const express = require("express");
const bookmarkController = require("../controllers/bookmarkController");
const router = express.Router();

router.get("/bookmarks", bookmarkController.getBookmarks);
router.post("/bookmarks", bookmarkController.addBookmark);
router.delete("/bookmarks", bookmarkController.deleteBookmark);

module.exports = router;
