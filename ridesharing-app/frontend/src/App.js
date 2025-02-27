import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import "./App.css";

const Home = () => (
  <div className="App">
    <header className="App-header">
      <p>Welcome to the Ridesharing App!</p>
      <a href="/login">Go to Login</a>
    </header>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}


export default App;
