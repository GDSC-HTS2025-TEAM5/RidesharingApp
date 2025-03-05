import React, { useState } from 'react';

const RouteSelection = ({ selectedRoute, setSelectedRoute }) => {
  const routes = [
    { name: "Home to SFU", id: 1 },
    { name: "John's Home to SFU", id: 2 },
    { name: "Downtown to SFU", id: 3 },
  ];

  return (
    <div className="space-y-4">
      {routes.map((route) => (
        <div
          key={route.id}
          onClick={() => setSelectedRoute(route)} // Set the selected route on click
          className={`cursor-pointer p-4 rounded-lg transition-colors duration-300
            ${selectedRoute?.id === route.id
              ? 'bg-blue-500 text-white'  // Apply blue background when selected
              : 'bg-gray-200 hover:bg-red-300'} // Default gray background with hover effect
          `}
        >
          <h3 className="text-lg font-semibold">{route.name}</h3>
        </div>
      ))}
      <button className="mt-4 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
        Add Route
      </button>
    </div>
  );
};

export default RouteSelection;
