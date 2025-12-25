
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

  const bluePrimary = 'rgb(0, 42, 100)';
  const blueSecondary = 'rgb(0, 61, 130)';
  const blueDark = 'rgb(0, 18, 36)';

  //new 
  const navigate = useNavigate();

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
      {/* Main Hero Slider */}
      <div className="relative h-[85vh] max-h-[900px] min-h-[600px]">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          // pagination={{
          //   clickable: true,
          //   el: '.swiper-pagination',
          //   renderBullet: (index, className) => {
          //     return `<span class="${className} !w-3 !h-3 !bg-white/70 hover:!bg-white !opacity-100 !mx-2 !transition-all !duration-300"></span>`;
          //   },
          // }}
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
                    backgroundPosition: 'center'
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: slide.gradient, opacity: 0.92 }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: slide.overlayGradient }}
                  />
                </div>

                <div className="relative h-full flex items-center">
                  <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-2xl ml-0 lg:ml-8 xl:ml-16">
                      <div className="inline-flex items-center gap-3 mb-8">
                        <div
                          className="px-5 py-2.5 rounded-full backdrop-blur-sm shadow-lg"
                          style={{ background: slide.badgeColor }}
                        >
                          <span className="text-white font-bold text-sm tracking-wider uppercase">
                            {slide.badge}
                          </span>
                        </div>
                        <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                          <span className="text-white font-medium text-sm flex items-center gap-1">
                            <FiZap className="w-4 h-4" />
                            {slide.highlight}
                          </span>
                        </div>
                      </div>

                      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight tracking-tight">
                        {slide.title}
                      </h1>
                      <h2 className="text-2xl md:text-3xl text-white/95 mb-6 font-light tracking-wide">
                        {slide.subtitle}
                      </h2>
                      <p className="text-lg text-white/90 mb-8 max-w-xl leading-relaxed">
                        {slide.description}
                      </p>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
                        <div className="flex items-center gap-4">
                          <span className="text-3xl font-bold text-white">{slide.price}</span>
                          <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm font-medium">
                            Save $200
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <FiStar key={i} className={`w-5 h-5 ${i < Math.floor(slide.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <span className="text-white/90">({slide.rating}/5) • 1,247 reviews</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 mb-10">
                        {slide.features.map((feature, index) => (
                          <div
                            key={index}
                            className="px-4 py-3 bg-white/15 backdrop-blur-sm rounded-lg border border-white/25 hover:bg-white/25 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                          >
                            <FiCheck className="w-4 h-4 text-white/80" />
                            <span className="text-white font-medium text-sm tracking-wide">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-white text-gray-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3 group relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
                          <FiShoppingBag className="relative z-10 group-hover:scale-110 transition-transform" />
                          <span className="relative z-10">{slide.buttonText}</span>
                        </button>
                        <button className="bg-transparent border-2 border-white/40 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/15 hover:border-white/60 transition-all duration-300 backdrop-blur-sm">
                          View Specifications
                        </button>
                      </div>

                      <div className="mt-8 flex items-center gap-6 text-white/80 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span>In Stock • Ships Today</span>
                        </div>
                        <div className="flex items-center gap-2">
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

          <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
            <button className="swiper-button-prev !static !m-0 !w-14 !h-14 !bg-white/25 !backdrop-blur-lg !rounded-full !flex !items-center !justify-center hover:!bg-white/40 hover:!scale-110 !transition-all !duration-300 pointer-events-auto shadow-2xl border border-white/20">
              <FiChevronLeft className="text-white text-3xl" />
            </button>
            <button className="swiper-button-next !static !m-0 !w-14 !h-14 !bg-white/25 !backdrop-blur-lg !rounded-full !flex !items-center !justify-center hover:!bg-white/40 hover:!scale-110 !transition-all !duration-300 pointer-events-auto shadow-2xl border border-white/20">
              <FiChevronRight className="text-white text-3xl" />
            </button>
          </div>

          <div className="swiper-pagination !bottom-12 !flex !justify-center !gap-3" />
        </Swiper>

        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 hidden lg:flex items-center gap-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                document.querySelector('.swiper').swiper.slideTo(index);
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

      <div className="mt-12 container mx-auto px-4 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 hover:bg-gray-50 transition-all duration-300 cursor-pointer relative"
                data-aos="fade-up"
                data-aos-delay={index * 200} // Stagger delay: 0ms, 100ms, 200ms, 300ms
                data-aos-duration="600"
                data-aos-once="true"
                style={{ borderRight: index < features.length - 1 ? '1px solid #f3f4f6' : 'none' }}
              >
                <div className="flex items-center gap-5">
                  <div
                    className="p-4 rounded-2xl shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 border"

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
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{feature.title}</h3>
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

      <div className="mt-16 container mx-auto px-4 lg:px-8"   data-aos="fade-up"  data-aos-delay="300">
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

          <div className="relative  z-10 p-10 lg:p-14">
            {/* Robot Peek Image */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="hidden xl:block absolute left-[-8%] top-1/2 -translate-y-1/2 z-999 pointer-events-none">
                <img
                  src="/png/peak.png"
                  alt="AI Robot"
                  className="w-[340px] -translate-x-1/3"
                  loading='lazy'
                />
              </div>
              <div className="flex-1">
                <div
                  className="inline-flex items-center px-4 py-2 rounded-full backdrop-blur-sm mb-6 border"
                  style={{
                    background: `linear-gradient(135deg, ${blueSecondary}, ${bluePrimary})`,
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <span className="text-white font-bold text-sm tracking-wider uppercase">BLACK FRIDAY SALE</span>
                </div>
                <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  Year End Clearance
                  <span className="block text-5xl lg:text-6xl bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                    Up to 60% OFF
                  </span>
                </h3>
                <p className="text-blue-100 text-xl mb-8 max-w-2xl">
                  Premium electronics at unprecedented prices. Limited quantities available.
                </p>

                <div className="flex items-center gap-4">
                  {[
                    { value: '12', label: 'Days', color: blueSecondary },
                    { value: '23', label: 'Hours', color: bluePrimary },
                    { value: '45', label: 'Minutes', color: blueSecondary },
                    { value: '59', label: 'Seconds', color: bluePrimary }
                  ].map((time, index) => (
                    <div key={index} className="text-center">
                      <div
                        className="backdrop-blur-lg rounded-xl p-4 min-w-20 border"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.15)',
                          borderColor: 'rgba(255, 255, 255, 0.2)'
                        }}
                      >
                        <span className="text-white font-bold text-3xl block">{time.value}</span>
                        <span className="text-blue-200 text-sm">{time.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center gap-6">
                <button className="bg-white text-gray-900 px-12 py-5 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
                  <span className="relative z-10 flex items-center gap-3">
                    Shop All Deals
                    <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
                <div className="text-center">
                  <p className="text-blue-200 text-sm mb-2">
                    <FiCheck className="inline w-4 h-4 mr-2" />
                    Free express shipping on all orders
                  </p>
                  <p className="text-blue-200 text-sm">
                    <FiCheck className="inline w-4 h-4 mr-2" />
                    30-day return policy • Price match guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    <div className="mt-20 container mx-auto px-4 lg:px-8">
  <div className="text-center mb-12" data-aos="fade-down" data-aos-delay="200">
    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
      Shop by Category
    </h2>
    <p className="text-gray-600 text-xl max-w-3xl mx-auto">
      Discover our premium electronics collection across all categories
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        className="relative overflow-hidden rounded-2xl p-8 transition-all duration-500 hover:scale-[1.02] cursor-pointer group border border-gray-200 hover:border-gray-300"
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
          <div className="mb-6">
            <img
              src={category.image}
              alt={category.name}
              className="w-99 h-auto object-contain"
            />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {category.name}
          </h3>
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-700">{category.count}</p>
            <span className="px-3 py-1 rounded-full text-sm font-medium"
              style={{
                backgroundColor: `rgba(0, 61, 130, 0.1)`,
                color: blueSecondary
              }}>
              {category.highlight}
            </span>
          </div>
          <div className="text-gray-900 font-bold text-lg flex items-center gap-3 group-hover:gap-5 transition-all duration-300">
            <span>Browse Collection</span>
            <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      `}</style>
    </section>
  );
};

