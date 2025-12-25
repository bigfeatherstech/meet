import React from 'react'

const CTABanner = () => {
  // Define the same color variables as in HomePage
  const bluePrimary = 'rgb(0, 42, 100)';
  const blueSecondary = 'rgb(0, 61, 130)';
  const blueDark = 'rgb(0, 18, 36)';

  return (
    <div className="relative py-20 md:py-24 overflow-hidden">
      {/* Background Image with Fixed Attachment */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/png/global-trade-bg.jpg')", // You can replace with your image
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(135deg, ${blueDark} 0%, ${bluePrimary} 50%, ${blueSecondary} 100%)`,
            opacity: 0.92
          }}
        />
        
        {/* Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(45deg, transparent 45%, rgba(255, 255, 255, 0.2) 50%, transparent 55%)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/5 rounded-full animate-float animate-delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-white/5 rounded-full animate-float animate-delay-2000" />
      </div>

      {/* Content */}
      <div className="relative z-10 samsung-container">
        <div className="max-w-4xl mx-auto">
          {/* Icon Section */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center border border-white/30">
                <div className="text-4xl animate-bounce">📩</div>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-400 rounded-full animate-ping" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-300 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-6">
            Looking for a reliable exporter?
          </h2>

          {/* Description */}
          <p className="text-xl text-blue-100 text-center mb-10 max-w-3xl mx-auto leading-relaxed">
            Contact us today to discuss your sourcing and export requirements.
            Let's build a successful partnership.
          </p>

          {/* CTA Button */}
          <div className="text-center">
            <button 
              className="group relative bg-white text-gray-900 px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              style={{ color: bluePrimary }}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Get Export Consultation
                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
            </button>
            
            <p className="text-blue-200 text-sm mt-4">
              ✨ Your Trusted Global Export Partner Since 2006
            </p>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-delay-1000 {
          animation-delay: 1000ms;
        }
        
        .animate-delay-2000 {
          animation-delay: 2000ms;
        }
      `}</style>
    </div>
  )
}

export default CTABanner