import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import config from "../../config";
import { 
  FaUser, 
  FaSave, 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaPhone, 
  FaCalendar, 
  FaVenusMars, 
  FaBuilding,
  FaSignOutAlt 
} from "react-icons/fa";
import SmilingFaceLoader from "../../Components/SmilingFaceLoader";

// Enums matching your Prisma Schema
const GENDERS = ["MALE", "FEMALE", "OTHERS"];
const HOSTELS = [
  "ARAVALI", "JWALAMUKHI", "NILGIRI", "KARAKORAM", "GIRNAR", "KAILASH",
  "HIMADRI", "SAHYADRI", "SATPURA", "UDAIGIRI", "KUMAON", "SHIVALIK",
  "ZANSKAR", "VINDHYACHAL", "DRONAGIRI", "SAPTGIRI", "OTHER"
];

const ProfilePage = () => {
  const { user, fetchUser, logout } = useAuth(); // Added logout from context
  const [loading, setLoading] = useState(false);
  
  // Feedback State
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    gender: "",
    dob: "",
    hostel: "",
    phoneNumber: "",
  });

  // Initialize form when user data loads
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        bio: user.bio || "",
        gender: user.gender || "OTHERS",
        dob: user.dob ? new Date(user.dob).toISOString().split("T")[0] : "",
        hostel: user.hostel || "",
        phoneNumber: user.phoneNumber || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
    if (message) setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch(`${config.baseAPIURL}/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            ...formData,
            dob: formData.dob ? new Date(formData.dob).toISOString() : null
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update profile");
      }
      
      setMessage("Profile updated successfully!");
      await fetchUser(); 
      
      setTimeout(() => {
        setMessage("");
      }, 3000);

    } catch (err) {
      console.error(err);
      setError(err.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  if(!user){
    return <SmilingFaceLoader/>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212] py-12 px-4 sm:px-6 lg:px-8 font-lexend transition-colors duration-300">
      
      {/* Main Card Container */}
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#1a1a1a] rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-[#333]">
        
        {/* Banner Section */}
        <div className="h-40 w-full bg-[#CBEAFF] dark:bg-slate-800 relative"></div>
        
        {/* Header Content */}
        <div className="px-8 relative pb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between">
            <div className="flex flex-col sm:flex-row items-center">
                {/* Avatar */}
                <div className="-mt-16 relative mb-4 sm:mb-0">
                <div className="h-32 w-32 rounded-full border-4 border-white dark:border-[#1a1a1a] bg-white dark:bg-black overflow-hidden shadow-lg flex items-center justify-center">
                    {user.avatar ? (
                    <img src={user.avatar} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                    <FaUser className="text-4xl text-gray-400" />
                    )}
                </div>
                </div>
                
                {/* User Info */}
                <div className="sm:ml-6 text-center sm:text-left flex-1 mt-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white capitalize mb-1">
                    {user.name}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {user.email}
                </p>
                
                <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
                    {user.role && user.role.map((r, index) => (
                    <span 
                        key={index} 
                        className="px-3 py-1 bg-[#2EBF70]/10 text-[#2EBF70] text-xs font-bold rounded-full uppercase tracking-wider border border-[#2EBF70]/20"
                    >
                        {r}
                    </span>
                    ))}
                    
                    {!user.isExternal && (
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full border border-blue-100">
                            IITD Verified
                        </span>
                    )}
                </div>
                </div>
            </div>

            {/* Logout Button */}
            <button
                onClick={logout}
                className="mt-6 sm:mt-0 flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#A91B0D]/10 hover:bg-[#A91B0D] text-[#A91B0D] hover:text-white font-bold text-sm transition-all duration-300 border border-[#A91B0D]/20 group"
            >
                <FaSignOutAlt className="group-hover:-translate-x-0.5 transition-transform" /> 
                Logout
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 dark:bg-[#333] w-full"></div>

        {/* Form Section */}
        <div className="p-8 md:p-10">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Profile Settings</h3>
            </div>

            {/* Alerts */}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-semibold border border-red-100 dark:border-red-800 flex items-center gap-3">
                <FaExclamationCircle className="text-lg" />
                {error}
              </div>
            )}

            {message && (
              <div className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm font-semibold border border-green-100 dark:border-green-800 flex items-center gap-3">
                <FaCheckCircle className="text-lg" />
                {message}
              </div>
            )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* NAME - Locked for IITD Users */}
              <div className="relative group">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">
                  Full Name { !user.isExternal && <span className="text-xs font-normal text-gray-400 ml-1">(Locked)</span>}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2EBF70] transition-colors">
                    <FaUser />
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!user.isExternal}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#333] text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#2EBF70] focus:bg-white dark:focus:bg-[#0f0f0f] transition-all
                      ${!user.isExternal ? "opacity-70 cursor-not-allowed bg-gray-100 dark:bg-gray-800" : ""}`}
                  />
                </div>
              </div>

              {/* PHONE */}
              <div className="relative group">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2EBF70] transition-colors">
                    <FaPhone />
                  </span>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="+91 9999999999"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#333] text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#2EBF70] focus:bg-white dark:focus:bg-[#0f0f0f] transition-all"
                  />
                </div>
              </div>

              {/* DATE OF BIRTH */}
              <div className="relative group">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">
                  Date of Birth
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2EBF70] transition-colors">
                    <FaCalendar />
                  </span>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#333] text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#2EBF70] focus:bg-white dark:focus:bg-[#0f0f0f] transition-all"
                  />
                </div>
              </div>

              {/* GENDER */}
              <div className="relative group">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">
                  Gender
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2EBF70] transition-colors">
                    <FaVenusMars />
                  </span>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#333] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#2EBF70] focus:bg-white dark:focus:bg-[#0f0f0f] transition-all appearance-none"
                  >
                    {GENDERS.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* HOSTEL */}
              <div className="relative group md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">
                  Hostel
                </label>
                <div className="relative">
                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2EBF70] transition-colors">
                    <FaBuilding />
                  </span>
                  <select
                    name="hostel"
                    value={formData.hostel || ""}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#333] text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#2EBF70] focus:bg-white dark:focus:bg-[#0f0f0f] transition-all appearance-none"
                  >
                    <option value="" disabled>Select Hostel</option>
                    {HOSTELS.map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* BIO - Full Width */}
            <div className="relative group">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">
                Bio
              </label>
              <textarea
                name="bio"
                rows={4}
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us a little about yourself..."
                className="w-full p-4 rounded-xl bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#333] text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#2EBF70] focus:bg-white dark:focus:bg-[#0f0f0f] transition-all resize-none"
              />
            </div>

            {/* SAVE BUTTON */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-[#2EBF70] hover:bg-green-600 text-white font-bold text-lg shadow-lg shadow-[#2EBF70]/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="animate-pulse">Saving...</span>
                ) : (
                  <>
                    Save Changes <FaSave />
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;