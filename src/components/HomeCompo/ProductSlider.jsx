import React, { useState, useEffect, useRef, useCallback, memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiStar, 
  FiEye,
  FiZap,
  FiTag,
  FiCheck,
  FiTruck,
  FiShield,
  FiClock,
  FiArrowRight,
  FiPause,
  FiPlay,
  FiGrid,
  FiShoppingBag
} from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';
import isEqual from 'react-fast-compare';
import categoriesData from '../../DATA/data.json';

// Amazon/Flipkart Style Product Card Component
const ProductCard = memo(({ 
  product, 
  isHovered, 
  onMouseEnter, 
  onMouseLeave,
  bluePrimary,
  blueSecondary,
  blueDark,
  renderStars,
  onViewDetails
}) => {
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });

  const handleViewDetails = () => {
    navigate(`/products/${product.model}`);
  };

  return (
    <div
      ref={ref}
      className="relative group h-full"
      onMouseEnter={() => onMouseEnter(product.model)}
      onMouseLeave={onMouseLeave}
    >
      {/* Amazon/Flipkart Style Card Container */}
      <div className={`bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 h-full flex flex-col ${
        isHovered ? 'transform -translate-y-1 shadow-lg border-gray-300' : ''
      }`}>
        
        {/* Image Container - Amazon Style */}
        <div className="relative overflow-hidden bg-white p-4 flex items-center justify-center h-56">
          {inView ? (
            <>
              <img
                src={product.images[0]}
                alt={product.product_name}
                loading="lazy"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x400?text=Product+Image';
                }}
              />
              
              {/* Quick View Overlay - Amazon Style */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : ''
              }`}>
                <button 
                  onClick={handleViewDetails}
                  className="w-full mx-4 py-2.5 bg-white rounded-md font-medium text-sm hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2 shadow-md"
                  style={{ color: bluePrimary }}
                >
                  <FiEye className="text-base" />
                  Quick View
                </button>
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-gray-100 animate-pulse rounded"></div>
          )}
          
          {/* Top Badges - Amazon Style */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.discount > 15 && (
              <span 
                className="px-2 py-1 text-white text-xs font-bold rounded"
                style={{ backgroundColor: bluePrimary }}
              >
                {product.discount}% OFF
              </span>
            )}
            {product.isNew && (
              <span 
                className="px-2 py-1 text-white text-xs font-bold rounded"
                style={{ backgroundColor: blueSecondary }}
              >
                NEW
              </span>
            )}
          </div>
        </div>

        {/* Product Info Container - Amazon/Flipkart Style */}
        <div className="p-4 flex-grow flex flex-col border-t border-gray-100">
          
          {/* Category/Brand */}
          <div className="mb-1">
            <span className="text-xs text-gray-500 font-medium">
              {product.brand}
            </span>
          </div>
          
          {/* Product Name - Amazon Style */}
          <h3 
            className="text-sm text-gray-900 font-medium mb-2 line-clamp-2 transition-colors cursor-pointer h-10"
            onClick={handleViewDetails}
            style={{ '--tw-text-opacity': 1, color: `rgba(0, 42, 100, var(--tw-text-opacity))` }}
          >
            {product.product_name} - {product.model}
          </h3>
          
          {/* Ratings - Amazon Style */}
          <div className="flex items-center gap-1 mb-3">
            <div 
              className="flex items-center text-white text-xs px-1.5 py-0.5 rounded"
              style={{ backgroundColor: bluePrimary }}
            >
              <span className="font-bold">{parseFloat(product.rating).toFixed(1)}</span>
              <FiStar className="ml-0.5 text-xs fill-current" />
            </div>
            <span className="text-xs text-gray-500">
              ({product.reviewCount})
            </span>
          </div>
          
          {/* Key Specs Grid - Clean Amazon Style */}
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-y-2 gap-x-3">
              {/* Power */}
              <div className="flex items-center">
                <span className="text-xs text-gray-600 mr-1">Power:</span>
                <span className="text-xs font-medium text-gray-900">{product.power}</span>
              </div>
              
              {/* Voltage */}
              <div className="flex items-center">
                <span className="text-xs text-gray-600 mr-1">Voltage:</span>
                <span className="text-xs font-medium text-gray-900">{product.voltage}</span>
              </div>
              
              {/* Brand */}
              <div className="flex items-center">
                <span className="text-xs text-gray-600 mr-1">Brand:</span>
                <span className="text-xs font-medium text-gray-900">{product.brand}</span>
              </div>
              
              {/* Origin */}
              <div className="flex items-center">
                <span className="text-xs text-gray-600 mr-1">Origin:</span>
                <span className="text-xs font-medium text-gray-900">{product.country_of_origin}</span>
              </div>
            </div>
          </div>
          
          {/* Warranty Badge - Flipkart Style */}
          <div className="mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border"
              style={{ 
                backgroundColor: `${bluePrimary}10`,
                borderColor: `${bluePrimary}30`
              }}
            >
              <FiShield className="text-sm" style={{ color: bluePrimary }} />
              <span className="text-xs font-medium" style={{ color: bluePrimary }}>{product.warranty}</span>
              <span className="text-xs" style={{ color: blueSecondary }}>Warranty</span>
            </div>
          </div>
          
          {/* Price Section (Optional) - Amazon Style */}
          {product.price && (
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-gray-900">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-sm text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-xs font-medium text-green-600">
                      Save ₹{(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  </>
                )}
              </div>
            </div>
          )}
          
          {/* Action Buttons - Amazon Style */}
          <div className="mt-auto space-y-2">
            {/* Enquiry Button - Primary */}
            <button 
              onClick={handleViewDetails}
              className="w-full py-2.5 text-white rounded-md font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
              style={{ 
                background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})`
              }}
            >
              <FiShoppingBag className="text-base" />
              Enquire Now
            </button>
            
            {/* Additional Info - Amazon Style */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <FiTruck className="text-green-600" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center gap-1">
                <FiShield className="text-blue-600" />
                <span>{product.warranty}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}, isEqual);

