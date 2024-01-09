const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
/* 
سجل الاستثمار
    this model describe all the investemts of a user and 
    thier state(active, inactive...) and their time left
  
*/
const opts = {
  toJSON: {
    virtuals: true,
  },
};

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
  profit: {
    //profits at the end of the case
    type: Number,
    
  },
  description: String,
  state: {
    //value = active, end
    type: String,
    default: "نشطة",
  },
  startDate: {
    //we get the timeleft
    type: Date,
    default: Date.now,
  },
  endDate: Date,

  withdraws: [
    {
      reference: {
        // an id used to uniquely identify the withdraw
        type: String,
        required: true,
      },
      // withdraw happends in the investment
      date: {
        type: Date,
        default: Date.now,
      },
      amount: {
        type: Number,
        default: 0,
      },
      description: {
       
        type: String,
        default: "لاشيء",
      },
      state: {
        // state of the withdraw accepted, pending, or rejected
        type: String,
        default: "قيد الإنتظار",
      },
    },
  ],
  
},opts);
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

Case.virtual("restCase").get(function () {
 const restCase = (this.initAmount+ this.profit)- this.withdraws.reduce((acc, currentvalue)=>acc + currentvalue.amount,0);
  return restCase;
});
Case.virtual("totalWithdraw").get(function () {
 const totalWithdraw = this.withdraws.reduce((acc, currentvalue)=>acc + currentvalue.amount,0);
  return totalWithdraw;
});
module.exports = mongoose.model("Case", Case);