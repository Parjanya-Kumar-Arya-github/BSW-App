import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext/AuthContext";

const PublicRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0f0f0f] flex items-center justify-center font-lexend">
        <div className="bg-white dark:bg-[#1a1a1a] p-8 rounded-2xl shadow-lg text-center">
          <div className="w-12 h-12 border-4 border-[#2EBF70] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">Checking Session...</p>
        </div>
      </div>
    );
  }

  // If user is ALREADY logged in, redirect to Dashboard or Profile
  if (user) {
    return <Navigate to="/profile" replace />;
  }

  // If not logged in, allow access to Login/Signup
  return <Outlet />;
};

export default PublicRoute;