import React from 'react';
import GalleryGrid from '../Components/Gallery/GalleryGrid';

const Speranza = () => {
    const images = import.meta.glob('../assets/gallery/speranza/*.{png,jpg,jpeg,svg,webp}', { eager: true });
    return <GalleryGrid title="Speranza" images={images} />;
};

export default Speranza;
