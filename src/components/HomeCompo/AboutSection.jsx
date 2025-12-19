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
//   FiPause,
//   FiChevronRight,
//   FiChevronDown,
//   FiZap,
//   FiBarChart2,
//   FiRefreshCw,
//   FiTrendingDown,
//   FiTruck 
// } from 'react-icons/fi';

// const AboutSection = () => {
//   const [activeTab, setActiveTab] = useState('story');
//   const [stats, setStats] = useState([
//     { value: 0, target: 10, label: 'Years in Business', suffix: '+', duration: 2000 },
//     { value: 0, target: 500, label: 'Products Sold', suffix: 'K+', duration: 1500 },
//     { value: 0, target: 50, label: 'Countries Served', suffix: '+', duration: 1800 },
//     { value: 0, target: 98, label: 'Customer Satisfaction', suffix: '%', duration: 1200 }
//   ]);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const [expandedValues, setExpandedValues] = useState(false);

//   const sectionRef = useRef(null);

//   // Intersection Observer for animations
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting) {
//             setIsVisible(true);
//             // Animate counters
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

//   const tabContent = {
//     story: {
//       title: "Our Journey",
//       content: `Founded in 2014, ElectroStore started as a small electronics repair shop with a big dream. Today, we're a global leader in electronics retail, serving customers in over 50 countries.`,
//       points: [
//         "2014: Founded as a small repair shop",
//         "2016: Expanded to online retail",
//         "2018: Launched international shipping",
//         "2020: Awarded 'Best Electronics Retailer'",
//         "2023: Reached 500K+ products sold"
//       ]
//     },
//     mission: {
//       title: "Our Mission",
//       content: `To revolutionize the electronics retail experience by providing cutting-edge technology, unparalleled service, and sustainable solutions.`,
//       points: [
//         "Make technology accessible to everyone",
//         "Maintain highest quality standards",
//         "Educate and inspire through technology",
//         "Support sustainable innovation",
//         "Build lasting customer relationships"
//       ]
//     },
//     values: {
//       title: "Our Values",
//       content: `We operate with integrity, innovation, and excellence at our core, ensuring every customer experience is exceptional.`,
//       points: [
//         "Innovation First",
//         "Customer Centric",
//         "Quality Excellence",
//         "Sustainability",
//         "Integrity",
//         "Community Support"
//       ]
//     }
//   };

//   // Animated progress bars for stats
//   const ProgressBar = ({ percentage, color = "bg-samsung-blue" }) => (
//     <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
//       <div 
//         className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
//         style={{ width: `${percentage}%` }}
//       ></div>
//     </div>
//   );

//   return (
//     <section ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
//       <div className="samsung-container">
//         {/* Header with Animated Title */}
//         <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-samsung-blue/10 to-blue-100 text-samsung-blue rounded-full text-sm font-semibold mb-6 animate-bounce-slow">
//             <FiTarget className="text-lg animate-spin-slow" />
//             ABOUT ELECTROSTORE
//             <FiChevronDown className="text-sm animate-bounce" />
//           </div>
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
//             Redefining <span className="text-samsung-blue relative">
//               Electronics
//               <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-samsung-blue to-blue-400 rounded-full animate-pulse"></span>
//             </span> Retail
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             Where innovation meets excellence. Discover our journey, mission, and values that drive everything we do.
//           </p>
//         </div>

//         {/* Animated Stats Counter with Progress Bars */}
//         <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           {stats.map((stat, index) => (
//             <div 
//               key={index} 
//               className={`bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl hover:border-samsung-blue/30 transition-all duration-500 hover:-translate-y-3 group relative overflow-hidden`}
//               onMouseEnter={() => setHoveredCard(index)}
//               onMouseLeave={() => setHoveredCard(null)}
//             >
//               {/* Animated background effect */}
//               <div className={`absolute inset-0 bg-gradient-to-br from-samsung-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${hoveredCard === index ? 'opacity-100' : ''}`}></div>
              
//               <div className="relative">
//                 <div className="text-5xl md:text-6xl font-bold text-samsung-blue mb-3 transition-all duration-300 group-hover:scale-105">
//                   {stat.value}
//                   <span className="text-3xl">{stat.suffix}</span>
//                 </div>
//                 <p className="text-gray-600 font-medium mb-2">{stat.label}</p>
                
//                 {/* Animated progress bar */}
//                 <div className="mt-4">
//                   <div className="flex justify-between text-sm text-gray-500">
//                     <span>Progress</span>
//                     <span>{Math.round((stat.value / stat.target) * 100)}%</span>
//                   </div>
//                   <ProgressBar percentage={(stat.value / stat.target) * 100} />
//                 </div>
                
//                 {/* Hover effect indicator */}
//                 <div className={`absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}`}></div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid lg:grid-cols-2 gap-12 mb-20">
//           {/* Left Column */}
//           <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
//             {/* Interactive Tabs with Animation */}
//             <div className="bg-white rounded-2xl shadow-xl p-2 inline-flex border border-gray-100 relative overflow-hidden">
//               <div 
//                 className={`absolute h-full bg-samsung-blue rounded-lg transition-all duration-500 ease-in-out ${activeTab === 'story' ? 'w-1/3 left-0' : activeTab === 'mission' ? 'w-1/3 left-1/3' : 'w-1/3 left-2/3'}`}
//               ></div>
              
//               {Object.keys(tabContent).map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`relative px-8 py-4 rounded-lg font-semibold transition-all duration-300 z-10 ${
//                     activeTab === tab
//                       ? 'text-white'
//                       : 'text-gray-600 hover:text-samsung-blue'
//                   }`}
//                 >
//                   {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                 </button>
//               ))}
//             </div>

//             {/* Tab Content with Animated Transition */}
//             <div className="bg-white rounded-2xl shadow-2xl p-8 transition-all duration-500 hover:shadow-2xl border border-gray-100 relative overflow-hidden group">
//               {/* Animated corner accent */}
//               <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-samsung-blue/5 to-transparent rounded-bl-full group-hover:scale-150 transition-transform duration-700"></div>
              
//               <h3 className="text-2xl font-bold text-gray-900 mb-6 relative">
//                 {tabContent[activeTab].title}
//                 <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-samsung-blue to-blue-400 rounded-full"></span>
//               </h3>
              
//               <div className="mb-6">
//                 <p className="text-gray-700 text-lg leading-relaxed mb-6">
//                   {tabContent[activeTab].content}
//                 </p>
                
//                 {/* Animated list points */}
//                 <div className="space-y-3">
//                   {tabContent[activeTab].points.map((point, index) => (
//                     <div 
//                       key={index}
//                       className="flex items-center gap-3 text-gray-600 transition-all duration-300 hover:translate-x-2 hover:text-samsung-blue group/item"
//                     >
//                       <div className="w-2 h-2 bg-samsung-blue rounded-full animate-pulse group-hover/item:scale-150"></div>
//                       <span>{point}</span>
//                       <FiChevronRight className="opacity-0 group-hover/item:opacity-100 transition-all duration-300" />
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               <div className="flex items-center gap-6 mt-8 pt-6 border-t border-gray-100">
//                 <button className="relative bg-gradient-to-r from-samsung-blue to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 group/btn overflow-hidden">
//                   <span className="relative z-10 flex items-center gap-2">
//                     Learn More
//                     <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
//                   </span>
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-samsung-blue opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
//                 </button>
                
//                 <button 
//                   onClick={() => setIsPlaying(!isPlaying)}
//                   className="flex items-center gap-3 text-gray-600 hover:text-samsung-blue transition-all duration-300 group/video"
//                 >
//                   <div className={`relative w-14 h-14 rounded-full ${isPlaying ? 'bg-red-500/20' : 'bg-samsung-blue/20'} flex items-center justify-center transition-all duration-300 group-hover/video:scale-110`}>
//                     {isPlaying ? (
//                       <div className="flex items-center gap-1">
//                         <div className="w-1.5 h-4 bg-red-500 rounded-full animate-pulse"></div>
//                         <div className="w-1.5 h-4 bg-red-500 rounded-full animate-pulse animation-delay-150"></div>
//                       </div>
//                     ) : (
//                       <FiPlay className="text-samsung-blue text-xl ml-1" />
//                     )}
//                     <div className="absolute inset-0 border-2 border-samsung-blue/30 rounded-full animate-ping-slow"></div>
//                   </div>
//                   <div>
//                     <div className="font-semibold">{isPlaying ? 'Pause Story' : 'Play Our Story'}</div>
//                     <div className="text-sm text-gray-500">3:45 min video</div>
//                   </div>
//                 </button>
//               </div>
//             </div>

//             {/* Quality & Quick Stats Grid with Hover Effects */}
//             <div className="grid md:grid-cols-2 gap-6">
//               {/* Quality Assurance Card with Flip Effect */}
//               <div className="relative group perspective-1000">
//                 <div className="relative w-full h-full transition-all duration-700 preserve-3d group-hover:rotate-y-180">
//                   {/* Front */}
//                   <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-samsung-blue to-blue-600 rounded-2xl p-6 text-white overflow-hidden">
//                     <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
//                     <div className="flex items-start gap-4 mb-6 relative">
//                       <FiShield className="text-4xl animate-pulse" />
//                       <div className="flex-1">
//                         <h4 className="text-xl font-bold">Quality Guarantee</h4>
//                         <p className="text-blue-100 text-sm">50+ quality checks per product</p>
//                       </div>
//                     </div>
//                     <div className="space-y-3">
//                       <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm">
//                         <span>Certified Excellence</span>
//                         <FiStar className="text-yellow-300" />
//                       </div>
//                       <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm">
//                         <span>2-Year Warranty</span>
//                         <FiHeart className="text-pink-300" />
//                       </div>
//                     </div>
//                     <div className="mt-6 text-center text-blue-100">
//                       Hover to learn more →
//                     </div>
//                   </div>
                  
//                   {/* Back */}
//                   <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-tr from-blue-600 to-samsung-blue rounded-2xl p-6 text-white">
//                     <h4 className="text-xl font-bold mb-4">Our Quality Process</h4>
//                     <ul className="space-y-2 text-sm">
//                       <li className="flex items-center gap-2">• Advanced testing equipment</li>
//                       <li className="flex items-center gap-2">• ISO 9001 certified</li>
//                       <li className="flex items-center gap-2">• 48-hour burn-in test</li>
//                       <li className="flex items-center gap-2">• Eco-friendly materials</li>
//                     </ul>
//                     <button className="mt-6 w-full bg-white/20 hover:bg-white/30 text-white py-3 rounded-lg font-semibold transition-all duration-300">
//                       View Certifications
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Quick Stats with Animation */}
//               <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-500">
//                 <div className="flex items-center justify-between mb-6">
//                   <h4 className="text-xl font-bold text-gray-900">Quick Stats</h4>
//                   <button 
//                     onClick={() => setExpandedValues(!expandedValues)}
//                     className="text-samsung-blue hover:text-blue-600 transition-colors"
//                   >
//                     {expandedValues ? 'Show Less' : 'Show All'}
//                   </button>
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-4">
//                   {[
//                     { icon: <FiPackage />, value: "24h", label: "Delivery Time", trend: "up" },
//                     { icon: <FiClock />, value: "7/24", label: "Support", trend: "stable" },
//                     { icon: <FiThumbsUp />, value: "99.9%", label: "Uptime", trend: "up" },
//                     { icon: <FiMapPin />, value: "500+", label: "Stores", trend: "up" }
//                   ].map((stat, index) => (
//                     <div 
//                       key={index}
//                       className={`text-center p-4 bg-gray-50 hover:bg-gradient-to-br hover:from-samsung-blue/5 hover:to-blue-50 rounded-xl transition-all duration-300 transform hover:-translate-y-1 group/stat ${expandedValues ? 'scale-105' : ''}`}
//                     >
//                       <div className="relative">
//                         <div className={`text-2xl font-bold text-gray-900 mb-2 transition-colors group-hover/stat:text-samsung-blue ${
//                           expandedValues ? 'text-3xl' : ''
//                         }`}>
//                           {stat.value}
//                         </div>
//                         <div className="text-gray-600 text-sm mb-1">{stat.label}</div>
//                         <div className={`inline-flex items-center gap-1 text-xs font-medium ${
//                           stat.trend === 'up' ? 'text-green-500' : 'text-blue-500'
//                         }`}>
//                           {stat.trend === 'up' ? <FiTrendingUp /> : <FiBarChart2 />}
//                           {stat.trend === 'up' ? '+12%' : 'Stable'}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
                