// Helper function to flatten all products from categories
const flattenProducts = (categories) => {
  const allProducts = [];
  categories.forEach(category => {
    category.products.forEach(product => {
      // Generate realistic prices for Indian market (in rupees)
      const basePrice = Math.floor(Math.random() * 10000) + 1000;
      const discount = Math.floor(Math.random() * 35) + 5;
      const discountedPrice = Math.floor(basePrice * (1 - discount/100));
      
      allProducts.push({
        ...product,
        category: category.category_name,
        id: product.model,
        isFeatured: Math.random() > 0.5,
        isNew: Math.random() > 0.7,
        discount: discount,
        rating: (Math.random() * 1.5 + 3.5).toFixed(1),
        reviewCount: Math.floor(Math.random() * 1000) + 50,
        price: discountedPrice,
        originalPrice: basePrice,
        stock: Math.floor(Math.random() * 100) + 10,
        description: `${product.brand} ${product.product_name} - ${product.model}. Features include ${product.key_features.slice(0, 3).join(', ')}. Perfect for home and commercial use with ${product.warranty} warranty.`
      });
    });
  });
  return allProducts;
};

// Main Component (Remains mostly the same with styling updates)
const ProductSlider = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const autoPlayRef = useRef(null);
  const sliderContainerRef = useRef(null);
  const sliderRef = useRef(null);

  // Define the same color variables as in HomePage
  const bluePrimary = 'rgb(0, 42, 100)';
  const blueSecondary = 'rgb(0, 61, 130)';
  const blueDark = 'rgb(0, 18, 36)';

  // Load and flatten products
  useEffect(() => {
    setCategories(categoriesData);
    const flattened = flattenProducts(categoriesData);
    setAllProducts(flattened);
    setMounted(true);
  }, []);

  // Debounced resize handler
  useEffect(() => {
    let timeoutId;
    const updateVisibleCount = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        if (width < 640) setVisibleCount(1);
        else if (width < 768) setVisibleCount(2);
        else if (width < 1024) setVisibleCount(3);
        else setVisibleCount(4);
      }, 100);
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => {
      window.removeEventListener('resize', updateVisibleCount);
      clearTimeout(timeoutId);
    };
  }, []);

  // Get unique categories for filter
  const uniqueCategories = useMemo(() => {
    const cats = ['all', 'featured', 'new'];
    categories.forEach(cat => {
      cats.push(cat.category_name.toLowerCase());
    });
    return [...new Set(cats)];
  }, [categories]);

  // Memoized filters and sorting
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      if (filter === 'all') return true;
      if (filter === 'featured') return product.isFeatured;
      if (filter === 'new') return product.isNew;
      return product.category.toLowerCase() === filter.toLowerCase();
    });
  }, [allProducts, filter]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'discount':
          return b.discount - a.discount;
        default:
          return b.isFeatured - a.isFeatured;
      }
    });
  }, [filteredProducts, sortBy]);

  // Calculate visible products with sliding animation
  const getVisibleProducts = useCallback(() => {
    if (sortedProducts.length === 0) return [];
    
    const totalProducts = sortedProducts.length;
    
    if (totalProducts <= visibleCount) {
      return sortedProducts;
    }
    
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      const productIndex = (currentIndex + i) % totalProducts;
      visible.push({
        ...sortedProducts[productIndex],
        key: `${sortedProducts[productIndex].id}-${currentIndex}-${i}`
      });
    }
    
    return visible;
  }, [currentIndex, sortedProducts, visibleCount]);

  const visibleProducts = getVisibleProducts();

  // Handle view details
  const handleViewDetails = useCallback((productModel) => {
    navigate(`/products/${productModel}`);
  }, [navigate]);

  // Auto-play slider with cleanup
  useEffect(() => {
    if (!isAutoPlaying || isTransitioning) return;

    autoPlayRef.current = setInterval(() => {
      handleNextSlide();
    }, 4000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, isTransitioning, sortedProducts.length, visibleCount]);

  // Optimized slide handlers
  const handleNextSlide = useCallback(() => {
    if (sortedProducts.length <= visibleCount || isTransitioning) return;
    
    setIsTransitioning(true);
    
    const newIndex = currentIndex >= sortedProducts.length - visibleCount 
      ? 0 
      : currentIndex + 1;
    
    setCurrentIndex(newIndex);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }, [currentIndex, sortedProducts.length, visibleCount, isTransitioning]);

  const handlePrevSlide = useCallback(() => {
    if (sortedProducts.length <= visibleCount || isTransitioning) return;
    
    setIsTransitioning(true);
    
    const newIndex = currentIndex === 0 
      ? Math.max(0, sortedProducts.length - visibleCount)
      : currentIndex - 1;
    
    setCurrentIndex(newIndex);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }, [currentIndex, sortedProducts.length, visibleCount, isTransitioning]);

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const goToSlide = useCallback((index) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const newIndex = Math.min(index, sortedProducts.length - visibleCount);
    setCurrentIndex(newIndex);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }, [isTransitioning, sortedProducts.length, visibleCount]);

  // Memoized render functions
  const renderStars = useCallback((rating) => {
    return (
      <div className="flex items-center">
        <div 
          className="flex items-center text-white text-xs px-1.5 py-0.5 rounded"
          style={{ backgroundColor: bluePrimary }}
        >
          <span className="font-bold">{parseFloat(rating).toFixed(1)}</span>
          <FiStar className="ml-0.5 text-xs fill-current" />
        </div>
      </div>
    );
  }, []);

  // Calculate counts for filter buttons
  const getCategoryCount = useCallback((categoryId) => {
    if (categoryId === 'all') return allProducts.length;
    if (categoryId === 'featured') return allProducts.filter(p => p.isFeatured).length;
    if (categoryId === 'new') return allProducts.filter(p => p.isNew).length;
    return allProducts.filter(p => p.category.toLowerCase() === categoryId.toLowerCase()).length;
  }, [allProducts]);

  // Calculate slides
  const totalSlides = Math.max(1, Math.ceil(sortedProducts.length / visibleCount));
  const currentSlide = Math.floor(currentIndex / visibleCount);

  if (!mounted) return null;

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Amazon Style */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Featured Products
            </h2>
            <button 
              onClick={() => navigate('/products')}
              className="text-sm font-medium flex items-center gap-1"
              style={{ color: bluePrimary }}
            >
              View All
              <FiArrowRight className="text-sm" />
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiZap className="text-orange-500" />
            <span>Discover premium electrical appliances with exclusive deals</span>
          </div>
        </div>

        {/* Controls Section - Updated Style */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          {/* Filter Buttons - Amazon Style */}
          <div className="flex flex-wrap gap-2 justify-center">
            {uniqueCategories.slice(0, 6).map(categoryId => (
              <button
                key={categoryId}
                onClick={() => {
                  setFilter(categoryId);
                  setCurrentIndex(0);
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  filter === categoryId
                    ? 'text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={filter === categoryId ? { 
                  backgroundColor: bluePrimary 
                } : {}}
              >
                {categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}
                <span className="ml-1.5 px-1.5 py-0.5 rounded text-xs"
                      style={filter === categoryId ? { 
                        background: 'rgba(255, 255, 255, 0.3)' 
                      } : { background: 'rgba(255, 255, 255, 0.7)' }}>
                  {getCategoryCount(categoryId)}
                </span>
              </button>
            ))}
          </div>

          {/* Sort Controls - Cleaner Style */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-md p-2">
              <FiGrid className="text-gray-500 text-sm" />
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentIndex(0);
                }}
                className="bg-transparent border-none focus:outline-none text-sm font-medium"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="discount">Best Discount</option>
              </select>
            </div>

            {/* Auto-play toggle - Minimal */}
            <button
              onClick={toggleAutoPlay}
              className={`flex items-center gap-2 px-3 py-2 rounded-md border text-sm ${
                isAutoPlaying
                  ? 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100'
                  : 'border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {isAutoPlaying ? <FiPause /> : <FiPlay />}
              <span className="font-medium">
                {isAutoPlaying ? 'Pause' : 'Play'}
              </span>
            </button>
          </div>
        </div>

        {/* Slider Container - Cleaner Background */}
        <div 
          ref={sliderContainerRef}
          className="relative overflow-hidden rounded-lg p-4"
          style={{ backgroundColor: `${bluePrimary}05` }}
        >
          {/* Navigation Arrows - Amazon Style */}
          <button
            onClick={handlePrevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-300 rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={sortedProducts.length <= visibleCount || isTransitioning}
          >
            <FiChevronLeft className="text-xl text-gray-700" />
          </button>

          <button
            onClick={handleNextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-300 rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={sortedProducts.length <= visibleCount || isTransitioning}
          >
            <FiChevronRight className="text-xl text-gray-700" />
          </button>

          {/* Horizontal Product Cards Grid */}
          <div
            ref={sliderRef}
            className={`grid gap-4 transition-all duration-500 ease-in-out ${
              isTransitioning ? 'pointer-events-none' : ''
            }`}
            style={{
              gridTemplateColumns: `repeat(${visibleCount}, minmax(0, 1fr))`
            }}
          >
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.key}
                product={product}
                isHovered={hoveredProduct === product.id}
                onMouseEnter={setHoveredProduct}
                onMouseLeave={() => setHoveredProduct(null)}
                bluePrimary={bluePrimary}
                blueSecondary={blueSecondary}
                blueDark={blueDark}
                renderStars={renderStars}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </div>

        {/* Slider Indicators - Minimal */}
        <div className="flex flex-col items-center gap-4 mt-8">
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={`slide-${index}`}
                onClick={() => goToSlide(index * visibleCount)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  currentSlide === index
                    ? 'w-6'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                style={currentSlide === index ? { 
                  backgroundColor: bluePrimary 
                } : {}}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="text-sm text-gray-600">
            Showing {Math.min(currentIndex + 1, sortedProducts.length)}-
            {Math.min(currentIndex + visibleCount, sortedProducts.length)} of {sortedProducts.length} products
          </div>
        </div>

        {/* Quick Stats - Amazon Style */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div 
            className="bg-white border rounded-lg p-4 text-center hover:border-gray-300 transition-colors"
            style={{ borderColor: `${bluePrimary}20` }}
          >
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {allProducts.filter(p => p.discount > 0).length}+
            </div>
            <div className="text-sm text-gray-600">Discounted Items</div>
          </div>
          
          <div 
            className="bg-white border rounded-lg p-4 text-center hover:border-gray-300 transition-colors"
            style={{ borderColor: `${bluePrimary}20` }}
          >
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {allProducts.filter(p => p.rating >= 4.5).length}+
            </div>
            <div className="text-sm text-gray-600">Top Rated</div>
          </div>
          
          <div 
            className="bg-white border rounded-lg p-4 text-center hover:border-gray-300 transition-colors"
            style={{ borderColor: `${bluePrimary}20` }}
          >
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {categories.length}+
            </div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          
          <div 
            className="bg-white border rounded-lg p-4 text-center hover:border-gray-300 transition-colors"
            style={{ borderColor: `${bluePrimary}20` }}
          >
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {allProducts.length}+
            </div>
            <div className="text-sm text-gray-600">Total Products</div>
          </div>
        </div>

        {/* Footer CTA - Amazon Style */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <button 
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-2 px-8 py-3 text-white rounded-md font-medium text-base transition-all duration-200 shadow-sm hover:shadow-md"
            style={{ 
              background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})`
            }}
          >
            <FiShoppingBag className="text-lg" />
            Browse All Products
            <FiArrowRight className="text-lg" />
          </button>
          <p className="mt-3 text-gray-600 text-sm">
            Explore our complete collection of premium electrical appliances
          </p>
        </div>
      </div>
    </section>
  );
};

