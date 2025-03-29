import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

// Preview Pages
import PreviewPage from "./pages/auth/PreviewPage";

// Authentication Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import TermsConditions from "./pages/auth/TermsConditions";

// Dashboard Pages
import DriverDashboard from "./pages/dash/DriverDashboard";
import Home from "./pages/dash/Home";
import Layout from "./pages/dash/Layout";
import RiderDashboard from "./pages/dash/RiderDashboard";

function App() {
  return (
    <Router> {/* Router should wrap the entire app */}
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to={isFirstOpen ? "/preview/PreviewPage" : "/auth/Login"} />} />

        {/* Authentication routes */}
        <Route path="/auth/Login" element={<Login />} />
        <Route path="/auth/Signup" element={<Signup />} />
        <Route path="/auth/TermsConditions" element={<TermsConditions />} />
        <Route path="/auth/PreviewPage" element={<PreviewPage />} />

        {/* Dashboard routes */}
        <Route path="/dash/Home" element={<Home />} />
        <Route path="/dash/Layout" element={<Layout />} />
        <Route path="/dash/RiderDashboard" element={<RiderDashboard />} />
        <Route path="/dash/DriverDashboard" element={<DriverDashboard />} />

        <Route path="/dash/*" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="RiderDashboard" element={<RiderDashboard />} /> 
                    <Route path="DriverDashboard" element={<DriverDashboard />} /> 
                </Route>

      </Routes>
    </Router>
  );
}

export default App;
