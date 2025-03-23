import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Authentication Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import TermsConditions from "./pages/auth/TermsConditions";

// Dashboard Pages
import RideDashBoard from "./pages/dash/RiderDashboard";
import DriverDashboard from "./pages/dash/DriverDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/Login" element={<Login />} />
        <Route path="/auth/Signup" element={<Signup />} />
        <Route path="/auth/TermsConditions" element={<TermsConditions />} />
        <Route path="/dash/RiderDashboard" element={<RideDashBoard />} />
        <Route path="/dash/DriverDashboard" element={<DriverDashboard/>}/>
        <Route path="/" element={<Login />} /> {/* Default Route */}
      </Routes>
    </Router>
  );
}

export default App;