export default memo(ProductSlider);


// import React, { useState, useEffect, useRef, useCallback, memo, useMemo } from 'react';
// import { 
//   FiChevronLeft, 
//   FiChevronRight, 
//   FiStar, 
//   FiShoppingCart, 
//   FiHeart, 
//   FiEye,
//   FiZap,
//   FiTag,
//   FiCheck,
//   FiTruck,
//   FiShield,
//   FiClock,
//   FiArrowRight,
//   FiPause,
//   FiPlay,
//   FiGrid
// } from 'react-icons/fi';
// import { useInView } from 'react-intersection-observer';
// import isEqual from 'react-fast-compare';
// import productsData from '../../DATA/data.json';

// // Optimized Product Card Component (Memoized) - EXACT SAME STYLING
// const ProductCard = memo(({ 
//   product, 
//   isHovered, 
//   onMouseEnter, 
//   onMouseLeave,
//   bluePrimary,
//   blueSecondary,
//   renderStars 
// }) => {
//   const { ref, inView } = useInView({
//     triggerOnce: true,
//     rootMargin: '200px 0px',
//   });

//   return (
//     <div
//       ref={ref}
//       className="relative group h-full"
//       onMouseEnter={() => onMouseEnter(product.id)}
//       onMouseLeave={onMouseLeave}
//     >
//       <div className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col ${
//         isHovered ? 'transform -translate-y-2' : ''
//       }`}>
//         {/* Product Image with Lazy Loading */}
//         <div className="relative overflow-hidden h-56 flex-shrink-0">
//           {inView ? (
//             <img
//               src={product.image}
//               alt={product.name}
//               loading="lazy"
//               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//               onError={(e) => {
//                 e.target.src = 'https://via.placeholder.com/400x400?text=Product+Image';
//               }}
//             />
//           ) : (
//             <div className="w-full h-full bg-gray-200 animate-pulse"></div>
//           )}
          
