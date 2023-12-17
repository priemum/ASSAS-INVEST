if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");

const User = require("../models/user");
const Country = require("../models/country");
const algeria = require("./algeriaState");
const Case = require("../models/case");
const DBConnection = require("../database/connection");

const seedDB = async () => {
  await User.deleteMany({});
  await Country.deleteMany({});
  await Case.deleteMany({});
  const country = new Country({
    country: algeria.country,
    code: algeria.code,
    flag: algeria.flag,
  });
  country.states = algeria.states;
  await country.save();
};
seedDB().then(() => {
  mongoose.connection.close();
});
