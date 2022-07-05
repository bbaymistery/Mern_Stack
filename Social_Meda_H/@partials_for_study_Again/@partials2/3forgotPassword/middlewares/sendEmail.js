const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  //mailtrap.io sitesindeki ornek
  var transporter = nodeMailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "1734404e87f3f1",
      pass: "9cc5a15b49f824",
    },
  });

  /*
  options !
  {
        email: user.email,
        subject: "Reset Password",
        message,
      }
  */
  const mailOptions = {
    from: "talantForSuccess@gmail.com",
    to: options.email,
    subject: options.subject,
    text: `${options.message} `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