//           {/* Badges */}
//           <div className="absolute top-3 left-3 flex flex-col gap-2">
//             {product.isNew && (
//               <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full animate-pulse">
//                 NEW
//               </span>
//             )}
//             {product.discount > 0 && (
//               <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
//                 -{product.discount}%
//               </span>
//             )}
//             {product.isFeatured && (
//               <span 
//                 className="px-3 py-1 text-white text-xs font-bold rounded-full"
//                 style={{ background: `linear-gradient(135deg, ${bluePrimary}, ${blueSecondary})` }}
//               >
//                 FEATURED
//               </span>
//             )}
//           </div>

//           {/* Quick Actions Overlay */}
//           <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
//             isHovered ? 'opacity-100' : ''
//           }`}>
//             <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
//                     style={{ color: bluePrimary }}>
//               <FiShoppingCart className="text-xl" />
//             </button>
//             <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
//                     style={{ color: bluePrimary }}>
//               <FiHeart className="text-xl" />
//             </button>
//             <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
//                     style={{ color: bluePrimary }}>
//               <FiEye className="text-xl" />
//             </button>
//           </div>
//         </div>

//         {/* Product Info */}
//         <div className="p-5 flex-grow flex flex-col">
//           {/* Category */}
//           <div className="flex items-center justify-between mb-2">
//             <span 
//               className="text-xs font-medium px-2 py-1 rounded"
//               style={{ 
//                 color: bluePrimary,
//                 background: `rgba(0, 42, 100, 0.1)`
//               }}
//             >
//               {product.category}
//             </span>
//             <span className={`text-xs font-medium px-2 py-1 rounded ${
//               product.stock > 20 
//                 ? 'text-green-600 bg-green-100' 
//                 : product.stock > 0 
//                   ? 'text-amber-600 bg-amber-100' 
//                   : 'text-red-600 bg-red-100'
//             }`}>
//               {product.stock > 20 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
//             </span>
//           </div>

