import { useEffect, useState } from "react";
import api from "../api/axios";
import ListingCard from "../components/ListingCard";
import heroImage from "../assets/Shores-img/img4.jpeg"

export default function SpecialsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const res = await api.get("/deals/active");

      setListings(res.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">

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
            Specials
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-4 py-16">

        <div className="mb-10 text-center">
          <h2 className=" text-4xl
          md:text-5xl
          font-serif
          text-[#1d2b44]
          mb-4">
            Current Specials
          </h2>

          <p className="mt-3 text-gray-500">
            Book now and save on select properties.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            Loading deals...
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-20">
            No active deals available.
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {listings.map((listing) => (
              <ListingCard
                key={listing._id}
                listing={listing}
              />
            ))}
          </div>
        )}

      </section>
    </div>
  );
}