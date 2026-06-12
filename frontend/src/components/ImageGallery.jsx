import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageGallery = ({ photos = [] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const thumbnailsRef = useRef(null);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [photos]);

  const images = photos.map((photo) => {
    let imagePath = "";

    if (photo?.image) {
      imagePath = photo.image;
    } else if (photo?.url) {
      imagePath = photo.url;
    } else if (typeof photo === "string") {
      imagePath = photo;
    }

    const cleanPath =
      typeof imagePath === "string"
        ? imagePath.replace(/^\/api/, "")
        : "";

    return cleanPath.startsWith("http")
      ? cleanPath
      : `${import.meta.env.VITE_API_URL}${cleanPath}`;
  });

  if (!images.length) {
    return (
      <div className="h-[500px] bg-gray-100 flex items-center justify-center rounded-xl">
        No Images Available
      </div>
    );
  }

  const goToNextImage = () => {
    setCurrentImageIndex(
      (prev) => (prev + 1) % images.length
    );
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + images.length) % images.length
    );
  };

  const scrollThumbnails = (direction) => {
    if (!thumbnailsRef.current) return;

    const scrollAmount =
      thumbnailsRef.current.clientWidth / 2;

    thumbnailsRef.current.scrollBy({
      left:
        direction === "left"
          ? -scrollAmount
          : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full">
      {/* Main Image */}
      <div className="relative h-[400px] md:h-[700px] overflow-hidden rounded-xl shadow-lg">
        <img
          src={images[currentImageIndex]}
          alt="Property"
          className="w-full h-full object-cover"
        />

        <button
          onClick={goToPreviousImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20"
        >
          <ChevronLeft
            size={50}
            className="text-white"
          />
        </button>

        <button
          onClick={goToNextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20"
        >
          <ChevronRight
            size={50}
            className="text-white"
          />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="relative mt-5">
        <div
          ref={thumbnailsRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide"
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              onClick={() =>
                setCurrentImageIndex(index)
              }
              className={`w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover cursor-pointer transition-all ${
                currentImageIndex === index
                  ? "ring-4 ring-[#3c8a8c]"
                  : ""
              }`}
            />
          ))}
        </div>

        <button
          onClick={() =>
            scrollThumbnails("left")
          }
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={() =>
            scrollThumbnails("right")
          }
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default ImageGallery;