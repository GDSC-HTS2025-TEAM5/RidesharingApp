import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import BottomNav from "../../components/ui/BottomNav";

function Layout() {
    const [tabSelection, setTabSelection] = useState(0);

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                {/* This renders the currently selected page */}
                <Outlet />
            </div>
            {/* Bottom Navigation Bar (Stays across all pages) */}
            <BottomNav tabSelection={tabSelection} setTabSelection={setTabSelection} />
        </div>
    );
}

export default Layout;
