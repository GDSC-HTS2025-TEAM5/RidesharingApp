import React, { useState } from "react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");

  const handleSave = () => {
    const settings = { darkMode, notifications, language };
    localStorage.setItem("userSettings", JSON.stringify(settings));
    alert("Settings saved!");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6 space-y-6">
        <h2 className="text-2xl font-semibold">App Settings</h2>

        {/* Toggles */}
        <div className="flex items-center justify-between">
          <label>Dark Mode</label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </div>

        <div className="flex items-center justify-between">
          <label>Notifications</label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
        </div>

        {/* Language Dropdown */}
        <div>
          <label className="block mb-1">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option>English</option>
            <option>French</option>
            <option>Spanish</option>
          </select>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;