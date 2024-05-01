const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAdmin } = require("../middleware/middleware");
const { updateUserDemande } = require("../controllers/caseOperation");
// router
//   .route("/")
//   .post(isLoggedIn, catchAsync(createWithdraw))
//   .get(isLoggedIn, isAdmin, catchAsync(withdrawList));

// router.route("/new").get(isLoggedIn, isAdmin, catchAsync(showCreationForm));
router
  .route("/:idct")
  //   .get(isLoggedIn, catchAsync(showCaseWithdraws))
  .put(isLoggedIn, isAdmin, catchAsync(updateUserDemande));
//   .delete(isLoggedIn, isAdmin, catchAsync(deleteWithdraw));

// router.route("/:id/edit").get(isLoggedIn, isAdmin, catchAsync(showUpdateForm));
module.exports = router;
