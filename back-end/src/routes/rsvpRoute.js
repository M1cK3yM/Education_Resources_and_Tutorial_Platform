const express = require("express");
const router = express.Router();
const rsvpController = require("../controllers/rsvpController");

router.get("/", rsvpController.addRSVP);
router.post("/:eventId", rsvpController.getRSVPsByEvent);

module.exports = router;
