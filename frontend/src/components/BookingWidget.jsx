import { useEffect, useState } from "react";

import api from "../api/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InquiryModal from "./InquiryModal";

export default function BookingWidget({ listing }) {
  console.log("FULL LISTING =>", listing);
  console.log("DEAL =>", listing?.deal);
  const [calendar, setCalendar] = useState([]);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [preview, setPreview] = useState(null);
  const [loadingPrice, setLoadingPrice] = useState(false);

  const [openInquiry, setOpenInquiry] = useState(false);

  const nights =
    checkIn && checkOut
      ? Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
      : 0;

  // ===========================
  // LOAD CALENDAR
  // ===========================

  useEffect(() => {
    if (!listing?._id) return;

    loadCalendar();
  }, [listing]);

  const loadCalendar = async () => {
    try {
      const res = await api.get(`/listings/${listing._id}/calendar`);

      setCalendar(res.data.calendar || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!checkIn || !checkOut) {
      setPreview(null);
    }
  }, [checkIn, checkOut]);

  // ===========================
  // DISABLED DATES
  // ===========================

  const disabledDates = calendar
    .filter((d) => d.status === "R" || d.status === "H" || d.status === "CIN")
    .map((d) => new Date(d.date));

  // ===========================
  // LOAD PRICE
  // ===========================

  useEffect(() => {
    if (!checkIn || !checkOut) return;

    getPrice();
  }, [checkIn, checkOut]);

  const getPrice = async () => {
    try {
      setLoadingPrice(true);

      const res = await api.post("/bookings/preview", {
        propertyId: listing._id,

        checkIn: checkIn.toISOString().split("T")[0],

        checkOut: checkOut.toISOString().split("T")[0],
      });

      setPreview(res.data);
    } catch (err) {
      console.log(err);
      setPreview(null);
    } finally {
      setLoadingPrice(false);
    }
  };

  return (
    <div className="w-full shadow-xl rounded-full">
     <div className="rounded-2xl shadow-2xl border border-gray-200 bg-white overflow-visible">
        {/* HEADER */}
       <div
  className="
 bg-gradient-to-br
    from-[#3c8a8c]
    to-[#62bfc1]
    text-white
    px-6
    py-6
    relative
    z-0
"
>
          <h2
            className="text-4xl leading-tight font-bold"
          >
            {listing?.property?.title}
          </h2>
         {listing?.deal && (
  <div
    className="
      mt-4
      bg-yellow-400
      text-black
      px-4
      py-3
      rounded-xl
      font-semibold
    "
  >
    🎉 {listing.deal.title}

    <div className="mt-1 text-sm">
      Save $
      {Number(
        listing.deal.originalRate -
        listing.deal.discountedRate
      ).toLocaleString()}
      {" "}per night
    </div>
  </div>
)}

          <div className="flex gap-4 mt-3 text-sm opacity-90">
            <span>🛏 {listing?.property?.bedrooms || 0} Beds</span>

            <span>🚿 {listing?.property?.bathrooms || 0} Baths</span>

            <span>👥 {listing?.property?.maxSleeps || 0} Guests</span>
          </div>
          
        </div>

        {/* BODY */}
        <div className="p-8">
          {/* ARRIVAL / DEPARTURE */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm font-bold uppercase mb-2">
                Arrival
              </label>

           <DatePicker
  selected={checkIn}
  onChange={(date) => {
    setCheckIn(date);
    setCheckOut(null);
    setPreview(null);
  }}
  minDate={new Date()}
  excludeDates={disabledDates}
  placeholderText="Arrival Date"
  dateFormat="MMM dd, yyyy"

  popperPlacement="bottom-start"
  portalId="root"
  popperClassName="booking-datepicker-popper"

  className="
    w-full
    h-14
    px-4
    bg-white
    border
    border-gray-200
    rounded-xl
    bg-gray-50
  "
/>
            </div>

            <div>
              <label className="block text-sm font-bold uppercase mb-2">
                Departure
              </label>

             <DatePicker
  selected={checkOut}
  onChange={(date) => setCheckOut(date)}
  minDate={
    checkIn
      ? new Date(checkIn.getTime() + 86400000)
      : new Date()
  }
  excludeDates={disabledDates}
  placeholderText="Departure Date"
  dateFormat="MMM dd, yyyy"

  popperPlacement="bottom-start"
  portalId="root"
  popperClassName="booking-datepicker-popper"

  className="
    w-full
    h-14
    px-4
    border
    border-gray-200
    rounded-xl
    bg-gray-50
  "
/>
            </div>
          </div>

          {/* ADULTS / KIDS */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-bold uppercase mb-2">
                Adults
              </label>

              <select
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                className="w-full h-14 px-4 border border-gray-300 rounded-lg"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold uppercase mb-2">
                Children
              </label>

              <select
                value={kids}
                onChange={(e) => setKids(e.target.value)}
                className="w-full h-14 px-4 border border-gray-300 rounded-lg"
              >
                {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* NO DATE SELECTED */}

          {!checkIn || !checkOut ? (
            <div className="bg-[#f7fbfb] border border-[#d9eeee] rounded-2xl p-6 text-center">
              <div className="text-4xl mb-2">📅</div>

              <p className="font-semibold text-gray-700">
                Select your stay dates
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Pricing will appear automatically after selecting arrival and
                departure.
              </p>
            </div>
          ) : loadingPrice ? (
            <div className="text-center py-6">Calculating Price...</div>
          ) : preview ? (
            <>
            {listing?.deal && (
  <div
    className="
      mb-5
      border
      border-green-200
      bg-green-50
      rounded-xl
      p-4
    "
  >
    <div className="font-bold text-green-700">
      Active Deal
    </div>

    <div className="text-sm mt-1">
      {listing.deal.title}
    </div>

    {listing.deal.description && (
      <div className="text-xs text-gray-600 mt-2">
        {listing.deal.description}
      </div>
    )}
  </div>
)}
              {/* PRICE BOX */}

              {/* PRICE BREAKDOWN */}

              <div className="bg-[#f8fafa] border border-[#d9eeee] rounded-2xl p-5">
             <div className="flex justify-between mb-3">
  <span>Rental Rate ({nights} nights)</span>

  <div className="text-right">
    {listing?.deal ? (
      <>
        <div className="text-sm line-through text-gray-400">
          $
          {Number(
            listing.deal.originalRate * nights
          ).toLocaleString()}
        </div>

        <div className="font-bold text-green-600">
          $
          {Number(
            listing.deal.discountedRate * nights
          ).toLocaleString()}
        </div>
      </>
    ) : (
      <span className="font-semibold">
        ${Number(preview.subtotal || 0).toLocaleString()}
      </span>
    )}
  </div>
</div>

                {preview.extraFees?.map((fee, index) => (
                  <div
                    key={index}
                    className="flex justify-between mb-3 text-gray-600"
                  >
                    <span>{fee.name}</span>

                    <span>${Number(fee.amount || 0).toLocaleString()}</span>
                  </div>
                ))}

                <div className="border-t mt-4 pt-4 flex justify-between items-center">
                  <span className="text-lg font-semibold">Estimated Total</span>

                  <span className="text-3xl font-bold text-[#3c8a8c]">
                    ${Number(preview.total || 0).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* BOOK NOW */}

              <button
                onClick={() => setOpenInquiry(true)}
                className="
              w-full
              h-14
              bg-[#4ca1a3]
              hover:bg-[#3c8a8c]
              text-white
              font-bold
              text-lg
              rounded-lg
            "
              >
                BOOK NOW
              </button>
              {openInquiry && (
                <InquiryModal
                  propertyId={listing._id}
                  listing={listing}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  adults={adults}
                  kids={kids}
                  onClose={() => setOpenInquiry(false)}
                />
              )}

              {/* QUESTIONS */}

              <div className="text-center mt-5 text-gray-500">
                🔒 Secure Booking Experience
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
