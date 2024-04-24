const Pack = require("../models/pack");
const units = require("../seeds/units");
module.exports.showCreationForm = async (req, res) => {
  res.render("pack/new", { units });
};
module.exports.createPack = async (req, res) => {
  const { pack } = req.body;
  if (pack.state === "on") {
    pack.state = "مفعلة";
  } else {
    pack.state = "غير مفعلة";
  }

  const newPacks = new Pack({ ...pack });
  await newPacks.save();
  res.redirect("/pack");
};
module.exports.packList = async (req, res) => {
  const packs = await Pack.find({});
  res.render("pack/index", { packs, units });
};
module.exports.showPack = async (req, res) => {
  const { id } = req.params;
  res.send("Show Pack");
};
module.exports.showUpdateForm = async (req, res) => {
  res.send("Update Pack Form");
};
module.exports.updatePack = async (req, res) => {
  res.send("Update Pack");
};
module.exports.deletePack = async (req, res) => {
  const { id } = req.params;
  await Pack.findByIdAndDelete(id);
  req.flash("success", "تم الحذف بنجاح");
  res.redirect("/pack");
};
