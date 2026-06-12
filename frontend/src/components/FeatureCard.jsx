// src/components/FeatureCard.jsx
import React from "react";


const FeatureCard = ({ title, subtitle, imageSrc, link }) => {
  return (
    <a href={link} className="relative block w-full p-1 h-[70vh] overflow-hidden group">
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in"
      />
      <div className="absolute inset-0 bg-[#000000c6] opacity-60 group-hover:opacity-10 transition-opacity duration-500"></div>

      {/* Visible content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white text-center">
        <h2 className="text-3xl lg:text-4xl font-light  duration-300">
          {/* opacity-0 group-hover:opacity-100 transition-opacity */}
          {title}
        </h2>
        <p className="text-xl  duration-300 mt-2">
          {subtitle}
        </p>
      </div>

      {/* Border effect */}
      <div className="absolute inset-4 border-2  border-white transition-all duration-300"></div>
    </a>
    
  );
};

export default FeatureCard;