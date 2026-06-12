import { useState } from "react";
import api from "../api/axios";
import emailjs from "@emailjs/browser";
import { X } from "lucide-react";
import {
  FaCalendarAlt,
  FaUsers,
  FaChild,
} from "react-icons/fa";

export default function InquiryModal({
  propertyId,
  listing,
  checkIn,
  checkOut,
  adults,
  kids,
  onClose,
}) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // ==========================
      // SAVE TO DATABASE
      // ==========================

      const payload = {
        property: propertyId,

        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,

        Arrival: checkIn,
        Departure: checkOut,

        Adults: String(adults),
        Kids: String(kids),
      };

      await api.post("/inquiries", payload);

      // ==========================
      // EMAILJS
      // ==========================

      const templateParams = {
        property:
          listing?.property?.title || "",

        name: form.name,
        email: form.email,
        phone: form.phone,

        checkIn:
          new Date(checkIn).toLocaleDateString(),

        checkOut:
          new Date(checkOut).toLocaleDateString(),

        adults,
        kids,

        message: form.message,
      };

      await emailjs.send(
        "service_dgkqbam",
        "template_jk0rjyg",
        templateParams,
        "WEcEr8ZPeRbDNB9Ay"
      );

      alert("Inquiry Submitted Successfully");

      onClose();
    } catch (err) {
      console.log(err);

      alert(
        err?.response?.data?.message ||
          "Failed to submit inquiry"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <div
  className="fixed inset-0  z-[9999999] bg-black/80 backdrop-blur-md flex items-center  overflow-y-auto justify-center p-4 pt-28"

    onClick={onClose}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="
    relative
    mt-[120px]
    mb-10
    mx-auto
    w-full
    max-w-4xl
    bg-white
    rounded-[32px]
    "
    >
      {/* HEADER */}

      <div
        className="
        bg-gradient-to-r
        from-[#3c8a8c]
        to-[#61b9bb]
        text-white
        px-8
        py-8
      "
      >
        <button
          onClick={onClose}
          className="
          absolute
          right-5
          top-5
          w-10
          h-10
          rounded-full
          bg-white/20
          hover:bg-white/30
          flex
          items-center
          justify-center
          transition
        "
        >
          <X size={20} />
        </button>

        <h2 className="text-3xl md:text-4xl font-bold">
          Booking Inquiry
        </h2>

        <p className="mt-2 text-white/90">
          {listing?.property?.title}
        </p>
      </div>

      {/* BODY */}

      <div className="p-6 md:p-8">
        {/* STAY INFO */}

        <div
          className="
          grid
          grid-cols-2
          md:grid-cols-4
          gap-4
          mb-8
        "
        >
          <div className="bg-[#f7fbfb] rounded-2xl p-4 text-center border">
            <p className="text-xs uppercase text-gray-500">
              Arrival
            </p>

            <p className="font-semibold mt-1">
              {checkIn
                ? new Date(checkIn).toLocaleDateString()
                : "-"}
            </p>
          </div>

          <div className="bg-[#f7fbfb] rounded-2xl p-4 text-center border">
            <p className="text-xs uppercase text-gray-500">
              Departure
            </p>

            <p className="font-semibold mt-1">
              {checkOut
                ? new Date(checkOut).toLocaleDateString()
                : "-"}
            </p>
          </div>

          <div className="bg-[#f7fbfb] rounded-2xl p-4 text-center border">
            <p className="text-xs uppercase text-gray-500">
              Adults
            </p>

            <p className="font-semibold mt-1">
              {adults}
            </p>
          </div>

          <div className="bg-[#f7fbfb] rounded-2xl p-4 text-center border">
            <p className="text-xs uppercase text-gray-500">
              Kids
            </p>

            <p className="font-semibold mt-1">
              {kids}
            </p>
          </div>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              required
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="
              w-full
              h-14
              px-5
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              focus:ring-2
              focus:ring-[#3c8a8c]
              outline-none
            "
            />

            <input
              type="email"
              name="email"
              required
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="
              w-full
              h-14
              px-5
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              focus:ring-2
              focus:ring-[#3c8a8c]
              outline-none
            "
            />
          </div>

          <input
            type="text"
            name="phone"
            required
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="
            w-full
            h-14
            px-5
            rounded-xl
            border
            border-gray-200
            bg-gray-50
            focus:ring-2
            focus:ring-[#3c8a8c]
            outline-none
          "
          />

          <textarea
            rows={5}
            name="message"
            placeholder="Tell us about your trip..."
            value={form.message}
            onChange={handleChange}
            className="
            w-full
            rounded-xl
            border
            border-gray-200
            bg-gray-50
            p-5
            focus:ring-2
            focus:ring-[#3c8a8c]
            outline-none
          "
          />

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="
            w-full
            h-14
            rounded-xl
            bg-gradient-to-r
            from-[#3c8a8c]
            to-[#57b5b7]
            hover:scale-[1.01]
            transition-all
            duration-300
            text-white
            font-bold
            text-lg
            shadow-lg
          "
          >
            {loading
              ? "Submitting Inquiry..."
              : "Submit Inquiry"}
          </button>
        </form>

        <div className="mt-5 text-center text-sm text-gray-500">
          🔒 Your information is secure and never shared.
        </div>
      </div>
    </div>
  </div>
);
}