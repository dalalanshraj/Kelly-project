import CommunityImg from "../assets/Seychelles-img/img3.jpeg";
import LuxuryCoastalImg from "../assets/Shores-img/img2.jpg";
import React from "react";
import heroImage from "../assets/Shores-img/img4.jpeg";

const PropertyManagement = () => {
  return (
    <div className="bg-[#f5f5f5]">
      {/* Hero Section */}
      <section
        className="relative h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/20" />

           <div
                className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            text-white
            text-shadow-lg
          ">
          <h1
            className="
              text-4xl
                  md:text-7xl
                  font-serif
            "
          >
            PROPERTY MANAGEMENT
          </h1>
        </div>
      </section>

      <section className="w-full flex justify-center py-12 md:py-24 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-7xl w-full flex flex-col md:flex-row shadow-lg rounded-xl overflow-hidden bg-white pt-40">
          {/* Left Side (Image) */}
          <div
            className="relative w-full h-90 md:w-1/2 md:h-auto bg-cover bg-center"
            style={{
              backgroundImage: `url(${CommunityImg})`,
              //   backgroundAttachment: "fixed",
            }}
          >
            {/* Optional: Add an overlay for a subtle effect */}
            <div className="absolute inset-0 bg-black opacity-10"></div>
          </div>

          {/* Right Side (Text Content) */}
          <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-800 tracking-wide mb-6">
              DEDICATED OWNER SUPPORT
            </h2>
            <p className="text-lg leading-relaxed mb-8">
              Your property is more than an investment—it's a valuable asset
              that deserves personalized attention. Our experienced team
              provides transparent communication, responsive service, and
              proactive management to ensure your home remains in excellent
              condition while delivering strong financial performance.
            </p>

            <a
              href="#"
              className="inline-block px-8 py-3 bg-gray-700 text-white font-medium rounded hover:bg-gray-800 transition-colors duration-300"
            >
              CONTACT US
            </a>
          </div>
        </div>
      </section>
      <section className="w-full flex justify-center py-12 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full flex flex-col md:flex-row shadow-lg rounded-xl overflow-hidden bg-white">
          {/* Left Side (Text Content) */}
          <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 order-2 md:order-1">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-800 tracking-wide mb-6">
              MAXIMIZE YOUR INVESTMENT
            </h2>
            <p className="text-lg leading-relaxed mb-8">
              We use advanced pricing technology, local market insights, and
              targeted marketing strategies to help your property achieve its
              highest earning potential. Our goal is to maximize occupancy,
              increase revenue, and attract quality guests throughout the year.
            </p>
          </div>

          {/* Right Side (Image) */}
          <div
            className="relative w-full h-80 md:w-1/2 md:h-auto bg-cover bg-center order-1 md:order-2"
            style={{
              backgroundImage: `url(${LuxuryCoastalImg})`,
              //   backgroundAttachment: "fixed",
            }}
          >
            {/* Optional: Add an overlay */}
            <div className="absolute inset-0 bg-black opacity-10"></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1f2937] py-20 text-center text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-serif mb-6">
            READY TO GROW YOUR RENTAL INCOME?
          </h2>

          <p className="text-lg text-gray-300 mb-8">
            Schedule a free consultation and discover how our team can help
            maximize your property's performance.
          </p>

          <button className="bg-[#4b9a97] hover:bg-[#3f8582] px-8 py-4">
            GET STARTED TODAY
          </button>
        </div>
      </section>
    </div>
  );
};

export default PropertyManagement;
