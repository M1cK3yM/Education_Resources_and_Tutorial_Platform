const express = require("express");
const bookmarkController = require("../controllers/bookmarkController");
const router = express.Router();
const { authorizeJwt } = require("../middleware/auth.middleware");

router.get("/", authorizeJwt, bookmarkController.getBookmarks);
router.post("/:eventId", authorizeJwt, bookmarkController.addBookmark);
router.delete("/", authorizeJwt, bookmarkController.deleteBookmark);

module.exports = router;