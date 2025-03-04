import React, { useState } from "react";
import { FaSearch, FaClock, FaHome, FaSchool } from "react-icons/fa";
import { Button, Input, Select, Card, CardContent } from "../../components/ui";

const RiderDashboard = () => {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  return (
      <div className="bg-purple-200 p-6 rounded-xl w-full max-w-md mx-auto">
        <div className="flex items-center justify-between gap-2 mb-4">
          <FaSearch className="text-lg text-gray-600" />
          <Input
            placeholder="Where to?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full text-right"
          />
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <Button className="outline">Date</Button>
        <Select
          options={[
            { value: "today", label: "Today" },
            { value: "tomorrow", label: "Tomorrow" },
          ]}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          />
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <Button className="outline">Time</Button>
        <Select
          options={[
            { value: "morning", label: "morning" },
            { value: "afternoon", label: "afternoon" },
            { value: "evening", label: "evening" },
          ]}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          />
      </div>

      <h2 className="text-lg font-semibold mb-2">Recently Visited:</h2>
      <Card>
        <CardContent className="flex items-center gap-2">
          <FaClock className="text-blue-500" />
          <span>Most recent location</span>
        </CardContent>
      </Card>

      <h2 className="text-lg font-semibold mt-4 mb-2">Favourites:</h2>
      <Card>
        <CardContent className="flex items-center gap-2">
          <FaHome className="text-red-500" />
          <span>Home Address</span>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center gap-2">
          <FaSchool className="text-orange-500" />
          <span>School Address</span>
        </CardContent>
      </Card>

      <div className="fixed bottom-0 left-0 w-full bg-white p-4 flex justify-center shadow-md">
        <div className="flex justify-between gap-4">
          <Button className="!w-20 !h-20 !bg-blue-400 !text-white">Home</Button>
          <Button className="!w-20 !h-20 !bg-yellow-400 !text-black">Activity</Button>
          <Button className="!w-20 !h-20 !bg-blue-400 !text-white">Chat</Button>
          <Button className="!w-20 !h-20 !bg-blue-400 !text-white">Driver</Button>
          <Button className="!w-20 !h-20 !bg-orange-400 !text-black">Account</Button>
        </div>
      </div>

    </div>
  );
};

export default RiderDashboard;
