import React, { useState } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import useReveal from '../../common/Reveal';

const GalleryGrid = ({ title, images }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [headerRef, headerVisible] = useReveal();
    const [galleryRef, galleryVisible] = useReveal();

    const imageList = Object.values(images).map((mod) => mod.default || mod);

    const openLightbox = (index) => {
        setCurrentIndex(index);
        setSelectedImage(imageList[index]);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    const nextImage = (e) => {
        e.stopPropagation();
        const nextIdx = (currentIndex + 1) % imageList.length;
        setCurrentIndex(nextIdx);
        setSelectedImage(imageList[nextIdx]);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        const prevIdx = (currentIndex - 1 + imageList.length) % imageList.length;
        setCurrentIndex(prevIdx);
        setSelectedImage(imageList[prevIdx]);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-800 pt-24 pb-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div
                ref={headerRef}
                className={`transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                <h1 className="text-4xl md:text-5xl font-bold text-center text-[#20AA9D] mb-4 font-montserrat">
                    {title}
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-[#67B26F] to-[#4CA2CD] mx-auto mb-12 rounded-full"></div>
            </div>

            {imageList.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">No images found for this gallery.</p>
            ) : (
                <div 
                    ref={galleryRef}
                    className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto transition-all duration-700 ${galleryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                    {imageList.map((imgSrc, index) => (
                        <div
                            key={index}
                            onClick={() => openLightbox(index)}
                            className="group relative aspect-square overflow-hidden rounded-xl shadow-lg dark:shadow-slate-900 cursor-pointer bg-white dark:bg-neutral-700"
                        >
                            <img
                                src={imgSrc}
                                alt={`${title} ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                    <span className="text-white border border-white px-4 py-1 rounded-full text-sm font-medium">
                                        View
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
                    onClick={closeLightbox}
                >
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 text-white hover:text-gray-300 z-[70] p-2"
                    >
                        <FaTimes size={30} />
                    </button>

                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-[70] p-4 hidden md:block"
                    >
                        <FaChevronLeft size={40} />
                    </button>

                    <img
                        src={selectedImage}
                        alt="Full screen"
                        className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl rounded-sm"
                        onClick={(e) => e.stopPropagation()}
                    />

                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-[70] p-4 hidden md:block"
                    >
                        <FaChevronRight size={40} />
                    </button>

                    <div className="absolute bottom-4 left-0 w-full text-center text-white/80 font-medium">
                        {currentIndex + 1} / {imageList.length}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GalleryGrid;