export default HeroSection;


// import React, { useState, useEffect, useRef } from 'react';
// import { FiChevronLeft, FiChevronRight, FiShoppingBag, FiTruck, FiShield, FiTag, FiClock, FiStar, FiCheck, FiZap } from 'react-icons/fi';

// const HeroSection = () => {
//   const [activeSlide, setActiveSlide] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   const bluePrimary = 'rgb(0, 42, 100)';
//   const blueSecondary = 'rgb(0, 61, 130)';
//   const blueDark = 'rgb(0, 18, 36)';

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

//   // Custom slider functions
//   const nextSlide = () => {
//     if (isTransitioning) return;
//     setIsTransitioning(true);
//     setActiveSlide((prev) => (prev + 1) % heroSlides.length);
//     setTimeout(() => setIsTransitioning(false), 600);
//   };

//   const prevSlide = () => {
//     if (isTransitioning) return;
//     setIsTransitioning(true);
//     setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
//     setTimeout(() => setIsTransitioning(false), 600);
//   };

//   const goToSlide = (index) => {
//     if (isTransitioning || index === activeSlide) return;
//     setIsTransitioning(true);
//     setActiveSlide(index);
//     setTimeout(() => setIsTransitioning(false), 600);
//   };

//   // Auto-play functionality
//   useEffect(() => {
//     if (isAutoPlaying) {
//       const interval = setInterval(() => {
//         nextSlide();
//       }, 5000);
//       return () => clearInterval(interval);
//     }
//   }, [isAutoPlaying, activeSlide]);

