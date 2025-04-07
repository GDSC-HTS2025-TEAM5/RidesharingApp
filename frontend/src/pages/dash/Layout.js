import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import BottomNav from "../../components/ui/BottomNav";

function Layout() {
    const [tabSelection, setTabSelection] = useState(0);
  
    return (
      <div className="relative min-h-screen bg-gray-100 pb-24">
        {/* Main page content */}
        <div className="max-w-3xl mx-auto p-4">
          <Outlet />
        </div>
  
        {/* Fixed Bottom Nav */}
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-md z-50">
          <BottomNav tabSelection={tabSelection} setTabSelection={setTabSelection} />
        </div>
      </div>
    );
}  

export default Layout;
