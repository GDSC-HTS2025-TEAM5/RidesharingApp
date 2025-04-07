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
        <div 
        style={{display: "flex", justifyContent: "space-between", minWidth:"100%", marginLeft: "10%"}}
        className="!flex min-w-fit bg-blue-500">
            {bar_name.map((name, index) => (
            <button
            key={index}
            className={`custom-btn ${tabSelection === index ? "active" : "inactive"}`}
            onClick={() => handleNavigation(index)}
        >
            {name}
        </button>
        
            ))}
        </div>
    );    
}

export default BottomNav;
