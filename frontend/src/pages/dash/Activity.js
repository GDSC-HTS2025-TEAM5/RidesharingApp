import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Activity = () => {
  const [rides, setRides] = useState([]);

  const fetchRides = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const res = await axios.get("http://localhost:8000/api/rides/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setRides(res.data);
    } catch (err) {
      console.error("Failed to fetch rides:", err);
    }
  };

  const cancelRide = async (rideId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You must be logged in to cancel a ride.");
      return;
    }

    try {
      await axios.delete(`http://localhost:8000/api/rides/cancel/${rideId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      toast.success("Ride cancelled successfully.");
      fetchRides(); // Refresh after deletion
    } catch (err) {
      console.error("Cancel ride error:", err);
      toast.alert("Failed to cancel ride.");
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  const upcomingRides = rides.filter(
    (ride) => new Date(ride.departure_time) > new Date()
  );

  const previousRides = rides.filter(
    (ride) => new Date(ride.departure_time) <= new Date()
  );

  const formatDate = (isoString) =>
    new Date(isoString).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const RideCard = ({ ride }) => (
    <div className="border border-gray-300 rounded-md p-4 mb-4 shadow">
      <p>
        <strong>{ride.start_location}</strong> → <strong>{ride.end_location}</strong>
      </p>
      <p>Departure: {formatDate(ride.departure_time)}</p>
      <p>Status: {ride.accepted_by ? "Accepted" : "Pending"}</p>
      {!ride.accepted_by && (
        <button
          onClick={() => cancelRide(ride.id)}
          className="text-red-500 border border-red-500 px-2 py-1 rounded mt-2 hover:bg-red-100"
        >
          Cancel Ride
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Your Ride Activity</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Outgoing Requests</h2>
          {upcomingRides.length > 0 ? (
            upcomingRides.map((ride) => <RideCard key={ride.id} ride={ride} />)
            //<p className="text-gray-500">No upcoming rides.</p>
          ) : (
            <p className="text-gray-500">No upcoming rides.</p>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Previous Rides</h2>
          {previousRides.length > 0 ? (
            previousRides.map((ride) => <RideCard key={ride.id} ride={ride} />)
          ) : (
            <p className="text-gray-500">No past rides.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Activity;