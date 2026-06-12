import React, { useState } from "react";
import heroImage from "../assets/Shores-img/img4.jpeg"

// import ActivitiesHeroImg from "../assets/activities/hero.jpg";

import GolfImg from "../assets/activities/golf.jpg";
import BoatTourImg from "../assets/activities/boat-tour.jpg";
import ShoppingImg from "../assets/activities/shopping.jpg";
import HookdImg from "../assets/activities/hookd.jpg";
import LizasImg from "../assets/activities/lizas-kitchen.jpg";
import SkydiveImg from "../assets/activities/skydive.jpg";
import TheatreImg from "../assets/activities/grand-theatre.jpg";

const ActivitiesPage = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);

  const activities = [
    {
      id: 1,
      title: "Area Golf",
      imageSrc: GolfImg,
      description:
        "Enjoy championship golf courses located near Panama City Beach.",
    },

    {
      id: 2,
      title: "Island Time Boat Tours",
      imageSrc: BoatTourImg,
      description:
        "Experience dolphin cruises, sunset tours and unforgettable adventures on the Gulf.",
    },

    {
      id: 3,
      title: "Shopping Malls",
      imageSrc: ShoppingImg,
      description:
        "Explore shopping centers, boutiques and local attractions nearby.",
    },

    {
      id: 4,
      title: "Hook'd Pier Bar & Grill",
      imageSrc: HookdImg,
      description:
        "Beachfront dining featuring seafood favorites and amazing Gulf views.",
    },

    {
      id: 5,
      title: "Liza's Kitchen",
      imageSrc: LizasImg,
      description:
        "Local favorite restaurant serving fresh sandwiches and homemade dishes.",
    },

    {
      id: 6,
      title: "Skydive Panama City",
      imageSrc: SkydiveImg,
      description: "Take in breathtaking aerial views of Panama City Beach.",
    },

    {
      id: 7,
      title: "The Grand Theatre",
      imageSrc: TheatreImg,
      description: "Movies, entertainment and family fun for all ages.",
    },
  ];

  return (
    <>
      {/* HERO */}
       <section
              className="
          relative
          h-[550px]
          bg-cover
          bg-center
        "
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
          "
              >
                <h1
                  className="
              text-4xl
                  md:text-7xl
                  font-serif
            "
                >
                 ACTIVITIES
                </h1>
              </div>
            </section>
      

      {/* CONTENT */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2
            className="
          text-4xl
          md:text-5xl
          font-serif
          text-[#1d2b44]
          mb-4
        "
          >
            LOCAL ACTIVITIES
          </h2>

          <p
            className="
          max-w-3xl
          mx-auto
          text-gray-600
          mb-12
          text-lg
        "
          >
            Explore the best experiences, attractions, restaurants and
            adventures near our communities.
          </p>

          <div
            className="
    grid
    grid-cols-1
    md:grid-cols-2
    lg:grid-cols-3
    gap-8
  "
          >
            {activities.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedActivity(item)}
                className="
        relative
        h-[260px]
        md:h-[340px]
        overflow-hidden
        cursor-pointer
        group
      "
              >
                {/* Image */}
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="
          w-full
          h-full
          object-cover
          transition-all
          duration-700
          group-hover:scale-110
        "
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/25" />

                {/* White Border */}
                <div
                  className="
          absolute
          top-5
          bottom-5
          left-5
          right-5
          border-2
          border-white
          z-10
        "
                />

                {/* Title */}
                <div
                  className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          text-center
          px-6
          z-20
        "
                >
                  <h3
                    className="
            text-white
            text-3xl
            md:text-4xl
            font-serif
            uppercase
            tracking-wider
          "
                  >
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      {selectedActivity && (
        <div
          className="
        fixed
        inset-0
        bg-black/70
        z-50
        flex
        items-center
        justify-center
        p-4
      "
          onClick={() => setSelectedActivity(null)}
        >
          <div
            className="
          bg-white
          max-w-4xl
          w-full
          rounded-2xl
          overflow-hidden
          max-h-[90vh]
          overflow-y-auto
        "
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedActivity.imageSrc}
              alt={selectedActivity.title}
              className="
            w-full
            h-[250px]
            md:h-[450px]
            object-cover
          "
            />

            <div className="p-6 md:p-8">
              <h3
                className="
              text-3xl
              md:text-4xl
              font-serif
              mb-4
            "
              >
                {selectedActivity.title}
              </h3>

              <p
                className="
              text-gray-600
              leading-relaxed
              text-lg
            "
              >
                {selectedActivity.description}
              </p>

              <button
                onClick={() => setSelectedActivity(null)}
                className="
              mt-8
              bg-[#3c8a8c]
              text-white
              px-8
              py-3
              rounded-xl
              hover:bg-[#2f7071]
              transition
            "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActivitiesPage;
