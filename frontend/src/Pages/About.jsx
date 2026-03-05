import React from 'react';
import { Link } from 'react-router-dom';
import { FaCogs, FaUsers, FaDownload, FaChevronRight, FaBullseye, FaHandshake } from 'react-icons/fa';
import useReveal from '../common/Reveal';

const About = () => {
    const [headerRef, headerVisible] = useReveal();
    const [objectiveRef, objectiveVisible] = useReveal();
    const [cardsRef, cardsVisible] = useReveal();
    const [newsletterRef, newsletterVisible] = useReveal();

    return (
        <div className="min-h-screen bg-[#e9fbf7] dark:bg-[#121212] pt-20 pb-20 transition-colors duration-300">
            
            {/* 1. Hero / Header Section */}
            <div 
                ref={headerRef}
                className={`relative bg-gradient-to-r from-[#67B26F] to-[#4CA2CD] py-20 px-4 mb-16 transition-all duration-700 ease-out ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
                <div className="absolute inset-0 bg-black/10 dark:bg-black/30"></div> {/* Overlay for contrast */}
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 font-montserrat tracking-tight drop-shadow-md">
                        About Us
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 font-light tracking-wide">
                        Board for Student Welfare, IIT Delhi
                    </p>
                </div>
                {/* Decorative curve at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#e9fbf7] dark:bg-[#121212] rounded-t-[50%] transform translate-y-1/2 scale-x-110"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* 2. Our Objective Section */}
                <div 
                    ref={objectiveRef}
                    className={`flex flex-col lg:flex-row gap-12 mb-24 items-center transition-all duration-700 delay-100 ${objectiveVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    {/* Image Area */}
                    <div className="w-full lg:w-1/2 relative group">
                        <div className="absolute inset-0 bg-[#20AA9D] rounded-2xl transform rotate-3 opacity-20 group-hover:rotate-6 transition-transform duration-300"></div>
                        <div className="relative h-[350px] md:h-[450px] w-full overflow-hidden rounded-2xl shadow-2xl">
                            <img
                                src="/images/op_orientation/12.JPG"
                                alt="BSW Team"
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                onError={(e) => { e.target.src = "https://placehold.co/600x400?text=BSW+Team+Image"; }} 
                            />
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="w-full lg:w-1/2">
                        <div className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-3xl shadow-lg dark:shadow-none border-l-[8px] border-[#20AA9D]">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-[#e9fbf7] dark:bg-[#20AA9D]/20 rounded-full">
                                    <FaBullseye className="text-[#20AA9D] text-2xl" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Our Objective</h2>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                                BSW (Board for Student Welfare) is a constituent body of the Student Affairs Council (SAC).
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                Our primary objective is <span className="font-semibold text-[#20AA9D]">identifying issues</span> faced by the student community related to academics, social life, mental health, and career, and addressing them through targeted welfare activities and mentorship programs.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3. "How We Function" Title */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">How does the board function?</h2>
                    <div className="w-24 h-1.5 bg-[#20AA9D] mx-auto rounded-full"></div>
                </div>

                {/* 4. Operations & Mentorship Cards */}
                <div 
                    ref={cardsRef}
                    className={`grid md:grid-cols-2 gap-8 lg:gap-12 mb-24 transition-all duration-700 delay-200 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    {/* Operations Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl dark:shadow-none overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
                        <div className="bg-gradient-to-r from-[#43cea2] to-[#185a9d] p-8 text-center text-white relative overflow-hidden">
                            <FaCogs className="text-6xl mx-auto mb-4 opacity-20 absolute top-4 right-4 transform rotate-12" />
                            <FaCogs className="text-5xl mx-auto mb-3 relative z-10" />
                            <h3 className="text-3xl font-bold relative z-10">Operations</h3>
                            <p className="text-white/90 mt-2 relative z-10 font-medium">Execution & Assistance</p>
                        </div>
                        
                        <div className="p-8 flex-grow flex flex-col">
                            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                The operations committee executes welfare activities and provides financial and in-kind assistance to students. It oversees SCOOPS, SCS, and STIC.
                            </p>
                            
                            <div className="mt-auto space-y-3">
                                {[
                                    { name: "Freshers Orientation", link: "/orientation" },
                                    { name: "All Events", link: "/events" },
                                    { name: "SCOOPS", link: "/scoops" },
                                    { name: "Career Counselling", link: "/career-counselling" }
                                ].map((item, idx) => (
                                    <Link key={idx} to={item.link} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-[#e9fbf7] dark:hover:bg-[#20AA9D]/20 group transition-colors duration-300">
                                        <span className="font-semibold text-gray-700 dark:text-gray-200 group-hover:text-[#185a9d] dark:group-hover:text-[#43cea2] transition-colors">
                                            {item.name}
                                        </span>
                                        <FaChevronRight className="text-gray-300 group-hover:text-[#185a9d] dark:group-hover:text-[#43cea2] transform group-hover:translate-x-1 transition-all" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mentorship Card - UPDATED WITH CAREER PORTAL */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl dark:shadow-none overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
                        <div className="bg-gradient-to-r from-[#4facfe] to-[#00f2fe] p-8 text-center text-white relative overflow-hidden">
                            <FaUsers className="text-6xl mx-auto mb-4 opacity-20 absolute top-4 left-4 transform -rotate-12" />
                            <FaUsers className="text-5xl mx-auto mb-3 relative z-10" />
                            <h3 className="text-3xl font-bold relative z-10">Mentorship</h3>
                            <p className="text-white/90 mt-2 relative z-10 font-medium">Guidance & Support</p>
                        </div>

                        <div className="p-8 flex-grow flex flex-col">
                            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                Executes & monitors all mentorship initiatives. Every individual is provided a trained senior mentor to help take informed decisions.
                            </p>

                            <div className="mt-auto space-y-3">
                                {[
                                    { name: "Academic Mentorship", link: "https://bswacademicportal.iitd.ac.in/", external: true },
                                    { name: "Career Mentorship", link: "https://bswcareerportal.iitd.ac.in/", external: true }, // Added Link
                                    { name: "Mental Health & Counselling", link: "/mental-health" },
                                    { name: "Language Mentorship", link: "/language-mentorship" }
                                ].map((item, idx) => (
                                    <Link 
                                        key={idx} 
                                        to={item.external ? "#" : item.link} 
                                        onClick={item.external ? (e) => { e.preventDefault(); window.open(item.link, '_blank'); } : null}
                                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 group transition-colors duration-300"
                                    >
                                        <span className="font-semibold text-gray-700 dark:text-gray-200 group-hover:text-[#0072ff] dark:group-hover:text-[#4facfe] transition-colors">
                                            {item.name}
                                        </span>
                                        <FaChevronRight className="text-gray-300 group-hover:text-[#0072ff] dark:group-hover:text-[#4facfe] transform group-hover:translate-x-1 transition-all" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. Newsletter CTA Section */}
                <div 
                    ref={newsletterRef}
                    className={`relative bg-[#20AA9D] rounded-3xl p-8 md:p-16 text-center overflow-hidden transition-all duration-700 delay-300 ${newsletterVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Stay Updated with BSW Newsletter</h2>
                        <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
                            Every fresher's first peek into college life. Packed with relevant information about campus culture, events, and essential BSW initiatives.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <a
                                href="https://csciitd-my.sharepoint.com/:b:/g/personal/ee3221740_iitd_ac_in/EYitsC8coDpNrywoty7uFuABZBfqWNeOPL63GTH3zFxEUw?e=fKECjl"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#20AA9D] font-bold rounded-full hover:bg-gray-100 hover:scale-105 transition-all shadow-lg"
                            >
                                <FaDownload /> Download Newsletter
                            </a>
                            <Link
                                to="/aboutus"
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 hover:scale-105 transition-all"
                            >
                                <FaHandshake /> Meet the Team
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;