//   const currentSlide = heroSlides[activeSlide];

//   return (
//     <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
//       {/* Main Hero Container with new slider UI */}
//       <div className="w-full max-w-[90%] mx-auto mt-8">
//         <div 
//           className="relative rounded-[80px] md:rounded-[64px] overflow-hidden shadow-2xl"
//           onMouseEnter={() => setIsAutoPlaying(false)}
//           onMouseLeave={() => setIsAutoPlaying(true)}
//         >
//           {/* Main Slider Container */}
//           <div className="relative h-[85vh] max-h-[900px] min-h-[600px]">
//             {/* Slide Background */}
//             <div 
//               key={currentSlide.id}
//               className="absolute inset-0 transition-all duration-500 ease-out"
//               style={{
//                 opacity: isTransitioning ? 0.7 : 1,
//               }}
//             >
//               <div 
//                 className="absolute inset-0 bg-cover bg-center"
//                 style={{
//                   backgroundImage: `url(${currentSlide.image})`,
//                   backgroundSize: 'cover',
//                   backgroundPosition: 'center'
//                 }}
//               >
//                 <div 
//                   className="absolute inset-0"
//                   style={{ background: currentSlide.gradient, opacity: 0.92 }}
//                 />
//                 <div 
//                   className="absolute inset-0"
//                   style={{ background: currentSlide.overlayGradient }}
//                 />
//               </div>

//               {/* Content Overlay - Using new slider UI styling */}
//               <div className="relative h-full flex items-center">
//                 <div className="container mx-auto px-4 lg:px-8">
//                   <div className="max-w-2xl ml-0 lg:ml-8 xl:ml-16">
//                     {/* Badge with new styling */}
//                     <div className="inline-flex items-center gap-3 mb-8">
//                       <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">
//                         {currentSlide.badge}
//                       </span>
//                       <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
//                         <span className="text-white font-medium text-sm flex items-center gap-1">
//                           <FiZap className="w-4 h-4" />
//                           {currentSlide.highlight}
//                         </span>
//                       </div>
//                     </div>

//                     <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight tracking-tight">
//                       {currentSlide.title}
//                     </h1>
//                     <h2 className="text-2xl md:text-3xl text-white/95 mb-6 font-light tracking-wide">
//                       {currentSlide.subtitle}
//                     </h2>
//                     <p className="text-lg text-white/90 mb-8 max-w-xl leading-relaxed">
//                       {currentSlide.description}
//                     </p>

