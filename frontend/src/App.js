import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import RideDashBoard from "./pages/auth/RideDashBoard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/RideDashBoard" element={<RideDashBoard />} />
        <Route path="/" element={<Login />} /> {/* Default Route */}
      </Routes>
    </Router>
  );
}

export default App;
