const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resourceController");
const { validateCreateResource, validateUpdateResource } = require("../middleware/resourceMiddleware");
const { authorizeJwt, isResourceOwner } = require("../middleware/auth.middleware");
const { requestLogger, isAuthenticated } = require("../middleware/resources.middleware");
const { validateResource } = require("../middleware/resource.validation");
const { isAdmin, isOwner } = require("../middleware/resource.authorization");

// Apply JWT authorization to all resource routes
router.use(authorizeJwt);

router.get("/", resourceController.getAllResource);
router.post("/", isAuthenticated,validateResource,validateCreateResource, resourceController.createResource);
router.get("/:id", resourceController.getResourceById);
router.put("/:id", isAuthenticated, isOwner, validateUpdateResource, isResourceOwner, resourceController.updateResource);
router.delete("/:id",isAuthenticated,isAdmin, isResourceOwner, resourceController.deleteResource);
router.use(requestLogger);


module.exports = router;
