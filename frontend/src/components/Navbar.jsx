import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Search, Mail, Phone, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import LOGO from "../assets/Logo/LOGO.png";
import { useLocation } from "react-router-dom";

const NavLink = ({ text, href, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const hasDropdown = !!children;

  return (
    <li className="relative group">
      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block">
        <a
          href={href || "#"}
          className="relative flex items-center gap-1 font-medium text-gray-800 py-2 hover:text-[#3c8a8c] transition-colors"
        >
          {text}

          {hasDropdown && (
            <ChevronRight
              className="
      w-4 h-4
      transition-transform
      duration-300
      group-hover:rotate-90
    "
            />
          )}

          <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#3c8a8c] " />
        </a>

        {hasDropdown && (
          <div
            className="
              absolute left-0 top-full
              pt-2
              opacity-0 invisible
              translate-y-2
              group-hover:opacity-100
              group-hover:visible
              group-hover:translate-y-0
              transition-all duration-300
              z-50
            "
          >
            <div
              className="
                w-72

                bg-white
                border border-gray-100
                shadow-[0_15px_50px_rgba(0,0,0,0.12)]
                overflow-hidden
              "
            >
              {children}
            </div>
          </div>
        )}
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden">
        <button
          onClick={() => hasDropdown && setMobileOpen(!mobileOpen)}
          className="w-full flex items-center justify-between py-4 border-b border-white/10"
        >
          <span>{text}</span>

          {hasDropdown && (
            <ChevronRight
              className={`w-5 h-5 transition-transform duration-300 ${
                mobileOpen ? "rotate-90" : ""
              }`}
            />
          )}
        </button>

        {hasDropdown && (
          <div
            className={`overflow-hidden transition-all duration-300 ${
              mobileOpen ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="pl-3 py-2 space-y-2">{children}</div>
          </div>
        )}
      </div>
    </li>
  );
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [properties, setProperties] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await api.get("/listings/public");
        setProperties(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProperties();
  }, []);
  const communities = [
    {
      name: "Seychelles Properties",
      slug: "seychelles-properties",
    },
    {
      name: "Laketown Wharf Properties",
      slug: "laketown-wharf-properties",
    },
    {
      name: "Shores Of Panama Properties",
      slug: "shores-of-panama-properties",
    },
  ];
  const filteredProperties = properties.filter((item) => {
    if (!searchTerm.trim()) return false;

    const searchWords = searchTerm.toLowerCase().trim().split(/\s+/);

    const titleWords = item.property?.title?.toLowerCase().split(/\s+/);

    return searchWords.every((word) =>
      titleWords.some((titleWord) => titleWord.includes(word)),
    );
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        menuOpen
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white  backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-8 lg:px-12 h-[110px] relative">
        {/* Desktop Left Menu */}
        <ul className="hidden md:flex items-center space-x-10 text-md  uppercase">
          <NavLink text="COMMUNITIES">
            <Link
              to="/community/Seychelles%20Properties"
              className="
      block
      px-5
      py-4
      hover:bg-[#3c8a8c]/5
      transition
    "
            >
              Seychelles Properties
            </Link>

            <Link
              to="/community/Laketown%20Wharf%20Properties"
              className="
      block
      px-5
      py-4
      hover:bg-[#3c8a8c]/5
      transition
    "
            >
              Laketown Wharf Properties
            </Link>

            <Link
              to="/community/Shores%20Of%20Panama%20Properties"
              className="
      block
      px-5
      py-4
      hover:bg-[#3c8a8c]/5
      transition
    "
            >
              Shores Of Panama Properties
            </Link>
          </NavLink>
          <li>
            <Link to={"/Specials"} className="group relative font-medium">
              SPECIALS
            </Link>
          </li>
          <li>
            <Link to={"/activities"} className="group relative font-medium">
              Things To Do
            </Link>
          </li>
          <br />
          {/* <NavLink text="AREA GUIDE">
            <Link
              to="/area-guide/activities"
              className="
      flex justify-between items-center
      px-5 py-4
      hover:bg-[#3c8a8c]/5
      transition
    "
            >
              <span>Activities</span>
            </Link>
          </NavLink> */}
          {/* <li>
            <Link
              to={"/property-management"}
              className="group relative font-medium"
            >
              PROPERTY MANAGEMENT
            </Link>
          </li> */}
        </ul>

        {/* Center Logo (Desktop) */}
        {/* Center Logo (Desktop) */}
        <div
          className="
    hidden md:block
    absolute
    left-[51%]
    top-0
    -translate-x-1/2
    z-50
  "
        >
          <Link to="/">
            <div className="relative w-[220px] h-[220px]">
              <div
                className="
          w-[180px]
          h-[180px]
          bg-white
          rounded-full
          shadow-[0_10px_0px_rgba(0,0,0,0.12)]
          flex
          items-center
          justify-center
          border-4
          border-white
        "
              >
                <img
                  src={LOGO}
                  alt="logo"
                  className="
            w-[150px]
            h-[150px]
            object-contain
          "
                />
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Right Menu */}
        <ul className="hidden md:flex items-center space-x-9 text-md">
          <li>
            <Link to={"/about"} className="group relative z-[9999] font-medium">
              ABOUT US
            </Link>
          </li>
          <li>
            <Link
              to={"/contact"}
              className="px-5 py-2 bg-[#3c8a8c] text-white rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              CONTACT
            </Link>
          </li>
          <li className="font-semibold text-md">+1 850 866 2077</li>
          <li className="cursor-pointer" onClick={() => setShowSearch(true)}>
            <Search className="w-5 h-5" />
          </li>
          {/* <li className="cursor-pointer">
            <Mail className="w-5 h-5" />
          </li> */}
        </ul>

       {/* Mobile Navbar */}
<div className="md:hidden w-full h-[82px] px-5 flex items-center border-b border-gray-100 bg-white">

  {/* Logo */}
  <Link
    to="/"
    className="flex-shrink-0"
  >
    <img
      src={LOGO}
      alt="logo"
      className="h-[98px] w-auto object-contain"
    />
  </Link>

  {/* Right Section */}
  <div className="ml-auto flex items-center gap-5">

    {/* Search */}
    <button
      onClick={() => setShowSearch(true)}
      className="
        w-11
        h-11
        rounded-full
        border
        border-gray-200
        flex
        items-center
        justify-center
        hover:bg-gray-50
        transition
      "
    >
      <Search
        size={20}
        className="text-gray-700"
      />
    </button>

    {/* Menu Button */}
    <button
      onClick={() => setMenuOpen(true)}
      className="
        h-11
        px-5
        rounded-full
        bg-[#3c8a8c]
        text-white
        flex
        items-center
        gap-2
        font-medium
        shadow-md
      "
    >
      <Menu size={18} />
      <span>Menu</span>
    </button>

  </div>

</div>
      </div>
      {/* BACKDROP */}
      {menuOpen && (
        <div
          className="
      fixed inset-0
      bg-black/50
      backdrop-blur-sm
      z-[9998]
      transition-all
      duration-300
    "
          onClick={() => setMenuOpen(false)}
        />
      )}
      {/* MOBILE DRAWER */}
      <div
        ref={menuRef}
        className={`
    fixed
    top-0
    left-0
    h-screen
    w-[92%]
    max-w-[380px]
    bg-white
    z-[9999]
    shadow-[20px_0_60px_rgba(0,0,0,0.25)]
    transition-all
    duration-300
    overflow-y-auto
    ${menuOpen ? "translate-x-0" : "-translate-x-full"}
  `}
      >
        {/* HEADER */}
        <div
  className="
    sticky
    top-0
    bg-white
    p-4
    flex
    items-center
    justify-between
    border-b
  "
>
  <img
    src={LOGO}
    alt="logo"
    className="h-22 object-contain"
  />

  <button
    onClick={() => setMenuOpen(false)}
    className="
      w-10
      h-10
      rounded-full
      bg-gray-100
      flex
      items-center
      justify-center
    "
  >
    <X size={20} />
  </button>
</div>

        {/* NAVIGATION */}
        <div className="p-5">
          <ul className="space-y-2">
            <li className="border-b border-gray-200">
              <button
                onClick={() =>
                  setOpenMenu(openMenu === "communities" ? null : "communities")
                }
                className="
      w-full
      flex
      justify-between
      items-center
      px-4
      py-4
      font-medium
    "
              >
                COMMUNITIES
                <ChevronRight
                  className={`
        w-5 h-5
        transition-all
        duration-300
        ${openMenu === "communities" ? "rotate-90" : ""}
      `}
                />
              </button>

              <div
                className={`
      overflow-hidden
      uppercase
      transition-all
      duration-300
      ${openMenu === "communities" ? "max-h-96" : "max-h-0"}
    `}
              >
                <Link
                  to="/community/Seychelles%20Properties"
                  className="block px-8 py-3 border-t border-gray-100"
                >
                  Seychelles Properties
                </Link>

                <Link
                  to="/community/Laketown%20Wharf%20Properties"
                  className="block px-8 py-3 border-t border-gray-100"
                >
                  Laketown Wharf Properties
                </Link>

                <Link
                  to="/community/Shores%20Of%20Panama%20Properties"
                  className="block px-8 py-3 border-t border-gray-100"
                >
                  Shores Of Panama Properties
                </Link>
              </div>
            </li>

            <li className="border-b border-gray-200">
              <Link to="/specials" className="block px-4 py-4 font-medium">
                SPECIALS
              </Link>
            </li>

            <li className="border-b border-gray-200">
              {/* <Link
                to="/property-management"
                className="block px-4 py-4 font-medium"
              >
                PROPERTY MANAGEMENT
              </Link>
               */}
            </li>

            <li className="border-b border-gray-200">
              <Link to="/about" className="block px-4 py-4 font-medium">
                ABOUT US
              </Link>
            </li>

            <li className="border-b border-gray-200">
              <Link to="/contact" className="block px-4 py-4 font-medium">
                CONTACT
              </Link>
            </li>

            <li className="border-b border-gray-200">
              <button
                onClick={() =>
                  setOpenMenu(openMenu === "guide" ? null : "guide")
                }
                className="
      w-full
      flex
      justify-between
      items-center
      px-4
      py-4
      font-medium
    "
              >
                AREA GUIDE
                <ChevronRight
                  className={`
        w-5 h-5
        transition-all
        duration-300
        ${openMenu === "guide" ? "rotate-90" : ""}
      `}
                />
              </button>

              <div
                className={`
      overflow-hidden
      transition-all
      duration-300
      ${openMenu === "guide" ? "max-h-96" : "max-h-0"}
    `}
              >
                <Link
                  to="/area-guide/activities"
                  className="
      flex justify-between items-center
      px-5 py-4
      hover:bg-[#3c8a8c]/5
      transition
    "
                >
                  <span>Activities</span>
                </Link>
              </div>
            </li>

            {/* <Link
        to="/property-management"
        className="
          flex
          items-center
          justify-between
          px-4
          py-4
          rounded-2xl
          bg-gray-50
          hover:bg-[#3c8a8c]/5
        "
      >
        PROPERTY MANAGEMENT
      </Link> */}

            {/* <Link
        to="/about"
        className="
          flex
          items-center
          justify-between
          px-4
          py-4
          rounded-2xl
          bg-gray-50
          hover:bg-[#3c8a8c]/5
        "
      >
        ABOUT US
      </Link> */}

            <Link
              to="/contact"
              className="
          flex
          items-center
          justify-center
          mt-6
          py-4
          rounded-2xl
          bg-[#3c8a8c]
          text-white
          font-semibold
          shadow-lg
        "
            >
              CONTACT US
            </Link>
          </ul>
        </div>

        {/* FOOTER */}
        <div className="p-5 border-t mt-6">
          <div className="text-center">
            <div className="font-bold text-lg text-[#3c8a8c]">
              +1 850 866 2077
            </div>

            <div className="text-sm text-gray-500 mt-1">Call us anytime</div>
          </div>
        </div>
      </div>{" "}
      {/* Custom CSS for the logo shape */}
      <style>{`
        .clip-shape-custom {
          clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 50% 100%, 0% 75%);
        }
      `}</style>
      {showSearch && (
        <div
          className="
      fixed
      inset-0
      bg-black/50
      backdrop-blur-sm
      z-[99999]
      flex
      items-start
      justify-center
      pt-24
    "
          onClick={() => setShowSearch(false)}
        >
          <div
            className="
        bg-white
        w-full
        max-w-2xl
        rounded-3xl
        shadow-2xl
        overflow-hidden
      "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-5 border-b flex items-center gap-3">
              <input
                autoFocus
                type="text"
                placeholder="Search property..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="
      flex-1
      border
      border-gray-200
      rounded-xl
      px-5
      py-4
      text-lg
      focus:outline-none
      focus:ring-2
      focus:ring-[#3c8a8c]
    "
              />

              <button
                onClick={() => {
                  setShowSearch(false);
                  setSearchTerm("");
                }}
                className="
      w-12
      h-12
      flex
      items-center
      justify-center
      rounded-xl
      bg-gray-100
      hover:bg-red-50
      hover:text-red-500
      transition
    "
              >
                <X size={22} />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[500px] overflow-y-auto">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((item) => (
                  <Link
                    key={item._id}
                    to={`/property/${item._id}`}
                    onClick={() => {
                      setShowSearch(false);
                      setSearchTerm("");
                    }}
                    className="
                block
                px-5
                py-4
                border-b
                hover:bg-gray-50
                transition
              "
                  >
                    <div className="font-semibold">{item.property?.title}</div>

                    <div className="text-sm text-gray-500 mt-1">
                      {item.property?.community}
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No properties found
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
