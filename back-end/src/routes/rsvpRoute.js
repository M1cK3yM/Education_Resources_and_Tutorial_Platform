const express = require("express");
const router = express.Router();
const rsvpController = require("../controllers/rsvpController");

router.get("/rsvp", rsvpController.addRSVP);
router.post("/rsvp/:eventId", rsvpController.getRSVPsByEvent);

module.exports = router;
