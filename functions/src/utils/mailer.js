const nodemailer = require('nodemailer');
const { config } = require('../config/config');
const functions = require('firebase-functions');

const sendEmail = async function (mail) {
  functions.logger.info(`Sending email to ${mail.to}`);
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
  functions.logger.info(`Email sent to ${mail.to}`);
  return { message: 'Email sent' };
};

module.exports = { sendEmail };
