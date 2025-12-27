// import React, { useState, useEffect } from 'react';
// import { 
//   FiChevronLeft,
//   FiChevronRight,
//   FiStar,
//   FiThumbsUp,
//   FiShare2,
//   FiMessageCircle,
//   FiCheckCircle
// } from 'react-icons/fi';

// const TestimonialSection = () => {
//   const [activeTestimonial, setActiveTestimonial] = useState(0);
//   const [isVisible, setIsVisible] = useState(false);

//   const testimonials = [
//     {
//       id: 1,
//       name: "Sarah Johnson",
//       role: "Tech Enthusiast",
//       image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
//       rating: 5,
//       comment: "ElectroStore transformed my electronics shopping experience. The quality and service are unmatched! I've purchased multiple devices and each time the experience gets better.",
//       product: "Galaxy S24 Ultra",
//       purchaseDate: "January 2024",
//       location: "New York, USA"
//     },
//     {
//       id: 2,
//       name: "Michael Chen",
//       role: "Gadget Collector",
//       image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
//       rating: 5,
//       comment: "Best prices and fastest delivery. Their warranty service saved me thousands when my TV had an issue. The support team was incredibly helpful throughout the process.",
//       product: "Neo QLED 8K TV",
//       purchaseDate: "December 2023",
//       location: "San Francisco, USA"
//     },
//     {
//       id: 3,
//       name: "Emma Davis",
//       role: "Smart Home Expert",
//       image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
//       rating: 4,
//       comment: "The Bespoke appliance line is revolutionary. Customization options are endless and the installation team was professional. My smart kitchen is now complete!",
//       product: "Bespoke Refrigerator",
//       purchaseDate: "February 2024",
//       location: "London, UK"
//     },
//     {
//       id: 4,
//       name: "David Park",
//       role: "Gaming Professional",
//       image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
//       rating: 5,
//       comment: "As a professional gamer, I need reliable equipment. ElectroStore's gaming monitors and accessories have never let me down. Top-tier quality!",
//       product: "Gaming Monitor",
//       purchaseDate: "March 2024",
//       location: "Seoul, Korea"
//     },
//     {
//       id: 5,
//       name: "Lisa Rodriguez",
//       role: "Interior Designer",
//       image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
//       rating: 5,
//       comment: "Perfect for my design projects. The home theater systems and smart appliances integrate seamlessly. My clients are always impressed with the quality.",
//       product: "Home Theater System",
//       purchaseDate: "January 2024",
//       location: "Miami, USA"
//     }
//   ];

//   // Auto rotate testimonials
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
//     }, 6000);
//     return () => clearInterval(interval);
//   }, []);

//   // Intersection Observer
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting) {
//             setIsVisible(true);
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     const element = document.querySelector('.testimonial-section');
//     if (element) {
//       observer.observe(element);
//     }

//     return () => {
//       if (element) {
//         observer.unobserve(element);
//       }
//     };
//   }, []);

//   return (
//     <section className="testimonial-section py-20 bg-gradient-to-b from-white to-gray-50">
//       <div className="samsung-container">
//         {/* Header */}
//         <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-samsung-blue/10 text-samsung-blue rounded-full text-sm font-semibold mb-4">
//             <FiMessageCircle className="text-lg" />
//             CUSTOMER TESTIMONIALS
//           </div>
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//             What Our <span className="text-samsung-blue">Customers</span> Say
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Don't just take our word for it. Hear from thousands of satisfied customers worldwide.
//           </p>
//         </div>

//         {/* Main Testimonial Display */}
//         <div className="relative mb-12">
//           <div className="overflow-hidden">
//             <div 
//               className="flex transition-transform duration-700 ease-in-out"
//               style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
//             >
//               {testimonials.map((testimonial) => (
//                 <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
//                   <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
//                     <div className="grid lg:grid-cols-3">
//                       {/* Left Column - Customer Info */}
//                       <div className="bg-gradient-to-b from-samsung-blue to-blue-600 p-8 text-white lg:col-span-1">
//                         <div className="flex flex-col items-center text-center mb-6">
//                           <img 
//                             src={testimonial.image} 
//                             alt={testimonial.name}
//                             className="w-24 h-24 rounded-full object-cover border-4 border-white/20 mb-4"
//                           />
//                           <h3 className="text-2xl font-bold mb-1">{testimonial.name}</h3>
//                           <p className="text-blue-100 font-semibold mb-2">{testimonial.role}</p>
//                           <div className="flex items-center gap-1">
//                             {[...Array(5)].map((_, i) => (
//                               <FiStar 
//                                 key={i} 
//                                 className={`text-lg ${i < testimonial.rating ? 'text-yellow-300' : 'text-white/30'}`} 
//                               />
//                             ))}
//                             <span className="ml-2 text-white/80">{testimonial.rating}.0</span>
//                           </div>
//                         </div>
                        
//                         <div className="space-y-4">
//                           <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
//                             <div className="text-sm text-blue-100 mb-1">Purchased Product</div>
//                             <div className="font-bold text-lg">{testimonial.product}</div>
//                           </div>
                          
//                           <div className="grid grid-cols-2 gap-3">
//                             <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
//                               <div className="text-sm text-blue-100">Date</div>
//                               <div className="font-semibold">{testimonial.purchaseDate}</div>
//                             </div>
//                             <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
//                               <div className="text-sm text-blue-100">Location</div>
//                               <div className="font-semibold">{testimonial.location}</div>
//                             </div>
//                           </div>
                          
//                           <div className="flex items-center gap-2 text-sm">
//                             <FiCheckCircle className="text-green-300" />
//                             <span>Verified Purchase</span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Right Column - Testimonial Content */}
//                       <div className="p-8 lg:col-span-2">
//                         <div className="mb-6">
//                           <div className="text-4xl text-gray-300 mb-4">"</div>
//                           <p className="text-gray-700 text-lg leading-relaxed mb-6">
//                             {testimonial.comment}
//                           </p>
//                         </div>
                        
//                         <div className="border-t border-gray-100 pt-6">
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center gap-4">
//                               <button className="flex items-center gap-2 text-gray-600 hover:text-samsung-blue transition-colors">
//                                 <FiThumbsUp className="text-xl" />
//                                 <span>Helpful</span>
//                               </button>
//                               <button className="flex items-center gap-2 text-gray-600 hover:text-samsung-blue transition-colors">
//                                 <FiShare2 className="text-xl" />
//                                 <span>Share</span>
//                               </button>
//                             </div>
//                             <div className="text-gray-500 text-sm">
//                               {testimonial.id}/{testimonials.length} testimonials
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Navigation Buttons */}
//           <div className="flex items-center justify-center mt-8 space-x-4">
//             <button 
//               onClick={() => setActiveTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length)}
//               className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-300 transform hover:scale-110"
//             >
//               <FiChevronLeft className="text-gray-700 text-xl" />
//             </button>
            
