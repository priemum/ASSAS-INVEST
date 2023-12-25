const moment = require("moment");
const crypto = require("crypto");
const Case = require("../models/case");
const Pack = require("../models/pack");
const User = require("../models/user");

module.exports.caseList = async (req, res) => {
  const cases = await Case.find({}).populate(["user", "pack"]);
  res.render("case/index", { cases, moment });
};
module.exports.createCase = async (req, res) => {
  let { casee } = req.body;
  const packchosen = await Pack.findById(casee.pack);

  if (packchosen.unite === "شهر") {
    endDate = moment(casee.startDate).add(packchosen.period, "months").format("YYYY-MM-DD");
  } else if (packchosen.unite === "أسبوع") {
    endDate = moment(casee.startDate).add(packchosen.period, "weeks").format("YYYY-MM-DD");
  } else {
    endDate = moment(casee.startDate).add(packchosen.period, "days").format("YYYY-MM-DD");
  }

  const newCase = new Case({
    reference: casee.reference,
    user: casee.user,
    pack: casee.pack,
    initAmount: casee.initAmount,
    description: casee.description,
    startDate: casee.startDate,
    endDate: endDate,
  });

  await newCase.save();
  res.redirect("/case");
};
module.exports.showCreationForm = async (req, res) => {
  const packs = await Pack.find({});
  const users = await User.find({});
  var ref_id = crypto.randomBytes(4).toString("hex").toUpperCase();
  const year = moment().format('YY');
  ref_id = ref_id + year;
  
  res.render("case/new", { packs, users, moment, ref_id });
};
module.exports.showUpdateForm = async (req, res) => {
  const { id } = req.params;
  const invest = await Case.findById(id).populate(["packname"]);
  const packs = await Pack.find({});
  if (!invest) {
    req.flash("error", "Cannot find that investment!");
    return res.redirect("/case");
  }
  res.render("case/edit", {
    invest,
    packs,
  });
};
module.exports.showCase = async (req, res) => {
  res.send("Show Case");
};
module.exports.showUsersCase = async (req, res) => {
  // const users = await Case.find({}).populate({ path: "user" });
  const invests = await Case.find({}).populate(["user", "packname"]);
  // res.send(invests);

  res.render("case/usersInvest", { invests, moment });
};
module.exports.updateCase = async (req, res) => {
  res.send("Update Case");
};
module.exports.deleteCase = async (req, res) => {
  const { id } = req.params;
  await Case.findByIdAndDelete(id);
  req.flash("success", "تم الحذف بنجاح");
  res.redirect("/case");
};
