if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const moment = require("moment");
const path = require("path");

// <<ejs-mate>> is layout, partial and block template functions for the EJS template engine.
const ejsMate = require("ejs-mate");
// <<method-override>> Lets you use HTTP verbs such as PUT or DELETE in places
// where the client doesn't support it.
const methodOverride = require("method-override");
// <<moment>> A JavaScript date library for parsing, validating, manipulating, and formatting dates.
// const moment = require("moment");
// <<express-session>> An HTTP server-side framework used to create and manage a session middleware.
const session = require("express-session");
// The flash is a special area of the session used for storing messages
const flash = require("connect-flash");
// Passport is the authentication library .
// Passport is Express-compatible authentication middleware for Node.js
const passport = require("passport");
// Passport uses the concept of strategies to authenticate requests
// passport-local is an authentication strategy.
const LocalStrategy = require("passport-local");
// <<connect-mongo>> MongoDB session store for Connect and Express written in Typescript.
// const MongoDBStore = require("connect-mongo");
// <<express-mongo-sanitize>> protect ourselves against this malicious attack,
// middleware which sanitizes user-supplied data to prevent MongoDB Operator Injection attack.
const mongoSanitize = require("express-mongo-sanitize");
// <<cors>> CORS is a node.js package for providing a
// Connect/Express middleware that can be used to enable CORS
const cors = require("cors");
const cookieParser = require("cookie-parser");
const schedule = require("node-schedule");
const Packs = require("./models/pack");
const userRoutes = require("./routes/user");
const announcementRoutes = require("./routes/announcement");
const packRoutes = require("./routes/pack");
const caseRoutes = require("./routes/case");
const caseOperRoutes = require("./routes/caseOperation");
const profitsRoutes = require("./routes/profits");
const courierRoutes = require("./routes/courier");
const withdrawRoutes = require("./routes/withdraw");
const User = require("./models/user");

const Announcement = require("./models/announcement");
const Case = require("./models/case");
const ExpressError = require("./utils/ExpressError");
const DBConnection = require("./database/connection");
const { errorPage } = require("./middleware/middleware");
const { sessionConfig } = require("./config/sessionConfig");

const { locals } = require("./config/local");
const app = express();
//const helmet = require("helmet");

// =========================== App Configuration =========================
app.set("trust proxy", true);
app.disable("x-powered-by");

//app.use(helmet());
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
// in order to get the data from a request we need to use this express.json()
app.use(express.json());
app.use(methodOverride("_method"));
// This is a built-in middleware function in Express. It serves static files
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(mongoSanitize({ replaceWith: "_" }));
app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "local",
  new LocalStrategy((email, password, done) => {
    console.log("Welcome");
    User.findOne({ email: email.toLowerCase() }).then((user, err) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(
          null,
          false,
          "يرجي التأكد من البريد الالكتروني او كلمة السر"
        );
      } else {
        if (user.approved) {
          console.log("id:", user.id);
          console.log("firstname:", user.firstname);
          console.log("email:", user.email);
          return done(null, user);
        } else {
          return done(null, false, "تم تعطيل حسابك يرجى الاتصال بالادمين");
        }
      }
    });
  })
);
// serialization refers to how to store user's
// authentication user data will be stored in the session
passport.serializeUser((user, done) => {
  passport.serializeUser(User.serializeUser());
  done(null, user);
});

// deserialization refers to how remove user's authentication data
passport.deserializeUser((user, done) => {
  passport.deserializeUser(User.deserializeUser());
  done(null, user);
});
app.use(locals);
app.use(cors());
app.use("/case", caseRoutes);
app.use("/case/:id/operation/", caseOperRoutes);
app.use("/announcement", announcementRoutes);
app.use("/pack", packRoutes);
app.use("/withdraw", withdrawRoutes);
app.use("/profits", profitsRoutes);
app.use("/user", userRoutes);
app.use("/courier", courierRoutes);

// app.use("/user/:id/transaction", userRoutes);
// === Home Page ===
app.get("/", async (req, res) => {
  const packs = await Packs.find({});
  res.render("home/home", { packs });
});
app.get("/about", async (req, res) => {
  res.render("about/about");
});
app.get("/test", async (req, res) => {
  const cases = await Case.find({}).then(function (documents) {
    for (document of documents) {
      if (
        document.restDays == 0 &&
        document.state == "نشطة" &&
        document.pastDays > 0
      ) {
        document.state = "قيد الإنتظار";
        document.save();
      }
    }
  });
  const result = await Case.find({});
  res.send(result);
});
// app.all("*", (req, res, next) => {
//   next(new ExpressError("page not found", 404));
// });
// app.use(errorPage);
// the PORT variable is in .env file but it won't be added to the deployed site
const port = process.env.PORT || 8888;

app.listen(port, () => {
  console.log("===================================================");
  console.log(`   ----- SERVER IS RUNNING ON PORT ${port} ----`);
  console.log("===================================================");
  const job = schedule.scheduleJob("0 0 0 * * *", async function () {
    console.log("Check user cases state !!!");
    const cases = await Case.find({}).then(function (documents) {
      for (document of documents) {
        if (
          document.restDays == 0 &&
          document.state == "نشطة" &&
          document.pastDays > 0
        ) {
          document.state = "قيد الإنتظار";
          document.save();
        }
      }
    });
  });
});
