import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import ListingCard from "../components/ListingCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SeychellesHero from "../assets/Seychelles-img/img4.jpg";
import LaketownHero from "../assets/Laketown-Img/img5.jpeg";
import ShoresHero from "../assets/Shores-img/img4.jpeg";

export default function CommunityPage() {
  const { slug } = useParams();
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [bedrooms, setBedrooms] = useState("");
  const [guests, setGuests] = useState("");
  const [filteredListings, setFilteredListings] = useState([]);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetchListings();
  }, [slug]);

  useEffect(() => {
    setFilteredListings(listings);
  }, [listings]);

  const fetchListings = async () => {
    try {
      const res = await api.get(`/listings/community/${slug}`);
     res.data.forEach((listing) => {
  console.log(
    listing.property?.title,
    listing.calendar?.length
  );
});

      setListings(res.data);
    } catch (err) {
      console.log(err);
    }
  };
const formatDate = (date) => {
  const d = new Date(date);

  return `${d.getFullYear()}-${String(
    d.getMonth() + 1
  ).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
};

const handleSearch = () => {
  const availableListings = listings.filter((listing) => {
// if (listing.property?.title === "Laketown Wharf Condo 925") {
//   console.log(
//     listing.calendar.map((x) => ({
//       date: formatDate(x.date),
//       status: x.status,
//     }))
//   );
// }
    // Bedrooms filter
    if (
      bedrooms &&
      Number(listing.property?.bedrooms) < Number(bedrooms)
    ) {
      return false;
    }

    // Guests filter
    if (
      guests &&
      Number(listing.property?.maxSleeps) < Number(guests)
    ) {
      return false;
    }

    // Date filter
    if (checkIn && checkOut) {

      let current = new Date(checkIn);
      const end = new Date(checkOut);

      while (current < end) {

        const currentKey = formatDate(current);

        const blocked = listing.calendar?.some((item) => {

          const calendarKey = formatDate(item.date);

          return (
            calendarKey === currentKey &&
            ["R", "H", "CIN"].includes(item.status)
          );
        });

        if (blocked) {
          return false;
        }

        current.setDate(
          current.getDate() + 1
        );
      }
    }

    return true;
  });

  console.log(
    "FILTERED =>",
    availableListings.map(
      (x) => x.property?.title
    )
  );

  setFilteredListings(availableListings);
};

  

  const communityHeroImages = {
    "Seychelles Properties": SeychellesHero,
    "Laketown Wharf Properties": LaketownHero,
    "Shores Of Panama Properties": ShoresHero,
  };

  const heroImage =
    communityHeroImages[decodeURIComponent(slug)] || "/community-banner.jpg";

  return (
    <div>
      {/* Hero */}
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
            {decodeURIComponent(slug)}
          </h1>
        </div>
      </section>
      <section className="bg-[#f4f4f4] py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="
        bg-white
        shadow-xl
        border
        border-gray-200
        p-4
        rounded-sm
      "
          >
            <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-4">
              {/* Arrival */}
              <div className="relative">
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                  Arrival
                </label>

                <DatePicker
                  selected={checkIn}
                  onChange={setCheckIn}
                  placeholderText="Select Arrival"
                  className="
              w-full
              h-[65px]
              border
              border-gray-300
              px-5
              text-lg
              focus:outline-none
              focus:border-[#42B6BE]
            "
                />
              </div>

              {/* Departure */}
              <div className="relative">
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                  Departure
                </label>

                <DatePicker
                  selected={checkOut}
                  onChange={setCheckOut}
                  placeholderText="Select Departure"
                  className="
              w-full
              h-[65px]
              border
              border-gray-300
              px-5
              text-lg
              focus:outline-none
              focus:border-[#42B6BE]
            "
                />
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                  Bedrooms
                </label>

                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="
              w-full
              h-[65px]
              border
              border-gray-300
              px-5
              text-lg
            "
                >
                  <option value="">Any Bedrooms</option>

                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              {/* Guests */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                  Guests
                </label>

                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="
              w-full
              h-[65px]
              border
              border-gray-300
              px-5
              text-lg
            "
                >
                  <option value="">Any Guests</option>

                  {[...Array(20)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              {/* Button */}
              <button
                onClick={handleSearch}
                className="
            mt-6
            h-[65px]
            bg-[#42B6BE]
            hover:bg-[#359fa7]
            text-white
            font-semibold
            text-lg
            tracking-wide
            transition-all
            duration-300
            shadow-lg
          "
              >
                REFINE SEARCH
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div
          className="
      flex
      flex-col
      md:flex-row
      justify-between
      items-center
      gap-4
      border-b
      border-gray-300
      pb-6
    "
        >
          <select
            className="
        border
        border-gray-300
        px-5
        py-3
        min-w-[250px]
        bg-white
        shadow-sm
      "
          >
            <option>Sort Results By</option>

            <option>Price Low To High</option>

            <option>Price High To Low</option>

            <option>Bedrooms</option>
          </select>

          <p className="text-gray-500 text-lg">
            Prices estimated by average nightly rate
          </p>

          <div className="font-semibold text-gray-700">
            {filteredListings.length} Properties Found
          </div>
        </div>
      </section>
      {/* Listings */}
      <section className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredListings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      </section>
    </div>
  );
}
