import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    console.log("Logging in with:", email, password);
    // TODO: Connect to backend authentication
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="container">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Login</h2>
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
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <button onClick={() => navigate("/signup")}>Sign up here</button></p>
      </div>
    </div>
  );
}

export default Login;