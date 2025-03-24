import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Preview Pages
import PreviewPage from "./pages/preview/PreviewPage";

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
  const [isFirstOpen, setIsFirstOpen] = useState(true);
  const [isTestMode] = useState(true);
  console.log("App components loaded");

  useEffect(() => {
    // Check if first-time user based on flag in localStorage
    const firstOpen = !localStorage.getItem("isFirstOpen");
    setIsFirstOpen(firstOpen);

    console.log("First Open:", firstOpen);
    console.log("Test Mode:", isTestMode);

    if (firstOpen) {
      localStorage.setItem("isFirstOpen", "true");
    }
  }, [isTestMode]);

  return (
    <Router> {/* Router should wrap the entire app */}
      <Routes>
        {/* Conditional page open based on first-open */}
        <Route 
          path="/preview/PreviewPage" 
          element={isTestMode || isFirstOpen ? <Login /> : <Navigate to="/auth/PreviewPage" />} 
        />
        <Route path="/preview/*" element={<PreviewPage onNext={() => setIsFirstOpen(false)} />} />

        {/* Default route */}
        <Route path="/" element={<Navigate to={isFirstOpen ? "/preview/PreviewPage" : "/auth/Login"} />} />

        {/* Authentication routes */}
        <Route path="/auth/Login" element={<Login />} />
        <Route path="/auth/Signup" element={<Signup />} />
        <Route path="/auth/TermsConditions" element={<TermsConditions />} />

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
