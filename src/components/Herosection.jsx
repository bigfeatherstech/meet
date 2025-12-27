
// import React, { useState, useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
// import { FiChevronLeft, FiChevronRight, FiShoppingBag, FiTruck, FiShield, FiTag, FiClock, FiStar, FiCheck, FiZap } from 'react-icons/fi';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/effect-fade';
// import { useNavigate } from 'react-router-dom';

// const HeroSection = () => {
//   const [activeSlide, setActiveSlide] = useState(0);

//   const bluePrimary = 'rgb(0, 42, 100)';
//   const blueSecondary = 'rgb(0, 61, 130)';
//   const blueDark = 'rgb(0, 18, 36)';

//   //new 
//   const navigate = useNavigate();

//   const heroSlides = [
//     {
//       id: 1,
//       title: "Galaxy S24 Ultra",
//       subtitle: "AI-Powered Professional Photography",
//       description: "Trade-in your old device and get up to $300 credit. Experience revolutionary 200MP camera with advanced AI processing.",
//       image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
//       gradient: `linear-gradient(135deg, ${blueDark} 0%, ${bluePrimary} 50%, ${blueSecondary} 100%)`,
//       overlayGradient: `linear-gradient(to right, ${blueDark} 30%, transparent 70%)`,
//       buttonText: "Pre-order Now",
//       badge: "NEW ARRIVAL",
//       badgeColor: `linear-gradient(135deg, ${blueSecondary}, ${bluePrimary})`,
//       features: ["AI Camera System", "Titanium Frame", "S Pen Included", "7 Years OS Updates"],
//       price: "From $1,199.99",
//       rating: 4.8,
//       highlight: "Exclusive Deal"
//     },
//     {
//       id: 2,
//       title: "Neo QLED 8K TV",
//       subtitle: "Cinema Experience at Home",
//       description: "Quantum Matrix Technology with 14-bit HDR. Immerse yourself in true 8K resolution with Object Tracking Sound.",
//       image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
//       gradient: `linear-gradient(135deg, ${bluePrimary} 0%, ${blueDark} 30%, ${blueSecondary} 100%)`,
//       overlayGradient: `linear-gradient(to right, ${bluePrimary} 20%, transparent 80%)`,
//       buttonText: "Explore TV",
//       badge: "BEST SELLER",
//       badgeColor: `linear-gradient(135deg, ${blueSecondary}, ${bluePrimary})`,
//       features: ["True 8K Resolution", "Quantum HDR 2000", "Object Tracking Sound+", "Smart Hub"],
//       price: "From $2,499.99",
//       rating: 4.9,
//       highlight: "Limited Stock"
//     },
//     {
//       id: 3,
//       title: "Bespoke Refrigerator",
//       subtitle: "Custom Luxury Kitchen",
//       description: "Modular design with AI Family Hub. SpaceMax Technology keeps food fresh 30% longer with precise temperature control.",
//       image: "https://images.unsplash.com/photo-1585730061512-1c8f63e5bc0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
//       gradient: `linear-gradient(135deg, rgba(0, 42, 100, 0.95) 0%, rgba(0, 61, 130, 0.9) 50%, rgba(0, 18, 36, 0.85) 100%)`,
//       overlayGradient: `linear-gradient(to right, rgba(0, 42, 100, 0.85) 30%, transparent 70%)`,
//       buttonText: "Design Yours",
//       badge: "SMART HOME",
//       badgeColor: `linear-gradient(135deg, ${blueSecondary}, ${bluePrimary})`,
//       features: ["Customizable Panels", "AI Family Hub", "Twin Cooling Plus", "21\" Touch Screen"],
//       price: "From $3,499.99",
//       rating: 4.7,
//       highlight: "Custom Design"
//     },
//     {
//       id: 4,
//       title: "Galaxy Book4 Pro",
//       subtitle: "AI-Enhanced Productivity",
//       description: "Intel® Core™ Ultra 7 processor with AI Boost. 3K Dynamic AMOLED 2X display for stunning color accuracy.",
//       image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
//       gradient: `linear-gradient(135deg, ${blueDark} 0%, ${bluePrimary} 40%, ${blueSecondary} 100%)`,
//       overlayGradient: `linear-gradient(to right, ${blueDark} 25%, transparent 75%)`,
//       buttonText: "Shop Laptops",
//       badge: "ULTRA PERFORMANCE",
//       badgeColor: `linear-gradient(135deg, ${blueSecondary}, ${bluePrimary})`,
//       features: ["3K AMOLED 2X", "Intel Core Ultra 7", "32GB LPDDR5X", "1TB NVMe SSD"],
//       price: "From $1,599.99",
//       rating: 4.8,
//       highlight: "New Release"
//     }
//   ];

//   const features = [
//     {
//       icon: <FiTruck className="text-2xl" />,
//       title: "Free Shipping",
//       desc: "On all orders over $499",
//       bgColor: `rgba(0, 42, 100, 0.1)`,
//       iconColor: blueSecondary,
//       borderColor: `rgba(0, 61, 130, 0.2)`
//     },
//     {
//       icon: <FiShield className="text-2xl" />,
//       title: "3-Year Warranty",
//       desc: "Premium protection plan",
//       bgColor: `rgba(0, 61, 130, 0.1)`,
//       iconColor: blueSecondary,
//       borderColor: `rgba(0, 61, 130, 0.3)`
//     },
//     {
//       icon: <FiTag className="text-2xl" />,
//       title: "Best Price",
//       desc: "Price match guarantee",
//       bgColor: `rgba(0, 18, 36, 0.1)`,
//       iconColor: bluePrimary,
//       borderColor: `rgba(0, 42, 100, 0.2)`
//     },
//     {
//       icon: <FiClock className="text-2xl" />,
//       title: "Fast Delivery",
//       desc: "1-2 day express shipping",
//       bgColor: `rgba(0, 42, 100, 0.08)`,
//       iconColor: blueSecondary,
//       borderColor: `rgba(0, 61, 130, 0.25)`
//     }
//   ];

