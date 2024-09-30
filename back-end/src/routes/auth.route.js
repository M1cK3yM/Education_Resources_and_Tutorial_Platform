const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { isUser, checkAdmin, authorizeJwt } = require("../middleware/auth.middleware");
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
router.post("/logout", authorizeJwt, authController.logout);
router.post("/refresh", authorizeJwt, authController.refreshToken);
router.get("/verify-email/:token", authController.verifyEmail);
router.post("/request", authController.consentRequest);
router.get("/oauth2", authController.oauthResponse);

module.exports = router;
