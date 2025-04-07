import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/ui/BottomNav";

function Home() {
    const navigate = useNavigate();
    const [tabSelection, setTabSelection] = useState(0);
    const pages = ["RiderDashboard", "Activity", "DriverDashboard", "Account"];

    useEffect(() => {
        navigate(`/dash/${pages[tabSelection]}`);
    }, [tabSelection, navigate]);

    return (
        <div className="bg-gray-100 min-h-screen p-6">
          <div className="container mx-auto max-w-3xl">
            <h1 className="text-center text-2xl font-bold mb-4">
              Welcome to {pages[tabSelection]}
            </h1>
            <BottomNav tabSelection={tabSelection} setTabSelection={setTabSelection} />
          </div>
        </div>
    );
}

export default Home;
