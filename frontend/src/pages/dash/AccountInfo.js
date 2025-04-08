import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/ui/BackButton";

const AccountInfo = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const profile = { firstName, lastName, gender, phone, profileImage };
    localStorage.setItem("userProfile", JSON.stringify(profile));
    alert("Profile saved!");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <BackButton />
      <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Account Info</h2>

        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <div>
          <label className="block mb-1 font-medium">Profile Picture</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {profileImage && (
            <img
              src={profileImage}
              alt="Preview"
              className="w-24 h-24 rounded mt-2 object-cover"
            />
          )}
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AccountInfo;