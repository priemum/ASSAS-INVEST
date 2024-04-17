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
  var ref_id = crypto.randomBytes(4).toString("hex").toUpperCase();
  const year = moment().format('YY');
  ref_id = ref_id + year;

  const newWithdraw = await Case.findByIdAndUpdate(
    withdraw.caseId,
    {
      $push: {
        withdraws: {
          reference: ref_id,
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
  res.redirect(redirectUrl);
};
module.exports.showCreationForm = async (req, res) => {
  const caisses = await Case.find({}).populate(["user", "pack"]);
  res.render("withdraw/new", { caisses, moment });
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
module.exports.updateWithdraw = async (req, res) => {
  const { idCase, idWithdraw } = req.params;
  const { withdraw } = req.body;
  const {confirmed } = req.query;
  if (confirmed == 1) {
    const updatedWithdraw = await Case.findOneAndUpdate(
      { _id: idCase, "withdraws._id": idWithdraw },
      {
        $set: {
          "withdraws.$.state": "تم الدفع",
          
        },
      },
      { new: true }
    );
  }else if (confirmed == 0) {
    const updatedWithdraw = await Case.findOneAndUpdate(
      { _id: idCase, "withdraws._id": idWithdraw },
      {
        $set: {
          "withdraws.$.state": "قيد الإنتظار",
        },
      },
      { new: true }
    );
  }else{
    const updatedWithdraw = await Case.findOneAndUpdate(
      { _id: idCase, "withdraws._id": idWithdraw },
      {
        $set: {
          "withdraws.$.date": withdraw.date,
          "withdraws.$.amount": withdraw.amount,
          "withdraws.$.description": withdraw.description,
        },
      },
      { new: true }
    );
  }
  
  const redirectUrl = `back`;
  req.flash("success", "تم تحديث السحب بنجاح");
  res.redirect(redirectUrl);
  
};

module.exports.deleteWithdraw = async (req, res) => {
  const { idCase, idWithdraw } = req.params;

  const casee = await Case.findByIdAndUpdate(
    idCase,
    { $pull: { withdraws: { _id: idWithdraw } } },
    { new: true }
  );
const redirectUrl = `back`;
  req.flash("success", "تم المسح بنجاح");
  res.redirect(redirectUrl);
};

