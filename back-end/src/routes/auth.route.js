const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { isUser, checkAdmin } = require("../middleware/auth.middleware");
const {
  validateEmailandPassword,
  validateCreateUser,
} = require("../middleware/userMiddleware");

router.post(
  "/login",
  validateEmailandPassword,
  checkAdmin,
  authController.loginAccount,
);
router.post(
  "/register",
  validateCreateUser,
  isUser,
  authController.registerUser,
);
router.post("/forget-password", authController.forgetPassword);
router.post("/reset-password/:token", authController.resetPassword);
router.get("/logout", authController.logout);
router.get("/refresh", authController.refreshToken);

module.exports = router;
