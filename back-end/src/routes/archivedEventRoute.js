const express = require("express");
const ArchivedEvent = require("../models/archive.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const archivedEvents = await ArchivedEvent.find({});
    res.json(archivedEvents);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
    console.error(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const archivedEvent = await ArchivedEvent.findById(req.params.id);
    if (!archivedEvent) {
      return res.status(404).json({ message: "Archived Event Not Found" });
    }
    res.status(200).json({ message: "Archived Event" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
    console.error(err);
  }
});
module.exports = router;
