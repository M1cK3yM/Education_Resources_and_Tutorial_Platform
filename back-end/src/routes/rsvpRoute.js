const express = require("express");
const router = express.Router();
const rsvpController = require("../controllers/rsvpController");
const { authorizeJwt } = require("../middleware/auth.middleware");

router.post("/", authorizeJwt, rsvpController.createRsvp);
router.get("/", rsvpController.getRsvp);

module.exports = router;