//                     <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
//                       <div className="flex items-center gap-4">
//                         <span className="text-3xl font-bold text-white">{currentSlide.price}</span>
//                         <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm font-medium">
//                           Save $200
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-3">
//                         <div className="flex">
//                           {[...Array(5)].map((_, i) => (
//                             <FiStar key={i} className={`w-5 h-5 ${i < Math.floor(currentSlide.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
//                           ))}
//                         </div>
//                         <span className="text-white/90">({currentSlide.rating}/5) • 1,247 reviews</span>
//                       </div>
//                     </div>

//                     <div className="flex flex-wrap gap-3 mb-10">
//                       {currentSlide.features.map((feature, index) => (
//                         <div
//                           key={index}
//                           className="px-4 py-3 bg-white/15 backdrop-blur-sm rounded-lg border border-white/25 hover:bg-white/25 transition-all duration-300 hover:scale-105 flex items-center gap-2"
//                         >
//                           <FiCheck className="w-4 h-4 text-white/80" />
//                           <span className="text-white font-medium text-sm tracking-wide">{feature}</span>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="flex flex-col sm:flex-row gap-4">
//                       {/* Primary CTA with new styling */}
//                       <button className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
//                         <div className="flex items-center justify-center gap-3">
//                           <FiShoppingBag className="group-hover:scale-110 transition-transform" />
//                           <span>{currentSlide.buttonText}</span>
//                         </div>
//                         <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full" />
//                       </button>
                      
//                       {/* Secondary Circular Button with new styling */}
//                       <button className="w-14 h-14 rounded-full border-2 border-white/40 text-white hover:bg-white/15 hover:border-white/60 transition-all duration-300 backdrop-blur-sm flex items-center justify-center hover:scale-105 shadow-lg">
//                         <FiZap className="w-6 h-6" />
//                       </button>
//                     </div>

//                     <div className="mt-8 flex items-center gap-6 text-white/80 text-sm">
//                       <div className="flex items-center gap-2">
//                         <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                         <span>In Stock • Ships Today</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <FiCheck className="w-4 h-4" />
//                         <span>Free 2-Day Delivery</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Navigation Arrows with new styling */}
//             <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
//               <button 
//                 onClick={prevSlide}
//                 className="pointer-events-auto w-12 h-12 lg:w-14 lg:h-14 bg-white/25 backdrop-blur-lg rounded-full flex items-center justify-center hover:bg-white/40 hover:scale-110 transition-all duration-300 shadow-2xl border border-white/20"
//               >
//                 <FiChevronLeft className="text-white text-2xl lg:text-3xl" />
//               </button>
//               <button 
//                 onClick={nextSlide}
//                 className="pointer-events-auto w-12 h-12 lg:w-14 lg:h-14 bg-white/25 backdrop-blur-lg rounded-full flex items-center justify-center hover:bg-white/40 hover:scale-110 transition-all duration-300 shadow-2xl border border-white/20"
//               >
//                 <FiChevronRight className="text-white text-2xl lg:text-3xl" />
//               </button>
//             </div>

//             {/* Pagination Dots with new styling */}
//             <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-3 z-20">
//               {heroSlides.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => goToSlide(index)}
//                   className={`transition-all duration-300 ease-out ${
//                     activeSlide === index
//                       ? 'w-10 h-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg'
//                       : 'w-2 h-2 rounded-full bg-white/50 hover:bg-white/80 hover:scale-125'
//                   }`}
//                 />
//               ))}
//             </div>

//             {/* Slide Counter */}
//             <div className="absolute top-8 right-8 hidden lg:block">
//               <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
//                 <span className="text-white font-mono text-sm">
//                   <span className="text-cyan-400">{activeSlide + 1}</span>
//                   <span className="text-white/50"> / {heroSlides.length}</span>
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ============ ALL OLD SECTIONS BELOW ============ */}

//       {/* Features Section - from old code */}
//       <div className="mt-12 container mx-auto px-4 lg:px-8">
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
//           <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="group p-8 hover:bg-gray-50 transition-all duration-300 cursor-pointer relative"
//                 data-aos="fade-up"
//                 data-aos-delay={index * 200}
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

