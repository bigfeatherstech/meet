import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight, FiShoppingBag, FiTruck, FiShield, FiTag } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      title: "Galaxy S24 Ultra",
      subtitle: "The Ultimate Smartphone Experience",
      description: "Get $300 instant credit with trade-in. AI-powered photography and 200MP camera.",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      color: "from-blue-900/90 to-blue-700/90",
      buttonText: "Pre-order Now",
      badge: "NEW ARRIVAL",
      features: ["AI Camera", "S Pen Included", "Titanium Frame", "7 Years Updates"]
    },
    {
      id: 2,
      title: "Neo QLED 8K TV",
      subtitle: "Cinematic Experience at Home",
      description: "Quantum Matrix Technology with 14-bit HDR. Immerse yourself in true 8K resolution.",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      color: "from-purple-900/90 to-indigo-800/90",
      buttonText: "Explore TV",
      badge: "BEST SELLER",
      features: ["8K Resolution", "Quantum HDR", "Object Tracking Sound", "Smart Hub"]
    },
    {
      id: 3,
      title: "Bespoke Refrigerator",
      subtitle: "Customize Your Kitchen",
      description: "Modular design with Family Hub. Keep food fresh longer with SpaceMax Technology.",
      image: "https://images.unsplash.com/photo-1585730061512-1c8f63e5bc0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      color: "from-emerald-900/90 to-teal-700/90",
      buttonText: "Design Yours",
      badge: "SMART HOME",
      features: ["Custom Panels", "Family Hub", "Twin Cooling", "21" ,"Touch Screen"]
    },
    {
      id: 4,
      title: "Galaxy Book4 Pro",
      subtitle: "Power Meets Portability",
      description: "Intel® Core™ Ultra processor with AI Boost. 3K AMOLED display for stunning visuals.",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
      color: "from-gray-900/90 to-slate-800/90",
      buttonText: "Shop Laptops",
      badge: "ULTRA POWER",
      features: ["3K AMOLED", "Intel Core Ultra", "32GB RAM", "1TB SSD"]
    }
  ];

  const features = [
    {
      icon: <FiTruck className="text-2xl" />,
      title: "Free Shipping",
      desc: "On orders over $499"
    },
    {
      icon: <FiShield className="text-2xl" />,
      title: "2-Year Warranty",
      desc: "Extended protection"
    },
    {
      icon: <FiTag className="text-2xl" />,
      title: "Best Price",
      desc: "Price match guarantee"
    },
    {
      icon: <FiShoppingBag className="text-2xl" />,
      title: "Easy Returns",
      desc: "30-day return policy"
    }
  ];

  return (
    <section className="relative overflow-hidden">
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
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
            renderBullet: (index, className) => {
              return `<span class="${className} !w-3 !h-3 !bg-white/50 hover:!bg-white !opacity-100 !mx-2"></span>`;
            },
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1000}
          loop={true}
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          className="h-full"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-full w-full">
                {/* Background Image with Overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${slide.color}`} />
                </div>

                {/* Content */}
                <div className="relative h-full flex items-center">
                  <div className="samsung-container">
                    <div className="max-w-2xl">
                      {/* Badge */}
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                        <span className="text-white font-semibold text-sm tracking-wide">
                          {slide.badge}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                        {slide.title}
                      </h1>
                      <h2 className="text-2xl md:text-3xl text-white/90 mb-6 font-light">
                        {slide.subtitle}
                      </h2>
                      <p className="text-lg text-white/80 mb-8 max-w-xl">
                        {slide.description}
                      </p>

                      {/* Features List */}
                      <div className="flex flex-wrap gap-3 mb-8">
                        {slide.features.map((feature, index) => (
                          <div 
                            key={index}
                            className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
                          >
                            <span className="text-white text-sm font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-white text-samsung-blue px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-2">
                          <FiShoppingBag />
                          {slide.buttonText}
                        </button>
                        <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all duration-300">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Custom Navigation Arrows */}
          <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
            <button className="swiper-button-prev !static !m-0 !w-12 !h-12 !bg-white/20 !backdrop-blur-sm !rounded-full !flex !items-center !justify-center hover:!bg-white/30 transition-all pointer-events-auto">
              <FiChevronLeft className="text-white text-2xl" />
            </button>
            <button className="swiper-button-next !static !m-0 !w-12 !h-12 !bg-white/20 !backdrop-blur-sm !rounded-full !flex !items-center !justify-center hover:!bg-white/30 transition-all pointer-events-auto">
              <FiChevronRight className="text-white text-2xl" />
            </button>
          </div>

          {/* Custom Pagination */}
          <div className="swiper-pagination !bottom-8 !flex !justify-center !gap-2" />
        </Swiper>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 hidden lg:flex items-center gap-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                document.querySelector('.swiper').swiper.slideTo(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSlide === index 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Features Bar */}
      <div className="relative bg-white shadow-xl -mt-12 mx-4 lg:mx-8 rounded-2xl overflow-hidden z-30">
        <div className="samsung-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-6 hover:bg-gray-50 transition-colors group cursor-pointer"
              >
                <div className="p-3 bg-samsung-blue/10 text-samsung-blue rounded-xl group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="mt-16 samsung-container">
        <div className="bg-gradient-to-r from-samsung-blue to-blue-600 rounded-2xl p-8 lg:p-12 overflow-hidden relative">
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24" />
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Black Friday Sale Live!
                </h3>
                <p className="text-blue-100 text-lg">
                  Up to 60% off on select electronics. Limited time offer.
                </p>
                <div className="flex items-center gap-4 mt-6">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <span className="text-white font-bold text-2xl">24</span>
                    <span className="text-blue-100 text-sm ml-1">Hours</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <span className="text-white font-bold text-2xl">59</span>
                    <span className="text-blue-100 text-sm ml-1">Minutes</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <span className="text-white font-bold text-2xl">59</span>
                    <span className="text-blue-100 text-sm ml-1">Seconds</span>
                  </div>
                </div>
              </div>
              <button className="bg-white text-samsung-blue px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl whitespace-nowrap">
                Shop Deals Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Quick Links */}
      <div className="mt-16 samsung-container">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Shop by Category
          
        </h2>
     
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Smartphones', count: '125+ Products', color: 'bg-blue-100', text: 'text-blue-800' },
            { name: 'Laptops & PCs', count: '89+ Products', color: 'bg-purple-100', text: 'text-purple-800' },
            { name: 'TV & Audio', count: '67+ Products', color: 'bg-emerald-100', text: 'text-emerald-800' },
            { name: 'Home Appliances', count: '142+ Products', color: 'bg-amber-100', text: 'text-amber-800' }
          ].map((category, index) => (
            <div 
              key={index}
              className={`${category.color} p-6 rounded-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group`}
            >
              <h3 className={`text-xl font-bold ${category.text} mb-2`}>
                {category.name}
              </h3>
              <p className="text-gray-600 mb-4">{category.count}</p>
              <button className={`${category.text} font-semibold flex items-center gap-2 group-hover:gap-4 transition-all`}>
                Shop Now
                
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;