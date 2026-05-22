import * as React from "react";
import { useLocation } from "react-router-dom";

interface GlobalTopNavProps {
    openSidebar: () => void;
}

const GlobalTopNav: React.FC<GlobalTopNavProps> = ({ openSidebar }) => {

    const location = useLocation();

    const routeTitles: Record<string, string> = {
        "/": "New Survey",
        "/surveyhistory": "Survey Record",
        "/reviewqueue": "Review Queue",
        "/analytics": "Analytics Dashboard",
        "/approverequest": "Approve Request",
        "/viewrequest": "View Request",
        "/customerform": "",
    };

    const currentTitle = routeTitles[location.pathname] || "";

    return (
        <div className="topbar">
            <button 
                className="tb-ham"
                onClick={openSidebar}
                aria-label="Toggle menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 12h18M3 6h18M3 18h18"/>
                </svg>
            </button>
            {/* <div className="tb-title" id="tb-title">New <span>Survey</span></div> */}
            {currentTitle && (
                <div className="tb-title" id="tb-title">
                    {currentTitle.split(" ")[0]} <span>{currentTitle.split(" ")[1] || ""}</span>
                    
                </div>
            )}

            <div className="tb-title hidden customertopBar">We value your feedback</div>
            {/* <div className="topbar-bc">
                <span className="bc-root">Customer Feedback</span>
                <span className="bc-sep">›</span>
                <span className="bc-cur" id="bc-cur">
                    {currentTitle}
                </span>
            </div> */}

            {/* <div className="topbar-right">
                <div className="user-chip">
                    <div className="av">
                        <img className="top-avatar-img" src={require("../Assets/img/avatar.png")} alt="User Avatar"/>
                    </div>
                    <span className="top-shortname"></span>
                </div>
            </div> */}
        </div>
    );
};

export default GlobalTopNav;