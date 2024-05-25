let moment = require("moment");
const Case = require("../models/case");
module.exports.locals = async (req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.user = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.bgColor = "bg-dark";
  res.locals.textColor = "text-dark";
  res.locals.now = moment().format("YYYY");
  res.locals.announceProfits = await Case.find({ state: "قيد الإنتظار" })
  .populate(["user", "pack"])
  .count();
  // res.locals.announceProfits = async () => {
  //   const nbr = await Case.find({ state: "قيد الإنتظار" })
  //     .populate(["user", "pack"])
  //     .count();
  //   // console.log("announceProfits :", nbr);
  //   return nbr;
  // };

  res.locals.getNbrOfDays = (nbrDays) => {
    // console.log("nbrDays: ", nbrDays);
    return nbrDays > 1 ? nbrDays + " days" : nbrDays + " day";
  };
  res.locals.calculatePercentage = (date, period) => {
    return Math.round(
      Math.abs((moment(date).diff(moment(), "days") * 100) / period)
    );
  };
  next();
};
