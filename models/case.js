const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
/* 
سجل الاستثمار
    this model describe all the investemts of a user and 
    thier state(active, inactive...) and their time left
  
*/
const Case = new Schema({
  reference: {
    // an id used to uniquely identify the investment used in the contract
    type: String,
    required: true,
  },
  user: {
    //the investor
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  pack: {
    //the pack selected by the admin
    type: Schema.Types.ObjectId,
    ref: "Pack",
  },
  initAmount: {
    //initial invested amount
    type: Number,
    required: true,
  },
  description: String,
  state: {
    //value = active, end
    type: String,
    default: "Active",
  },
  startDate: {
    //we get the timeleft
    type: Date,
    default: Date.now,
  },
  endDate: Date,

  withdraws: [
    {
      // withdraw happends in the investment
      date: {
        type: Date,
        default: Date.now,
      },
      amount: {
        type: Number,
        default: 0,
      },
      state: {
        // state of the withdraw accepted, pending, or rejected
        type: String,
        default: "Pending",
      },
    },
  ],
});
Case.virtual("nbrDays").get(function () {
  return moment(this.endDate).diff(this.startDate, "days");
});
Case.virtual("pastDays").get(function () {
  return moment().diff(this.startDate, "days");
});
Case.virtual("restDays").get(function () {
  return moment(this.endDate).diff(moment(), "days");
});
Case.virtual("daysPersent").get(function () {
  return (this.pastDays * 100) / this.nbrDays;
});
module.exports = mongoose.model("Case", Case);
