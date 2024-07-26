const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

router.get("/events", eventController.getAllEvents);
router.post("/events", eventController.createEvent);

module.exports = router;
