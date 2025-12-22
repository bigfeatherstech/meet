// pages/ProductPage.js
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiSearch, 
  FiFilter, 
  FiGrid, 
  FiList, 
  FiStar, 
  FiShoppingCart, 
  FiHeart, 
  FiEye,
  FiChevronRight,
  FiChevronLeft,
  FiCheck,
  FiX,
  FiShoppingBag,
  FiChevronDown,
  FiTrendingUp,
  FiTrendingDown,
  FiClock,
  FiRefreshCw 
} from 'react-icons/fi';
import { 
  IoFlashOutline, 
  IoRibbonOutline, 
  IoSparklesOutline,
  IoCartOutline
} from 'react-icons/io5';
import { 
  MdLocalShipping, 
  MdVerified, 
  MdWorkspacePremium,
  MdOutlineCompareArrows
} from 'react-icons/md';
import { 
  TbArrowsSort, 
  TbTruckDelivery,
  TbBrandAmazon
} from 'react-icons/tb';
import { 
  BsLightningChargeFill, 
  BsClockHistory,
  BsShieldCheck,
  BsGraphUpArrow
} from 'react-icons/bs';
import { 
  AiOutlinePercentage,
  AiOutlineFire,
  AiOutlineThunderbolt
} from 'react-icons/ai';

// Import your product data
import productData from '../DATA/data.json';

