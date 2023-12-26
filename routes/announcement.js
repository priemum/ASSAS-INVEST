const express = require("express");
const passport = require("passport");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const upload = multer({ storage });
const {
  showAnnouncements,
  addAnnouncement,
  showAnnouncement,
  removeAnnouncement,
} = require("../controllers/announcement");
const { isLoggedIn, isAdmin } = require("../middleware/middleware");
router;
router
  .route("/")
  .get(isLoggedIn, isAdmin, catchAsync(showAnnouncements))
  .post(isLoggedIn, isAdmin, catchAsync(addAnnouncement));

router
  .route("/:idannouncement")
  .delete(isLoggedIn, isAdmin, catchAsync(removeAnnouncement))
  .get(isLoggedIn, isAdmin, catchAsync(showAnnouncement));

module.exports = router;
