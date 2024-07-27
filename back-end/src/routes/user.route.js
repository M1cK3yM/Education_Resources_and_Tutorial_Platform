const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.get("/:id", userController.getUserById);
router.get("/role/:role", userController.getUserByRole);
router.put("/:id", userController.updateProfile);
router.delete("/:id", userController.deleteAccount);


module.exports = router;