const ProductPage = () => {
  // State management
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [discountFilter, setDiscountFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [stockStatus, setStockStatus] = useState('all');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [selectedSort, setSelectedSort] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);

  // Calculate delivery date (3 days from now)
  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    setDeliveryDate(date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    }));
  }, []);

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Remove duplicates and keep only first 10 unique products
        const uniqueProducts = productData
          .filter((product, index, self) =>
            index === self.findIndex(p => p.id === product.id)
          )
          .slice(0, 10);
        
        setProducts(uniqueProducts);
        setFilteredProducts(uniqueProducts);
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Extract categories and subcategories
  const categories = useMemo(() => {
    const allCategories = ['all', ...new Set(products.map(p => p.category))];
    return allCategories;
  }, [products]);

  const subCategories = useMemo(() => {
    if (selectedCategory === 'all') return ['all'];
    const subs = products
      .filter(p => p.category === selectedCategory)
      .map(p => p.subCategory || p.category);
    return ['all', ...new Set(subs)];
  }, [products, selectedCategory]);

  // Advanced filtering with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      let filtered = [...products];

      // Search
      if (searchQuery) {
        filtered = filtered.filter(p =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }

      // Category filter
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(p => p.category === selectedCategory);
      }

      // Sub-category filter
      if (selectedSubCategory !== 'all') {
        filtered = filtered.filter(p => p.subCategory === selectedSubCategory || p.category === selectedSubCategory);
      }

      // Price range
      filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

      // Rating filter
      if (ratingFilter > 0) {
        filtered = filtered.filter(p => p.rating >= ratingFilter);
      }

      // Discount filter
      if (discountFilter > 0) {
        filtered = filtered.filter(p => p.discount >= discountFilter);
      }

      // Stock status
      if (stockStatus !== 'all') {
        switch (stockStatus) {
          case 'in-stock':
            filtered = filtered.filter(p => p.stock > 20);
            break;
          case 'low-stock':
            filtered = filtered.filter(p => p.stock > 0 && p.stock <= 20);
            break;
          case 'out-of-stock':
            filtered = filtered.filter(p => p.stock === 0);
            break;
        }
      }

      // Sorting
      switch (selectedSort) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'discount':
          filtered.sort((a, b) => b.discount - a.discount);
          break;
        case 'newest':
          filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
          break;
        case 'popularity':
          filtered.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
        default: // 'recommended'
          filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
      }

      setFilteredProducts(filtered);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [
    products, 
    searchQuery, 
    selectedCategory, 
    selectedSubCategory, 
    priceRange, 
    ratingFilter, 
    discountFilter,
    stockStatus,
    selectedSort
  ]);

  // Calculate stats
  const stats = useMemo(() => ({
    total: products.length,
    newArrivals: products.filter(p => p.isNew).length,
    discounted: products.filter(p => p.discount > 0).length,
    avgRating: (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1),
    outOfStock: products.filter(p => p.stock === 0).length,
    lowStock: products.filter(p => p.stock > 0 && p.stock <= 5).length,
  }), [products]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Show notification
  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // Add to cart
  const handleAddToCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showNotification(`🎉 ${product.name} added to cart!`);
  }, [showNotification]);

  // Add to wishlist
  const handleAddToWishlist = useCallback((product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        showNotification(`❤️ ${product.name} removed from wishlist`, 'info');
        return prev.filter(item => item.id !== product.id);
      } else {
        showNotification(`❤️ ${product.name} added to wishlist!`);
        return [...prev, product];
      }
    });
  }, [showNotification]);

  // Add to compare
  const handleAddToCompare = useCallback((product) => {
    setCompareList(prev => {
      if (prev.length >= 4) {
        showNotification('Maximum 4 products can be compared', 'warning');
        return prev;
      }
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        showNotification(`${product.name} removed from comparison`, 'info');
        return prev.filter(item => item.id !== product.id);
      } else {
        showNotification(`📊 ${product.name} added to compare!`);
        return [...prev, product];
      }
    });
  }, [showNotification]);

  // Check pincode
  const handleCheckPincode = useCallback(() => {
    if (pinCode.length === 6) {
      showNotification(`✅ Delivery available to ${pinCode} by ${deliveryDate}`);
    } else {
      showNotification('Please enter a valid 6-digit pincode', 'warning');
    }
  }, [pinCode, deliveryDate, showNotification]);

  // Render stars with fractions
  const renderStars = useCallback((rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />;
          } else if (i === fullStars && hasHalfStar) {
            return (
              <div key={i} className="relative">
                <FiStar className="w-4 h-4 text-gray-300" />
                <FiStar className="w-4 h-4 text-yellow-400 fill-current absolute inset-0 clip-half" />
              </div>
            );
          } else {
            return <FiStar key={i} className="w-4 h-4 text-gray-300" />;
          }
        })}
        <span className="ml-2 text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
      </div>
    );
  }, []);

  // Premium Product Card
  const PremiumProductCard = ({ product }) => {
    const isInWishlist = wishlist.some(item => item.id === product.id);
    const isInCart = cart.some(item => item.id === product.id);
    const isInCompare = compareList.some(item => item.id === product.id);
    
    const savings = product.originalPrice - product.price;
    const urgencyStock = product.stock < 10;

    return (
      <div className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 border border-gray-100">
        {/* Premium Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {product.isNew && (
            <div className="relative">
              <span className="bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                <IoSparklesOutline className="w-3 h-3" />
                NEW
              </span>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
            </div>
          )}
          
          {product.discount >= 25 && (
            <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
              <AiOutlineFire className="w-3 h-3" />
              -{product.discount}%
            </span>
          )}
          
          {product.discount > 0 && product.discount < 25 && (
            <span className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              -{product.discount}%
            </span>
          )}
          
          {product.isFeatured && (
            <span className="bg-gradient-to-r from-samsung-blue to-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
              <MdWorkspacePremium className="w-3 h-3" />
              FEATURED
            </span>
          )}
        </div>

        {/* Stock Urgency Badge */}
        {urgencyStock && product.stock > 0 && (
          <div className="absolute top-4 right-4 z-20">
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
              🔥 Only {product.stock} left!
            </span>
          </div>
        )}

        {/* Quick Action Bar */}
        <div className="absolute top-16 right-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => handleAddToWishlist(product)}
            className={`p-2.5 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 ${
              isInWishlist
                ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <FiHeart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={() => handleAddToCompare(product)}
            className={`p-2.5 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 ${
              isInCompare
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            title="Compare"
          >
            <MdOutlineCompareArrows className="w-5 h-5" />
          </button>
          
          <Link
            to={`/products/${product.id}`}
            className="p-2.5 bg-white text-gray-700 rounded-full shadow-lg hover:bg-samsung-blue hover:text-white transform hover:scale-110 transition-all duration-300"
            title="View Details"
          >
            <FiEye className="w-5 h-5" />
          </Link>
        </div>

        {/* Product Image with Hover Effect */}
        <div className="relative h-72 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <Link to={`/products/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700 cursor-pointer"
              loading="lazy"
            />
          </Link>
          
          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Add to Cart Overlay */}
          <div className="absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={() => handleAddToCart(product)}
              className={`w-full py-4 font-bold text-lg transition-all duration-300 ${
                isInCart
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                  : 'bg-gradient-to-r from-samsung-blue to-blue-600 text-white hover:from-blue-600 hover:to-samsung-blue'
              }`}
            >
              {isInCart ? (
                <span className="flex items-center justify-center gap-2">
                  <FiCheck className="w-5 h-5" />
                  Added to Cart
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <FiShoppingCart className="w-5 h-5" />
                  Add to Cart
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          {/* Category & Brand */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-samsung-blue bg-blue-50 px-3 py-1 rounded-full">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <MdVerified className="w-4 h-4 text-green-500" />
              <span>Samsung Official</span>
            </div>
          </div>

          {/* Product Title */}
          <Link to={`/products/${product.id}`}>
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-samsung-blue transition-colors duration-300 cursor-pointer h-14">
              {product.name}
            </h3>
          </Link>

          {/* Rating & Reviews */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {renderStars(product.rating)}
              <span className="text-xs text-gray-500">({product.reviewCount})</span>
            </div>
            
            {/* Delivery Badge */}
            <div className="flex items-center gap-1 text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
              <TbTruckDelivery className="w-3 h-3" />
              Free Delivery
            </div>
          </div>

          {/* Price Section */}
          <div className="mb-4">
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-2xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              
              {product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-sm font-bold text-green-600">
                    Save ${savings.toFixed(2)}
                  </span>
                </>
              )}
            </div>
            
            {/* EMI Option */}
            {product.price > 500 && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">EMI:</span> From ${(product.price / 12).toFixed(2)}/month
              </div>
            )}
          </div>

          {/* Features Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {product.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors duration-200 cursor-default"
              >
                {feature}
              </span>
            ))}
            {product.features.length > 3 && (
              <span className="text-xs text-gray-500 font-medium">
                +{product.features.length - 3} more
              </span>
            )}
          </div>

          {/* Stock Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-gray-600">Sold: {Math.floor(product.reviewCount / 10)}</span>
              <span className={`font-medium ${
                product.stock > 20 ? 'text-green-600' : 
                product.stock > 5 ? 'text-amber-600' : 'text-red-600'
              }`}>
                {product.stock > 20 ? 'In Stock' : 
                 product.stock > 5 ? 'Low Stock' : 'Almost Gone'}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full ${
                  product.stock > 20 ? 'bg-green-500' : 
                  product.stock > 5 ? 'bg-amber-500' : 'bg-red-500'
                }`}
                style={{ 
                  width: `${Math.min(100, 100 - (product.stock / 100) * 100)}%` 
                }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleAddToCart(product)}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                isInCart
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-gradient-to-r from-samsung-blue to-blue-600 text-white hover:shadow-lg'
              }`}
            >
              <FiShoppingCart className="w-5 h-5" />
              {isInCart ? 'Added' : 'Add to Cart'}
            </button>
            
            <Link
              to={`/products/${product.id}`}
              className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-samsung-blue hover:text-samsung-blue hover:bg-blue-50 transition-all duration-300"
            >
              <FiEye className="w-5 h-5" />
              View Details
            </Link>
          </div>
        </div>
      </div>
    );
  };

  // Notification Component
  const PremiumNotification = () => {
    if (!notification) return null;

    return (
      <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-2xl animate-slide-in-right flex items-center gap-3 ${
        notification.type === 'success' 
          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
          : notification.type === 'warning'
          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
          : 'bg-gradient-to-r from-red-500 to-rose-600 text-white'
      }`}>
        {notification.type === 'success' ? (
          <FiCheck className="w-6 h-6" />
        ) : notification.type === 'warning' ? (
          <FiX className="w-6 h-6" />
        ) : (
          <FiHeart className="w-6 h-6 fill-current" />
        )}
        <span className="font-medium">{notification.message}</span>
      </div>
    );
  };

  // Loading Skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="samsung-container py-20">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded-xl w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded-xl"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Premium Hero Banner */}
      <section className="relative bg-gradient-to-br from-samsung-blue via-blue-700 to-purple-900 text-white py-24 md:py-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black/20" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          
          {/* Floating Elements */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full animate-float animate-delay-1000" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-purple-500/10 rounded-full animate-float animate-delay-2000" />
          
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                               linear-gradient(to bottom, white 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        <div className="samsung-container relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <TbBrandAmazon className="w-8 h-8 text-amber-400" />
              <span className="text-lg text-cyan-200">Premium Collection</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
              Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">Premium</span> Tech
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl">
              Experience innovation at its finest. Samsung's premium electronics collection with exclusive deals.
            </p>

            {/* Premium Search Bar */}
            <div className="relative max-w-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl rounded-2xl"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-2">
                <div className="flex items-center">
                  <FiSearch className="absolute left-6 text-cyan-300 w-6 h-6" />
                  <input
                    type="text"
                    placeholder="Search 10,000+ products, brands, and categories..."
                    className="w-full pl-16 pr-4 py-5 bg-transparent text-white placeholder-cyan-100 text-lg focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="absolute right-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300">
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 mt-10">
              {[
                { label: 'Live Deals', value: '24', icon: <AiOutlineFire className="w-5 h-5" /> },
                { label: 'Premium Brands', value: '50+', icon: <MdWorkspacePremium className="w-5 h-5" /> },
                { label: 'Fast Delivery', value: '2hr', icon: <BsLightningChargeFill className="w-5 h-5" /> },
                { label: 'Verified', value: '100%', icon: <MdVerified className="w-5 h-5" /> },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl">
                  {stat.icon}
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-blue-200">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Stats Dashboard */}
      <div className="relative -mt-12 samsung-container">
        <div className="bg-gradient-to-r from-white to-gray-50 rounded-3xl shadow-2xl p-8 border border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { 
                value: stats.total, 
                label: 'Total Products', 
                change: '+12%', 
                icon: <FiShoppingBag className="text-samsung-blue" />,
                trend: 'up'
              },
              { 
                value: stats.newArrivals, 
                label: 'New Arrivals', 
                change: '+5 today', 
                icon: <IoSparklesOutline className="text-emerald-500" />,
                trend: 'up'
              },
              { 
                value: `${stats.avgRating}/5`, 
                label: 'Avg Rating', 
                change: '4.8+', 
                icon: <FiStar className="text-amber-500 fill-current" />,
                trend: 'up'
              },
              { 
                value: stats.discounted, 
                label: 'On Sale', 
                change: '-60% max', 
                icon: <AiOutlinePercentage className="text-red-500" />,
                trend: 'down'
              },
              { 
                value: stats.lowStock, 
                label: 'Low Stock', 
                change: 'Hurry!', 
                icon: <BsClockHistory className="text-rose-500" />,
                trend: 'warning'
              },
              { 
                value: '100%', 
                label: 'Authentic', 
                change: 'Verified', 
                icon: <MdVerified className="text-green-500" />,
                trend: 'verified'
              },
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-50 to-white rounded-2xl mb-4 group-hover:scale-110 transition-all duration-500 shadow-lg">
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600 mb-2">{stat.label}</div>
                <div className={`text-sm font-medium inline-flex items-center gap-1 ${
                  stat.trend === 'up' ? 'text-green-600' :
                  stat.trend === 'down' ? 'text-red-600' :
                  stat.trend === 'warning' ? 'text-amber-600' : 'text-blue-600'
                }`}>
                  {stat.trend === 'up' && <FiTrendingUp className="w-4 h-4" />}
                  {stat.trend === 'down' && <FiTrendingDown className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 samsung-container">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Premium Filters Sidebar */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-6 border border-gray-200">
              {/* Filters Header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                  <p className="text-sm text-gray-600">{filteredProducts.length} products found</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedSubCategory('all');
                    setPriceRange([0, 5000]);
                    setRatingFilter(0);
                    setDiscountFilter(0);
                    setStockStatus('all');
                    setSearchQuery('');
                  }}
                  className="text-sm font-medium text-samsung-blue hover:text-blue-700 transition-colors duration-300"
                >
                  Clear All
                </button>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center justify-between">
                  <span>Categories</span>
                  <span className="text-sm text-gray-500">{products.length}</span>
                </h3>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-samsung-blue/10 to-blue-500/10 text-samsung-blue border border-samsung-blue/20'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-samsung-blue'
                      }`}
                    >
                      <span className="capitalize font-medium">{category}</span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        selectedCategory === category
                          ? 'bg-samsung-blue text-white'
                          : 'bg-gray-100 text-gray-600 group-hover:bg-samsung-blue/10 group-hover:text-samsung-blue'
                      }`}>
                        {category === 'all' 
                          ? products.length 
                          : products.filter(p => p.category === category).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-6">Price Range</h3>
                <div className="space-y-6">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">${priceRange[0]}</span>
                    <span className="font-medium text-gray-700">${priceRange[1]}</span>
                  </div>
                  <div className="relative h-2">
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="absolute w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-samsung-blue"
                    />
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="absolute w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-samsung-blue"
                    />
                  </div>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      min="0"
                      max="5000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-1/2 px-4 py-2 border border-gray-300 rounded-xl focus:border-samsung-blue focus:ring-2 focus:ring-samsung-blue/20 outline-none"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      min="0"
                      max="5000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-1/2 px-4 py-2 border border-gray-300 rounded-xl focus:border-samsung-blue focus:ring-2 focus:ring-samsung-blue/20 outline-none"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-4">Customer Rating</h3>
                <div className="space-y-2">
                  {[4.5, 4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setRatingFilter(ratingFilter === rating ? 0 : rating)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                        ratingFilter === rating
                          ? 'bg-amber-50 border border-amber-200'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center">
                        {renderStars(rating)}
                        <span className="ml-2 text-gray-600">& above</span>
                      </div>
                      <span className="ml-auto text-sm text-gray-500">
                        {products.filter(p => p.rating >= rating).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Discount Filter */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-4">Discount</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[10, 20, 30, 40, 50, '50+'].map((discount) => (
                    <button
                      key={discount}
                      onClick={() => setDiscountFilter(discount === discountFilter ? 0 : discount)}
                      className={`px-4 py-3 rounded-xl text-center transition-all duration-300 font-medium ${
                        discountFilter === discount
                          ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {discount}% & above
                    </button>
                  ))}
                </div>
              </div>

              {/* Stock Status */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-4">Stock Status</h3>
                <div className="space-y-2">
                  {[
                    { value: 'in-stock', label: 'In Stock', color: 'bg-green-500', count: stats.total - stats.lowStock - stats.outOfStock },
                    { value: 'low-stock', label: 'Low Stock', color: 'bg-amber-500', count: stats.lowStock },
                    { value: 'out-of-stock', label: 'Out of Stock', color: 'bg-gray-400', count: stats.outOfStock },
                  ].map((status) => (
                    <button
                      key={status.value}
                      onClick={() => setStockStatus(stockStatus === status.value ? 'all' : status.value)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                        stockStatus === status.value
                          ? 'bg-gray-100 border-2 border-gray-300'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${status.color}`} />
                        <span className="font-medium">{status.label}</span>
                      </div>
                      <span className="ml-auto text-sm text-gray-500">{status.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery Options */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl">
                <h4 className="font-bold text-gray-900 mb-3">Delivery by</h4>
                <div className="flex items-center gap-3 mb-3">
                  <TbTruckDelivery className="w-6 h-6 text-green-600" />
                  <div>
                    <div className="font-medium text-gray-900">{deliveryDate}</div>
                    <div className="text-sm text-gray-600">Free Standard Delivery</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  Enter pincode for exact delivery date
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:w-3/4">
            {/* Premium Controls Bar */}
            <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Results Info */}
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {selectedCategory === 'all' ? 'All Products' : selectedCategory}
                    {selectedSubCategory !== 'all' && ` • ${selectedSubCategory}`}
                  </h1>
                  <p className="text-gray-600 mt-2">
                    Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} products
                    {searchQuery && ` for "${searchQuery}"`}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  {/* Mobile Filter Toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300"
                  >
                    <FiFilter className="w-5 h-5" />
                    <span>Filters</span>
                  </button>

                  {/* View Toggle */}
                  <div className="flex items-center bg-gray-100 p-1 rounded-xl">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 rounded-lg transition-all duration-300 ${
                        viewMode === 'grid'
                          ? 'bg-white text-samsung-blue shadow-md'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <FiGrid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 rounded-lg transition-all duration-300 ${
                        viewMode === 'list'
                          ? 'bg-white text-samsung-blue shadow-md'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <FiList className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={selectedSort}
                      onChange={(e) => setSelectedSort(e.target.value)}
                      className="appearance-none bg-white border-2 border-gray-300 pl-4 pr-12 py-3 rounded-xl text-gray-700 font-medium focus:border-samsung-blue focus:outline-none focus:ring-2 focus:ring-samsung-blue/20 cursor-pointer min-w-[200px]"
                    >
                      <option value="recommended">Recommended</option>
                      <option value="popularity">Popularity</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Customer Rating</option>
                      <option value="discount">Best Discount</option>
                      <option value="newest">Newest First</option>
                    </select>
                    <TbArrowsSort className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>

                  {/* Items Per Page */}
                  <div className="relative">
                    <select
                      value={itemsPerPage}
                      onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                      className="appearance-none bg-white border-2 border-gray-300 pl-4 pr-12 py-3 rounded-xl text-gray-700 font-medium focus:border-samsung-blue focus:outline-none focus:ring-2 focus:ring-samsung-blue/20 cursor-pointer"
                    >
                      <option value={12}>12 per page</option>
                      <option value={24}>24 per page</option>
                      <option value={36}>36 per page</option>
                      <option value={48}>48 per page</option>
                    </select>
                    <FiChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {(
                selectedCategory !== 'all' || 
                ratingFilter > 0 || 
                discountFilter > 0 || 
                stockStatus !== 'all' ||
                priceRange[0] > 0 || 
                priceRange[1] < 5000
              ) && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-gray-700 font-medium">Active Filters:</span>
                    
                    {selectedCategory !== 'all' && (
                      <span className="inline-flex items-center gap-2 bg-blue-100 text-samsung-blue px-4 py-2 rounded-xl">
                        {selectedCategory}
                        <button onClick={() => setSelectedCategory('all')}>
                          <FiX className="w-4 h-4" />
                        </button>
                      </span>
                    )}
                    
                    {ratingFilter > 0 && (
                      <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-xl">
                        {ratingFilter}+ Stars
                        <button onClick={() => setRatingFilter(0)}>
                          <FiX className="w-4 h-4" />
                        </button>
                      </span>
                    )}
                    
                    {discountFilter > 0 && (
                      <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-xl">
                        {discountFilter}%+ Off
                        <button onClick={() => setDiscountFilter(0)}>
                          <FiX className="w-4 h-4" />
                        </button>
                      </span>
                    )}
                    
                    {priceRange[0] > 0 || priceRange[1] < 5000 ? (
                      <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-xl">
                        ${priceRange[0]} - ${priceRange[1]}
                        <button onClick={() => setPriceRange([0, 5000])}>
                          <FiX className="w-4 h-4" />
                        </button>
                      </span>
                    ) : null}
                  </div>
                </div>
              )}
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-16 text-center border border-gray-200">
                <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiSearch className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No products found</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  We couldn't find any products matching your search criteria. Try adjusting your filters or search term.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedSubCategory('all');
                    setPriceRange([0, 5000]);
                    setRatingFilter(0);
                    setDiscountFilter(0);
                    setStockStatus('all');
                    setSearchQuery('');
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-samsung-blue to-blue-600 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                {/* Products Display */}
                <div className={viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6' 
                  : 'space-y-4'
                }>
                  {currentProducts.map((product) => (
                    <PremiumProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Premium Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="text-gray-600">
                        Page {currentPage} of {totalPages} • {filteredProducts.length} products
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                          className="p-3 rounded-xl bg-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-gray-200"
                        >
                          <FiChevronLeft className="w-5 h-5" />
                        </button>
                        
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let page;
                          if (totalPages <= 5) {
                            page = i + 1;
                          } else if (currentPage <= 3) {
                            page = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            page = totalPages - 4 + i;
                          } else {
                            page = currentPage - 2 + i;
                          }
                          
                          return (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 min-w-[44px] ${
                                currentPage === page
                                  ? 'bg-gradient-to-r from-samsung-blue to-blue-600 text-white shadow-lg'
                                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                              }`}
                            >
                              {page}
                            </button>
                          );
                        })}
                        
                        {totalPages > 5 && currentPage < totalPages - 2 && (
                          <>
                            <span className="px-2">...</span>
                            <button
                              onClick={() => setCurrentPage(totalPages)}
                              className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                currentPage === totalPages
                                  ? 'bg-gradient-to-r from-samsung-blue to-blue-600 text-white shadow-lg'
                                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                              }`}
                            >
                              {totalPages}
                            </button>
                          </>
                        )}
                        
                        <button
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          disabled={currentPage === totalPages}
                          className="p-3 rounded-xl bg-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-gray-200"
                        >
                          <FiChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredProducts.length)} items
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Premium Features Banner */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="samsung-container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Shop With Us?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience premium shopping with benefits that put you first
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <BsShieldCheck className="w-10 h-10" />,
                title: "100% Authentic",
                description: "Genuine Samsung products with warranty",
                gradient: "from-blue-500 to-cyan-500",
                features: ["2-Year Warranty", "Brand Certified", "Genuine Parts"]
              },
              {
                icon: <MdLocalShipping className="w-10 h-10" />,
                title: "Fast & Free Delivery",
                description: "Quick doorstep delivery across India",
                gradient: "from-emerald-500 to-green-500",
                features: ["Same Day Delivery", "Free Shipping", "Track Order"]
              },
              {
                icon: <FiRefreshCw className="w-10 h-10" />,
                title: "Easy Returns",
                description: "30-day return policy, no questions asked",
                gradient: "from-purple-500 to-pink-500",
                features: ["30-Day Returns", "Free Pickup", "Instant Refunds"]
              },
              {
                icon: <BsGraphUpArrow className="w-10 h-10" />,
                title: "Best Price Guarantee",
                description: "Found it cheaper? We'll match the price",
                gradient: "from-orange-500 to-amber-500",
                features: ["Price Match", "Lowest Price", "Deal Alerts"]
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border border-gray-200"
              >
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${feature.gradient}`} />
                <div className="p-8">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-6">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <div className="w-1.5 h-1.5 bg-samsung-blue rounded-full" />
                        <span className="text-gray-700">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notification */}
      <PremiumNotification />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-4">
        {compareList.length > 0 && (
          <button
            onClick={() => showNotification('Compare feature coming soon!', 'info')}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center gap-2"
          >
            <MdOutlineCompareArrows className="w-6 h-6" />
            <span className="font-bold">Compare ({compareList.length})</span>
          </button>
        )}
        
        {wishlist.length > 0 && (
          <button
            onClick={() => showNotification('Wishlist feature coming soon!', 'info')}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center gap-2"
          >
            <FiHeart className="w-6 h-6 fill-current" />
            <span className="font-bold">Wishlist ({wishlist.length})</span>
          </button>
        )}
        
        {cart.length > 0 && (
          <button
            onClick={() => showNotification('Cart feature coming soon!', 'info')}
            className="bg-gradient-to-r from-samsung-blue to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center gap-2"
          >
            <FiShoppingCart className="w-6 h-6" />
            <span className="font-bold">Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
          </button>
        )}
      </div>

      {/* Add premium animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out forwards;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .animate-delay-1000 {
          animation-delay: 1000ms;
        }
        
        .animate-delay-2000 {
          animation-delay: 2000ms;
        }
        
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        
        .clip-half {
          clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #1428a0, #3b82f6);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #1e40af, #2563eb);
        }
      `}</style>
    </div>
  );
};

export default ProductPage;
// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import { 
//   FiSearch, 
//   FiFilter, 
//   FiGrid, 
//   FiList, 
//   FiStar, 
//   FiShoppingCart, 
//   FiHeart, 
//   FiEye,
//   FiChevronRight,
//   FiChevronLeft,
//   FiCheck,
//   FiX,
//   FiShoppingBag,
//   FiTag,
//   FiTruck,
//   FiShield,
//   FiRefreshCw,
//   FiTrendingUp,
//   FiClock,
//   FiChevronDown,
//   FiPlus,
//   FiMinus,
//   FiChevronUp,
//   FiShare2,
//   // FiCompare,
//   FiZoomIn,
//   FiPackage,
//   FiUsers,
//   FiAward,
//   FiGlobe,
//   FiBarChart2,
//   FiTrendingDown,
//   FiShoppingCart as FiCart,
//   FiPercent
// } from 'react-icons/fi';
// import { 
//   IoFlashOutline, 
//   IoRibbonOutline, 
//   IoSparklesOutline,
//   IoBarcodeOutline,
//   IoCartOutline
// } from 'react-icons/io5';
// import { 
//   MdLocalShipping, 
//   MdVerified, 
//   MdWorkspacePremium,
//   MdOutlineCompareArrows,
//   MdOutlineZoomOutMap
// } from 'react-icons/md';
// import { 
//   TbArrowsSort, 
//   // TbDiscount2, 
//   TbTruckDelivery,
//   TbBrandAmazon,
//   // TbBrandFlipkart
  
// } from 'react-icons/tb';
// import { 
//   BsLightningChargeFill, 
//   BsClockHistory,
//   BsShieldCheck,
//   BsGraphUpArrow
// } from 'react-icons/bs';
// import { 
//   AiOutlinePercentage,
//   AiOutlineFire,
//   AiOutlineThunderbolt
// } from 'react-icons/ai';

// // Import Swiper components
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Thumbs, Zoom, FreeMode } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/thumbs';
// import 'swiper/css/zoom';
// import 'swiper/css/free-mode';

// // Import your product data
// import productData from '../DATA/data.json';

// const ProductPage = () => {
//   // State management
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [viewMode, setViewMode] = useState('grid');
//   const [sortBy, setSortBy] = useState('featured');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [selectedSubCategory, setSelectedSubCategory] = useState('all');
//   const [priceRange, setPriceRange] = useState([0, 5000]);
//   const [ratingFilter, setRatingFilter] = useState(0);
//   const [discountFilter, setDiscountFilter] = useState(0);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [cart, setCart] = useState([]);
//   const [wishlist, setWishlist] = useState([]);
//   const [compareList, setCompareList] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(12);
//   const [quickViewProduct, setQuickViewProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [notification, setNotification] = useState(null);
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);
//   const [selectedVariants, setSelectedVariants] = useState({});
//   const [expandedDescription, setExpandedDescription] = useState(false);
//   const [recentlyViewed, setRecentlyViewed] = useState([]);
//   const [showFilters, setShowFilters] = useState(false);
//   const [stockStatus, setStockStatus] = useState('all');
//   const [deliveryDate, setDeliveryDate] = useState('');
//   const [pinCode, setPinCode] = useState('');
//   const [selectedSort, setSelectedSort] = useState('recommended');

//   // Calculate delivery date (3 days from now)
//   useEffect(() => {
//     const date = new Date();
//     date.setDate(date.getDate() + 3);
//     setDeliveryDate(date.toLocaleDateString('en-US', { 
//       weekday: 'long', 
//       month: 'short', 
//       day: 'numeric' 
//     }));
//   }, []);

//   // Load products
//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         // Remove duplicates and keep only first 10 unique products
//         const uniqueProducts = productData
//           .filter((product, index, self) =>
//             index === self.findIndex(p => p.id === product.id)
//           )
//           .slice(0, 10);
        
//         setProducts(uniqueProducts);
//         setFilteredProducts(uniqueProducts);
//       } catch (error) {
//         console.error('Error loading products:', error);
//         setProducts([]);
//         setFilteredProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProducts();
//   }, []);

//   // Extract categories and subcategories
//   const categories = useMemo(() => {
//     const allCategories = ['all', ...new Set(products.map(p => p.category))];
//     return allCategories;
//   }, [products]);

//   const subCategories = useMemo(() => {
//     if (selectedCategory === 'all') return ['all'];
//     const subs = products
//       .filter(p => p.category === selectedCategory)
//       .map(p => p.subCategory || p.category);
//     return ['all', ...new Set(subs)];
//   }, [products, selectedCategory]);

//   // Advanced filtering with debounce
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       let filtered = [...products];

//       // Search
//       if (searchQuery) {
//         filtered = filtered.filter(p =>
//           p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           p.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
//         );
//       }

//       // Category filter
//       if (selectedCategory !== 'all') {
//         filtered = filtered.filter(p => p.category === selectedCategory);
//       }

//       // Sub-category filter
//       if (selectedSubCategory !== 'all') {
//         filtered = filtered.filter(p => p.subCategory === selectedSubCategory || p.category === selectedSubCategory);
//       }

//       // Price range
//       filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

//       // Rating filter
//       if (ratingFilter > 0) {
//         filtered = filtered.filter(p => p.rating >= ratingFilter);
//       }

//       // Discount filter
//       if (discountFilter > 0) {
//         filtered = filtered.filter(p => p.discount >= discountFilter);
//       }

//       // Stock status
//       if (stockStatus !== 'all') {
//         switch (stockStatus) {
//           case 'in-stock':
//             filtered = filtered.filter(p => p.stock > 20);
//             break;
//           case 'low-stock':
//             filtered = filtered.filter(p => p.stock > 0 && p.stock <= 20);
//             break;
//           case 'out-of-stock':
//             filtered = filtered.filter(p => p.stock === 0);
//             break;
//         }
//       }

//       // Sorting
//       switch (selectedSort) {
//         case 'price-low':
//           filtered.sort((a, b) => a.price - b.price);
//           break;
//         case 'price-high':
//           filtered.sort((a, b) => b.price - a.price);
//           break;
//         case 'rating':
//           filtered.sort((a, b) => b.rating - a.rating);
//           break;
//         case 'discount':
//           filtered.sort((a, b) => b.discount - a.discount);
//           break;
//         case 'newest':
//           filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
//           break;
//         case 'popularity':
//           filtered.sort((a, b) => b.reviewCount - a.reviewCount);
//           break;
//         default: // 'recommended'
//           filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
//       }

//       setFilteredProducts(filtered);
//       setCurrentPage(1);
//     }, 300);

//     return () => clearTimeout(timeoutId);
//   }, [
//     products, 
//     searchQuery, 
//     selectedCategory, 
//     selectedSubCategory, 
//     priceRange, 
//     ratingFilter, 
//     discountFilter,
//     stockStatus,
//     selectedSort
//   ]);

//   // Calculate stats
//   const stats = useMemo(() => ({
//     total: products.length,
//     newArrivals: products.filter(p => p.isNew).length,
//     discounted: products.filter(p => p.discount > 0).length,
//     avgRating: (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1),
//     outOfStock: products.filter(p => p.stock === 0).length,
//     lowStock: products.filter(p => p.stock > 0 && p.stock <= 5).length,
//   }), [products]);

//   // Pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

//   // Show notification
//   const showNotification = useCallback((message, type = 'success') => {
//     setNotification({ message, type });
//     setTimeout(() => setNotification(null), 3000);
//   }, []);

//   // Add to cart
//   const handleAddToCart = useCallback((product) => {
//     setCart(prev => {
//       const existing = prev.find(item => item.id === product.id);
//       if (existing) {
//         return prev.map(item =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prev, { ...product, quantity: 1 }];
//     });
//     showNotification(`🎉 ${product.name} added to cart!`);
//   }, [showNotification]);

//   // Add to wishlist
//   const handleAddToWishlist = useCallback((product) => {
//     setWishlist(prev => {
//       const exists = prev.find(item => item.id === product.id);
//       if (exists) {
//         showNotification(`❤️ ${product.name} removed from wishlist`, 'info');
//         return prev.filter(item => item.id !== product.id);
//       } else {
//         showNotification(`❤️ ${product.name} added to wishlist!`);
//         return [...prev, product];
//       }
//     });
//   }, [showNotification]);

//   // Add to compare
//   const handleAddToCompare = useCallback((product) => {
//     setCompareList(prev => {
//       if (prev.length >= 4) {
//         showNotification('Maximum 4 products can be compared', 'warning');
//         return prev;
//       }
//       const exists = prev.find(item => item.id === product.id);
//       if (exists) {
//         showNotification(`${product.name} removed from comparison`, 'info');
//         return prev.filter(item => item.id !== product.id);
//       } else {
//         showNotification(`📊 ${product.name} added to compare!`);
//         return [...prev, product];
//       }
//     });
//   }, [showNotification]);

//   // Quick view
//   const handleQuickView = useCallback((product) => {
//     setQuickViewProduct(product);
//     // Add to recently viewed
//     setRecentlyViewed(prev => {
//       const exists = prev.find(item => item.id === product.id);
//       if (exists) return prev;
//       return [product, ...prev.slice(0, 4)];
//     });
//   }, []);

//   // Check pincode
//   const handleCheckPincode = useCallback(() => {
//     if (pinCode.length === 6) {
//       showNotification(`✅ Delivery available to ${pinCode} by ${deliveryDate}`);
//     } else {
//       showNotification('Please enter a valid 6-digit pincode', 'warning');
//     }
//   }, [pinCode, deliveryDate, showNotification]);

//   // Render stars with fractions
//   const renderStars = useCallback((rating) => {
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 >= 0.5;
    
//     return (
//       <div className="flex items-center">
//         {[...Array(5)].map((_, i) => {
//           if (i < fullStars) {
//             return <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />;
//           } else if (i === fullStars && hasHalfStar) {
//             return (
//               <div key={i} className="relative">
//                 <FiStar className="w-4 h-4 text-gray-300" />
//                 <FiStar className="w-4 h-4 text-yellow-400 fill-current absolute inset-0 clip-half" />
//               </div>
//             );
//           } else {
//             return <FiStar key={i} className="w-4 h-4 text-gray-300" />;
//           }
//         })}
//         <span className="ml-2 text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
//       </div>
//     );
//   }, []);

//   // Premium Product Card
//   const PremiumProductCard = ({ product }) => {
//     const isInWishlist = wishlist.some(item => item.id === product.id);
//     const isInCart = cart.some(item => item.id === product.id);
//     const isInCompare = compareList.some(item => item.id === product.id);
    
//     const savings = product.originalPrice - product.price;
//     const urgencyStock = product.stock < 10;

//     return (
//       <div className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 border border-gray-100">
//         {/* Premium Badges */}
//         <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
//           {product.isNew && (
//             <div className="relative">
//               <span className="bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
//                 <IoSparklesOutline className="w-3 h-3" />
//                 NEW
//               </span>
//               <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
//             </div>
//           )}
          
//           {product.discount >= 25 && (
//             <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
//               <AiOutlineFire className="w-3 h-3" />
//               -{product.discount}%
//             </span>
//           )}
          
//           {product.discount > 0 && product.discount < 25 && (
//             <span className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
//               -{product.discount}%
//             </span>
//           )}
          
//           {product.isFeatured && (
//             <span className="bg-gradient-to-r from-samsung-blue to-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
//               <MdWorkspacePremium className="w-3 h-3" />
//               FEATURED
//             </span>
//           )}
//         </div>

//         {/* Stock Urgency Badge */}
//         {urgencyStock && product.stock > 0 && (
//           <div className="absolute top-4 right-4 z-20">
//             <span className="bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
//               🔥 Only {product.stock} left!
//             </span>
//           </div>
//         )}

//         {/* Quick Action Bar */}
//         <div className="absolute top-16 right-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
//           <button
//             onClick={() => handleAddToWishlist(product)}
//             className={`p-2.5 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 ${
//               isInWishlist
//                 ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
//                 : 'bg-white text-gray-700 hover:bg-gray-50'
//             }`}
//             title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
//           >
//             <FiHeart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
//           </button>
          
//           <button
//             onClick={() => handleAddToCompare(product)}
//             className={`p-2.5 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 ${
//               isInCompare
//                 ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
//                 : 'bg-white text-gray-700 hover:bg-gray-50'
//             }`}
//             title="Compare"
//           >
//             <MdOutlineCompareArrows className="w-5 h-5" />
//           </button>
          
//           <button
//             onClick={() => handleQuickView(product)}
//             className="p-2.5 bg-white text-gray-700 rounded-full shadow-lg hover:bg-samsung-blue hover:text-white transform hover:scale-110 transition-all duration-300"
//             title="Quick view"
//           >
//             <FiEye className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Product Image with Hover Effect */}
//         <div className="relative h-72 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
//             loading="lazy"
//           />
          
//           {/* Image Overlay */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
//           {/* Add to Cart Overlay */}
//           <div className="absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
//             <button
//               onClick={() => handleAddToCart(product)}
//               className={`w-full py-4 font-bold text-lg transition-all duration-300 ${
//                 isInCart
//                   ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
//                   : 'bg-gradient-to-r from-samsung-blue to-blue-600 text-white hover:from-blue-600 hover:to-samsung-blue'
//               }`}
//             >
//               {isInCart ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <FiCheck className="w-5 h-5" />
//                   Added to Cart
//                 </span>
//               ) : (
//                 <span className="flex items-center justify-center gap-2">
//                   <FiShoppingCart className="w-5 h-5" />
//                   Add to Cart
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Product Info */}
//         <div className="p-6">
//           {/* Category & Brand */}
//           <div className="flex items-center justify-between mb-3">
//             <span className="text-sm font-medium text-samsung-blue bg-blue-50 px-3 py-1 rounded-full">
//               {product.category}
//             </span>
//             <div className="flex items-center gap-1 text-xs text-gray-500">
//               <MdVerified className="w-4 h-4 text-green-500" />
//               <span>Samsung Official</span>
//             </div>
//           </div>

//           {/* Product Title */}
//           <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-samsung-blue transition-colors duration-300 cursor-pointer h-14">
//             {product.name}
//           </h3>

//           {/* Rating & Reviews */}
//           <div className="flex items-center justify-between mb-3">
//             <div className="flex items-center gap-2">
//               {renderStars(product.rating)}
//               <span className="text-xs text-gray-500">({product.reviewCount})</span>
//             </div>
            
//             {/* Delivery Badge */}
//             <div className="flex items-center gap-1 text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
//               <TbTruckDelivery className="w-3 h-3" />
//               Free Delivery
//             </div>
//           </div>

//           {/* Price Section */}
//           <div className="mb-4">
//             <div className="flex items-baseline gap-3 mb-1">
//               <span className="text-2xl font-bold text-gray-900">
//                 ${product.price.toFixed(2)}
//               </span>
              
//               {product.originalPrice > product.price && (
//                 <>
//                   <span className="text-lg text-gray-500 line-through">
//                     ${product.originalPrice.toFixed(2)}
//                   </span>
//                   <span className="text-sm font-bold text-green-600">
//                     Save ${savings.toFixed(2)}
//                   </span>
//                 </>
//               )}
//             </div>
            
//             {/* EMI Option */}
//             {product.price > 500 && (
//               <div className="text-sm text-gray-600">
//                 <span className="font-medium">EMI:</span> From ${(product.price / 12).toFixed(2)}/month
//               </div>
//             )}
//           </div>

//           {/* Features Tags */}
//           <div className="flex flex-wrap gap-2 mb-4">
//             {product.features.slice(0, 3).map((feature, index) => (
//               <span
//                 key={index}
//                 className="text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors duration-200 cursor-default"
//               >
//                 {feature}
//               </span>
//             ))}
//             {product.features.length > 3 && (
//               <span className="text-xs text-gray-500 font-medium">
//                 +{product.features.length - 3} more
//               </span>
//             )}
//           </div>

//           {/* Stock Progress Bar */}
//           <div className="mb-4">
//             <div className="flex items-center justify-between text-xs mb-1">
//               <span className="text-gray-600">Sold: {Math.floor(product.reviewCount / 10)}</span>
//               <span className={`font-medium ${
//                 product.stock > 20 ? 'text-green-600' : 
//                 product.stock > 5 ? 'text-amber-600' : 'text-red-600'
//               }`}>
//                 {product.stock > 20 ? 'In Stock' : 
//                  product.stock > 5 ? 'Low Stock' : 'Almost Gone'}
//               </span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-1.5">
//               <div 
//                 className={`h-1.5 rounded-full ${
//                   product.stock > 20 ? 'bg-green-500' : 
//                   product.stock > 5 ? 'bg-amber-500' : 'bg-red-500'
//                 }`}
//                 style={{ 
//                   width: `${Math.min(100, 100 - (product.stock / 100) * 100)}%` 
//                 }}
//               />
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="grid grid-cols-2 gap-3">
//             <button
//               onClick={() => handleAddToCart(product)}
//               className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
//                 isInCart
//                   ? 'bg-green-100 text-green-700 hover:bg-green-200'
//                   : 'bg-gradient-to-r from-samsung-blue to-blue-600 text-white hover:shadow-lg'
//               }`}
//             >
//               <FiShoppingCart className="w-5 h-5" />
//               {isInCart ? 'Added' : 'Add to Cart'}
//             </button>
            
//             <button
//               onClick={() => handleQuickView(product)}
//               className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-samsung-blue hover:text-samsung-blue hover:bg-blue-50 transition-all duration-300"
//             >
//               <FiEye className="w-5 h-5" />
//               Quick View
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Premium Quick View Modal
//   const PremiumQuickViewModal = ({ product }) => {
//     const [quantity, setQuantity] = useState(1);
//     const [selectedImage, setSelectedImage] = useState(0);
//     const [selectedColor, setSelectedColor] = useState('black');
//     const [selectedStorage, setSelectedStorage] = useState('256GB');
    
//     const isInWishlist = wishlist.some(item => item.id === product.id);
//     const isInCart = cart.some(item => item.id === product.id);
//     const isInCompare = compareList.some(item => item.id === product.id);
    
//     const totalPrice = product.price * quantity;
//     const savings = (product.originalPrice - product.price) * quantity;

//     // Image gallery
//     const images = [
//       product.image,
//       'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop',
//       'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop',
//       'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop',
//     ];

//     // Color variants
//     const colors = [
//       { name: 'Phantom Black', value: 'black', hex: '#000000' },
//       { name: 'Cream', value: 'cream', hex: '#FFFDD0' },
//       { name: 'Graphite', value: 'graphite', hex: '#4A4A4A' },
//       { name: 'Sky Blue', value: 'blue', hex: '#87CEEB' },
//     ];

//     // Storage variants
//     const storages = ['128GB', '256GB', '512GB', '1TB'];

//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
//         <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
//           {/* Header */}
//           <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-8 py-6 rounded-t-3xl">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
//                 <div className="flex items-center gap-4 mt-2">
//                   {renderStars(product.rating)}
//                   <span className="text-gray-600">•</span>
//                   <span className="text-gray-600">{product.reviewCount} Ratings</span>
//                   <span className="text-gray-600">•</span>
//                   <span className="text-green-600 font-medium">1.2K+ Bought</span>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() => handleAddToCompare(product)}
//                   className={`p-3 rounded-xl border transition-all duration-300 ${
//                     isInCompare
//                       ? 'border-purple-500 text-purple-500 bg-purple-50'
//                       : 'border-gray-300 text-gray-700 hover:border-purple-500 hover:text-purple-500 hover:bg-purple-50'
//                   }`}
//                   title="Compare"
//                 >
//                   <MdOutlineCompareArrows className="w-5 h-5" />
//                 </button>
//                 <button
//                   onClick={() => handleAddToWishlist(product)}
//                   className={`p-3 rounded-xl border transition-all duration-300 ${
//                     isInWishlist
//                       ? 'border-red-500 text-red-500 bg-red-50'
//                       : 'border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500 hover:bg-red-50'
//                   }`}
//                   title="Wishlist"
//                 >
//                   <FiHeart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
//                 </button>
//                 <button
//                   onClick={() => setQuickViewProduct(null)}
//                   className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors duration-300"
//                 >
//                   <FiX className="w-6 h-6" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="p-8">
//             <div className="grid lg:grid-cols-2 gap-12">
//               {/* Left Column - Images */}
//               <div>
//                 {/* Main Image */}
//                 <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 mb-4">
//                   <img
//                     src={images[selectedImage]}
//                     alt={product.name}
//                     className="w-full h-full object-contain p-8"
//                   />
//                   <div className="absolute top-4 left-4 flex gap-2">
//                     {product.isNew && (
//                       <span className="bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
//                         NEW ARRIVAL
//                       </span>
//                     )}
//                     {product.discount > 0 && (
//                       <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
//                         -{product.discount}% OFF
//                       </span>
//                     )}
//                   </div>
//                   <button
//                     className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300"
//                     onClick={() => {/* Open fullscreen */}}
//                   >
//                     <FiZoomIn className="w-5 h-5" />
//                   </button>
//                 </div>

//                 {/* Thumbnail Gallery */}
//                 <div className="grid grid-cols-4 gap-3">
//                   {images.map((img, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setSelectedImage(index)}
//                       className={`relative h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
//                         selectedImage === index
//                           ? 'border-samsung-blue shadow-md'
//                           : 'border-gray-200 hover:border-gray-300'
//                       }`}
//                     >
//                       <img
//                         src={img}
//                         alt={`View ${index + 1}`}
//                         className="w-full h-full object-cover"
//                       />
//                     </button>
//                   ))}
//                 </div>

//                 {/* Color Variants */}
//                 <div className="mt-6">
//                   <h4 className="font-semibold text-gray-900 mb-3">Color:</h4>
//                   <div className="flex gap-3">
//                     {colors.map((color) => (
//                       <button
//                         key={color.value}
//                         onClick={() => setSelectedColor(color.value)}
//                         className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-300 ${
//                           selectedColor === color.value
//                             ? 'border-samsung-blue bg-blue-50'
//                             : 'border-gray-200 hover:border-gray-300'
//                         }`}
//                       >
//                         <div
//                           className="w-10 h-10 rounded-full border-2 border-gray-300"
//                           style={{ backgroundColor: color.hex }}
//                         />
//                         <span className="text-xs font-medium text-gray-700">
//                           {color.name}
//                         </span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Right Column - Details */}
//               <div>
//                 {/* Price Section */}
//                 <div className="mb-6">
//                   <div className="flex items-baseline gap-4 mb-2">
//                     <span className="text-4xl font-bold text-gray-900">
//                       ${product.price.toFixed(2)}
//                     </span>
//                     {product.originalPrice > product.price && (
//                       <span className="text-2xl text-gray-500 line-through">
//                         ${product.originalPrice.toFixed(2)}
//                       </span>
//                     )}
//                   </div>
                  
//                   {product.discount > 0 && (
//                     <div className="flex items-center gap-4">
//                       <span className="text-lg font-bold text-green-600">
//                         Save ${savings.toFixed(2)} ({product.discount}% OFF)
//                       </span>
//                       <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-bold rounded-full">
//                         Limited Time Deal
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Storage Variants */}
//                 <div className="mb-6">
//                   <h4 className="font-semibold text-gray-900 mb-3">Storage:</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {storages.map((storage) => (
//                       <button
//                         key={storage}
//                         onClick={() => setSelectedStorage(storage)}
//                         className={`px-6 py-3 rounded-xl border-2 font-medium transition-all duration-300 ${
//                           selectedStorage === storage
//                             ? 'border-samsung-blue bg-blue-50 text-samsung-blue'
//                             : 'border-gray-300 text-gray-700 hover:border-gray-400'
//                         }`}
//                       >
//                         {storage}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Features */}
//                 <div className="mb-6">
//                   <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
//                   <div className="space-y-2">
//                     {product.features.map((feature, index) => (
//                       <div key={index} className="flex items-center gap-3">
//                         <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
//                         <span className="text-gray-700">{feature}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Delivery Info */}
//                 <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl">
//                   <h4 className="font-semibold text-gray-900 mb-3">Delivery Options:</h4>
//                   <div className="space-y-3">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <MdLocalShipping className="w-5 h-5 text-green-600" />
//                         <div>
//                           <div className="font-medium">Free Delivery</div>
//                           <div className="text-sm text-gray-600">Delivered by {deliveryDate}</div>
//                         </div>
//                       </div>
//                       <div className="text-sm text-green-600 font-medium">FREE</div>
//                     </div>
                    
//                     <div className="flex items-center gap-4">
//                       <div className="relative flex-1">
//                         <input
//                           type="text"
//                           placeholder="Enter Pincode"
//                           value={pinCode}
//                           onChange={(e) => setPinCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
//                           className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-samsung-blue focus:ring-2 focus:ring-samsung-blue/20 outline-none"
//                         />
//                         {/* <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
//                       </div>
//                       <button
//                         onClick={handleCheckPincode}
//                         className="px-6 py-3 bg-samsung-blue text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 whitespace-nowrap"
//                       >
//                         Check
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Quantity & Actions */}
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-4">
//                     <span className="text-gray-700 font-medium">Quantity:</span>
//                     <div className="flex items-center border-2 border-gray-300 rounded-xl">
//                       <button
//                         onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                         className="p-3 text-gray-600 hover:text-samsung-blue hover:bg-gray-100 rounded-l-xl"
//                       >
//                         <FiMinus className="w-5 h-5" />
//                       </button>
//                       <span className="w-16 text-center text-xl font-bold">{quantity}</span>
//                       <button
//                         onClick={() => setQuantity(quantity + 1)}
//                         className="p-3 text-gray-600 hover:text-samsung-blue hover:bg-gray-100 rounded-r-xl"
//                       >
//                         <FiPlus className="w-5 h-5" />
//                       </button>
//                     </div>
//                     <div className="text-sm text-gray-600">
//                       {product.stock} available
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                     <button
//                       onClick={() => {
//                         handleAddToCart(product);
//                         setQuickViewProduct(null);
//                       }}
//                       className={`flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
//                         isInCart
//                           ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg'
//                           : 'bg-gradient-to-r from-samsung-blue to-blue-600 text-white hover:shadow-lg'
//                       }`}
//                     >
//                       <FiShoppingCart className="w-6 h-6" />
//                       {isInCart ? 'Added to Cart' : `Add to Cart - $${totalPrice.toFixed(2)}`}
//                     </button>
                    
//                     <button
//                       onClick={() => {
//                         handleAddToCart(product);
//                         setQuickViewProduct(null);
//                         showNotification('Proceeding to checkout...');
//                       }}
//                       className="flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300"
//                     >
//                       <BsLightningChargeFill className="w-6 h-6" />
//                       Buy Now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Notification Component
//   const PremiumNotification = () => {
//     if (!notification) return null;

//     return (
//       <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-2xl animate-slide-in-right flex items-center gap-3 ${
//         notification.type === 'success' 
//           ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
//           : notification.type === 'warning'
//           ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
//           : 'bg-gradient-to-r from-red-500 to-rose-600 text-white'
//       }`}>
//         {notification.type === 'success' ? (
//           <FiCheck className="w-6 h-6" />
//         ) : notification.type === 'warning' ? (
//           <FiX className="w-6 h-6" />
//         ) : (
//           <FiHeart className="w-6 h-6 fill-current" />
//         )}
//         <span className="font-medium">{notification.message}</span>
//       </div>
//     );
//   };

//   // Loading Skeleton
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//         <div className="samsung-container py-20">
//           <div className="animate-pulse">
//             <div className="h-12 bg-gray-200 rounded-xl w-1/3 mb-8"></div>
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//               {[...Array(8)].map((_, i) => (
//                 <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
//                   <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
//                   <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//                   <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
//                   <div className="h-10 bg-gray-200 rounded-xl"></div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       {/* Premium Hero Banner */}
//       <section className="relative bg-gradient-to-br from-samsung-blue via-blue-700 to-purple-900 text-white py-24 md:py-32 overflow-hidden">
//         {/* Animated Background */}
//         <div className="absolute inset-0">
//           <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black/20" />
//           <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          
//           {/* Floating Elements */}
//           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full animate-float" />
//           <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full animate-float animate-delay-1000" />
//           <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-purple-500/10 rounded-full animate-float animate-delay-2000" />
          
//           {/* Grid Pattern */}
//           <div 
//             className="absolute inset-0 opacity-10"
//             style={{
//               backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
//                                linear-gradient(to bottom, white 1px, transparent 1px)`,
//               backgroundSize: '50px 50px'
//             }}
//           />
//         </div>

//         <div className="samsung-container relative z-10">
//           <div className="max-w-4xl">
//             <div className="flex items-center gap-3 mb-4">
//               <TbBrandAmazon className="w-8 h-8 text-amber-400" />
//               {/* <TbBrandFlipkart className="w-8 h-8 text-blue-400" /> */}
//               <span className="text-lg text-cyan-200">Premium Collection</span>
//             </div>
            
//             <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
//               Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">Premium</span> Tech
//             </h1>
            
//             <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl">
//               Experience innovation at its finest. Samsung's premium electronics collection with exclusive deals.
//             </p>

//             {/* Premium Search Bar */}
//             <div className="relative max-w-2xl">
//               <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl rounded-2xl"></div>
//               <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-2">
//                 <div className="flex items-center">
//                   <FiSearch className="absolute left-6 text-cyan-300 w-6 h-6" />
//                   <input
//                     type="text"
//                     placeholder="Search 10,000+ products, brands, and categories..."
//                     className="w-full pl-16 pr-4 py-5 bg-transparent text-white placeholder-cyan-100 text-lg focus:outline-none"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                   <button className="absolute right-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300">
//                     Search
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Quick Stats */}
//             <div className="flex flex-wrap gap-6 mt-10">
//               {[
//                 { label: 'Live Deals', value: '24', icon: <AiOutlineFire className="w-5 h-5" /> },
//                 { label: 'Premium Brands', value: '50+', icon: <MdWorkspacePremium className="w-5 h-5" /> },
//                 { label: 'Fast Delivery', value: '2hr', icon: <BsLightningChargeFill className="w-5 h-5" /> },
//                 { label: 'Verified', value: '100%', icon: <MdVerified className="w-5 h-5" /> },
//               ].map((stat, i) => (
//                 <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl">
//                   {stat.icon}
//                   <div>
//                     <div className="text-2xl font-bold">{stat.value}</div>
//                     <div className="text-sm text-blue-200">{stat.label}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Premium Stats Dashboard */}
//       <div className="relative -mt-12 samsung-container">
//         <div className="bg-gradient-to-r from-white to-gray-50 rounded-3xl shadow-2xl p-8 border border-gray-200">
//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
//             {[
//               { 
//                 value: stats.total, 
//                 label: 'Total Products', 
//                 change: '+12%', 
//                 icon: <FiShoppingBag className="text-samsung-blue" />,
//                 trend: 'up'
//               },
//               { 
//                 value: stats.newArrivals, 
//                 label: 'New Arrivals', 
//                 change: '+5 today', 
//                 icon: <IoSparklesOutline className="text-emerald-500" />,
//                 trend: 'up'
//               },
//               { 
//                 value: `${stats.avgRating}/5`, 
//                 label: 'Avg Rating', 
//                 change: '4.8+', 
//                 icon: <FiStar className="text-amber-500 fill-current" />,
//                 trend: 'up'
//               },
//               { 
//                 value: stats.discounted, 
//                 label: 'On Sale', 
//                 change: '-60% max', 
//                 icon: <AiOutlinePercentage className="text-red-500" />,
//                 trend: 'down'
//               },
//               { 
//                 value: stats.lowStock, 
//                 label: 'Low Stock', 
//                 change: 'Hurry!', 
//                 icon: <BsClockHistory className="text-rose-500" />,
//                 trend: 'warning'
//               },
//               { 
//                 value: '100%', 
//                 label: 'Authentic', 
//                 change: 'Verified', 
//                 icon: <MdVerified className="text-green-500" />,
//                 trend: 'verified'
//               },
//             ].map((stat, index) => (
//               <div 
//                 key={index}
//                 className="text-center group"
//               >
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-50 to-white rounded-2xl mb-4 group-hover:scale-110 transition-all duration-500 shadow-lg">
//                   <span className="text-2xl">{stat.icon}</span>
//                 </div>
//                 <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
//                 <div className="text-gray-600 mb-2">{stat.label}</div>
//                 <div className={`text-sm font-medium inline-flex items-center gap-1 ${
//                   stat.trend === 'up' ? 'text-green-600' :
//                   stat.trend === 'down' ? 'text-red-600' :
//                   stat.trend === 'warning' ? 'text-amber-600' : 'text-blue-600'
//                 }`}>
//                   {stat.trend === 'up' && <FiTrendingUp className="w-4 h-4" />}
//                   {stat.trend === 'down' && <FiTrendingDown className="w-4 h-4" />}
//                   {stat.change}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <section className="py-16 samsung-container">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Premium Filters Sidebar */}
//           <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
//             <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-6 border border-gray-200">
//               {/* Filters Header */}
//               <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
//                 <div>
//                   <h2 className="text-xl font-bold text-gray-900">Filters</h2>
//                   <p className="text-sm text-gray-600">{filteredProducts.length} products found</p>
//                 </div>
//                 <button
//                   onClick={() => {
//                     setSelectedCategory('all');
//                     setSelectedSubCategory('all');
//                     setPriceRange([0, 5000]);
//                     setRatingFilter(0);
//                     setDiscountFilter(0);
//                     setStockStatus('all');
//                     setSearchQuery('');
//                   }}
//                   className="text-sm font-medium text-samsung-blue hover:text-blue-700 transition-colors duration-300"
//                 >
//                   Clear All
//                 </button>
//               </div>

