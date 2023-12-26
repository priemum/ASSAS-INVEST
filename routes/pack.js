const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAdmin } = require("../middleware/middleware");
const {
  packList,
  showCreationForm,
  createPack,
  showPack,
  showUpdateForm,
  updatePack,
  deletePack,
  showActivePacks,
} = require("../controllers/pack");
router.route("/").get(isLoggedIn, isAdmin,catchAsync(packList)).post(isLoggedIn, isAdmin,catchAsync(createPack));
router.route("/new").get(isLoggedIn, isAdmin,catchAsync(showCreationForm));
router
  .route("/:id")
  .get(isLoggedIn,catchAsync(showPack))
  .put(isLoggedIn, isAdmin,catchAsync(updatePack))
  .delete(isLoggedIn, isAdmin,catchAsync(deletePack));
router.route("/:id/edit").get(isLoggedIn, isAdmin,catchAsync(showUpdateForm));

module.exports = router;
