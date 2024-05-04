const Announcement = require("../models/announcement");
const moment = require("moment");

module.exports.showAnnouncements = async (req, res) => {
  const announcements = await Announcement.find({}).sort({ date: -1 });
  // db.foo.find().sort({_id:1}).limit(50);
  // send it to the client
  res.render("announcement/index", { announcements, moment });
};
module.exports.addAnnouncement = async (req, res) => {
  // get the Announcement id from the materiels table

  const { creationDate, title, resume, description } = req.body.announcement;

  const newAnnouncement = new Announcement({
    creationDate,
    title,
    resume,
    description,
  });
  // res.send(req.file.path);

  newAnnouncement.picture = {
    url: req.file.path,
    filename: req.file.filename,
  };

  await newAnnouncement.save();
  req.flash("success", "تم الإضافة بنجاح");
  res.redirect("/announcement");
};
module.exports.showAnnouncement = async (req, res) => {
  const { idannouncement } = req.params;
  const announcement = await Announcement.findById(idannouncement);
  // send it to the client
  res.render("announcement/show", { announcement, moment });
};
module.exports.removeAnnouncement = async (req, res) => {
  const { idannouncement } = req.params;

  const announcement = await Announcement.findByIdAndDelete(idannouncement);
  // send it to the client
  req.flash("success", "تم الحدف بنجاح");
  res.redirect(`/announcement`);
};
