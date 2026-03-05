import React from 'react';
import { FaFileDownload, FaExternalLinkAlt, FaBook, FaLink } from 'react-icons/fa';
import useReveal from '../common/Reveal';

/**
 * ResourcePageTemplate Component
 * 
 * A reusable template for resource-heavy pages (Question Papers, Forms, Quick Links, etc.)
 * 
 * Props:
 * - title: Main page title (string)
 * - subtitle: Optional subtitle (string)
 * - description: page description (string)
 * - resources: Array of resource objects. Each object can have:
 *      - title: Title of the resource item
 *      - description: Brief description
 *      - link: URL
 *      - linkText: Text for the link button (default: "View / Download")
 *      - icon: Optional icon component (default based on type)
 *      - category: Grouping category (string) - if used, resources will be grouped by this
 * - image: Optional header image URL (string)
 */

const ResourcePageTemplate = ({ title, subtitle, description, resources = [], image }) => {
    const [headerRef, headerVisible] = useReveal();
    const [contentRef, contentVisible] = useReveal();

    // Handle click to both download and open in new tab
    const handleLinkClick = (e, link) => {
        e.preventDefault();
        // Open in new tab
        window.open(link, '_blank');
        // Trigger download
        const downloadLink = document.createElement('a');
        downloadLink.href = link;
        downloadLink.download = '';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    // Group resources by category if categories exist
    const groupedResources = resources.reduce((acc, item) => {
        const category = item.category || 'General';
        if (!acc[category]) acc[category] = [];
        acc[category].push(item);
        return acc;
    }, {});

    const categories = Object.keys(groupedResources);

    return (
        <div className="min-h-screen bg-[#e9fbf7] dark:bg-neutral-800 pt-20 pb-20 transition-colors duration-300">
            {/* Header Section */}
            <div 
                ref={headerRef}
                className={`relative bg-gradient-to-br from-[#20AA9D]/10 to-white dark:from-[#20AA9D]/20 dark:to-dark-card py-16 px-4 mb-12 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4 font-montserrat tracking-tight">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-xl text-[#20AA9D] font-medium font-serif italic mb-6">
                            "{subtitle}"
                        </p>
                    )}
                    <div className="w-24 h-1 bg-[#20AA9D] mx-auto rounded-full mb-8"></div>

                    {description && (
                        <p className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div 
                ref={contentRef}
                className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                {categories.map((category, idx) => (
                    <div key={idx} className="mb-16">
                        {categories.length > 1 && (
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 border-l-4 border-[#20AA9D] pl-4">
                                {category}
                            </h2>
                        )}

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {groupedResources[category].map((item, index) => (
                                <div key={index} className="bg-white dark:bg-neutral-700 rounded-xl shadow-md dark:shadow-slate-900 p-6 border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300 flex flex-col">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3 bg-teal-50 dark:bg-teal-900/30 text-[#20AA9D] rounded-lg">
                                            {item.icon ? <item.icon /> : (item.link && item.link.endsWith('.pdf') ? <FaFileDownload size={20} /> : <FaLink size={20} />)}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{item.title}</h3>

                                    {item.description && (
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow">
                                            {item.description}
                                        </p>
                                    )}

                                    <div className="mt-auto">
                                        <a
                                            href={item.link}
                                            onClick={(e) => handleLinkClick(e, item.link)}
                                            className="inline-flex items-center text-[#20AA9D] font-bold hover:text-teal-700 transition-colors cursor-pointer"
                                        >
                                            {item.linkText || (item.link && item.link.endsWith('.pdf') ? "Download PDF" : "Visit Link")}
                                            {item.link && item.link.endsWith('.pdf') ? <FaFileDownload className="ml-2" /> : <FaExternalLinkAlt className="ml-2 text-xs" />}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResourcePageTemplate;
