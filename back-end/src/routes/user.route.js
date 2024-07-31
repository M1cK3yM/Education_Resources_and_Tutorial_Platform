const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const {
  autherizeJwt,
  checkAdmin,
  checkUser,
} = require("../middleware/auth.middleware");

router.get("/", autherizeJwt, checkAdmin, userController.getAllUsers);
router.post("/register", checkUser, userController.createUser);
router.post("/login", userController.loginAccount);
router.get("/:id", userController.getUserById);
router.get("/role/:role", userController.getUserByRole);
router.put("/:id", userController.updateProfile);
router.delete("/:id", userController.deleteAccount);

module.exports = router;

