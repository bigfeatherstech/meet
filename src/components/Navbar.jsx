import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiChevronDown, FiMenu, FiX, FiHome, FiCoffee, FiPackage, FiDroplet, FiWind, FiSun, FiTool, FiZap, FiMonitor, FiTruck, FiSettings, FiMoreVertical } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SearchModal from '../components/SearchModal/SearchModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileActiveMenu, setMobileActiveMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const menuRefs = useRef([]);
  const timeoutRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!menuRefs.current.some(ref => ref && ref.contains(event.target))) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = (index) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  // Toggle mobile menu item
  const toggleMobileMenu = (index) => {
    setMobileActiveMenu(mobileActiveMenu === index ? null : index);
  };

  // Icons for all 11 categories
  const getMenuIcon = (categoryName) => {
    switch(categoryName) {
      case 'Home Appliances':
        return <FiHome className="mr-2" size={18} />;
      case 'Kitchen Appliances':
        return <FiCoffee className="mr-2" size={18} />;
      case 'Large Appliances':
        return <FiPackage className="mr-2" size={18} />;
      case 'Personal Care Appliances':
        return <FiDroplet className="mr-2" size={18} />;
      case 'Heating & Cooling':
        return <FiWind className="mr-2" size={18} />;
      case 'Cleaning Appliances':
        return <FiSun className="mr-2" size={18} />;
      case 'Tools & Equipment':
        return <FiTool className="mr-2" size={18} />;
      case 'Lighting & Electricals':
        return <FiZap className="mr-2" size={18} />;
      case 'Smart & IoT':
        return <FiMonitor className="mr-2" size={18} />;
      case 'Commercial':
        return <FiTruck className="mr-2" size={18} />;
      case 'Spare Parts':
        return <FiSettings className="mr-2" size={18} />;
      default:
        return null;
    }
  };

  // Open search modal
  const openSearchModal = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsSearchModalOpen(true);
  };

  // Handle search bar click
  const handleSearchBarClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openSearchModal();
  };

  // Handle search query change
  const handleNavbarSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Clear search query
  const clearSearchQuery = () => {
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsSearchModalOpen(false);
    setIsSearchFocused(false);
  };

  // Category data with optimized names
  const categoryData = [
    {
      category_name: "Home Appliances",
      short_name: "Home",
      icon: <FiHome size={16} />,
      products: [
        "Ceiling Fans", "Table Fans", "Wall Fans", "Exhaust Fans",
        "Air Coolers", "Room Heaters", "Water Geysers", "Air Purifiers"
      ]
    },
    {
      category_name: "Kitchen Appliances",
      short_name: "Kitchen",
      icon: <FiCoffee size={16} />,
      products: [
        "Mixer Grinder", "Juicer Mixer", "Induction Cooktop", "Electric Kettle",
        "Rice Cooker", "Microwave Oven", "OTG Oven", "Toaster & Sandwich Maker", "Coffee Maker"
      ]
    },
    {
      category_name: "Large Appliances",
      short_name: "Large",
      icon: <FiPackage size={16} />,
      products: [
        "Refrigerator", "Washing Machine", "Dishwasher",
        "Air Conditioner", "Deep Freezer"
      ]
    },
    {
      category_name: "Personal Care Appliances",
      short_name: "Personal",
      icon: <FiDroplet size={16} />,
      products: [
        "Hair Dryer", "Hair Straightener", "Trimmer",
        "Shaver", "Electric Toothbrush", "Massager"
      ]
    },
    {
      category_name: "Heating & Cooling",
      short_name: "Heating",
      icon: <FiWind size={16} />,
      products: [
        "Room Heaters", "Water Heaters", "Air Coolers", "Dehumidifiers"
      ]
    },
    {
      category_name: "Cleaning Appliances",
      short_name: "Cleaning",
      icon: <FiSun size={16} />,
      products: [
        "Vacuum Cleaner", "Handheld Vacuum", "Steam Cleaner",
        "Floor Cleaner", "Robotic Vacuum"
      ]
    },
    {
      category_name: "Tools & Equipment",
      short_name: "Tools",
      icon: <FiTool size={16} />,
      products: [
        "Electric Drill", "Heat Gun", "Soldering Machine",
        "Angle Grinder", "Power Tool Accessories"
      ]
    },
    {
      category_name: "Lighting & Electricals",
      short_name: "Lighting",
      icon: <FiZap size={16} />,
      products: [
        "LED Bulbs", "LED Tube Lights", "Smart Lights",
        "Emergency Lights", "Inverters & UPS", "Voltage Stabilizers"
      ]
    },
    {
      category_name: "Smart & IoT",
      short_name: "Smart",
      icon: <FiMonitor size={16} />,
      products: [
        "Smart Plugs", "Smart Switches", "Smart Fans",
        "Smart Kitchen Appliances"
      ]
    },
    {
      category_name: "Commercial",
      short_name: "Commercial",
      icon: <FiTruck size={16} />,
      products: [
        "Commercial Mixer", "Commercial Oven", "Display Freezer", "Water Dispenser"
      ]
    },
    {
      category_name: "Spare Parts",
      short_name: "Spare Parts",
      icon: <FiSettings size={16} />,
      products: [
        "Appliance Motors", "Heating Elements", "Filters",
        "Blades & Attachments", "Power Cables & Adapters"
      ]
    }
  ];

  // First 4 categories for main nav
  const mainCategories = categoryData.slice(0, 4);
  // Remaining 7 categories for "More" dropdown
  const moreCategories = categoryData.slice(4);

  const bluePrimary = 'rgb(0, 42, 100)';
  const blueSecondary = 'rgb(0, 61, 130)';
  const blueDark = 'rgb(0, 18, 36)';
  const blueLight = 'rgb(235, 242, 255)';

  return (
    <>
      {/* Top Announcement Bar */}
      <div 
        className="text-white text-sm"
        style={{ background: `linear-gradient(135deg, ${blueDark} 0%, ${bluePrimary} 50%, ${blueSecondary} 100%)` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center space-x-4 md:space-x-6">
              <span className="hidden sm:inline">🎁 Holiday Sale: Up to 40% Off</span>
              <span className="hidden lg:inline">|</span>
              <span className="hidden lg:inline">📦 Free Shipping Over $499</span>
            </div>
            <div className="flex items-center space-x-4 md:space-x-6">
              <a href="#" className="hover:text-gray-200 transition text-xs md:text-sm">For Business</a>
              <a href="#" className="hover:text-gray-200 transition text-xs md:text-sm">Support</a>
              <a href="#" className="hover:text-gray-200 transition text-xs md:text-sm hidden md:inline">Store Locator</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* First Row: Logo, Search, Navigation Links */}
          <div className="flex items-center justify-between py-4">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <button 
                className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
              <a href="/" className="text-2xl font-bold tracking-tight">
                <span style={{ color: bluePrimary }}>Meet </span>
                 
                <span className="text-black">Appliances Ltd</span>
              </a>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products, brands, and categories..."
                  className="w-full px-4 py-3 pl-12 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer transition-all"
                  onClick={handleSearchBarClick}
                  onChange={handleNavbarSearchChange}
                  value={searchQuery}
                  readOnly={false}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                />
                <div 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={handleSearchBarClick}
                >
                  <FiSearch size={20} />
                </div>
                {searchQuery && (
                  <button
                    onClick={clearSearchQuery}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    aria-label="Clear search"
                  >
                    <FiX size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link 
                to="/about" 
                className="text-gray-700 font-medium hover:text-blue-600 transition-colors text-sm whitespace-nowrap"
                style={{ '--tw-text-opacity': 1, color: `rgba(0, 42, 100, var(--tw-text-opacity))` }}
              >
                About Us
              </Link>
              <Link 
                to="/products" 
                className="text-gray-700 font-medium hover:text-blue-600 transition-colors text-sm whitespace-nowrap"
                style={{ '--tw-text-opacity': 1, color: `rgba(0, 42, 100, var(--tw-text-opacity))` }}
              >
                Products
              </Link>
              <Link 
                to="/career" 
                className="text-gray-700 font-medium hover:text-blue-600 transition-colors text-sm whitespace-nowrap"
                style={{ '--tw-text-opacity': 1, color: `rgba(0, 42, 100, var(--tw-text-opacity))` }}
              >
                Career
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 font-medium hover:text-blue-600 transition-colors text-sm whitespace-nowrap"
                style={{ '--tw-text-opacity': 1, color: `rgba(0, 42, 100, var(--tw-text-opacity))` }}
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="lg:hidden mb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-3 pl-12 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                onClick={handleSearchBarClick}
                onChange={handleNavbarSearchChange}
                value={searchQuery}
                readOnly={false}
              />
              <div 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={handleSearchBarClick}
              >
                <FiSearch size={20} />
              </div>
              {searchQuery && (
                <button
                  onClick={clearSearchQuery}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  aria-label="Clear search"
                >
                  <FiX size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Desktop Categories Navigation */}
          <div className="hidden lg:flex items-center justify-between border-t pt-3 pb-3">
            {/* First 4 Categories */}
            <div className="flex items-center space-x-0">
              {mainCategories.map((category, index) => (
                <div
                  key={category.category_name}
                  ref={el => menuRefs.current[index] = el}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="flex items-center px-4 py-2.5 text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm whitespace-nowrap">
                    <span className="mr-2">{category.icon}</span>
                    {category.category_name}
                    <FiChevronDown className={`ml-1 transition-transform ${activeMenu === index ? 'rotate-180' : ''}`} size={14} />
                  </button>

                  {/* Mega Dropdown */}
                  {activeMenu === index && (
                    <div className="absolute left-0 top-full mt-1 w-[650px] bg-white shadow-2xl rounded-lg border border-gray-200 z-50 overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-center mb-6 pb-4 border-b">
                          <span className="mr-3 text-blue-600">{category.icon}</span>
                          <h3 className="text-xl font-bold text-gray-900">{category.category_name}</h3>
                        </div>
                        
                        {/* Products Grid - 2 columns showing all products */}
                        <div className="grid grid-cols-2 gap-8">
                          {/* Left Column - First half of products */}
                          <div>
                            <ul className="space-y-3">
                              {category.products.slice(0, Math.ceil(category.products.length / 2)).map((product, idx) => (
                                <li key={idx}>
                                  <a 
                                    href="#" 
                                    className="text-gray-600 hover:text-blue-600 transition-colors flex items-center group/item"
                                  >
                                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-3 group-hover/item:bg-blue-600 transition"></span>
                                    <span className="text-sm">{product}</span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Right Column - Second half of products */}
                          <div>
                            <ul className="space-y-3">
                              {category.products.slice(Math.ceil(category.products.length / 2)).map((product, idx) => (
                                <li key={idx}>
                                  <a 
                                    href="#" 
                                    className="text-gray-600 hover:text-blue-600 transition-colors flex items-center group/item"
                                  >
                                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-3 group-hover/item:bg-blue-600 transition"></span>
                                    <span className="text-sm">{product}</span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* View All Link */}
                        <div className="mt-6 pt-4 border-t text-center">
                          <a 
                            href="#" 
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors text-sm"
                          >
                            View All {category.category_name}
                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* More Categories Dropdown */}
              <div
                ref={el => menuRefs.current[4] = el}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(4)}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center px-4 py-2.5 text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm whitespace-nowrap">
                  <FiMoreVertical className="mr-2" size={16} />
                  More Categories
                  <FiChevronDown className={`ml-1 transition-transform ${activeMenu === 4 ? 'rotate-180' : ''}`} size={14} />
                </button>

                {/* More Categories Mega Dropdown */}
                {activeMenu === 4 && (
                  <div className="absolute right-0 top-full mt-1 w-[900px] bg-white shadow-2xl rounded-lg border border-gray-200 z-50 overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b">All Categories</h3>
                      
                      <div className="grid grid-cols-4 gap-6">
                        {moreCategories.map((category, index) => (
                          <div key={category.category_name} className="group/category">
                            <div className="flex items-center mb-3">
                              <span className="mr-2 text-blue-600">{category.icon}</span>
                              <h4 className="font-bold text-gray-900 text-sm" style={{ color: bluePrimary }}>
                                {category.category_name}
                              </h4>
                            </div>
                            <ul className="space-y-2">
                              {category.products.slice(0, 4).map((product, idx) => (
                                <li key={idx}>
                                  <a 
                                    href="#" 
                                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm block py-1"
                                  >
                                    • {product}
                                  </a>
                                </li>
                              ))}
                              <li>
                                <a 
                                  href="#" 
                                  className="text-blue-600 hover:text-blue-800 font-medium text-sm block mt-2"
                                >
                                  View All →
                                </a>
                              </li>
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[120px] bg-white z-40 overflow-y-auto animate-slideIn">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
              {/* Mobile Navigation Links */}
              <div className="grid grid-cols-2 gap-3 mb-6 pb-4 border-b">
                <Link 
                  to="/about" 
                  className="text-gray-700 font-medium text-sm px-4 py-3 rounded-lg hover:bg-blue-50 transition text-center"
                  style={{ color: bluePrimary }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link 
                  to="/products" 
                  className="text-gray-700 font-medium text-sm px-4 py-3 rounded-lg hover:bg-blue-50 transition text-center"
                  style={{ color: bluePrimary }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
                <Link 
                  to="/career" 
                  className="text-gray-700 font-medium text-sm px-4 py-3 rounded-lg hover:bg-blue-50 transition text-center"
                  style={{ color: bluePrimary }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Career
                </Link>
                <Link 
                  to="/contact" 
                  className="text-gray-700 font-medium text-sm px-4 py-3 rounded-lg hover:bg-blue-50 transition text-center"
                  style={{ color: bluePrimary }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </div>

              {/* All Categories in Mobile */}
              <div className="space-y-1">
                {categoryData.map((category, index) => (
                  <div key={category.category_name} className="border-b border-gray-100 last:border-b-0">
                    <button 
                      className="flex items-center justify-between w-full py-4 px-2 text-left font-medium text-gray-800 hover:text-blue-600 transition"
                      onClick={() => toggleMobileMenu(index)}
                    >
                      <div className="flex items-center">
                        <span className="mr-3 text-blue-600">{category.icon}</span>
                        <span>{category.category_name}</span>
                      </div>
                      <FiChevronDown className={`transition-transform ${mobileActiveMenu === index ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {mobileActiveMenu === index && (
                      <div className="pb-4 pl-10 pr-2">
                        <div className="bg-blue-50 rounded-lg p-4">
                          <div className="grid grid-cols-2 gap-3">
                            {category.products.map((product, idx) => (
                              <a 
                                key={idx}
                                href="#" 
                                className="text-gray-600 text-sm px-3 py-2 bg-white rounded hover:bg-blue-100 transition"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                • {product}
                              </a>
                            ))}
                          </div>
                          <a 
                            href="#" 
                            className="inline-block mt-4 text-blue-600 font-medium text-sm hover:text-blue-800 transition"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            View All Products →
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchModalOpen}
        onClose={handleModalClose}
        initialQuery={searchQuery}
      />

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateY(-10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.2s ease-out;
        }
        
        @media (max-width: 1024px) {
          .lg\\:hidden + div {
            max-height: calc(100vh - 120px);
            overflow-y: auto;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;

// import React, { useState, useEffect, useRef } from 'react';
// import { FiSearch, FiUser, FiShoppingCart, FiChevronDown, FiMenu, FiX, FiSmartphone, FiTv, FiHome, FiMonitor } from 'react-icons/fi';
// import { Link } from 'react-router-dom';
// import SearchModal from '../components/SearchModal/SearchModal';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeMenu, setActiveMenu] = useState(null);
//   const [scrolled, setScrolled] = useState(false);
//   const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isSearchFocused, setIsSearchFocused] = useState(false);
//   const menuRefs = useRef([]);
//   const timeoutRef = useRef(null);
//   const searchInputRef = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!menuRefs.current.some(ref => ref && ref.contains(event.target))) {
//         setActiveMenu(null);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleMouseEnter = (index) => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     setActiveMenu(index);
//   };

//   const handleMouseLeave = () => {
//     timeoutRef.current = setTimeout(() => {
//       setActiveMenu(null);
//     }, 150);
//   };

//   // Icons for menu categories
//   const getMenuIcon = (title) => {
//     switch(title) {
//       case 'Mobile':
//         return <FiSmartphone className="mr-2" size={18} />;
//       case 'TV & Audio':
//         return <FiTv className="mr-2" size={18} />;
//       case 'Appliances':
//         return <FiHome className="mr-2" size={18} />;
//       case 'Computing':
//         return <FiMonitor className="mr-2" size={18} />;
//       default:
//         return null;
//     }
//   };

//   // Open search modal
//   const openSearchModal = (e) => {
//     e?.preventDefault();
//     e?.stopPropagation();
//     setIsSearchModalOpen(true);
//   };

//   // Handle search bar click
//   const handleSearchBarClick = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     openSearchModal();
    
//     // Transfer current search input value if any
//     if (searchQuery.trim()) {
//       // Query is already in state, modal will pick it up
//     }
//   };

//   // Handle search query change in navbar
//   const handleNavbarSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchQuery(value);
//     // Don't open modal on typing, only on click
//   };

//   // Clear search query
//   const clearSearchQuery = () => {
//     setSearchQuery('');
//     setIsSearchFocused(false);
//   };

//   // Handle modal close
//   const handleModalClose = () => {
//     setIsSearchModalOpen(false);
//     // Reset focus state
//     setIsSearchFocused(false);
//   };

//   const megaMenuData = [
//     {
//       title: 'Mobile',
//       icon: <FiSmartphone size={16} />,
//       sections: [
//         {
//           title: 'Smartphones',
//           items: ['Galaxy S24 Series', 'Galaxy Z Fold5', 'Galaxy Z Flip5', 'Galaxy A Series']
//         },
//         {
//           title: 'Tablets',
//           items: ['Galaxy Tab S9', 'Galaxy Tab A9', 'Galaxy Tab Active5']
//         },
//         {
//           title: 'Wearables',
//           items: ['Galaxy Watch6', 'Galaxy Buds2 Pro', 'Galaxy Fit3']
//         },
//         {
//           title: 'Accessories',
//           items: ['Cases', 'Screen Protectors', 'Chargers', 'Audio']
//         }
//       ]
//     },
//     {
//       title: 'TV & Audio',
//       icon: <FiTv size={16} />,
//       sections: [
//         {
//           title: 'TVs',
//           items: ['Neo QLED 8K', 'OLED', 'The Frame', 'The Serif']
//         },
//         {
//           title: 'Audio',
//           items: ['Soundbars', 'Wireless Speakers', 'Home Theater']
//         },
//         {
//           title: 'Projectors',
//           items: ['The Premiere', 'Freestyle']
//         },
//         {
//           title: 'Accessories',
//           items: ['Wall Mounts', 'Remote Controls', 'Cables']
//         }
//       ]
//     },
//     {
//       title: 'Appliances',
//       icon: <FiHome size={16} />,
//       sections: [
//         {
//           title: 'Refrigerators',
//           items: ['Bespoke', 'Family Hub', 'French Door']
//         },
//         {
//           title: 'Washers & Dryers',
//           items: ['Bespoke AI', 'QuickDrive', 'AddWash']
//         },
//         {
//           title: 'Air Solutions',
//           items: ['WindFree™ AC', 'Air Purifiers']
//         },
//         {
//           title: 'Cooking',
//           items: ['Induction Cooktops', 'Microwaves', 'Ovens']
//         }
//       ]
//     },
//     {
//       title: 'Computing',
//       icon: <FiMonitor size={16} />,
//       sections: [
//         {
//           title: 'Monitors',
//           items: ['Odyssey', 'Smart Monitor', 'ViewFinity']
//         },
//         {
//           title: 'Laptops',
//           items: ['Galaxy Book4', 'Notebook', 'Chromebook']
//         },
//         {
//           title: 'Memory',
//           items: ['SSD', 'Memory Cards', 'USB Drives']
//         },
//         {
//           title: 'Printers',
//           items: ['Smart Printers', 'Laser Printers']
//         }
//       ]
//     }
//   ];

//   const bluePrimary = 'rgb(0, 42, 100)';
//   const blueSecondary = 'rgb(0, 61, 130)';
//   const blueDark = 'rgb(0, 18, 36)';

//   return (
//     <>
//       {/* Top Announcement Bar */}
//       <div 
//         className="text-white text-sm"
//         style={{ background: `linear-gradient(135deg, ${blueDark} 0%, ${bluePrimary} 50%, ${blueSecondary} 100%)` }}
//       >
//         <div className="samsung-container">
//           <div className="flex justify-between items-center py-2">
//             <div className="flex items-center space-x-6">
//               <span className="hidden md:inline">🎁 Holiday Sale: Up to 40% Off</span>
//               <span className="hidden lg:inline">|</span>
//               <span className="hidden lg:inline">📦 Free Shipping Over $499</span>
//             </div>
//             <div className="flex items-center space-x-6">
//               <a href="#" className="hover:text-gray-200 transition text-xs md:text-sm">For Business</a>
//               <a href="#" className="hover:text-gray-200 transition text-xs md:text-sm">Support</a>
//               <a href="#" className="hover:text-gray-200 transition text-xs md:text-sm hidden md:inline">Store Locator</a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Navbar */}
//       <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}>
//         <div className="samsung-container">
//           {/* First Row: Logo, Search, Actions */}
//           <div className="flex items-center justify-between py-4">
//             {/* Logo */}
//             <div className="flex items-center space-x-4">
//               <button 
//                 className="lg:hidden p-2"
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 aria-label={isMenuOpen ? "Close menu" : "Open menu"}
//               >
//                 {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//               </button>
//               <a href="/" className="text-2xl font-bold tracking-tight">
//                 <span style={{ color: bluePrimary }}>ELECTRO</span>
//                 <span className="text-black">STORE</span>
//               </a>
//             </div>

//             {/* Search Bar - Desktop */}
//             <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
//               <div className="relative w-full">
//                 <input
//                   ref={searchInputRef}
//                   type="text"
//                   placeholder="Search products, brands, and categories..."
//                   className="w-full px-4 py-3 pl-12 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 cursor-pointer transition-all"
//                   style={{ '--tw-ring-color': bluePrimary }}
//                   onClick={handleSearchBarClick}
//                   onChange={handleNavbarSearchChange}
//                   value={searchQuery}
//                   readOnly={false}
//                   onFocus={() => setIsSearchFocused(true)}
//                   onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
//                 />
//                 <div 
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
//                   onClick={handleSearchBarClick}
//                 >
//                   <FiSearch size={20} />
//                 </div>
//                 {searchQuery && (
//                   <button
//                     onClick={clearSearchQuery}
//                     className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
//                     aria-label="Clear search"
//                   >
//                     <FiX size={18} />
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex items-center space-x-4">
//               <button 
//                 className="hidden md:flex items-center space-x-2 hover:text-samsung-blue transition p-2"
//                 style={{ color: bluePrimary }}
//               >
//                 <FiUser size={20} />
//                 <span className="text-sm">Account</span>
//               </button>
//               <button 
//                 className="flex items-center space-x-2 hover:text-samsung-blue transition p-2"
//                 style={{ color: bluePrimary }}
//               >
//                 <FiShoppingCart size={20} />
//                 <span className="text-sm">Cart</span>
//                 <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
//               </button>
//             </div>
//           </div>

//           {/* Mobile Search */}
//           <div className="lg:hidden mb-3">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 className="w-full px-4 py-3 pl-12 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 cursor-pointer"
//                 style={{ '--tw-ring-color': bluePrimary }}
//                 onClick={handleSearchBarClick}
//                 onChange={handleNavbarSearchChange}
//                 value={searchQuery}
//                 readOnly={false}
//               />
//               <div 
//                 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
//                 onClick={handleSearchBarClick}
//               >
//                 <FiSearch size={20} />
//               </div>
//               {searchQuery && (
//                 <button
//                   onClick={clearSearchQuery}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
//                   aria-label="Clear search"
//                 >
//                   <FiX size={18} />
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Navigation Menu - Desktop */}
//           <div className="hidden lg:flex items-center justify-between border-t pt-3 pb-3">
//             <div className="flex items-center space-x-1">
//               {megaMenuData.map((menu, index) => (
//                 <div
//                   key={menu.title}
//                   ref={el => menuRefs.current[index] = el}
//                   className="relative"
//                   onMouseEnter={() => handleMouseEnter(index)}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   <button className="flex items-center space-x-1 px-4 py-3 text-gray-700 hover:text-blue-600 font-medium transition-colors group">
//                     {getMenuIcon(menu.title)}
//                     {menu.title}
//                     <FiChevronDown className={`transition-transform ${activeMenu === index ? 'rotate-180' : ''}`} />
//                   </button>

//                   {/* Mega Dropdown */}
//                   {activeMenu === index && (
//                     <div className="absolute left-0 top-full mt-1 w-[800px] bg-white shadow-2xl rounded-xl border border-gray-200 z-50">
//                       <div className="p-6">
//                         <div className="flex items-center mb-4 pb-4 border-b">
//                           {getMenuIcon(menu.title)}
//                           <h3 className="text-xl font-bold" style={{ color: bluePrimary }}>{menu.title}</h3>
//                         </div>
//                         <div className="grid grid-cols-4 gap-8">
//                           {menu.sections.map((section, sectionIndex) => (
//                             <div key={sectionIndex}>
//                               <h4 className="font-bold text-gray-900 mb-4" style={{ color: bluePrimary }}>{section.title}</h4>
//                               <ul className="space-y-2">
//                                 {section.items.map((item, itemIndex) => (
//                                   <li key={itemIndex}>
//                                     <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
//                                       <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-2"></span>
//                                       {item}
//                                     </a>
//                                   </li>
//                                 ))}
//                               </ul>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             <div className="flex items-center space-x-6">
//               <Link 
//                 to="/about" 
//                 className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
//                 style={{ '--tw-text-opacity': 1, color: `rgba(0, 42, 100, var(--tw-text-opacity))` }}
//               >
//                 About
//               </Link>
//               <Link 
//                 to="/products" 
//                 className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
//                 style={{ '--tw-text-opacity': 1, color: `rgba(0, 42, 100, var(--tw-text-opacity))` }}
//               >
//                 Products
//               </Link>
//               <Link 
//                 to="/career" 
//                 className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
//                 style={{ '--tw-text-opacity': 1, color: `rgba(0, 42, 100, var(--tw-text-opacity))` }}
//               >
//                 Career
//               </Link>
//               <Link 
//                 to="/contact" 
//                 className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
//                 style={{ '--tw-text-opacity': 1, color: `rgba(0, 42, 100, var(--tw-text-opacity))` }}
//               >
//                 Contact Us
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu Overlay */}
//         {isMenuOpen && (
//           <div className="lg:hidden fixed inset-0 top-[122px] bg-white z-40 overflow-y-auto animate-slideIn">
//             <div className="samsung-container py-4">
//               {megaMenuData.map((menu, index) => (
//                 <div key={index} className="border-b last:border-b-0">
//                   <button className="flex items-center justify-between w-full py-4 text-left font-medium text-gray-800">
//                     <span className="flex items-center">
//                       {getMenuIcon(menu.title)}
//                       {menu.title}
//                     </span>
//                     <FiChevronDown />
//                   </button>
//                   <div className="pb-4 pl-8">
//                     <div className="grid grid-cols-2 gap-4">
//                       {menu.sections.map((section, sectionIndex) => (
//                         <div key={sectionIndex}>
//                           <h5 
//                             className="font-semibold text-gray-700 mb-2"
//                             style={{ color: bluePrimary }}
//                           >
//                             {section.title}
//                           </h5>
//                           <ul className="space-y-1">
//                             {section.items.map((item, itemIndex) => (
//                               <li key={itemIndex}>
//                                 <a href="#" className="text-gray-600 text-sm">{item}</a>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Search Modal */}
//       <SearchModal 
//         isOpen={isSearchModalOpen}
//         onClose={handleModalClose}
//         initialQuery={searchQuery}
//       />

//       <style jsx>{`
//         @keyframes slideIn {
//           from {
//             transform: translateY(-10px);
//             opacity: 0;
//           }
//           to {
//             transform: translateY(0);
//             opacity: 1;
//           }
//         }
//         .animate-slideIn {
//           animation: slideIn 0.3s ease-out;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Navbar;
// import React, { useState, useEffect, useRef } from 'react';
// import { FiSearch, FiUser, FiShoppingCart, FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeMenu, setActiveMenu] = useState(null);
//   const [scrolled, setScrolled] = useState(false);
//   const menuRefs = useRef([]);
//   const timeoutRef = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!menuRefs.current.some(ref => ref && ref.contains(event.target))) {
//         setActiveMenu(null);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleMouseEnter = (index) => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     setActiveMenu(index);
//   };

//   const handleMouseLeave = () => {
//     timeoutRef.current = setTimeout(() => {
//       setActiveMenu(null);
//     }, 150);
//   };

//   const megaMenuData = [
//     {
//       title: 'Mobile',
//       sections: [
//         {
//           title: 'Smartphones',
//           items: ['Galaxy S24 Series', 'Galaxy Z Fold5', 'Galaxy Z Flip5', 'Galaxy A Series']
//         },
//         {
//           title: 'Tablets',
//           items: ['Galaxy Tab S9', 'Galaxy Tab A9', 'Galaxy Tab Active5']
//         },
//         {
//           title: 'Wearables',
//           items: ['Galaxy Watch6', 'Galaxy Buds2 Pro', 'Galaxy Fit3']
//         },
//         {
//           title: 'Accessories',
//           items: ['Cases', 'Screen Protectors', 'Chargers', 'Audio']
//         }
//       ]
//     },
//     {
//       title: 'TV & Audio',
//       sections: [
//         {
//           title: 'TVs',
//           items: ['Neo QLED 8K', 'OLED', 'The Frame', 'The Serif']
//         },
//         {
//           title: 'Audio',
//           items: ['Soundbars', 'Wireless Speakers', 'Home Theater']
//         },
//         {
//           title: 'Projectors',
//           items: ['The Premiere', 'Freestyle']
//         },
//         {
//           title: 'Accessories',
//           items: ['Wall Mounts', 'Remote Controls', 'Cables']
//         }
//       ]
//     },
//     {
//       title: 'Appliances',
//       sections: [
//         {
//           title: 'Refrigerators',
//           items: ['Bespoke', 'Family Hub', 'French Door']
//         },
//         {
//           title: 'Washers & Dryers',
//           items: ['Bespoke AI', 'QuickDrive', 'AddWash']
//         },
//         {
//           title: 'Air Solutions',
//           items: ['WindFree™ AC', 'Air Purifiers']
//         },
//         {
//           title: 'Cooking',
//           items: ['Induction Cooktops', 'Microwaves', 'Ovens']
//         }
//       ]
//     },
//     {
//       title: 'Computing',
//       sections: [
//         {
//           title: 'Monitors',
//           items: ['Odyssey', 'Smart Monitor', 'ViewFinity']
//         },
//         {
//           title: 'Laptops',
//           items: ['Galaxy Book4', 'Notebook', 'Chromebook']
//         },
//         {
//           title: 'Memory',
//           items: ['SSD', 'Memory Cards', 'USB Drives']
//         },
//         {
//           title: 'Printers',
//           items: ['Smart Printers', 'Laser Printers']
//         }
//       ]
//     }
//   ];

//   const bluePrimary = 'rgb(0, 42, 100)';
//   const blueSecondary = 'rgb(0, 61, 130)';
//   const blueDark = 'rgb(0, 18, 36)';

//   return (
//     <>
//       {/* Top Announcement Bar */}
//       <div 
//         className="text-white text-sm"
//         style={{ background: `linear-gradient(135deg, ${blueDark} 0%, ${bluePrimary} 50%, ${blueSecondary} 100%)` }}
//       >
//         <div className="samsung-container">
//           <div className="flex justify-between items-center py-2">
//             <div className="flex items-center space-x-6">
//               <span className="hidden md:inline">🎁 Holiday Sale: Up to 40% Off</span>
//               <span className="hidden lg:inline">|</span>
//               <span className="hidden lg:inline">📦 Free Shipping Over $499</span>
//             </div>
//             <div className="flex items-center space-x-6">
//               <a href="#" className="hover:text-gray-200 transition text-xs md:text-sm">For Business</a>
//               <a href="#" className="hover:text-gray-200 transition text-xs md:text-sm">Support</a>
//               <a href="#" className="hover:text-gray-200 transition text-xs md:text-sm hidden md:inline">Store Locator</a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Navbar */}
//       <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}>
//         <div className="samsung-container">
//           {/* First Row: Logo, Search, Actions */}
//           <div className="flex items-center justify-between py-4">
//             {/* Logo */}
//             <div className="flex items-center space-x-4">
//               <button 
//                 className="lg:hidden p-2"
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//               >
//                 {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//               </button>
//               <a href="/" className="text-2xl font-bold tracking-tight">
//                 <span style={{ color: bluePrimary }}>ELECTRO</span>
//                 <span className="text-black">STORE</span>
//               </a>
//             </div>

//             {/* Search Bar - Desktop */}
//             <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
//               <div className="relative w-full">
//                 <input
//                   type="text"
//                   placeholder="Search products, brands, and categories..."
//                   className="w-full px-4 py-3 pl-12 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2"
//                   style={{ '--tw-ring-color': bluePrimary }}
//                 />
//                 <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex items-center space-x-4">
//               <button 
//                 className="hidden md:flex items-center space-x-2 hover:text-samsung-blue transition p-2"
//                 style={{ color: bluePrimary }}
//               >
//                 <FiUser size={20} />
//                 <span className="text-sm">Account</span>
//               </button>
//             </div>
//           </div>

//           {/* Mobile Search */}
//           <div className="lg:hidden mb-3">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 className="w-full px-4 py-3 pl-12 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2"
//                 style={{ '--tw-ring-color': bluePrimary }}
//               />
//               <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//             </div>
//           </div>

//           {/* Navigation Menu - Desktop */}
//           <div className="hidden lg:flex items-center justify-between border-t pt-3 pb-3">
//             <div className="flex items-center space-x-1">
//               {megaMenuData.map((menu, index) => (
//                 <div
//                   key={menu.title}
//                   ref={el => menuRefs.current[index] = el}
//                   className="relative"
//                   onMouseEnter={() => handleMouseEnter(index)}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   <button className="flex items-center space-x-1 px-4 py-3 text-gray-700 hover:text-blue-600 font-medium transition-colors group">
//                     {menu.title}
//                     <FiChevronDown className={`transition-transform ${activeMenu === index ? 'rotate-180' : ''}`} />
//                   </button>

//                   {/* Mega Dropdown */}
//                   {activeMenu === index && (
//                     <div className="absolute left-0 top-full mt-1 w-[800px] bg-white shadow-2xl rounded-xl border border-gray-200 z-50">
//                       <div className="p-6">
//                         <div className="grid grid-cols-4 gap-8">
//                           {menu.sections.map((section, sectionIndex) => (
//                             <div key={sectionIndex}>
//                               <h4 className="font-bold text-gray-900 mb-4" style={{ color: bluePrimary }}>{section.title}</h4>
//                               <ul className="space-y-2">
//                                 {section.items.map((item, itemIndex) => (
//                                   <li key={itemIndex}>
//                                     <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">{item}</a>
//                                   </li>
//                                 ))}
//                               </ul>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             <div className="flex items-center space-x-6">
//               <Link 
//                 to="/about" 
//                 className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
//                 style={{ '--tw-text-opacity': 1, color: `rgba(0, 42, 100, var(--tw-text-opacity))` }}
//               >
//                 About
//               </Link>
//               <Link 
//                 to="/products" 
//                 className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
//                 style={{ '--tw-text-opacity': 1, color: `rgba(0, 42, 100, var(--tw-text-opacity))` }}
//               >
//                 Products
//               </Link>
//               <Link 
//                 to="/career" 
//                 className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
//                 style={{ '--tw-text-opacity': 1, color: `rgba(0, 42, 100, var(--tw-text-opacity))` }}
//               >
//                 Career
//               </Link>
//               <Link 
//                 to="/contact" 
//                 className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
//                 style={{ '--tw-text-opacity': 1, color: `rgba(0, 42, 100, var(--tw-text-opacity))` }}
//               >
//                 Contact Us
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu Overlay */}
//         {isMenuOpen && (
//           <div className="lg:hidden fixed inset-0 top-[122px] bg-white z-40 overflow-y-auto">
//             <div className="samsung-container py-4">
//               {megaMenuData.map((menu, index) => (
//                 <div key={index} className="border-b last:border-b-0">
//                   <button className="flex items-center justify-between w-full py-4 text-left font-medium text-gray-800">
//                     <span>{menu.title}</span>
//                     <FiChevronDown />
//                   </button>
//                   <div className="pb-4 pl-4">
//                     <div className="grid grid-cols-2 gap-4">
//                       {menu.sections.map((section, sectionIndex) => (
//                         <div key={sectionIndex}>
//                           <h5 
//                             className="font-semibold text-gray-700 mb-2"
//                             style={{ color: bluePrimary }}
//                           >
//                             {section.title}
//                           </h5>
//                           <ul className="space-y-1">
//                             {section.items.map((item, itemIndex) => (
//                               <li key={itemIndex}>
//                                 <a href="#" className="text-gray-600 text-sm">{item}</a>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </nav>
//     </>
//   );
// };

// export default Navbar;

// import React, { useState, useEffect, useRef } from 'react';
// import { FiSearch, FiUser, FiShoppingCart, FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeMenu, setActiveMenu] = useState(null);
//   const [scrolled, setScrolled] = useState(false);
//   const menuRefs = useRef([]);
//   const timeoutRef = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!menuRefs.current.some(ref => ref && ref.contains(event.target))) {
//         setActiveMenu(null);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleMouseEnter = (index) => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     setActiveMenu(index);
//   };

//   const handleMouseLeave = () => {
//     timeoutRef.current = setTimeout(() => {
//       setActiveMenu(null);
//     }, 150);
//   };

//   const megaMenuData = [
//     {
//       title: 'Mobile',
//       sections: [
//         {
//           title: 'Smartphones',
//           items: ['Galaxy S24 Series', 'Galaxy Z Fold5', 'Galaxy Z Flip5', 'Galaxy A Series']
//         },
//         {
//           title: 'Tablets',
//           items: ['Galaxy Tab S9', 'Galaxy Tab A9', 'Galaxy Tab Active5']
//         },
//         {
//           title: 'Wearables',
//           items: ['Galaxy Watch6', 'Galaxy Buds2 Pro', 'Galaxy Fit3']
//         },
//         {
//           title: 'Accessories',
//           items: ['Cases', 'Screen Protectors', 'Chargers', 'Audio']
//         }
//       ]
//     },
//     {
//       title: 'TV & Audio',
//       sections: [
//         {
//           title: 'TVs',
//           items: ['Neo QLED 8K', 'OLED', 'The Frame', 'The Serif']
//         },
//         {
//           title: 'Audio',
//           items: ['Soundbars', 'Wireless Speakers', 'Home Theater']
//         },
//         {
//           title: 'Projectors',
//           items: ['The Premiere', 'Freestyle']
//         },
//         {
//           title: 'Accessories',
//           items: ['Wall Mounts', 'Remote Controls', 'Cables']
//         }
//       ]
//     },
//     {
//       title: 'Appliances',
//       sections: [
//         {
//           title: 'Refrigerators',
//           items: ['Bespoke', 'Family Hub', 'French Door']
//         },
//         {
//           title: 'Washers & Dryers',
//           items: ['Bespoke AI', 'QuickDrive', 'AddWash']
//         },
//         {
//           title: 'Air Solutions',
//           items: ['WindFree™ AC', 'Air Purifiers']
//         },
//         {
//           title: 'Cooking',
//           items: ['Induction Cooktops', 'Microwaves', 'Ovens']
//         }
//       ]
//     },
//     {
//       title: 'Computing',
//       sections: [
//         {
//           title: 'Monitors',
//           items: ['Odyssey', 'Smart Monitor', 'ViewFinity']
//         },
//         {
//           title: 'Laptops',
//           items: ['Galaxy Book4', 'Notebook', 'Chromebook']
//         },
//         {
//           title: 'Memory',
//           items: ['SSD', 'Memory Cards', 'USB Drives']
//         },
//         {
//           title: 'Printers',
//           items: ['Smart Printers', 'Laser Printers']
//         }
//       ]
//     }
//   ];

//   return (
//     <>
//       {/* Top Announcement Bar */}
//       <div className="bg-samsung-blue text-white text-sm">
//         <div className="samsung-container">
//           <div className="flex justify-between items-center py-2">
//             <div className="flex items-center space-x-6">
//               <span className="hidden md:inline">🎁 Holiday Sale: Up to 40% Off</span>
//               <span className="hidden lg:inline">|</span>
//               <span className="hidden lg:inline">📦 Free Shipping Over $499</span>
//             </div>
//             <div className="flex items-center space-x-6">
//               <a href="#" className="hover:text-gray-200 transition text-xs md:text-sm">For Business</a>
//               <a href="#" className="hover:text-gray-200 transition text-xs md:text-sm">Support</a>
//               <a href="#" className="hover:text-gray-200 transition text-xs md:text-sm hidden md:inline">Store Locator</a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Navbar */}
//       <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}>
//         <div className="samsung-container">
//           {/* First Row: Logo, Search, Actions */}
//           <div className="flex items-center justify-between py-4">
//             {/* Logo */}
//             <div className="flex items-center space-x-4">
//               <button 
//                 className="lg:hidden p-2"
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//               >
//                 {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//               </button>
//               <a href="/" className="text-2xl font-bold tracking-tight">
//                 <span className="text-samsung-blue">ELECTRO</span>
//                 <span className="text-black">STORE</span>
//               </a>
//             </div>

//             {/* Search Bar - Desktop */}
//             <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
//               <div className="relative w-full">
//                 <input
//                   type="text"
//                   placeholder="Search products, brands, and categories..."
//                   className="w-full px-4 py-3 pl-12 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-samsung-blue"
//                 />
//                 <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex items-center space-x-4">
//               <button className="hidden md:flex items-center space-x-2 hover:text-samsung-blue transition p-2">
//                 <FiUser size={20} />
//                 <span className="text-sm">Account</span>
//               </button>

//             </div>
//           </div>

//           {/* Mobile Search */}
//           <div className="lg:hidden mb-3">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 className="w-full px-4 py-3 pl-12 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-samsung-blue"
//               />
//               <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//             </div>
//           </div>

//           {/* Navigation Menu - Desktop */}
//           <div className="hidden lg:flex items-center justify-between border-t pt-3 pb-3">
//             <div className="flex items-center space-x-1">
//               {megaMenuData.map((menu, index) => (
//                 <div
//                   key={menu.title}
//                   ref={el => menuRefs.current[index] = el}
//                   className="relative"
//                   onMouseEnter={() => handleMouseEnter(index)}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   <button className="nav-link">
//                     {menu.title}
//                     <FiChevronDown className={`transition-transform ${activeMenu === index ? 'rotate-180' : ''}`} />
//                   </button>

//                   {/* Mega Dropdown */}
//                   {activeMenu === index && (
//                     <div className="nav-dropdown">
//                       <div className="p-6">
//                         <div className="grid grid-cols-4 gap-8">
//                           {menu.sections.map((section, sectionIndex) => (
//                             <div key={sectionIndex} className="dropdown-section">
//                               <h4 className="dropdown-title">{section.title}</h4>
//                               <ul>
//                                 {section.items.map((item, itemIndex) => (
//                                   <li key={itemIndex}>
//                                     <a href="#" className="dropdown-item">{item}</a>
//                                   </li>
//                                 ))}
//                               </ul>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* <div className="flex items-center space-x-6">
//               <a href="#" className="text-red-600 font-semibold hover:text-red-700">About</a>
//               <a href="#" className="text-samsung-blue font-semibold hover:text-samsung-blue-light">Products</a>
//               <a href="#" className="text-green-600 font-semibold hover:text-green-700">Career</a>
//               <a href="#" className="text-green-600 font-semibold hover:text-green-700">Contact us </a>

//             </div> */}
// <div className="flex items-center space-x-6">
//   <Link 
//     to="/about" 
//     className="text-gray-800 font-medium hover:text-samsung-blue transition-colors"
//   >
//     About
//   </Link>
//   <Link 
//     to="/products" 
//     className="text-gray-800 font-medium hover:text-samsung-blue transition-colors"
//   >
//     Products
//   </Link>
//   <Link 
//     to="/career" 
//     className="text-gray-800 font-medium hover:text-samsung-blue transition-colors"
//   >
//     Career
//   </Link>
//   <Link 
//     to="/contact" 
//     className="text-gray-800 font-medium hover:text-samsung-blue transition-colors"
//   >
//     Contact Us
//   </Link>
// </div>



//           </div>
//         </div>

//         {/* Mobile Menu Overlay */}
//         {isMenuOpen && (
//           <div className="lg:hidden fixed inset-0 top-[122px] bg-white z-40 overflow-y-auto">
//             <div className="samsung-container py-4">
//               {megaMenuData.map((menu, index) => (
//                 <div key={index} className="border-b last:border-b-0">
//                   <button className="flex items-center justify-between w-full py-4 text-left font-medium text-gray-800">
//                     <span>{menu.title}</span>
//                     <FiChevronDown />
//                   </button>
//                   <div className="pb-4 pl-4">
//                     <div className="grid grid-cols-2 gap-4">
//                       {menu.sections.map((section, sectionIndex) => (
//                         <div key={sectionIndex}>
//                           <h5 className="font-semibold text-gray-700 mb-2">{section.title}</h5>
//                           <ul className="space-y-1">
//                             {section.items.map((item, itemIndex) => (
//                               <li key={itemIndex}>
//                                 <a href="#" className="text-gray-600 text-sm">{item}</a>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </nav>
//     </>
//   );
// };

// export default Navbar;