//           {/* Product Name */}
//           <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors"
//               style={{ color: bluePrimary }}>
//             {product.name}
//           </h3>

//           {/* Description */}
//           <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
//             {product.description}
//           </p>

//           {/* Rating */}
//           <div className="flex items-center justify-between mb-4">
//             {renderStars(product.rating)}
//             <span className="text-sm text-gray-500">
//               ({product.reviewCount} reviews)
//             </span>
//           </div>

//           {/* Price */}
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-baseline gap-2">
//               <span className="text-2xl font-bold text-gray-900">
//                 ${product.price.toFixed(2)}
//               </span>
//               {product.originalPrice > product.price && (
//                 <span className="text-lg text-gray-400 line-through">
//                   ${product.originalPrice.toFixed(2)}
//                 </span>
//               )}
//             </div>
//             <div className="text-sm text-gray-500">
//               You save: <span className="font-bold text-green-600">${(product.originalPrice - product.price).toFixed(2)}</span>
//             </div>
//           </div>

//           {/* Features */}
//           <div className="flex flex-wrap gap-2 mb-6">
//             {product.features.slice(0, 3).map((feature, index) => (
//               <span
//                 key={index}
//                 className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
//               >
//                 {feature}
//               </span>
//             ))}
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-2 mt-auto">
//             <button className="flex-1 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group/btn text-white"
//                     style={{ background: `linear-gradient(135deg, ${bluePrimary}, ${blueSecondary})` }}>
//               <FiShoppingCart />
//               Add to Cart
//               <FiArrowRight className="opacity-0 group-hover/btn:opacity-100 transition-all" />
//             </button>
//             <button className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center text-gray-600 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
//                     style={{ color: bluePrimary }}>
//               <FiHeart />
//             </button>
//           </div>

//           {/* Additional Info */}
//           <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-2 text-xs text-gray-500">
//             <div className="flex items-center gap-1">
//               <FiTruck className="text-green-500" />
//               Free Shipping
//             </div>
//             <div className="flex items-center gap-1">
//               <FiShield className="text-blue-500" />
//               2-Year Warranty
//             </div>
//             <div className="flex items-center gap-1">
//               <FiClock className="text-amber-500" />
//               30-Day Return
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }, isEqual);

