const nodemailer = require('nodemailer');

const createTransporter = () => nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // or app password
  },
  logger: true,
  debug: true,
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

const sleep = (ms) => new Promise(res => setTimeout(res, ms));

const sendEmail = async (to, subject, text) => {
  const transporter = createTransporter();

  // verify early to fail fast
  try {
    await transporter.verify();
  } catch (err) {
    console.error('SMTP verify failed:', err);
    throw err;
  }

  const mailOptions = {
    from: `CeneSphere <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  };

  // simple retry
  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);
      return info;
    } catch (err) {
      console.error(`sendMail attempt ${attempt} failed:`, err && err.code ? err.code : err);
      if (attempt < maxAttempts) {
        const backoff = 500 * Math.pow(2, attempt); // 1s, 2s, 4s
        await sleep(backoff);
      } else {
        throw err;
      }
    }
  }
};

module.exports = sendEmail;

