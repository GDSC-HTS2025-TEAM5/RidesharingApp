import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    console.log("Signing up with:", email, password);
    // TODO: Connect to backend registration
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="container">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="focus:ring-2 focus:ring-green-500"
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <button onClick={() => navigate("/login")}>Login here</button></p>
      </div>
    </div>
  );
}

export default Signup;