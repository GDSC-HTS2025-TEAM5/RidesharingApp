import React from "react";

const RideCard = ({ date, time, driverName, vehicleModel }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <p className="text-sm text-gray-500 mb-2">
        <strong>{date}</strong>, <span>{time}</span>
      </p>
      <p className="mb-1">
        <strong>Driver Name:</strong> {driverName}
      </p>
      <p>
        <strong>Vehicle:</strong> {vehicleModel}
      </p>
    </div>
  );
};

export default RideCard;