const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
// const multer = require("multer");
// const { profilePictures } = require("../cloudinary");

// const upload = multer({ storage: profilePictures });
const { isLoggedIn, isAdmin } = require("../middleware/middleware");
const {
  showProfile,
  updateUser,
  deleteUser,
  passwordReset,
} = require("../controllers/user");
router
  .route("/")
  .put(isLoggedIn, isAdmin, catchAsync(updateUser))
  .delete(catchAsync(deleteUser));
router.route("/reset-password").put(catchAsync(passwordReset));

router.route("/profile").get(catchAsync(showProfile));
module.exports = router;
