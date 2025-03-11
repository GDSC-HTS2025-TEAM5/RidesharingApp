import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaClock, FaHome, FaSchool } from "react-icons/fa";
import { Button, Input, Select, Card, CardContent } from "../../components/ui";
import SearchBar from "../../components/SearchBar";

const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minutes = 0; minutes < 60; minutes += 15) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinutes = minutes.toString().padStart(2, "0");
      times.push({
        value: `${formattedHour}:${formattedMinutes}`,
        label: `${formattedHour}:${formattedMinutes}`,
      });
    }
  }
  return times;
};


const RiderDashboard = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");



  return (
    <div className="bg-gray-100 p-6">
      <div className="container">
        {/* Search Inputs */}
        <SearchBar placeholder="Where from?" onPlaceSelected={setFrom} />
        <SearchBar placeholder="Where to?" onPlaceSelected={setTo} />

        {/* Date Selector */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Button className="outline">Date</Button>
          <select
            className="border p-2 w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
          </select>
        </div>

        {/* Time Selector */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Button className="outline">Time</Button>
          <select
            className="border p-2 w-full"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            {generateTimeOptions().map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Recently Visited */}
        <h2 className="text-lg font-semibold mb-2">Recently Visited:</h2>
        <Card className="mb-4">
          <CardContent className="flex items-center gap-2">
            <FaClock className="text-blue-500" />
            <span>Most recent location</span>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed-bottom-nav flex justify-between p-4 bg-white shadow-md">
        <Button className="!w-20 !h-20 !bg-blue-400 !text-white">Home</Button>
        <Button className="!w-20 !h-20 !bg-yellow-400 !text-black">Activity</Button>
        <Button className="!w-20 !h-20 !bg-blue-400 !text-white">Chat</Button>
        <Button
          className="!w-20 !h-20 !bg-blue-400 !text-white"
          onClick={() => navigate("/dash/DriverDashboard")}
        >
          Driver
        </Button>
        <Button className="!w-20 !h-20 !bg-orange-400 !text-black">Account</Button>
      </div>
    </div>
  );
};

export default RiderDashboard;
