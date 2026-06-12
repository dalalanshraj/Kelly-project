import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import ImageGallery from "../components/ImageGallery";
import BookingWidget from "../components/BookingWidget";
import ReviewModal from "../components/ReviewModal";
import PropertyminiCalendar from "../components/PropertyminiCalendar";
import { amenitiesData } from "../amenitiesData.js";
import { activitiesData } from "../activitiesData.js";

const PropertyDetails = () => {
  const { id } = useParams();
  const [openReview, setOpenReview] = useState(false);
  const [calendarDates, setCalendarDates] = useState([]);
  const [openInquiry, setOpenInquiry] = useState(false);
  const [formData, setFormData] = useState({
    arrivalDate: "",
    departureDate: "",
    adults: 1,
    children: 0,
    pets: 0,
  });

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("availability");
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Handle form input changes
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle booking submission
  const handleBooking = () => {
    console.log("Booking details:", formData);
    // In a real app, you would make an API call here.
    // Replace with a custom modal or message box in a production environment.
    alert("Booking submitted! Check the console for details.");
  };
  useEffect(() => {
  if (listing) {
    console.log(
      "FULL LISTING =>",
      listing
    );

    console.log(
      "DEAL =>",
      listing.deal
    );
  }
}, [listing]);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/listings/${id}`);
        setListing(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  // reviews
  const reviews = listing?.reviews?.filter((r) => r.published === true) || [];

  // Map
  const getMapEmbedUrl = (lat, lng) => {
    const finalLat = Number(lat);
    const finalLng = Number(lng);

    return `https://maps.google.com/maps?q=${finalLat},${finalLng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  };

  // ================= YOUTUBE =================
  const getYoutubeEmbed = (url) => {
    if (!url) return null;
    if (url.includes("embed")) return url;
    if (url.includes("watch?v=")) return url.replace("watch?v=", "embed/");
    if (url.includes("youtu.be/"))
      return `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}`;
    return null;
  };

  if (loading) {
    return <div className="p-20 text-center">Loading...</div>;
  }

  if (!listing) {
    return <div className="p-20 text-center">Property Not Found</div>;
  }

  return (
    <>
      <ImageGallery photos={listing.photos || []} />

      <div className="max-w-[1400px] mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT */}
          <div className="flex-1 min-w-0">
            {/* <div className="grid grid-cols-3 gap-1 mt-6">

  <div className="bg-white/10 rounded-xl p-3 text-center">
    <div className="text-xl">🛏</div>
    <p className="text-xl mt-1">
      {listing?.property?.bedrooms || 0} Beds
    </p>
  </div>

  <div className="bg-white/10 rounded-xl p-3 text-center">
    <div className="text-xl">🛁</div>
    <p className="text-xl mt-1">
      {listing?.property?.bathrooms || 0} Baths
    </p>
  </div>

  <div className="bg-white/10 rounded-xl p-3 text-center">
    <div className="text-xl">👥</div>
    <p className="text-xl mt-1">
      {listing?.property?.maxGuests || 0} Guests
    </p>
  </div>

</div> */}

            {/* Description */}
            <div className="mb-10">
              {/* Description */}
              <div className="mb-10">
                <h3 className="text-xl md:text-2xl font-serif tracking-wide mb-4">
                  Description
                </h3>

                <div className="relative">
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      showFullDescription ? "max-h-[5000px]" : "max-h-[220px]"
                    }`}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: listing.description || "",
                      }}
                    />
                  </div>

                  {!showFullDescription && (
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                  )}
                </div>

                <button
                  onClick={() => setShowFullDescription((prev) => !prev)}
                  className="mt-4 px-5 py-2 border border-[#3c8a8c] text-[#3c8a8c] rounded-full hover:bg-[#3c8a8c] hover:text-white transition"
                >
                  {showFullDescription ? "Read Less" : "Read More"}
                </button>
              </div>
            </div>

            {/* AMENITIES */}
            <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-6">
              Amenities
            </h2>

            {amenitiesData.map((section) => {
              const selected = section.options.filter(
                (item) => listing.amenities?.[item],
              );

              if (selected.length === 0) return null;

              return (
                <div
                  key={section.title}
                  className="mb-8 bg-white border border-gray-100 rounded-2xl shadow-sm p-5"
                >
                  <h3 className="text-lg font-semibold text-[#2f9bad] mb-4 border-b pb-2">
                    {section.title}
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {selected.map((item) => (
                      <span
                        key={item}
                        className="
              px-4
              py-2
              rounded-full
              bg-[#f0fbfd]
              border
              border-[#cceef3]
              text-gray-700
              text-sm
              font-medium
              hover:bg-[#2f9bad]
              hover:text-white
              transition
            "
                      >
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
            {/* Activities */}

            <h2 className="text-3xl font-bold text-gray-800 mt-12 mb-6">
              Activities
            </h2>

            {activitiesData.map((section) => {
              const selected = section.options.filter(
                (item) => listing.activities?.[item],
              );

              if (selected.length === 0) return null;

              return (
                <div
                  key={section.title}
                  className="mb-8 bg-white border border-gray-100 rounded-2xl shadow-sm p-5"
                >
                  <h3 className="text-lg font-semibold text-[#2f9bad] mb-4 border-b pb-2">
                    {section.title}
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {selected.map((item) => (
                      <span
                        key={item}
                        className="
              px-4
              py-2
              rounded-full
              bg-[#fff8eb]
              border
              border-[#fde7b0]
              text-gray-700
              text-sm
              font-medium
              hover:bg-amber-400
              hover:text-white
              transition
            "
                      >
                         ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Tabs */}
            <div className="grid grid-cols-3 bg-[#2f2f2f] text-white">
              {["availability", "reviews", "rates"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 font-semibold ${
                    activeTab === tab ? "bg-[#3c8a8c]" : "hover:bg-[#444]"
                  }`}
                >
                  {tab === "roomDetails" ? "Room Details" : tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {/* Content */}
            <div className="border p-8 bg-white min-h-[500px] overflow-x-auto">
              <div className="mb-10 text-center">
                <h2 className="text-5xl font-serif text-[#222] mb-3">
                  Availability Calendar
                </h2>

                <p className="text-gray-500 text-lg">
                  View available, reserved and turnover dates.
                </p>
              </div>
              {activeTab === "availability" && (
                <PropertyminiCalendar listingId={listing._id} />
              )}
              {activeTab === "reviews" && (
                <div>
                  {/* HEADER */}

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-1">
                    <h2
                      className="
          text-3xl
          md:text-3xl
          font-serif
          uppercase
          tracking-wide
          text-[#222]
        "
                    >
                      Guest Reviews
                    </h2>

                    <button
                      onClick={() => setOpenReview(true)}
                      className="
          bg-[#3c8a8c]
          hover:bg-[#2f7274]
          text-white
          px-8
          py-3
          rounded-lg
          font-semibold
          transition
          shadow-md
        "
                    >
                      Write Review
                    </button>
                  </div>

                  {/* REVIEWS */}

                  <div
                    className="
        max-h-[700px]
        overflow-y-auto
        pr-3
        custom-scroll
        space-y-10
      "
                  >
                    {reviews.length === 0 ? (
                      <div className="text-center py-16">
                        <h3 className="text-2xl font-semibold text-gray-700">
                          No Reviews Yet
                        </h3>

                        <p className="text-gray-500 mt-2">
                          Be the first guest to share your experience.
                        </p>
                      </div>
                    ) : (
                      reviews.map((review) => (
                        <div
                          key={review._id}
                          className="
              border-b
              border-gray-200
              pb-10
            "
                        >
                          {/* TOP */}

                          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-3">
                            <div>
                              <p
                                className="
                    text-md
                    font-semibold
                    text-[#444]
                  "
                              >
                                by {review.name}
                                {review.stayDate && (
                                  <>
                                    {" "}
                                    on{" "}
                                    {new Date(
                                      review.stayDate,
                                    ).toLocaleDateString()}
                                  </>
                                )}
                              </p>
                            </div>

                            {/* STARS */}

                            <div className="flex text-yellow-400 text-3xl">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span key={star}>
                                  {star <= review.rating ? "★" : "☆"}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* TITLE */}

                          {review.title && (
                            <h3
                              className="
                  mt-1
                  text-1xl
                  md:text-1xl
                  font-bold
                  text-[#222]
                "
                            >
                              {review.title}
                            </h3>
                          )}

                          {/* MESSAGE */}

                          <p
                            className="
                mt-1
                text-lg
                md:text-md
                leading-8
                text-gray-700
              "
                          >
                            {review.message || review.comment}
                          </p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* FOOTER BUTTONS */}

                  <div className="mt-10 flex flex-wrap gap-4">
                    {reviews.length >= 5 && (
                      <button
                        className="
            border-2
            border-[#3c8a8c]
            text-[#3c8a8c]
            hover:bg-[#3c8a8c]
            hover:text-white
            px-8
            py-3
            rounded-lg
            font-semibold
            transition
          "
                      >
                        More Reviews
                      </button>
                    )}
                  </div>

                  {openReview && (
                    <ReviewModal
                      listingId={listing._id}
                      onClose={() => setOpenReview(false)}
                    />
                  )}
                </div>
              )}
              {/* Room Details */}
              {/* {activeTab === "roomDetails" && (
                <div>
                  <h3 className="text-2xl font-semibold mb-4">
                    Room Details
                  </h3>

                  <div
                    dangerouslySetInnerHTML={{
                      __html: listing.description || "",
                    }}
                  />
                </div>
              )} */}

              {activeTab === "rates" && (
                <div>
                  {/* Header */}

                  <div className="mb-8">
                    <h2 className="text-4xl font-serif text-[#222]">
                      Seasonal Rates
                    </h2>

                    <p className="text-gray-500 mt-2">
                      View nightly rates and minimum stay requirements.
                    </p>
                  </div>

                  {/* Desktop Table */}

                  <div
                    className="hidden lg:block  max-h-[500px] rounded-2xl border border-gray-200  overflow-y-auto
    custom-scroll shadow-sm"
                  >
                    <table className="w-full">
                      <thead>
                        <tr className="bg-[#3c8a8c] text-white">
                          <th className="p-4 text-center">Season</th>
                          <th className="p-4 text-center">Period</th>
                          <th className="p-4 text-center">Min Stay</th>
                          <th className="p-4 text-center">Nightly Rate</th>
                        </tr>
                      </thead>

                      <tbody className="text-center">
                        {(listing.rates || []).map((rate, index) => (
                          <tr
                            key={index}
                            className="
    border-b
    hover:bg-[#f7fbfb]
    transition
  "
                          >
                            <td className="p-4 font-semibold">{rate.season}</td>

                            <td className="p-4 text-center whitespace-nowrap">
                              {new Date(rate.from).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                              {" - "}
                              {new Date(rate.to).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </td>

                            <td className="p-4 text-center">
                              {rate.minNights} Nights
                            </td>

                            <td className="p-4  font-bold text-[#3c8a8c]">
                              ${Number(rate.nightly || 0).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}

                  <div className="lg:hidden space-y-4">
                    {(listing.rates || []).map((rate, index) => (
                      <div
                        key={index}
                        className="
            bg-white
            border
            rounded-2xl
            p-5
            shadow-sm
          "
                      >
                        <h3 className="text-xl font-bold text-[#3c8a8c]">
                          {rate.season}
                        </h3>

                        <div className="mt-4 space-y-3 text-gray-700">
                          <div className="flex justify-between">
                            <span>Period</span>

                            <span className="font-medium">
                              {rate.from} - {rate.to}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span>Minimum Stay</span>

                            <span className="font-medium">
                              {rate.minNights} Nights
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span>Nightly Rate</span>

                            <span className="font-bold text-[#3c8a8c]">
                              ${Number(rate.nightly || 0).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
              {/* VIDEO */}
          {listing.video?.youtube && (
            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-4">Property Video</h2>
              <iframe
                src={getYoutubeEmbed(listing.video.youtube)}
                className="w-full h-80 rounded-xl border"
                allowFullScreen
                title="video"
              />
            </div>
          )}


            {/* MAP */}
            {listing?.location?.lat && listing?.location?.lng && (
              <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">Location</h2>

                <iframe
                  src={getMapEmbedUrl(
                    listing.location.lat,
                    listing.location.lng,
                  )}
                  className="w-full h-96 rounded-xl border"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Property Location"
                />
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="w-full lg:w-[480px] flex-shrink-0">
            <div className="sticky top-28">
              <BookingWidget listing={listing} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetails;

//  {/* RIGHT SIDEBAR */}
//           <div>
//              <div className="sticky top-24 self-start">
//           <div className="bg-teal-700 text-white p-6 rounded-2xl shadow-lg">
//             <h2 className="text-2xl sm:text-3xl font-light mb-1">CHATEAU ST TROPEZ</h2>
//             <p className="text-sm opacity-90 mb-6">4 Beds | 4 Baths | 12 Guests</p>

//             <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-md">
//               <form className="space-y-4">
//                 {/* Arrival & Departure */}
//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <div className="flex-1">
//                     <label htmlFor="arrivalDate" className="block text-sm font-medium text-gray-700 mb-1">
//                       ARRIVAL
//                     </label>
//                     <input
//                       type="date"
//                       id="arrivalDate"
//                       name="arrivalDate"
//                       value={formData.arrivalDate}
//                       onChange={handleFormChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-1">
//                       DEPARTURE
//                     </label>
//                     <input
//                       type="date"
//                       id="departureDate"
//                       name="departureDate"
//                       value={formData.departureDate}
//                       onChange={handleFormChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     />
//                   </div>
//                 </div>

//                 {/* Adults & Children */}
//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <div className="flex-1">
//                     <label htmlFor="adults" className="block text-sm font-medium text-gray-700 mb-1">
//                       ADULTS
//                     </label>
//                     <select
//                       id="adults"
//                       name="adults"
//                       value={formData.adults}
//                       onChange={handleFormChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     >
//                       {[...Array(10).keys()].map(i => (
//                         <option key={i + 1} value={i + 1}>{i + 1}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="flex-1">
//                     <label htmlFor="children" className="block text-sm font-medium text-gray-700 mb-1">
//                       CHILDREN
//                     </label>
//                     <select
//                       id="children"
//                       name="children"
//                       value={formData.children}
//                       onChange={handleFormChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     >
//                       {[...Array(6).keys()].map(i => (
//                         <option key={i} value={i}>{i}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 {/* Pets */}
//                 <div>
//                   <label htmlFor="pets" className="block text-sm font-medium text-gray-700 mb-1">
//                     PETS
//                   </label>
//                   <select
//                     id="pets"
//                     name="pets"
//                     value={formData.pets}
//                     onChange={handleFormChange}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
//                   >
//                     {[...Array(4).keys()].map(i => (
//                       <option key={i} value={i}>{i}</option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Book Now Button */}
//                 <div className="pt-4">
//                   <button
//                     type="button"
//                     onClick={handleBooking}
//                     className="w-full bg-teal-600 text-white font-semibold py-3 rounded-md shadow-lg hover:bg-teal-700 transition-colors"
//                   >
//                     BOOK NOW
//                   </button>
//                 </div>
//               </form>
//             </div>

//             {/* Questions Button */}
//             <div className="mt-4">
//               <button
//                 type="button"
//                 className="w-full border-2 border-white text-white font-semibold py-3 rounded-md transition-colors hover:bg-white hover:text-teal-700"
//               >
//                 QUESTIONS?
//               </button>
//             </div>

//             {/* Secure Booking Info */}
//             <div className="mt-6 text-center text-sm opacity-80">
//               🔒 Secure Booking Experience
//             </div>
//           </div>
//         </div>
//           </div>
//         </div>
//       </div>
//       </div>
