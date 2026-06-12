// src/components/PropertyCard.jsx
import React, { useState } from 'react';
import { FaHeart, FaPaw, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import chevrons


const PropertyCard = ({ images, title, price, beds, baths, guests , link}) => { // Changed 'image' to 'images'
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToPreviousImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        // Added 'group' class for hover animations
        <div className="relative rounded-lg overflow-hidden shadow-lg bg-white w-full max-w-lg mx-[10vh] group mt-20">
            {/* Image Slider Container */}
            <div className="relative">
                <a href={link}>
                <img
                    src={images[currentImageIndex]} // Use current image from array
                    alt={title}
                    className="w-full h-48 object-cover  transform group-hover:scale-105 transition-transform duration-300 ease-in"
                />
                  <div className="absolute inset-0 bg-[#000000] opacity-20"></div>
                <div className="absolute top-2 left-2 bg-white/70 text-sm px-2 py-1 rounded-full backdrop-blur-sm">
                    Destin Area
                </div>
                {/* Icons */}
                <div className="absolute top-2 right-2 flex space-x-2">
                    <span className="bg-white/70 p-2 rounded-full backdrop-blur-sm">
                        <FaPaw className="text-gray-700" />
                    </span>
                    <span className="bg-white/70 p-2 rounded-full backdrop-blur-sm">
                        <FaHeart className='bg-transparent' />
                    </span>
                </div>
</a>
                {/* Slider Navigation Arrows */}
                {images.length > 1 && ( // Only show arrows if more than one image
                    <>
                        <button
                            onClick={goToPreviousImage}
                            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full ml-2 focus:outline-none"
                        >
                            <FaChevronLeft />
                        </button>
                        <button
                            onClick={goToNextImage}
                            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full mr-2 focus:outline-none"
                        >
                            <FaChevronRight />
                        </button>
                    </>
                )}
            </div>

            {/* Content Section - unchanged */}
            <div className="p-4 flex flex-col items-center text-center">
                <div className="flex text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                        <FaStar key={i} />
                    ))}
                </div>
                <h3 className="text-xl font-medium mb-1">{title}</h3>
                <div className="text-sm text-black mb-2">
                    Starting At <strong className="text-gray-900 text-lg">${price} Daily</strong>
                </div>
                <div className="text-black text-sm">
                    Beds {beds} | Baths {baths} | Guests {guests}
                </div>
            </div>

            {/* Hover Animation Element */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-bottom-left"></div>
        </div>
    );
};

export default PropertyCard;