//                 {/* Animated progress line */}
//                 <div className="mt-6 pt-6 border-t border-gray-100">
//                   <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
//                     <span>Monthly Growth</span>
//                     <span className="font-semibold text-green-500">+15%</span>
//                   </div>
//                   <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//                     <div className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-progress"></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Interactive Feature Cards */}
//           <div className={`space-y-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
//             {/* Feature Cards with Hover Effects */}
//             {[
//               { 
//                 icon: <FiGlobe />, 
//                 title: "Global Presence", 
//                 desc: "Serving customers in 50+ countries with local support centers", 
//                 metric: "50+ Countries",
//                 gradient: "from-blue-500 to-cyan-400",
//                 progress: 92
//               },
//               { 
//                 icon: <FiAward />, 
//                 title: "Award Winning", 
//                 desc: "Multiple industry awards for innovation and customer service", 
//                 metric: "15+ Awards",
//                 gradient: "from-yellow-500 to-amber-400",
//                 progress: 88
//               },
//               { 
//                 icon: <FiUsers />, 
//                 title: "Expert Team", 
//                 desc: "200+ electronics specialists and certified technicians", 
//                 metric: "200+ Experts",
//                 gradient: "from-green-500 to-emerald-400",
//                 progress: 95
//               },
//               { 
//                 icon: <FiTrendingUp />, 
//                 title: "Growth Leader", 
//                 desc: "Fastest growing electronics retailer for 3 consecutive years", 
//                 metric: "300% Growth",
//                 gradient: "from-purple-500 to-pink-400",
//                 progress: 98
//               }
//             ].map((feature, index) => (
//               <div
//                 key={index}
//                 className="group relative overflow-hidden"
//                 onMouseEnter={() => setHoveredCard(index + 10)}
//                 onMouseLeave={() => setHoveredCard(null)}
//               >
//                 {/* Animated background */}
//                 <div className={`absolute inset-0  opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
//                 <div className="relative bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-transparent transition-all duration-500 transform">
//                   <div className="flex items-start gap-4">
//                     {/* Animated icon container */}
//                     <div className={`relative p-4  rounded-xl group-hover:scale-110 transition-transform duration-500`}>
//                       <div className="text-white text-xl">{feature.icon}</div>
//                       <div className="absolute -inset-1  rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
//                     </div>
                    
