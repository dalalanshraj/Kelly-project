// src/components/PropertyGrid.jsx
import React from 'react';
import PropertyCard from '../../components/PropertyCard';
import { FaCalendarAlt, FaBed, FaMapMarkerAlt, FaCogs } from 'react-icons/fa';


// Sample data with multiple images
const properties = [
    {
        id: 1,
        images: [ // Array of images
            'https://gallery.streamlinevrs.com/units-gallery/00/0B/86/thumbnail_168148442.jpeg',
            'https://gallery.streamlinevrs.com/units-gallery/00/0B/86/thumbnail_165303582.jpeg',
            'https://gallery.streamlinevrs.com/units-gallery/00/0B/86/thumbnail_166002762.jpeg'
        ],
        title: 'Chateau St Tropez',
        price: 200,
        beds: 4,
        baths: 3.5,
        guests: 10,
        link: "/Chateau-St-Tropez/",
    },
    {
        id: 2,
        images: [ // Array of images
            'https://gallery.streamlinevrs.com/units-gallery/00/06/57/thumbnail_168487579.jpeg',
            'https://gallery.streamlinevrs.com/units-gallery/00/06/BA/thumbnail_164162858.jpeg',
            'https://gallery.streamlinevrs.com/units-gallery/00/06/BA/thumbnail_168485874.jpeg'
        ],
        title: 'Drift Away',
        price: 200.00,
        beds: 3,
        baths: 3,
        guests: 9,
        link: "/Chateau-St-Tropez/",
    },
     {
        id: 3,
        images: [ // Array of images
            'https://gallery.streamlinevrs.com/units-gallery/00/06/57/thumbnail_168793173.jpeg',
            'https://gallery.streamlinevrs.com/units-gallery/00/06/57/thumbnail_168148531.jpeg',
            'https://gallery.streamlinevrs.com/units-gallery/00/06/57/thumbnail_164180537.jpeg'
        ],
        title: 'Pelican Point',
        price: 150.00,
        beds: 3,
        baths: 3,
        guests: 9,
        link: "/Chateau-St-Tropez/",
    },
     {
        id: 4,
        images: [ // Array of images
            'https://gallery.streamlinevrs.com/units-gallery/00/06/58/thumbnail_168487582.jpeg',
            'https://gallery.streamlinevrs.com/units-gallery/00/06/58/thumbnail_164180314.jpeg',
            'https://gallery.streamlinevrs.com/units-gallery/00/06/58/thumbnail_164180310.jpeg'
        ],
        title: 'Driftwood Dunes',
        price: 20.00,
        beds: 3,
        baths: 3,
        guests: 9,
        link: "/Chateau-St-Tropez/",
    },
    // Add more properties here, ensure 'images' is an array
];

const Destincommunitypool = () => {
    return (
          <>
            <section
            className="relative h-[70vh] bg-cover bg-center flex items-center justify-center text-white text-center px-40"
            style={{
              backgroundImage: `url(https://www.destinluxurybeachrentals.com/wp-content/uploads/2025/08/Untitled-design-73.png)`,
            }}
          >
            <div className="absolute inset-0 bg-[#00000000] bg-opacity-60 z-0"></div>
    
            <div className="relative z-10 max-w-3xl">
              <h3 className="text-5xl font-semibold mt-20">Community Pools</h3>
              
              
            </div>
          </section>
        <div className="bg-gray-200 p-4 rounded-md shadow-md mt-10 mx-90">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
        {/* Arrival Input */}
        <div className="flex-1 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Arrival"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 pr-10"
            />
            <FaCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Departure Input */}
        <div className="flex-1 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Departure"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 pr-10"
            />
            <FaCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Bedrooms Dropdown */}
        <div className="flex-1 w-full md:w-auto">
          <div className="relative">
            <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none">
              <option>Bedrooms</option>
              <option>1</option>
              <option>2</option>
              <option>3+</option>
            </select>
            <FaBed className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Location Dropdown */}
        <div className="flex-1 w-full md:w-auto">
          <div className="relative">
            <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none">
              <option>Location</option>
              <option>Destin Area</option>
              <option>Florida</option>
            </select>
            <FaMapMarkerAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        
        {/* Refine Search Button */}
        <button className="w-full md:w-auto bg-teal-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center space-x-2">
          <span>REFINE SEARCH</span>
          <FaCogs />
        </button>
      </div>
    </div>
        <div className="container mx-auto p-4"> {/* mx-auto centers the container */}
            {/* The rest of your grid code */}
            <div className="grid grid-cols-2  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 ">
                {properties.map(property => (
                    <PropertyCard key={property.id} {...property} />
                ))}
            </div>
        </div>
<section className="w-full flex justify-center py-12 md:py-19 px-4 sm:px-6 lg:px-8 bg-gray-100 ">
      <div className="max-w-9xl w-full flex flex-col md:flex-row overflow-hidden  pt-4">
        
        {/* Left Side (Image) */}
        <div 
          className="relative w-full h-100 md:w-1/2 md:h-auto bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://www.destinluxurybeachrentals.com/wp-content/uploads/2025/08/Untitled-design-74.png')",
            // backgroundAttachment: "fixed" // This fixes the image position
          }}
        >
          {/* Optional: Add an overlay for a subtle effect */}
          <div className="absolute inset-0 bg-black opacity-10"></div>
        </div>

        {/* Right Side (Text Content) */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 bg-white">
          <h2 className="text-4xl md:text-4xl font-serif text-gray-800 tracking-wide mb-6 uppercase text-start">
            Looking for Destin vacation rentals with community pool access?
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            🏊‍♂️You’ve come to the right place! Our rentals offer the ideal combination of comfort, space, and convenience—perfect for family trips, group vacations, or a peaceful beach retreat. Even better, you’ll enjoy the added benefit of a resort-style community pool just steps away from your rental home.
                 </p>
                 <p className="text-gray-600 text-lg leading-relaxed mb-8">Whether you’re planning a quick weekend escape or a longer stay, we offer a relaxing home base for your beach getaway.</p>
                 <p className="text-gray-600 text-lg leading-relaxed mb-8">🛟Browse our full selection with community pool access and find your ideal home today. Whether you’re here for a few days or a week, you’ll enjoy the comfort, location, and amenities that make your stay truly special.</p>
          <a
            href="#"
            className="inline-block px-8 py-3 bg-gray-700 text-white font-medium rounded hover:bg-gray-800 transition-colors duration-300"
          >
            Book & Save
          </a>
        </div>
      </div>
    </section>
        
          </>
    );
};

export default Destincommunitypool;