// // Main Component
// const ProductSlider = () => {
//   const [products, setProducts] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const [hoveredProduct, setHoveredProduct] = useState(null);
//   const [visibleCount, setVisibleCount] = useState(4);
//   const [filter, setFilter] = useState('all');
//   const [sortBy, setSortBy] = useState('featured');
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [mounted, setMounted] = useState(false);
  
//   const autoPlayRef = useRef(null);
//   const sliderContainerRef = useRef(null);
//   const sliderRef = useRef(null);

//   // Define blue colors
//   const bluePrimary = 'rgb(0, 42, 100)';
//   const blueSecondary = 'rgb(0, 61, 130)';
//   const blueDark = 'rgb(0, 18, 36)';

//   // Load products
//   useEffect(() => {
//     setProducts(productsData);
//     setMounted(true);
//   }, []);

//   // Debounced resize handler
//   useEffect(() => {
//     let timeoutId;
//     const updateVisibleCount = () => {
//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(() => {
//         const width = window.innerWidth;
//         if (width < 640) setVisibleCount(1);
//         else if (width < 768) setVisibleCount(2);
//         else if (width < 1024) setVisibleCount(3);
//         else setVisibleCount(4);
//       }, 100);
//     };

//     updateVisibleCount();
//     window.addEventListener('resize', updateVisibleCount);
//     return () => {
//       window.removeEventListener('resize', updateVisibleCount);
//       clearTimeout(timeoutId);
//     };
//   }, []);

//   // Memoized filters and sorting
//   const filteredProducts = useMemo(() => {
//     return products.filter(product => {
//       if (filter === 'all') return true;
//       if (filter === 'featured') return product.isFeatured;
//       if (filter === 'new') return product.isNew;
//       return product.category.toLowerCase() === filter.toLowerCase();
//     });
//   }, [products, filter]);

//   const sortedProducts = useMemo(() => {
//     return [...filteredProducts].sort((a, b) => {
//       switch (sortBy) {
//         case 'price-low':
//           return a.price - b.price;
//         case 'price-high':
//           return b.price - a.price;
//         case 'rating':
//           return b.rating - a.rating;
//         case 'discount':
//           return b.discount - a.discount;
//         default:
//           return b.isFeatured - a.isFeatured;
//       }
//     });
//   }, [filteredProducts, sortBy]);

//   // Calculate visible products with sliding animation
//   const getVisibleProducts = useCallback(() => {
//     if (sortedProducts.length === 0) return [];
    
//     const totalProducts = sortedProducts.length;
    
//     // If we have fewer products than visible count, just show all
//     if (totalProducts <= visibleCount) {
//       return sortedProducts;
//     }
    
//     // Always show exactly visibleCount number of products
//     const visible = [];
//     for (let i = 0; i < visibleCount; i++) {
//       const productIndex = (currentIndex + i) % totalProducts;
//       visible.push({
//         ...sortedProducts[productIndex],
//         key: `${sortedProducts[productIndex].id}-${currentIndex}-${i}`
//       });
//     }
    
//     return visible;
//   }, [currentIndex, sortedProducts, visibleCount]);

//   const visibleProducts = getVisibleProducts();

//   // Auto-play slider with cleanup
//   useEffect(() => {
//     if (!isAutoPlaying || isTransitioning) return;

//     autoPlayRef.current = setInterval(() => {
//       handleNextSlide();
//     }, 4000);

//     return () => {
//       if (autoPlayRef.current) {
//         clearInterval(autoPlayRef.current);
//       }
//     };
//   }, [isAutoPlaying, isTransitioning, sortedProducts.length, visibleCount]);

//   // Optimized slide handlers
//   const handleNextSlide = useCallback(() => {
//     if (sortedProducts.length <= visibleCount || isTransitioning) return;
    
//     setIsTransitioning(true);
    
//     const newIndex = currentIndex >= sortedProducts.length - visibleCount 
//       ? 0 
//       : currentIndex + 1;
    
//     setCurrentIndex(newIndex);
    
//     setTimeout(() => {
//       setIsTransitioning(false);
//     }, 500);
//   }, [currentIndex, sortedProducts.length, visibleCount, isTransitioning]);

//   const handlePrevSlide = useCallback(() => {
//     if (sortedProducts.length <= visibleCount || isTransitioning) return;
    
//     setIsTransitioning(true);
    
//     const newIndex = currentIndex === 0 
//       ? Math.max(0, sortedProducts.length - visibleCount)
//       : currentIndex - 1;
    
//     setCurrentIndex(newIndex);
    
//     setTimeout(() => {
//       setIsTransitioning(false);
//     }, 500);
//   }, [currentIndex, sortedProducts.length, visibleCount, isTransitioning]);

