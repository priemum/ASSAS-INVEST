const express = require("express");
const passport = require("passport");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const { profilePictures } = require("../cloudinary");

const upload = multer({ storage: profilePictures });
const { isLoggedIn } = require("../middleware/middleware");
const {
  login,
  register,
  showUsers,
  showUserForm,
  showRegisterForm,
  showProfile,
  showLoginForm,
  logout,
  updateUser,
  deleteUser,
} = require("../controllers/user");

router.route("/").get(catchAsync(showUsers));
router.route("/register").get(showRegisterForm).post( catchAsync(register));
router
  .route("/login")
  .get(showLoginForm)
  .post(
    passport.authenticate("local-user", {
      failureFlash: true,
      failureRedirect: "/user/login",
    }),
    login
  );
  
// router.route.("/auth/facebook")
router.route("/logout").get(logout);
router
  .route("/:id")
  .get(catchAsync(showUserForm))
  .put(upload.single("picture"), catchAsync(updateUser))
  .delete(catchAsync(deleteUser));
router.route("/:id/profile").get(catchAsync(showProfile));
module.exports = router;
