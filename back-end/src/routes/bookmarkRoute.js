const express = require("express");
const bookmarkController = require("../controllers/bookmarkController");
const router = express.Router();
const authenticate = require("../middleware/eventMiddleWare");

router.get("/", authenticate, bookmarkController.getBookmarks);
router.post("/:eventId", authenticate, bookmarkController.addBookmark);
router.delete("/", authenticate, bookmarkController.deleteBookmark);

module.exports = router;