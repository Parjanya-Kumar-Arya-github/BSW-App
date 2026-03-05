import React from "react";
import { Navigate, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import { FaLock, FaArrowRight, FaHome } from "react-icons/fa";
import SmilingFaceLoader from "../../Components/SmilingFaceLoader";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Captures the URL the user is trying to access

  // Loading State matches the auth check transition
  if (loading) {
    return <SmilingFaceLoader />;
  }

  // If not logged in, show "Login Required" UI with the specified rounded theme
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-[#121212] px-4 transition-colors duration-300 font-lexend">
        <div className="max-w-md w-full bg-white dark:bg-[#1a1a1a] rounded-[2rem] shadow-2xl p-8 md:p-12 relative overflow-hidden text-center">
          
          {/* Header / Icon Section matching the forgot password aesthetic */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#e9fbf7] text-[#20AA9D] rounded-full mb-6 text-3xl shadow-sm">
              <FaLock />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Login Required
            </h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              You need to be logged in to access this page. Please sign in to continue.
            </p>
          </div>

          {/* Action Buttons with stored location state */}
          <div className="space-y-4">
            <button
              onClick={() => navigate('/login', { state: { from: location } })} // Passes the current path to Login
              className="w-full py-4 rounded-xl bg-[#20AA9D] hover:bg-[#17857a] text-white font-bold text-lg shadow-lg shadow-[#20AA9D]/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Go to Login <FaArrowRight />
            </button>
            
            <button
               onClick={() => navigate('/')}
               className="w-full py-4 rounded-xl bg-gray-100 dark:bg-[#2a2a2a] hover:bg-gray-200 dark:hover:bg-[#333] text-gray-600 dark:text-gray-300 font-bold text-lg transition-all flex items-center justify-center gap-2"
            >
              <FaHome /> Back to Home
            </button>
          </div>

        </div>
      </div>
    );
  }

  // If logged in, render the protected content
  return <Outlet />;
};

export default ProtectedRoute;