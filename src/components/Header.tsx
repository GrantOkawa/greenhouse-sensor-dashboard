import React from "react";

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
        <div className="live-indicator">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </div>
      </div>
    </div>
  </header>
);

export default Header;