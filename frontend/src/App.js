import React, { use } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Preview Pages
import PreviewPage1 from "./pages/preview/PreviewPage1";
import PreviewPage2 from "./pages/preview/PreviewPage2";

// Authentication Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import TermsConditions from "./pages/auth/TermsConditions";

// Dashboard Pages
import DriverDashboard from "./pages/dash/DriverDashboard";
import Home from "./pages/dash/Home";
import Layout from "./pages/dash/Layout";
import RiderDashboard from "./pages/dash/RiderDashboard";

function App() {
  const [isFirstOpen, setIsFirstOpen] = React.useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Handling for the user's first visit for the app
    const firstOpen = localStorage.getItem("isFirstOpen");

    if (firstOpen) {
      setIsFirstOpen(false);
      navigate("/auth/Login");
    }
  }, [navigate]);

  const handleFinishPreview = () => {
    localStorage.setItem("isFirstOpen", "false");
    setIsFirstOpen(false);
    navigate("/auth/Login");
  };

  return (
    <Router>
      <Routes>
        {isFirstOpen ? (
          // Show preview pages on first open
          <>
            <Route path="/preview1" element={<PreviewPage1 onNext={handleFinishPreview}/>} />
            <Route path="/preview2" element={<PreviewPage2 onNext={handleFinishPreview} />} />
          </>
          ) : (
            // Other pages after the first visit
            <>
            <Route path="/auth/Login" element={<Login />} />
            <Route path="/auth/Signup" element={<Signup />} />
            <Route path="/auth/TermsConditions" element={<TermsConditions />} />
            <Route path="/dash/RiderDashboard" element={<RiderDashboard />} />
            <Route path="/dash/DriverDashboard" element={<DriverDashboard/>}/>
            <Route path="/dash/*" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="RiderDashboard" element={<RiderDashboard />} /> 
                <Route path="DriverDashboard" element={<DriverDashboard />} /> 
            </Route>
            </>
          )}
          // Default page
          <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
