import * as React from "react";

interface GlobalLoaderProps {
    message?: string;
}

const GlobalLoader: React.FC<GlobalLoaderProps> = ({
    message = "Preparing page..."
}) => {
    return (
        <div className="loader-content" id="globalLoader">
            <div className="loader-card">
                <div className="loader-ring">
                    <div className="loader-core" />
                </div>

                <h3 className="loader-text">Loading</h3>

                <span className="loader-sub">
                    {message}
                </span>
            </div>
        </div>
    );
};

export default GlobalLoader;