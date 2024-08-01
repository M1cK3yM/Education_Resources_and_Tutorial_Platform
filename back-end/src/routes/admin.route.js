const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const { authorizeJwt, isAdmin } = require("../middleware/auth.middleware");

router.get("/", authorizeJwt, isAdmin, adminController.getAllUsers);
router.get("/:id", authorizeJwt, isAdmin, adminController.getUserById);
router.get("/role/:role", authorizeJwt, isAdmin, adminController.getUserByRole);

module.exports = router;
