import { useNavigate } from "react-router-dom";

function BottomNav({ tabSelection, setTabSelection }) {
  const navigate = useNavigate();
  const pages = ["RiderDashboard", "Activity", "DriverDashboard", "Account"];
  const bar_name = ["Home", "Activity", "Driver", "Account"];

  const handleNavigation = (index) => {
    setTabSelection(index);
    navigate(`/dash/${pages[index]}`);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-50">
      {/* White background behind nav (slightly taller) */}
      <div className="absolute inset-0 h-20 bg-white z-0 rounded-t-2xl shadow-md" />

      {/* Button container */}
      <div className="relative z-10 flex justify-around items-center h-20">
        {bar_name.map((name, index) => (
          <button
            key={index}
            onClick={() => handleNavigation(index)}
            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xs transition-all 
              ${tabSelection === index ? "bg-yellow-400 text-black" : "bg-blue-400 text-white"}`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default BottomNav;
