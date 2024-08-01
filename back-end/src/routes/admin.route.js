const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const adminController = require("../controllers/admin.controller");
const { authorizeJwt, isAdmin } = require("../middleware/auth.middleware");
const { validateEmailandPassword } = require("../middleware/userMiddleware");

router.get("/", authorizeJwt, isAdmin, adminController.getAllUsers);
router.get("/:id", authorizeJwt, isAdmin, adminController.getUserById);
router.get("/role/:role", authorizeJwt, isAdmin, adminController.getUserByRole);
router.post("/logout", authController.logout);
router.post("/login", validateEmailandPassword, authController.loginAccount);

module.exports = router;
