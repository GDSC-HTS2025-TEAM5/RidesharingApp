import React, { useState } from "react";
import { FaSearch, FaClock, FaHome, FaSchool } from "react-icons/fa";
import { Button, Input, Select, Card, CardContent } from "../../components/ui";

const RiderDashboard = () => {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  return (
    <div className="bg-gray-100 p-6">
      <div className="container">
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
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <h2 className="text-lg font-semibold mb-2">Recently Visited:</h2>
        <Card className="mb-4">
          <CardContent className="flex items-center gap-2">
            <FaClock className="text-blue-500" />
            <span>Most recent location</span>
          </CardContent>
        </Card>

        <h2 className="text-lg font-semibold mt-4 mb-2">Favourites:</h2>
        <Card className="mb-4">
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
      </div>
    </div>
  );
};

export default RiderDashboard;
