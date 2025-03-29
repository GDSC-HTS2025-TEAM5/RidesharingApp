// src/pages/TermsAndConditions.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function TermsAndConditions() {
  const navigate = useNavigate();

  function handleAccept() {
    // You can store agreement status in localStorage, context, or backend
    localStorage.setItem('acceptedTerms', 'true');
    navigate('/dash/Home.js'); // Continue to RiderDashboard
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <div className="space-y-4 mb-6 text-sm">
        <p>Welcome to our ride-sharing app. By continuing to use this app, you agree to the following:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>You are at least 18 years of age or have parental consent.</li>
          <li>You agree not to misuse the platform or harm others.</li>
          <li>Your personal information will be handled according to our privacy policy.</li>
          <li>We reserve the right to suspend accounts violating our terms.</li>
          {/* Add more if needed */}
        </ul>
      </div>
      <button
        onClick={handleAccept}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        I Agree
      </button>
    </div>
  );
}

export default TermsAndConditions;
