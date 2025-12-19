// import React, { useState, useEffect, useRef, useCallback } from 'react';
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
// import productsData from '../../DATA/data.json';

// const ProductSlider = () => {
//   const [products, setProducts] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const [hoveredProduct, setHoveredProduct] = useState(null);
//   const [visibleCount, setVisibleCount] = useState(4);
//   const [filter, setFilter] = useState('all');
//   const [sortBy, setSortBy] = useState('featured');
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const sliderRef = useRef(null);
//   const autoPlayRef = useRef(null);
//   const containerRef = useRef(null);

//   // Load products
//   useEffect(() => {
//     setProducts(productsData);
//   }, []);

//   // Update visible count based on screen size
//   useEffect(() => {
//     const updateVisibleCount = () => {
//       if (window.innerWidth < 640) {
//         setVisibleCount(1);
//       } else if (window.innerWidth < 768) {
//         setVisibleCount(2);
//       } else if (window.innerWidth < 1024) {
//         setVisibleCount(3);
//       } else {
//         setVisibleCount(4);
//       }
//     };

//     updateVisibleCount();
//     window.addEventListener('resize', updateVisibleCount);
//     return () => window.removeEventListener('resize', updateVisibleCount);
//   }, []);

//   // Filter products based on selection
//   const filteredProducts = products.filter(product => {
//     if (filter === 'all') return true;
//     if (filter === 'featured') return product.isFeatured;
//     if (filter === 'new') return product.isNew;
//     return product.category.toLowerCase() === filter.toLowerCase();
//   });

//   // Sort products
//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     switch (sortBy) {
//       case 'price-low':
//         return a.price - b.price;
//       case 'price-high':
//         return b.price - a.price;
//       case 'rating':
//         return b.rating - a.rating;
//       case 'discount':
//         return b.discount - a.discount;
//       default:
//         return b.isFeatured - a.isFeatured;
//     }
//   });

//   // Auto-play slider
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

//   // Smooth slide handler
//   const handleNextSlide = useCallback(() => {
//     if (sortedProducts.length <= visibleCount || isTransitioning) return;
    
//     setIsTransitioning(true);
    
//     if (currentIndex >= sortedProducts.length - visibleCount) {
//       // Wrap to beginning
//       setCurrentIndex(0);
//     } else {
//       setCurrentIndex(prev => prev + 1);
//     }
    
//     // Reset transition state after animation completes
//     setTimeout(() => {
//       setIsTransitioning(false);
//     }, 500);
//   }, [currentIndex, sortedProducts.length, visibleCount, isTransitioning]);

//   const handlePrevSlide = () => {
//     if (sortedProducts.length <= visibleCount || isTransitioning) return;
    
//     setIsTransitioning(true);
    
//     if (currentIndex === 0) {
//       // Wrap to end
//       setCurrentIndex(Math.max(0, sortedProducts.length - visibleCount));
//     } else {
//       setCurrentIndex(prev => prev - 1);
//     }
    
//     setTimeout(() => {
//       setIsTransitioning(false);
//     }, 500);
//   };

//   const toggleAutoPlay = () => {
//     setIsAutoPlaying(!isAutoPlaying);
//   };

//   const goToSlide = (index) => {
//     if (isTransitioning) return;
    
//     setIsTransitioning(true);
//     setCurrentIndex(Math.min(index, sortedProducts.length - visibleCount));
    
//     setTimeout(() => {
//       setIsTransitioning(false);
//     }, 500);
//   };

//   // Calculate visible products for smooth transition
//   const getVisibleProducts = useCallback(() => {
//     if (sortedProducts.length === 0) return [];
    
//     const visible = [];
//     const totalProducts = sortedProducts.length;
    
//     // If we have fewer products than visible count, just show all
//     if (totalProducts <= visibleCount) {
//       return sortedProducts;
//     }
    
//     // Always show exactly visibleCount number of products
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

//   const renderStars = (rating) => {
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
//   };