//                     <div className="flex-1">
//                       <div className="flex items-start justify-between mb-3">
//                         <div>
//                           <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-samsung-blue transition-colors">
//                             {feature.title}
//                           </h4>
//                           <p className="text-gray-600">{feature.desc}</p>
//                         </div>
//                         <div className="text-samsung-blue font-bold text-xl">
//                           {feature.metric}
//                         </div>
//                       </div>
                      
//                       {/* Progress bar */}
//                       <div className="mt-4">
//                         <div className="flex justify-between text-sm text-gray-500 mb-1">
//                           <span>Customer Satisfaction</span>
//                           <span>{feature.progress}%</span>
//                         </div>
//                         <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//                           <div 
//                             className={`h-full bg-gradient-to-r ${feature.gradient} rounded-full transition-all duration-1000`}
//                             style={{ width: `${feature.progress}%` }}
//                           ></div>
//                         </div>
//                       </div>
                      
//                       <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
//                         <button className="text-samsung-blue font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all hover:text-blue-600">
//                           View Details
//                           <FiArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
//                         </button>
//                         <div className="flex items-center gap-2">
//                           <FiCheckCircle className="text-green-500 text-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
//                           <div className="text-xs text-gray-500 group-hover:text-green-500 transition-colors">
//                             Verified
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* Hover indicator */}
//                   <div className={`absolute top-4 right-4 w-2 h-2 bg-gradient-to-r ${feature.gradient} rounded-full animate-ping ${hoveredCard === index + 10 ? 'opacity-100' : 'opacity-0'}`}></div>
//                 </div>
//               </div>
//             ))}

