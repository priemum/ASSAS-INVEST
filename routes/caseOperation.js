const express = require("express");
// To keep the parent req.params,
// you need to add { mergeParams: true } in to the child router.
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAdmin } = require("../middleware/middleware");
const {
  updateUserDemande,
  deleteUserReinvest,
  updateReinvest,
} = require("../controllers/caseOperation");
router
  .route("/:idct")
  .put(isLoggedIn, isAdmin, catchAsync(updateUserDemande))
  .delete(isLoggedIn, catchAsync(deleteUserReinvest));
router
  .route("/:idct/operation")
  .put(isLoggedIn, isAdmin, catchAsync(updateReinvest));
module.exports = router;
