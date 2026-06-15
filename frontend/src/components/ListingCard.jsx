import { Link } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ListingCard({ listing }) {
  const photos = listing?.photos || [];

  const [current, setCurrent] = useState(0);

  const nextSlide = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setCurrent((prev) => (prev + 1) % photos.length);
  };

  const prevSlide = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setCurrent((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  
  const image =
    photos?.length > 0
      ? `${import.meta.env.VITE_API_URL}${photos[current]?.url}`
      : "/placeholder.jpg";

  return (
    <Link
      to={`/property/${listing._id}`}
      className="
  relative
  group
  block
  bg-white
  shadow-lg
  hover:shadow-2xl
  hover:-translate-y-2
  transition-all
  duration-500
"
    >
      {listing.deal && (
        <div
          className="
      absolute
      top-4
      right-4
      bg-red-600
      text-white
      px-4
      py-2
      rounded-full
      text-sm
      font-bold
      z-20
      shadow-lg
    "
        >
          DEAL
        </div>
      )}
      {/* IMAGE */}
     <div className="relative h-[320px] overflow-hidden">
  <div
    className="flex h-full transition-transform duration-700 ease-in-out"
    style={{
      transform: `translateX(-${current * 100}%)`,
    }}
  >
    {photos.map((photo, index) => (
      <img
        key={index}
        src={`${import.meta.env.VITE_API_URL}${photo.url}`}
        alt=""
        className="
          w-full
          h-full
          object-cover
          shrink-0
        "
      />
    ))}
  </div>

  {/* Area Badge */}
  <div className="absolute top-4 left-4 bg-white/80 px-4 py-2 text-sm z-10">
    {listing.property?.community || "Destin Area"}
  </div>

  {/* Arrows */}
  {photos.length > 1 && (
    <>
      <button
        onClick={prevSlide}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          w-10
          h-10
          rounded-full
          bg-black/40
          text-white
          flex
          items-center
          justify-center
          opacity-0
          group-hover:opacity-100
          transition-all
          z-10
        "
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          w-10
          h-10
          rounded-full
          bg-black/40
          text-white
          flex
          items-center
          justify-center
          opacity-0
          group-hover:opacity-100
          transition-all
          z-10
        "
      >
        <ChevronRight size={24} />
      </button>
    </>
  )}
</div>

      {/* CONTENT */}
    <div
  className="
    bg-white
    text-center
    py-8
    px-4
  "
>
  <h2
    className="
      text-4xl
      uppercase
      tracking-wide
      font-light
      transition-colors
      duration-300
      group-hover:text-[#42B6BE]
    "
  >
    {listing.property?.title}
  </h2>

  {/* {listing.deal && (
    <div
      className="
        mt-4
        bg-gradient-to-r
        from-red-50
        to-orange-50
        border
        border-red-200
        text-red-700
        p-3
        rounded-xl
        text-sm
      "
    >
      <div className="font-semibold">
        {listing.deal.title}
      </div>

      {listing.deal.description && (
        <div className="mt-1">
          {listing.deal.description}
        </div>
      )}
    </div>
  )} */}

  <div
    className="
      w-16
      h-1
      bg-[#42B6BE]
      mx-auto
      my-4
    "
  />

  <div
    className="
      text-gray-700
      text-xl
    "
  >
    Beds {listing.property?.bedrooms}
    {" | "}
    Baths {listing.property?.bathrooms}
    {" | "}
    Guests {listing.property?.maxSleeps}
  </div>
</div>

      <div
        className="
    absolute
    bottom-0
    left-0
    w-full
    h-1
    bg-[#42B6BE]
    scale-x-0
    group-hover:scale-x-100
    group-hover:h-2
    transition-all
    duration-500
    origin-left
  "
      />
    </Link>
  );
}
