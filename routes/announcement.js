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
  .get(catchAsync(showAnnouncements))
  .post( catchAsync(addAnnouncement));

router
  .route("/:idannouncement")
  .delete( catchAsync(removeAnnouncement))
  .get(catchAsync(showAnnouncement));

module.exports = router;