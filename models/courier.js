const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/* 
this models describe the courier collection, each courier has:

*/
const Courier = new Schema({
  user: {
    //the investor
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  message: [{
    content: {
      //the message content
      type: String,
      required: true,
    },
    createdby: {
      //the user who created the message (if it's admin = admin's fullname, else by user = invester)
      type: String,
    },
    creationDate: {
      //the creation date
      type: Date,
      default: Date.now,
    },
    consulted: {
      //read by admin or user (false not read, true read)
      type: Boolean, //read
      default: false,
    },
  },], //the message

});

module.exports = mongoose.model("Courier", Courier);