//   const toggleAutoPlay = () => {
//     setIsAutoPlaying(!isAutoPlaying);
//   };

//   const goToSlide = useCallback((index) => {
//     if (isTransitioning) return;
    
//     setIsTransitioning(true);
//     const newIndex = Math.min(index, sortedProducts.length - visibleCount);
//     setCurrentIndex(newIndex);
    
//     setTimeout(() => {
//       setIsTransitioning(false);
//     }, 500);
//   }, [isTransitioning, sortedProducts.length, visibleCount]);

//   // Memoized render functions
//   const renderStars = useCallback((rating) => {
//     return (
//       <div className="flex items-center">
//         {[...Array(5)].map((_, i) => (
//           <FiStar
//             key={i}
//             className={`${
//               i < Math.floor(rating)
//                 ? 'text-yellow-400 fill-current'
//                 : 'text-gray-300'
//             } ${i === Math.floor(rating) && rating % 1 !== 0 ? 'text-yellow-400 fill-current opacity-50' : ''}`}
//           />
//         ))}
//         <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
//       </div>
//     );
//   }, []);

//   const categories = useMemo(() => [
//     { id: 'all', label: 'All Products', count: products.length },
//     { id: 'featured', label: 'Featured', count: products.filter(p => p.isFeatured).length },
//     { id: 'new', label: 'New Arrivals', count: products.filter(p => p.isNew).length },
//     { id: 'smartphones', label: 'Smartphones', count: products.filter(p => p.category === 'Smartphones').length },
//     { id: 'laptops', label: 'Laptops', count: products.filter(p => p.category === 'Laptops').length },
//     { id: 'televisions', label: 'TVs', count: products.filter(p => p.category === 'Televisions').length }
//   ], [products]);

//   // Calculate slides
//   const totalSlides = Math.max(1, Math.ceil(sortedProducts.length / visibleCount));
//   const currentSlide = Math.floor(currentIndex / visibleCount);

//   if (!mounted) return null;

//   return (
//     <section className="py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden"  >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <div 
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-pulse"
//             style={{ 
//               background: `linear-gradient(135deg, ${bluePrimary}10, ${blueSecondary}20)`,
//               color: bluePrimary
//             }}
//           >
//             <FiZap className="text-lg" />
//             HOT DEALS & PRODUCTS
//           </div>
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             Featured <span style={{ color: bluePrimary }}>Products</span>
//           </h2>
//           <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//             Discover our carefully curated selection of premium electronics with exclusive deals
//           </p>
//         </div>

//         {/* Controls Section */}
//         <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
//           {/* Filter Buttons */}
//           <div className="flex flex-wrap gap-2 justify-center">
//             {categories.map(category => (
//               <button
//                 key={category.id}
//                 onClick={() => {
//                   setFilter(category.id);
//                   setCurrentIndex(0);
//                 }}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
//                   filter === category.id
//                     ? 'text-white shadow-lg transform scale-105'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//                 style={filter === category.id ? { 
//                   background: `linear-gradient(135deg, ${bluePrimary}, ${blueSecondary})`
//                 } : {}}
//               >
//                 {category.label}
//                 <span className="ml-1 px-1.5 py-0.5 rounded-full text-xs"
//                       style={filter === category.id ? { 
//                         background: 'rgba(255, 255, 255, 0.3)' 
//                       } : { background: 'rgba(255, 255, 255, 0.7)' }}>
//                   {category.count}
//                 </span>
//               </button>
//             ))}
//           </div>

//           {/* Sort Controls */}
//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-2 bg-white rounded-lg p-2 shadow-sm">
//               <FiGrid className="text-gray-500" />
//               <select
//                 value={sortBy}
//                 onChange={(e) => {
//                   setSortBy(e.target.value);
//                   setCurrentIndex(0);
//                 }}
//                 className="bg-transparent border-none focus:outline-none text-sm font-medium"
//               >
//                 <option value="featured">Featured</option>
//                 <option value="price-low">Price: Low to High</option>
//                 <option value="price-high">Price: High to Low</option>
//                 <option value="rating">Top Rated</option>
//                 <option value="discount">Best Discount</option>
//               </select>
//             </div>

//             {/* Auto-play toggle */}
//             <button
//               onClick={toggleAutoPlay}
//               className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
//                 isAutoPlaying
//                   ? 'text-green-700 hover:bg-green-200'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//               style={isAutoPlaying ? { background: `rgba(0, 128, 0, 0.1)` } : {}}
//             >
//               {isAutoPlaying ? <FiPause /> : <FiPlay />}
//               <span className="text-sm font-medium">
//                 {isAutoPlaying ? 'Pause' : 'Auto Play'}
//               </span>
//             </button>
//           </div>
//         </div>

