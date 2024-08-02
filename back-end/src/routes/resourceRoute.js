const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resourceController");
const { requestLogger, isAuthenticated } = require("../middleware/resources.middleware");
const { validateResource } = require("../middleware/resource.validation");
const { isAdmin, isOwner } = require("../middleware/resource.authorization");

router.use(requestLogger);

router.get("/", resourceController.getAllResource);
router.post("/", isAuthenticated, validateResource, resourceController.createResource);
router.get("/:id", resourceController.getResourceById);
router.put("/:id", isAuthenticated, isOwner, validateResource, resourceController.updateResource);
router.delete("/:id", isAuthenticated, isAdmin, resourceController.deleteResource);

module.exports = router;
