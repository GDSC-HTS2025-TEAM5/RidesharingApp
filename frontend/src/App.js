import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Authentication Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import DriverDashboard from "./pages/dash/DriverDashboard";
import Home from "./pages/dash/Home";
import Layout from "./pages/dash/Layout";
import RiderDashboard from "./pages/dash/RiderDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/Login" element={<Login />} />
        <Route path="/auth/Signup" element={<Signup />} />
        <Route path="/auth/TermsConditions" element={<TermsConditions />} />
        <Route path="/dash/RiderDashboard" element={<RideDashBoard />} />
        <Route path="/dash/DriverDashboard" element={<DriverDashboard/>}/>
        <Route path="/dash/*" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="RiderDashboard" element={<RiderDashboard />} /> 
                    <Route path="DriverDashboard" element={<DriverDashboard />} /> 
                </Route>
        <Route path="/" element={<Login />} /> {/* Default Route */}
      </Routes>
    </Router>
  );
}

export default App;