//               {/* Categories */}
//               <div className="mb-8">
//                 <h3 className="font-bold text-gray-900 mb-4 flex items-center justify-between">
//                   <span>Categories</span>
//                   <span className="text-sm text-gray-500">{products.length}</span>
//                 </h3>
//                 <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
//                   {categories.map((category) => (
//                     <button
//                       key={category}
//                       onClick={() => setSelectedCategory(category)}
//                       className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between group ${
//                         selectedCategory === category
//                           ? 'bg-gradient-to-r from-samsung-blue/10 to-blue-500/10 text-samsung-blue border border-samsung-blue/20'
//                           : 'text-gray-700 hover:bg-gray-100 hover:text-samsung-blue'
//                       }`}
//                     >
//                       <span className="capitalize font-medium">{category}</span>
//                       <span className={`text-sm px-2 py-1 rounded-full ${
//                         selectedCategory === category
//                           ? 'bg-samsung-blue text-white'
//                           : 'bg-gray-100 text-gray-600 group-hover:bg-samsung-blue/10 group-hover:text-samsung-blue'
//                       }`}>
//                         {category === 'all' 
//                           ? products.length 
//                           : products.filter(p => p.category === category).length}
//                       </span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Price Range */}
//               <div className="mb-8">
//                 <h3 className="font-bold text-gray-900 mb-6">Price Range</h3>
//                 <div className="space-y-6">
//                   <div className="flex justify-between text-sm">
//                     <span className="font-medium text-gray-700">${priceRange[0]}</span>
//                     <span className="font-medium text-gray-700">${priceRange[1]}</span>
//                   </div>
//                   <div className="relative h-2">
//                     <input
//                       type="range"
//                       min="0"
//                       max="5000"
//                       step="100"
//                       value={priceRange[0]}
//                       onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
//                       className="absolute w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-samsung-blue"
//                     />
//                     <input
//                       type="range"
//                       min="0"
//                       max="5000"
//                       step="100"
//                       value={priceRange[1]}
//                       onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
//                       className="absolute w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-samsung-blue"
//                     />
//                   </div>
//                   <div className="flex gap-3">
//                     <input
//                       type="number"
//                       min="0"
//                       max="5000"
//                       value={priceRange[0]}
//                       onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
//                       className="w-1/2 px-4 py-2 border border-gray-300 rounded-xl focus:border-samsung-blue focus:ring-2 focus:ring-samsung-blue/20 outline-none"
//                       placeholder="Min"
//                     />
//                     <input
//                       type="number"
//                       min="0"
//                       max="5000"
//                       value={priceRange[1]}
//                       onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
//                       className="w-1/2 px-4 py-2 border border-gray-300 rounded-xl focus:border-samsung-blue focus:ring-2 focus:ring-samsung-blue/20 outline-none"
//                       placeholder="Max"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Rating Filter */}
//               <div className="mb-8">
//                 <h3 className="font-bold text-gray-900 mb-4">Customer Rating</h3>
//                 <div className="space-y-2">
//                   {[4.5, 4, 3, 2, 1].map((rating) => (
//                     <button
//                       key={rating}
//                       onClick={() => setRatingFilter(ratingFilter === rating ? 0 : rating)}
//                       className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
//                         ratingFilter === rating
//                           ? 'bg-amber-50 border border-amber-200'
//                           : 'hover:bg-gray-100'
//                       }`}
//                     >
//                       <div className="flex items-center">
//                         {renderStars(rating)}
//                         <span className="ml-2 text-gray-600">& above</span>
//                       </div>
//                       <span className="ml-auto text-sm text-gray-500">
//                         {products.filter(p => p.rating >= rating).length}
//                       </span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Discount Filter */}
//               <div className="mb-8">
//                 <h3 className="font-bold text-gray-900 mb-4">Discount</h3>
//                 <div className="grid grid-cols-2 gap-2">
//                   {[10, 20, 30, 40, 50, '50+'].map((discount) => (
//                     <button
//                       key={discount}
//                       onClick={() => setDiscountFilter(discount === discountFilter ? 0 : discount)}
//                       className={`px-4 py-3 rounded-xl text-center transition-all duration-300 font-medium ${
//                         discountFilter === discount
//                           ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
//                           : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                       }`}
//                     >
//                       {discount}% & above
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Stock Status */}
//               <div className="mb-8">
//                 <h3 className="font-bold text-gray-900 mb-4">Stock Status</h3>
//                 <div className="space-y-2">
//                   {[
//                     { value: 'in-stock', label: 'In Stock', color: 'bg-green-500', count: stats.total - stats.lowStock - stats.outOfStock },
//                     { value: 'low-stock', label: 'Low Stock', color: 'bg-amber-500', count: stats.lowStock },
//                     { value: 'out-of-stock', label: 'Out of Stock', color: 'bg-gray-400', count: stats.outOfStock },
//                   ].map((status) => (
//                     <button
//                       key={status.value}
//                       onClick={() => setStockStatus(stockStatus === status.value ? 'all' : status.value)}
//                       className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
//                         stockStatus === status.value
//                           ? 'bg-gray-100 border-2 border-gray-300'
//                           : 'hover:bg-gray-50'
//                       }`}
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className={`w-3 h-3 rounded-full ${status.color}`} />
//                         <span className="font-medium">{status.label}</span>
//                       </div>
//                       <span className="ml-auto text-sm text-gray-500">{status.count}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Delivery Options */}
//               <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl">
//                 <h4 className="font-bold text-gray-900 mb-3">Delivery by</h4>
//                 <div className="flex items-center gap-3 mb-3">
//                   <TbTruckDelivery className="w-6 h-6 text-green-600" />
//                   <div>
//                     <div className="font-medium text-gray-900">{deliveryDate}</div>
//                     <div className="text-sm text-gray-600">Free Standard Delivery</div>
//                   </div>
//                 </div>
//                 <div className="text-xs text-gray-500">
//                   Enter pincode for exact delivery date
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Products Section */}
//           <div className="lg:w-3/4">
//             {/* Premium Controls Bar */}
//             <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-gray-200">
//               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
//                 {/* Results Info */}
//                 <div>
//                   <h1 className="text-2xl font-bold text-gray-900">
//                     {selectedCategory === 'all' ? 'All Products' : selectedCategory}
//                     {selectedSubCategory !== 'all' && ` • ${selectedSubCategory}`}
//                   </h1>
//                   <p className="text-gray-600 mt-2">
//                     Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} products
//                     {searchQuery && ` for "${searchQuery}"`}
//                   </p>
//                 </div>

