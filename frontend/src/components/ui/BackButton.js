// src/components/ui/BackButton.js
import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="mb-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
    >
      ← Back
    </button>
  );
};

export default BackButton;