import React from "react";
import "./SmilingFaceLoader.css";

const SmilingFaceLoader = () => {
  return (
    <div className="min-h-screen m-4 flex items-center justify-center bg-transparent transition-colors duration-300">
    <div className="ag-container">
      {/* Use an SVG for the arc to get rounded caps */}
      <svg className="ag-arc" viewBox="0 0 160 160">
        <path d="M 30.5,30.5 A 70,70 0 0,1 129.5,30.5" />
      </svg>
      <div className="ag-eyes-container">
        <div className="ag-eye left"></div>
        <div className="ag-eye right"></div>
      </div>
    </div>
  </div>
  );
};

export default SmilingFaceLoader;
