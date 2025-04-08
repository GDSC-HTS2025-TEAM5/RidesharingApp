// src/pages/auth/Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirm || !firstName || !lastName) {
      alert("Please fill out all fields.");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/accounts/register/", {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      });

      alert("Signup successful! Please log in.");
      navigate("/auth/Login");
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      alert("Signup failed. That email may already be in use.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="container max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/auth/Login")}
            className="text-green-600 font-semibold hover:underline"
          >
            Log in here
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;