//       {/* Black Friday Sale Section - from old code */}
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
//               <div className="hidden xl:block absolute left-[-8%] top-2/2 -translate-y-1/2 z-999 pointer-events-none" data-aos="fade-left"  data-aos-delay="500">
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

//       {/* Shop by Category Section - from old code */}
//       <div className="mt-20 container mx-auto px-4 lg:px-8" >
//         <div className="text-center mb-12"  data-aos="fade-down"   data-aos-delay="200">
//           <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
//             Shop by Category
//           </h2>
//           <p className="text-gray-600 text-xl max-w-3xl mx-auto">
//             Discover our premium electronics collection across all categories
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {[
//             {
//               name: 'Smartphones',
//               count: '125+ Products',
//               image: '/png/mobile.png',
//               highlight: 'New Models'
//             },
//             {
//               name: 'Laptops & PCs',
//               count: '89+ Products',
//               image: '/png/laptop.png',
//               highlight: 'Gaming Ready'
//             },
//             {
//               name: 'TV & Audio',
//               count: '67+ Products',
//               image: '/png/tv.png',
//               highlight: '8K & Dolby'
//             },
//             {
//               name: 'Home Appliances',
//               count: '142+ Products',
//               image: '/png/home.png',
//               highlight: 'Smart Home'
//             }
//           ].map((category, index) => (
//             <div
//               key={index}
//               className="relative overflow-hidden rounded-2xl p-8 transition-all duration-500 hover:scale-[1.02] cursor-pointer group border border-gray-200 hover:border-gray-300"
//                  data-aos="fade-up"
//                 data-aos-delay={index * 200}
//                 data-aos-duration="600"
//                 data-aos-once="true"
//               style={{
//                 background: `linear-gradient(135deg, rgba(0, 42, 100, 0.05) 0%, rgba(0, 61, 130, 0.08) 100%)`
//               }}
//             >
//               <div className="relative z-10">
//                 <div className="mb-6">
//                   <img
//                     src={category.image}
//                     alt={category.name}
//                     className="w-99 h-auto object-contain"
//                   />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-3">
//                   {category.name}
//                 </h3>
//                 <div className="flex items-center justify-between mb-6">
//                   <p className="text-gray-700">{category.count}</p>
//                   <span className="px-3 py-1 rounded-full text-sm font-medium"
//                     style={{
//                       backgroundColor: `rgba(0, 61, 130, 0.1)`,
//                       color: blueSecondary
//                     }}>
//                     {category.highlight}
//                   </span>
//                 </div>
//                 <button className="text-gray-900 font-bold text-lg flex items-center gap-3 group-hover:gap-5 transition-all duration-300">
//                   <span>Browse Collection</span>
//                   <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                   </svg>
//                 </button>
//               </div>

//               <div className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                 style={{
//                   background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})`
//                 }}>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;




// import React, { useState, useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
// import { FiChevronLeft, FiChevronRight, FiShoppingBag, FiTruck, FiShield, FiTag } from 'react-icons/fi';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/effect-fade';

// const HeroSection = () => {
//   const [activeSlide, setActiveSlide] = useState(0);

//   const heroSlides = [
//     {
//       id: 1,
//       title: "Galaxy S24 Ultra",
//       subtitle: "The Ultimate Smartphone Experience",
//       description: "Get $300 instant credit with trade-in. AI-powered photography and 200MP camera.",
//       image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
//       color: "from-blue-900/90 to-blue-700/90",
//       buttonText: "Pre-order Now",
//       badge: "NEW ARRIVAL",
//       features: ["AI Camera", "S Pen Included", "Titanium Frame", "7 Years Updates"]
//     },
//     {
//       id: 2,
//       title: "Neo QLED 8K TV",
//       subtitle: "Cinematic Experience at Home",
//       description: "Quantum Matrix Technology with 14-bit HDR. Immerse yourself in true 8K resolution.",
//       image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
//       color: "from-purple-900/90 to-indigo-800/90",
//       buttonText: "Explore TV",
//       badge: "BEST SELLER",
//       features: ["8K Resolution", "Quantum HDR", "Object Tracking Sound", "Smart Hub"]
//     },
//     {
//       id: 3,
//       title: "Bespoke Refrigerator",
//       subtitle: "Customize Your Kitchen",
//       description: "Modular design with Family Hub. Keep food fresh longer with SpaceMax Technology.",
//       image: "https://images.unsplash.com/photo-1585730061512-1c8f63e5bc0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
//       color: "from-emerald-900/90 to-teal-700/90",
//       buttonText: "Design Yours",
//       badge: "SMART HOME",
//       features: ["Custom Panels", "Family Hub", "Twin Cooling", "21" ,"Touch Screen"]
//     },
//     {
//       id: 4,
//       title: "Galaxy Book4 Pro",
//       subtitle: "Power Meets Portability",
//       description: "Intel® Core™ Ultra processor with AI Boost. 3K AMOLED display for stunning visuals.",
//       image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
//       color: "from-gray-900/90 to-slate-800/90",
//       buttonText: "Shop Laptops",
//       badge: "ULTRA POWER",
//       features: ["3K AMOLED", "Intel Core Ultra", "32GB RAM", "1TB SSD"]
//     }
//   ];

//   const features = [
//     {
//       icon: <FiTruck className="text-2xl" />,
//       title: "Free Shipping",
//       desc: "On orders over $499"
//     },
//     {
//       icon: <FiShield className="text-2xl" />,
//       title: "2-Year Warranty",
//       desc: "Extended protection"
//     },
//     {
//       icon: <FiTag className="text-2xl" />,
//       title: "Best Price",
//       desc: "Price match guarantee"
//     },
//     {
//       icon: <FiShoppingBag className="text-2xl" />,
//       title: "Easy Returns",
//       desc: "30-day return policy"
//     }
//   ];

//   return (
//     <section className="relative overflow-hidden">
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
//           pagination={{
//             clickable: true,
//             el: '.swiper-pagination',
//             renderBullet: (index, className) => {
//               return `<span class="${className} !w-3 !h-3 !bg-white/50 hover:!bg-white !opacity-100 !mx-2"></span>`;
//             },
//           }}
//           autoplay={{
//             delay: 5000,
//             disableOnInteraction: false,
//           }}
//           effect="fade"
//           fadeEffect={{ crossFade: true }}
//           speed={1000}
//           loop={true}
//           onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
//           className="h-full"
//         >
//           {heroSlides.map((slide) => (
//             <SwiperSlide key={slide.id}>
//               <div className="relative h-full w-full">
//                 {/* Background Image with Overlay */}
//                 <div
//                   className="absolute inset-0 bg-cover bg-center"
//                   style={{
//                     backgroundImage: `url(${slide.image})`,
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center'
//                   }}
//                 >
//                   <div className={`absolute inset-0 bg-gradient-to-r ${slide.color}`} />
//                 </div>

//                 {/* Content */}
//                 <div className="relative h-full flex items-center">
//                   <div className="samsung-container">
//                     <div className="max-w-2xl">
//                       {/* Badge */}
//                       <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
//                         <span className="text-white font-semibold text-sm tracking-wide">
//                           {slide.badge}
//                         </span>
//                       </div>

//                       {/* Title & Description */}
//                       <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
//                         {slide.title}
//                       </h1>
//                       <h2 className="text-2xl md:text-3xl text-white/90 mb-6 font-light">
//                         {slide.subtitle}
//                       </h2>
//                       <p className="text-lg text-white/80 mb-8 max-w-xl">
//                         {slide.description}
//                       </p>

//                       {/* Features List */}
//                       <div className="flex flex-wrap gap-3 mb-8">
//                         {slide.features.map((feature, index) => (
//                           <div
//                             key={index}
//                             className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
//                           >
//                             <span className="text-white text-sm font-medium">{feature}</span>
//                           </div>
//                         ))}
//                       </div>

//                       {/* CTA Buttons */}
//                       <div className="flex flex-col sm:flex-row gap-4">
//                         <button className="bg-white text-samsung-blue px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-2">
//                           <FiShoppingBag />
//                           {slide.buttonText}
//                         </button>
//                         <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all duration-300">
//                           Learn More
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}

//           {/* Custom Navigation Arrows */}
//           <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
//             <button className="swiper-button-prev !static !m-0 !w-12 !h-12 !bg-white/20 !backdrop-blur-sm !rounded-full !flex !items-center !justify-center hover:!bg-white/30 transition-all pointer-events-auto">
//               <FiChevronLeft className="text-white text-2xl" />
//             </button>
//             <button className="swiper-button-next !static !m-0 !w-12 !h-12 !bg-white/20 !backdrop-blur-sm !rounded-full !flex !items-center !justify-center hover:!bg-white/30 transition-all pointer-events-auto">
//               <FiChevronRight className="text-white text-2xl" />
//             </button>
//           </div>

//           {/* Custom Pagination */}
//           <div className="swiper-pagination !bottom-8 !flex !justify-center !gap-2" />
//         </Swiper>

//         {/* Slide Indicator Dots */}
//         <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 hidden lg:flex items-center gap-2 z-20">
//           {heroSlides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => {
//                 document.querySelector('.swiper').swiper.slideTo(index);
//               }}
//               className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                 activeSlide === index
//                   ? 'bg-white w-8'
//                   : 'bg-white/50 hover:bg-white/70'
//               }`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Features Bar */}
//       <div className="relative bg-white shadow-xl -mt-12 mx-4 lg:mx-8 rounded-2xl overflow-hidden z-30">
//         <div className="samsung-container">
//           <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-4 p-6 hover:bg-gray-50 transition-colors group cursor-pointer"
//               >
//                 <div className="p-3 bg-samsung-blue/10 text-samsung-blue rounded-xl group-hover:scale-110 transition-transform duration-300">
//                   {feature.icon}
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-gray-900">{feature.title}</h3>
//                   <p className="text-sm text-gray-600">{feature.desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Promotional Banner */}
//       <div className="mt-16 samsung-container">
//         <div className="bg-gradient-to-r from-samsung-blue to-blue-600 rounded-2xl p-8 lg:p-12 overflow-hidden relative">
//           {/* Animated Background Elements */}
//           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
//           <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24" />

//           <div className="relative z-10">
//             <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
//               <div>
//                 <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
//                   Black Friday Sale Live!
//                 </h3>
//                 <p className="text-blue-100 text-lg">
//                   Up to 60% off on select electronics. Limited time offer.
//                 </p>
//                 <div className="flex items-center gap-4 mt-6">
//                   <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
//                     <span className="text-white font-bold text-2xl">24</span>
//                     <span className="text-blue-100 text-sm ml-1">Hours</span>
//                   </div>
//                   <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
//                     <span className="text-white font-bold text-2xl">59</span>
//                     <span className="text-blue-100 text-sm ml-1">Minutes</span>
//                   </div>
//                   <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
//                     <span className="text-white font-bold text-2xl">59</span>
//                     <span className="text-blue-100 text-sm ml-1">Seconds</span>
//                   </div>
//                 </div>
//               </div>
//               <button className="bg-white text-samsung-blue px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl whitespace-nowrap">
//                 Shop Deals Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Category Quick Links */}
//       <div className="mt-16 samsung-container">
//         <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
//           Shop by Category

//         </h2>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {[
//             { name: 'Smartphones', count: '125+ Products', color: 'bg-blue-100', text: 'text-blue-800' },
//             { name: 'Laptops & PCs', count: '89+ Products', color: 'bg-purple-100', text: 'text-purple-800' },
//             { name: 'TV & Audio', count: '67+ Products', color: 'bg-emerald-100', text: 'text-emerald-800' },
//             { name: 'Home Appliances', count: '142+ Products', color: 'bg-amber-100', text: 'text-amber-800' }
//           ].map((category, index) => (
//             <div
//               key={index}
//               className={`${category.color} p-6 rounded-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group`}
//             >
//               <h3 className={`text-xl font-bold ${category.text} mb-2`}>
//                 {category.name}
//               </h3>
//               <p className="text-gray-600 mb-4">{category.count}</p>
//               <button className={`${category.text} font-semibold flex items-center gap-2 group-hover:gap-4 transition-all`}>
//                 Shop Now

//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
