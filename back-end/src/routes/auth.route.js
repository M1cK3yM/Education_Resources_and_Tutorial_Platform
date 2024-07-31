const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { isUser, checkAdmin } = require("../middleware/auth.middleware");

router.post("/login", checkAdmin, authController.loginAccount);
router.post("/register", isUser, authController.registerUser);
router.post("/forget-password", authController.forgetPassword);
router.post("/reset-password/:token", authController.resetPassword);

module.exports = router;