//                 <div className="flex flex-wrap items-center gap-4">
//                   {/* Mobile Filter Toggle */}
//                   <button
//                     onClick={() => setShowFilters(!showFilters)}
//                     className="lg:hidden flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300"
//                   >
//                     <FiFilter className="w-5 h-5" />
//                     <span>Filters</span>
//                   </button>

//                   {/* View Toggle */}
//                   <div className="flex items-center bg-gray-100 p-1 rounded-xl">
//                     <button
//                       onClick={() => setViewMode('grid')}
//                       className={`p-3 rounded-lg transition-all duration-300 ${
//                         viewMode === 'grid'
//                           ? 'bg-white text-samsung-blue shadow-md'
//                           : 'text-gray-600 hover:text-gray-900'
//                       }`}
//                     >
//                       <FiGrid className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={() => setViewMode('list')}
//                       className={`p-3 rounded-lg transition-all duration-300 ${
//                         viewMode === 'list'
//                           ? 'bg-white text-samsung-blue shadow-md'
//                           : 'text-gray-600 hover:text-gray-900'
//                       }`}
//                     >
//                       <FiList className="w-5 h-5" />
//                     </button>
//                   </div>

//                   {/* Sort Dropdown */}
//                   <div className="relative">
//                     <select
//                       value={selectedSort}
//                       onChange={(e) => setSelectedSort(e.target.value)}
//                       className="appearance-none bg-white border-2 border-gray-300 pl-4 pr-12 py-3 rounded-xl text-gray-700 font-medium focus:border-samsung-blue focus:outline-none focus:ring-2 focus:ring-samsung-blue/20 cursor-pointer min-w-[200px]"
//                     >
//                       <option value="recommended">Recommended</option>
//                       <option value="popularity">Popularity</option>
//                       <option value="price-low">Price: Low to High</option>
//                       <option value="price-high">Price: High to Low</option>
//                       <option value="rating">Customer Rating</option>
//                       <option value="discount">Best Discount</option>
//                       <option value="newest">Newest First</option>
//                     </select>
//                     <TbArrowsSort className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
//                   </div>

