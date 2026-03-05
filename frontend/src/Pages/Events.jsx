import React, { useEffect } from 'react';
import EventsHeader from '../Components/Events/EventsHeader';
import LegendsSection from '../Components/Events/LegendsSection';
import TacticalSection from '../Components/Events/TacticalSection';
import ImpactSection from '../Components/Events/ImpactSection';
import RoadmapSection from '../Components/Events/RoadmapSection';

const Events = () => {
    
    // Optional: Scroll to top on mount if not handled by global scroll component
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300">
            <EventsHeader />
            <LegendsSection />
            <TacticalSection />
            <ImpactSection />
            <RoadmapSection />
        </div>
    );
};

export default Events;





// import React from "react";
// import {
//   FaCalendarAlt,
//   FaBus,
//   FaUtensils,
//   FaUserGraduate,
//   FaFemale,
//   FaCampground,
//   FaTshirt,
// } from "react-icons/fa";

// import useReveal from "../common/Reveal";
// import EventCard from "../Components/Events/EventCard";


// const EVENTS_DATA = [
//   {
//     title: "Female JEE Counselling",
//     description:
//       "A counselling session to increase awareness among female IIT aspirants who had cleared JEE Advanced.",
//     image: "/images/op_fjc/3.jpg",
//     icon: FaFemale,
//   },
//   {
//     title: "STIC Dinner",
//     description:
//       "Student Teacher Interaction Dinner to encourage friendly interaction between professors and students.",
//     image: "/images/op_sticd/2.jpg",
//     icon: FaUtensils,
//   },
//   {
//     title: "Delhi Darshan",
//     description:
//       "A tour across Delhi for the freshers, relishing the beauty of the city with indelible bus-rides.",
//     image: "/images/op_delhidarshan/4.jpg",
//     icon: FaBus,
//   },
//   {
//     title: "Informative Sessions",
//     description:
//       "Seniors from all branches share experiences, bridging the gap and encouraging participation.",
//     image: "/images/op_info/2.jpg",
//     icon: FaUserGraduate,
//   },
//   {
//     title: "Camps",
//     description:
//       "Cycle camp, mattress camp, and book camps organized year-round for affordable student essentials.",
//     image: "/images/camps.jpeg",
//     icon: FaCampground,
//   },
//   {
//     title: "Suit Camp",
//     description:
//       "Professional and branded suits provided at subsidised rates.",
//     image: "/images/rex.JPG",
//     icon: FaTshirt,
//   },
// ];

// const Events = () => {
//   const [headerRef, headerVisible] = useReveal();
//   const [eventsRef, eventsVisible] = useReveal();

//   return (
//     <div className="min-h-screen bg-[#e9fbf7] dark:bg-neutral-900 pt-20 pb-20 transition-colors duration-300">
//       {/* Header */}
//       <div
//         ref={headerRef}
//         className={`text-center py-16 px-4 bg-gradient-to-br from-teal-50 to-white dark:from-teal-900/20 dark:to-neutral-900 transition-all duration-700 ${
//           headerVisible
//             ? "opacity-100 translate-y-0"
//             : "opacity-0 translate-y-10"
//         }`}
//       >
//         <FaCalendarAlt className="text-6xl text-[#20AA9D] mx-auto mb-4 opacity-80" />
//         <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-6 font-montserrat tracking-tight">
//           Events
//         </h1>
//         <p className="max-w-4xl mx-auto text-lg text-gray-700 dark:text-gray-300 leading-relaxed px-4">
//           BSW organizes various student-centric events, both formal and informal,
//           that keep students engaged throughout the year.
//         </p>
//       </div>

//       {/* Cards */}
//       <div
//         ref={eventsRef}
//         className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 transition-all duration-700 ${
//           eventsVisible
//             ? "opacity-100 translate-y-0"
//             : "opacity-0 translate-y-10"
//         }`}
//       >
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {EVENTS_DATA.map((event) => (
//             <EventCard
//               key={event.title}
//               title={event.title}
//               description={event.description}
//               image={event.image}
//               Icon={event.icon}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Events;
