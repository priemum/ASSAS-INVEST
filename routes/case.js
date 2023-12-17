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
router.route("/").get(isLoggedIn, catchAsync(caseList));
router.route("/new").get(isLoggedIn, catchAsync(showCreationForm));
router
  .route("/:id")
  .post(catchAsync(createCase))
  .get(isLoggedIn, isAuthor, catchAsync(showCase))
  .put(isLoggedIn, isAuthor, catchAsync(updateCase))
  .delete(isLoggedIn, isAuthor, catchAsync(deleteCase));
router.route("/:id/edit").get(catchAsync(showUpdateForm));
module.exports = router;