//                   {/* Items Per Page */}
//                   <div className="relative">
//                     <select
//                       value={itemsPerPage}
//                       onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
//                       className="appearance-none bg-white border-2 border-gray-300 pl-4 pr-12 py-3 rounded-xl text-gray-700 font-medium focus:border-samsung-blue focus:outline-none focus:ring-2 focus:ring-samsung-blue/20 cursor-pointer"
//                     >
//                       <option value={12}>12 per page</option>
//                       <option value={24}>24 per page</option>
//                       <option value={36}>36 per page</option>
//                       <option value={48}>48 per page</option>
//                     </select>
//                     <FiChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
//                   </div>
//                 </div>
//               </div>

//               {/* Active Filters */}
//               {(
//                 selectedCategory !== 'all' || 
//                 ratingFilter > 0 || 
//                 discountFilter > 0 || 
//                 stockStatus !== 'all' ||
//                 priceRange[0] > 0 || 
//                 priceRange[1] < 5000
//               ) && (
//                 <div className="mt-6 pt-6 border-t border-gray-200">
//                   <div className="flex flex-wrap items-center gap-3">
//                     <span className="text-gray-700 font-medium">Active Filters:</span>
                    
//                     {selectedCategory !== 'all' && (
//                       <span className="inline-flex items-center gap-2 bg-blue-100 text-samsung-blue px-4 py-2 rounded-xl">
//                         {selectedCategory}
//                         <button onClick={() => setSelectedCategory('all')}>
//                           <FiX className="w-4 h-4" />
//                         </button>
//                       </span>
//                     )}
                    
