import * as React from "react";
import { Outlet } from "react-router";
import { Helmet } from 'react-helmet-async';
import GlobalSideNav from "../Navigation/GlobalSideNav";
import GlobalTopNav from "../Navigation/GlobalTopNav";

import "notyf/notyf.min.css";
import Modal from "../Modals/Modal";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";

import '../Assets/css/sharepointuifix.css';
import "../Assets/css/new.css";
import "../Assets/css/loader.css";

require("speedpoint_core");
require("workflowengine");
require("global");
require("notyf");
require("jQueryUI");
require("globalext");
require("select2");

export const Layout = () => {

    // Function to close sidebar
    const closeSidebar = () => {
        document.getElementById("sidebar")?.classList.remove("open");
        document.getElementById("overlay")?.classList.remove("open");
    };

    return (
        <>
            <Helmet>
                <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
            </Helmet>

            <GlobalSideNav closeSidebar={closeSidebar} />   {/* Pass close function */}
            
            {/* Overlay */}
            <div  className="sb-overlay" id="overlay" onClick={closeSidebar} />
            
                

            <div className="shell">
                <GlobalTopNav openSidebar={() => {
                        document.getElementById("sidebar")?.classList.add("open");
                        document.getElementById("overlay")?.classList.add("open");
                    }} />

                {/* Main Content */}
                <div className="content">
                    <Outlet />
                </div>
            </div>

            <Modal />
        </>
    );
};