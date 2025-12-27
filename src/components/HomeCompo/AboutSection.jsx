

// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   FiGlobe, 
//   FiAward, 
//   FiUsers, 
//   FiTrendingUp, 
//   FiCheckCircle, 
//   FiPlay,
//   FiArrowRight,
//   FiTarget,
//   FiHeart,
//   FiShield,
//   FiStar,
//   FiPackage,
//   FiClock,
//   FiThumbsUp,
//   FiMapPin,
//   FiShoppingBag,
//   FiPercent,
//   FiChevronRight,
//   FiChevronDown,
//   FiZap,
//   FiBarChart2,
//   FiRefreshCw,
//   FiTrendingDown,
//   FiTruck,
//   FiBox,
//   FiAnchor,
//   FiFileText,
//   FiDollarSign,
//   FiBriefcase,
//   FiLayers
// } from 'react-icons/fi';
// import { 
//   GiAfrica, 
//   GiEarthAsiaOceania 
// } from "react-icons/gi";

// import { 
//   FaFlagUsa, 
//   FaRegFlag, 
//   FaGlobe 
// } from "react-icons/fa";

// import { 
//   MdPublic 
// } from "react-icons/md";


// const AboutSection = () => {
//   const [activeTab, setActiveTab] = useState('story');
//   const [stats, setStats] = useState([
//     { value: 0, target: 18, label: 'Years in Export Business', suffix: '+', duration: 2000 },
//     { value: 0, target: 1000, label: 'Products Export Range', suffix: '+', duration: 1500 },
//     { value: 0, target: 60, label: 'Countries Served', suffix: '+', duration: 1800 },
//     { value: 0, target: 95, label: 'Client Retention Rate', suffix: '%', duration: 1200 }
//   ]);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [expandedValues, setExpandedValues] = useState(false);

//   const sectionRef = useRef(null);

//   const bluePrimary = 'rgb(0, 42, 100)';
//   const blueSecondary = 'rgb(0, 61, 130)';
//   const blueDark = 'rgb(0, 18, 36)';

//   // Country data with flag icons
//   const countries = [
//       { name: 'United States of America (USA)', icon: <FaFlagUsa className="text-xl" />, color: '#3C3B6E' },
//   { name: 'United Kingdom (UK)', icon: <FaRegFlag className="text-xl" />, color: '#C8102E' },
//   { name: 'Europe', icon: <FaGlobe className="text-xl" />, color: '#003399' },
//   { name: 'Africa', icon: <GiAfrica className="text-xl" />, color: '#008751' },
//   { name: 'Middle East', icon: <FaRegFlag className="text-xl" />, color: '#007A3D' },
//   { name: 'Asia-Pacific', icon: <GiEarthAsiaOceania className="text-xl" />, color: '#FF0000' }
//     // { name: 'United States of America (USA)', icon: <FaFlagUsa className="text-xl" />, color: '#3C3B6E' },
//     // { name: 'United Kingdom (UK)', icon: <FaFlagUk  className="text-xl" />, color: '#C8102E' },
//     // { name: 'Europe', icon: <GiEarthEurope  className="text-xl" />, color: '#003399' },
//     // { name: 'Africa', icon: <GiAfrica className="text-xl" />, color: '#008751' },
//     // { name: 'Middle East', icon: <FaRegFlag className="text-xl" />, color: '#007A3D' },
//     // { name: 'Asia-Pacific', icon: <GiEarthAsiaOceania  className="text-xl" />, color: '#FF0000' }
//   ];

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting) {
//             setIsVisible(true);
//             stats.forEach((stat, index) => {
//               const increment = stat.target / (stat.duration / 16);
//               let current = 0;
//               const timer = setInterval(() => {
//                 current += increment;
//                 if (current >= stat.target) {
//                   current = stat.target;
//                   clearInterval(timer);
//                 }
//                 setStats(prev => prev.map((s, i) => 
//                   i === index ? { ...s, value: Math.floor(current) } : s
//                 ));
//               }, 16);
//             });
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current);
//       }
//     };
//   }, []);

//   // Updated tab content for export company
//   const tabContent = {
//     story: {
//       title: "Our Journey Since 2006",
//       content: `Founded in 2006 and headquartered in Hong Kong, we are an internationally recognized export company specializing in supplying high-quality products to global markets. Over 18 years, we have built strong relationships with manufacturers, suppliers, and buyers across multiple regions.`,
//       points: [
//         "2006: Founded as export specialists in Hong Kong",
//         "2010: Expanded to European markets",
//         "2014: Established USA & UK partnerships",
//         "2018: Awarded 'Top Export Excellence'",
//         "2023: Serving 60+ countries worldwide"
//       ]
//     },
//     mission: {
//       title: "Our Mission",
//       content: `To deliver high-quality products globally while maintaining transparency, reliability, and long-term value for our partners through ethical business practices and customer-centric solutions.`,
//       points: [
//         "Ensure product quality at every stage",
//         "Maintain ethical business standards",
//         "Build lasting global partnerships",
//         "Provide seamless export solutions",
//         "Exceed customer expectations consistently"
//       ]
//     },
//     values: {
//       title: "Our Core Values",
//       content: `We operate with integrity, transparency, and excellence at our core, ensuring every export transaction delivers maximum value to our global partners.`,
//       points: [
//         "Integrity First",
//         "Quality Excellence",
//         "Global Partnership",
//         "Transparency",
//         "Reliability",
//         "Sustainable Growth"
//       ]
//     }
//   };