//                     {ratingFilter > 0 && (
//                       <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-xl">
//                         {ratingFilter}+ Stars
//                         <button onClick={() => setRatingFilter(0)}>
//                           <FiX className="w-4 h-4" />
//                         </button>
//                       </span>
//                     )}
                    
//                     {discountFilter > 0 && (
//                       <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-xl">
//                         {discountFilter}%+ Off
//                         <button onClick={() => setDiscountFilter(0)}>
//                           <FiX className="w-4 h-4" />
//                         </button>
//                       </span>
//                     )}
                    
//                     {priceRange[0] > 0 || priceRange[1] < 5000 ? (
//                       <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-xl">
//                         ${priceRange[0]} - ${priceRange[1]}
//                         <button onClick={() => setPriceRange([0, 5000])}>
//                           <FiX className="w-4 h-4" />
//                         </button>
//                       </span>
//                     ) : null}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Products Grid/List */}
//             {filteredProducts.length === 0 ? (
//               <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-16 text-center border border-gray-200">
//                 <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <FiSearch className="w-12 h-12 text-gray-400" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-3">No products found</h3>
//                 <p className="text-gray-600 mb-8 max-w-md mx-auto">
//                   We couldn't find any products matching your search criteria. Try adjusting your filters or search term.
//                 </p>
//                 <button
//                   onClick={() => {
//                     setSelectedCategory('all');
//                     setSelectedSubCategory('all');
//                     setPriceRange([0, 5000]);
//                     setRatingFilter(0);
//                     setDiscountFilter(0);
//                     setStockStatus('all');
//                     setSearchQuery('');
//                   }}
//                   className="px-8 py-4 bg-gradient-to-r from-samsung-blue to-blue-600 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300"
//                 >
//                   Reset All Filters
//                 </button>
//               </div>
//             ) : (
//               <>
//                 {/* Products Display */}
//                 <div className={viewMode === 'grid' 
//                   ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6' 
//                   : 'space-y-4'
//                 }>
//                   {currentProducts.map((product) => (
//                     <PremiumProductCard key={product.id} product={product} />
//                   ))}
//                 </div>

