import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import useReveal from '../../common/Reveal';
import fresherOrientation from "../../assets/imagesv2/CampusLife/FresherOrientation.png";
import speranza from "../../assets/imagesv2/CampusLife/Speranza.png";
import delhiDarshan from "../../assets/imagesv2/CampusLife/DelhiDarshan.jpg";

const LegendItem = ({ title, description, image, align = 'left' }) => {
    const [ref, visible] = useReveal();
    const isLeft = align === 'left';

    return (
        <div 
            ref={ref}
            className={`flex flex-col font-inter md:flex-row gap-8 md:gap-16 items-center mb-20 md:mb-20 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            {/* Image Section - Order depends on alignment */}
            <div className={`w-full md:w-1/2 aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl ${isLeft ? 'md:order-1' : 'md:order-2'}`}>
                <img 
                    src={image} 
                    alt={title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                />
            </div>

            {/* Text Section */}
            <div className={`w-full md:w-1/2 flex flex-col items-start ${isLeft ? 'md:order-2' : 'md:order-1'}`}>
                <h3 className="text-5xl md:text-6xl font-bold font-montserrat text-gray-800 dark:text-white mb-4">
                    {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8 font-inter">
                    {description}
                </p>
                <button className="group bg-black dark:bg-white hover:bg-[#20AA9D] dark:hover:bg-[#20AA9D] text-gray-50 dark:text-gray-800 hover:text-white px-6 py-3 rounded-full font-bold transition-all duration-300 flex items-center gap-2">
                    Explore Event
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

const LegendsSection = () => {
    const legends = [
        {
            title: "Fresher's Orientation",
            description: "BSW is primarily a student body consisting of student representatives from each hostel and a few faculty members. We ensure your first steps at IIT Delhi are confident and clear.",
            image: fresherOrientation, // Replace with local asset
            align: "left"
        },
        {
            title: "Speranza",
            description: "Welfare. Culture. Chaos. Our annual youth extravaganza. Speranza isn't your typical fest; it's a platform for social change, artistic expression, and mental health awareness with over 50+ workshops.",
            image: speranza, // Replace with local asset
            align: "right"
        },
        {
            title: "Delhi Darshan",
            description: "The City is your Classroom  We pack 50 buses and take 2000 freshers to the heart of India. From the spices of Old Delhi to the serenity of Lotus Temple.",
            image:delhiDarshan, // Replace with local asset
            align: "left"
        }
        
    ];

    return (
        <section className="py-20 px-4  max-w-7xl mx-auto">
            <h2 className="text-7xl font-inter font-bold text-gray-800 dark:text-gray-100 mb-16 font-montserrat">
                The Legends
            </h2>
            {legends.map((item, idx) => (
                <LegendItem  key={idx} {...item} />
            ))}
        </section>
    );
};

export default LegendsSection;