//   const categories = [
//     { id: 'all', label: 'All Products', count: products.length },
//     { id: 'featured', label: 'Featured', count: products.filter(p => p.isFeatured).length },
//     { id: 'new', label: 'New Arrivals', count: products.filter(p => p.isNew).length },
//     { id: 'smartphones', label: 'Smartphones', count: products.filter(p => p.category === 'Smartphones').length },
//     { id: 'laptops', label: 'Laptops', count: products.filter(p => p.category === 'Laptops').length },
//     { id: 'televisions', label: 'TVs', count: products.filter(p => p.category === 'Televisions').length }
//   ];

//   // Calculate total number of slides
//   const totalSlides = Math.max(1, Math.ceil(sortedProducts.length / visibleCount));
//   const currentSlide = Math.floor(currentIndex / visibleCount);

//   return (
//     <section className="py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-samsung-blue/10 text-samsung-blue rounded-full text-sm font-semibold mb-4 animate-pulse">
//             <FiZap className="text-lg" />
//             HOT DEALS & PRODUCTS
//           </div>
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             Featured <span className="text-samsung-blue">Products</span>
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
//                     ? 'bg-samsung-blue text-white shadow-lg transform scale-105'
//                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                 }`}
//               >
//                 {category.label}
//                 <span className="ml-1 px-1.5 py-0.5 bg-white/30 rounded-full text-xs">
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
//                   ? 'bg-green-100 text-green-700 hover:bg-green-200'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
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
//           ref={containerRef}
//           className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-samsung-blue/5 to-blue-50/50 p-6"
//         >
//           {/* Navigation Arrows */}
//           <button
//             onClick={handlePrevSlide}
//             className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-samsung-blue hover:bg-samsung-blue hover:text-white transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
//             disabled={sortedProducts.length <= visibleCount || isTransitioning}
//           >
//             <FiChevronLeft className="text-2xl" />
//           </button>

//           <button
//             onClick={handleNextSlide}
//             className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-samsung-blue hover:bg-samsung-blue hover:text-white transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
//             disabled={sortedProducts.length <= visibleCount || isTransitioning}
//           >
//             <FiChevronRight className="text-2xl" />
//           </button>

//           {/* Product Cards Grid */}
//           <div
//             ref={sliderRef}
//             className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-500 ease-in-out ${
//               isTransitioning ? 'pointer-events-none' : ''
//             }`}
//           >
//             {visibleProducts.map((product, index) => (
//               <div
//                 key={product.key}
//                 className="relative group"
//                 onMouseEnter={() => setHoveredProduct(product.id)}
//                 onMouseLeave={() => setHoveredProduct(null)}
//               >
//                 <div className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${
//                   hoveredProduct === product.id ? 'transform -translate-y-2' : ''
//                 }`}>
//                   {/* Product Image with Overlay */}
//                   <div className="relative overflow-hidden h-56">
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                     />
                    
//                     {/* Badges */}
//                     <div className="absolute top-3 left-3 flex flex-col gap-2">
//                       {product.isNew && (
//                         <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full animate-pulse">
//                           NEW
//                         </span>
//                       )}
//                       {product.discount > 0 && (
//                         <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
//                           -{product.discount}%
//                         </span>
//                       )}
//                       {product.isFeatured && (
//                         <span className="px-3 py-1 bg-samsung-blue text-white text-xs font-bold rounded-full">
//                           FEATURED
//                         </span>
//                       )}
//                     </div>

//                     {/* Quick Actions Overlay */}
//                     <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
//                       hoveredProduct === product.id ? 'opacity-100' : ''
//                     }`}>
//                       <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-samsung-blue hover:bg-samsung-blue hover:text-white transition-all duration-300 transform hover:scale-110">
//                         <FiShoppingCart className="text-xl" />
//                       </button>
//                       <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-samsung-blue hover:bg-samsung-blue hover:text-white transition-all duration-300 transform hover:scale-110">
//                         <FiHeart className="text-xl" />
//                       </button>
//                       <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-samsung-blue hover:bg-samsung-blue hover:text-white transition-all duration-300 transform hover:scale-110">
//                         <FiEye className="text-xl" />
//                       </button>
//                     </div>
//                   </div>

