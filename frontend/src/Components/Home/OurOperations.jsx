import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import Scoops from "../../assets/imagesv2/CoreSection/Scoops.png";
import Mentorship from "../../assets/imagesv2/CoreSection/mentorship.png";
import FinancialAid from "../../assets/imagesv2/CoreSection/financial_aid.png";

const OurOperations = () => {
  return (
    <section className="bg-white dark:bg-[#121212] py-20 px-6 flex justify-center" id="operations">
      <div className="max-w-[1550px] mx-auto w-full">
        
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-start pl-0 md:pl-[40px]">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 font-montserrat tracking-tight mb-6">
            Our Core Operations
          </h2>
          <p className="max-w-4xl text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed font-roboto">
            BSW (Board for Student Welfare) is a student-driven body with representatives from every hostel, working alongside faculty to ensure student support, access to opportunities, and a better campus experience for all.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          
          {/* Large Card: Financial Aid */}
          <div 
            className="lg:col-span-2 rounded-[40px] p-8 md:p-16 flex flex-col justify-end min-h-[500px] lg:min-h-[600px] relative overflow-hidden group transition-transform hover:scale-[1.02] duration-500"
            style={{ 
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%), url(${FinancialAid})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
          >
             <div className="relative z-10">
               <h4 className="text-sm md:text-base font-bold tracking-widest uppercase text-gray-300 mb-4">Financial Aid</h4>
               <h3 className="text-4xl md:text-7xl font-bold font-montserrat text-white mb-10 leading-tight">
                 Loans & Financial <br/> Support
               </h3>
               <Link to="/loans" className="inline-flex items-center gap-2 md:gap-3 bg-[#6EE7B7] text-black font-bold px-6 py-3 md:px-8 md:py-4 rounded-full text-sm md:text-lg hover:bg-[#5cd6a5] hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(110,231,183,0.3)] whitespace-nowrap">
                 APPLY FOR ASSISTANCE <FaArrowRight />
               </Link>
             </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            
            {/* Top Card: SCOOPS */}
            <div 
                className="flex-1 rounded-[40px] p-8 md:p-12 flex flex-col justify-center min-h-[300px] relative overflow-hidden transition-transform hover:scale-[1.01] duration-300"
                style={{ 
                    backgroundImage: `linear-gradient(to right, rgba(255,255,255,1) 30%, rgba(255,255,255,0) 100%), url(${Scoops})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'right'
                }}
            >
              <div className="relative z-10">
                <h4 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-3">Student Cooperative</h4>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 font-montserrat mb-8 leading-tight">
                    SCOOPS <br/> Stationery Shop
                </h3>
                <Link to="/scoops" className="inline-flex items-center gap-2 bg-[#6EE7B7] text-black font-bold px-6 py-3 rounded-full hover:bg-[#5cd6a5] transition-colors shadow-sm">
                    LEARN MORE <FaArrowRight />
                </Link>
              </div>
            </div>

            {/* Bottom Card: Mentorship */}
            <div 
                className="flex-1 rounded-[40px] p-8 md:p-12 flex flex-col justify-center min-h-[300px] relative overflow-hidden transition-transform hover:scale-[1.01] duration-300"
                style={{ 
                    backgroundImage: `linear-gradient(to right, rgba(243,244,246,1) 30%, rgba(243,244,246,0) 100%), url(${Mentorship})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'right'
                }}
            >
              <div className="relative z-10">
                <h4 className="text-sm font-bold tracking-widest uppercase text-[#20AA9D] mb-3">Career Mentorship</h4>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 font-montserrat mb-8 leading-tight">
                    Career <br/> Mentorship
                </h3>
                <Link to="/mentorship/alumni" className="inline-flex items-center gap-2 bg-[#6EE7B7] text-black font-bold px-6 py-3 rounded-full hover:bg-[#5cd6a5] transition-colors shadow-sm">
                    EXPLORE <FaArrowRight />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default OurOperations;