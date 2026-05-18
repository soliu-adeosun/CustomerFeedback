import * as React from "react";


export const NewLoader = ({ text = "Loading..." }) => {
    return (
        <div className="overlay-loader">
            <div className="overlay-content">
                <h1>{text}</h1>
            </div>
        </div>
    );
};