//   const ProgressBar = ({ percentage }) => (
//     <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
//       <div 
//         className="h-full rounded-full transition-all duration-1000 ease-out"
//         style={{ 
//           width: `${percentage}%`,
//           background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})`
//         }}
//       ></div>
//     </div>
//   );

//   return (
//     <section ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
//       <div className="samsung-container" style={{
//         backgroundImage: "url('/png/5.png')",
//         backgroundRepeat: "no-repeat",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundAttachment: "fixed",
//         borderRadius: "30px",
//         padding: "40px"
//       }}>
//         <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           <div 
//             className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold mb-6 animate-bounce-slow"
//             style={{ 
//               background: `linear-gradient(135deg, ${bluePrimary}10, ${blueSecondary}20)`,
//               color: bluePrimary
//             }}
//           >
//             <FiTarget className="text-lg animate-spin-slow" />
//             YOUR TRUSTED GLOBAL EXPORT PARTNER
//             <FiChevronDown className="text-sm animate-bounce" />
//           </div>
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
//             Global Export Excellence <span className="relative" style={{ color: bluePrimary }}>
//               Since 2006
//               <span className="absolute -bottom-2 left-0 w-full h-1 rounded-full animate-pulse"
//                     style={{ background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})` }}></span>
//             </span>
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             Based in Hong Kong, we are a leading export company delivering quality products to international markets 
//             including the USA, UK, Europe, Africa, and beyond. With over 18 years of industry experience, 
//             we connect global buyers with reliable sourcing and seamless export solutions.
//           </p>
//         </div>

//        {/* Key Benefits - With Animated Icons */}
// <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
//   {[
//     { 
//       icon: <FiCheckCircle />, 
//       title: "Quality Assured", 
//       desc: "Rigorous quality control at every stage" 
//     },
//     { 
//       icon: <FiGlobe />, 
//       title: "Global Reach", 
//       desc: "Serving 60+ countries worldwide" 
//     },
//     { 
//       icon: <FiTruck />, 
//       title: "Reliable Logistics", 
//       desc: "Seamless shipping & documentation" 
//     },
//     { 
//       icon: <FiUsers />, 
//       title: "Long-Term Partnerships", 
//       desc: "Building relationships since 2006" 
//     }
//   ].map((benefit, index) => (
//     <div 
//       key={index} 
//       className="group relative bg-white p-5 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 text-center"
//             data-aos="fade-up"
//                 data-aos-delay={index * 200} 
//                 data-aos-duration="600"
//                 data-aos-once="true"
//     >
//       {/* Animated icon at top */}
//       <div className="flex justify-center mb-4">
//         <div className="relative">
//           <div className="p-3 rounded-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
//                style={{ background: `${bluePrimary}10`, color: bluePrimary }}>
//             {React.cloneElement(benefit.icon, { size: 28 })}
//           </div>
//           <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"
//               ></div>
//         </div>
//       </div>
      
//       {/* Title */}
//       <h3 className="text-lg font-bold mb-2 transition-colors group-hover:text-blue-600"
//           style={{ color: bluePrimary }}>
//         {benefit.title}
//       </h3>
      
//       {/* Single line description */}
//       <div className="pt-3 border-t border-gray-100">
//         <p className="text-gray-600 text-sm leading-tight">
//           {benefit.desc}
//         </p>
//       </div>
//     </div>
//   ))}
// </div>

//         <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           {stats.map((stat, index) => (
//             <div 
//               key={index} 
//               className={`bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group relative overflow-hidden`}
//                     data-aos="fade-up"
//                 data-aos-delay={index * 200} // Stagger delay: 0ms, 100ms, 200ms, 300ms
//                 data-aos-duration="600"
//                 data-aos-once="true"
//               style={{ borderColor: hoveredCard === index ? `${bluePrimary}30` : '#f3f4f6' }}
//               onMouseEnter={() => setHoveredCard(index)}
//               onMouseLeave={() => setHoveredCard(null)}
//             >
//               <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${hoveredCard === index ? 'opacity-100' : ''}`}
//                    style={{ background: `linear-gradient(to bottom right, ${bluePrimary}05, transparent)` }}></div>
              
