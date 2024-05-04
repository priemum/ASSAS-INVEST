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

const Case = new Schema(
  {
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
    actualprofitls: {
      //profits at actual time of the case
      type: Number,
      default: 0,
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
    reinvests: [
      {
        reference: { type: String, default: undefined },
        amount: Number,
        pack: { type: Schema.Types.ObjectId, ref: "Pack", default: undefined },
        state: {
          type: String,
          default: "قيد الإنتظار",
        },
        motif: {
          type: String,
          default: "",
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
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
        motif: {
          // state of the withdraw accepted, pending, or rejected
          type: String,
        },
      },
    ],
  },
  opts
);
Case.virtual("nbrDays").get(function () {
  return moment(this.endDate).diff(this.startDate, "days");
});
Case.virtual("pastDays").get(function () {
  const pastdays = moment().diff(this.startDate, "days");

  if (pastdays <= this.nbrDays) {
    return pastdays;
  } else {
    return this.nbrDays;
  }
});
Case.virtual("restDays").get(function () {
  const restdays = moment(this.endDate).diff(moment(), "days");

  if (restdays >= 0) {
    return restdays;
  } else {
    return 0;
  }
});
Case.virtual("daysPersent").get(function () {
  return (this.pastDays * 100) / this.nbrDays;
});
Case.virtual("daysPastPersent").get(function () {
  return 100 - (this.pastDays * 100) / this.nbrDays;
});

Case.virtual("restCase").get(function () {
  // restCase = initAmount + profit - (withdraws + reinvests)
  const restCase =
    this.initAmount +
    this.profit -
    (this.withdraws.reduce((acc, withdraw) => {
      if (withdraw.state === "تم الدفع") {
        return acc + withdraw.amount;
      } else return acc;
    }, 0) +
      this.reinvests.reduce((acc, reinvest) => {
        if (reinvest.state === "مقبول") return acc + reinvest.amount;
        else return acc;
      }, 0));
  return restCase;
});
Case.virtual("totalWithdraws").get(function () {
  const totalWithdraws = this.withdraws.reduce((acc, withdraw) => {
    if (withdraw.state === "تم الدفع") return acc + withdraw.amount;
    else return acc;
  }, 0);
  return totalWithdraws;
});
module.exports = mongoose.model("Case", Case);
