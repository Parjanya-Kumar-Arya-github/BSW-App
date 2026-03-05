import React from 'react';

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 font-sans bg-white text-[#222] dark:bg-neutral-900 dark:text-gray-100 transition-colors">
      {/* Heading */}
      <h1 className="text-5xl font-bold text-[#222] dark:text-gray-100 mb-8">About Us</h1>

      {/* Content Container */}
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Left Side: Team Photo Placeholder */}
        <div className="flex-1 bg-gray-300 dark:bg-neutral-700 rounded-xl flex items-center justify-center min-h-[320px]">
          <span className="text-xl font-bold text-black dark:text-gray-100">Team Photo</span>
        </div>

        {/* Right Side: Our Objectives */}
        <div className="flex-1 bg-[#8e8e8e] dark:bg-neutral-800 rounded-xl p-10 text-white dark:text-gray-100 transition-colors">
          {/* Header with Circle Icon */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-6 bg-gray-300 dark:bg-neutral-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-white dark:text-gray-100">Our Objectives</h2>
          </div>

          {/* Text Content */}
          <div className="space-y-6 text-base leading-relaxed">
            <p>
              BSW (Board for Student Welfare) is a constituent body of the Student Affairs Council (SAC).
            </p>
            <p>
              Our primary objective is identifying issues faced by the student community related to academics, social life, mental health, and career, and addressing them through targeted welfare activities and mentorship programs.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
