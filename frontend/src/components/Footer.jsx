import React from 'react';
import { Facebook, Twitter , Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import LOGO from "../assets/Logo/LOGO.png"


const Footer = () => {
  return (
    <footer className="w-full bg-white text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left space-y-12 md:space-y-0">
          
          {/* Left Column (Address & Phone) */}
          <div className="flex-1 max-w-sm">
            <h3 className="text-xl md:text-2xl font-serif tracking-wide mb-4">OUR ADDRESS</h3>
            <p className="text-gray-600 mb-6">
             5115 Gulf Dr, Panama City, FL, United States, Florida
            </p>
            <h3 className="text-xl md:text-2xl font-serif tracking-wide mb-4">GIVE US A CALL</h3>
            <span className="text-gray-800 text-lg font-bold">+1 850 866 2077</span>
          </div>

          {/* Center Column (Logo & Newsletter) */}
          <div className="flex-1 flex flex-col items-center">
            <img
              src={LOGO}
              alt="Destin Luxury Beach Rentals Logo"
              className="h-32 mb-6"
            />
            {/* <h3 className="text-xl font-serif tracking-wide mb-4">STAY UP TO DATE</h3> */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-2">
              {/* <input
                type="email"
                placeholder="Email Address*"
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
              /> */}
            
               <Link to="/admin/login">
              <button className="px-6 py-2 bg-[#3c8a8c] text-white rounded hover:bg-teal-700 transition-colors duration-300">
                 Login Owner
              </button>
              </Link>
            </div>
            <div className="flex space-x-4 mt-6">
              <a href="https://www.facebook.com/bestinpcbrentals/" className="p-2 rounded-full bg-[#3c8a8c] text-white hover:bg-teal-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              {/* <a href="#" className="p-2 rounded-full bg-[#3c8a8c] text-white hover:bg-teal-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a> */}
            </div>
            
          </div>

          {/* Right Column (Quick Links) */}
          <div className="flex-1 max-w-sm text-left">
            <h3 className="text-xl md:text-2xl font-serif tracking-wide mb-4">QUICK LINKS</h3>
            <ul className="space-y-2">
              <li><Link to={"/"} className="hover:text-[#3c8a8c] transition-colors">Home</Link></li>
              <li><Link to={"/about"} className="hover:text-[#3c8a8c] transition-colors">About</Link></li>
              <li><Link to={"/contact"} className="hover:text-[#3c8a8c] transition-colors">Contact Us</Link></li>
              <li><Link to={"/activities"} className="hover:text-[#3c8a8c] transition-colors"> Activities</Link></li>
              {/* <li><Link to={"/property-management"} className="hover:text-[#3c8a8c] transition-colors"> ƒ√Property Management</Link></li> */}
            </ul>
          </div>

        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-6 border-t border-gray-300 text-center text-sm text-gray-500">
          <p>2026 Copyright © & Powered by Digify America</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;