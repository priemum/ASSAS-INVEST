const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/* 
this models describe the pack collection, each pack has:
 name and,
  % profit,
  validity period
*/
const Pack = new Schema({
  title: String,
  description: String,
  period: Number,
  unite: String,
  state:{ //show or hide the pack to the users
    type: Boolean, //
    default: false,
  },
  creationDate:{
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Pack", Pack);