//             {/* Additional Feature Cards with Parallax Effect */}
//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="group relative overflow-hidden rounded-2xl">
//                 <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 transform group-hover:scale-110 transition-transform duration-700"></div>
//                 <div className="relative p-6 text-white">
//                   <div className="flex items-center gap-3 mb-4">
//                     <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:rotate-12 transition-transform duration-300">
//                       <FiShoppingBag className="text-2xl" />
//                     </div>
//                     <div>
//                       <h4 className="text-lg font-bold">Eco-Friendly</h4>
//                       <p className="text-emerald-100 text-sm">Sustainable packaging</p>
//                     </div>
//                   </div>
//                   <p className="text-emerald-100 mb-4">100% recyclable packaging and energy-efficient products</p>
//                   <button className="bg-white text-emerald-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 w-full group/btn">
//                     <span className="flex items-center justify-center gap-2">
//                       Our Sustainability
//                       <FiChevronRight className="group-hover/btn:translate-x-1 transition-transform" />
//                     </span>
//                   </button>
//                 </div>
//               </div>

//               <div className="group relative overflow-hidden rounded-2xl">
//                 <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 transform group-hover:scale-110 transition-transform duration-700"></div>
//                 <div className="relative p-6 text-white">
//                   <div className="flex items-center gap-3 mb-4">
//                     <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:rotate-12 transition-transform duration-300">
//                       <FiPercent className="text-2xl" />
//                     </div>
//                     <div>
//                       <h4 className="text-lg font-bold">Best Price</h4>
//                       <p className="text-amber-100 text-sm">Guaranteed lowest</p>
//                     </div>
//                   </div>
//                   <p className="text-amber-100 mb-4">Price match guarantee on all products for 30 days</p>
//                   <button className="bg-white text-amber-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 w-full group/btn">
//                     <span className="flex items-center justify-center gap-2">
//                       Price Match
//                       <FiChevronRight className="group-hover/btn:translate-x-1 transition-transform" />
//                     </span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Interactive CTA Section */}
//         {/* <div className={`mt-20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           <div className="relative bg-gradient-to-r from-samsung-blue via-blue-600 to-samsung-blue rounded-3xl p-12 text-white overflow-hidden">
           