//         {/* Slider Container */}
//         <div 
//           ref={sliderContainerRef}
//           className="relative overflow-hidden rounded-2xl p-6"
//           style={{ 
//             background: `linear-gradient(to right, ${bluePrimary}05, ${blueSecondary}10)`
//           }}
//         >
//           {/* Navigation Arrows */}
//           <button
//             onClick={handlePrevSlide}
//             className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
//             style={{ color: bluePrimary }}
//             disabled={sortedProducts.length <= visibleCount || isTransitioning}
//           >
//             <FiChevronLeft className="text-2xl" />
//           </button>

//           <button
//             onClick={handleNextSlide}
//             className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
//             style={{ color: bluePrimary }}
//             disabled={sortedProducts.length <= visibleCount || isTransitioning}
//           >
//             <FiChevronRight className="text-2xl" />
//           </button>

//           {/* Horizontal Product Cards Grid */}
//           <div
//             ref={sliderRef}
//             className={`grid gap-6 transition-all duration-500 ease-in-out ${
//               isTransitioning ? 'pointer-events-none' : ''
//             }`}
//             style={{
//               gridTemplateColumns: `repeat(${visibleCount}, minmax(0, 1fr))`
//             }}
//           >
//             {visibleProducts.map((product) => (
//               <ProductCard
//                 key={product.key}
//                 product={product}
//                 isHovered={hoveredProduct === product.id}
//                 onMouseEnter={setHoveredProduct}
//                 onMouseLeave={() => setHoveredProduct(null)}
//                 bluePrimary={bluePrimary}
//                 blueSecondary={blueSecondary}
//                 renderStars={renderStars}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Optimized Slider Indicators */}
//         <div className="flex flex-col items-center gap-4 mt-8">
//           {/* Main Slider Dots (one per visible group) */}
//           <div className="flex items-center gap-2">
//             {Array.from({ length: totalSlides }).map((_, index) => (
//               <button
//                 key={`slide-${index}`}
//                 onClick={() => goToSlide(index * visibleCount)}
//                 className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                   currentSlide === index
//                     ? 'w-8'
//                     : 'bg-gray-300 hover:bg-gray-400'
//                 }`}
//                 style={currentSlide === index ? { 
//                   background: `linear-gradient(135deg, ${bluePrimary}, ${blueSecondary})`
//                 } : {}}
//                 aria-label={`Go to slide group ${index + 1}`}
//               />
//             ))}
//           </div>
          
//           {/* Display Info */}
//           <div className="text-sm text-gray-600 whitespace-nowrap mt-2">
//             {sortedProducts.length > 0 ? (
//               <>
//                 Showing products {Math.min(currentIndex + 1, sortedProducts.length)}-
//                 {Math.min(currentIndex + visibleCount, sortedProducts.length)} of {sortedProducts.length}
//                 <span className="font-semibold ml-1" style={{ color: bluePrimary }}>
//                   (Slide {currentSlide + 1} of {totalSlides})
//                 </span>
//               </>
//             ) : (
//               'No products available'
//             )}
//           </div>
//         </div>

//         {/* Quick Stats */}
//         <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6" >
//           <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300" >
//             <FiTag className="text-3xl mx-auto mb-3" style={{ color: bluePrimary }} />
//             <div className="text-2xl font-bold text-gray-900">
//               {products.filter(p => p.discount > 0).length}+
//             </div>
//             <div className="text-gray-600">Discounted Products</div>
//           </div>
          
//           <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
//             <FiStar className="text-3xl text-yellow-500 mx-auto mb-3" />
//             <div className="text-2xl font-bold text-gray-900">
//               {products.filter(p => p.rating >= 4.5).length}+
//             </div>
//             <div className="text-gray-600">Top Rated Products</div>
//           </div>
          
//           <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
//             <FiZap className="text-3xl text-green-500 mx-auto mb-3" />
//             <div className="text-2xl font-bold text-gray-900">
//               {products.filter(p => p.isNew).length}+
//             </div>
//             <div className="text-gray-600">New Arrivals</div>
//           </div>
          
//           <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
//             <FiCheck className="text-3xl text-blue-500 mx-auto mb-3" />
//             <div className="text-2xl font-bold text-gray-900">100%</div>
//             <div className="text-gray-600">Quality Guaranteed</div>
//           </div>
//         </div>

//         {/* View All Products CTA */}
//         <div className="mt-12 text-center">
//           <button className="inline-flex items-center gap-2 px-8 py-4 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
//                   style={{ background: `linear-gradient(135deg, ${bluePrimary}, ${blueSecondary})` }}>
//             View All Products
//             <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
//           </button>
//           <p className="mt-4 text-gray-600">
//             Discover our complete collection of {products.length}+ premium electronics
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default memo(ProductSlider);
