import React from "react";

const Legal = () => {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Legal</h1>
      <div className="space-y-4 text-sm">
        <h2 className="text-xl font-semibold mt-4">Terms and Conditions</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>You are at least 18 years of age or have parental consent.</li>
          <li>You agree not to misuse the platform or harm others.</li>
          <li>Your personal information will be handled according to our privacy policy.</li>
          <li>We reserve the right to suspend accounts violating our terms.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">Privacy Policy</h2>
        <p>
          We value your privacy and are committed to protecting your personal information.
          This section can be expanded to include full privacy practices.
        </p>

        <p className="text-xs text-gray-500 mt-8">Last updated: April 2025</p>
      </div>
    </div>
  );
};

export default Legal;