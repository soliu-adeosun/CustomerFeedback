import * as React from "react";
import { Link, useLocation } from "react-router-dom";

interface GlobalSideNavProps {
    closeSidebar: () => void;
}

// ── SVG icon components extracted from voicebox_nav_icons.svg ──────────────
// Each icon accepts a `solid` prop — pass true when the nav item is active.

// const IconNewIdea: React.FC<{ solid?: boolean }> = ({ solid }) => solid ? (
//     <svg className="ico-solid" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M7 4a2 2 0 012-2h6a2 2 0 012 2v1h1a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h1V4zm2 0v1h6V4H9zm-2 5a1 1 0 000 2h10a1 1 0 000-2H7zm0 4a1 1 0 000 2h6a1 1 0 000-2H7z" />
//           </svg>
// ) : (
//     <svg className="ico-outline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
//             <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
//             <rect x={9} y={3} width={6} height={4} rx={1} />
//             <path d="M9 12h6M9 16h4" />
//           </svg>
// );

const IconSurveyHistory: React.FC<{ solid?: boolean }> = ({ solid }) => solid ? (
    
          <svg className="ico-solid" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 5a1 1 0 011 1v4.586l2.707 2.707a1 1 0 01-1.414 1.414l-3-3A1 1 0 0111 13V8a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
) : (
    <svg className="ico-outline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <circle cx={12} cy={12} r={9} /><path d="M12 7v5l3 3" />
          </svg>
);

const IconAnalytics: React.FC<{ solid?: boolean }> = ({ solid }) => solid ? (
    
          <svg className="ico-solid" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 3a1 1 0 00-1 1v17a1 1 0 001 1h17a1 1 0 000-2H4V4a1 1 0 00-1-1z" />
            <path d="M6.7 17.3a1 1 0 001.6-1.2L11 12.4l3.3 3.3a1 1 0 001.4 0l4-6a1 1 0 10-1.6-1.2L15 13.6l-3.3-3.3a1 1 0 00-1.4 0l-4 4a1 1 0 000 1.01z" />
          </svg>
) : (
    <svg className="ico-outline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M3 3v18h18" /><path d="M7 16l4-4 4 4 4-7" />
          </svg>
);

// const IconReviewQueue: React.FC<{ solid?: boolean }> = ({ solid }) => solid ? (
//     <svg viewBox="0 0 28 30" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//         <rect x="1" y="3" width="22" height="22" rx="2" fill="currentColor" />
//         {/* Clipboard tab */}
//         <rect x="8" y="0" width="8" height="5" rx="2" fill="currentColor" stroke="var(--sidebar-active-bg, #1F4E79)" strokeWidth="1" />
//         {/* Checkmarks + lines knocked out */}
//         <polyline points="5,11 7,13.5 11,9"  fill="none" stroke="var(--sidebar-active-bg, #1F4E79)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
//         <line x1="14" y1="11" x2="19" y2="11" stroke="var(--sidebar-active-bg, #1F4E79)" strokeWidth="1.4" strokeLinecap="round" />
//         <polyline points="5,18 7,20.5 11,16" fill="none" stroke="var(--sidebar-active-bg, #1F4E79)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
//         <line x1="14" y1="18" x2="19" y2="18" stroke="var(--sidebar-active-bg, #1F4E79)" strokeWidth="1.4" strokeLinecap="round" />
//         {/* Clock badge — filled */}
//         <circle cx="22" cy="24" r="6" fill="currentColor" stroke="var(--sidebar-active-bg, #1F4E79)" strokeWidth="1.5" />
//         <line x1="22" y1="21"   x2="22"   y2="24.5" stroke="var(--sidebar-active-bg, #1F4E79)" strokeWidth="1.4" strokeLinecap="round" />
//         <line x1="22" y1="24.5" x2="24.5" y2="24.5" stroke="var(--sidebar-active-bg, #1F4E79)" strokeWidth="1.4" strokeLinecap="round" />
//     </svg>
// ) : (
//     <svg viewBox="0 0 28 30" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//         <rect x="1" y="3" width="22" height="22" rx="2" stroke="currentColor" strokeWidth="1.4" />
//         <rect x="8" y="0" width="8" height="5" rx="2" stroke="currentColor" strokeWidth="1.3" />
//         <polyline points="5,11 7,13.5 11,9"  fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
//         <line x1="14" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
//         <polyline points="5,18 7,20.5 11,16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
//         <line x1="14" y1="18" x2="19" y2="18" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
//         <circle cx="22" cy="24" r="6" stroke="currentColor" strokeWidth="1.3" />
//         <line x1="22" y1="21"   x2="22"   y2="24.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
//         <line x1="22" y1="24.5" x2="24.5" y2="24.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
//     </svg>
// );

