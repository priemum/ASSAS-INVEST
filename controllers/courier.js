const Courier = require("../models/courier");
const User = require("../models/user");
const moment = require("moment");

module.exports.showCouriers = async (req, res) => {
  const users = await User.find({});
  const couriers = await Courier.find({}).populate(["user"]);
  // db.foo.find().sort({_id:1}).limit(50);
  // send it to the client
  
  res.render("courier/index", { couriers,users});
};


module.exports.showUserCouriers = async (req, res) => {
  const userId = req.body.userId;
   
  
  const couriers = await Courier.findOne({user:userId});
  // db.foo.find().sort({_id:1}).limit(50);
  // send it to the client
 
  res.send(couriers);
};





module.exports.addCourier = async (req, res) => {
  // get the Courier id from the materiels table
  let sender;
  if(req.user.role.includes('أدمين')){
    sender = req.user.fullname;
  }else{
    sender = "المستثمر";
  }
  
  const message = { $push: {message:{content: req.body.message , createdby: sender}}};
   await Courier.updateOne( {user: req.body.userId}, message, { upsert: true }, function(err, res) {
    if (err) throw err;
    console.log("Document updated or inserted");
  });
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