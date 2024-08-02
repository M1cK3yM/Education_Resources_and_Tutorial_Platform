const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resourceController");
const { validateCreateResource, validateUpdateResource } = require("../middleware/resourceMiddleware");
const { authorizeJwt, isResourceOwner } = require("../middleware/auth.middleware");

// Apply JWT authorization to all resource routes
router.use(authorizeJwt);

router.get("/", resourceController.getAllResource);
router.post("/", validateCreateResource, resourceController.createResource);
router.get("/:id", resourceController.getResourceById);
router.put("/:id", validateUpdateResource, isResourceOwner, resourceController.updateResource);
router.delete("/:id", isResourceOwner, resourceController.deleteResource);

module.exports = router;