const IconReport: React.FC<{ solid?: boolean }> = ({ solid }) => solid ? (
    <svg viewBox="0 0 20 28" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M2 0 L14 0 L20 6 L20 26 C20 27.1 19.1 28 18 28 L2 28 C0.9 28 0 27.1 0 26 L0 2 C0 0.9 0.9 0 2 0 Z" fill="currentColor" />
        {/* Folded corner */}
        <path d="M14 0 L20 6 L14 6 Z" fill="var(--sidebar-active-bg-secondary, rgba(0,0,0,0.15))" />
        {/* Bar columns knocked out */}
        <rect x="4"  y="17" width="3" height="7"  rx="0.8" fill="var(--sidebar-active-bg, #1F4E79)" />
        <rect x="9"  y="13" width="3" height="11" rx="0.8" fill="var(--sidebar-active-bg, #1F4E79)" />
        <rect x="14" y="15" width="3" height="9"  rx="0.8" fill="var(--sidebar-active-bg, #1F4E79)" />
        {/* Header lines knocked out */}
        <line x1="4" y1="8"  x2="16" y2="8"  stroke="var(--sidebar-active-bg, #1F4E79)" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="4" y1="11" x2="12" y2="11" stroke="var(--sidebar-active-bg, #1F4E79)" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
) : (
    <svg viewBox="0 0 20 28" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M2 0 L14 0 L20 6 L20 26 C20 27.1 19.1 28 18 28 L2 28 C0.9 28 0 27.1 0 26 L0 2 C0 0.9 0.9 0 2 0 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M14 0 L14 6 L20 6" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <rect x="4"  y="17" width="3" height="7"  rx="0.8" stroke="currentColor" strokeWidth="1.2" />
        <rect x="9"  y="13" width="3" height="11" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
        <rect x="14" y="15" width="3" height="9"  rx="0.8" stroke="currentColor" strokeWidth="1.2" />
        <line x1="4" y1="8"  x2="16" y2="8"  stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <line x1="4" y1="11" x2="12" y2="11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
);

// ───────────────────────────────────────────────────────────────────────────

const GlobalSideNav: React.FC<GlobalSideNavProps> = ({ closeSidebar }) => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;
    const navClass = (path: string) => isActive(path) ? "sb-btn active" : "sb-btn";

    return (
        <aside className="sidebar" id="sidebar">

            <div className="sb-brand">
                <div className="sb-emblem">
                    <img src={require("../Assets/img/rslogo_mono.png")} alt="Arridex Logo" className="logo-icon" />
                </div>
                <div>
                    {/* <div className="sb-name">Arridex</div> */}
                    <div className="sb-sub hidden">Customer Feedback</div>
                </div>
            </div>

            <nav className="sb-nav">
                <div className="sb-section">Main</div>
                
                <div className="hidden" id="adminView">

                    {/* <Link to="/" className={navClass("/")} onClick={closeSidebar}>
                        <span className="nav-icon"><IconNewIdea solid={isActive("/")} /></span>New Survey
                    </Link> */}

                    <Link to="/" className={navClass("/")} onClick={closeSidebar}>
                        <span className="nav-icon"><IconSurveyHistory solid={isActive("/")} /></span>Survey Record
                    </Link>

                    <Link to="/analytics" className={navClass("/analytics")} onClick={closeSidebar}>
                        <span className="nav-icon"><IconAnalytics solid={isActive("/analytics")} /></span>Analytics
                    </Link>

                    {/* <Link to="/reviewqueue" className={navClass("/reviewqueue")} onClick={closeSidebar}>
                        <span className="nav-icon"><IconReviewQueue solid={isActive("/reviewqueue")} /></span>Review Queue
                        <span className="nav-badge" id="reviewtask">0</span>
                    </Link> */}


                </div>
                <div className="hidden" id="customerView">
                    <Link to="/customerform" className={navClass("/customerform")} onClick={closeSidebar}>
                        <span className="nav-icon"><IconReport solid={isActive("/customerform")} /></span>Customer Feedback
                    </Link>
                </div>
                <div id="navigationLoader" className="">
                    <div className="ghost-line" />
                    <div className="ghost-line" />
                    <div className="ghost-line" />
                    <div className="ghost-line" />
                    <div className="ghost-line" />
                </div>
                
            </nav>

            <div className="sb-foot">
                <div className="b-avatar" style={{ width: "32px", height: "32px", borderRadius: "50%", overflow: "hidden" }}>
                        <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={require("../Assets/img/avatar.png")} alt="User Avatar"/>
                </div>
                
                <div>
                    <div className="sb-uname" />
                    <div className="sb-urole" />
                </div>
                {/* <div className="sb-live"><div className="sb-dot" />Live</div> */}
            </div>


        </aside>
    );
};

export default GlobalSideNav;