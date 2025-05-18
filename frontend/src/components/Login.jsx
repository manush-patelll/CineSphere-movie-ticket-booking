import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
    console.log("Login form submitted");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black to-emerald-900 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md p-8 sm:p-10"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-emerald-800">
          Login
        </h2>

        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 placeholder-gray-600 font-medium"
          required
        />

        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 placeholder-gray-600 font-medium"
          required
        />

        <button
          type="submit"
          className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold transition duration-300"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="text-emerald-700 font-semibold hover:underline"
          >
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
