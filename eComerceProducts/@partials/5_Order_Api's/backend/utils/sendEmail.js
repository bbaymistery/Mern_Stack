const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  var transporter = nodeMailer.createTransport({
    name: "smtp.gmail.com",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "elikoelgun1995@gmail.com",
      pass: "ggbaehymubgblqkc",
    },
    tls: { rejectUnauthorized: false },
  });
  // var transporter = nodeMailer.createTransport({
  //   name: process.env.SMPT_NAME,
  //   host: process.env.SMPT_HOST,
  //   port: process.env.SMPT_PORT,
  //   secure: true,
  //   auth: {
  //     user: process.env.SMPT_MAIL,
  //     pass: process.env.SMPT_PASSWORD,
  //   },
  //   tls: { rejectUnauthorized: false },
  // });
  const mailOptions = {
    from: '"Ecommerce project👻" elikoelgun1995@gmail.com',
    to: options.email,
    subject: options.subject,
    text: `${options.message}`,
  };
  await transporter.sendMail(mailOptions, (err, data) => {
    if (err) return console.log(err);
    else console.log("Mail gonderildi", data);
  });
};

module.exports = sendEmail;
