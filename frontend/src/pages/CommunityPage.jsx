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
  const [sortBy, setSortBy] = useState("");

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
        
      });

      setListings(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const formatDate = (date) => {
    const d = new Date(date);

    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0",
    )}-${String(d.getDate()).padStart(2, "0")}`;
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
      if (bedrooms && Number(listing.property?.bedrooms) < Number(bedrooms)) {
        return false;
      }

      // Guests filter
      if (guests && Number(listing.property?.maxSleeps) < Number(guests)) {
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

          current.setDate(current.getDate() + 1);
        }
      }

      return true;
    });

    console.log(
      "FILTERED =>",
      availableListings.map((x) => x.property?.title),
    );

    setFilteredListings(availableListings);
  };

  const communityHeroImages = {
    "Seychelles Properties": SeychellesHero,
    "Laketown Wharf Properties": LaketownHero,
    "Shores Of Panama Properties": ShoresHero,
  };

  // Prices Filter 
  const handleSort = (value) => {
  setSortBy(value);

  const sorted = [...filteredListings];

  switch (value) {
    case "price-low":
      sorted.sort(
        (a, b) =>
          Number(a.property?.nightlyRate || 0) -
          Number(b.property?.nightlyRate || 0)
      );
      break;

    case "price-high":
      sorted.sort(
        (a, b) =>
          Number(b.property?.nightlyRate || 0) -
          Number(a.property?.nightlyRate || 0)
      );
      break;

    case "bedrooms":
      sorted.sort(
        (a, b) =>
          Number(b.property?.bedrooms || 0) -
          Number(a.property?.bedrooms || 0)
      );
      break;

    case "guests":
      sorted.sort(
        (a, b) =>
          Number(b.property?.maxSleeps || 0) -
          Number(a.property?.maxSleeps || 0)
      );
      break;

    case "name":
      sorted.sort((a, b) =>
        a.property?.title.localeCompare(
          b.property?.title
        )
      );
      break;

    default:
      break;
  }

  setFilteredListings(sorted);
};

  const heroImage =
    communityHeroImages[decodeURIComponent(slug)] || "/community-banner.jpg";

  return (
    <div>
      {/* Hero */}
      <section
        className="
    relative
    min-h-[350px]
    md:min-h-[550px]
    bg-cover
    bg-center
    flex
    items-center
    text
    justify-center
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
    text-3xl
    sm:text-4xl
    md:text-6xl
    lg:text-7xl
    font-serif
    text-center
    px-4
    leading-tight
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
    md:p-6
    rounded-3xl
  "
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
              h-[56px] md:h-[65px]
              border
              border-gray-300
               rounded-xl
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
             h-[56px] md:h-[65px]
              border
              border-gray-300
               rounded-xl
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
             h-[56px] md:h-[65px]
              border
              border-gray-300
               rounded-xl
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
             h-[56px] md:h-[65px]
              border
              border-gray-300
               rounded-xl
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
            mt-0
    sm:mt-6
    h-[56px]
    md:h-[65px]
    rounded-xl
    bg-[#42B6BE]
    hover:bg-[#359fa7]
    text-white
    font-semibold
    text-base
    md:text-lg
    transition-all
    duration-300
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
      bg-white
      rounded-3xl
      shadow-lg
      border
      border-gray-100
      p-4
      md:p-6
    "
  >
    <div
      className="
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-4
      "
    >
      {/* Left */}
      <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
        <select
          value={sortBy}
          onChange={(e) => handleSort(e.target.value)}
          className="
            h-12
            custom-filter
            px-4
            rounded-xl
            border
            border-gray-200
            bg-gray-50
            text-gray-700
            font-medium
            focus:outline-none
            focus:ring-2
            focus:ring-[#42B6BE]
            min-w-[240px]
          "
        >
          <option value="">
            Sort Properties
          </option>

          <option value="price-low">
            Lowest Price
          </option>

          <option value="price-high">
            Highest Price
          </option>

          <option value="bedrooms">
            Most Bedrooms
          </option>

          <option value="guests">
            Most Guests
          </option>

          <option value="name">
            Property Name A-Z
          </option>
        </select>
      </div>

      {/* Center */}
      <div
        className="
          hidden
          lg:flex
          items-center
          text-gray-500
          text-sm
        "
      >
        Prices estimated by average nightly rate
      </div>

      {/* Right */}
      <div
        className="
          flex
          items-center
          justify-between
          lg:justify-end
          gap-3
        "
      >
        <div
          className="
            bg-[#42B6BE]/10
            text-[#42B6BE]
            px-4
            py-2
            rounded-full
            font-semibold
          "
        >
          {filteredListings.length} Properties
        </div>
      </div>
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
