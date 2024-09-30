const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const { authorizeJwt } = require("../middleware/auth.middleware");
const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return cb(new Error("Only images are allowed"));
    }
    cb(null, true);
  },
});


const {
  validateUpdateUser,
  validatePasswordUpdate,
} = require("../middleware/userMiddleware");

router.post(
  "/password/:id",
  authorizeJwt,
  validatePasswordUpdate,
  userController.updatePassword,
);
router.get("/:id", userController.getUserById);
router.get("/", authorizeJwt, userController.getUser);
router.put(
  "/:id",
  authorizeJwt,
  upload.single("profile"),
  validateUpdateUser,
  userController.updateProfile,
);
router.delete("/:id", authorizeJwt, userController.deleteAccount);
module.exports = router;
