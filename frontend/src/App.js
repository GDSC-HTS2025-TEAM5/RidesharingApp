import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Preview Pages
import PreviewPage from "./pages/auth/PreviewPage";

// Authentication Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import TermsConditions from "./pages/auth/TermsConditions";
import StartupRedirect from "./pages/auth/StartupRedirect";

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
        <Route path="/" element={<StartupRedirect />}/>

        {/* Authentication routes */}
        <Route path="/auth/Login" element={<Login />} />
        <Route path="/auth/Signup" element={<Signup />} />
        <Route path="/auth/TermsConditions" element={<TermsConditions />} />
        <Route path="/auth/PreviewPage" element={<PreviewPage />} />

        {/* Dashboard routes */}

        <Route path="/dash/*" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="RiderDashboard" element={<RiderDashboard />} /> 
                    <Route path="DriverDashboard" element={<DriverDashboard />} /> 
                </Route>

        <Route path = "*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
