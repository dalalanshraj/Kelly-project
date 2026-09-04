 import Listing from "../models/Listing.js";
import Deal from "../models/Deal.js";

export const searchController = async (req, res) => {
  try {
    const {
      checkIn,
      checkOut,
      guests,
      bedrooms,
    } = req.query;

    console.log("SEARCH REQUEST:", {
      checkIn,
      checkOut,
      guests,
      bedrooms,
    });

    if (!checkIn || !checkOut) {
      return res.status(400).json({
        error: "Check-in and check-out dates are required",
      });
    }

    const start = new Date(`${checkIn}T00:00:00`);
    const end = new Date(`${checkOut}T00:00:00`);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        error: "Invalid dates",
      });
    }

    if (start >= end) {
      return res.status(400).json({
        error: "Check-out must be after check-in",
      });
    }

    const listings = await Listing.find({
      status: "published",
    });

    console.log("TOTAL PUBLISHED LISTINGS:", listings.length);

    const availableListings = listings.filter((listing) => {

      // =====================================================
      // 1️⃣ BEDROOM FILTER
      // =====================================================

      if (bedrooms) {
        const selectedBedrooms = Number(bedrooms);
        const listingBedrooms = Number(
          listing.property?.bedrooms
        );

        console.log(
          "BEDROOM CHECK:",
          listing.property?.title,
          "Selected:",
          selectedBedrooms,
          "Property:",
          listingBedrooms
        );

        // 5+ Bedrooms
        if (selectedBedrooms === 5) {
          if (listingBedrooms < 5) {
            return false;
          }
        }

        // Exact bedroom match
        else {
          if (listingBedrooms !== selectedBedrooms) {
            return false;
          }
        }
      }

      // =====================================================
      // 2️⃣ GUEST FILTER
      // =====================================================

      if (guests) {
        const maxSleeps = Number(
          listing.property?.maxSleeps
        );

        if (maxSleeps < Number(guests)) {
          return false;
        }
      }

      // =====================================================
      // 3️⃣ DATE / CALENDAR FILTER
      // =====================================================

      const hasConflict = listing.calendar?.some((day) => {

        if (day.status !== "R") {
          return false;
        }

        const bookedDate = new Date(day.date);

        return (
          bookedDate >= start &&
          bookedDate < end
        );
      });

      if (hasConflict) {
        return false;
      }

      // =====================================================
      // PROPERTY PASSED ALL FILTERS
      // =====================================================

      return true;
    });

    console.log(
      "AVAILABLE AFTER FILTER:",
      availableListings.map((listing) => ({
        id: listing._id,
        title: listing.property?.title,
        bedrooms: listing.property?.bedrooms,
      }))
    );

    // =====================================================
    // DEALS
    // =====================================================

    const today = new Date();

    const resultsWithDeals = await Promise.all(
      availableListings.map(async (listing) => {

        const deal = await Deal.findOne({
          listingId: listing._id,
          displayFrom: { $lte: today },
          displayEnd: { $gte: today },
        });

        return {
          ...listing._doc,
          deal: deal || null,
        };
      })
    );

    // =====================================================
    // RESPONSE
    // =====================================================

    res.json({
      results: resultsWithDeals,
      total: resultsWithDeals.length,
    });

  } catch (err) {

    console.error("Search error:", err);

    res.status(500).json({
      error: "Search failed",
    });
  }
};