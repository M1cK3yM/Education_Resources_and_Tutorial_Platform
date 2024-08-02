const express = require("express");
const router = express.Router();
const UniversityController = require("../controllers/universitiesController");
const { authorizeJwt, isAdmin } = require("../middleware/auth.middleware");

router.get("/", UniversityController.getAllUniversities);
router.get("/:id", UniversityController.getUniversitiesById);
router.post("/", authorizeJwt, isAdmin, UniversityController.createUniversity);
router.put(
  "/:id",
  authorizeJwt,
  isAdmin,
  UniversityController.updateUniversity,
);
router.delete(
  "/:id",
  authorizeJwt,
  isAdmin,
  UniversityController.deleteUniversity,
);

module.exports = router;
