const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController");
const { checkQuery } = require("../middleware/searchMiddleware");

router.get("/:q", checkQuery, searchController.searchAll);

module.exports = router;
