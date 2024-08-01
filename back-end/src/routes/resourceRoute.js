const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resourceController");

router.get("/", resourceController.getAllResource);
router.post("/", resourceController.createResource);
router.get("/:id", resourceController.getResourceById);
router.put("/:id", resourceController.updateResource);
router.delete("/:id", resourceController.deleteResource);

module.exports = router;
