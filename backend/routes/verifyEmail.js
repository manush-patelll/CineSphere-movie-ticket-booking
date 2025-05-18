const express = require('express');
const verifyEmailRouter = express.Router();
const sendEmail = require('../controller/sentVerificationEmail');

let otpStore = {}; // In-memory store (use DB in production)

// Send OTP
verifyEmailRouter.post('/send-otp', async (req, res) => {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // 5 mins expiry

    try {
        await sendEmail(email, 'Your OTP for Email Verification', `Your OTP is: ${otp}`);
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to send OTP' });
    }
});

// Verify OTP
verifyEmailRouter.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;

    const record = otpStore[email];
    if (!record) return res.status(400).json({ message: 'No OTP found. Please request again.' });

    if (Date.now() > record.expiresAt)
        return res.status(400).json({ message: 'OTP expired. Please request again.' });

    if (record.otp != otp)
        return res.status(400).json({ message: 'Invalid OTP' });

    // TODO: Mark user as verified in DB
    delete otpStore[email];

    res.status(200).json({ message: 'Email verified successfully' });
});

module.exports = verifyEmailRouter;