//                 {/* Premium Pagination */}
//                 {totalPages > 1 && (
//                   <div className="mt-12">
//                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
//                       <div className="text-gray-600">
//                         Page {currentPage} of {totalPages} • {filteredProducts.length} products
//                       </div>
                      
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//                           disabled={currentPage === 1}
//                           className="p-3 rounded-xl bg-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-gray-200"
//                         >
//                           <FiChevronLeft className="w-5 h-5" />
//                         </button>
                        
//                         {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                           let page;
//                           if (totalPages <= 5) {
//                             page = i + 1;
//                           } else if (currentPage <= 3) {
//                             page = i + 1;
//                           } else if (currentPage >= totalPages - 2) {
//                             page = totalPages - 4 + i;
//                           } else {
//                             page = currentPage - 2 + i;
//                           }
                          
//                           return (
//                             <button
//                               key={page}
//                               onClick={() => setCurrentPage(page)}
//                               className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 min-w-[44px] ${
//                                 currentPage === page
//                                   ? 'bg-gradient-to-r from-samsung-blue to-blue-600 text-white shadow-lg'
//                                   : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
//                               }`}
//                             >
//                               {page}
//                             </button>
//                           );
//                         })}
                        
//                         {totalPages > 5 && currentPage < totalPages - 2 && (
//                           <>
//                             <span className="px-2">...</span>
//                             <button
//                               onClick={() => setCurrentPage(totalPages)}
//                               className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
//                                 currentPage === totalPages
//                                   ? 'bg-gradient-to-r from-samsung-blue to-blue-600 text-white shadow-lg'
//                                   : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
//                               }`}
//                             >
//                               {totalPages}
//                             </button>
//                           </>
//                         )}
                        
