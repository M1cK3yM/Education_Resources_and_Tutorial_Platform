const express = require("express");
const router = express.Router();
const rsvpController = require("../controllers/rsvpController");
const { authorizeJwt } = require("../middleware/auth.middleware");

router.post("/", authorizeJwt, rsvpController.addRsvp);
router.delete("/", authorizeJwt, rsvpController.deleteRsvp);

module.exports = router;
