const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resourceController");
// const {
//   validateCreateResource,
//   validateUpdateResource,
// } = require("../middleware/resourceMiddleware");

// const {
//   authorizeJwt,
//   isAdmin,
//   isResourceOwner,
// } = require("../middleware/auth.middleware");

// Apply JWT authorization to all resource routes
// router.use(authorizeJwt);

router.get("/", resourceController.getAllResource);
router.post("/", resourceController.createResource);
router.get("/:id", resourceController.getResourceById);
router.put("/:id", resourceController.updateResource);
router.delete("/:id", resourceController.deleteResource);
router.get("/search/:q", resourceController.searchResource);

module.exports = router;
