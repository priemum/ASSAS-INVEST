let moment = require("moment");

module.exports.locals = (req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.user = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.bgColor = "bg-dark";
  res.locals.textColor = "text-dark";
  res.locals.now = moment().format("YYYY")
  

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
