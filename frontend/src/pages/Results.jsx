import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import api from "../api/axios.js";
import PropertyMap from "../components/PropertyMap";
import { ArrowUpRight } from "lucide-react";
import heroImage from "../assets/Shores-img/img4.jpeg";

const ResultsPage = () => {
  const location = useLocation();

  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==============================
  // FETCH SEARCH RESULTS
  // ==============================
  useEffect(() => {
    const loadResults = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams(location.search);

        const checkIn = params.get("checkIn");
        const checkOut = params.get("checkOut");

        const res = await api.get("/search", {
          params: {
            checkIn,
            checkOut,
          },
        });

        setProperties(res.data?.results || []);
      } catch (err) {
        console.error("Search error:", err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, [location.search]);

  // ==============================
  // AUTO SELECT FIRST PROPERTY
  // ==============================
  useEffect(() => {
    if (properties.length > 0) {
      setSelectedProperty(properties[0]);
    }
  }, [properties]);

  return (
    <>
      {/* ================= HERO ================= */}
      <section
        className="relative h-[53vh] bg-cover bg-center flex items-center justify-center text-white text-center"
        style={{
        backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <h1 className="relative z-10 text-5xl md:text-6xl font-extrabold mt-24">
          Search Results
        </h1>
      </section>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {loading && (
          <div className="text-center text-lg text-gray-500">
            Loading available properties...
          </div>
        )}

        {!loading && properties.length === 0 && (
          <div className="text-center text-lg text-red-500">
            No properties available for selected dates
          </div>
        )}

        {!loading && properties.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ================= MAP ================= */}
            <div className="lg:col-span-2 h-[40vh] md:h-[80vh] rounded-xl overflow-hidden border">
              <PropertyMap
                properties={properties}
                selectedProperty={selectedProperty}
              />
            </div>

            {/* ================= PROPERTY LIST ================= */}
            <div className="h-[80vh] overflow-y-auto space-y-4 pr-2">
              {properties.map((p) => {
                let photoPath = "";

                if (p.photos?.[0]?.image) {
                  photoPath = p.photos[0].image;
                } else if (p.photos?.[0]?.url) {
                  photoPath = p.photos[0].url;
                } else if (typeof p.photos?.[0] === "string") {
                  photoPath = p.photos[0];
                }

                const cleanPath =
                  typeof photoPath === "string"
                    ? photoPath.replace(/^\/api/, "")
                    : "";

                const imageUrl = cleanPath
                  ? cleanPath.startsWith("http")
                    ? cleanPath
                    : `${import.meta.env.VITE_API_URL}${cleanPath}`
                  : "/placeholder.jpg";

                return (
                  <div
                    key={p._id}
                    onMouseEnter={() => setSelectedProperty(p)}
                    onClick={() => setSelectedProperty(p)}
                    className={`border rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                      selectedProperty?._id === p._id
                        ? "border-[#3c8a8c] bg-[#3c8a8c]/5 shadow-lg"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <img
                      src={imageUrl}
                      alt={p?.property?.title}
                      className="w-full h-44 object-cover rounded-lg"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.jpg";
                      }}
                    />

                    <div className="flex justify-between items-center mt-3">
                      <h3 className="font-semibold text-lg">
                        {p?.property?.title}
                      </h3>

                      <Link
                        to={`/property/${p._id}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ArrowUpRight className="w-6 h-6 text-[#3c8a8c] hover:text-[#2f7071]" />
                      </Link>
                    </div>

                    {p?.location?.address && (
                      <p className="text-sm text-gray-500 mt-2">
                        {p.location.address}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ResultsPage;