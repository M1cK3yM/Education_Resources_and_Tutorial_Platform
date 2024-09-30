const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resourceController");
const { authorizeJwt } = require("../middleware/auth.middleware");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage: storage})

router.post("/", authorizeJwt, upload.single('file'), resourceController.createResource);
router.get("/", resourceController.getAllResources);
router.get("/:id", resourceController.getResourceById);
router.get("/search/:q", resourceController.searchResource);
router.put("/:id", authorizeJwt, resourceController.updateResource);
router.delete("/:id", authorizeJwt, resourceController.deleteResource);

module.exports = router;
