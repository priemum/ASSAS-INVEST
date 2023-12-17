const moment = require("moment");
const Case = require("../models/case");
const Pack = require("../models/pack");

module.exports.caseList = async (req, res) => {
  const invests = await Case.find({});
  res.send(invests);
};
module.exports.createCase = async (req, res) => {
  const { picture, packname } = req.body;
  const user = req.user.id;
  const invest = new Case({ user, packname });
  (invest.payment_picture = {
    url: req.file.path,
    filename: req.file.filename,
  }),
    await invest.save();
  res.redirect("/case/users");
};
module.exports.showCreationForm = async (req, res) => {
  const packs = await Pack.find({});
  res.render("case/new", { packs });
};
module.exports.showUpdateForm = async (req, res) => {
  const { id } = req.params;
  const invest = await Case.findById(id).populate(["packname"]);;
  const packs = await Pack.find({});
  if (!invest) {
    req.flash("error", "Cannot find that investment!");
    return res.redirect("/case");
  }
  res.render("case/edit", {
    invest,packs
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
  req.flash("success", "Successfully deleted investment!");
  res.redirect("/case/users");
};
