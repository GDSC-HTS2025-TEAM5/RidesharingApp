import React, { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";
import { Button, Card, CardContent } from "../../components/ui";
import SearchBar from "../../components/ui/SearchBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const [date, setDate] = useState({ month: "", day: "", year: "" });
  const [time, setTime] = useState("");
  const [posted, setPosted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const allDateFieldsFilled = date.day && date.month && date.year;
    setIsFormValid(from && to && allDateFieldsFilled && time);
  }, [from, to, date, time]);  

  const postRideRequest = async () => {
    if (!isFormValid) return;
  
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to post a ride.");
      return;
    }
  
    const departureTime = `${date.year}-${date.month}-${date.day}T${time}:00`;
  
    try {
      await axios.post(
        "http://localhost:8000/api/rides/create/",
        {
          start_location: from,
          end_location: to,
          departure_time: departureTime,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setPosted(true);
      setTimeout(() => setPosted(false), 3000);
    } catch (error) {
      console.error("Failed to post ride:", error);
      alert("Failed to post ride. Please try again.");
    }
  };  

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4">
      <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto">
        {/* Search Inputs */}
        <div className="space-y-4">
          <SearchBar placeholder="Where from?" onPlaceSelected={setFrom} />
          <SearchBar placeholder="Where to?" onPlaceSelected={setTo} />
        </div>

        {/* Date Selector (Month / Day / Year) */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Date</label>
          <div className="grid grid-cols-3 gap-2">
            <select
              className="border p-2 rounded"
              value={date.month}
              onChange={(e) => setDate({ ...date, month: e.target.value })}
            >
              <option value="">Month</option>
              {[
                "01", "02", "03", "04", "05", "06",
                "07", "08", "09", "10", "11", "12"
              ].map((m, i) => (
                <option key={i} value={m}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
              ))}
            </select>

            <select
              className="border p-2 rounded"
              value={date.day}
              onChange={(e) => setDate({ ...date, day: e.target.value })}
            >
              <option value="">Day</option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i} value={String(i + 1).padStart(2, '0')}>{i + 1}</option>
              ))}
            </select>

            <select
              className="border p-2 rounded"
              value={date.year}
              onChange={(e) => setDate({ ...date, year: e.target.value })}
            >
              <option value="">Year</option>
              {[2025, 2026].map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>


        {/* Time Selector */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Button className="outline">Time</Button>
          <select
            className="border p-2 w-full rounded"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <option value="">Select</option>
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

        {/* Post Button */}
        <button
          disabled={!isFormValid}
          onClick={postRideRequest}
          className={`mt-4 w-full py-2 rounded font-semibold transition-all ${
            isFormValid
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Post Ride Request
        </button>

        {/* Confirmation */}
        {posted && (
          <p className="mt-4 text-green-700 text-center font-medium">
            ✅ Your ride request has been posted!
          </p>
        )}
      </div>
    </div>
  );
};

export default RiderDashboard;