//                   {/* Product Info */}
//                   <div className="p-5">
//                     {/* Category */}
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="text-xs font-medium text-samsung-blue bg-samsung-blue/10 px-2 py-1 rounded">
//                         {product.category}
//                       </span>
//                       <span className={`text-xs font-medium px-2 py-1 rounded ${
//                         product.stock > 20 
//                           ? 'text-green-600 bg-green-100' 
//                           : product.stock > 0 
//                             ? 'text-amber-600 bg-amber-100' 
//                             : 'text-red-600 bg-red-100'
//                       }`}>
//                         {product.stock > 20 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
//                       </span>
//                     </div>

//                     {/* Product Name */}
//                     <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1 group-hover:text-samsung-blue transition-colors">
//                       {product.name}
//                     </h3>

//                     {/* Description */}
//                     <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                       {product.description}
//                     </p>

//                     {/* Rating */}
//                     <div className="flex items-center justify-between mb-4">
//                       {renderStars(product.rating)}
//                       <span className="text-sm text-gray-500">
//                         ({product.reviewCount} reviews)
//                       </span>
//                     </div>

//                     {/* Price */}
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="flex items-baseline gap-2">
//                         <span className="text-2xl font-bold text-gray-900">
//                           ${product.price.toFixed(2)}
//                         </span>
//                         {product.originalPrice > product.price && (
//                           <span className="text-lg text-gray-400 line-through">
//                             ${product.originalPrice.toFixed(2)}
//                           </span>
//                         )}
//                       </div>
//                       <div className="text-sm text-gray-500">
//                         You save: <span className="font-bold text-green-600">${(product.originalPrice - product.price).toFixed(2)}</span>
//                       </div>
//                     </div>

//                     {/* Features */}
//                     <div className="flex flex-wrap gap-2 mb-6">
//                       {product.features.slice(0, 3).map((feature, index) => (
//                         <span
//                           key={index}
//                           className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
//                         >
//                           {feature}
//                         </span>
//                       ))}
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex gap-2">
//                       <button className="flex-1 bg-samsung-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group/btn">
//                         <FiShoppingCart />
//                         Add to Cart
//                         <FiArrowRight className="opacity-0 group-hover/btn:opacity-100 transition-all" />
//                       </button>
//                       <button className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center text-gray-600 hover:border-samsung-blue hover:text-samsung-blue transition-all duration-300">
//                         <FiHeart />
//                       </button>
//                     </div>

//                     {/* Additional Info */}
//                     <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-2 text-xs text-gray-500">
//                       <div className="flex items-center gap-1">
//                         <FiTruck className="text-green-500" />
//                         Free Shipping
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <FiShield className="text-blue-500" />
//                         2-Year Warranty
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <FiClock className="text-amber-500" />
//                         30-Day Return
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Slider Indicators - TWO LEVEL SYSTEM */}
//         <div className="flex flex-col items-center gap-4 mt-8">
//           {/* Main Slider Dots (one per visible group) */}
//           <div className="flex items-center gap-2">
//             {Array.from({ length: totalSlides }).map((_, index) => (
//               <button
//                 key={`slide-${index}`}
//                 onClick={() => goToSlide(index * visibleCount)}
//                 className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                   currentSlide === index
//                     ? 'w-8 bg-samsung-blue'
//                     : 'bg-gray-300 hover:bg-gray-400'
//                 }`}
//                 aria-label={`Go to slide group ${index + 1}`}
//               />
//             ))}
//           </div>
          
//           {/* Product Dots (one per product) - Shows all products as mini indicators */}
//           <div className="flex flex-wrap justify-center items-center gap-1 max-w-full">
//             {sortedProducts.length > 0 ? (
//               sortedProducts.map((_, index) => (
//                 <button
//                   key={`product-${index}`}
//                   onClick={() => goToSlide(Math.min(index, sortedProducts.length - visibleCount))}
//                   className={`w-1.5 h-1.5 rounded-full transition-all duration-300 hover:scale-125 ${
//                     index >= currentIndex && index < currentIndex + visibleCount
//                       ? currentIndex === index
//                         ? 'w-2.5 h-2.5 bg-samsung-blue'
//                         : 'bg-samsung-blue/70'
//                       : 'bg-gray-200 hover:bg-gray-300'
//                   }`}
//                   aria-label={`Go to product ${index + 1}`}
//                   title={`Product ${index + 1}`}
//                 />
//               ))
//             ) : (
//               <div className="text-gray-500 text-sm">No products found</div>
//             )}
//           </div>
          
