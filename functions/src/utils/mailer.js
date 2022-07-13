const nodemailer = require('nodemailer');
const { config } = require('../config/config');

const sendEmail = async function (mail) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
      user: config.email,
      pass: config.passEmail,
    },
  });
  await transporter.sendMail(mail);
  return { message: 'Email sent' };
};

module.exports = { sendEmail };
