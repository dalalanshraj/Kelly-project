import React from "react";
import { useState , useEffect } from "react";
import CategoryCard from "./CategoryCard";
import pool from "../assets/amenitiesImg/CommunityPool.jpg"
import Gulf from "../assets/amenitiesImg/GulfOceanFront.jpeg"
import Lake from "../assets/amenitiesImg/LakeView.jpg"
import Deck from "../assets/amenitiesImg/Deck.jpg"
import Restaurants from "../assets/amenitiesImg/Restaurants.jpg"
import Heatedspa from "../assets/amenitiesImg/Heatedspa.jpg"
const CategorySection = () => {
  const [selectedAmenity, setSelectedAmenity] =
  useState(null);
 const amenities = [
  {
    id: 1,
    title: "Community Pool",
    imageSrc: pool,
    communities: [
      "Seychelles Properties",
      "Laketown Wharf Properties",
    ],
    description:
      "Enjoy access to a resort-style community pool where you can relax, soak up the Florida sunshine, and create lasting memories just moments from the beach.",
  },

  {
    id: 2,
    title: "Gulf/Ocean Front",
    imageSrc: Gulf,
    communities: [
      "Seychelles Properties",
      "Shores Of Panama Properties",
    ],
    description:
      "Experience breathtaking Gulf and oceanfront views from your vacation rental. Enjoy direct beach access, stunning sunsets, and the soothing sound of waves, creating the perfect setting for a relaxing and unforgettable coastal getaway with family and friends.",
  },

  {
    id: 3,
    title: "Lake View",
    imageSrc: Lake,
    communities: [
      "Laketown Wharf Properties",
    ],
    description:
      " Take in beautiful lake views that provide a peaceful and relaxing atmosphere throughout your stay. Whether enjoying your morning coffee or watching the sunset, the scenic surroundings offer a tranquil escape from everyday life.",
  },

  {
    id: 4,
    title: "Deck",
    imageSrc: Deck,
    communities: [
      "Seychelles Properties",
      "Shores Of Panama Properties",
    ],
    description:
      " Spend quality time on your private deck while enjoying fresh coastal breezes and beautiful surroundings. It's the perfect place to relax, dine outdoors, gather with loved ones, or simply take in the views.",
  },

  {
    id: 5,
    title: "Restaurants",
    imageSrc: Restaurants,
    communities: [
      "Laketown Wharf Properties",
      "Shores Of Panama Properties",
    ],
    description:
      " Enjoy convenient access to a variety of nearby restaurants offering fresh seafood, local specialties, and family-friendly dining. From casual beachfront cafes to upscale dining experiences, there's something to satisfy every taste during your stay.",
  },

  {
    id: 6,
    title: "Beachfront Hot Tub / Heated Spa",
    imageSrc: Heatedspa,
    communities: [
      "Seychelles Properties",
      "Shores Of Panama Properties",
    ],
    description:
      " Unwind in the beachfront hot tub and heated spa while taking in stunning coastal views. Relax in warm, soothing waters after a day at the beach and enjoy a true resort-style vacation experience",
  },
];

  return (
  <>
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-[#1d2b44] mb-4">
          RESORT AMENITIES
        </h2>

        <p className="max-w-3xl mx-auto text-gray-600 mb-12 text-lg">
          Enjoy premium amenities designed to make your stay at Seychelles,
          Laketown Wharf, and Shores Of Panama comfortable, relaxing, and
          unforgettable.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedAmenity(item)}
              className="cursor-pointer"
            >
              <CategoryCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>

    {selectedAmenity && (
      <div
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        onClick={() => setSelectedAmenity(null)}
      >
        <div
          className="bg-white max-w-2xl w-full rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={selectedAmenity.imageSrc}
            alt={selectedAmenity.title}
            className="w-full h-72 object-cover"
          />

          <div className="p-6">
            <h3 className="text-3xl font-bold mb-4">
              {selectedAmenity.title}
            </h3>

            <p className="text-gray-600 mb-5">
              {selectedAmenity.description}
            </p>

            {/* <h4 className="font-semibold mb-2">
              Available In:
            </h4>

            <div className="flex flex-wrap gap-2">
              {selectedAmenity.communities.map(
                (community) => (
                  <span
                    key={community}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {community}
                  </span>
                )
              )}
            </div> */}

            {/* <button
              onClick={() => setSelectedAmenity(null)}
              className="mt-6 bg-black text-white px-6 py-3 rounded-xl"
            >
              Close
            </button> */}
          </div>
        </div>
      </div>
    )}
  </>
);

};

export default CategorySection;