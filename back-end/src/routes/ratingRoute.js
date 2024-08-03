const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/ratingController");
const { authorizeJwt, isAdmin } = require("../middleware/auth.middleware");
const { checkItem } = require("../middleware/rating.middleware");

router.post("/", authorizeJwt, checkItem, ratingController.createRating);
router.get("/", authorizeJwt, isAdmin, ratingController.getAllRating);
router.get("/:id", authorizeJwt, isAdmin, ratingController.getRatingById);
router.post("/item", authorizeJwt, checkItem, ratingController.getRatingByItem);
router.patch("/:id", authorizeJwt, checkItem, ratingController.updateRating);
router.delete("/:id", authorizeJwt, checkItem, ratingController.deleteRating);

module.exports = router;