//   return (
//     <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
//       {/* Main Hero Slider */}
//       <div className="relative h-[85vh] max-h-[900px] min-h-[600px]">
//         <Swiper
//           modules={[Navigation, Pagination, Autoplay, EffectFade]}
//           spaceBetween={0}
//           slidesPerView={1}
//           navigation={{
//             nextEl: '.swiper-button-next',
//             prevEl: '.swiper-button-prev',
//           }}
//           // pagination={{
//           //   clickable: true,
//           //   el: '.swiper-pagination',
//           //   renderBullet: (index, className) => {
//           //     return `<span class="${className} !w-3 !h-3 !bg-white/70 hover:!bg-white !opacity-100 !mx-2 !transition-all !duration-300"></span>`;
//           //   },
//           // }}
//           autoplay={{
//             delay: 6000,
//             disableOnInteraction: false,
//           }}
//           effect="fade"
//           fadeEffect={{ crossFade: true }}
//           speed={1200}
//           loop={true}
//           onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
//           className="h-full"
//         >
//           {heroSlides.map((slide) => (
//             <SwiperSlide key={slide.id}>
//               <div className="relative h-full w-full">
//                 <div
//                   className="absolute inset-0 bg-cover bg-center"
//                   style={{
//                     backgroundImage: `url(${slide.image})`,
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center'
//                   }}
//                 >
//                   <div
//                     className="absolute inset-0"
//                     style={{ background: slide.gradient, opacity: 0.92 }}
//                   />
//                   <div
//                     className="absolute inset-0"
//                     style={{ background: slide.overlayGradient }}
//                   />
//                 </div>

//                 <div className="relative h-full flex items-center">
//                   <div className="container mx-auto px-4 lg:px-8">
//                     <div className="max-w-2xl ml-0 lg:ml-8 xl:ml-16">
//                       <div className="inline-flex items-center gap-3 mb-8">
//                         <div
//                           className="px-5 py-2.5 rounded-full backdrop-blur-sm shadow-lg"
//                           style={{ background: slide.badgeColor }}
//                         >
//                           <span className="text-white font-bold text-sm tracking-wider uppercase">
//                             {slide.badge}
//                           </span>
//                         </div>
//                         <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
//                           <span className="text-white font-medium text-sm flex items-center gap-1">
//                             <FiZap className="w-4 h-4" />
//                             {slide.highlight}
//                           </span>
//                         </div>
//                       </div>

//                       <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight tracking-tight">
//                         {slide.title}
//                       </h1>
//                       <h2 className="text-2xl md:text-3xl text-white/95 mb-6 font-light tracking-wide">
//                         {slide.subtitle}
//                       </h2>
//                       <p className="text-lg text-white/90 mb-8 max-w-xl leading-relaxed">
//                         {slide.description}
//                       </p>

//                       <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
//                         <div className="flex items-center gap-4">
//                           <span className="text-3xl font-bold text-white">{slide.price}</span>
//                           <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm font-medium">
//                             Save $200
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-3">
//                           <div className="flex">
//                             {[...Array(5)].map((_, i) => (
//                               <FiStar key={i} className={`w-5 h-5 ${i < Math.floor(slide.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
//                             ))}
//                           </div>
//                           <span className="text-white/90">({slide.rating}/5) • 1,247 reviews</span>
//                         </div>
//                       </div>

//                       <div className="flex flex-wrap gap-3 mb-10">
//                         {slide.features.map((feature, index) => (
//                           <div
//                             key={index}
//                             className="px-4 py-3 bg-white/15 backdrop-blur-sm rounded-lg border border-white/25 hover:bg-white/25 transition-all duration-300 hover:scale-105 flex items-center gap-2"
//                           >
//                             <FiCheck className="w-4 h-4 text-white/80" />
//                             <span className="text-white font-medium text-sm tracking-wide">{feature}</span>
//                           </div>
//                         ))}
//                       </div>

//                       <div className="flex flex-col sm:flex-row gap-4">
//                         <button className="bg-white text-gray-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3 group relative overflow-hidden">
//                           <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
//                           <FiShoppingBag className="relative z-10 group-hover:scale-110 transition-transform" />
//                           <span className="relative z-10">{slide.buttonText}</span>
//                         </button>
//                         <button className="bg-transparent border-2 border-white/40 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/15 hover:border-white/60 transition-all duration-300 backdrop-blur-sm">
//                           View Specifications
//                         </button>
//                       </div>

//                       <div className="mt-8 flex items-center gap-6 text-white/80 text-sm">
//                         <div className="flex items-center gap-2">
//                           <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                           <span>In Stock • Ships Today</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <FiCheck className="w-4 h-4" />
//                           <span>Free 2-Day Delivery</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}

