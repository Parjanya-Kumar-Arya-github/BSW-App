import React, { useRef } from 'react';
import { motion, useTransform, useScroll, useSpring } from 'framer-motion';

// Import images
import first from "../../assets/imagesv2/Strip/1.webp";
import second from "../../assets/imagesv2/Strip/2.webp";
import third from "../../assets/imagesv2/Strip/3.webp";
import fourth from "../../assets/imagesv2/Strip/4.webp";
import fifth from "../../assets/imagesv2/Strip/5.webp";
import sixth from "../../assets/imagesv2/Strip/6.webp";
import seventh from "../../assets/imagesv2/Strip/7.webp";
import eighth from "../../assets/imagesv2/Strip/8.webp";


const GalleryItem = ({ image, title, index }) => {
    const positionInCycle = index % 3;
    let containerClasses = "";

    if (positionInCycle === 0) {
        containerClasses = "w-[280px] h-[180px] md:w-[350px] md:h-[200px] self-center";
    } else if (positionInCycle === 1) {
        containerClasses = "w-[200px] h-[280px] md:w-[230px] md:h-[350px] self-end mb-2 md:mb-8";
    } else {
        containerClasses = "w-[200px] h-[280px] md:w-[230px] md:h-[350px] self-start mt-2 md:mt-8";
    }

    return (
        <div 
            className={`
                relative flex-shrink-0 rounded-[2rem] overflow-hidden shadow-xl dark:shadow-black/50 
                hover:scale-105 transition-transform duration-500 cursor-pointer group
                ${containerClasses}
                transform-gpu
            `}
        >
            <img 
                src={image} 
                alt={title} 
                decoding="async"
                loading="lazy"
                className="w-full h-full object-cover filter brightness-90 group-hover:brightness-110 transition-all duration-500" 
            />
        </div>
    );
};

const GalleryAnimation = () => {
    const targetRef = useRef(null);
    
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    // --- SMOOTHING LOGIC START ---
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 20,
        restDelta: 0.001
    });
    
    // We now transform the SMOOTH progress instead of the raw scroll progress
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]);
    // --- SMOOTHING LOGIC END ---

    const galleryItems = [
        { id: 1, title: "Orientation Day", image: first },
        { id: 2, title: "Speranza Night", image: second  },
        { id: 3, title: "Workshops", image: third },
        { id: 4, title: "Guest Lectures", image: fourth },
        { id: 5, title: "Cultural Parade", image: fifth },
        { id: 6, title: "Sports Meet", image: sixth },
        { id: 7, title: "Prize Distribution", image: seventh },
        { id: 8, title: "Orientation Day", image: eighth },
        { id: 9, title: "Speranza Night", image: third },
        { id: 10, title: "Workshops", image: fourth },
        { id: 11, title: "Guest Lectures", image: fifth },
        { id: 12, title: "Cultural Parade", image: sixth },
        { id: 13, title: "Sports Meet", image: third },
        { id: 14, title: "Prize Distribution", image: fourth },
    ];

    return (
        <div ref={targetRef} className="w-full overflow-hidden mb-12 md:mb-36 bg-transparent z-20 transition-colors duration-300 relative min-h-[400px] md:min-h-[500px]">
            <motion.div 
                // will-change-transform tells the browser to use the GPU
                className="flex z-20 gap-4 md:gap-8 min-h-[350px] md:h-[600px] pl-4 md:pl-10 will-change-transform"
                style={{ x, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }} 
            >
                {galleryItems.map((item, index) => (
                    <GalleryItem key={item.id} index={index} {...item} />
                ))}
            </motion.div>
        </div>
    );
};

export default GalleryAnimation;