const moment = require("moment");
const crypto = require("crypto");
const Case = require("../models/case");
const Pack = require("../models/pack");
const User = require("../models/user");

module.exports.updateUserDemande = async (req, res) => {
  const { id, idct } = req.params;
  const { state, motif, pack, date } = req.body;
  const { from } = req.query;
  // if the request comes from the confirm button (completedwithdraw.ejs) in the show page
  var ref_id = crypto.randomBytes(4).toString("hex").toUpperCase();
  const year = moment().format("YY");
  ref_id = ref_id + year;
  // state:مقبول /مرفوض
  if (state == "مقبول") {
    console.log("مقبول");
    const casee = await Case.findById(id);
    let amount;
    for (c of casee.reinvests) {
      if (c.id === idct) {
        amount = c.amount;
      }
      console.log("amount:", amount);
      console.log(typeof amount);
    }
    const packchosen = await Pack.findById(pack);
    let endDate;
    if (packchosen.unite === "شهر") {
      endDate = moment(date)
        .add(packchosen.period, "months")
        .format("YYYY-MM-DD");
    } else if (packchosen.unite === "أسبوع") {
      endDate = moment(date)
        .add(packchosen.period, "weeks")
        .format("YYYY-MM-DD");
    } else {
      endDate = moment(date)
        .add(packchosen.period, "days")
        .format("YYYY-MM-DD");
    }
    const newCase = new Case({
      reference: ref_id,
      initAmount: amount,
      user: casee.user,
      pack: pack,
      startDate: date,
      endDate: endDate,
      profit: 0,
    });
    await newCase.save();
    await Case.findOneAndUpdate(
      { _id: id, "reinvests._id": idct },
      {
        $set: {
          "reinvests.$.reference": ref_id,
          "reinvests.$.state": state,
          "reinvests.$.motif": motif,
        },
      },
      { new: true }
    );
  } else {
    // مرفوض
    console.log("مرفوض");
    console.log("idct:", idct);
    await Case.findOneAndUpdate(
      { _id: id, "reinvests._id": idct },
      {
        $set: {
          "reinvests.$.state": state,
          "reinvests.$.motif": motif,
        },
      },
      { new: true }
    );
  }

  const redirectUrl = `back`;
  req.flash("success", "تم تحديث بنجاح");
  res.redirect(redirectUrl);
  // res.send("dsadsad")
};
module.exports.deleteUserReinvest = async (req, res) => {
  const { id, idct } = req.params;
  console.log("deleteUserReinvest")
 await Case.findByIdAndUpdate(
    id,
    { $pull: { reinvests: { _id: idct } } },
    { new: true }
  );
  const redirectUrl = `back`;
  req.flash("success", "تم المسح بنجاح");
  res.redirect(redirectUrl);
};
