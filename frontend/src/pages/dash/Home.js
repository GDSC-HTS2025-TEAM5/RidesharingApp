import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/ui/BottomNav";

function Home() {
    const navigate = useNavigate();
    const [tabSelection, setTabSelection] = useState(0);
    const pages = ["RiderDashboard", "Activity", "Chat", "DriverDashboard", "Account"];

    useEffect(() => {
        navigate(`/dash/${pages[tabSelection]}`);
    }, [tabSelection, navigate]);

    return (
        <div>
            <h1 className="text-center text-2xl font-bold">Welcome to {pages[tabSelection]}</h1>
            <BottomNav tabSelection={tabSelection} setTabSelection={setTabSelection} />
        </div>
    );
}

export default Home;
