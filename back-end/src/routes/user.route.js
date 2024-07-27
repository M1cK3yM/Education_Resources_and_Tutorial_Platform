const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");

router.get("/", userController.getAllUsers);
router.post("/", userController.createStudent);
router.get("/:id", userController.getUserById);
router.get("/role/student", userController.getStudents);
router.post("/mentor", userController.createMentors);


module.exports = router;