//               <div className="relative">
//                 <div className="text-5xl md:text-6xl font-bold mb-3 transition-all duration-300 group-hover:scale-105"
//                      style={{ color: bluePrimary }}>
//                   {stat.value}
//                   <span className="text-3xl">{stat.suffix}</span>
//                 </div>
//                 <p className="text-gray-600 font-medium mb-2">{stat.label}</p>
                
//                 <div className="mt-4">
//                   <div className="flex justify-between text-sm text-gray-500">
//                     <span>Performance</span>
//                     <span>{Math.round((stat.value / stat.target) * 100)}%</span>
//                   </div>
//                   <ProgressBar percentage={(stat.value / stat.target) * 100} />
//                 </div>
                
//                 <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}`}
//                      style={{ background: blueSecondary }}></div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="grid lg:grid-cols-2 gap-12 mb-20">
//           <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
//             <div className="bg-white rounded-2xl shadow-xl p-2 inline-flex border border-gray-100 relative overflow-hidden">
//               <div 
//                 className={`absolute h-full rounded-lg transition-all duration-500 ease-in-out ${activeTab === 'story' ? 'w-1/3 left-0' : activeTab === 'mission' ? 'w-1/3 left-1/3' : 'w-1/3 left-2/3'}`}
//                 style={{ background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})` }}
//               ></div>
              
//               {Object.keys(tabContent).map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`relative px-8 py-4 rounded-lg font-semibold transition-all duration-300 z-10 ${
//                     activeTab === tab
//                       ? 'text-white'
//                       : 'text-gray-600 hover:text-blue-600'
//                   }`}
//                   style={activeTab === tab ? { color: 'white' } : { color: 'gray' }}
//                 >
//                   {tab === 'story' ? 'Our Story' : tab === 'mission' ? 'Our Mission' : 'Our Values'}
//                 </button>
//               ))}
//             </div>

//             <div className="bg-white rounded-2xl shadow-2xl p-8 transition-all duration-500 hover:shadow-2xl border border-gray-100 relative overflow-hidden group">
//               <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full group-hover:scale-150 transition-transform duration-700"
//                    style={{ background: `linear-gradient(to bottom left, ${bluePrimary}05, transparent)` }}></div>
              
//               <h3 className="text-2xl font-bold text-gray-900 mb-6 relative">
//                 {tabContent[activeTab].title}
//                 <span className="absolute -bottom-2 left-0 w-16 h-1 rounded-full"
//                       style={{ background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})` }}></span>
//               </h3>
              
//               <div className="mb-6">
//                 <p className="text-gray-700 text-lg leading-relaxed mb-6">
//                   {tabContent[activeTab].content}
//                 </p>
                
//                 <div className="space-y-3">
//                   {tabContent[activeTab].points.map((point, index) => (
//                     <div 
//                       key={index}
//                       className="flex items-center gap-3 text-gray-600 transition-all duration-300 hover:translate-x-2 group/item"
//                     >
//                       <div className="w-2 h-2 rounded-full animate-pulse group-hover/item:scale-150"
//                            style={{ background: bluePrimary }}></div>
//                       <span>{point}</span>
//                       <FiChevronRight className="opacity-0 group-hover/item:opacity-100 transition-all duration-300"
//                                      style={{ color: bluePrimary }} />
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               <div className="flex items-center gap-6 mt-8 pt-6 border-t border-gray-100">
//                 <button className="relative text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 group/btn overflow-hidden"
//                         style={{ background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})` }}>
//                   <span className="relative z-10 flex items-center gap-2">
//                     Learn More
//                     <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
//                   </span>
//                   <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
//                        style={{ background: `linear-gradient(to right, ${blueSecondary}, ${bluePrimary})` }}></div>
//                 </button>
                
//                 <button 
//                   onClick={() => setIsPlaying(!isPlaying)}
//                   className="flex items-center gap-3 text-gray-600 hover:text-samsung-blue transition-all duration-300 group/video"
//                 >
//                   <div className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover/video:scale-110`}
//                        style={{ background: `${bluePrimary}20` }}>
//                     {isPlaying ? (
//                       <div className="flex items-center gap-1">
//                         <div className="w-1.5 h-4 rounded-full animate-pulse"
//                              style={{ background: blueSecondary }}></div>
//                         <div className="w-1.5 h-4 rounded-full animate-pulse animation-delay-150"
//                              style={{ background: blueSecondary }}></div>
//                       </div>
//                     ) : (
//                       <FiPlay className="text-xl ml-1" style={{ color: bluePrimary }} />
//                     )}
//                     <div className="absolute inset-0 border-2 rounded-full animate-ping-slow"
//                          style={{ borderColor: `${bluePrimary}30` }}></div>
//                   </div>
//                   <div>
//                     <div className="font-semibold">{isPlaying ? 'Pause Story' : 'Our Export Journey'}</div>
//                     <div className="text-sm text-gray-500">4:20 min video</div>
//                   </div>
//                 </button>
//               </div>
//             </div>