//             <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
//             <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 animate-pulse-slow animation-delay-1000"></div>
            
//             <div className="relative z-10 text-center">
//               <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
//                 <FiZap className="text-lg animate-pulse" />
//                 LIMITED TIME OFFER
//               </div>
              
//               <h3 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
//                 Experience the <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">ElectroStore Difference</span>
//               </h3>
              
//               <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
//                 Join millions of satisfied customers who trust us for quality electronics, expert support, and unbeatable service.
//               </p>
              
//               <div className="flex flex-col sm:flex-row gap-6 justify-center">
//                 <button className="relative bg-white text-samsung-blue px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group/cta overflow-hidden">
//                   <span className="relative z-10">Shop Electronics Now</span>
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300"></div>
//                   <div className="absolute -inset-1 bg-gradient-to-r from-samsung-blue to-blue-600 rounded-xl blur opacity-0 group-hover/cta:opacity-50 transition-opacity duration-300"></div>
//                 </button>
                
//                 <button className="relative bg-transparent border-2 border-white/50 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white transition-all duration-300 transform hover:scale-105 group/contact backdrop-blur-sm">
//                   <span className="relative z-10 flex items-center justify-center gap-2">
//                     Contact Our Experts
//                     <FiChevronRight className="group-hover/contact:translate-x-1 transition-transform" />
//                   </span>
//                   <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/contact:opacity-100 transition-opacity duration-300"></div>
//                 </button>
//               </div>
              
