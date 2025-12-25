import React, { useState, useEffect } from 'react';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiLinkedin, FiMail, FiPhone, FiMapPin, FiCheck, FiChevronRight, FiHeart, FiShield, FiTruck, FiClock, FiGlobe, FiPrinter, FiSmartphone } from 'react-icons/fi';

const Footer = () => {
  // Enhanced blue color palette
  const bluePrimary = 'rgb(0, 42, 100)';
  const blueSecondary = 'rgb(0, 61, 130)';
  const blueLight = 'rgb(51, 113, 255)';
  const blueDark = 'rgb(0, 18, 36)';
  const blueExtraDark = 'rgb(5, 10, 20)';

  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isVisible, setIsVisible] = useState(false);

  // Company Information
  const companyInfo = {
    name: 'Meet Appliances Ltd',
    address: 'Room 708, 7/F. Boss Commercial Center, Ferry Street, Jordan, Kowloon, Hong Kong',
    tel: '+852-XXXX-XXXX',
    fax: '+852-XXXX-XXXX',
    mob: '+852-97941625',
    contactPerson: 'Mr. Peter',
    email: 'info1.meetappliancesltd@gmail.com',
    businessHours: 'Mon-Fri: 9:00 AM - 6:00 PM | Sat: 10:00 AM - 4:00 PM',
    website: 'www.meetappliances.com'
  };

  useEffect(() => {
    // Set current year
    setCurrentYear(new Date().getFullYear());
    // Trigger animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && validateEmail(email)) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Removed Services and Resources sections
  const footerSections = [
    {
      title: 'Our Products',
      icon: '🔧',
      links: [
        { name: 'Smart Home Appliances', badge: 'Smart' },
        { name: 'Kitchen Equipment', badge: null },
        { name: 'Air Conditioners', badge: 'Energy Saver' },
        { name: 'Refrigeration Systems', badge: null },
        { name: 'Washing Machines', badge: 'Sale' },
        { name: 'Commercial Appliances', badge: 'B2B' },
        { name: 'Home Entertainment', badge: null },
        { name: 'Small Appliances', badge: 'New' }
      ]
    },
    {
      title: 'Company',
      icon: '🏢',
      links: [
        { name: 'About Meet Appliances', badge: null },
        { name: 'Our History', badge: null },
        { name: 'Quality Assurance', badge: 'Certified' },
        { name: 'Sustainability', badge: 'Green' },
        { name: 'Careers', badge: 'Hiring' },
        { name: 'Partnerships', badge: null },
        { name: 'News & Events', badge: null },
        { name: 'Testimonials', badge: '5★' }
      ]
    }
  ];

  const features = [
    { icon: <FiTruck />, text: 'Free Delivery', subtext: 'Hong Kong Island' },
    { icon: <FiShield />, text: '2-Year Warranty', subtext: 'Extended options available' },
    { icon: <FiClock />, text: 'Fast Service', subtext: 'Same-day response' },
    { icon: <FiHeart />, text: 'Quality Guarantee', subtext: '100% satisfaction' }
  ];

  const socialLinks = [
    { icon: FiFacebook, label: 'Facebook', color: '#1877F2' },
    { icon: FiTwitter, label: 'Twitter', color: '#1DA1F2' },
    { icon: FiInstagram, label: 'Instagram', color: '#E4405F' },
    { icon: FiYoutube, label: 'YouTube', color: '#FF0000' },
    { icon: FiLinkedin, label: 'LinkedIn', color: '#0A66C2' }
  ];

  const contactInfo = [
    { 
      icon: FiPhone, 
      text: companyInfo.tel, 
      subtext: 'Office Telephone', 
      link: `tel:${companyInfo.tel.replace(/-/g, '')}` 
    },
    { 
      icon: FiSmartphone, 
      text: companyInfo.mob, 
      subtext: 'Mobile (Mr. Peter)', 
      link: `tel:${companyInfo.mob.replace(/-/g, '')}` 
    },
    { 
      icon: FiPrinter, 
      text: companyInfo.fax, 
      subtext: 'Facsimile', 
      link: '#' 
    },
    { 
      icon: FiMail, 
      text: companyInfo.email, 
      subtext: 'Email Inquiry', 
      link: `mailto:${companyInfo.email}` 
    }
  ];

  const paymentMethods = ['Visa', 'Mastercard', 'UnionPay', 'PayMe', 'FPS', 'Alipay'];

  return (
    <footer className="text-gray-800 mt-auto relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, ${blueLight} 2px, transparent 2px)`,
          backgroundSize: '50px 50px',
          animation: 'float 20s linear infinite'
        }}></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, transparent 49%, ${blueLight} 50%, transparent 51%)`,
          backgroundSize: '30px 30px',
          opacity: 0.3
        }}></div>
      </div>

      {/* Features Banner */}
      <div className="relative py-6" style={{ 
        background: `linear-gradient(135deg, ${bluePrimary} 0%, ${blueSecondary} 100%)`,
        borderBottom: `1px solid rgba(255, 255, 255, 0.1)`
      }}>
        <div className="samsung-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group hover:scale-[1.02]"
                      data-aos="fade-up"
                data-aos-delay={index * 200} // Stagger delay: 0ms, 100ms, 200ms, 300ms
                data-aos-duration="600"
                data-aos-once="true"
              >
                <div className="p-3 rounded-lg text-white bg-gradient-to-br from-blue-500 to-blue-700 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <div>
                  <p className="font-bold text-white">{feature.text}</p>
                  <p className="text-blue-200 text-sm">{feature.subtext}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Company Information Section */}
      <div className="py-8 relative" style={{ 
        background: `linear-gradient(135deg, ${blueDark} 0%, ${bluePrimary} 100%)`
      }}>
        <div className="samsung-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Company Details */}
            <div className={`p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-700">
                  <FiGlobe className="text-white text-xl" />
                </div>
                <h3 className="text-2xl font-bold text-white">{companyInfo.name}</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FiMapPin className="text-blue-300 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Registered Address:</p>
                    <p className="text-blue-100 text-sm leading-relaxed">{companyInfo.address}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <FiPhone className="text-blue-300" />
                    <div>
                      <p className="text-blue-200 text-sm">Telephone</p>
                      <p className="text-white">{companyInfo.tel}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <FiSmartphone className="text-blue-300" />
                    <div>
                      <p className="text-blue-200 text-sm">Mobile</p>
                      <p className="text-white">{companyInfo.mob}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <FiPrinter className="text-blue-300" />
                    <div>
                      <p className="text-blue-200 text-sm">Fax</p>
                      <p className="text-white">{companyInfo.fax}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <FiMail className="text-blue-300" />
                    <div>
                      <p className="text-blue-200 text-sm">Email</p>
                      <p className="text-white text-sm break-all">{companyInfo.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <p className="text-blue-200 text-sm mb-2">Business Hours:</p>
                  <p className="text-white text-sm">{companyInfo.businessHours}</p>
                  <p className="text-blue-100 text-sm mt-2">Contact Person: <span className="text-white">{companyInfo.contactPerson}</span></p>
                </div>
              </div>
            </div>

            {/* Newsletter Section with Fixed Email Input */}
            <div className={`p-6 rounded-2xl bg-gradient-to-br from-blue-900/50 to-blue-800/30 backdrop-blur-sm border border-white/10 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
                  <FiMail className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Stay Updated</h3>
              </div>
              
              <p className="text-blue-100 mb-6">Subscribe to get exclusive deals, product updates, and home appliance tips.</p>
              
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-5 py-4 border-2 border-white/30 bg-white/15 backdrop-blur-xl text-white placeholder-blue-200/70 rounded-xl focus:outline-none focus:border-white/50 focus:ring-4 focus:ring-white/20 transition-all duration-300 text-sm sm:text-base"
                  />
                  {email && !validateEmail(email) && (
                    <p className="text-red-300 text-xs mt-1 absolute left-0">Please enter a valid email</p>
                  )}
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitted}
                  className={`w-full px-6 py-4 rounded-xl font-bold transition-all duration-300 shadow-2xl transform hover:scale-[1.02] relative overflow-hidden group ${
                    isSubmitted 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gradient-to-r from-white to-gray-100 text-gray-900 hover:from-gray-100 hover:to-white'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2 relative z-10">
                    {isSubmitted ? (
                      <>
                        <FiCheck className="w-5 h-5 animate-pulse" />
                        Subscribed!
                      </>
                    ) : (
                      <>
                        Subscribe Now
                        <FiChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                  {!isSubmitted && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  )}
                </button>
                
                <div className="flex flex-wrap items-center gap-2 text-blue-200 text-sm">
                  <span className="flex items-center gap-1">
                    <FiCheck className="w-4 h-4 flex-shrink-0" /> We respect your privacy
                  </span>
                  <span className="flex items-center gap-1">
                    <FiCheck className="w-4 h-4 flex-shrink-0 ml-4" /> Unsubscribe anytime
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content - 12 Column Grid */}
      <div className="py-12 relative"
           style={{ 
             background: `linear-gradient(135deg, ${bluePrimary} 0%, ${blueDark} 100%)`,
           }}>
        <div className="samsung-container relative z-10">
          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Left Side - 6 Columns (3+3 for Products and Company) */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {footerSections.map((section, index) => (
                  <div 
                    key={index}
                    className="transform transition-all duration-500"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-2xl">{section.icon}</span>
                      <h4 className="font-bold text-white text-lg">{section.title}</h4>
                    </div>
                    <ul className="space-y-3">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex} className="group">
                          <a 
                            href="#" 
                            className="flex items-center justify-between text-blue-100 hover:text-white transition-all duration-300 group-hover:translate-x-1"
                          >
                            <span className="text-sm">{link.name}</span>
                            {link.badge && (
                              <span className="px-2 py-1 text-xs rounded-full bg-blue-900/50 text-blue-200 group-hover:bg-blue-700/50 transition-colors">
                                {link.badge}
                              </span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - 6 Columns for Contact Boxes */}
            <div className="lg:col-span-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-700">
                    <FiPhone className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Get In Touch</h4>
                    <p className="text-blue-200 text-sm">We're here to help with all your appliance needs</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {contactInfo.map((contact, index) => (
                    <a
                      key={index}
                      href={contact.link}
                      className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group hover:scale-[1.02]"
                    >
                      <div className="p-3 rounded-lg text-white bg-gradient-to-br from-blue-500 to-blue-700 group-hover:scale-110 transition-transform flex-shrink-0">
                        <contact.icon size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white group-hover:text-blue-200 transition-colors text-sm sm:text-base truncate">
                          {contact.text}
                        </p>
                        <p className="text-blue-200 text-xs sm:text-sm mt-1">{contact.subtext}</p>
                      </div>
                    </a>
                  ))}
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="py-8 relative"
           style={{ 
             background: `linear-gradient(135deg, ${blueDark} 0%, ${blueExtraDark} 100%)`,
           }}>
        <div className="samsung-container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Media */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <span className="font-semibold text-white text-sm sm:text-base">Connect With Us:</span>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="p-2 sm:p-3 rounded-full text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg flex-shrink-0"
                    style={{ 
                      background: `${social.color}20`,
                      border: `1px solid ${social.color}40`
                    }}
                    aria-label={social.label}
                  >
                    <social.icon size={16} className="sm:w-4 sm:h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <span className="text-blue-200 text-sm">We Accept:</span>
              <div className="flex flex-wrap justify-center gap-2">
                {paymentMethods.map((method, index) => (
                  <div 
                    key={index}
                    className="px-2 py-1 text-xs rounded-lg bg-white/10 backdrop-blur-sm text-white border border-white/20"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright & Legal */}
          <div className="mt-8 pt-8 border-t border-blue-900/50">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-blue-200 text-xs sm:text-sm text-center md:text-left">
                © {currentYear} {companyInfo.name}. All rights reserved.
                <span className="hidden sm:inline"> • </span> 
                <span className="block sm:inline">Registered in Hong Kong SAR</span>
              </p>
              
              <div className="flex flex-wrap justify-center gap-3 text-xs sm:text-sm">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer', 'Sitemap'].map((link, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-blue-200 hover:text-white hover:underline transition-colors whitespace-nowrap"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            
            <p className="text-blue-300/70 text-xs mt-4 text-center px-4">
              All trademarks, logos, and brand names are the property of their respective owners. 
              Prices and specifications are subject to change without notice.
            </p>
            
            <p className="text-blue-300/50 text-xs mt-2 text-center">
              Business Registration No: [To be provided] • VAT/GST: [To be provided]
            </p>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .samsung-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        @media (min-width: 640px) {
          .samsung-container {
            padding: 0 1.5rem;
          }
        }

        @media (min-width: 1024px) {
          .samsung-container {
            padding: 0 2rem;
          }
        }

        /* Responsive text adjustments */
        @media (max-width: 640px) {
          input[type="email"] {
            font-size: 16px; /* Prevents zoom on iOS */
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;

// import React, { useState } from 'react';
// import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiLinkedin, FiMail, FiPhone, FiMapPin, FiCheck } from 'react-icons/fi';

// const Footer = () => {
//   // Define blue colors
//   const bluePrimary = 'rgb(0, 42, 100)';
//   const blueSecondary = 'rgb(0, 61, 130)';
//   const blueDark = 'rgb(0, 18, 36)';

//   const [email, setEmail] = useState('');
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleSubscribe = (e) => {
//     e.preventDefault();
//     if (email) {
//       setIsSubmitted(true);
//       setTimeout(() => {
//         setIsSubmitted(false);
//         setEmail('');
//       }, 3000);
//     }
//   };

//   const footerSections = [
//     {
//       title: 'Products',
//       links: [
//         'Smartphones', 'Tablets', 'Wearables', 'TVs & Displays',
//         'Refrigerators', 'Washers & Dryers', 'Air Conditioners',
//         'Monitors', 'Memory Storage', 'Accessories'
//       ]
//     },
//     {
//       title: 'Shop',
//       links: [
//         'Weekly Deals', 'Student Offers', 'Military Discount',
//         'Refurbished', 'Trade-In Program', 'Gift Cards',
//         'Shop The Look', 'Build Your Bundle'
//       ]
//     },
//     {
//       title: 'Support',
//       links: [
//         'Contact Us', 'Live Chat', 'Email Support',
//         'Schedule Service', 'Product Help', 'Manuals & Downloads',
//         'Software Updates', 'Warranty'
//       ]
//     },
//     {
//       title: 'About Us',
//       links: [
//         'Our Company', 'Newsroom', 'Careers',
//         'Investor Relations', 'Sustainability',
//         'Ethics & Compliance', 'Accessibility'
//       ]
//     }
//   ];

//   const socialLinks = [
//     { icon: FiFacebook, label: 'Facebook' },
//     { icon: FiTwitter, label: 'Twitter' },
//     { icon: FiInstagram, label: 'Instagram' },
//     { icon: FiYoutube, label: 'YouTube' },
//     { icon: FiLinkedin, label: 'LinkedIn' }
//   ];

//   const contactInfo = [
//     { icon: FiPhone, text: '1-800-ELECTRO (1-800-353-2876)', subtext: '24/7 Customer Support' },
//     { icon: FiMail, text: 'support@electrostore.com', subtext: 'Email Response within 24 hours' },
//     { icon: FiMapPin, text: 'Store Locator', subtext: 'Find a retail store near you' }
//   ];

//   const legalLinks = [
//     'Privacy Policy', 'Terms of Use', 'Cookie Policy',
//     'Legal Notices', 'Site Map', 'Interest-Based Ads'
//   ];

//   return (
//     <footer className="text-gray-800 mt-auto new_footer_area" style={{ background: '#fbfbfd' }}>
//       {/* Newsletter Section */}
//       <div className="new_footer_top py-12 relative overflow-hidden"
//            style={{ 
//              background: `linear-gradient(135deg, ${blueDark} 0%, ${bluePrimary} 40%, ${blueSecondary} 100%)`
//            }}>
        
//         {/* Car and Bicycle Animations */}
//         <div className="footer_bg absolute bottom-0 left-0 w-full h-64 overflow-hidden pointer-events-none">
//           {/* Car Animation */}
//           <div 
//             className="footer_bg_one absolute bottom-0"
//             style={{
//               width: '330px',
//               height: '105px',
//               background: 'url("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEia0PYPxwT5ifToyP3SNZeQWfJEWrUENYA5IXM6sN5vLwAKvaJS1pQVu8mOFFUa_ET4JuHNTFAxKURFerJYHDUWXLXl1vDofYXuij45JZelYOjEFoCOn7E6Vxu0fwV7ACPzArcno1rYuVxGB7JY6G7__e4_KZW4lTYIaHSLVaVLzklZBLZnQw047oq5-Q/s16000/volks.gif") no-repeat center center',
//               backgroundSize: '100%',
//               animation: 'carMove 22s linear infinite',
//               left: '-25%'
//             }}
//           ></div>
          
//           {/* Bicycle Animation */}
//           <div 
//             className="footer_bg_two absolute bottom-0"
//             style={{
//               width: '88px',
//               height: '100px',
//               background: 'url("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhyLGwEUVwPK6Vi8xXMymsc-ZXVwLWyXhogZxbcXQYSY55REw_0D4VTQnsVzCrL7nsyjd0P7RVOI5NKJbQ75koZIalD8mqbMquP20fL3DxsWngKkOLOzoOf9sMuxlbyfkIBTsDw5WFUj-YJiI50yzgVjF8cZPHhEjkOP_PRTQXDHEq8AyWpBiJdN9SfQA/s16000/cyclist.gif") no-repeat center center',
//               backgroundSize: '100%',
//               animation: 'bikeMove 30s linear infinite',
//               left: '-25%',
//               animationDelay: '5s'
//             }}
//           ></div>
//         </div>

//         <div className="samsung-container relative z-10">
//           <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
//             <div className="max-w-xl">
//               <h3 className="text-2xl font-bold text-white mb-4">Get the latest deals and updates</h3>
//               <p className="text-blue-100">Subscribe to our newsletter for exclusive offers, new product announcements, and tech tips.</p>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email address"
//                 className="px-6 py-3 border border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 flex-grow sm:flex-grow-0 sm:w-80"
//                 style={{ 
//                   '--tw-ring-color': 'rgba(255, 255, 255, 0.5)',
//                   backdropFilter: 'blur(10px)'
//                 }}
//               />
//               <button 
//                 onClick={handleSubscribe}
//                 className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl transform hover:scale-105 relative"
//               >
//                 <span className="flex items-center justify-center gap-2">
//                   {isSubmitted ? 'Subscribed!' : 'Subscribe'}
//                   {isSubmitted && <FiCheck className="w-4 h-4" />}
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Footer Content */}
//       <div className="py-12"
//            style={{ 
//              background: `linear-gradient(135deg, ${bluePrimary} 0%, ${blueDark} 100%)`
//            }}>
//         <div className="samsung-container">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
//             {footerSections.map((section, index) => (
//               <div key={index}>
//                 <h4 className="font-bold text-white mb-6 text-lg">{section.title}</h4>
//                 <ul className="space-y-3">
//                   {section.links.map((link, linkIndex) => (
//                     <li key={linkIndex}>
//                       <a 
//                         href="#" 
//                         className="text-blue-100 hover:text-white hover:underline transition-colors text-sm hover:translate-x-1 inline-block"
//                       >
//                         {link}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>

//           {/* Contact Information */}
//           <div className="mt-12 pt-12 border-t border-blue-800/50">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               {contactInfo.map((contact, index) => (
//                 <div key={index} className="flex items-start space-x-4">
//                   <div className="p-2 rounded-lg text-white bg-white/20 backdrop-blur-sm border border-white/30">
//                     <contact.icon size={20} />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-white">{contact.text}</p>
//                     <p className="text-blue-200 text-sm mt-1">{contact.subtext}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Social & Legal */}
//       <div className="py-8"
//            style={{ 
//              background: `linear-gradient(135deg, ${blueDark} 0%, ${bluePrimary} 100%)`
//            }}>
//         <div className="samsung-container">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-6">
//             {/* Social Media */}
//             <div className="flex items-center space-x-6">
//               <span className="font-semibold text-white">Follow Us:</span>
//               <div className="flex space-x-4">
//                 {socialLinks.map((social, index) => (
//                   <a
//                     key={index}
//                     href="#"
//                     className="text-blue-200 hover:text-white transition-colors transform hover:scale-110"
//                     aria-label={social.label}
//                   >
//                     <social.icon size={20} />
//                   </a>
//                 ))}
//               </div>
//             </div>

//             {/* Legal Links */}
//             <div className="flex flex-wrap justify-center gap-4 text-sm">
//               {legalLinks.map((link, index) => (
//                 <a
//                   key={index}
//                   href="#"
//                   className="text-blue-200 hover:text-white hover:underline transition-colors"
//                 >
//                   {link}
//                 </a>
//               ))}
//             </div>

//             {/* Country Selector */}
//             <div className="flex items-center space-x-2">
//               <span className="text-blue-200 text-sm">Country/Region:</span>
//               <select className="border border-blue-800/50 bg-white/10 backdrop-blur-sm text-white rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-white/50">
//                 <option className="bg-blue-900 text-white">United States</option>
//                 <option className="bg-blue-900 text-white">Canada</option>
//                 <option className="bg-blue-900 text-white">United Kingdom</option>
//                 <option className="bg-blue-900 text-white">Australia</option>
//               </select>
//             </div>
//           </div>

//           {/* Copyright */}
//           <div className="mt-8 pt-8 border-t border-blue-800/50 text-center">
//             <p className="text-blue-200 text-sm">
//               © 2024 ElectroStore. All rights reserved. All brand names, logos, and trademarks are property of their respective owners.
//             </p>
//             <p className="text-blue-300/70 text-xs mt-2">
//               Prices and availability are subject to change. Not responsible for typographical errors.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* CSS for animations */}
//       <style jsx>{`
//         @keyframes carMove {
//           0% {
//             left: -25%;
//           }
//           100% {
//             left: 100%;
//           }
//         }

//         @keyframes bikeMove {
//           0% {
//             left: -25%;
//           }
//           100% {
//             left: 100%;
//           }
//         }

//         .footer_bg_one {
//           animation: carMove 22s linear infinite;
//         }

//         .footer_bg_two {
//           animation: bikeMove 30s linear infinite;
//           animation-delay: 5s;
//         }

//         /* Responsive adjustments */
//         @media (max-width: 768px) {
//           .footer_bg_one {
//             width: 200px;
//             height: 64px;
//           }
          
//           .footer_bg_two {
//             width: 60px;
//             height: 68px;
//           }
//         }
//       `}</style>
//     </footer>
//   );
// };

// export default Footer;


// import React from 'react';
// import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

// const Footer = () => {
//   // Define blue colors
//   const bluePrimary = 'rgb(0, 42, 100)';
//   const blueSecondary = 'rgb(0, 61, 130)';
//   const blueDark = 'rgb(0, 18, 36)';

//   const footerSections = [
//     {
//       title: 'Products',
//       links: [
//         'Smartphones', 'Tablets', 'Wearables', 'TVs & Displays',
//         'Refrigerators', 'Washers & Dryers', 'Air Conditioners',
//         'Monitors', 'Memory Storage', 'Accessories'
//       ]
//     },
//     {
//       title: 'Shop',
//       links: [
//         'Weekly Deals', 'Student Offers', 'Military Discount',
//         'Refurbished', 'Trade-In Program', 'Gift Cards',
//         'Shop The Look', 'Build Your Bundle'
//       ]
//     },
//     {
//       title: 'Support',
//       links: [
//         'Contact Us', 'Live Chat', 'Email Support',
//         'Schedule Service', 'Product Help', 'Manuals & Downloads',
//         'Software Updates', 'Warranty'
//       ]
//     },
//     {
//       title: 'About Us',
//       links: [
//         'Our Company', 'Newsroom', 'Careers',
//         'Investor Relations', 'Sustainability',
//         'Ethics & Compliance', 'Accessibility'
//       ]
//     }
//   ];

//   const socialLinks = [
//     { icon: FiFacebook, label: 'Facebook' },
//     { icon: FiTwitter, label: 'Twitter' },
//     { icon: FiInstagram, label: 'Instagram' },
//     { icon: FiYoutube, label: 'YouTube' },
//     { icon: FiLinkedin, label: 'LinkedIn' }
//   ];

//   const contactInfo = [
//     { icon: FiPhone, text: '1-800-ELECTRO (1-800-353-2876)', subtext: '24/7 Customer Support' },
//     { icon: FiMail, text: 'support@electrostore.com', subtext: 'Email Response within 24 hours' },
//     { icon: FiMapPin, text: 'Store Locator', subtext: 'Find a retail store near you' }
//   ];

//   const legalLinks = [
//     'Privacy Policy', 'Terms of Use', 'Cookie Policy',
//     'Legal Notices', 'Site Map', 'Interest-Based Ads'
//   ];

//   return (
//     <footer className="text-gray-800 mt-auto">
//       {/* Newsletter Section with Gradient Background */}
//       <div className="py-12"
//            style={{ 
//              background: `linear-gradient(135deg, ${blueDark} 0%, ${bluePrimary} 40%, ${blueSecondary} 100%)`
//            }}>
//         <div className="samsung-container">
//           <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
//             <div className="max-w-xl">
//               <h3 className="text-2xl font-bold text-white mb-4">Get the latest deals and updates</h3>
//               <p className="text-blue-100">Subscribe to our newsletter for exclusive offers, new product announcements, and tech tips.</p>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
//               <input
//                 type="email"
//                 placeholder="Enter your email address"
//                 className="px-6 py-3 border border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 flex-grow sm:flex-grow-0 sm:w-80"
//                 style={{ 
//                   '--tw-ring-color': 'rgba(255, 255, 255, 0.5)',
//                   backdropFilter: 'blur(10px)'
//                 }}
//               />
//               <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl transform hover:scale-105">
//                 Subscribe
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Footer Content with Gradient Background */}
//       <div className="py-12"
//            style={{ 
//              background: `linear-gradient(135deg, ${bluePrimary} 0%, ${blueDark} 100%)`
//            }}>
//         <div className="samsung-container">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
//             {footerSections.map((section, index) => (
//               <div key={index}>
//                 <h4 className="font-bold text-white mb-6 text-lg">{section.title}</h4>
//                 <ul className="space-y-3">
//                   {section.links.map((link, linkIndex) => (
//                     <li key={linkIndex}>
//                       <a 
//                         href="#" 
//                         className="text-blue-100 hover:text-white hover:underline transition-colors text-sm hover:translate-x-1 inline-block"
//                       >
//                         {link}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>

//           {/* Contact Information */}
//           <div className="mt-12 pt-12 border-t border-blue-800/50">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               {contactInfo.map((contact, index) => (
//                 <div key={index} className="flex items-start space-x-4">
//                   <div className="p-2 rounded-lg text-white bg-white/20 backdrop-blur-sm border border-white/30">
//                     <contact.icon size={20} />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-white">{contact.text}</p>
//                     <p className="text-blue-200 text-sm mt-1">{contact.subtext}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Social & Legal with Gradient Background */}
//       <div className="py-8"
//            style={{ 
//              background: `linear-gradient(135deg, ${blueDark} 0%, ${bluePrimary} 100%)`
//            }}>
//         <div className="samsung-container">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-6">
//             {/* Social Media */}
//             <div className="flex items-center space-x-6">
//               <span className="font-semibold text-white">Follow Us:</span>
//               <div className="flex space-x-4">
//                 {socialLinks.map((social, index) => (
//                   <a
//                     key={index}
//                     href="#"
//                     className="text-blue-200 hover:text-white transition-colors transform hover:scale-110"
//                     aria-label={social.label}
//                   >
//                     <social.icon size={20} />
//                   </a>
//                 ))}
//               </div>
//             </div>

//             {/* Legal Links */}
//             <div className="flex flex-wrap justify-center gap-4 text-sm">
//               {legalLinks.map((link, index) => (
//                 <a
//                   key={index}
//                   href="#"
//                   className="text-blue-200 hover:text-white hover:underline transition-colors"
//                 >
//                   {link}
//                 </a>
//               ))}
//             </div>

//             {/* Country Selector */}
//             <div className="flex items-center space-x-2">
//               <span className="text-blue-200 text-sm">Country/Region:</span>
//               <select className="border border-blue-800/50 bg-white/10 backdrop-blur-sm text-white rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-white/50">
//                 <option className="bg-blue-900 text-white">United States</option>
//                 <option className="bg-blue-900 text-white">Canada</option>
//                 <option className="bg-blue-900 text-white">United Kingdom</option>
//                 <option className="bg-blue-900 text-white">Australia</option>
//               </select>
//             </div>
//           </div>

//           {/* Copyright */}
//           <div className="mt-8 pt-8 border-t border-blue-800/50 text-center">
//             <p className="text-blue-200 text-sm">
//               © 2024 ElectroStore. All rights reserved. All brand names, logos, and trademarks are property of their respective owners.
//             </p>
//             <p className="text-blue-300/70 text-xs mt-2">
//               Prices and availability are subject to change. Not responsible for typographical errors.
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// import React from 'react';
// import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

// const Footer = () => {
//   const footerSections = [
//     {
//       title: 'Products',
//       links: [
//         'Smartphones', 'Tablets', 'Wearables', 'TVs & Displays',
//         'Refrigerators', 'Washers & Dryers', 'Air Conditioners',
//         'Monitors', 'Memory Storage', 'Accessories'
//       ]
//     },
//     {
//       title: 'Shop',
//       links: [
//         'Weekly Deals', 'Student Offers', 'Military Discount',
//         'Refurbished', 'Trade-In Program', 'Gift Cards',
//         'Shop The Look', 'Build Your Bundle'
//       ]
//     },
//     {
//       title: 'Support',
//       links: [
//         'Contact Us', 'Live Chat', 'Email Support',
//         'Schedule Service', 'Product Help', 'Manuals & Downloads',
//         'Software Updates', 'Warranty'
//       ]
//     },
//     {
//       title: 'About Us',
//       links: [
//         'Our Company', 'Newsroom', 'Careers',
//         'Investor Relations', 'Sustainability',
//         'Ethics & Compliance', 'Accessibility'
//       ]
//     }
//   ];

//   const socialLinks = [
//     { icon: FiFacebook, label: 'Facebook' },
//     { icon: FiTwitter, label: 'Twitter' },
//     { icon: FiInstagram, label: 'Instagram' },
//     { icon: FiYoutube, label: 'YouTube' },
//     { icon: FiLinkedin, label: 'LinkedIn' }
//   ];

//   const contactInfo = [
//     { icon: FiPhone, text: '1-800-ELECTRO (1-800-353-2876)', subtext: '24/7 Customer Support' },
//     { icon: FiMail, text: 'support@electrostore.com', subtext: 'Email Response within 24 hours' },
//     { icon: FiMapPin, text: 'Store Locator', subtext: 'Find a retail store near you' }
//   ];

//   const legalLinks = [
//     'Privacy Policy', 'Terms of Use', 'Cookie Policy',
//     'Legal Notices', 'Site Map', 'Interest-Based Ads'
//   ];

//   return (
//     <footer className="bg-samsung-gray text-gray-800 mt-auto">
//       {/* Newsletter Section */}
//       <div className="bg-white py-12 border-b">
//         <div className="samsung-container">
//           <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
//             <div className="max-w-xl">
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">Get the latest deals and updates</h3>
//               <p className="text-gray-600">Subscribe to our newsletter for exclusive offers, new product announcements, and tech tips.</p>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
//               <input
//                 type="email"
//                 placeholder="Enter your email address"
//                 className="px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-samsung-blue flex-grow sm:flex-grow-0 sm:w-80"
//               />
//               <button className="bg-samsung-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-samsung-blue-light transition-colors whitespace-nowrap">
//                 Subscribe
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Footer Content */}
//       <div className="py-12">
//         <div className="samsung-container">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
//             {footerSections.map((section, index) => (
//               <div key={index}>
//                 <h4 className="font-bold text-gray-900 mb-6 text-lg">{section.title}</h4>
//                 <ul className="space-y-3">
//                   {section.links.map((link, linkIndex) => (
//                     <li key={linkIndex}>
//                       <a 
//                         href="#" 
//                         className="text-gray-600 hover:text-samsung-blue hover:underline transition-colors text-sm"
//                       >
//                         {link}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>

//           {/* Contact Information */}
//           <div className="mt-12 pt-12 border-t">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               {contactInfo.map((contact, index) => (
//                 <div key={index} className="flex items-start space-x-4">
//                   <div className="p-2 bg-samsung-blue text-white rounded-lg">
//                     <contact.icon size={20} />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-900">{contact.text}</p>
//                     <p className="text-gray-500 text-sm mt-1">{contact.subtext}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Social & Legal */}
//       <div className="bg-white py-8 border-t">
//         <div className="samsung-container">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-6">
//             {/* Social Media */}
//             <div className="flex items-center space-x-6">
//               <span className="font-semibold text-gray-900">Follow Us:</span>
//               <div className="flex space-x-4">
//                 {socialLinks.map((social, index) => (
//                   <a
//                     key={index}
//                     href="#"
//                     className="text-gray-400 hover:text-samsung-blue transition-colors"
//                     aria-label={social.label}
//                   >
//                     <social.icon size={20} />
//                   </a>
//                 ))}
//               </div>
//             </div>

//             {/* Legal Links */}
//             <div className="flex flex-wrap justify-center gap-4 text-sm">
//               {legalLinks.map((link, index) => (
//                 <a
//                   key={index}
//                   href="#"
//                   className="text-gray-600 hover:text-samsung-blue hover:underline"
//                 >
//                   {link}
//                 </a>
//               ))}
//             </div>

//             {/* Country Selector */}
//             <div className="flex items-center space-x-2">
//               <span className="text-gray-600 text-sm">Country/Region:</span>
//               <select className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-samsung-blue">
//                 <option>United States</option>
//                 <option>Canada</option>
//                 <option>United Kingdom</option>
//                 <option>Australia</option>
//               </select>
//             </div>
//           </div>

//           {/* Copyright */}
//           <div className="mt-8 pt-8 border-t text-center">
//             <p className="text-gray-500 text-sm">
//               © 2024 ElectroStore. All rights reserved. All brand names, logos, and trademarks are property of their respective owners.
//             </p>
//             <p className="text-gray-400 text-xs mt-2">
//               Prices and availability are subject to change. Not responsible for typographical errors.
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;





