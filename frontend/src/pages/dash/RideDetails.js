// src/pages/dash/RideDetails.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../../components/ui/BackButton";

const RideDetails = () => {
  const { id } = useParams(); // Get the ride ID from the route
  const [ride, setRide] = useState(null);
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRide = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/rides/${id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setRide(res.data);
      } catch (err) {
        console.error("Error fetching ride details:", err);
      }
    };

    fetchRide();
  }, [id, token]);

  if (!ride) {
    return <p className="p-4">Loading ride details...</p>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow mt-6">
    <BackButton onClick={() => navigate(-1)} className="mb-4" />
      <h1 className="text-2xl font-bold mb-4">Ride Details</h1>
      <div className="space-y-2">
        <p><strong>Rider:</strong> John Doe </p> {/* Placeholder for rider name */}
        <p><strong>From:</strong> {ride.start_location}</p>
        <p><strong>To:</strong> {ride.end_location}</p>
        <p><strong>Departure:</strong> {new Date(ride.departure_time).toLocaleString()}</p>
        <p><strong>Status:</strong> {ride.accepted_by ? "Accepted" : "Pending"}</p>
      </div>
    </div>
  );
};

export default RideDetails;