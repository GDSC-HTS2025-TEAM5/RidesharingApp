import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import default_pfp from "../../images/default_pfp.png";

const Account = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    rating: 4.9,
    profileImage: default_pfp,
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/auth/Login");
      return;
    }

    fetch("http://localhost:8000/api/accounts/u/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser((prev) => ({
          ...prev,
          firstName: data.first_name || "",
          lastName: data.last_name || "",
        }));
      })
      .catch((err) => {
        console.error("Failed to fetch user data:", err);
      });
  }, [navigate]);

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
              John Doe
            </h2>
            <p className="text-gray-700 flex items-center mt-1">
              <FaStar className="text-yellow-500 mr-1" />
              {user.rating} User Rating
            </p>
          </div>
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-16 h-16 rounded-full border-2 border-white shadow-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {tiles.map((tile, idx) => (
            <button
              key={idx}
              onClick={() => navigate(tile.path)}
              className="bg-blue-200 text-blue-800 py-3 px-4 rounded-lg shadow hover:bg-blue-300 transition-all"
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