const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const userMiddleware = require("../middlewares/user.middleware");

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.get("/:id", userMiddleware.checkUserExists, userController.getUserById);
router.get(
  "/role/:role",
  userMiddleware.checkUserRole(["admin", "mentor"]),
  userController.getUserByRole
);
router.put(
  "/:id",
  userMiddleware.checkUserExists,
  userMiddleware.checkUserRole(["admin", "student"]),
  userController.updateProfile
);
router.delete(
  "/:id",
  userMiddleware.checkUserExists,
  userMiddleware.checkUserRole(["admin"]),
  userController.deleteAccount
);

module.exports = router;