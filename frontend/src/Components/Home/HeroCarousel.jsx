import React, { useState, useEffect, useCallback } from "react";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slides Data
  const slides = [
    {
      id: 1,
      title: "We Have got",
      subtitle: "your back",
      description: "Support & Guidance for every step of your IITD journey.",
    },
    {
      id: 2,
      title: "Empowering",
      subtitle: "Student Life",
      description: "Mentorship, Wellness, and Growth opportunities.",
    },
    {
      id: 3,
      title: "Join the",
      subtitle: "Community",
      description: "Events, Activities, and Connection.",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full max-w-[1600px] mx-auto px-4 md:px-6 mt-4 mb-6">
      {/* FIX: Added max-h-[850px] 
         This prevents the carousel from growing taller than 850px 
         when the user zooms out or uses a vertical monitor.
      */}
      <div className="relative h-[60vh] min-h-[500px] md:h-[80vh] max-h-[850px] w-full rounded-[35px] overflow-hidden bg-[#D3D3D3] dark:bg-[#121212] shadow-sm">
        {/* Slides Container */}
        <div className="absolute inset-0 w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 flex flex-col justify-end p-8 md:p-16 transition-all duration-[450ms] ease-in-out transform
                ${index === currentSlide ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 pointer-events-none"}
              `}
            >
              <div className="max-w-5xl mb-12 md:mb-20">
                <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold font-montserrat text-white mix-blend-difference mb-2 leading-[1.1] tracking-tight">
                  {slide.title} <br />
                  <span className="opacity-90">{slide.subtitle}</span>
                </h1>

                <p
                  className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium max-w-2xl opacity-0 animate-fadeIn"
                  style={{
                    animationDelay: "0.3s",
                    animationFillMode: "forwards",
                  }}
                >
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Navigation */}
        <div className="absolute bottom-8 left-8 md:left-16 flex items-center gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-500 ease-out 
                ${
                  index === currentSlide
                    ? "w-12 bg-gray-900 dark:bg-white"
                    : "w-2.5 bg-gray-400 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-400"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
