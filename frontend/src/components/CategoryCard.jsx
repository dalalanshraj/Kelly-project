// src/components/CategoryCard.jsx
import React from 'react';

const CategoryCard = ({ title, imageSrc, link }) => {
  return (
    <a 
      href={link} 
      className="relative block w-full h-full overflow-hidden group border-2 border-transparent transition-all duration-300"
    >
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
      />
      
      {/* Overlay to darken the image slightly */}
      <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-40 transition-opacity duration-300"></div>

      {/* Content with border on hover */}
      <div className="absolute inset-4 flex items-center justify-center p-4 text-white text-center">
        {/* The border appears on hover around this container */}
        <div className="relative w-full h-[44vh] border-2  border-white transition-all duration-300">
          <h2 className="absolute inset-0 flex items-center justify-center text-xl md:text-2xl font-serif tracking-widest uppercase">
            {title}
          </h2>
        </div>
      </div>
    </a>
  );
};

export default CategoryCard;