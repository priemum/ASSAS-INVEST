const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor } = require("../middleware/middleware");
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
router.route("/").get(catchAsync(caseList)).post(catchAsync(createCase));
router.route("/new").get(catchAsync(showCreationForm));
router
  .route("/:id")
  .get(isLoggedIn, isAuthor, catchAsync(showCase))
  .put(isLoggedIn, isAuthor, catchAsync(updateCase))
  .delete( catchAsync(deleteCase));
router.route("/:id/edit").get(catchAsync(showUpdateForm));
module.exports = router;
