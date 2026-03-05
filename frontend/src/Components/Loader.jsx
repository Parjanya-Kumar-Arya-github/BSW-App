import React from 'react';

const Loader = () => {
  return (
    // 1. Container: Full screen, centers content
    // 2. Background: Adapts to Light (white) and Dark (gray-900/black) modes automatically
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-[#0f172a] transition-colors duration-300">
      
      {/* A wrapper div for accessibility attributes (optional but recommended)
      */}
      <div role="status" aria-label="loading">
        
        {/* SVG Spinner */}
        <svg 
          className="w-16 h-16 animate-spin" 
          viewBox="0 0 50 50" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Define the Gradient:
            This matches your header: Green (#4ade80) -> Blue (#3b82f6)
          */}
          <defs>
            <linearGradient id="bsw_gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" /> {/* Tailwind green-400 */}
              <stop offset="100%" stopColor="#3b82f6" /> {/* Tailwind blue-500 */}
            </linearGradient>
          </defs>

          {/* The Ring:
            stroke-dasharray="80" creates the gap in the circle
            stroke-linecap="round" makes the ends of the line rounded
          */}
          <circle 
            cx="25" 
            cy="25" 
            r="20" 
            stroke="url(#bsw_gradient)" 
            strokeWidth="5" 
            fill="none" 
            strokeDasharray="80" 
            strokeLinecap="round" 
          />
        </svg>

        {/* Optional: Text below spinner */}
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;