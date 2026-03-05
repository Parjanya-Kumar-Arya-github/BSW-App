import React from 'react';
import GalleryGrid from '../Components/Gallery/GalleryGrid';

const Orientation = () => {
    const images = import.meta.glob('../assets/gallery/orientation/*.{png,jpg,jpeg,svg,webp}', { eager: true });
    return <GalleryGrid title="Freshers Orientation" images={images} />;
};

export default Orientation;
