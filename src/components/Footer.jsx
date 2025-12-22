import React, { useState } from 'react';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiLinkedin, FiMail, FiPhone, FiMapPin, FiCheck } from 'react-icons/fi';

const Footer = () => {
  // Define blue colors
  const bluePrimary = 'rgb(0, 42, 100)';
  const blueSecondary = 'rgb(0, 61, 130)';
  const blueDark = 'rgb(0, 18, 36)';

  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  const footerSections = [
    {
      title: 'Products',
      links: [
        'Smartphones', 'Tablets', 'Wearables', 'TVs & Displays',
        'Refrigerators', 'Washers & Dryers', 'Air Conditioners',
        'Monitors', 'Memory Storage', 'Accessories'
      ]
    },
    {
      title: 'Shop',
      links: [
        'Weekly Deals', 'Student Offers', 'Military Discount',
        'Refurbished', 'Trade-In Program', 'Gift Cards',
        'Shop The Look', 'Build Your Bundle'
      ]
    },
    {
      title: 'Support',
      links: [
        'Contact Us', 'Live Chat', 'Email Support',
        'Schedule Service', 'Product Help', 'Manuals & Downloads',
        'Software Updates', 'Warranty'
      ]
    },
    {
      title: 'About Us',
      links: [
        'Our Company', 'Newsroom', 'Careers',
        'Investor Relations', 'Sustainability',
        'Ethics & Compliance', 'Accessibility'
      ]
    }
  ];

  const socialLinks = [
    { icon: FiFacebook, label: 'Facebook' },
    { icon: FiTwitter, label: 'Twitter' },
    { icon: FiInstagram, label: 'Instagram' },
    { icon: FiYoutube, label: 'YouTube' },
    { icon: FiLinkedin, label: 'LinkedIn' }
  ];

  const contactInfo = [
    { icon: FiPhone, text: '1-800-ELECTRO (1-800-353-2876)', subtext: '24/7 Customer Support' },
    { icon: FiMail, text: 'support@electrostore.com', subtext: 'Email Response within 24 hours' },
    { icon: FiMapPin, text: 'Store Locator', subtext: 'Find a retail store near you' }
  ];

  const legalLinks = [
    'Privacy Policy', 'Terms of Use', 'Cookie Policy',
    'Legal Notices', 'Site Map', 'Interest-Based Ads'
  ];

  return (
    <footer className="text-gray-800 mt-auto new_footer_area" style={{ background: '#fbfbfd' }}>
      {/* Newsletter Section */}
      <div className="new_footer_top py-12 relative overflow-hidden"
           style={{ 
             background: `linear-gradient(135deg, ${blueDark} 0%, ${bluePrimary} 40%, ${blueSecondary} 100%)`
           }}>
        
        {/* Car and Bicycle Animations */}
        <div className="footer_bg absolute bottom-0 left-0 w-full h-64 overflow-hidden pointer-events-none">
          {/* Car Animation */}
          <div 
            className="footer_bg_one absolute bottom-0"
            style={{
              width: '330px',
              height: '105px',
              background: 'url("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEia0PYPxwT5ifToyP3SNZeQWfJEWrUENYA5IXM6sN5vLwAKvaJS1pQVu8mOFFUa_ET4JuHNTFAxKURFerJYHDUWXLXl1vDofYXuij45JZelYOjEFoCOn7E6Vxu0fwV7ACPzArcno1rYuVxGB7JY6G7__e4_KZW4lTYIaHSLVaVLzklZBLZnQw047oq5-Q/s16000/volks.gif") no-repeat center center',
              backgroundSize: '100%',
              animation: 'carMove 22s linear infinite',
              left: '-25%'
            }}
          ></div>
          
          {/* Bicycle Animation */}
          <div 
            className="footer_bg_two absolute bottom-0"
            style={{
              width: '88px',
              height: '100px',
              background: 'url("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhyLGwEUVwPK6Vi8xXMymsc-ZXVwLWyXhogZxbcXQYSY55REw_0D4VTQnsVzCrL7nsyjd0P7RVOI5NKJbQ75koZIalD8mqbMquP20fL3DxsWngKkOLOzoOf9sMuxlbyfkIBTsDw5WFUj-YJiI50yzgVjF8cZPHhEjkOP_PRTQXDHEq8AyWpBiJdN9SfQA/s16000/cyclist.gif") no-repeat center center',
              backgroundSize: '100%',
              animation: 'bikeMove 30s linear infinite',
              left: '-25%',
              animationDelay: '5s'
            }}
          ></div>
        </div>

        <div className="samsung-container relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold text-white mb-4">Get the latest deals and updates</h3>
              <p className="text-blue-100">Subscribe to our newsletter for exclusive offers, new product announcements, and tech tips.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="px-6 py-3 border border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 flex-grow sm:flex-grow-0 sm:w-80"
                style={{ 
                  '--tw-ring-color': 'rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(10px)'
                }}
              />
              <button 
                onClick={handleSubscribe}
                className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl transform hover:scale-105 relative"
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitted ? 'Subscribed!' : 'Subscribe'}
                  {isSubmitted && <FiCheck className="w-4 h-4" />}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12"
           style={{ 
             background: `linear-gradient(135deg, ${bluePrimary} 0%, ${blueDark} 100%)`
           }}>
        <div className="samsung-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="font-bold text-white mb-6 text-lg">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href="#" 
                        className="text-blue-100 hover:text-white hover:underline transition-colors text-sm hover:translate-x-1 inline-block"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Information */}
          <div className="mt-12 pt-12 border-t border-blue-800/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg text-white bg-white/20 backdrop-blur-sm border border-white/30">
                    <contact.icon size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{contact.text}</p>
                    <p className="text-blue-200 text-sm mt-1">{contact.subtext}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Social & Legal */}
      <div className="py-8"
           style={{ 
             background: `linear-gradient(135deg, ${blueDark} 0%, ${bluePrimary} 100%)`
           }}>
        <div className="samsung-container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Media */}
            <div className="flex items-center space-x-6">
              <span className="font-semibold text-white">Follow Us:</span>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-blue-200 hover:text-white transition-colors transform hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-blue-200 hover:text-white hover:underline transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Country Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-blue-200 text-sm">Country/Region:</span>
              <select className="border border-blue-800/50 bg-white/10 backdrop-blur-sm text-white rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-white/50">
                <option className="bg-blue-900 text-white">United States</option>
                <option className="bg-blue-900 text-white">Canada</option>
                <option className="bg-blue-900 text-white">United Kingdom</option>
                <option className="bg-blue-900 text-white">Australia</option>
              </select>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-blue-800/50 text-center">
            <p className="text-blue-200 text-sm">
              © 2024 ElectroStore. All rights reserved. All brand names, logos, and trademarks are property of their respective owners.
            </p>
            <p className="text-blue-300/70 text-xs mt-2">
              Prices and availability are subject to change. Not responsible for typographical errors.
            </p>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes carMove {
          0% {
            left: -25%;
          }
          100% {
            left: 100%;
          }
        }

        @keyframes bikeMove {
          0% {
            left: -25%;
          }
          100% {
            left: 100%;
          }
        }

        .footer_bg_one {
          animation: carMove 22s linear infinite;
        }

        .footer_bg_two {
          animation: bikeMove 30s linear infinite;
          animation-delay: 5s;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .footer_bg_one {
            width: 200px;
            height: 64px;
          }
          
          .footer_bg_two {
            width: 60px;
            height: 68px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;


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





