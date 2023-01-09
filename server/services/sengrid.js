const dotenv = require('dotenv');
dotenv.config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({ subject, text, htmlMsg, userEmail }) => {
  const msg = {
    to: userEmail, // Change to your recipient
    from: process.env.EMAIL_FROM_SEND, // Change to your verified sender
    subject: subject,
    text: text,
    html: htmlMsg,
  };
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.log('Send Email Error', error);
  }
};

module.exports = { sendEmail };
