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
    consultedByAdmin:{
      //read by admin (false not read, true read)
      type: Boolean, //read
      
    },
    consultedByUser: {
      //read by user (false not read, true read)
      type: Boolean, //read
      
    },
  },], //the message

});
Courier.virtual("unreadUser").get(function () {
  const unreadUser = this.message.reduce((acc, message) => {
    if (!message.consultedByUser) return acc + 1;
    else return acc;
  }, 0);
  return unreadUser;
});

Courier.virtual("unreadAdmin").get(function () {
  const unreadAdmin = this.message.reduce((acc, message) => {
    if (!message.consultedByAdmin) return acc + 1;
    else return acc;
  }, 0);
  return unreadAdmin;
});

module.exports = mongoose.model("Courier", Courier);
