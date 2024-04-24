const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");

const {
  showCouriers,
  addCourier,
  showCourier,
  removeCourier,
  showUserCouriers,
} = require("../controllers/courier");
const { isLoggedIn, isAdmin } = require("../middleware/middleware");
router;
router
  .route("/")
  .get(isLoggedIn, catchAsync(showCouriers))
  .post(isLoggedIn, catchAsync(addCourier));

  router.route("/show").post(isLoggedIn,catchAsync(showUserCouriers));
router
  .route("/:idcourier")
  .delete(isLoggedIn, catchAsync(removeCourier))
  .get(isLoggedIn, catchAsync(showCourier));

module.exports = router;