//             <div className="flex space-x-3">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setActiveTestimonial(index)}
//                   className={`w-3 h-3 rounded-full transition-all duration-300 ${activeTestimonial === index ? 'bg-samsung-blue w-8' : 'bg-gray-300 hover:bg-gray-400'}`}
//                 />
//               ))}
//             </div>
            
//             <button 
//               onClick={() => setActiveTestimonial(prev => (prev + 1) % testimonials.length)}
//               className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-300 transform hover:scale-110"
//             >
//               <FiChevronRight className="text-gray-700 text-xl" />
//             </button>
//           </div>
//         </div>

//         {/* Customer Stats */}
//         <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           {[
//             { value: "4.9", label: "Average Rating", desc: "Out of 5 stars" },
//             { value: "50K+", label: "Reviews", desc: "Across all products" },
//             { value: "98%", label: "Would Recommend", desc: "To friends & family" },
//             { value: "24h", label: "Response Time", desc: "For customer queries" }
//           ].map((stat, index) => (
//             <div 
//               key={index}
//               className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
//             >
//               <div className="text-3xl font-bold text-samsung-blue mb-2">{stat.value}</div>
//               <div className="font-bold text-gray-900 mb-1">{stat.label}</div>
//               <div className="text-gray-600 text-sm">{stat.desc}</div>
//             </div>
//           ))}
//         </div>

//         {/* CTA Section */}
//         <div className={`text-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-12 text-white">
//             <h3 className="text-3xl font-bold mb-6">
//               Share Your Experience
//             </h3>
//             <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
//               Purchased from ElectroStore? Share your story and help others make informed decisions.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               {/* <button className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
//                 Write a Review
//               </button> */}
//               <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
//                   Write a Review
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TestimonialSection;









import React, { useState, useEffect } from 'react';
import { 
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiThumbsUp,
  FiShare2,
  FiMessageCircle,
  FiCheckCircle
} from 'react-icons/fi';

const TestimonialSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Define blue colors
  const bluePrimary = 'rgb(0, 42, 100)';
  const blueSecondary = 'rgb(0, 61, 130)';
  const blueDark = 'rgb(0, 18, 36)';

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Tech Enthusiast",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 5,
      comment: "ElectroStore transformed my electronics shopping experience. The quality and service are unmatched! I've purchased multiple devices and each time the experience gets better.",
      product: "Galaxy S24 Ultra",
      purchaseDate: "January 2024",
      location: "New York, USA"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Gadget Collector",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 5,
      comment: "Best prices and fastest delivery. Their warranty service saved me thousands when my TV had an issue. The support team was incredibly helpful throughout the process.",
      product: "Neo QLED 8K TV",
      purchaseDate: "December 2023",
      location: "San Francisco, USA"
    },
    {
      id: 3,
      name: "Emma Davis",
      role: "Smart Home Expert",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4,
      comment: "The Bespoke appliance line is revolutionary. Customization options are endless and the installation team was professional. My smart kitchen is now complete!",
      product: "Bespoke Refrigerator",
      purchaseDate: "February 2024",
      location: "London, UK"
    },
    {
      id: 4,
      name: "David Park",
      role: "Gaming Professional",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 5,
      comment: "As a professional gamer, I need reliable equipment. ElectroStore's gaming monitors and accessories have never let me down. Top-tier quality!",
      product: "Gaming Monitor",
      purchaseDate: "March 2024",
      location: "Seoul, Korea"
    },
    {
      id: 5,
      name: "Lisa Rodriguez",
      role: "Interior Designer",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 5,
      comment: "Perfect for my design projects. The home theater systems and smart appliances integrate seamlessly. My clients are always impressed with the quality.",
      product: "Home Theater System",
      purchaseDate: "January 2024",
      location: "Miami, USA"
    }
  ];

  // Auto rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector('.testimonial-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section className="testimonial-section py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="samsung-container">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
            style={{ 
              background: `linear-gradient(135deg, ${bluePrimary}10, ${blueSecondary}20)`,
              color: bluePrimary
            }}
          >
            <FiMessageCircle className="text-lg" />
            CUSTOMER TESTIMONIALS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our <span style={{ color: bluePrimary }}>Customers</span> Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Hear from thousands of satisfied customers worldwide.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="relative mb-12">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
                    <div className="grid lg:grid-cols-3">
                      {/* Left Column - Customer Info */}
                      <div className="p-8 text-white lg:col-span-1"
                           style={{ background: `linear-gradient(to bottom, ${bluePrimary}, ${blueSecondary})` }}>
                        <div className="flex flex-col items-center text-center mb-6">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="w-24 h-24 rounded-full object-cover border-4 border-white/20 mb-4"
                          />
                          <h3 className="text-2xl font-bold mb-1">{testimonial.name}</h3>
                          <p className="text-blue-100 font-semibold mb-2">{testimonial.role}</p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <FiStar 
                                key={i} 
                                className={`text-lg ${i < testimonial.rating ? 'text-yellow-300' : 'text-white/30'}`} 
                              />
                            ))}
                            <span className="ml-2 text-white/80">{testimonial.rating}.0</span>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <div className="text-sm text-blue-100 mb-1">Purchased Product</div>
                            <div className="font-bold text-lg">{testimonial.product}</div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                              <div className="text-sm text-blue-100">Date</div>
                              <div className="font-semibold">{testimonial.purchaseDate}</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                              <div className="text-sm text-blue-100">Location</div>
                              <div className="font-semibold">{testimonial.location}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm">
                            <FiCheckCircle className="text-green-300" />
                            <span>Verified Purchase</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Testimonial Content */}
                      <div className="p-8 lg:col-span-2">
                        <div className="mb-6">
                          <div className="text-4xl text-gray-300 mb-4">"</div>
                          <p className="text-gray-700 text-lg leading-relaxed mb-6">
                            {testimonial.comment}
                          </p>
                        </div>
                        
                        <div className="border-t border-gray-100 pt-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                                      style={{ '--tw-text-opacity': 1, color: bluePrimary }}>
                                <FiThumbsUp className="text-xl" />
                                <span>Helpful</span>
                              </button>
                              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                                      style={{ '--tw-text-opacity': 1, color: bluePrimary }}>
                                <FiShare2 className="text-xl" />
                                <span>Share</span>
                              </button>
                            </div>
                            <div className="text-gray-500 text-sm">
                              {testimonial.id}/{testimonials.length} testimonials
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <button 
              onClick={() => setActiveTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length)}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-300 transform hover:scale-110"
            >
              <FiChevronLeft className="text-gray-700 text-xl" />
            </button>
            
            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${activeTestimonial === index ? 'w-8' : 'bg-gray-300 hover:bg-gray-400'}`}
                  style={activeTestimonial === index ? { 
                    background: `linear-gradient(135deg, ${bluePrimary}, ${blueSecondary})`
                  } : {}}
                />
              ))}
            </div>
            
            <button 
              onClick={() => setActiveTestimonial(prev => (prev + 1) % testimonials.length)}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-300 transform hover:scale-110"
            >
              <FiChevronRight className="text-gray-700 text-xl" />
            </button>
          </div>
        </div>

        {/* Customer Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { value: "4.9", label: "Average Rating", desc: "Out of 5 stars" },
            { value: "50K+", label: "Reviews", desc: "Across all products" },
            { value: "98%", label: "Would Recommend", desc: "To friends & family" },
            { value: "24h", label: "Response Time", desc: "For customer queries" }
          ].map((stat, index) => (
            <div 
              key={index}
                    data-aos="fade-up"
                data-aos-delay={index * 200} // Stagger delay: 0ms, 100ms, 200ms, 300ms
                data-aos-duration="600"
                data-aos-once="true"
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
            >
              <div className="text-3xl font-bold mb-2" style={{ color: bluePrimary }}>{stat.value}</div>
              <div className="font-bold text-gray-900 mb-1">{stat.label}</div>
              <div className="text-gray-600 text-sm">{stat.desc}</div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={`text-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="rounded-3xl p-12 text-white"
               style={{ background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})` }}>
            <h3 className="text-3xl font-bold mb-6">
              Share Your Experience
            </h3>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Purchased from Meet Appliances Ltd? Share your story and help others make informed decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                      style={{ color: bluePrimary }}>
                Write a Review
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                View All Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;