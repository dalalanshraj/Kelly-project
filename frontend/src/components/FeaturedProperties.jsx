import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FeaturedProperties = () => {
 const cards = [
  {
    title: "SANDY FEET RETREAT | PRIVATE POOL",
    details: "5 Bedrooms | 5 Bathrooms",
    image:
      "https://www.destinluxurybeachrentals.com/wp-content/uploads/2025/07/san.jpeg",
    url: "/properties/sandy-feet-retreat", // यह URL जोड़ें
  },
  {
    title: "MISS ELLIE",
    details: "3 Bedrooms | 2 Bath",
    image:
      "https://www.destinluxurybeachrentals.com/wp-content/uploads/2024/06/Miss-Ellie.jpg",
    url: "/properties/miss-ellie", // यह URL जोड़ें
  },
  {
    title: "THE POMPANO BEACH VIEW | COMMU...",
    details: "3 Beds | 2 Baths | Sleeps 8",
    image:
      "https://www.destinluxurybeachrentals.com/wp-content/uploads/2020/03/Screenshot_20200131-082723_2-e1583515595836.png",
    url: "/properties/pompano-beach-view", // यह URL जोड़ें
  },
  {
    title: "LUXURY BEACH VILLA",
    details: "4 Beds | 3 Baths | Ocean View",
    image:
      "https://www.destinluxurybeachrentals.com/wp-content/uploads/2020/05/MVIMG_20200301_123421-scaled.jpg",
    url: "/properties/luxury-beach-villa", // यह URL जोड़ें
  },
];

  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-serif text-center mb-8">
        FEATURED PROPERTIES
      </h2>

      <div className="relative flex items-center">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-0 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Cards */}
        <div className="flex w-full overflow-hidden justify-center relative">
          <div
            className="flex transition-transform ease-out duration-500 w-full"
            style={{ transform: `translateX(-${current * (100 / 3)}%)` }}
          >
            {cards.map((card, index) => (
              <div
                key={index}
                className="w-1/3 flex-shrink-0 p-2 cursor-pointer"
              >
                <div className="bg-white shadow-lg rounded-lg  ">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-64 object-cover hover:scale-105 transform  transition duration-500"
                  />
                  <div className="p-4 text-center">
                    <h3 className="font-serif text-lg">{card.title}</h3>
                    <hr className="w-10 border-t-2 border-teal-400 my-2 mx-auto" />
                    <p className="text-gray-600">{card.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-0 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default FeaturedProperties;      