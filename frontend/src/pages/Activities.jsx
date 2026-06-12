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
      title: "Rick Seltzer Park",
      imageSrc: GolfImg,
      description:
        " Rick Seltzer Park provides some precious free and public access to the Panama City Beach oceanfront. This is a great lifeguarded swimming beach backed by handsome dunes and if you’re timing’s right surprisingly uncrowded. It offers the perfect sunset vantage, and it’s close to a number of restaurants that make combining sand and sun worship with some PCB dining out a (sea) breeze.",
    },

    {
      id: 2,
      title: "St. Andrews State Park",
      imageSrc: BoatTourImg,
      description:
        "The park has such amenities as two-and-a-half miles of beaches, bicycling, birding, boat tours, boating, canoeing, two fishing piers, hiking, kayaking, picnicking areas, scuba diving, snorkeling, swimming, wildlife viewing and full camping facilities. During the summer, camping reservations are recommended for best availability. It also has a visitor center, an interpretive exhibit and concessions.",
    },

    {
      id: 3,
      title: " Camp Helen State Park",
      imageSrc: ShoppingImg,
      description:
        "Camp Helen State Park is a Florida State Park and historic site located west of Panama City Beach, in northwestern Florida. The park is south of U.S. 98, and bounded by the Gulf of Mexico and Lake Powell. The park was added to the National Register of Historic Places on May 24, 2012",
    },

    {
      id: 4,
      title: "Frank Brown Park",
      imageSrc: HookdImg,
      description:
        "Frank Brown Park is a 200-acre outdoor recreation facility in Panama City Beach, Florida. The park hosts various sporting events throughout the year and has facilities available for public use. The largest park in Panama City Beach is Frank Brown Park, just over 100 acres and located on Panama City Beach Parkway between State Road 79 and Pier Park",
    },

    {
      id: 5,
      title: "Pier Park",
      imageSrc: LizasImg,
      description:
        " Pier Park is Panama City Beach’s premier shopping and entertainment destination. Serving the Panama City Beach and 30A community, this outdoor complex boasts 124 stores, ranging from clothing for the whole family to home goods, shoes, and jewelry. Pier Park also offers many exciting dining options. No matter what you’re in the mood for, Pier Park has the variety that puts the all in the mall. Choose your adventures at a variety of entertainment venues from the Grand IMAX movie theater, to laser tag and live music, Pier Park is your destination for fun, food, and fantastic shopping all near one of the country’s most beautiful beaches.",
    },

    {
      id: 6,
      title: "Panama City Beach",
      imageSrc: SkydiveImg,
      description: " This 27-mile long beach offers a wide variety of activities to enjoy such as swimming, snorkeling, dolphin-spotting parasailing and jet skiing.",
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
              <div className="absolute inset-0 bg-black/50" />
      
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
                  
                 Activities
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
            Things To Do
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
<div className="w-full px-4 md:px-8 py-8">
  <div
    className="
      max-w-7xl mx-auto
      bg-[#fff]
      rounded-2xl
      shadow-xl
      overflow-hidden
      transition-all
      duration-500
      hover:shadow-2xl
      hover:-translate-y-1
    "
  >
    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 p-6 md:p-10">
      
      {/* Left Content */}
      <div className="order-2 lg:order-1 text-center lg:text-left animate-fadeIn">
        <h2 className="text-4xl md:text-5xl font-serif text-gray-800 tracking-wide mb-6 uppercase">
          I Love Panama City Beach – The Original FB Group
        </h2>

        <p className="text-lg leading-relaxed mb-8">
         Welcome to the I Love Panama City Beach – The Original FB Group. If you want to know more about Panama City Beach click here for more information.

Know More
        </p>

      <a href="https://www.facebook.com/groups/ilovepcbfl/">  <button
          className="
            
            px-8 py-4
            bg-[#3c8a8c] text-white rounded hover:bg-teal-700 transition-colors duration-300
          "
        >
          Know More
        </button></a>
      </div>

      {/* Right Image */}
      <div className="order-1 lg:order-2 flex justify-center">
        <div className="overflow-hidden rounded-2xl">
          <img
            src={TheatreImg}
            alt="PCB"
            className="
              w-full
              max-w-md
              object-contain
              transition-all
              duration-700
              hover:scale-110
            "
          />
        </div>
      </div>
    </div>
  </div>
</div>
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

              {/* <button
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
              </button> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActivitiesPage;
