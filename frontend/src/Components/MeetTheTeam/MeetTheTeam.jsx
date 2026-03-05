import React from "react";
import { Link } from "react-router-dom";

// Data populated from Student Team JSON (GSec, DGs, Coordinators)
const teamMembers = [
  {
    name: "Jivant Garg",
    role: "General Secretary",
    image: "/imgs/team2025/g1.jpg",
  },
  {
    name: "Advik Gupta",
    role: "DGS (Operations)",
    image: "/imgs/team2025/dg1.jpg",
  },
  {
    name: "Vishal Baghel",
    role: "DGS (Mentorship)",
    image: "/imgs/team2025/dg2.jpg",
  },
  {
    name: "Aniket Anand",
    role: "Career Guide Coordinator",
    image: "/imgs/team2025/coord1.jpg",
  },
  {
    name: "Avani Kumar",
    role: "Academic Coordinator",
    image: "/imgs/team2025/coord2.jpg",
  },
  {
    name: "Pratyush Shrivastava",
    role: "Mental Health Coordinator",
    image: "/imgs/team2025/coord3.JPG",
  },
  {
    name: "Pranav Misra",
    role: "Language Coordinator",
    image: "/imgs/team2025/coord4.png",
  },
];

const MeetTheTeam = () => {
  return (
    <section className="bg-[#CBEAFF] dark:bg-gray-900 py-20 font-inter text-[#4D4D4D] dark:text-white">
      <div className="mx-auto max-w-screen-xl px-8 md:px-12 lg:px-24 text-center">
        {/* Heading */}
        <h2 className="mb-2 text-4xl font-semibold lg:text-6xl font-semibold">
          Meet the Team
        </h2>
        <p className="mb-12 text-gray-600 dark:text-gray-300">
          A dedicated team of students and mentors
        </p>

        {/* Team Grid */}
        <div className="mb-12 px-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-7 justify-center">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center py-4">
              {/* Image Container */}
              <div className="mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-[#c0e1f9] dark:bg-gray-800 shadow-sm">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>

              <p className="text-sm font-semibold text-gray-700 dark:text-gray-100">
                {member.name}
              </p>
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {member.role}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          to="/aboutus"
          className="inline-block rounded-md bg-[#2EBF70] px-6 py-2 text-sm font-medium text-[#FDFFFF] transition hover:bg-green-600 dark:hover:bg-green-500"
        >
          Meet the Team
        </Link>
      </div>
    </section>
  );
};

export default MeetTheTeam;