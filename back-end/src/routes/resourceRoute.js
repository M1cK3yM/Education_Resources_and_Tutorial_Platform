const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resourceController");

router.get("/", resourceController.getAllUsers);
router.post("/", resourceController.createUser);
router.get("/:id", resourceController.getUserById);
router.get("/role/:role", resourceController.getUserByRole);
router.put("/:id", resourceController.updateProfile);
router.delete("/:id", resourceController.deleteAccount);


module.exports = router;
