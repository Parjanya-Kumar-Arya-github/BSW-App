import React from 'react';
import GalleryGrid from '../Components/Gallery/GalleryGrid';

const DelhiDarshan = () => {
    const images = import.meta.glob('../assets/gallery/delhi-darshan/*.{png,jpg,jpeg,svg,webp}', { eager: true });
    return <GalleryGrid title="Delhi Darshan" images={images} />;
};

export default DelhiDarshan;
