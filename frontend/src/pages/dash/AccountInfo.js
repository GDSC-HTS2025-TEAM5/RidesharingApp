import React, { useEffect, useState } from "react";
import axios from "axios";
import BackButton from "../../components/ui/BackButton";
import { useNavigate } from "react-router-dom";

const AccountInfo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:8000/api/accounts/profile/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setFormData(response.data);
      } catch (err) {
        console.error("Failed to fetch user profile", err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("authToken");
    try {
      await axios.put("http://localhost:8000/api/accounts/profile/", formData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update error", err);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <BackButton />
      <h2 className="text-2xl font-semibold mb-4">Edit Account Info</h2>

      <label className="block mb-2">First Name</label>
      <input
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block mb-2">Last Name</label>
      <input
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block mb-2">Phone Number</label>
      <input
        name="phone_number"
        value={formData.phone_number}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block mb-2">Email (read-only)</label>
      <input
        name="email"
        value={formData.email}
        readOnly
        className="w-full p-2 border rounded bg-gray-100 text-gray-600"
      />

      <button
        onClick={handleSave}
        className="mt-4 bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
      >
        Save Changes
      </button>
    </div>
  );
};

export default AccountInfo;