//           <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
//             <button className="swiper-button-prev !static !m-0 !w-14 !h-14 !bg-white/25 !backdrop-blur-lg !rounded-full !flex !items-center !justify-center hover:!bg-white/40 hover:!scale-110 !transition-all !duration-300 pointer-events-auto shadow-2xl border border-white/20">
//               <FiChevronLeft className="text-white text-3xl" />
//             </button>
//             <button className="swiper-button-next !static !m-0 !w-14 !h-14 !bg-white/25 !backdrop-blur-lg !rounded-full !flex !items-center !justify-center hover:!bg-white/40 hover:!scale-110 !transition-all !duration-300 pointer-events-auto shadow-2xl border border-white/20">
//               <FiChevronRight className="text-white text-3xl" />
//             </button>
//           </div>

//           <div className="swiper-pagination !bottom-12 !flex !justify-center !gap-3" />
//         </Swiper>

//         <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 hidden lg:flex items-center gap-3 z-20">
//           {heroSlides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => {
//                 document.querySelector('.swiper').swiper.slideTo(index);
//               }}
//               className={`transition-all duration-500 ease-out ${activeSlide === index
//                 ? 'w-10 h-2 rounded-full shadow-lg'
//                 : 'w-2 h-2 rounded-full hover:bg-white/80 hover:scale-125'
//                 }`}
//               style={{
//                 background: activeSlide === index
//                   ? `linear-gradient(to right, ${blueSecondary}, white)`
//                   : 'rgba(255, 255, 255, 0.5)'
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       <div className="mt-12 container mx-auto px-4 lg:px-8">
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//           <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="group p-8 hover:bg-gray-50 transition-all duration-300 cursor-pointer relative"
//                 data-aos="fade-up"
//                 data-aos-delay={index * 200} // Stagger delay: 0ms, 100ms, 200ms, 300ms
//                 data-aos-duration="600"
//                 data-aos-once="true"
//                 style={{ borderRight: index < features.length - 1 ? '1px solid #f3f4f6' : 'none' }}
//               >
//                 <div className="flex items-center gap-5">
//                   <div
//                     className="p-4 rounded-2xl shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 border"

//                     style={{
//                       backgroundColor: feature.bgColor,
//                       borderColor: feature.borderColor
//                     }}
//                   >
//                     <div style={{ color: feature.iconColor }}>
//                       {feature.icon}
//                     </div>
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-gray-900 text-lg mb-1">{feature.title}</h3>
//                     <p className="text-gray-600 text-sm">{feature.desc}</p>
//                   </div>
//                 </div>
//                 <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-4/5 h-0.5 transition-all duration-300"
//                   style={{ background: `linear-gradient(to right, transparent, ${blueSecondary}, transparent)` }}>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="mt-16 container mx-auto px-4 lg:px-8"   data-aos="fade-up"  data-aos-delay="300">
//         <div className="relative rounded-2xl shadow-2xl">
//           <div
//             className="absolute inset-0 rounded-2xl"
//             style={{
//               background: `linear-gradient(135deg, ${blueDark} 0%, ${bluePrimary} 50%, ${blueSecondary} 100%)`
//             }}
//           ></div>

//           <div className="absolute inset-0 opacity-30">
//             <div className="absolute inset-0" style={{
//               background: `linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)`,
//               animation: 'shimmer 3s infinite'
//             }}></div>
//           </div>

//           <div className="relative  z-10 p-10 lg:p-14">
//             {/* Robot Peek Image */}
//             <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
//               <div className="hidden xl:block absolute left-[-8%] top-1/2 -translate-y-1/2 z-999 pointer-events-none">
//                 <img
//                   src="/png/peak.png"
//                   alt="AI Robot"
//                   className="w-[340px] -translate-x-1/3"
//                   loading='lazy'
//                 />
//               </div>
//               <div className="flex-1">
//                 <div
//                   className="inline-flex items-center px-4 py-2 rounded-full backdrop-blur-sm mb-6 border"
//                   style={{
//                     background: `linear-gradient(135deg, ${blueSecondary}, ${bluePrimary})`,
//                     borderColor: 'rgba(255, 255, 255, 0.2)'
//                   }}
//                 >
//                   <span className="text-white font-bold text-sm tracking-wider uppercase">BLACK FRIDAY SALE</span>
//                 </div>
//                 <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
//                   Year End Clearance
//                   <span className="block text-5xl lg:text-6xl bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
//                     Up to 60% OFF
//                   </span>
//                 </h3>
//                 <p className="text-blue-100 text-xl mb-8 max-w-2xl">
//                   Premium electronics at unprecedented prices. Limited quantities available.
//                 </p>

//                 <div className="flex items-center gap-4">
//                   {[
//                     { value: '12', label: 'Days', color: blueSecondary },
//                     { value: '23', label: 'Hours', color: bluePrimary },
//                     { value: '45', label: 'Minutes', color: blueSecondary },
//                     { value: '59', label: 'Seconds', color: bluePrimary }
//                   ].map((time, index) => (
//                     <div key={index} className="text-center">
//                       <div
//                         className="backdrop-blur-lg rounded-xl p-4 min-w-20 border"
//                         style={{
//                           backgroundColor: 'rgba(255, 255, 255, 0.15)',
//                           borderColor: 'rgba(255, 255, 255, 0.2)'
//                         }}
//                       >
//                         <span className="text-white font-bold text-3xl block">{time.value}</span>
//                         <span className="text-blue-200 text-sm">{time.label}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="flex flex-col items-center gap-6">
//                 <button className="bg-white text-gray-900 px-12 py-5 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl group relative overflow-hidden">
//                   <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
//                   <span className="relative z-10 flex items-center gap-3">
//                     Shop All Deals
//                     <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                     </svg>
//                   </span>
//                 </button>
//                 <div className="text-center">
//                   <p className="text-blue-200 text-sm mb-2">
//                     <FiCheck className="inline w-4 h-4 mr-2" />
//                     Free express shipping on all orders
//                   </p>
//                   <p className="text-blue-200 text-sm">
//                     <FiCheck className="inline w-4 h-4 mr-2" />
//                     30-day return policy • Price match guarantee
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//     <div className="mt-20 container mx-auto px-4 lg:px-8">
//   <div className="text-center mb-12" data-aos="fade-down" data-aos-delay="200">
//     <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
//       Shop by Category
//     </h2>
//     <p className="text-gray-600 text-xl max-w-3xl mx-auto">
//       Discover our premium electronics collection across all categories
//     </p>
//   </div>

