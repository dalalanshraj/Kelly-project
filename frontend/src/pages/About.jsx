import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import About from "../assets/Laketown-Img/img3.jpg";
import Values from "../assets/Laketown-Img/img4.jpeg";
import whyChooseUs from "../assets/Shores-img/img3.jpg";
import heroImage from "../assets/Shores-img/img4.jpeg";

export default function AboutSlider() {
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      title: "ABOUT OUR COMPANY",
      description:
        "My name is Kelly Breedwell, and I am a PCB local and property manager. I live less than 10 minutes from our condos, so I am just a phone call away if you need me during your stay. Feel free to follow me on Facebook as well. If you would like a quote, please send all inquiries via the platform. This way I can keep track of all emails.",
      image: About,
    },
    {
      title: "OUR CORE VALUES",
      description:
        "Our success is built on Integrity, Reliability, and Personalized Service. We are committed to providing homeowners with transparent communication and professional property management while ensuring every guest enjoys a memorable vacation experience. By focusing on trust, attention to detail, and exceptional customer care, we create positive experiences that keep guests returning year after year.",
      image: Values,
    },
    {
      title: "WHY CHOOSE US",
      description:
        "As a local property manager, I take pride in providing personalized service, quick communication, and well-maintained vacation rentals. From booking assistance to local recommendations, I'm here to ensure your stay is comfortable, convenient, and memorable. With prime locations, exceptional guest support, and a focus on quality, our goal is to make every vacation experience one you'll want to repeat year after year.",
      image: whyChooseUs,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 7000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    }
  };

  const prevSlide = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  return (
    <>
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
            About us
          </h1>
        </div>
      </section>

      {/* About Slider */}
      <section className="bg-[#f5f5f5] py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative min-h-[650px] lg:min-h-[700px]">
            {/* Image */}
            <div className="w-full lg:w-[58%]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current}
                  src={slides[current].image}
                  alt={slides[current].title}
                  initial={{ opacity: 0, x: -80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 80 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    w-full
                    h-[280px]
                    sm:h-[400px]
                    md:h-[500px]
                    lg:h-[650px]
                    object-cover
                  "
                />
              </AnimatePresence>
            </div>

            {/* Content Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${current}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  bg-white
                  shadow-2xl
                  w-full
                  lg:w-[58%]
                  p-6
                  md:p-10
                  lg:p-14

                  lg:absolute
                  lg:right-0
                  lg:top-1/2
                  lg:-translate-y-1/2

                  mt-[-40px]
                  lg:mt-0

                  z-20
                "
              >
                <h2 className="text-3xl md:text-5xl font-serif text-[#2f2f2f] mb-6">
                  {slides[current].title}
                </h2>

                <p className="text-gray-600 leading-7 md:leading-8 mb-8">
                  {slides[current].description}
                </p>

                {/* Dots */}
                <div className="flex gap-3 mb-8">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrent(index)}
                      className={`
                        w-3 h-3 rounded-full transition-all duration-300
                        ${
                          current === index
                            ? "bg-[#48a6a6] scale-125"
                            : "bg-gray-300"
                        }
                      `}
                    />
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4">
                  {current > 0 && (
                    <button
                      onClick={prevSlide}
                      className="
                        bg-[#48a6a6]
                        hover:bg-[#3f9191]
                        text-white
                        px-6 md:px-8
                        py-3 md:py-4
                        transition-all
                      "
                    >
                      ← PREVIOUS
                    </button>
                  )}

                  {current < slides.length - 1 && (
                    <button
                      onClick={nextSlide}
                      className="
                        bg-[#48a6a6]
                        hover:bg-[#3f9191]
                        text-white
                        px-6 md:px-8
                        py-3 md:py-4
                        transition-all
                      "
                    >
                      NEXT →
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}