//               <div className="mt-8 text-blue-100 text-sm flex items-center justify-center gap-6">
//                 <span className="flex items-center gap-2">
//                   <FiCheckCircle className="text-green-300" />
//                   30-Day Return Policy
//                 </span>
//                 <span className="flex items-center gap-2">
//                   <FiShield className="text-blue-200" />
//                   Secure Payment
//                 </span>
//                 <span className="flex items-center gap-2">
//                   <FiTruck className="text-cyan-200" />
//                   Free Shipping
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div> */}
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
  FiTruck 
} from 'react-icons/fi';

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('story');
  const [stats, setStats] = useState([
    { value: 0, target: 10, label: 'Years in Business', suffix: '+', duration: 2000 },
    { value: 0, target: 500, label: 'Products Sold', suffix: 'K+', duration: 1500 },
    { value: 0, target: 50, label: 'Countries Served', suffix: '+', duration: 1800 },
    { value: 0, target: 98, label: 'Customer Satisfaction', suffix: '%', duration: 1200 }
  ]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [expandedValues, setExpandedValues] = useState(false);

  const sectionRef = useRef(null);

  const bluePrimary = 'rgb(0, 42, 100)';
  const blueSecondary = 'rgb(0, 61, 130)';
  const blueDark = 'rgb(0, 18, 36)';

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

  const tabContent = {
    story: {
      title: "Our Journey",
      content: `Founded in 2014, ElectroStore started as a small electronics repair shop with a big dream. Today, we're a global leader in electronics retail, serving customers in over 50 countries.`,
      points: [
        "2014: Founded as a small repair shop",
        "2016: Expanded to online retail",
        "2018: Launched international shipping",
        "2020: Awarded 'Best Electronics Retailer'",
        "2023: Reached 500K+ products sold"
      ]
    },
    mission: {
      title: "Our Mission",
      content: `To revolutionize the electronics retail experience by providing cutting-edge technology, unparalleled service, and sustainable solutions.`,
      points: [
        "Make technology accessible to everyone",
        "Maintain highest quality standards",
        "Educate and inspire through technology",
        "Support sustainable innovation",
        "Build lasting customer relationships"
      ]
    },
    values: {
      title: "Our Values",
      content: `We operate with integrity, innovation, and excellence at our core, ensuring every customer experience is exceptional.`,
      points: [
        "Innovation First",
        "Customer Centric",
        "Quality Excellence",
        "Sustainability",
        "Integrity",
        "Community Support"
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
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="samsung-container">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold mb-6 animate-bounce-slow"
            style={{ 
              background: `linear-gradient(135deg, ${bluePrimary}10, ${blueSecondary}20)`,
              color: bluePrimary
            }}
          >
            <FiTarget className="text-lg animate-spin-slow" />
            ABOUT ELECTROSTORE
            <FiChevronDown className="text-sm animate-bounce" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Redefining <span className="relative" style={{ color: bluePrimary }}>
              Electronics
              <span className="absolute -bottom-2 left-0 w-full h-1 rounded-full animate-pulse"
                    style={{ background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})` }}></span>
            </span> Retail
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Where innovation meets excellence. Discover our journey, mission, and values that drive everything we do.
          </p>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group relative overflow-hidden`}
              style={{ borderColor: hoveredCard === index ? `${bluePrimary}30` : '#f3f4f6' }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${hoveredCard === index ? 'opacity-100' : ''}`}
                   style={{ background: `linear-gradient(to bottom right, ${bluePrimary}05, transparent)` }}></div>
              
              <div className="relative">
                <div className="text-5xl md:text-6xl font-bold mb-3 transition-all duration-300 group-hover:scale-105"
                     style={{ color: bluePrimary }}>
                  {stat.value}
                  <span className="text-3xl">{stat.suffix}</span>
                </div>
                <p className="text-gray-600 font-medium mb-2">{stat.label}</p>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Progress</span>
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

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="bg-white rounded-2xl shadow-xl p-2 inline-flex border border-gray-100 relative overflow-hidden">
              <div 
                className={`absolute h-full rounded-lg transition-all duration-500 ease-in-out ${activeTab === 'story' ? 'w-1/3 left-0' : activeTab === 'mission' ? 'w-1/3 left-1/3' : 'w-1/3 left-2/3'}`}
                style={{ background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})` }}
              ></div>
              
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-8 py-4 rounded-lg font-semibold transition-all duration-300 z-10 ${
                    activeTab === tab
                      ? 'text-white'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                  style={activeTab === tab ? { color: 'white' } : { color: 'gray' }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-2xl p-8 transition-all duration-500 hover:shadow-2xl border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full group-hover:scale-150 transition-transform duration-700"
                   style={{ background: `linear-gradient(to bottom left, ${bluePrimary}05, transparent)` }}></div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-6 relative">
                {tabContent[activeTab].title}
                <span className="absolute -bottom-2 left-0 w-16 h-1 rounded-full"
                      style={{ background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})` }}></span>
              </h3>
              
              <div className="mb-6">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
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
                      <span>{point}</span>
                      <FiChevronRight className="opacity-0 group-hover/item:opacity-100 transition-all duration-300"
                                     style={{ color: bluePrimary }} />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-6 mt-8 pt-6 border-t border-gray-100">
                <button className="relative text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 group/btn overflow-hidden"
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
                  className="flex items-center gap-3 text-gray-600 hover:text-samsung-blue transition-all duration-300 group/video"
                >
                  <div className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover/video:scale-110`}
                       style={{ background: `${bluePrimary}20` }}>
                    {isPlaying ? (
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-4 rounded-full animate-pulse"
                             style={{ background: blueSecondary }}></div>
                        <div className="w-1.5 h-4 rounded-full animate-pulse animation-delay-150"
                             style={{ background: blueSecondary }}></div>
                      </div>
                    ) : (
                      <FiPlay className="text-xl ml-1" style={{ color: bluePrimary }} />
                    )}
                    <div className="absolute inset-0 border-2 rounded-full animate-ping-slow"
                         style={{ borderColor: `${bluePrimary}30` }}></div>
                  </div>
                  <div>
                    <div className="font-semibold">{isPlaying ? 'Pause Story' : 'Play Our Story'}</div>
                    <div className="text-sm text-gray-500">3:45 min video</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative group perspective-1000">
                <div className="relative w-full h-full transition-all duration-700 preserve-3d group-hover:rotate-y-180">
                  <div className="absolute inset-0 backface-hidden rounded-2xl p-6 text-white overflow-hidden"
                       style={{ background: `linear-gradient(to bottom right, ${bluePrimary}, ${blueSecondary})` }}>
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
                    <div className="flex items-start gap-4 mb-6 relative">
                      <FiShield className="text-4xl animate-pulse" />
                      <div className="flex-1">
                        <h4 className="text-xl font-bold">Quality Guarantee</h4>
                        <p className="text-blue-100 text-sm">50+ quality checks per product</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                        <span>Certified Excellence</span>
                        <FiStar className="text-yellow-300" />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                        <span>2-Year Warranty</span>
                        <FiHeart className="text-pink-300" />
                      </div>
                    </div>
                    <div className="mt-6 text-center text-blue-100">
                      Hover to learn more →
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl p-6 text-white"
                       style={{ background: `linear-gradient(to top right, ${blueSecondary}, ${bluePrimary})` }}>
                    <h4 className="text-xl font-bold mb-4">Our Quality Process</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">• Advanced testing equipment</li>
                      <li className="flex items-center gap-2">• ISO 9001 certified</li>
                      <li className="flex items-center gap-2">• 48-hour burn-in test</li>
                      <li className="flex items-center gap-2">• Eco-friendly materials</li>
                    </ul>
                    <button className="mt-6 w-full bg-white/20 hover:bg-white/30 text-white py-3 rounded-lg font-semibold transition-all duration-300">
                      View Certifications
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xl font-bold text-gray-900">Quick Stats</h4>
                  <button 
                    onClick={() => setExpandedValues(!expandedValues)}
                    className="hover:text-blue-600 transition-colors"
                    style={{ color: bluePrimary }}
                  >
                    {expandedValues ? 'Show Less' : 'Show All'}
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: <FiPackage />, value: "24h", label: "Delivery Time", trend: "up" },
                    { icon: <FiClock />, value: "7/24", label: "Support", trend: "stable" },
                    { icon: <FiThumbsUp />, value: "99.9%", label: "Uptime", trend: "up" },
                    { icon: <FiMapPin />, value: "500+", label: "Stores", trend: "up" }
                  ].map((stat, index) => (
                    <div 
                      key={index}
                      className={`text-center p-4 bg-gray-50 hover:bg-gradient-to-br rounded-xl transition-all duration-300 transform hover:-translate-y-1 group/stat ${expandedValues ? 'scale-105' : ''}`}
                      style={{ '--tw-gradient-from': `${bluePrimary}05 var(--tw-gradient-from-position)`, '--tw-gradient-to': `${blueSecondary}20 var(--tw-gradient-to-position)` }}
                    >
                      <div className="relative">
                        <div className={`text-2xl font-bold mb-2 transition-colors group-hover/stat:text-samsung-blue ${
                          expandedValues ? 'text-3xl' : ''
                        }`}
                        style={{ color: bluePrimary }}>
                          {stat.value}
                        </div>
                        <div className="text-gray-600 text-sm mb-1">{stat.label}</div>
                        <div className={`inline-flex items-center gap-1 text-xs font-medium ${
                          stat.trend === 'up' ? 'text-green-500' : 'text-blue-500'
                        }`}>
                          {stat.trend === 'up' ? <FiTrendingUp /> : <FiBarChart2 />}
                          {stat.trend === 'up' ? '+12%' : 'Stable'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Monthly Growth</span>
                    <span className="font-semibold text-green-500">+15%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full animate-progress"
                         style={{ background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`space-y-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {[
              { 
                icon: <FiGlobe />, 
                title: "Global Presence", 
                desc: "Serving customers in 50+ countries with local support centers", 
                metric: "50+ Countries",
                progress: 92
              },
              { 
                icon: <FiAward />, 
                title: "Award Winning", 
                desc: "Multiple industry awards for innovation and customer service", 
                metric: "15+ Awards",
                progress: 88
              },
              { 
                icon: <FiUsers />, 
                title: "Expert Team", 
                desc: "200+ electronics specialists and certified technicians", 
                metric: "200+ Experts",
                progress: 95
              },
              { 
                icon: <FiTrendingUp />, 
                title: "Growth Leader", 
                desc: "Fastest growing electronics retailer for 3 consecutive years", 
                metric: "300% Growth",
                progress: 98
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden"
                onMouseEnter={() => setHoveredCard(index + 10)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                     style={{ background: `linear-gradient(135deg, ${bluePrimary}, ${blueSecondary})` }}></div>
                
                <div className="relative bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-transparent transition-all duration-500 transform">
                  <div className="flex items-start gap-4">
                    <div className={`relative p-4 rounded-xl group-hover:scale-110 transition-transform duration-500`}
                         style={{ background: `linear-gradient(135deg, ${bluePrimary}, ${blueSecondary})` }}>
                      <div className="text-white text-xl">{feature.icon}</div>
                      <div className="absolute -inset-1 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                           style={{ background: `linear-gradient(135deg, ${bluePrimary}, ${blueSecondary})` }}></div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {feature.title}
                          </h4>
                          <p className="text-gray-600">{feature.desc}</p>
                        </div>
                        <div className="font-bold text-xl" style={{ color: bluePrimary }}>
                          {feature.metric}
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-500 mb-1">
                          <span>Customer Satisfaction</span>
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
                      
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <button className="font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all hover:text-blue-600"
                                style={{ color: bluePrimary }}>
                          View Details
                          <FiArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                        </button>
                        <div className="flex items-center gap-2">
                          <FiCheckCircle className="text-green-500 text-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                          <div className="text-xs text-gray-500 group-hover:text-green-500 transition-colors">
                            Verified
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`absolute top-4 right-4 w-2 h-2 rounded-full animate-ping ${hoveredCard === index + 10 ? 'opacity-100' : 'opacity-0'}`}
                       style={{ background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})` }}></div>
                </div>
              </div>
            ))}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="group relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0 transform group-hover:scale-110 transition-transform duration-700"
                     style={{ background: `linear-gradient(to bottom right, ${bluePrimary}, ${blueSecondary})` }}></div>
                <div className="relative p-6 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:rotate-12 transition-transform duration-300">
                      <FiShoppingBag className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">Eco-Friendly</h4>
                      <p className="text-blue-100 text-sm">Sustainable packaging</p>
                    </div>
                  </div>
                  <p className="text-blue-100 mb-4">100% recyclable packaging and energy-efficient products</p>
                  <button className="bg-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 w-full group/btn"
                          style={{ color: bluePrimary }}>
                    <span className="flex items-center justify-center gap-2">
                      Our Sustainability
                      <FiChevronRight className="group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0 transform group-hover:scale-110 transition-transform duration-700"
                     style={{ background: `linear-gradient(to bottom right, ${blueSecondary}, ${blueDark})` }}></div>
                <div className="relative p-6 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:rotate-12 transition-transform duration-300">
                      <FiPercent className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">Best Price</h4>
                      <p className="text-blue-100 text-sm">Guaranteed lowest</p>
                    </div>
                  </div>
                  <p className="text-blue-100 mb-4">Price match guarantee on all products for 30 days</p>
                  <button className="bg-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 w-full group/btn"
                          style={{ color: blueSecondary }}>
                    <span className="flex items-center justify-center gap-2">
                      Price Match
                      <FiChevronRight className="group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