//                         <button
//                           onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
//                           disabled={currentPage === totalPages}
//                           className="p-3 rounded-xl bg-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-gray-200"
//                         >
//                           <FiChevronRight className="w-5 h-5" />
//                         </button>
//                       </div>
                      
//                       <div className="text-sm text-gray-600">
//                         Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredProducts.length)} items
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Premium Features Banner */}
//       <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
//         <div className="samsung-container">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Shop With Us?</h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Experience premium shopping with benefits that put you first
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {[
//               {
//                 icon: <BsShieldCheck className="w-10 h-10" />,
//                 title: "100% Authentic",
//                 description: "Genuine Samsung products with warranty",
//                 gradient: "from-blue-500 to-cyan-500",
//                 features: ["2-Year Warranty", "Brand Certified", "Genuine Parts"]
//               },
//               {
//                 icon: <MdLocalShipping className="w-10 h-10" />,
//                 title: "Fast & Free Delivery",
//                 description: "Quick doorstep delivery across India",
//                 gradient: "from-emerald-500 to-green-500",
//                 features: ["Same Day Delivery", "Free Shipping", "Track Order"]
//               },
//               {
//                 icon: <FiRefreshCw className="w-10 h-10" />,
//                 title: "Easy Returns",
//                 description: "30-day return policy, no questions asked",
//                 gradient: "from-purple-500 to-pink-500",
//                 features: ["30-Day Returns", "Free Pickup", "Instant Refunds"]
//               },
//               {
//                 icon: <BsGraphUpArrow className="w-10 h-10" />,
//                 title: "Best Price Guarantee",
//                 description: "Found it cheaper? We'll match the price",
//                 gradient: "from-orange-500 to-amber-500",
//                 features: ["Price Match", "Lowest Price", "Deal Alerts"]
//               }
//             ].map((feature, index) => (
//               <div 
//                 key={index}
//                 className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border border-gray-200"
//               >
//                 <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${feature.gradient}`} />
//                 <div className="p-8">
//                   <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-500`}>
//                     {feature.icon}
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
//                   <p className="text-gray-600 mb-6">{feature.description}</p>
//                   <div className="space-y-2">
//                     {feature.features.map((feat, i) => (
//                       <div key={i} className="flex items-center gap-3 text-sm">
//                         <div className="w-1.5 h-1.5 bg-samsung-blue rounded-full" />
//                         <span className="text-gray-700">{feat}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Quick View Modal */}
//       {quickViewProduct && <PremiumQuickViewModal product={quickViewProduct} />}

//       {/* Notification */}
//       <PremiumNotification />

//       {/* Floating Action Buttons */}
//       <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-4">
//         {compareList.length > 0 && (
//           <button
//             onClick={() => showNotification('Compare feature coming soon!', 'info')}
//             className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center gap-2"
//           >
//             <MdOutlineCompareArrows className="w-6 h-6" />
//             <span className="font-bold">Compare ({compareList.length})</span>
//           </button>
//         )}
        
//         {wishlist.length > 0 && (
//           <button
//             onClick={() => showNotification('Wishlist feature coming soon!', 'info')}
//             className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center gap-2"
//           >
//             <FiHeart className="w-6 h-6 fill-current" />
//             <span className="font-bold">Wishlist ({wishlist.length})</span>
//           </button>
//         )}
        
//         {cart.length > 0 && (
//           <button
//             onClick={() => showNotification('Cart feature coming soon!', 'info')}
//             className="bg-gradient-to-r from-samsung-blue to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center gap-2"
//           >
//             <FiShoppingCart className="w-6 h-6" />
//             <span className="font-bold">Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
//           </button>
//         )}
//       </div>

//       {/* Add premium animations */}
//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes slideInRight {
//           from {
//             opacity: 0;
//             transform: translateX(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0) rotate(0deg);
//           }
//           50% {
//             transform: translateY(-20px) rotate(180deg);
//           }
//         }
        
//         @keyframes pulse {
//           0%, 100% {
//             opacity: 1;
//           }
//           50% {
//             opacity: 0.7;
//           }
//         }
        
//         .animate-fade-in-up {
//           animation: fadeInUp 0.8s ease-out forwards;
//         }
        
//         .animate-slide-in-right {
//           animation: slideInRight 0.3s ease-out forwards;
//         }
        
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
        
//         .animate-pulse {
//           animation: pulse 2s ease-in-out infinite;
//         }
        
//         .animate-delay-1000 {
//           animation-delay: 1000ms;
//         }
        
//         .animate-delay-2000 {
//           animation-delay: 2000ms;
//         }
        
//         .line-clamp-2 {
//           overflow: hidden;
//           display: -webkit-box;
//           -webkit-box-orient: vertical;
//           -webkit-line-clamp: 2;
//         }
        
//         .clip-half {
//           clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
//         }
        
//         /* Custom scrollbar */
//         ::-webkit-scrollbar {
//           width: 8px;
//         }
        
//         ::-webkit-scrollbar-track {
//           background: #f1f1f1;
//           border-radius: 4px;
//         }
        
//         ::-webkit-scrollbar-thumb {
//           background: linear-gradient(to bottom, #1428a0, #3b82f6);
//           border-radius: 4px;
//         }
        
//         ::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(to bottom, #1e40af, #2563eb);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProductPage;