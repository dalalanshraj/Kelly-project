import { useState } from "react";
import { Calendar, Home, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FeatureSection from "../components/FeatureSection";
import CategorySection from "../components/CategorySection";
import TestimonialCarousel from "../components/Testimonial";
import FeaturedProperties from "../components/FeaturedProperties";
import HeroVideo from "../assets/heroVideo.mp4"
import CommunityImg from "../assets/Seychelles-img/img2.jpg"
import LuxuryCoastalImg from "../assets/Laketown-Img/img1.jpeg"

const Hero = () => {
   const navigate = useNavigate();
const [selectedAmenity, setSelectedAmenity] =
  useState(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [bedrooms, setBedrooms] = useState("");
  const [location, setLocation] = useState("");

  
  const handleSearch = () => {
    if (!checkIn || !checkOut) {
      alert("Please select arrival and departure dates");
      return;
    }

    const params = new URLSearchParams({
      checkIn: checkIn.toISOString().split("T")[0],
      checkOut: checkOut.toISOString().split("T")[0],
      bedrooms,
      location,
    });

    navigate(`/results?${params.toString()}`);
  };
  
  return (
    <>
    <section className="relative h-[90vh] w-full flex items-center justify-center">
      {/* Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={HeroVideo}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-serif font-semibold mb-8">
          START YOUR VACATION NOW
        </h1>

        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 md:p-5 grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Arrival */}
          <div className="flex items-center border rounded-xl px-4 py-3 hover:border-[#3c8a8c] transition bg-white">
            <Calendar className="w-5 h-5 text-[#3c8a8c] mr-3" />

            <DatePicker
              selected={checkIn}
              onChange={(date) => {
                setCheckIn(date);

                if (checkOut && date >= checkOut) {
                  setCheckOut(null);
                }
              }}
              minDate={new Date()}
              placeholderText="Arrival"
              dateFormat="MMM dd, yyyy"
              monthsShown={2}
              showPopperArrow={false}
              onKeyDown={(e) => e.preventDefault()}
              onPaste={(e) => e.preventDefault()}
              className="w-full outline-none bg-transparent text-black"

            />
          </div>

          {/* Departure */}
          <div className="flex items-center border rounded-xl px-4 py-3 hover:border-[#3c8a8c] transition bg-white">
            <Calendar className="w-5 h-5 text-[#3c8a8c] mr-3" />

            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              minDate={
                checkIn
                  ? new Date(checkIn.getTime() + 86400000)
                  : new Date()
              }
              disabled={!checkIn}
              placeholderText="Departure"
              dateFormat="MMM dd, yyyy"
              monthsShown={2}
              showPopperArrow={false}
              onKeyDown={(e) => e.preventDefault()}
              onPaste={(e) => e.preventDefault()}
              className="w-full outline-none bg-transparent text-black"

            />
          </div>

          {/* Bedrooms */}
          <div className="flex items-center border rounded-xl px-4 py-3 bg-white">
            <Home className="w-5 h-5 text-[#3c8a8c] mr-3" />

            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full bg-transparent outline-none text-black"
            >
              <option value="">Bedrooms</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4">4 Bedrooms</option>
              <option value="5">5+ Bedrooms</option>
            </select>
          </div>

          {/* Search */}
          <button
            onClick={handleSearch}
            className="bg-[#3c8a8c] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#2f7071] transition"
          >
            SEARCH RENTALS
          </button>
        </div>
      </div>
    </section>
    <FeatureSection />

     <section className="w-full flex justify-center py-12 md:py-24 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl w-full flex flex-col md:flex-row shadow-lg rounded-xl overflow-hidden bg-white pt-40">
        
        {/* Left Side (Image) */}
        <div 
          className="relative w-full h-90 md:w-1/2 md:h-auto bg-cover bg-center"
          style={{ 
             backgroundImage: `url(${CommunityImg})`,
    backgroundAttachment: "fixed",
          }}
        >
          {/* Optional: Add an overlay for a subtle effect */}
          <div className="absolute inset-0 bg-black opacity-10"></div>
        </div>

        {/* Right Side (Text Content) */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 tracking-wide mb-6">
            Explore Our Premier Communities
          </h2>
         <p className="text-lg leading-relaxed mb-8">
  Discover three of the most sought-after vacation rental communities on
  Florida’s Emerald Coast. Whether you're looking for luxury beachfront
  living at <strong> Seychelles</strong>, family-friendly amenities at
   <strong> Laketown Wharf</strong>, or stunning Gulf views at 
  <strong> Shores Of Panama</strong>, we offer exceptional accommodations
  designed to create unforgettable vacation experiences.
</p>

<p className="text-lg leading-relaxed mb-8">
  Each community features unique amenities, convenient beach access, and
  prime locations near shopping, dining, and entertainment. Find the
  perfect property for your next getaway and enjoy the best that Panama
  City Beach has to offer.
</p>
          <Link to={"/contact"}
            className="inline-block px-8 py-3 bg-gray-700 text-white font-medium rounded hover:bg-gray-800 transition-colors duration-300"
          >
            CONTACT US
          </Link>
        </div>
      </div>
    </section>
    <section className="w-full flex justify-center py-12 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full flex flex-col md:flex-row shadow-lg rounded-xl overflow-hidden bg-white">
        
        {/* Left Side (Text Content) */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 order-2 md:order-1">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 tracking-wide mb-6">
           Luxury Coastal Living
          </h2>
          <p className="text-lg leading-relaxed mb-8">
 Experience the best of Panama City Beach from three exceptional
communities: Seychelles, Laketown Wharf, and Shores Of Panama.
From stunning beachfront views and resort-style amenities to
spacious accommodations and convenient beach access, every property
offers a unique way to enjoy the Emerald Coast.
</p>

<p className="text-lg leading-relaxed mb-8">
 Whether you're planning a weekend escape or an extended vacation,
our carefully selected rentals provide everything needed for a
comfortable and unforgettable stay by the Gulf.
</p>
          {/* <button
            className="px-8 py-3 bg-[#3c8a8c] text-white font-medium rounded hover:bg-teal-700 transition-colors duration-300"
          >
            FIND YOUR RENTAL
          </button> */}
        </div>
        
        {/* Right Side (Image) */}
        <div 
          className="relative w-full h-80 md:w-1/2 md:h-auto bg-cover bg-center order-1 md:order-2"
          style={{ 
          backgroundImage: `url(${LuxuryCoastalImg})`,
    backgroundAttachment: "fixed",
          }}
        >
          {/* Optional: Add an overlay */}
          <div className="absolute inset-0 bg-black opacity-10"></div>
        </div>
      </div>
    </section>
    <CategorySection

    />
    <TestimonialCarousel />
    {/* <FeaturedProperties /> */}
    </>
  );
};

export default Hero;
