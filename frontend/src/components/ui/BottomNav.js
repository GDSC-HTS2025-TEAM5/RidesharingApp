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
        <div className="fixed bottom-4 left-1/2 translate-x-[-50%] bg-white-800 p-2 rounded-full flex justify-around items-center max-w-sm w-full sm:w-3/4 md:w-1/2">
            {bar_name.map((name, index) => (
            <button
            key={index}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-center font-bold transition-all
            text-xs ${tabSelection === index ? "bg-yellow-400 text-black" : "bg-blue-400 text-white"}`}
            onClick={() => handleNavigation(index)}
        >
            {name}
        </button>
        
            ))}
        </div>
    );    
}

export default BottomNav;
