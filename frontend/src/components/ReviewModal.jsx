import { useState } from "react";
import api from "../api/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { X, Star } from "lucide-react";

export default function ReviewModal({ listingId, onClose }) {
  const [loading, setLoading] = useState(false);

  const [hoverRating, setHoverRating] = useState(0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: 0,
    title: "",
    message: "",
    stayDate: null,
  });

  const submitReview = async () => {
    try {
      setLoading(true);

      await api.post(`/listings/${listingId}/reviews`, {
        ...form,
        stayDate: form.stayDate
          ? form.stayDate.toISOString().split("T")[0]
          : "",
      });

      alert("Review submitted successfully for approval.");

      onClose();
    } catch (err) {
      console.log(err);

      alert("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      fixed
      inset-0
      z-[999999]
      bg-black/70
      backdrop-blur-sm
      flex
      items-center
      justify-center
      p-4
    "
    >
      <div
        className="
        relative
        bg-white
        rounded-[30px]
        w-full
        max-w-2xl
        overflow-hidden
        shadow-[0_25px_80px_rgba(0,0,0,0.25)]
      "
      >
        {/* Header */}

        <div
          className="
          bg-gradient-to-r
          from-[#3c8a8c]
          to-[#63c0c2]
          text-white
          px-8
          py-5
        "
        >
          <button
            onClick={onClose}
            className="
            absolute
            top-5
            right-5
            bg-white/20
            hover:bg-white/30
            rounded-full
            p-2
          "
          >
            <X size={20} />
          </button>

          <h2 className="text-3xl font-bold">Leave A Review</h2>

          <p className="opacity-90 mt-2">
            Share your experience with future guests.
          </p>
        </div>

        {/* Body */}

        <div className="p-8">
          {/* Name + Email */}

          <div className="grid md:grid-cols-2 gap-4 mb-5">
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="
              w-full
              h-14
              px-4
              rounded-xl
              border
              border-gray-200
              focus:outline-none
              focus:ring-2
              focus:ring-[#3c8a8c]
            "
            />

            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="
              w-full
              h-14
              px-4
              rounded-xl
              border
              border-gray-200
              focus:outline-none
              focus:ring-2
              focus:ring-[#3c8a8c]
            "
            />
          </div>

          {/* Stay Date */}

          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block font-medium mb-2">Stay Date</label>

              <DatePicker
                selected={form.stayDate}
                onChange={(date) =>
                  setForm({
                    ...form,
                    stayDate: date,
                  })
                }
                maxDate={new Date()}
                placeholderText="Select stay date"
                dateFormat="MMM dd, yyyy"
                className="
      w-full
      h-12
      px-4
      rounded-xl
      border
      border-gray-200
    "
              />
            </div>

            <div>
              <label className="block font-medium mb-3">Rating</label>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() =>
                    setForm({
                      ...form,
                      rating: star,
                    })
                  }
                >
                  <Star
                    size={34}
                    fill={
                      (hoverRating || form.rating) >= star ? "#facc15" : "none"
                    }
                    color={
                      (hoverRating || form.rating) >= star
                        ? "#facc15"
                        : "#d1d5db"
                    }
                  />
                </button>
              ))}
            </div>
            </div>
          </div>

          {/* Title */}

          <input
            type="text"
            placeholder="Review Title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            className="
            w-full
            h-14
            px-4
            rounded-xl
            border
            border-gray-200
            mb-5
          "
          />

          {/* Message */}

          <textarea
            rows={3}
            placeholder="Tell us about your stay..."
            value={form.message}
            onChange={(e) =>
              setForm({
                ...form,
                message: e.target.value,
              })
            }
            className="
            w-full
            rounded-xl
            border
            border-gray-200
            p-4
            mb-6
            resize-none
          "
          />

          {/* Buttons */}

          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="
              flex-1
              h-14
              border
              border-gray-300
              rounded-xl
              font-semibold
            "
            >
              Cancel
            </button>

            <button
              onClick={submitReview}
              disabled={loading}
              className="
              flex-1
              h-14
              bg-[#3c8a8c]
              hover:bg-[#2e6f70]
              text-white
              rounded-xl
              font-semibold
            "
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </div>

          <div className="text-center mt-5 text-sm text-gray-500">
            ⭐ Reviews are manually approved before appearing publicly.
          </div>
        </div>
      </div>
    </div>
  );
}
