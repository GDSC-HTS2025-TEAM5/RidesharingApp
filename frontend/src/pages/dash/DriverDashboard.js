import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { RouteSelection, RequestList } from '../../components/ui';

const DriverDashboard = () => {
  const [selectedRoute, setSelectedRoute] = useState(null);

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6 space-y-8">
        <h1 className="text-3xl font-bold text-center text-indigo-600">John Doe's Dashboard</h1>

        {/* Current Routes Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Current Routes</h2>
          <div className="bg-indigo-100 p-4 rounded-lg shadow-sm">
            <RouteSelection 
              selectedRoute={selectedRoute}
              setSelectedRoute={setSelectedRoute}
            />
          </div>
        </section>

        {/* Requests Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Requests Received</h2>
          <div className="bg-indigo-100 p-4 rounded-lg shadow-sm">
            <RequestList />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DriverDashboard;
