const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAdmin } = require("../middleware/middleware");
const {
  caseList,
  showUsersCase,
  createCase,
  showCreationForm,
  showUpdateForm,
  showCase,
  updateCase,
  deleteCase,
} = require("../controllers/case");
router
  .route("/")
  .get(isLoggedIn, isAdmin, catchAsync(caseList))
  .post(isLoggedIn, isAdmin,catchAsync(createCase));
router.route("/new").get(isLoggedIn, isAdmin, catchAsync(showCreationForm));
router
  .route("/:id")
  .get(isLoggedIn, isAdmin, catchAsync(showCase))
  .put(isLoggedIn, isAdmin, catchAsync(updateCase))
  .delete(isLoggedIn, isAdmin, catchAsync(deleteCase));
router.route("/:id/edit").get(isLoggedIn, isAdmin, catchAsync(showUpdateForm));
module.exports = router;
