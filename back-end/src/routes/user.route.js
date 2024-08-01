const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const { authorizeJwt, isUser } = require("../middleware/auth.middleware");

router.post("/password/:id", authorizeJwt, userController.updatePassword);
router.get("/", authorizeJwt, isUser, userController.getUser);
router.put("/:id", authorizeJwt, userController.updateProfile);
router.delete("/:id", authorizeJwt, userController.deleteAccount);

module.exports = router;