//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//     {[
//       {
//         name: 'Kitchen Appliances',
//         count: '125+ Products',
//         image: '/png/KITCHEN2.png',
//         highlight: 'New Models',
//         id: 'Kitchen Appliances'
//       },
//       {
//         name: 'Large Appliances',
//         count: '89+ Products',
//         image: '/png/LARGE.png',
//         highlight: 'Premium Range',
//         id: 'Large Appliances'
//       },
//       {
//         name: 'Personal Care Appliances',
//         count: '67+ Products',
//         image: '/png/PERSNOL.png',
//         highlight: 'Smart Tech',
//         id: 'Personal Care Appliances'
//       },
//       {
//         name: 'Home Appliances',
//         count: '142+ Products',
//         image: '/png/home1.png',
//         highlight: 'Energy Efficient',
//         id: 'Home Appliances'
//       }
//     ].map((category, index) => (
//       <div
//         key={index}
//         className="relative overflow-hidden rounded-2xl p-8 transition-all duration-500 hover:scale-[1.02] cursor-pointer group border border-gray-200 hover:border-gray-300"
//         data-aos="fade-up"
//         data-aos-delay={index * 200}
//         data-aos-duration="600"
//         data-aos-once="true"
//         onClick={() => navigate('/products', { 
//           state: { selectedCategory: category.id } 
//         })}
//         style={{
//           background: `linear-gradient(135deg, rgba(0, 42, 100, 0.05) 0%, rgba(0, 61, 130, 0.08) 100%)`
//         }}
//       >
//         <div className="relative z-10">
//           <div className="mb-6">
//             <img
//               src={category.image}
//               alt={category.name}
//               className="w-99 h-auto object-contain"
//             />
//           </div>
//           <h3 className="text-2xl font-bold text-gray-900 mb-3">
//             {category.name}
//           </h3>
//           <div className="flex items-center justify-between mb-6">
//             <p className="text-gray-700">{category.count}</p>
//             <span className="px-3 py-1 rounded-full text-sm font-medium"
//               style={{
//                 backgroundColor: `rgba(0, 61, 130, 0.1)`,
//                 color: blueSecondary
//               }}>
//               {category.highlight}
//             </span>
//           </div>
//           <div className="text-gray-900 font-bold text-lg flex items-center gap-3 group-hover:gap-5 transition-all duration-300">
//             <span>Browse Collection</span>
//             <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//             </svg>
//           </div>
//         </div>

//         <div className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//           style={{
//             background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})`
//           }}>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>

//       <style jsx>{`
//         @keyframes shimmer {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(100%); }
//         }
//         .animate-shimmer {
//           animation: shimmer 2s infinite;
//         }
        
//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.5; }
//         }
//         .animate-pulse {
//           animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default HeroSection;













