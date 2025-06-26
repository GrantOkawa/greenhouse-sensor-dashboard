import React from "react";
import "../styles/Header.css"; 

// Header component to display the title and number of records
const Header: React.FC<{ dataLength: number }> = ({ dataLength }) => (
  <header className="header bg-white-10 backdrop-blur-sm border border-white-20 shadow-lg rounded-xl">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="header-title">Greenhouse Dashboard</h1>
        <p className="header-subtitle text-green-200">Real-time sensor data</p>
      </div>
      <div className="flex items-center space-x-3">
        <span className="record-count text-green-300">
          {dataLength} records
        </span>
      </div>{" "}
      {/* Display the number of records */}
    </div>
  </header>
);

export default Header;