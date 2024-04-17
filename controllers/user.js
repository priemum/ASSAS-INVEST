const User = require("../models/user");
const Country = require("../models/country");
const moment = require("moment");
// ======================== showLoginForm ==========================
module.exports.showUserForm = async (req, res) => {
  const user = await User.findById(req.params.id);
  // console.log(user)
  res.render("user/editProfile", { user });
};
// ================== showLoginForm =============================
module.exports.showLoginForm = async (req, res) => {
  res.render("user/login");
};
// ================== showUsers =============================
module.exports.showUsers = async (req, res) => {
  const users = await User.find({});
  res.render("user/index", { users,moment });
};
// ================== showRegisterForm ============================
module.exports.showRegisterForm = async (req, res) => {
  const algeria = await Country.find({});
  const states = algeria[0].states;
  res.render("user/register", { states, moment });
};
//
// ==================== Register ==============================
module.exports.register = async (req, res) => {
  try {
    const {
      email,
      password,
      firstname,
      lastname,
      birthdate,
      phone,
      gender,
      adress,
      role,
    } = req.body.user;

    const user = new User({
      email: email.toLowerCase(),
      password: password,
      firstname: firstname.toLowerCase(),
      lastname: lastname.toLowerCase(),
      birthdate: birthdate,
      phone: phone,
      gender: gender,
      adress: adress.toLowerCase(),
      role: role,
    });
    User.register(user, password, function (err, user) {
      if (err) {
        console.error(err);
        res.redirect("register");
      } else {
        req.flash("success", "تم الإضافة بنجاح");
        res.redirect("/user");
      }
    });
    [];
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("register");
  }
};

// ================s==== Login ==============================
module.exports.login = async (req, res) => {

  req.flash("success", `مرحبا بك ${req.user.firstname}`);
  // update the recently logged in user
  await User.findByIdAndUpdate({ _id: req.user.id }, { loggedIn: moment() });
  const redirectUrl = req.session.returnTo || "/";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};
// ======================= Logout ==============
module.exports.logout = (req, res) => {
  // logout requere a callback function and a get request to work
  req.logout(() => {
    req.flash("success", `نراك قريبا`);
    res.redirect("login");
  });
};
// =============== updateUser ==============================
module.exports.updateUser = async (req, res) => {
  const { user } = req.body;
  const id = req.query.id;

  // res.send(id)
  const updatedUser =  await User.findByIdAndUpdate(id, { ...user }, { new: true });
  req.flash("success", "تم التعديل بنجاح");
  res.redirect("back");
};
// =============== deleteUser ==============================
module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  req.flash("success", "تم الحذف بنجاح");
  res.redirect("/user");
};
// =============== showProfile ==============================
module.exports.showProfile = async (req, res) => {
  // res.send("good")
  const user = await User.findById(req.params.id);
  res.render("user/profile", { user, moment, fonctions: fonctions.fonction });
};
