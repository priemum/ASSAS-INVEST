const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAdmin } = require("../middleware/middleware");
const {
  withdrawList,
  showUsersCase,
  createWithdraw,
  showCreationForm,
  showUpdateForm,
  showCaseWithdraws,
  updateWithdraw,
  deleteWithdraw,
} = require("../controllers/withdraw");
router
  .route("/")
  .post(isLoggedIn, catchAsync(createWithdraw))
  .get(isLoggedIn, isAdmin, catchAsync(withdrawList));

router.route("/new").get(isLoggedIn, isAdmin, catchAsync(showCreationForm));
router.route("/:id").get(isLoggedIn, catchAsync(showCaseWithdraws));
router
  .route("/:idCase/:idWithdraw")
  .put(isLoggedIn, isAdmin, catchAsync(updateWithdraw))
  .delete(isLoggedIn, isAdmin, catchAsync(deleteWithdraw));
router.route("/:id/edit").get(isLoggedIn, isAdmin, catchAsync(showUpdateForm));
module.exports = router;
