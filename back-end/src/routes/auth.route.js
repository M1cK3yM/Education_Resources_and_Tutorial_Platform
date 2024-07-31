const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/login", authController.loginAccount);
router.post("/register", authController.registerUser);
router.post("/forget-password", authController.forgetPassword);
router.post("/reset-password/:token", authController.resetPassword);

module.exports = router;
