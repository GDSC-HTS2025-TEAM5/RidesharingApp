import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 🔧 Developer override
const DEV_FORCE_FIRST_VISIT = false; // Set to false for normal behavior

const StartupRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (DEV_FORCE_FIRST_VISIT) {
      // Simulate first visit for dev purposes
      navigate("/auth/PreviewPage", { replace: true });
      return;
    }

    const firstVisit = localStorage.getItem("firstVisit");

    if (firstVisit === "false") {
      navigate("/auth/Login", { replace: true });
    } else {
      localStorage.setItem("firstVisit", "false");
      navigate("/auth/PreviewPage", { replace: true });
    }
  }, [navigate]);

  return null;
};

export default StartupRedirect;