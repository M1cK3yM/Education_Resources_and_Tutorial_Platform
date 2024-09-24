const express = require("express");
const router = express.Router();
const newsController = require("../controllers/news.controller");
const { authorizeJwt, isAdmin } = require("../middleware/auth.middleware");
const { validateNews } = require("../middleware/newsmiddleware");

router.get("/", newsController.getAllNews);
router.post(
  "/",
  // authorizeJwt,
  // isAdmin,
  newsController.createNews
);
router.get("/:id", newsController.getNewsById);
router.put(
  "/:id",
  // authorizeJwt, isAdmin,
  newsController.updateNews
);
router.delete(
  "/:id",
  // authorizeJwt, isAdmin,
  newsController.deleteNews
);

module.exports = router;
