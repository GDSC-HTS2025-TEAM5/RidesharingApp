import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaClock } from "react-icons/fa";
import { Button, Card, CardContent } from "../../components/ui";
import SearchBar from "../../components/ui/SearchBar";

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
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedRide, setSelectedRide] = useState(null);
  const navigate = useNavigate();

  const isSearchReady = from && to && date && time;

  const rideOptions = [
    { id: 1, driver: "Driver A", car: "Toyota Prius", eta: "10 min" },
    { id: 2, driver: "Driver B", car: "Honda Civic", eta: "15 min" },
  ];

  const confirmRide = () => {
    const newRequest = {
      id: Date.now(),
      name: "Rider",
      pickup: from,
      dropoff: to,
      date,
      time,
      selectedRide,
    };

    const existingRequests = JSON.parse(localStorage.getItem("rideRequests")) || [];
    existingRequests.push(newRequest);
    localStorage.setItem("rideRequests", JSON.stringify(existingRequests));

    alert("Ride request sent!");
  };

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <div className="container mx-auto max-w-3xl">
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
            <option value="">Select</option>
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

        {/* Map & Driver Options */}
        {isSearchReady && (
          <div className="mt-6">
            {/* Google Map */}
            <div className="h-64 w-full mb-4">
              <iframe
                title="Map"
                className="w-full h-full rounded"
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.REACT_APP_GOOGLE_API_KEY}&origin=${encodeURIComponent(
                  from
                )}&destination=${encodeURIComponent(to)}&mode=driving`}
              />
            </div>

            <h3 className="text-lg font-semibold mb-2">Available Rides</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rideOptions.map((ride) => (
                <Card
                  key={ride.id}
                  className={`cursor-pointer ${
                    selectedRide?.id === ride.id ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setSelectedRide(ride)}
                >
                  <CardContent>
                    <p className="font-medium">{ride.driver}</p>
                    <p>{ride.car} - ETA: {ride.eta}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              className="bg-green-600 text-white mt-4"
              disabled={!selectedRide}
              onClick={confirmRide}
            >
              Confirm Ride with {selectedRide?.driver || "Driver"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiderDashboard;

