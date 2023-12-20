const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/* 
this models describe the announcement collection, each announcement has:

*/
const Announcement = new Schema({
  title: String,
  description: String,
  resume: String,
  state:{ //show or hide the announcement to the users
    type: Boolean, //
    default: false,
  },
  creationDate:{
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Announcement", Announcement);