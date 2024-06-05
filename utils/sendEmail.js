// Import nodemailer
const nodemailer = require("nodemailer");

// Create a reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});
module.exports.sendMail = (email, token) => {
  // send mail with defined transport object
  transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Password Reset",
    text:
      "الرجاء الضغط على الرابط لتغيير كلمة المرور: http://192.168.1.85:8888/user/reset-password/" +
      token,
  });
};
