const express = require("express");
const userController = require("../controllers/bookmarkController");
const router = express.Router();
const { authorizeJwt } = require("../middleware/auth.middleware");

router.get("/", authorizeJwt, userController.getBookmarks);
router.post("/", authorizeJwt, userController.addBookmark);
router.delete("/", authorizeJwt, userController.deleteBookmark);

module.exports = router;