//             {/* Global Markets Section */}
//             <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//               <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Global Markets</h3>
//               <p className="text-gray-600 mb-6">
//                 We proudly export to major markets worldwide. Our strong logistics network enables 
//                 timely and secure deliveries across continents.
//               </p>
              
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                 {countries.map((country, index) => (
//                   <div 
//                     key={index}
//                     className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
//                   >
//                     <div className="p-2 rounded-md" style={{ background: `${country.color}10`, color: country.color }}>
//                       {country.icon}
//                     </div>
//                     <span className="text-sm font-medium">{country.name}</span>
//                   </div>
//                 ))}
//               </div>
              
//               <div className="mt-6 pt-6 border-t border-gray-100">
//                 <p className="text-sm text-gray-500">
//                   Plus many more emerging markets across Latin America and Eastern Europe
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className={`space-y-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
//             {/* Why Choose Us Section */}
//             <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//               <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us</h3>
              
//               <div className="space-y-4">
//                 {[
//                   "Over 18 years of export experience",
//                   "Strong supplier and manufacturing network",
//                   "Strict quality control standards",
//                   "Competitive pricing",
//                   "Reliable shipping and documentation support",
//                   "Long-term client relationships across continents"
//                 ].map((point, index) => (
//                   <div key={index} className="flex items-start gap-3">
//                     <FiCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
//                     <span className="text-gray-700">{point}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Features Grid */}
//             {[
//               { 
//                 icon: <FiBriefcase />, 
//                 title: "Export Experience", 
//                 desc: "18+ years in international trade with proven track record", 
//                 metric: "18+ Years",
//                 progress: 100
//               },
//               { 
//                 icon: <FiLayers />, 
//                 title: "Product Range", 
//                 desc: "1000+ products across 11 major appliance categories", 
//                 metric: "1000+ Products",
//                 progress: 95
//               },
//               { 
//                 icon: <FiFileText />, 
//                 title: "Documentation", 
//                 desc: "Expert handling of export documentation & compliance", 
//                 metric: "100% Accuracy",
//                 progress: 98
//               },
//               { 
//                 icon: <FiDollarSign />, 
//                 title: "Cost Efficiency", 
//                 desc: "Competitive pricing with transparent cost structure", 
//                 metric: "Best Value",
//                 progress: 92
//               }
//             ].map((feature, index) => (
//               <div
//                 key={index}
//                 className="group relative overflow-hidden"
//                       data-aos="fade-up"
//                 data-aos-delay={index * 200} // Stagger delay: 0ms, 100ms, 200ms, 300ms
//                 data-aos-duration="600"
//                 data-aos-once="true"
//                 onMouseEnter={() => setHoveredCard(index + 10)}
//                 onMouseLeave={() => setHoveredCard(null)}
//               >
//                 <div className="relative bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-transparent transition-all duration-500 transform">
//                   <div className="flex items-start gap-4">
//                     <div className={`relative p-4 rounded-xl group-hover:scale-110 transition-transform duration-500`}
//                          style={{ background: `linear-gradient(135deg, ${bluePrimary}, ${blueSecondary})` }}>
//                       <div className="text-white text-xl">{feature.icon}</div>
//                     </div>
                    
//                     <div className="flex-1">
//                       <div className="flex items-start justify-between mb-3">
//                         <div>
//                           <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
//                             {feature.title}
//                           </h4>
//                           <p className="text-gray-600">{feature.desc}</p>
//                         </div>
//                         <div className="font-bold text-xl" style={{ color: bluePrimary }}>
//                           {feature.metric}
//                         </div>
//                       </div>
                      
//                       <div className="mt-4">
//                         <div className="flex justify-between text-sm text-gray-500 mb-1">
//                           <span>Performance Score</span>
//                           <span>{feature.progress}%</span>
//                         </div>
//                         <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//                           <div 
//                             className="h-full rounded-full transition-all duration-1000"
//                             style={{ 
//                               width: `${feature.progress}%`,
//                               background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})`
//                             }}
//                           ></div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutSection;









import React, { useState, useEffect, useRef } from 'react';
import { 
  FiGlobe, 
  FiAward, 
  FiUsers, 
  FiTrendingUp, 
  FiCheckCircle, 
  FiPlay,
  FiArrowRight,
  FiTarget,
  FiHeart,
  FiShield,
  FiStar,
  FiPackage,
  FiClock,
  FiThumbsUp,
  FiMapPin,
  FiShoppingBag,
  FiPercent,
  FiChevronRight,
  FiChevronDown,
  FiZap,
  FiBarChart2,
  FiRefreshCw,
  FiTrendingDown,
  FiTruck,
  FiBox,
  FiAnchor,
  FiFileText,
  FiDollarSign,
  FiBriefcase,
  FiLayers
} from 'react-icons/fi';
import { 
  GiAfrica, 
  GiEarthAsiaOceania 
} from "react-icons/gi";

import { 
  FaFlagUsa, 
  FaRegFlag, 
  FaGlobe 
} from "react-icons/fa";

import { 
  MdPublic 
} from "react-icons/md";


const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('story');
  const [stats, setStats] = useState([
    { value: 0, target: 18, label: 'Years in Export Business', suffix: '+', duration: 2000 },
    { value: 0, target: 1000, label: 'Products Export Range', suffix: '+', duration: 1500 },
    { value: 0, target: 60, label: 'Countries Served', suffix: '+', duration: 1800 },
    { value: 0, target: 95, label: 'Client Retention Rate', suffix: '%', duration: 1200 }
  ]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [expandedValues, setExpandedValues] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const sectionRef = useRef(null);

  const bluePrimary = 'rgb(0, 42, 100)';
  const blueSecondary = 'rgb(0, 61, 130)';
  const blueDark = 'rgb(0, 18, 36)';

  // Check for mobile and tablet screens
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Country data with flag icons
  const countries = [
    { name: 'United States of America (USA)', icon: <FaFlagUsa className="text-xl" />, color: '#3C3B6E' },
    { name: 'United Kingdom (UK)', icon: <FaRegFlag className="text-xl" />, color: '#C8102E' },
    { name: 'Europe', icon: <FaGlobe className="text-xl" />, color: '#003399' },
    { name: 'Africa', icon: <GiAfrica className="text-xl" />, color: '#008751' },
    { name: 'Middle East', icon: <FaRegFlag className="text-xl" />, color: '#007A3D' },
    { name: 'Asia-Pacific', icon: <GiEarthAsiaOceania className="text-xl" />, color: '#FF0000' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            stats.forEach((stat, index) => {
              const increment = stat.target / (stat.duration / 16);
              let current = 0;
              const timer = setInterval(() => {
                current += increment;
                if (current >= stat.target) {
                  current = stat.target;
                  clearInterval(timer);
                }
                setStats(prev => prev.map((s, i) => 
                  i === index ? { ...s, value: Math.floor(current) } : s
                ));
              }, 16);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Updated tab content for export company
  const tabContent = {
    story: {
      title: "Our Journey Since 2006",
      content: `Founded in 2006 and headquartered in Hong Kong, we are an internationally recognized export company specializing in supplying high-quality products to global markets. Over 18 years, we have built strong relationships with manufacturers, suppliers, and buyers across multiple regions.`,
      points: [
        "2006: Founded as export specialists in Hong Kong",
        "2010: Expanded to European markets",
        "2014: Established USA & UK partnerships",
        "2018: Awarded 'Top Export Excellence'",
        "2023: Serving 60+ countries worldwide"
      ]
    },
    mission: {
      title: "Our Mission",
      content: `To deliver high-quality products globally while maintaining transparency, reliability, and long-term value for our partners through ethical business practices and customer-centric solutions.`,
      points: [
        "Ensure product quality at every stage",
        "Maintain ethical business standards",
        "Build lasting global partnerships",
        "Provide seamless export solutions",
        "Exceed customer expectations consistently"
      ]
    },
    values: {
      title: "Our Core Values",
      content: `We operate with integrity, transparency, and excellence at our core, ensuring every export transaction delivers maximum value to our global partners.`,
      points: [
        "Integrity First",
        "Quality Excellence",
        "Global Partnership",
        "Transparency",
        "Reliability",
        "Sustainable Growth"
      ]
    }
  };

  const ProgressBar = ({ percentage }) => (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
      <div 
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{ 
          width: `${percentage}%`,
          background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})`
        }}
      ></div>
    </div>
  );

  return (
    <section ref={sectionRef} className="py-10 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="samsung-container" style={{
        backgroundImage: "url('/png/5.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: isMobile ? "scroll" : "fixed",
        borderRadius: isMobile ? "20px" : "30px",
        padding: isMobile ? "20px" : isTablet ? "30px" : "40px"
      }}>
        <div className={`text-center mb-8 md:mb-12 lg:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div 
            className={`inline-flex items-center gap-2 ${isMobile ? 'px-4 py-2 text-xs' : isTablet ? 'px-5 py-2.5 text-sm' : 'px-6 py-3 text-sm'} rounded-full font-semibold mb-4 md:mb-6 animate-bounce-slow`}
            style={{ 
              background: `linear-gradient(135deg, ${bluePrimary}10, ${blueSecondary}20)`,
              color: bluePrimary
            }}
          >
            <FiTarget className={`${isMobile ? 'text-base' : 'text-lg'} animate-spin-slow`} />
            YOUR TRUSTED GLOBAL EXPORT PARTNER
            <FiChevronDown className={`${isMobile ? 'text-xs' : 'text-sm'} animate-bounce`} />
          </div>
          <h2 className={`${isMobile ? 'text-2xl sm:text-3xl' : isTablet ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-bold text-gray-900 ${isMobile ? 'mb-4' : 'mb-6'} leading-tight`}>
            Global Export Excellence <span className="relative" style={{ color: bluePrimary }}>
              Since 2006
              <span className="absolute -bottom-2 left-0 w-full h-1 rounded-full animate-pulse"
                    style={{ background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})` }}></span>
            </span>
          </h2>
          <p className={`${isMobile ? 'text-base sm:text-lg' : isTablet ? 'text-lg md:text-xl' : 'text-xl'} text-gray-600 max-w-3xl mx-auto leading-relaxed ${isMobile ? 'px-2' : ''}`}>
            Based in Hong Kong, we are a leading export company delivering quality products to international markets 
            including the USA, UK, Europe, Africa, and beyond. With over 18 years of industry experience, 
            we connect global buyers with reliable sourcing and seamless export solutions.
          </p>
        </div>

        {/* Key Benefits - With Animated Icons */}
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : isTablet ? 'grid-cols-2 gap-4' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'} mb-8 md:mb-12 lg:mb-16`}>
          {[
            { 
              icon: <FiCheckCircle />, 
              title: "Quality Assured", 
              desc: "Rigorous quality control at every stage" 
            },
            { 
              icon: <FiGlobe />, 
              title: "Global Reach", 
              desc: "Serving 60+ countries worldwide" 
            },
            { 
              icon: <FiTruck />, 
              title: "Reliable Logistics", 
              desc: "Seamless shipping & documentation" 
            },
            { 
              icon: <FiUsers />, 
              title: "Long-Term Partnerships", 
              desc: "Building relationships since 2006" 
            }
          ].map((benefit, index) => (
            <div 
              key={index} 
              className={`group relative bg-white ${isMobile ? 'p-4' : isTablet ? 'p-4' : 'p-5'} rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 text-center`}
              data-aos="fade-up"
              data-aos-delay={index * 200} 
              data-aos-duration="600"
              data-aos-once="true"
            >
              {/* Animated icon at top */}
              <div className="flex justify-center mb-3 md:mb-4">
                <div className="relative">
                  <div className={`${isMobile ? 'p-2' : 'p-3'} rounded-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
                       style={{ background: `${bluePrimary}10`, color: bluePrimary }}>
                    {React.cloneElement(benefit.icon, { size: isMobile ? 24 : 28 })}
                  </div>
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                       style={{ background: `linear-gradient(135deg, ${bluePrimary}, ${blueSecondary})` }}></div>
                </div>
              </div>
              
              {/* Title */}
              <h3 className={`${isMobile ? 'text-base font-semibold' : 'text-lg font-bold'} mb-2 transition-colors group-hover:text-blue-600`}
                  style={{ color: bluePrimary }}>
                {benefit.title}
              </h3>
              
              {/* Single line description */}
              <div className="pt-3 border-t border-gray-100">
                <p className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'} leading-tight`}>
                  {benefit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : isTablet ? 'grid-cols-2 gap-6' : 'grid-cols-2 md:grid-cols-4 gap-8'} mb-12 md:mb-16 lg:mb-20 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`bg-white ${isMobile ? 'p-6' : isTablet ? 'p-6' : 'p-8'} rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group relative overflow-hidden`}
              data-aos="fade-up"
              data-aos-delay={index * 200}
              data-aos-duration="600"
              data-aos-once="true"
              style={{ borderColor: hoveredCard === index ? `${bluePrimary}30` : '#f3f4f6' }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${hoveredCard === index ? 'opacity-100' : ''}`}
                   style={{ background: `linear-gradient(to bottom right, ${bluePrimary}05, transparent)` }}></div>
              
              <div className="relative">
                <div className={`${isMobile ? 'text-4xl' : isTablet ? 'text-5xl' : 'text-5xl md:text-6xl'} font-bold mb-3 transition-all duration-300 group-hover:scale-105`}
                     style={{ color: bluePrimary }}>
                  {stat.value}
                  <span className={`${isMobile ? 'text-2xl' : 'text-3xl'}`}>{stat.suffix}</span>
                </div>
                <p className={`text-gray-600 font-medium mb-2 ${isMobile ? 'text-sm' : ''}`}>{stat.label}</p>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Performance</span>
                    <span>{Math.round((stat.value / stat.target) * 100)}%</span>
                  </div>
                  <ProgressBar percentage={(stat.value / stat.target) * 100} />
                </div>
                
                <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}`}
                     style={{ background: blueSecondary }}></div>
              </div>
            </div>
          ))}
        </div>

        <div className={`grid ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-2'} ${isMobile ? 'gap-8' : 'gap-12'} mb-12 md:mb-16 lg:mb-20`}>
          <div className={`space-y-6 md:space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className={`bg-white ${isMobile ? 'rounded-xl' : 'rounded-2xl'} shadow-xl ${isMobile ? 'p-1' : 'p-2'} inline-flex border border-gray-100 relative overflow-hidden`}>
              <div 
                className={`absolute h-full ${isMobile ? 'rounded-md' : 'rounded-lg'} transition-all duration-500 ease-in-out ${activeTab === 'story' ? 'w-1/3 left-0' : activeTab === 'mission' ? 'w-1/3 left-1/3' : 'w-1/3 left-2/3'}`}
                style={{ background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})` }}
              ></div>
              
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative ${isMobile ? 'px-4 py-3 text-sm' : isTablet ? 'px-6 py-4' : 'px-8 py-4'} ${isMobile ? 'rounded-md' : 'rounded-lg'} font-semibold transition-all duration-300 z-10 ${
                    activeTab === tab
                      ? 'text-white'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                  style={activeTab === tab ? { color: 'white' } : { color: 'gray' }}
                >
                  {tab === 'story' ? 'Our Story' : tab === 'mission' ? 'Our Mission' : 'Our Values'}
                </button>
              ))}
            </div>

            <div className={`bg-white ${isMobile ? 'rounded-xl' : 'rounded-2xl'} shadow-2xl ${isMobile ? 'p-6' : isTablet ? 'p-6' : 'p-8'} transition-all duration-500 hover:shadow-2xl border border-gray-100 relative overflow-hidden group`}>
              <div className={`absolute top-0 right-0 ${isMobile ? 'w-16 h-16' : 'w-24 h-24'} rounded-bl-full group-hover:scale-150 transition-transform duration-700`}
                   style={{ background: `linear-gradient(to bottom left, ${bluePrimary}05, transparent)` }}></div>
              
              <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-900 ${isMobile ? 'mb-4' : 'mb-6'} relative`}>
                {tabContent[activeTab].title}
                <span className={`absolute -bottom-2 left-0 ${isMobile ? 'w-12 h-0.5' : 'w-16 h-1'} rounded-full`}
                      style={{ background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})` }}></span>
              </h3>
              
              <div className={isMobile ? 'mb-4' : 'mb-6'}>
                <p className={`text-gray-700 ${isMobile ? 'text-base' : 'text-lg'} leading-relaxed ${isMobile ? 'mb-4' : 'mb-6'}`}>
                  {tabContent[activeTab].content}
                </p>
                
                <div className="space-y-3">
                  {tabContent[activeTab].points.map((point, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-3 text-gray-600 transition-all duration-300 hover:translate-x-2 group/item"
                    >
                      <div className="w-2 h-2 rounded-full animate-pulse group-hover/item:scale-150"
                           style={{ background: bluePrimary }}></div>
                      <span className={isMobile ? 'text-sm' : ''}>{point}</span>
                      <FiChevronRight className="opacity-0 group-hover/item:opacity-100 transition-all duration-300"
                                     style={{ color: bluePrimary }} />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={`flex ${isMobile ? 'flex-col gap-4' : 'items-center gap-6'} ${isMobile ? 'mt-6' : 'mt-8'} pt-6 border-t border-gray-100`}>
                <button className={`relative text-white ${isMobile ? 'px-6 py-2.5 text-sm' : isTablet ? 'px-7 py-3' : 'px-8 py-3'} ${isMobile ? 'rounded-lg' : 'rounded-xl'} font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 group/btn overflow-hidden`}
                        style={{ background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})` }}>
                  <span className="relative z-10 flex items-center gap-2">
                    Learn More
                    <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                       style={{ background: `linear-gradient(to right, ${blueSecondary}, ${bluePrimary})` }}></div>
                </button>
                
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`flex items-center gap-3 text-gray-600 hover:text-samsung-blue transition-all duration-300 group/video ${isMobile ? 'justify-center' : ''}`}
                >
                  <div className={`relative ${isMobile ? 'w-12 h-12' : 'w-14 h-14'} rounded-full flex items-center justify-center transition-all duration-300 group-hover/video:scale-110`}
                       style={{ background: `${bluePrimary}20` }}>
                    {isPlaying ? (
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-4 rounded-full animate-pulse"
                             style={{ background: blueSecondary }}></div>
                        <div className="w-1.5 h-4 rounded-full animate-pulse animation-delay-150"
                             style={{ background: blueSecondary }}></div>
                      </div>
                    ) : (
                      <FiPlay className={`${isMobile ? 'text-lg' : 'text-xl'} ml-1`} style={{ color: bluePrimary }} />
                    )}
                    <div className="absolute inset-0 border-2 rounded-full animate-ping-slow"
                         style={{ borderColor: `${bluePrimary}30` }}></div>
                  </div>
                  <div className={isMobile ? 'text-center' : ''}>
                    <div className={`font-semibold ${isMobile ? 'text-sm' : ''}`}>{isPlaying ? 'Pause Story' : 'Our Export Journey'}</div>
                    <div className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-sm'}`}>4:20 min video</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Global Markets Section */}
            <div className={`bg-white ${isMobile ? 'rounded-xl' : 'rounded-2xl'} shadow-xl ${isMobile ? 'p-6' : isTablet ? 'p-6' : 'p-8'} border border-gray-100`}>
              <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-900 ${isMobile ? 'mb-4' : 'mb-6'}`}>Our Global Markets</h3>
              <p className={`text-gray-600 ${isMobile ? 'mb-4' : 'mb-6'} ${isMobile ? 'text-sm' : ''}`}>
                We proudly export to major markets worldwide. Our strong logistics network enables 
                timely and secure deliveries across continents.
              </p>
              
              <div className={`grid ${isMobile ? 'grid-cols-2 gap-3' : 'grid-cols-2 md:grid-cols-3 gap-4'}`}>
                {countries.map((country, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 ${isMobile ? 'p-2' : 'p-3'} rounded-lg hover:bg-gray-50 transition-colors group`}
                  >
                    <div className={`${isMobile ? 'p-1.5' : 'p-2'} rounded-md`} style={{ background: `${country.color}10`, color: country.color }}>
                      {country.icon}
                    </div>
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>
                      {isMobile ? country.name.split('(')[0] : country.name}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  Plus many more emerging markets across Latin America and Eastern Europe
                </p>
              </div>
            </div>
          </div>

          <div className={`space-y-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* Why Choose Us Section */}
            <div className={`bg-white ${isMobile ? 'rounded-xl' : 'rounded-2xl'} shadow-xl ${isMobile ? 'p-6' : isTablet ? 'p-6' : 'p-8'} border border-gray-100`}>
              <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-900 ${isMobile ? 'mb-4' : 'mb-6'}`}>Why Choose Us</h3>
              
              <div className="space-y-4">
                {[
                  "Over 18 years of export experience",
                  "Strong supplier and manufacturing network",
                  "Strict quality control standards",
                  "Competitive pricing",
                  "Reliable shipping and documentation support",
                  "Long-term client relationships across continents"
                ].map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <FiCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <span className={`text-gray-700 ${isMobile ? 'text-sm' : ''}`}>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Grid */}
            {[
              { 
                icon: <FiBriefcase />, 
                title: "Export Experience", 
                desc: "18+ years in international trade with proven track record", 
                metric: "18+ Years",
                progress: 100
              },
              { 
                icon: <FiLayers />, 
                title: "Product Range", 
                desc: "1000+ products across 11 major appliance categories", 
                metric: "1000+ Products",
                progress: 95
              },
              { 
                icon: <FiFileText />, 
                title: "Documentation", 
                desc: "Expert handling of export documentation & compliance", 
                metric: "100% Accuracy",
                progress: 98
              },
              { 
                icon: <FiDollarSign />, 
                title: "Cost Efficiency", 
                desc: "Competitive pricing with transparent cost structure", 
                metric: "Best Value",
                progress: 92
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden"
                data-aos="fade-up"
                data-aos-delay={index * 200}
                data-aos-duration="600"
                data-aos-once="true"
                onMouseEnter={() => setHoveredCard(index + 10)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`relative bg-white ${isMobile ? 'p-4' : isTablet ? 'p-5' : 'p-6'} ${isMobile ? 'rounded-xl' : 'rounded-2xl'} shadow-lg border border-gray-100 hover:shadow-2xl hover:border-transparent transition-all duration-500 transform`}>
                  <div className={`flex ${isMobile ? 'flex-col gap-3' : 'items-start gap-4'}`}>
                    <div className={`relative ${isMobile ? 'p-3 self-start' : 'p-4'} rounded-xl group-hover:scale-110 transition-transform duration-500`}
                         style={{ background: `linear-gradient(135deg, ${bluePrimary}, ${blueSecondary})` }}>
                      <div className="text-white text-xl">{feature.icon}</div>
                    </div>
                    
                    <div className="flex-1">
                      <div className={`flex ${isMobile ? 'flex-col' : 'items-start justify-between'} ${isMobile ? 'mb-3' : 'mb-3'}`}>
                        <div>
                          <h4 className={`${isMobile ? 'text-base font-semibold' : 'text-lg font-bold'} text-gray-900 mb-2 group-hover:text-blue-600 transition-colors`}>
                            {feature.title}
                          </h4>
                          <p className={`text-gray-600 ${isMobile ? 'text-sm' : ''}`}>{feature.desc}</p>
                        </div>
                        <div className={`font-bold ${isMobile ? 'text-lg mt-2' : 'text-xl'}`} style={{ color: bluePrimary }}>
                          {feature.metric}
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-500 mb-1">
                          <span>Performance Score</span>
                          <span>{feature.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-1000"
                            style={{ 
                              width: `${feature.progress}%`,
                              background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})`
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;