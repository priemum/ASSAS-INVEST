const moment = require("moment");
const crypto = require("crypto");
const Case = require("../models/case");
const Pack = require("../models/pack");
const User = require("../models/user");

module.exports.withdrawList = async (req, res) => {
  const caisses = await Case.find({}).populate(["user", "pack"]);
  res.render("withdraw/index", { caisses, moment });
};
module.exports.createWithdraw = async (req, res) => {
  let { withdraw } = req.body;

  const newWithdraw = await Case.findByIdAndUpdate(
    withdraw.caseId,
    {
      $push: {
        withdraws: {
          date: withdraw.date,
          amount: withdraw.amount,
          description: withdraw.description,
        },
      },
    },
    { new: true }
  );

  const redirectUrl = `back`;
  req.flash("success", "تم السحب بنجاح");
  res.redirect("/withdraw/" + withdraw.caseId);
};
module.exports.showCreationForm = async (req, res) => {
  const caisse = await Case.find({}).populate(["user", "pack"]);
  res.render("withdraw/new", { caisse, moment });
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
module.exports.showCaseWithdraws = async (req, res) => {
  // get the Case id from the Cases table
  const { id } = req.params;
  // find the Case in the database

  const caisse = await Case.findById(id).populate(["user", "pack"]);
  // send it to the client

  res.render("withdraw/show", { caisse, moment });
};
module.exports.updateCase = async (req, res) => {
  res.send("Update Case");
};
module.exports.deleteWithdraw = async (req, res) => {
  const { idCase, idWithdraw } = req.params;

  const casee = await Case.findByIdAndUpdate(
    idCase,
    { $pull: { withdraws: { _id: idWithdraw } } },
    { new: true }
  );

  req.flash("success", "تم المسح بنجاح");
  res.redirect(`/withdraw/${idCase}`);
};
