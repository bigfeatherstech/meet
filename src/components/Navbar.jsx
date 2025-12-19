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







import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiUser, FiShoppingCart, FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const menuRefs = useRef([]);
  const timeoutRef = useRef(null);

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

  const megaMenuData = [
    {
      title: 'Mobile',
      sections: [
        {
          title: 'Smartphones',
          items: ['Galaxy S24 Series', 'Galaxy Z Fold5', 'Galaxy Z Flip5', 'Galaxy A Series']
        },
        {
          title: 'Tablets',
          items: ['Galaxy Tab S9', 'Galaxy Tab A9', 'Galaxy Tab Active5']
        },
        {
          title: 'Wearables',
          items: ['Galaxy Watch6', 'Galaxy Buds2 Pro', 'Galaxy Fit3']
        },
        {
          title: 'Accessories',
          items: ['Cases', 'Screen Protectors', 'Chargers', 'Audio']
        }
      ]
    },
    {
      title: 'TV & Audio',
      sections: [
        {
          title: 'TVs',
          items: ['Neo QLED 8K', 'OLED', 'The Frame', 'The Serif']
        },
        {
          title: 'Audio',
          items: ['Soundbars', 'Wireless Speakers', 'Home Theater']
        },
        {
          title: 'Projectors',
          items: ['The Premiere', 'Freestyle']
        },
        {
          title: 'Accessories',
          items: ['Wall Mounts', 'Remote Controls', 'Cables']
        }
      ]
    },
    {
      title: 'Appliances',
      sections: [
        {
          title: 'Refrigerators',
          items: ['Bespoke', 'Family Hub', 'French Door']
        },
        {
          title: 'Washers & Dryers',
          items: ['Bespoke AI', 'QuickDrive', 'AddWash']
        },
        {
          title: 'Air Solutions',
          items: ['WindFree™ AC', 'Air Purifiers']
        },
        {
          title: 'Cooking',
          items: ['Induction Cooktops', 'Microwaves', 'Ovens']
        }
      ]
    },
    {
      title: 'Computing',
      sections: [
        {
          title: 'Monitors',
          items: ['Odyssey', 'Smart Monitor', 'ViewFinity']
        },
        {
          title: 'Laptops',
          items: ['Galaxy Book4', 'Notebook', 'Chromebook']
        },
        {
          title: 'Memory',
          items: ['SSD', 'Memory Cards', 'USB Drives']
        },
        {
          title: 'Printers',
          items: ['Smart Printers', 'Laser Printers']
        }
      ]
    }
  ];

  const bluePrimary = 'rgb(0, 42, 100)';
  const blueSecondary = 'rgb(0, 61, 130)';
  const blueDark = 'rgb(0, 18, 36)';

  return (
    <>
      {/* Top Announcement Bar */}
      <div 
        className="text-white text-sm"
        style={{ background: `linear-gradient(135deg, ${blueDark} 0%, ${bluePrimary} 50%, ${blueSecondary} 100%)` }}
      >
        <div className="samsung-container">
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center space-x-6">
              <span className="hidden md:inline">🎁 Holiday Sale: Up to 40% Off</span>
              <span className="hidden lg:inline">|</span>
              <span className="hidden lg:inline">📦 Free Shipping Over $499</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="hover:text-gray-200 transition text-xs md:text-sm">For Business</a>
              <a href="#" className="hover:text-gray-200 transition text-xs md:text-sm">Support</a>
              <a href="#" className="hover:text-gray-200 transition text-xs md:text-sm hidden md:inline">Store Locator</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}>
        <div className="samsung-container">
          {/* First Row: Logo, Search, Actions */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <button 
                className="lg:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
              <a href="/" className="text-2xl font-bold tracking-tight">
                <span style={{ color: bluePrimary }}>ELECTRO</span>
                <span className="text-black">STORE</span>
              </a>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products, brands, and categories..."
                  className="w-full px-4 py-3 pl-12 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': bluePrimary }}
                />
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <button 
                className="hidden md:flex items-center space-x-2 hover:text-samsung-blue transition p-2"
                style={{ color: bluePrimary }}
              >
                <FiUser size={20} />
                <span className="text-sm">Account</span>
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="lg:hidden mb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-3 pl-12 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': bluePrimary }}
              />
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          {/* Navigation Menu - Desktop */}
          <div className="hidden lg:flex items-center justify-between border-t pt-3 pb-3">
            <div className="flex items-center space-x-1">
              {megaMenuData.map((menu, index) => (
                <div
                  key={menu.title}
                  ref={el => menuRefs.current[index] = el}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="flex items-center space-x-1 px-4 py-3 text-gray-700 hover:text-blue-600 font-medium transition-colors group">
                    {menu.title}
                    <FiChevronDown className={`transition-transform ${activeMenu === index ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Mega Dropdown */}
                  {activeMenu === index && (
                    <div className="absolute left-0 top-full mt-1 w-[800px] bg-white shadow-2xl rounded-xl border border-gray-200 z-50">
                      <div className="p-6">
                        <div className="grid grid-cols-4 gap-8">
                          {menu.sections.map((section, sectionIndex) => (
                            <div key={sectionIndex}>
                              <h4 className="font-bold text-gray-900 mb-4" style={{ color: bluePrimary }}>{section.title}</h4>
                              <ul className="space-y-2">
                                {section.items.map((item, itemIndex) => (
                                  <li key={itemIndex}>
                                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">{item}</a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-6">
              <Link 
                to="/about" 
                className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
                style={{ '--tw-text-opacity': 1, color: `rgba(0, 42, 100, var(--tw-text-opacity))` }}
              >
                About
              </Link>
              <Link 
                to="/products" 
                className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
                style={{ '--tw-text-opacity': 1, color: `rgba(0, 42, 100, var(--tw-text-opacity))` }}
              >
                Products
              </Link>
              <Link 
                to="/career" 
                className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
                style={{ '--tw-text-opacity': 1, color: `rgba(0, 42, 100, var(--tw-text-opacity))` }}
              >
                Career
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-800 font-medium hover:text-blue-600 transition-colors"
                style={{ '--tw-text-opacity': 1, color: `rgba(0, 42, 100, var(--tw-text-opacity))` }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[122px] bg-white z-40 overflow-y-auto">
            <div className="samsung-container py-4">
              {megaMenuData.map((menu, index) => (
                <div key={index} className="border-b last:border-b-0">
                  <button className="flex items-center justify-between w-full py-4 text-left font-medium text-gray-800">
                    <span>{menu.title}</span>
                    <FiChevronDown />
                  </button>
                  <div className="pb-4 pl-4">
                    <div className="grid grid-cols-2 gap-4">
                      {menu.sections.map((section, sectionIndex) => (
                        <div key={sectionIndex}>
                          <h5 
                            className="font-semibold text-gray-700 mb-2"
                            style={{ color: bluePrimary }}
                          >
                            {section.title}
                          </h5>
                          <ul className="space-y-1">
                            {section.items.map((item, itemIndex) => (
                              <li key={itemIndex}>
                                <a href="#" className="text-gray-600 text-sm">{item}</a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;