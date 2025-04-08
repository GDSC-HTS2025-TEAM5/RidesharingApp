import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCar, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const DriverDashboard = () => {
  const [liveRequests, setLiveRequests] = useState([]);
  const [upcomingRides, setUpcomingRides] = useState([]);
  const [route, setRoute] = useState("Home to SFU");
  const [selectedRoute, setSelectedRoute] = useState("");
  const [routes, setRoutes] = useState(["Home to SFU", "BF's Home to SFU"]);
  const [isRiding, setIsRiding] = useState(false);

  useEffect(() => {
    fetchLiveRequests();
  }, []);

  const fetchLiveRequests = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get("http://localhost:8000/api/rides/", {
        headers: { Authorization: `Token ${token}` },
      });
      const unaccepted = res.data.filter((ride) => !ride.accepted_by);
      setLiveRequests(unaccepted);
    } catch (err) {
      console.error("Failed to fetch ride requests:", err);
    }
  };

  const acceptRequest = async (rideId) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `http://localhost:8000/api/rides/accept/${rideId}/`,
        {},
        { headers: { Authorization: `Token ${token}` } }
      );

      const acceptedRide = liveRequests.find((r) => r.id === rideId);
      if (acceptedRide) {
        setUpcomingRides((prev) => [...prev, acceptedRide]);
        setLiveRequests((prev) => prev.filter((r) => r.id !== rideId));
        alert("Ride request accepted!");
      }
    } catch (err) {
      console.error("Error accepting ride:", err);
      alert("Could not accept ride.");
    }
  };

  const rejectRequest = (id) => {
    setLiveRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const updateRoute = (newRoute) => setRoute(newRoute);
  const handleRouteChange = (e) => setSelectedRoute(e.target.value);
  const startEndRide = () => {
    setIsRiding(!isRiding);
    alert(isRiding ? "Ride has ended!" : "Ride has started!");
  };

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <div className="container mx-auto max-w-3xl">
        {/* Route Selection */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Route & Availability</h2>
          <p className="mb-4">
            Current Route: <span className="font-bold">{route}</span>
          </p>
          <div className="overflow-y-auto max-h-48 mb-4">
            {routes.map((r, index) => (
              <div
                key={index}
                onClick={() => updateRoute(r)}
                className={`p-2 cursor-pointer mb-2 rounded-md ${
                  route === r ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {r}
              </div>
            ))}
          </div>
          <div className="flex flex-col mb-4">
            <p className="mb-2 font-semibold">Add New Route:</p>
            <input
              type="text"
              placeholder="Enter new start location"
              className="p-2 border border-gray-300 rounded-md mb-4"
              onChange={(e) => setSelectedRoute(e.target.value)}
              value={selectedRoute}
            />
            <button
              className="bg-blue-500 text-white p-2 rounded-md"
              onClick={() => {
                if (selectedRoute) {
                  setRoutes([...routes, selectedRoute]);
                  updateRoute(selectedRoute);
                }
              }}
            >
              Add Route
            </button>
          </div>
        </div>

        {/* Ride Control */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Currently Riding?</h2>
          <div className="flex justify-center">
            <button
              className={`p-4 rounded-full ${
                isRiding ? "bg-red-500" : "bg-green-500"
              } text-white font-bold`}
              onClick={startEndRide}
            >
              {isRiding ? "End Ride" : "Start Ride"}
            </button>
          </div>
        </div>

        {/* Upcoming Rides */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Upcoming Rides</h2>
          {upcomingRides.length === 0 ? (
            <p>No upcoming rides.</p>
          ) : (
            upcomingRides.map((ride) => (
              <div key={ride.id} className="mb-4">
                <p>
                  <strong>
                    {new Date(ride.departure_time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </strong>{" "}
                  - {ride.start_location} to {ride.end_location}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Live Requests */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Live Ride Requests</h2>
          {liveRequests.length === 0 ? (
            <p>No live requests at the moment.</p>
          ) : (
            liveRequests.map((ride) => (
              <div
                key={ride.id}
                className="flex justify-between items-center mb-4"
              >
                <div>
                  <p className="font-semibold">
                    {ride.user_first_name} {ride.user_last_name}
                  </p>
                  <p>
                    {ride.start_location} to {ride.end_location}
                  </p>
                  <p>
                    {new Date(ride.departure_time).toLocaleString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                    className="bg-green-500 text-white p-2 rounded-md flex items-center mr-2"
                    onClick={() => acceptRequest(ride.id)}
                  >
                    <FaCheckCircle className="mr-2" /> Accept
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded-md flex items-center"
                    onClick={() => rejectRequest(ride.id)}
                  >
                    <FaTimesCircle className="mr-2" /> Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;