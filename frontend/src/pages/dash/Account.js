// src/pages/dash/Account.js
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "User",
    lastName: "",
    rating: 4.9,
    profileImage: "https://via.placeholder.com/100",
  });

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (storedProfile) {
      setUser((prev) => ({
        ...prev,
        firstName: storedProfile.firstName || prev.firstName,
        lastName: storedProfile.lastName || prev.lastName,
        profileImage: storedProfile.profileImage || prev.profileImage,
      }));
    }
  }, []);

  const tiles = [
    { label: "Account Info", path: "/dash/Account/Info" },
    { label: "Wallet", path: "/dash/Account/Wallet" },
    { label: "App Settings", path: "/dash/Account/Settings" },
    { label: "Support", path: "/dash/Account/Support" },
    { label: "Legal", path: "/dash/Account/Legal" },
    { label: "Logout", path: "/auth/Login" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen px-4 py-6">
      <div className="max-w-md mx-auto bg-purple-100 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold">
              {user.firstName} {user.lastName}
            </h2>
            <p className="flex items-center text-yellow-600">
              <FaStar className="mr-1" /> {user.rating} rating
            </p>
          </div>
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-20 h-20 rounded-lg object-cover"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {tiles.map((tile) => (
            <button
              key={tile.label}
              onClick={() => navigate(tile.path)}
              className="bg-white hover:bg-gray-100 text-black p-4 rounded-xl shadow-md transition-all text-center font-medium"
            >
              {tile.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Account;