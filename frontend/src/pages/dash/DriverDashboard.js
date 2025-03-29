import React, { useState, useEffect } from "react";
import { FaCar, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const DriverDashboard = () => {
  const [liveRequests, setLiveRequests] = useState([]);
  const [upcomingRides, setUpcomingRides] = useState([]);
  const [isAvailable, setIsAvailable] = useState(true);
  const [route, setRoute] = useState("Home to SFU");
  const [selectedRoute, setSelectedRoute] = useState("");
  const [routes, setRoutes] = useState(["Home to SFU", "BF's Home to SFU"]);
  const [rideTime, setRideTime] = useState("");
  const [rideFrequency, setRideFrequency] = useState("Once");
  const [isRiding, setIsRiding] = useState(false);

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem("rideRequests")) || [];
    setLiveRequests(storedRequests);
  }, []);

  const updateLocalStorage = (updatedRequests) => {
    localStorage.setItem("rideRequests", JSON.stringify(updatedRequests));
  };

  const acceptRequest = (id) => {
    const acceptedRide = liveRequests.find((r) => r.id === id);
    if (acceptedRide) {
      setUpcomingRides([...upcomingRides, { ...acceptedRide, time: acceptedRide.time || "1:00 PM" }]);
    }
    const updated = liveRequests.filter((r) => r.id !== id);
    setLiveRequests(updated);
    updateLocalStorage(updated);
    alert("Ride request accepted!");
  };

  const rejectRequest = (id) => {
    const updated = liveRequests.filter((r) => r.id !== id);
    setLiveRequests(updated);
    updateLocalStorage(updated);
    alert("Ride request rejected!");
  };

  const toggleAvailability = () => setIsAvailable(!isAvailable);
  const updateRoute = (newRoute) => setRoute(newRoute);
  const handleRouteChange = (e) => setSelectedRoute(e.target.value);
  const handleTimeChange = (e) => setRideTime(e.target.value);
  const handleFrequencyChange = (e) => setRideFrequency(e.target.value);
  const startEndRide = () => {
    setIsRiding(!isRiding);
    alert(isRiding ? "Ride has ended!" : "Ride has started!");
  };

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold text-center mb-8">Driver Dashboard</h1>

        {/* Route and Availability */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Route & Availability</h2>
          <p className="mb-4">Current Route: <span className="font-bold">{route}</span></p>
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

          {/* Add Route */}
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

          <div className="flex justify-center">
            <button
              className={`p-2 rounded-md flex items-center ${
                isAvailable ? "bg-green-500" : "bg-red-500"
              } text-white`}
              onClick={toggleAvailability}
            >
              <FaCar className="mr-2" /> {isAvailable ? "Go Offline" : "Go Online"}
            </button>
          </div>
        </div>

        {/* Ride Control */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Currently Riding?</h2>
          <div className="flex justify-center">
            <button
              className={`p-4 rounded-full ${isRiding ? "bg-red-500" : "bg-green-500"} text-white font-bold`}
              onClick={startEndRide}
            >
              {isRiding ? "End Ride" : "Start Ride"}
            </button>
          </div>
        </div>

        {/* Upcoming Rides */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Upcoming Rides</h2>
          {upcomingRides.map((ride) => (
            <div key={ride.id} className="mb-4">
              <p>
                <strong>{ride.time}</strong> - {ride.pickup} to {ride.dropoff}
              </p>
            </div>
          ))}
        </div>

        {/* Live Requests */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Live Ride Requests</h2>
          {liveRequests.length > 0 ? (
            liveRequests.map((request) => (
              <div key={request.id} className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-semibold">{request.name}</p>
                  <p>{request.pickup} to {request.dropoff}</p>
                  <p>{request.date}, {request.time}</p>
                  {request.selectedRide && (
                    <p className="text-sm text-gray-600">
                      Assigned Driver: <strong>{request.selectedRide.driver}</strong> ({request.selectedRide.car}) - ETA {request.selectedRide.eta}
                    </p>
                  )}
                </div>
                <div className="flex items-center">
                  <button
                    className="bg-green-500 text-white p-2 rounded-md flex items-center mr-2"
                    onClick={() => acceptRequest(request.id)}
                  >
                    <FaCheckCircle className="mr-2" /> Accept
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded-md flex items-center"
                    onClick={() => rejectRequest(request.id)}
                  >
                    <FaTimesCircle className="mr-2" /> Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No live requests at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