//           {/* Display Info */}
//           <div className="text-sm text-gray-600 whitespace-nowrap mt-2">
//             {sortedProducts.length > 0 ? (
//               <>
//                 Showing products {Math.min(currentIndex + 1, sortedProducts.length)}-
//                 {Math.min(currentIndex + visibleCount, sortedProducts.length)} of {sortedProducts.length}
//                 <span className="text-samsung-blue font-semibold ml-1">
//                   (Slide {currentSlide + 1} of {totalSlides})
//                 </span>
//               </>
//             ) : (
//               'No products available'
//             )}
//           </div>
//         </div>

//         {/* Quick Stats */}
//         <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
//           <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
//             <FiTag className="text-3xl text-samsung-blue mx-auto mb-3" />
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
//           <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-samsung-blue to-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
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

// export default ProductSlider;








import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiStar, 
  FiShoppingCart, 
  FiHeart, 
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
  FiGrid
} from 'react-icons/fi';
import productsData from '../../DATA/data.json';

const ProductSlider = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef(null);
  const autoPlayRef = useRef(null);
  const containerRef = useRef(null);

  // Define blue colors
  const bluePrimary = 'rgb(0, 42, 100)';
  const blueSecondary = 'rgb(0, 61, 130)';
  const blueDark = 'rgb(0, 18, 36)';

  // Load products
  useEffect(() => {
    setProducts(productsData);
  }, []);

  // Update visible count based on screen size
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 768) {
        setVisibleCount(2);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(3);
      } else {
        setVisibleCount(4);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  // Filter products based on selection
  const filteredProducts = products.filter(product => {
    if (filter === 'all') return true;
    if (filter === 'featured') return product.isFeatured;
    if (filter === 'new') return product.isNew;
    return product.category.toLowerCase() === filter.toLowerCase();
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
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

  // Auto-play slider
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

  // Smooth slide handler
  const handleNextSlide = useCallback(() => {
    if (sortedProducts.length <= visibleCount || isTransitioning) return;
    
    setIsTransitioning(true);
    
    if (currentIndex >= sortedProducts.length - visibleCount) {
      // Wrap to beginning
      setCurrentIndex(0);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }, [currentIndex, sortedProducts.length, visibleCount, isTransitioning]);

  const handlePrevSlide = () => {
    if (sortedProducts.length <= visibleCount || isTransitioning) return;
    
    setIsTransitioning(true);
    
    if (currentIndex === 0) {
      // Wrap to end
      setCurrentIndex(Math.max(0, sortedProducts.length - visibleCount));
    } else {
      setCurrentIndex(prev => prev - 1);
    }
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const goToSlide = (index) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(Math.min(index, sortedProducts.length - visibleCount));
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  // Calculate visible products for smooth transition
  const getVisibleProducts = useCallback(() => {
    if (sortedProducts.length === 0) return [];
    
    const visible = [];
    const totalProducts = sortedProducts.length;
    
    // If we have fewer products than visible count, just show all
    if (totalProducts <= visibleCount) {
      return sortedProducts;
    }
    
    // Always show exactly visibleCount number of products
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

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`${
              i < Math.floor(rating)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            } ${i === Math.floor(rating) && rating % 1 !== 0 ? 'text-yellow-400 fill-current opacity-50' : ''}`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const categories = [
    { id: 'all', label: 'All Products', count: products.length },
    { id: 'featured', label: 'Featured', count: products.filter(p => p.isFeatured).length },
    { id: 'new', label: 'New Arrivals', count: products.filter(p => p.isNew).length },
    { id: 'smartphones', label: 'Smartphones', count: products.filter(p => p.category === 'Smartphones').length },
    { id: 'laptops', label: 'Laptops', count: products.filter(p => p.category === 'Laptops').length },
    { id: 'televisions', label: 'TVs', count: products.filter(p => p.category === 'Televisions').length }
  ];

  // Calculate total number of slides
  const totalSlides = Math.max(1, Math.ceil(sortedProducts.length / visibleCount));
  const currentSlide = Math.floor(currentIndex / visibleCount);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-pulse"
            style={{ 
              background: `linear-gradient(135deg, ${bluePrimary}10, ${blueSecondary}20)`,
              color: bluePrimary
            }}
          >
            <FiZap className="text-lg" />
            HOT DEALS & PRODUCTS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured <span style={{ color: bluePrimary }}>Products</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our carefully curated selection of premium electronics with exclusive deals
          </p>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  setFilter(category.id);
                  setCurrentIndex(0);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === category.id
                    ? 'text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={filter === category.id ? { 
                  background: `linear-gradient(135deg, ${bluePrimary}, ${blueSecondary})`
                } : {}}
              >
                {category.label}
                <span className="ml-1 px-1.5 py-0.5 rounded-full text-xs"
                      style={filter === category.id ? { 
                        background: 'rgba(255, 255, 255, 0.3)' 
                      } : { background: 'rgba(255, 255, 255, 0.7)' }}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white rounded-lg p-2 shadow-sm">
              <FiGrid className="text-gray-500" />
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

            {/* Auto-play toggle */}
            <button
              onClick={toggleAutoPlay}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isAutoPlaying
                  ? 'text-green-700 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={isAutoPlaying ? { background: `rgba(0, 128, 0, 0.1)` } : {}}
            >
              {isAutoPlaying ? <FiPause /> : <FiPlay />}
              <span className="text-sm font-medium">
                {isAutoPlaying ? 'Pause' : 'Auto Play'}
              </span>
            </button>
          </div>
        </div>

        {/* Slider Container */}
        <div 
          ref={containerRef}
          className="relative overflow-hidden rounded-2xl p-6"
          style={{ 
            background: `linear-gradient(to right, ${bluePrimary}05, ${blueSecondary}10)`
          }}
        >
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{ color: bluePrimary }}
            disabled={sortedProducts.length <= visibleCount || isTransitioning}
          >
            <FiChevronLeft className="text-2xl" />
          </button>

          <button
            onClick={handleNextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{ color: bluePrimary }}
            disabled={sortedProducts.length <= visibleCount || isTransitioning}
          >
            <FiChevronRight className="text-2xl" />
          </button>

          {/* Product Cards Grid */}
          <div
            ref={sliderRef}
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-500 ease-in-out ${
              isTransitioning ? 'pointer-events-none' : ''
            }`}
          >
            {visibleProducts.map((product, index) => (
              <div
                key={product.key}
                className="relative group"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${
                  hoveredProduct === product.id ? 'transform -translate-y-2' : ''
                }`}>
                  {/* Product Image with Overlay */}
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isNew && (
                        <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full animate-pulse">
                          NEW
                        </span>
                      )}
                      {product.discount > 0 && (
                        <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                          -{product.discount}%
                        </span>
                      )}
                      {product.isFeatured && (
                        <span 
                          className="px-3 py-1 text-white text-xs font-bold rounded-full"
                          style={{ background: `linear-gradient(135deg, ${bluePrimary}, ${blueSecondary})` }}
                        >
                          FEATURED
                        </span>
                      )}
                    </div>

                    {/* Quick Actions Overlay */}
                    <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      hoveredProduct === product.id ? 'opacity-100' : ''
                    }`}>
                      <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                              style={{ color: bluePrimary }}>
                        <FiShoppingCart className="text-xl" />
                      </button>
                      <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                              style={{ color: bluePrimary }}>
                        <FiHeart className="text-xl" />
                      </button>
                      <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                              style={{ color: bluePrimary }}>
                        <FiEye className="text-xl" />
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    {/* Category */}
                    <div className="flex items-center justify-between mb-2">
                      <span 
                        className="text-xs font-medium px-2 py-1 rounded"
                        style={{ 
                          color: bluePrimary,
                          background: `rgba(0, 42, 100, 0.1)`
                        }}
                      >
                        {product.category}
                      </span>
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        product.stock > 20 
                          ? 'text-green-600 bg-green-100' 
                          : product.stock > 0 
                            ? 'text-amber-600 bg-amber-100' 
                            : 'text-red-600 bg-red-100'
                      }`}>
                        {product.stock > 20 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors"
                        style={{ '--tw-text-opacity': 1, color: bluePrimary }}>
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center justify-between mb-4">
                      {renderStars(product.rating)}
                      <span className="text-sm text-gray-500">
                        ({product.reviewCount} reviews)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-lg text-gray-400 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        You save: <span className="font-bold text-green-600">${(product.originalPrice - product.price).toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.features.slice(0, 3).map((feature, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button className="flex-1 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group/btn text-white"
                              style={{ background: `linear-gradient(135deg, ${bluePrimary}, ${blueSecondary})` }}>
                        <FiShoppingCart />
                        Add to Cart
                        <FiArrowRight className="opacity-0 group-hover/btn:opacity-100 transition-all" />
                      </button>
                      <button className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center text-gray-600 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
                              style={{ '--tw-text-opacity': 1, color: bluePrimary }}>
                        <FiHeart />
                      </button>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-2 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <FiTruck className="text-green-500" />
                        Free Shipping
                      </div>
                      <div className="flex items-center gap-1">
                        <FiShield className="text-blue-500" />
                        2-Year Warranty
                      </div>
                      <div className="flex items-center gap-1">
                        <FiClock className="text-amber-500" />
                        30-Day Return
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Indicators - TWO LEVEL SYSTEM */}
        <div className="flex flex-col items-center gap-4 mt-8">
          {/* Main Slider Dots (one per visible group) */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={`slide-${index}`}
                onClick={() => goToSlide(index * visibleCount)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? 'w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                style={currentSlide === index ? { 
                  background: `linear-gradient(135deg, ${bluePrimary}, ${blueSecondary})`
                } : {}}
                aria-label={`Go to slide group ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Product Dots (one per product) - Shows all products as mini indicators */}
          <div className="flex flex-wrap justify-center items-center gap-1 max-w-full">
            {sortedProducts.length > 0 ? (
              sortedProducts.map((_, index) => (
                <button
                  key={`product-${index}`}
                  onClick={() => goToSlide(Math.min(index, sortedProducts.length - visibleCount))}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 hover:scale-125 ${
                    index >= currentIndex && index < currentIndex + visibleCount
                      ? currentIndex === index
                        ? 'w-2.5 h-2.5'
                        : ''
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  style={index >= currentIndex && index < currentIndex + visibleCount ? { 
                    background: currentIndex === index ? blueSecondary : `${blueSecondary}70`
                  } : {}}
                  aria-label={`Go to product ${index + 1}`}
                  title={`Product ${index + 1}`}
                />
              ))
            ) : (
              <div className="text-gray-500 text-sm">No products found</div>
            )}
          </div>
          
          {/* Display Info */}
          <div className="text-sm text-gray-600 whitespace-nowrap mt-2">
            {sortedProducts.length > 0 ? (
              <>
                Showing products {Math.min(currentIndex + 1, sortedProducts.length)}-
                {Math.min(currentIndex + visibleCount, sortedProducts.length)} of {sortedProducts.length}
                <span className="font-semibold ml-1" style={{ color: bluePrimary }}>
                  (Slide {currentSlide + 1} of {totalSlides})
                </span>
              </>
            ) : (
              'No products available'
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
            <FiTag className="text-3xl mx-auto mb-3" style={{ color: bluePrimary }} />
            <div className="text-2xl font-bold text-gray-900">
              {products.filter(p => p.discount > 0).length}+
            </div>
            <div className="text-gray-600">Discounted Products</div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
            <FiStar className="text-3xl text-yellow-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">
              {products.filter(p => p.rating >= 4.5).length}+
            </div>
            <div className="text-gray-600">Top Rated Products</div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
            <FiZap className="text-3xl text-green-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">
              {products.filter(p => p.isNew).length}+
            </div>
            <div className="text-gray-600">New Arrivals</div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
            <FiCheck className="text-3xl text-blue-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">100%</div>
            <div className="text-gray-600">Quality Guaranteed</div>
          </div>
        </div>

        {/* View All Products CTA */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 px-8 py-4 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
                  style={{ background: `linear-gradient(135deg, ${bluePrimary}, ${blueSecondary})` }}>
            View All Products
            <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
          <p className="mt-4 text-gray-600">
            Discover our complete collection of {products.length}+ premium electronics
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;

