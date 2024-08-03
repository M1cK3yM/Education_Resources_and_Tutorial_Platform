const Event = require("../models/event.model");
const Resource = require("../models/resource.model");
const University = require("../models/university.model");

const checkItem = async (req, res, next) => {
  const allowedItems = ["event", "resource", "university"];

  try {
    if (!allowedItems.includes(req.body.itemType)) {
      return res.status(400).json({ message: "Invalid item type" });
    }

    const itemType =
      req.body.itemType === "event"
        ? Event
        : req.body.itemType === "resource"
          ? Resource
          : University;
    const item = await itemType.findById(req.body.item);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.locals.item = item;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }

  next();
};

module.exports = { checkItem };
