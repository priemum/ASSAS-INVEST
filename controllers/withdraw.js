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
  let { withdraw, choice, pack } = req.body;
  var ref_id = crypto.randomBytes(4).toString("hex").toUpperCase();
  const year = moment().format("YY");
  ref_id = ref_id + year;
  // Find the case
  const caisse = await Case.findById(withdraw.caseId);
  console.log("test caisse:", caisse.restCase);
  // في حالة السحب
  if (choice == "سحب") {
    // Check the amount by comparing it to the restCase property
    if (withdraw.amount <= caisse.restCase) {
      // update the case by pushing a new withdraw object to the withdraws table
      await Case.findByIdAndUpdate(
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
      req.flash("success", "💵💵 تم السحب بنجاح");
    } else {
      req.flash("error", "🖕 😂 المبلغ المسحوب اكبر من المبلغ الباقي 😂 🖕");
    }
    
  } else {// في حالة إعادة الإستثمار
    // Check the amount by comparing it to the restCase property
    if (withdraw.amount <= caisse.restCase) {
      // update the case by pushing a new reinvest object to the reinvests table
      await Case.findByIdAndUpdate(
        withdraw.caseId,
        {
          $push: {
            reinvests: {
              amount: withdraw.amount,
              state: "قيد الإنتظار",
              pack: pack || undifined,
            },
          },
        },
        { new: true }
      );
      req.flash("success", "💵💵💵 العملية قيد الإنتظار");
    } else {
      req.flash("error", "🖕 😂 المبلغ المسحوب اكبر من المبلغ الباقي 😂 🖕");
    }
  }
  res.redirect(`back`);
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
  // // get the Case id from the Cases table
  const { id } = req.params;
  // // find the Case in the database
  const packs = await Pack.find({});
  const caisse = await Case.findById(id).populate(["user", "pack"]);
  let reinvestCaisse = [];
  // // send it to the client

  for (ref of caisse.reinvests) {
    reinvestCaisse.push({
      id: ref.id,
      amount: ref.amount,
      pack: await Pack.findById(ref.pack),
      state: ref.state,
    });
  }
  res.render("withdraw/show", { caisse, moment, packs, reinvestCaisse });
  // res.send(caisse);
};
module.exports.updateWithdraw = async (req, res) => {
  const { idCase, idWithdraw } = req.params;
  const { withdraw, choice, motif } = req.body;
  const { from } = req.query;
  // if the request comes from the confirm button
  //  (completedwithdraw.ejs) in the show page 
  if (choice) {
    await Case.findOneAndUpdate(
      { _id: idCase, "withdraws._id": idWithdraw },
      {
        $set: {
          "withdraws.$.state": choice,
          "withdraws.$.motif": motif,
        },
      },
      { new: true }
    );
  } else if (from == 0) {
    // if the request comes from the edit withrow table then from = 0
    // so we cancel the acceptation of the withdraw
    await Case.findOneAndUpdate(
      { _id: idCase, "withdraws._id": idWithdraw },
      {
        $set: {
          "withdraws.$.state": "قيد الإنتظار",
        },
      },
      { new: true }
    );
  } else if (from == 1) {
    // if the request comes from the edit withrow table
    await Case.findOneAndUpdate(
      { _id: idCase, "withdraws._id": idWithdraw },
      {
        $set: {
          "withdraws.$.state": "قيد الإنتظار",
        },
      },
      { new: true }
    );
  } else {
    // if the request comes from the
    await Case.findOneAndUpdate(
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
