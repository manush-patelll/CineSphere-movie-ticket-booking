const sgMail = require('@sendgrid/mail');

if (!process.env.SENDGRID_API_KEY) {
  console.error('SENDGRID_API_KEY is not set!');
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(to, subject, text) {
  const msg = {
    to,
    from: process.env.FROM_EMAIL, // this must be a verified sender in SendGrid
    subject,
    text,
  };

  try {
    const [res] = await sgMail.send(msg);
    console.log('SendGrid API response status:', res.statusCode);
    return res;
  } catch (err) {
    console.error('SendGrid send error:', err);
    if (err.response && err.response.body) {
      console.error('SendGrid error body:', err.response.body);
    }
    throw err;
  }
}

module.exports = sendEmail;


