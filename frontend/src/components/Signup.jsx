import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();

  const validEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validPassword = (value) => {
    const errors = [];
    if (value.length < 8) errors.push("At least 8 characters.");
    if (!/[A-Z]/.test(value)) errors.push("One uppercase letter.");
    if (!/[a-z]/.test(value)) errors.push("One lowercase letter.");
    if (!/[0-9]/.test(value)) errors.push("One number.");
    if (!/[!@#$%^&*(),.?\":{}|<>]/.test(value))
      errors.push("One special character.");
    setPasswordErrors(errors);
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    validPassword(pwd);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(validEmail(value));
  };

  const handleSendOtp = async () => {
    try {
      await axios.post("https://cinesphere-movie-ticket-booking-backend.onrender.com/verify-email/send-otp", {
        email,
      });
      alert("OTP sent to your email. | check your inbox/spam");
      setOtpSent(true);
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(
        "https://cinesphere-movie-ticket-booking-backend.onrender.com/verify-email/verify-otp",
        {
          email,
          otp,
        }
      );
      if (res.status === 200) {
        setOtpVerified(true);
        alert("OTP verified successfully");
      }
    } catch (err) {
      alert("Invalid or expired OTP.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerified)
      return alert("Please verify your email before signing up.");
    if (password !== rePassword) return setError("Passwords do not match.");

    try {
      await axios.post("https://cinesphere-movie-ticket-booking-backend.onrender.com/register", {
        name,
        email,
        password,
      });
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      if (err.response?.status === 400) alert("User already exists.");
      else alert("Registration failed.");
    }
  };

  const isRePasswordValid = password === rePassword;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black to-emerald-900 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md p-8 sm:p-10"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-emerald-800">
          Sign Up
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 placeholder-gray-600 font-medium"
          required
        />

        {/* Email + OTP Button */}
        <div className="flex gap-2 mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 placeholder-gray-600 font-medium"
            required
          />
          <button
            type="button"
            onClick={handleSendOtp}
            disabled={!isValid || otpVerified}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 rounded-lg transition disabled:opacity-50"
          >
            Send OTP
          </button>
        </div>

        {/* OTP Field */}
        {otpVerified ? (
          <p className="text-green-600 text-sm mb-4 font-semibold text-center">
            ✅ OTP Verified
          </p>
        ) : (
          otpSent && (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 placeholder-gray-600 font-medium"
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
              >
                Verify OTP
              </button>
            </div>
          )
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 placeholder-gray-600 font-medium"
          required
        />

        <input
          type="password"
          placeholder="Re-enter Password"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 placeholder-gray-600 font-medium"
          required
        />

        {/* Error Messages */}
        {passwordErrors.length > 0 && (
          <ul className="text-red-600 text-sm font-medium mb-4 list-disc pl-5">
            {passwordErrors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        )}

        {!isRePasswordValid && rePassword.length > 0 && (
          <p className="text-red-600 text-sm mb-4 font-medium">
            Passwords do not match.
          </p>
        )}

        <button
          type="submit"
          disabled={
            !isValid ||
            passwordErrors.length > 0 ||
            !isRePasswordValid ||
            !otpVerified
          }
          className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold transition disabled:opacity-50"
        >
          Sign Up
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-emerald-700 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
