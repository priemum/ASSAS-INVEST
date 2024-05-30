const Courier = require("../models/courier");
const User = require("../models/user");
const moment = require("moment");

module.exports.showCouriers = async (req, res) => {
  const users = await User.find({});
  const couriers = await Courier.find({}).populate(["user"]);
  let total = 0;
  let UsersNewMessages = [];
  for (let i = 0; i < couriers.length; i++) {
    total = couriers[i].message.reduce((acc, message) => {
      if (!message.consultedByAdmin) return acc + 1;
      else return acc;
    }, 0);
    
      UsersNewMessages.push({ document: couriers[i], unread: total });
    
  }
  UsersNewMessages.sort((a, b) => b.unread - a.unread);
  res.render("courier/index", { couriers:UsersNewMessages, users });
  // res.send(UsersNewMessages);
  
};

module.exports.showUserCouriers = async (req, res) => {
  const userId = req.body.userId;
  const consultedBy = req.body.consultedBy;
  let couriers;

  if (consultedBy === "أدمين") {
    couriers = await Courier.find({ user: userId }).then(function (documents) {
      for (document of documents) {
        for (message of document.message) {
          message.consultedByAdmin = true;
        }
        document.save();
      }
    });
  } else {
    couriers = await Courier.find({ user: userId }).then(function (documents) {
      for (document of documents) {
        for (message of document.message) {
          message.consultedByUser = true;
        }
        document.save();
      }
    });
  }

  couriers = await Courier.findOne({ user: userId });
  res.send(couriers);
};

module.exports.addCourier = async (req, res) => {
  if (req.user.role.includes("أدمين")) {
    message = {
      $push: {
        message: {
          content: req.body.message,
          createdby: req.user.fullname,
          consultedByUser: false,
        },
      },
    };
  } else {
    message = {
      $push: {
        message: {
          content: req.body.message,
          createdby: "المستثمر",
          consultedByAdmin: false,
        },
      },
    };
  }
  await Courier.updateOne(
    { user: req.body.userId },
    message,
    { upsert: true },
    function (err, res) {
      if (err) throw err;
    }
  );
  res.send(message);
};
module.exports.showCourier = async (req, res) => {
  const { idcourier } = req.params;
  const courier = await Courier.findById(idcourier);
  // send it to the client
  res.render("courier/show", { courier, moment });
};
module.exports.removeCourier = async (req, res) => {
  const { idcourier } = req.params;

  const courier = await Courier.findByIdAndDelete(idcourier);
  // send it to the client
  req.flash("success", "تم الحدف بنجاح");
  res.redirect(`/courier`);
};
