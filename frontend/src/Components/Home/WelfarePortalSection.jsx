import React from 'react';

import group55Background from '../../assets/images/Group 55-2.png'; 
import group55DarkBackground from '../../assets/images/Group 55-DarkMode.png'; 
import mentalhealth from '../../assets/imagesv2/WelfareSection/mental.png';
import acad from '../../assets/imagesv2/WelfareSection/Acad.png';
import career from '../../assets/imagesv2/WelfareSection/careerBg.png';
import language from '../../assets/imagesv2/WelfareSection/language.png';

const WelfarePortalSection = () => {
  const cards = [
    {
      id: 1,
      title: "Academic Mentorship",
      description: "Stuck with academics? We'll help you find the right guidance and resources.",
      bgColor: "bg-[#F2D06B]", // Matching the warm yellow in the screenshot
      image: acad,
      link: "https://bswacademicportal.iitd.ac.in/"
    },
    {
      id: 2,
      title: "Career Mentorship",
      description: "Confused about your path? Get clarity, direction, and mentorship.",
      bgColor: "bg-[#F2D06B]",
      image: career,
      link: "https://bswcareerportal.iitd.ac.in/"
    },
    {
      id: 3,
      title: "Language Mentorship",
      description: "Struggling with communication? We'll help you build confidence and fluency.",
      bgColor: "bg-[#F2D06B]",
      image: language,
      link: "/language-mentorship"
    },
    {
      id: 4,
      title: "Mental Health Mentorship",
      description: "Feeling overwhelmed? Reach out — you don't have to handle it alone.",
      bgColor: "bg-[#F2D06B]",
      image: mentalhealth,
      link: "https://mentalhealth-bsw.iitd.ac.in/"
    }
  ];

  return (
    <section className="relative w-full -mt-32 md:-mt-64 z-0 min-h-[1200px] md:min-h-[1700px] flex flex-col overflow-hidden bg-transparent dark:bg-[#121212]" id='welfare-portal'>
      
      {/* 1. UPPER PART: Background Image (Group 55) */}
      <div className="hidden md:block absolute inset-0 w-full h-full z-0">
        <img 
          src={group55Background} 
          alt="Welfare Background" 
          className="w-full h-full object-cover object-bottom dark:hidden"
        />
        <img 
          src={group55DarkBackground} 
          alt="Welfare Background Dark" 
          className="w-full h-full object-cover object-bottom hidden dark:block"
        />
      </div>

      {/* 3. CONTENT CONTAINER */}
      <div className="relative z-10 w-full h-full flex flex-col pt-[100px]">
        
        {/* Header Text */}
        <div className="relative z-20 w-full max-w-[1550px] mx-auto px-6 mb-20">
          <div className="pl-0 md:pl-[40px]">
            <h2 className="text-5xl md:text-7xl font-bold text-gray-800 dark:text-white font-montserrat tracking-tight mb-6 leading-[1.1]">
              We’re Here When <br /> You Need Us
            </h2>
            <p className="max-w-2xl text-gray-800 dark:text-gray-200 text-xl md:text-2xl leading-relaxed font-roboto">
              Whatever you’re facing — academic, personal, or otherwise — reach out and we’ll help you find the right support.
            </p>
          </div>
        </div>

        {/* Portal Cards */}
        <div className="w-full px-6 md:px-12 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card) => (
              <a 
                href={card.link}
                key={card.id} 
                className={`${card.bgColor} rounded-[35px] p-6 h-[550px] flex flex-col relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 shadow-2xl border-4 border-black/5`}
              >
                {/* Text Content */}
                <div className="z-10">
                  <h3 className="text-3xl font-bold mb-3 leading-[1.1] font-montserrat text-black tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-lg font-medium leading-snug text-black/80 max-w-[90%]">
                    {card.description}
                  </p>
                </div>

                {/* Image Container - Replaces the Grey Placeholder */}
                <div className="mt-auto w-full h-[65%] rounded-[25px] overflow-hidden shadow-inner relative">
                    <img 
                        src={card.image} 
                        alt={card.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WelfarePortalSection;