import React from "react";
import { MdBrokenImage } from "react-icons/md";

const EventCard = ({ number, title, tagline, description, image, color }) => {
  return (
    <div 
      className={`${color} rounded-2xl p-4 relative flex flex-col h-full text-white shadow-lg dark:shadow-black/40 transition-transform duration-300 hover:scale-[1.02]`}
    >
      {/* Number Badge */}
      <div className="absolute top-4 right-4 border border-white rounded-sm w-9 h-9 flex items-center justify-center text-md font-bold ">
        {number}
      </div>

      {/* Title Area - Fixed min-height aligns the bottom of titles */}
      {/* min-h-[3.5rem] ensures space for roughly 2 lines of text */}
      <div className="mt-3 mb-1 min-h-[3.5rem] flex items-center">
        <h3 className="text-3xl md:text-4xl font-inter font-semibold leading-tight pr-8">
          {title}
        </h3>
      </div>

      {/* Tagline Area - Fixed min-height aligns the start of descriptions */}
      <div className="mb-3 min-h-[1.5rem] flex items-center">
        <p className="font-medium font-inter text-xl md:text-base text-white">
          {tagline}
        </p>
      </div>

      {/* Description Area - Fixed height aligns the start of images */}
      {/* min-h-[5rem] reserves space for about 4 lines */}
      <div className="mb-2 min-h-[5rem]">
        <p className="text-md md:text-sm font-inter leading-relaxed text-white line-clamp-4">
          {description}
        </p>
      </div>

      {/* Image Container */}
      <div className="mt-auto aspect-video bg-black/10 rounded-xl overflow-hidden border border-white/10 shadow-inner">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentNode.classList.add('flex', 'items-center', 'justify-center');
              e.target.parentNode.innerHTML = '<span class="text-white/50 text-2xl"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M21 5v6.59l-3-3.01-4 4.01-4-4-4 4-3-3.01V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2zm-3 6.42 3 3.01V19c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-6.58l3 2.99 4-4 4 4 4-3.99z"></path></svg></span>';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/30">
            <MdBrokenImage size={32} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;