// src/config.js
const config = {
  // Base URL for API requests (structure)
  baseAPIURL: import.meta.env.VITE_BASE_API_URL || "http://localhost:3000",
  
  // Base URL for actual file downloads
  baseFILEURL: `${import.meta.env.VITE_BASE_FILE_URL || "http://localhost:3000"}/files/pyqs`, 
};

export default config;