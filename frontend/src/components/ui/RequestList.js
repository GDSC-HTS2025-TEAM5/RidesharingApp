import React from 'react';

const RequestList = () => {
  const requests = [
    { time: "9:30 AM", count: 4 },
    { time: "9:45 AM", count: 2 },
    { time: "10:00 AM", count: 5 },
  ];

  return (
    <div className="space-y-4">
      {requests.map((request, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-300"
        >
          <p className="text-lg font-medium">
            {request.count} people for {request.time}
          </p>
          <button className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
            Accept
          </button>
        </div>
      ))}
    </div>
  );
};

export default RequestList;
