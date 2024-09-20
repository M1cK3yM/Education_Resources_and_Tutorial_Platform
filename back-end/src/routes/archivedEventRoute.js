const express = require("express");
const ArchivedEvent = require("../models/archive.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * 10;

    const archivedEvents = await ArchivedEvent.find({})
      .sort({ date: 1 })
      .skip(skip)
      .limit(10);

    const totalArchivedEvents = await ArchivedEvent.countDocuments();
    const pages = Math.ceil(totalArchivedEvents / 10);

    res.status(200).json({ archivedEvents: archivedEvents, pages: pages });
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
    res.status(200).json(archivedEvent);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
    console.error(err);
  }
});
module.exports = router;
