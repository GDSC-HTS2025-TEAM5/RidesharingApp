import React from "react";
import RideCard from "../../components/ui/RideCard";

const Activity = () => {
  // Dummy ride data
  const upcomingRides = [
    { id: 1, date: "2025-04-08", time: "09:00", driverName: "Alice Smith", vehicleModel: "Toyota Prius" },
    { id: 2, date: "2025-04-10", time: "14:30", driverName: "Bob Johnson", vehicleModel: "Honda Accord" },
  ];

  const previousRides = [
    { id: 3, date: "2025-03-28", time: "17:45", driverName: "Sarah Lee", vehicleModel: "Hyundai Elantra" },
    { id: 4, date: "2025-03-20", time: "08:15", driverName: "David Kim", vehicleModel: "Chevrolet Volt" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Upcoming Rides */}
        <div>
          <h2 className="text-xl font-bold mb-4">Upcoming Rides</h2>
          <div className="space-y-4">
            {upcomingRides.map((ride) => (
              <RideCard key={ride.id} {...ride} />
            ))}
          </div>
        </div>

        {/* Previous Rides */}
        <div>
          <h2 className="text-xl font-bold mb-4">Previous Rides</h2>
          <div className="space-y-4">
            {previousRides.map((ride) => (
              <RideCard key={ride.id} {...ride} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
