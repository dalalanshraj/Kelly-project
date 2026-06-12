import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./index.css";
import Navbar from "./components/Navbar";

import Footer from "./components/Footer";

// FRONTEND
import Hero from "./pages/Hero";
import Destincommunitypool from "./pages/rentals-props/DestinCommunityPool";
import ChateauStTropez from "./pages/rentals-props/ChateauStTropez";

// ADMIN
import AdminRoute from "./admin/AdminRoute";
import AdminLayout from "./admin/AdminLayout";
import Login from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import Listings from "./admin/pages/Listings";
import AddListing from "./admin/pages/AddListing";
import Bookings from "./admin/pages/Bookings";
import Users from "./admin/pages/Users";

// import SpecialsDeals from "./pages/Specials";
// import Reviews from "./pages/Reviews";
// import AboutUs from "./pages/About";
// import CommunityDetails from "./pages/CommunityDetails";
import GalleryAdmin from "./admin/pages/Gallery";
// import Gallery from "./pages/Gallerypage";
import ScrollToTop from "./components/ScrollToTop";
import ResultsPage from "./pages/Results";
import PropertyDetails from "./pages/PropertyDetails";
import CommunityPage from "./pages/CommunityPage";
import SpecialsPage from "./pages/Specials";
import ActivitiesSection from "./pages/Activities";
import PropertyManagement from "./pages/PropertyManagement";
import AboutSlider from "./pages/About";
import Contact from "./pages/Contact";

function App() {

  const location = useLocation();

  // 🔑 check: are we on admin page?
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
   <ScrollToTop />
       {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route
          path="/rentals/community-pool/"
          element={<Destincommunitypool />}
        />
        <Route path="/Chateau-St-Tropez/" element={<ChateauStTropez />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
       {/* ADMIN LOGIN */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/community/:slug" element={<CommunityPage />} />
        <Route path="/Specials" element={<SpecialsPage />} />
        <Route path="/area-guide/activities" element={<ActivitiesSection />} />
        <Route path="/property-management" element={<PropertyManagement />} />
        <Route path="/about" element={<AboutSlider />} />
        <Route path="/contact" element={<Contact />} />

        {/* ADMIN PAGES */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/listings"
          element={
            <AdminRoute>
              <AdminLayout>
                <Listings />
              </AdminLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/listings/property_add"
          element={
            <AdminRoute>
              <AdminLayout>
                <AddListing />
              </AdminLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/bookings"
          element={
            <AdminRoute>
              <AdminLayout>
                <Bookings />
              </AdminLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminLayout>
                <Users />
              </AdminLayout>
            </AdminRoute>
          }

        />
        <Route
          path="/admin/listings/:id"
          element={
            <AdminRoute>
              <AdminLayout>
                <AddListing />
              </AdminLayout>
            </AdminRoute>
          }
        />
         <Route
          path="/admin/gallery"
          element={
            <AdminRoute>
              <AdminLayout>
                <GalleryAdmin />
              </AdminLayout>
            </AdminRoute>
          }
        />
      </Routes>

      {/* FRONTEND ONLY */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
