import React, { useState, useEffect } from 'react';
import { FaChevronUp } from 'react-icons/fa';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrolled > 300);
      
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const totalScroll = docHeight - winHeight;
      
      if (totalScroll > 0) {
        const progress = Math.min((scrolled / totalScroll) * 100, 100);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate offset for CRISP rendering
  const radius = 45; // Changed from 44 to 45 for better integer calculation
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`
        fixed right-6 bottom-6 z-50
        flex items-center justify-center
        w-16 h-16
        rounded-full
        bg-samsung-blue hover:bg-samsung-blue-light
        text-white
        shadow-2xl
        transition-all duration-300 ease-out
        ${isVisible 
          ? 'translate-y-0 opacity-100 pointer-events-auto' 
          : 'translate-y-20 opacity-0 pointer-events-none'
        }
        hover:scale-110
        active:scale-95
        focus:outline-none focus:ring-2 focus:ring-samsung-blue
      `}
    >
      {/* FIXED: Non-blurry Progress Ring */}
      <div className="absolute inset-0">
        <svg 
          className="w-full h-full"
          viewBox="0 0 100 100"
          style={{ 
            // REMOVED filter - causes blur
            shapeRendering: 'geometricPrecision' // Better than crispEdges
          }}
        >
          {/* Solution 1: Use thicker stroke and stroke-alignment */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          
          {/* FIXED: Progress indicator with proper stroke alignment */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ 
              opacity: scrollProgress > 2 ? 1 : 0,
              transition: 'stroke-dashoffset 0.15s ease-out',
              // Critical: Force pixel snapping
              transform: 'translate(0.5px, 0.5px)',
              transformOrigin: 'center'
            }}
          />
        </svg>
      </div>

      {/* Arrow Icon without filter (causes blur) */}
      <FaChevronUp 
        className="w-6 h-6 relative z-10"
      />
      
      {/* Optional: Tooltip text */}
      {scrollProgress > 10 && (
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {Math.round(scrollProgress)}%
        </span>
      )}
    </button>
  );
};

export default BackToTopButton;