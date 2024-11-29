const nodemailer = require('nodemailer');
require('dotenv').config();


const sendEmail = async ({ to, subject, text }) => {
  // console.log(to, subject, text)
  // console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS)
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER, // your email here
      pass: process.env.EMAIL_PASS  // your email password
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  };

  await transporter.sendMail(mailOptions);

  return;
};

module.exports = sendEmail;