import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight, FiShoppingBag, FiTruck, FiShield, FiTag, FiClock, FiStar, FiCheck, FiZap } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const bluePrimary = 'rgb(0, 42, 100)';
  const blueSecondary = 'rgb(0, 61, 130)';
  const blueDark = 'rgb(0, 18, 36)';

  const navigate = useNavigate();

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

  const heroSlides = [
    {
      id: 1,
      title: "Galaxy S24 Ultra",
      subtitle: "AI-Powered Professional Photography",
      description: "Trade-in your old device and get up to $300 credit. Experience revolutionary 200MP camera with advanced AI processing.",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      gradient: `linear-gradient(135deg, ${blueDark} 0%, ${bluePrimary} 50%, ${blueSecondary} 100%)`,
      overlayGradient: `linear-gradient(to right, ${blueDark} 30%, transparent 70%)`,
      buttonText: "Pre-order Now",
      badge: "NEW ARRIVAL",
      badgeColor: `linear-gradient(135deg, ${blueSecondary}, ${bluePrimary})`,
      features: ["AI Camera System", "Titanium Frame", "S Pen Included", "7 Years OS Updates"],
      price: "From $1,199.99",
      rating: 4.8,
      highlight: "Exclusive Deal"
    },
    {
      id: 2,
      title: "Neo QLED 8K TV",
      subtitle: "Cinema Experience at Home",
      description: "Quantum Matrix Technology with 14-bit HDR. Immerse yourself in true 8K resolution with Object Tracking Sound.",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      gradient: `linear-gradient(135deg, ${bluePrimary} 0%, ${blueDark} 30%, ${blueSecondary} 100%)`,
      overlayGradient: `linear-gradient(to right, ${bluePrimary} 20%, transparent 80%)`,
      buttonText: "Explore TV",
      badge: "BEST SELLER",
      badgeColor: `linear-gradient(135deg, ${blueSecondary}, ${bluePrimary})`,
      features: ["True 8K Resolution", "Quantum HDR 2000", "Object Tracking Sound+", "Smart Hub"],
      price: "From $2,499.99",
      rating: 4.9,
      highlight: "Limited Stock"
    },
    {
      id: 3,
      title: "Bespoke Refrigerator",
      subtitle: "Custom Luxury Kitchen",
      description: "Modular design with AI Family Hub. SpaceMax Technology keeps food fresh 30% longer with precise temperature control.",
      image: "https://images.unsplash.com/photo-1585730061512-1c8f63e5bc0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      gradient: `linear-gradient(135deg, rgba(0, 42, 100, 0.95) 0%, rgba(0, 61, 130, 0.9) 50%, rgba(0, 18, 36, 0.85) 100%)`,
      overlayGradient: `linear-gradient(to right, rgba(0, 42, 100, 0.85) 30%, transparent 70%)`,
      buttonText: "Design Yours",
      badge: "SMART HOME",
      badgeColor: `linear-gradient(135deg, ${blueSecondary}, ${bluePrimary})`,
      features: ["Customizable Panels", "AI Family Hub", "Twin Cooling Plus", "21\" Touch Screen"],
      price: "From $3,499.99",
      rating: 4.7,
      highlight: "Custom Design"
    },
    {
      id: 4,
      title: "Galaxy Book4 Pro",
      subtitle: "AI-Enhanced Productivity",
      description: "Intel® Core™ Ultra 7 processor with AI Boost. 3K Dynamic AMOLED 2X display for stunning color accuracy.",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
      gradient: `linear-gradient(135deg, ${blueDark} 0%, ${bluePrimary} 40%, ${blueSecondary} 100%)`,
      overlayGradient: `linear-gradient(to right, ${blueDark} 25%, transparent 75%)`,
      buttonText: "Shop Laptops",
      badge: "ULTRA PERFORMANCE",
      badgeColor: `linear-gradient(135deg, ${blueSecondary}, ${bluePrimary})`,
      features: ["3K AMOLED 2X", "Intel Core Ultra 7", "32GB LPDDR5X", "1TB NVMe SSD"],
      price: "From $1,599.99",
      rating: 4.8,
      highlight: "New Release"
    }
  ];

  const features = [
    {
      icon: <FiTruck className="text-2xl" />,
      title: "Free Shipping",
      desc: "On all orders over $499",
      bgColor: `rgba(0, 42, 100, 0.1)`,
      iconColor: blueSecondary,
      borderColor: `rgba(0, 61, 130, 0.2)`
    },
    {
      icon: <FiShield className="text-2xl" />,
      title: "3-Year Warranty",
      desc: "Premium protection plan",
      bgColor: `rgba(0, 61, 130, 0.1)`,
      iconColor: blueSecondary,
      borderColor: `rgba(0, 61, 130, 0.3)`
    },
    {
      icon: <FiTag className="text-2xl" />,
      title: "Best Price",
      desc: "Price match guarantee",
      bgColor: `rgba(0, 18, 36, 0.1)`,
      iconColor: bluePrimary,
      borderColor: `rgba(0, 42, 100, 0.2)`
    },
    {
      icon: <FiClock className="text-2xl" />,
      title: "Fast Delivery",
      desc: "1-2 day express shipping",
      bgColor: `rgba(0, 42, 100, 0.08)`,
      iconColor: blueSecondary,
      borderColor: `rgba(0, 61, 130, 0.25)`
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Main Hero Slider - Responsive Height */}
      <div className={`relative ${isMobile ? 'h-[70vh] max-h-[700px] min-h-[500px]' : isTablet ? 'h-[75vh] max-h-[800px] min-h-[550px]' : 'h-[85vh] max-h-[900px] min-h-[600px]'}`}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1200}
          loop={true}
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          className="h-full"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-full w-full">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: isMobile ? 'center' : 'center'
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: slide.gradient, opacity: isMobile ? 0.95 : 0.92 }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ 
                      background: isMobile 
                        ? `linear-gradient(to bottom, ${blueDark} 10%, transparent 40%, transparent 100%)`
                        : slide.overlayGradient 
                    }}
                  />
                </div>

                <div className="relative h-full flex items-center">
                  <div className="container mx-auto px-4 lg:px-8">
                    <div className={`${isMobile ? 'max-w-full px-4 text-center' : isTablet ? 'max-w-xl ml-4 lg:ml-8' : 'max-w-2xl ml-0 lg:ml-8 xl:ml-16'}`}>
                      <div className={`inline-flex items-center gap-3 ${isMobile ? 'mb-4 justify-center flex-wrap' : 'mb-8'}`}>
                        <div
                          className={`${isMobile ? 'px-3 py-1.5' : 'px-5 py-2.5'} rounded-full backdrop-blur-sm shadow-lg`}
                          style={{ background: slide.badgeColor }}
                        >
                          <span className={`text-white font-bold ${isMobile ? 'text-xs' : 'text-sm'} tracking-wider uppercase`}>
                            {slide.badge}
                          </span>
                        </div>
                        <div className={`${isMobile ? 'px-3 py-1.5' : 'px-4 py-2'} bg-white/20 backdrop-blur-sm rounded-full`}>
                          <span className={`text-white font-medium ${isMobile ? 'text-xs' : 'text-sm'} flex items-center gap-1`}>
                            <FiZap className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                            {slide.highlight}
                          </span>
                        </div>
                      </div>

                      <h1 className={`${isMobile ? 'text-2xl sm:text-3xl' : isTablet ? 'text-4xl md:text-5xl' : 'text-5xl md:text-6xl lg:text-7xl'} font-bold text-white ${isMobile ? 'mb-2' : 'mb-4'} leading-tight tracking-tight`}>
                        {slide.title}
                      </h1>
                      <h2 className={`${isMobile ? 'text-base sm:text-lg' : isTablet ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'} text-white/95 ${isMobile ? 'mb-3' : 'mb-6'} font-light tracking-wide`}>
                        {slide.subtitle}
                      </h2>
                      <p className={`${isMobile ? 'text-sm sm:text-base' : isTablet ? 'text-base md:text-lg' : 'text-lg'} text-white/90 ${isMobile ? 'mb-4' : 'mb-8'} ${isMobile ? 'max-w-full' : 'max-w-xl'} leading-relaxed`}>
                        {slide.description}
                      </p>

                      <div className={`flex ${isMobile ? 'flex-col' : 'flex-col sm:flex-row sm:items-center'} gap-4 ${isMobile ? 'mb-4' : 'mb-8'}`}>
                        <div className="flex items-center gap-4 justify-center sm:justify-start">
                          <span className={`${isMobile ? 'text-xl sm:text-2xl' : 'text-3xl'} font-bold text-white`}>{slide.price}</span>
                          <span className={`${isMobile ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'} bg-white/20 rounded-full text-white font-medium`}>
                            Save $200
                          </span>
                        </div>
                        <div className="flex items-center gap-3 justify-center sm:justify-start">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <FiStar key={i} className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} ${i < Math.floor(slide.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <span className={`text-white/90 ${isMobile ? 'text-xs sm:text-sm' : 'text-sm md:text-base'}`}>
                            ({slide.rating}/5) • 1,247 reviews
                          </span>
                        </div>
                      </div>

                      <div className={`flex flex-wrap ${isMobile ? 'gap-2 mb-4' : 'gap-3 mb-10'} justify-center sm:justify-start`}>
                        {slide.features.map((feature, index) => (
                          <div
                            key={index}
                            className={`${isMobile ? 'px-2 py-1.5 text-xs' : isTablet ? 'px-3 py-2 text-sm' : 'px-4 py-3 text-sm'} bg-white/15 backdrop-blur-sm rounded-lg border border-white/25 hover:bg-white/25 transition-all duration-300 hover:scale-105 flex items-center gap-2`}
                          >
                            <FiCheck className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-white/80`} />
                            <span className="text-white font-medium tracking-wide">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className={`flex ${isMobile ? 'flex-col gap-3' : isTablet ? 'flex-col sm:flex-row gap-3' : 'flex-col sm:flex-row gap-4'}`}>
                        <button className={`bg-white text-gray-900 ${isMobile ? 'px-6 py-3 text-sm' : isTablet ? 'px-8 py-3 text-base' : 'px-10 py-4 text-lg'} rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3 group relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
                          <FiShoppingBag className={`relative z-10 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'} group-hover:scale-110 transition-transform`} />
                          <span className="relative z-10">{slide.buttonText}</span>
                        </button>
                        <button className={`bg-transparent border-2 border-white/40 text-white ${isMobile ? 'px-6 py-3 text-sm' : isTablet ? 'px-6 py-3 text-base' : 'px-8 py-4 text-lg'} rounded-xl font-bold hover:bg-white/15 hover:border-white/60 transition-all duration-300 backdrop-blur-sm`}>
                          {isMobile ? 'View Specs' : 'View Specifications'}
                        </button>
                      </div>

                      <div className={`${isMobile ? 'mt-4 flex flex-col gap-2 text-xs' : 'mt-8 flex items-center gap-6 text-sm'}`}>
                        <div className="flex items-center gap-2 justify-center sm:justify-start">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span>In Stock • Ships Today</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center sm:justify-start">
                          <FiCheck className="w-4 h-4" />
                          <span>Free 2-Day Delivery</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className={`absolute inset-y-0 ${isMobile ? 'left-2 right-2' : 'left-4 right-4'} flex items-center justify-between pointer-events-none z-10`}>
            <button className={`swiper-button-prev !static !m-0 ${isMobile ? '!w-10 !h-10' : '!w-14 !h-14'} !bg-white/25 !backdrop-blur-lg !rounded-full !flex !items-center !justify-center hover:!bg-white/40 hover:!scale-110 !transition-all !duration-300 pointer-events-auto shadow-2xl border border-white/20 ${isMobile ? '!hidden' : ''}`}>
              <FiChevronLeft className={`text-white ${isMobile ? 'text-2xl' : 'text-3xl'}`} />
            </button>
            <button className={`swiper-button-next !static !m-0 ${isMobile ? '!w-10 !h-10' : '!w-14 !h-14'} !bg-white/25 !backdrop-blur-lg !rounded-full !flex !items-center !justify-center hover:!bg-white/40 hover:!scale-110 !transition-all !duration-300 pointer-events-auto shadow-2xl border border-white/20 ${isMobile ? '!hidden' : ''}`}>
              <FiChevronRight className={`text-white ${isMobile ? 'text-2xl' : 'text-3xl'}`} />
            </button>
          </div>

          <div className={`swiper-pagination ${isMobile ? '!bottom-4' : isTablet ? '!bottom-8' : '!bottom-12'} !flex !justify-center !gap-3`} />
        </Swiper>

        <div className={`absolute ${isMobile ? 'bottom-4' : isTablet ? 'bottom-8' : 'bottom-24'} left-1/2 transform -translate-x-1/2 ${isMobile ? 'hidden' : 'hidden lg:flex'} items-center gap-3 z-20`}>
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const swiper = document.querySelector('.swiper')?.swiper;
                if (swiper) swiper.slideTo(index);
              }}
              className={`transition-all duration-500 ease-out ${activeSlide === index
                ? 'w-10 h-2 rounded-full shadow-lg'
                : 'w-2 h-2 rounded-full hover:bg-white/80 hover:scale-125'
                }`}
              style={{
                background: activeSlide === index
                  ? `linear-gradient(to right, ${blueSecondary}, white)`
                  : 'rgba(255, 255, 255, 0.5)'
              }}
            />
          ))}
        </div>
      </div>

      {/* Features Section - Responsive Grid */}
      <div className={`${isMobile ? 'mt-6' : isTablet ? 'mt-8' : 'mt-12'} container mx-auto px-4 lg:px-8`}>
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-4'} ${isMobile ? 'divide-y' : 'divide-x'} divide-gray-100`}>
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group ${isMobile ? 'p-4 sm:p-6' : 'p-8'} hover:bg-gray-50 transition-all duration-300 cursor-pointer relative`}
                data-aos="fade-up"
                data-aos-delay={index * 200}
                data-aos-duration="600"
                data-aos-once="true"
                style={{ 
                  borderRight: !isMobile && index < features.length - 1 ? '1px solid #f3f4f6' : 'none',
                  borderBottom: isMobile && index < features.length - 1 ? '1px solid #f3f4f6' : 'none'
                }}
              >
                <div className={`flex items-center ${isMobile ? 'gap-3' : 'gap-5'}`}>
                  <div
                    className={`${isMobile ? 'p-3' : 'p-4'} rounded-2xl shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 border`}
                    style={{
                      backgroundColor: feature.bgColor,
                      borderColor: feature.borderColor
                    }}
                  >
                    <div style={{ color: feature.iconColor }}>
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className={`font-bold text-gray-900 ${isMobile ? 'text-base' : 'text-lg'} mb-1`}>{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.desc}</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-4/5 h-0.5 transition-all duration-300"
                  style={{ background: `linear-gradient(to right, transparent, ${blueSecondary}, transparent)` }}>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Black Friday Banner - Responsive */}
      <div className={`${isMobile ? 'mt-8' : isTablet ? 'mt-12' : 'mt-16'} container mx-auto px-4 lg:px-8`} data-aos="fade-up" data-aos-delay="300">
        <div className="relative rounded-2xl shadow-2xl">
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${blueDark} 0%, ${bluePrimary} 50%, ${blueSecondary} 100%)`
            }}
          ></div>

          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
              background: `linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)`,
              animation: 'shimmer 3s infinite'
            }}></div>
          </div>

          <div className={`relative z-10 ${isMobile ? 'p-6' : isTablet ? 'p-8' : 'p-10 lg:p-14'}`}>
            {/* Robot Peek Image - Hidden on mobile & tablet */}
            <div className={`${isMobile || isTablet ? 'hidden' : 'hidden xl:block'} absolute left-[-8%] top-1/2 -translate-y-1/2 z-999 pointer-events-none`}>
              <img
                src="/png/peak.png"
                alt="AI Robot"
                className="w-[340px] -translate-x-1/3"
                loading='lazy'
              />
            </div>
            
            <div className={`flex flex-col ${isTablet ? 'lg:flex-row' : 'lg:flex-row'} items-center justify-between ${isMobile ? 'gap-6' : 'gap-10'}`}>
              <div className={`${isMobile ? 'text-center' : 'flex-1'} ${isTablet ? 'text-center lg:text-left' : ''}`}>
                <div
                  className={`inline-flex items-center ${isMobile ? 'px-3 py-1.5' : 'px-4 py-2'} rounded-full backdrop-blur-sm ${isMobile ? 'mb-4' : 'mb-6'} border`}
                  style={{
                    background: `linear-gradient(135deg, ${blueSecondary}, ${bluePrimary})`,
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <span className="text-white font-bold text-sm tracking-wider uppercase">BLACK FRIDAY SALE</span>
                </div>
                <h3 className={`${isMobile ? 'text-2xl' : isTablet ? 'text-3xl lg:text-4xl' : 'text-4xl lg:text-5xl'} font-bold text-white ${isMobile ? 'mb-4' : 'mb-6'} leading-tight`}>
                  Year End Clearance
                  <span className={`block ${isMobile ? 'text-3xl' : isTablet ? 'text-4xl lg:text-5xl' : 'text-5xl lg:text-6xl'} bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent`}>
                    Up to 60% OFF
                  </span>
                </h3>
                <p className={`text-blue-100 ${isMobile ? 'text-base mb-6' : isTablet ? 'text-lg mb-8' : 'text-xl mb-8'} max-w-2xl ${isMobile ? 'mx-auto' : ''} ${isTablet ? 'mx-auto lg:mx-0' : ''}`}>
                  Premium electronics at unprecedented prices. Limited quantities available.
                </p>

                <div className={`flex ${isMobile ? 'flex-wrap justify-center gap-3 mb-6' : 'items-center gap-4'}`}>
                  {[
                    { value: '12', label: 'Days', color: blueSecondary },
                    { value: '23', label: 'Hours', color: bluePrimary },
                    { value: '45', label: 'Minutes', color: blueSecondary },
                    { value: '59', label: 'Seconds', color: bluePrimary }
                  ].map((time, index) => (
                    <div key={index} className="text-center">
                      <div
                        className={`backdrop-blur-lg rounded-xl ${isMobile ? 'p-2' : 'p-4'} border min-w-16 ${isMobile ? 'min-w-14' : ''}`}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
                          borderColor: 'rgba(255, 255, 255, 0.2)'
                        }}
                      >
                        <span className={`text-white font-bold ${isMobile ? 'text-xl' : 'text-3xl'} block`}>{time.value}</span>
                        <span className="text-blue-200 text-sm">{time.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`flex flex-col items-center ${isMobile ? 'gap-4' : 'gap-6'}`}>
                <button className={`bg-white text-gray-900 ${isMobile ? 'px-6 py-3 text-sm' : isTablet ? 'px-8 py-4 text-base' : 'px-12 py-5 text-xl'} rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl group relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
                  <span className="relative z-10 flex items-center gap-3">
                    Shop All Deals
                    <svg className={`${isMobile ? 'w-4 h-4' : isTablet ? 'w-5 h-5' : 'w-6 h-6'} group-hover:translate-x-2 transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
                <div className="text-center">
                  <p className={`text-blue-200 ${isMobile ? 'text-xs mb-1' : 'text-sm mb-2'}`}>
                    <FiCheck className={`inline ${isMobile ? 'w-3 h-3' : 'w-4 h-4'} mr-2`} />
                    Free express shipping on all orders
                  </p>
                  <p className={`text-blue-200 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    <FiCheck className={`inline ${isMobile ? 'w-3 h-3' : 'w-4 h-4'} mr-2`} />
                    30-day return policy • Price match guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section - Responsive */}
      <div className={`${isMobile ? 'mt-12' : isTablet ? 'mt-16' : 'mt-20'} container mx-auto px-4 lg:px-8`}>
        <div className="text-center mb-8 md:mb-12" data-aos="fade-down" data-aos-delay="200">
          <h2 className={`${isMobile ? 'text-2xl' : isTablet ? 'text-3xl lg:text-4xl' : 'text-4xl lg:text-5xl'} font-bold text-gray-900 mb-4`}>
            Shop by Category
          </h2>
          <p className={`text-gray-600 ${isMobile ? 'text-base' : isTablet ? 'text-lg' : 'text-xl'} max-w-3xl mx-auto ${isMobile ? 'px-2' : ''}`}>
            Discover our premium electronics collection across all categories
          </p>
        </div>

        <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : isTablet ? 'grid-cols-2 gap-6' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'}`}>
          {[
            {
              name: 'Kitchen Appliances',
              count: '125+ Products',
              image: '/png/KITCHEN2.png',
              highlight: 'New Models',
              id: 'Kitchen Appliances'
            },
            {
              name: 'Large Appliances',
              count: '89+ Products',
              image: '/png/LARGE.png',
              highlight: 'Premium Range',
              id: 'Large Appliances'
            },
            {
              name: 'Personal Care Appliances',
              count: '67+ Products',
              image: '/png/PERSNOL.png',
              highlight: 'Smart Tech',
              id: 'Personal Care Appliances'
            },
            {
              name: 'Home Appliances',
              count: '142+ Products',
              image: '/png/home1.png',
              highlight: 'Energy Efficient',
              id: 'Home Appliances'
            }
          ].map((category, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl ${isMobile ? 'p-4' : 'p-8'} transition-all duration-500 hover:scale-[1.02] cursor-pointer group border border-gray-200 hover:border-gray-300`}
              data-aos="fade-up"
              data-aos-delay={index * 200}
              data-aos-duration="600"
              data-aos-once="true"
              onClick={() => navigate('/products', { 
                state: { selectedCategory: category.id } 
              })}
              style={{
                background: `linear-gradient(135deg, rgba(0, 42, 100, 0.05) 0%, rgba(0, 61, 130, 0.08) 100%)`
              }}
            >
              <div className="relative z-10">
                <div className={`${isMobile ? 'mb-4' : 'mb-6'} flex justify-center`}>
                  <img
                    src={category.image}
                    alt={category.name}
                    className={`${isMobile ? 'max-h-32' : 'w-99 h-auto'} object-contain`}
                  />
                </div>
                <h3 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-gray-900 ${isMobile ? 'mb-2' : 'mb-3'}`}>
                  {category.name}
                </h3>
                <div className={`flex items-center justify-between ${isMobile ? 'mb-4' : 'mb-6'}`}>
                  <p className={`text-gray-700 ${isMobile ? 'text-sm' : ''}`}>{category.count}</p>
                  <span className={`px-3 py-1 rounded-full ${isMobile ? 'text-xs' : 'text-sm'} font-medium`}
                    style={{
                      backgroundColor: `rgba(0, 61, 130, 0.1)`,
                      color: blueSecondary
                    }}>
                    {category.highlight}
                  </span>
                </div>
                <div className={`text-gray-900 font-bold ${isMobile ? 'text-base' : 'text-lg'} flex items-center gap-3 group-hover:gap-5 transition-all duration-300`}>
                  <span>Browse Collection</span>
                  <svg className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} group-hover:translate-x-2 transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})`
                }}>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Mobile-specific adjustments */
        @media (max-width: 640px) {
          .swiper-button-prev,
          .swiper-button-next {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;