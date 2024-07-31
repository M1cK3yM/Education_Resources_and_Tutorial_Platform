const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const { authorizeJwt, isAdmin } = require("../middleware/auth.middleware");

router.get("/", authorizeJwt, isAdmin, userController.getAllUsers);
router.post("/password/:id", authorizeJwt, userController.updatePassword);
router.get("/:id", authorizeJwt, isAdmin, userController.getUserById);
router.get("/role/:role", authorizeJwt, isAdmin, userController.getUserByRole);
router.put("/:id", authorizeJwt, userController.updateProfile);
router.delete("/:id", authorizeJwt, userController.deleteAccount);

module.exports = router;
