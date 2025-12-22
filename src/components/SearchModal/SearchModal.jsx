import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FiSearch, FiX, FiChevronRight, FiStar, FiShoppingCart, FiSmartphone, FiTv, FiMonitor, FiHome } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const SearchModal = ({ isOpen, onClose, initialQuery = '' }) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [popularSearches, setPopularSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef(null);
  const modalRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Mock data for demonstration
  const mockProducts = [
    {
      id: 1,
      name: 'Samsung Galaxy S24 Ultra',
      category: 'Smartphones',
      price: 1299,
      rating: 4.8,
      reviews: 1243,
      image: 'https://images.samsung.com/is/image/samsung/assets/in/2401/preorder/s24ultra_PC.jpg',
      tags: ['New', '5G', '256GB'],
      icon: <FiSmartphone className="text-blue-600" size={20} />
    },
    {
      id: 2,
      name: 'Samsung Galaxy Z Flip5',
      category: 'Foldable Phones',
      price: 999,
      rating: 4.5,
      reviews: 892,
      image: 'https://images.samsung.com/is/image/samsung/assets/in/2307/z-flip5/overview/kv_PC.jpg',
      tags: ['Foldable', 'Compact'],
      icon: <FiSmartphone className="text-purple-600" size={20} />
    },
    {
      id: 3,
      name: 'Samsung Galaxy Watch6',
      category: 'Wearables',
      price: 349,
      rating: 4.6,
      reviews: 567,
      image: 'https://images.samsung.com/is/image/samsung/assets/in/2307/galaxy-watch6/kv_PC.jpg',
      tags: ['Health', 'Fitness'],
      icon: <FiSmartphone className="text-green-600" size={20} />
    },
    {
      id: 4,
      name: 'Samsung Neo QLED 8K TV',
      category: 'Televisions',
      price: 2999,
      rating: 4.9,
      reviews: 431,
      image: 'https://images.samsung.com/is/image/samsung/assets/in/qled-8k-tv/2023/01_PC.jpg',
      tags: ['8K', 'Smart TV'],
      icon: <FiTv className="text-red-600" size={20} />
    },
    {
      id: 5,
      name: 'Samsung Bespoke Refrigerator',
      category: 'Appliances',
      price: 2499,
      rating: 4.7,
      reviews: 678,
      image: 'https://images.samsung.com/is/image/samsung/assets/in/bespoke/refrigerator/overview/kv_PC.jpg',
      tags: ['Smart', 'AI'],
      icon: <FiHome className="text-indigo-600" size={20} />
    },
    {
      id: 6,
      name: 'Samsung Odyssey G9 Monitor',
      category: 'Gaming Monitors',
      price: 1499,
      rating: 4.8,
      reviews: 312,
      image: 'https://images.samsung.com/is/image/samsung/assets/in/odyssey-g9/overview/kv_PC.jpg',
      tags: ['Gaming', 'Curved'],
      icon: <FiMonitor className="text-orange-600" size={20} />
    }
  ];

  // Popular searches
  const popularSearchesList = [
    'Galaxy S24 Series',
    'QLED TV',
    'Refrigerator',
    'Washing Machine',
    'Air Conditioner',
    'Galaxy Watch',
    'Galaxy Buds',
    'Microwave Oven'
  ];

  // Initialize data
  useEffect(() => {
    setPopularSearches(popularSearchesList);
    const savedRecent = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setRecentSearches(savedRecent);
  }, []);

  // Handle search with proper debouncing
  const performSearch = useCallback((query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);
    
    // Clear any existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      const filtered = mockProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setSearchResults(filtered);
      setIsLoading(false);
    }, 500);
  }, []);

  // Handle search query changes
  useEffect(() => {
    performSearch(searchQuery);
    
    // Cleanup timeout on unmount
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, performSearch]);

  // Save recent search
  const saveRecentSearch = useCallback((query) => {
    if (!query.trim()) return;
    
    const updatedRecent = [
      query,
      ...recentSearches.filter(item => item.toLowerCase() !== query.toLowerCase())
    ].slice(0, 5);
    
    setRecentSearches(updatedRecent);
    localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));
  }, [recentSearches]);

  // Handle search submission
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      saveRecentSearch(query);
      // In real app, you would navigate to search results page
      console.log('Searching for:', query);
    }
  }, [searchQuery, saveRecentSearch]);

  // Handle search by popular item
  const handlePopularSearch = useCallback((query) => {
    setSearchQuery(query);
    saveRecentSearch(query);
    // Don't focus immediately to prevent flicker
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, [saveRecentSearch]);

  // Clear recent searches
  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  }, []);

  // Reset modal state when closed
  useEffect(() => {
    if (!isOpen) {
      setSearchResults([]);
      setIsLoading(false);
      setHasSearched(false);
    }
  }, [isOpen]);

  // Handle modal open/close
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Focus input with slight delay to prevent flicker
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      
      // Transfer initial query
      if (initialQuery) {
        setSearchQuery(initialQuery);
      }
    } else {
      // Restore body scroll
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [isOpen, initialQuery]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target) && isOpen) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Don't render if not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-start justify-center pt-20 animate-fadeIn">
      <div 
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-4 overflow-hidden animate-slideDown"
      >
        {/* Search Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Search Products</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition"
              aria-label="Close search"
            >
              <FiX size={24} />
            </button>
          </div>
          
          {/* Search Input */}
          <form onSubmit={handleSearch} className="relative">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, brands, and categories..."
              className="w-full px-6 py-4 pl-14 pr-12 text-lg rounded-full border-2 border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-200"
              autoComplete="off"
              aria-label="Search input"
            />
            <FiSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                aria-label="Clear search"
              >
                <FiX size={20} />
              </button>
            )}
          </form>
        </div>

        {/* Search Results/Content */}
        <div className="max-h-[60vh] overflow-y-auto">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
              <p className="mt-4 text-gray-600 font-medium">Searching for "{searchQuery}"...</p>
            </div>
          ) : hasSearched && searchQuery ? (
            <div className="p-6">
              {/* Results count */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  {searchResults.length} results found for "<span className="font-semibold">{searchQuery}</span>"
                </p>
                {searchResults.length > 0 && (
                  <button
                    onClick={handleSearch}
                    className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition font-medium"
                  >
                    View All Results
                  </button>
                )}
              </div>

              {/* Search Results Grid */}
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      onClick={onClose}
                      className="group p-4 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-200 transition-all duration-200"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                          {product.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition">
                                {product.name}
                              </h4>
                              <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                            </div>
                            <span className="font-bold text-gray-900">${product.price}</span>
                          </div>
                          
                          <div className="flex items-center mt-2">
                            <div className="flex items-center">
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <FiStar 
                                    key={i} 
                                    size={14} 
                                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                                  />
                                ))}
                              </div>
                              <span className="ml-2 text-sm text-gray-600">
                                {product.rating} ({product.reviews.toLocaleString()} reviews)
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mt-3">
                            {product.tags.map((tag, index) => (
                              <span 
                                key={index}
                                className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FiSearch className="mx-auto text-gray-300" size={64} />
                  <h3 className="mt-4 text-xl font-semibold text-gray-700">No results found</h3>
                  <p className="mt-2 text-gray-500">
                    Try searching with different keywords or browse our categories
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2 justify-center">
                    {popularSearches.slice(0, 4).map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handlePopularSearch(search)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Searches</h3>
                    <button
                      onClick={clearRecentSearches}
                      className="text-sm text-gray-500 hover:text-gray-700 transition"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handlePopularSearch(search)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition flex items-center group"
                      >
                        <FiSearch size={16} className="mr-2" />
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Searches</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handlePopularSearch(search)}
                      className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-700 group-hover:text-blue-600">
                          {search}
                        </span>
                        <FiChevronRight className="text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Browse Categories</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { 
                      name: 'Smartphones', 
                      count: 24, 
                      color: 'bg-blue-100 text-blue-600',
                      icon: <FiSmartphone size={24} />
                    },
                    { 
                      name: 'Televisions', 
                      count: 18, 
                      color: 'bg-purple-100 text-purple-600',
                      icon: <FiTv size={24} />
                    },
                    { 
                      name: 'Appliances', 
                      count: 42, 
                      color: 'bg-green-100 text-green-600',
                      icon: <FiHome size={24} />
                    },
                    { 
                      name: 'Computers', 
                      count: 15, 
                      color: 'bg-orange-100 text-orange-600',
                      icon: <FiMonitor size={24} />
                    },
                  ].map((category) => (
                    <button
                      key={category.name}
                      onClick={() => handlePopularSearch(category.name)}
                      className="p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow text-left group hover:border-blue-200"
                    >
                      <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                        {category.icon}
                      </div>
                      <h4 className="font-medium text-gray-900 group-hover:text-blue-600">{category.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">{category.count} products</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4 bg-gray-50">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <button onClick={() => handlePopularSearch('Galaxy S24')} className="hover:text-blue-600 transition">
              Galaxy S24
            </button>
            <button onClick={() => handlePopularSearch('QLED TV')} className="hover:text-blue-600 transition">
              QLED TV
            </button>
            <button onClick={() => handlePopularSearch('Refrigerator')} className="hover:text-blue-600 transition">
              Refrigerator
            </button>
            <button onClick={() => handlePopularSearch('Washing Machine')} className="hover:text-blue-600 transition">
              Washing Machine
            </button>
            <button onClick={() => handlePopularSearch('Air Conditioner')} className="hover:text-blue-600 transition">
              Air Conditioner
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SearchModal;