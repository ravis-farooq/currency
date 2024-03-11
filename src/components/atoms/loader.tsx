import React from "react";

const Loader: React.FC = () => {
  return (
    <>
      <div className="loader-container">
        <svg className="loader-svg" viewBox="0 0 50 50" width="50" height="50">
          <circle
            className="loader-circle"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="5"
          />
        </svg>
        <p>Loading...</p>
      </div>
    </>
  );
};

export default Loader;
