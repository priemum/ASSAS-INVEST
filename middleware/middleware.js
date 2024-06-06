const Case = require("../models/case");
const Pack = require("../models/pack");
module.exports.errorPage = (err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (statusCode === 404 && !err.message) err.message = "Page Not Found";
  else if (statusCode === 403 && !err.message) err.message = "Forbiden";
  else if (statusCode === 500 && !err.message)
    err.message = "Internal Server Error";
  else if (!err.message) err.message = "Somthing Went Wrong";
  res.status(statusCode).render("errorHandling/error", {
    err,
    statusCode,
  });
};
module.exports.isAdmin = async (req, res, next) => {
  if (!req.user.role.includes("أدمين")) {
    req.flash("error", "Vous n'êtes pas autorisé!");
    return res.redirect(`/`);
  }
  next();
};
module.exports.isLoggedIn = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in first!");
    return res.redirect("/user/login");
  }
  next();
};
module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const invest = await Case.findById(id);
  if (!invest.user._id.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/investments/${id}`);
  }
  next();
};
