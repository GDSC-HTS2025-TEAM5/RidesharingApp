// src/pages/dash/DriverDashboard.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const DriverDashboard = () => {
  const [liveRequests, setLiveRequests] = useState([]);
  const [upcomingRides, setUpcomingRides] = useState([]);
  const [route, setRoute] = useState("Home to SFU");
  const [selectedRoute, setSelectedRoute] = useState("");
  const [routes, setRoutes] = useState(["Home to SFU", "BF's Home to SFU"]);
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  const fetchRides = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/rides/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      const rides = res.data;
      const accepted = rides.filter((ride) => ride.accepted_by);
      const pending = rides.filter((ride) => !ride.accepted_by);
      setUpcomingRides(accepted);
      setLiveRequests(pending);
    } catch (err) {
      console.error("Failed to load rides:", err);
    }
  };

  const acceptRide = async (rideId) => {
    try {
      await axios.post(
        `http://localhost:8000/api/rides/accept/${rideId}/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      fetchRides();
    } catch (err) {
      alert("Failed to accept ride");
      console.error(err);
    }
  };

  const rejectRequest = (id) => {
    const updated = liveRequests.filter((r) => r.id !== id);
    setLiveRequests(updated);
  };

  useEffect(() => {
    fetchRides();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto max-w-3xl">
        {/* Routes Section */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Route Selection</h2>
          <p className="mb-4">Current Route: <span className="font-bold">{route}</span></p>
          <div className="overflow-y-auto max-h-48 mb-4">
            {routes.map((r, index) => (
              <div
                key={index}
                onClick={() => setRoute(r)}
                className={`p-2 cursor-pointer mb-2 rounded-md ${
                  route === r ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {r}
              </div>
            ))}
          </div>

          {/* Add New Route */}
          <input
            type="text"
            placeholder="Add a new route"
            value={selectedRoute}
            onChange={(e) => setSelectedRoute(e.target.value)}
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          <button
            onClick={() => {
              if (selectedRoute) {
                setRoutes([...routes, selectedRoute]);
                setRoute(selectedRoute);
                setSelectedRoute("");
              }
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Route
          </button>
        </div>

        {/* Upcoming Rides */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Rides</h2>
          {upcomingRides.length > 0 ? (
            upcomingRides.map((ride) => (
              <div key={ride.id} className="border p-4 mb-3 rounded shadow-sm">
                <p><strong>{ride.user.first_name} {ride.user.last_name}</strong></p>
                <p>{ride.start_location} → {ride.end_location}</p>
                <p>{new Date(ride.departure_time).toLocaleString()}</p>
                <button
                  onClick={() => navigate(`/dash/DriverDashboard/RideDetails/${ride.id}`)}
                  className="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p>No upcoming rides</p>
          )}
        </div>

        {/* Live Requests */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Live Ride Requests</h2>
          {liveRequests.length > 0 ? (
            liveRequests.map((request) => (
              <div key={request.id} className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-semibold">{request.user.first_name} {request.user.last_name}</p>
                  <p>{request.start_location} → {request.end_location}</p>
                  <p>{new Date(request.departure_time).toLocaleString()}</p>
                </div>
                <div className="flex items-center">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => acceptRide(request.id)}
                  >
                    <FaCheckCircle className="inline mr-1" /> Accept
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => rejectRequest(request.id)}
                  >
                    <FaTimesCircle className="inline mr-1" /> Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No new ride requests</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;