import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Preview Pages
import PreviewPage from "./pages/auth/PreviewPage";

// Authentication Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import TermsConditions from "./pages/auth/TermsConditions";
import StartupRedirect from "./pages/auth/StartupRedirect";

// Dashboard Pages
import DriverDashboard from "./pages/dash/DriverDashboard";
import RideDetails from "./pages/dash/RideDetails";
import Layout from "./pages/dash/Layout";
import RiderDashboard from "./pages/dash/RiderDashboard";
import Activity from "./pages/dash/Activity";
import Account from "./pages/dash/Account";

// Account subpages
import AccountInfo from "./pages/dash/AccountInfo";
import Wallet from "./pages/dash/Wallet";
import Settings from "./pages/dash/Settings";
import Support from "./pages/dash/Support";
import Legal from "./pages/dash/Legal";

function App() {
  return (
    <Router>
      {/* Toast container added globally */}
      <ToastContainer position="top-center" autoClose={3000} />

      <Routes>
        <Route path="/" element={<StartupRedirect />} />

        {/* Authentication routes */}
        <Route path="/auth/Login" element={<Login />} />
        <Route path="/auth/Signup" element={<Signup />} />
        <Route path="/auth/TermsConditions" element={<TermsConditions />} />
        <Route path="/auth/PreviewPage" element={<PreviewPage />} />

        {/* Dashboard routes */}
        <Route path="/dash/*" element={<Layout />}>
          <Route path="RiderDashboard" element={<RiderDashboard />} />
          <Route path="DriverDashboard" element={<DriverDashboard />} />
          <Route path="DriverDashboard/RideDetails/:id" element={<RideDetails />} />
          <Route path="Activity" element={<Activity />} />
          <Route path="Account" element={<Account />} />
          <Route path="Account/Info" element={<AccountInfo />} />
          <Route path="Account/Wallet" element={<Wallet />} />
          <Route path="Account/Settings" element={<Settings />} />
          <Route path="Account/Support" element={<Support />} />
          <Route path="Account/Legal" element={<Legal />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;