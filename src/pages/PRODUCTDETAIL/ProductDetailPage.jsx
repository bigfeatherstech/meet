
// pages/ProductDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FiStar,
  FiShoppingCart,
  FiHeart,
  FiChevronLeft,
  FiCheck,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiShare2,
  FiZoomIn,
  FiMinus,
  FiPlus,
  FiArrowLeft
} from 'react-icons/fi';
import {
  MdLocalShipping,
  MdVerified,
  MdOutlineCompareArrows
} from 'react-icons/md';
import {
  BsLightningChargeFill,
  BsShieldCheck
} from 'react-icons/bs';
import { IoSparklesOutline } from 'react-icons/io5';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import productData from '../../DATA/data.json';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedStorage, setSelectedStorage] = useState('256GB');
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [pinCode, setPinCode] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  useEffect(() => {
    const loadProduct = () => {
      try {
        const foundProduct = productData.find(p => p.id.toString() === productId);
        setProduct(foundProduct);
        
        // Calculate delivery date (3 days from now)
        const date = new Date();
        date.setDate(date.getDate() + 3);
        setDeliveryDate(date.toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'short', 
          day: 'numeric' 
        }));
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  const images = product ? [
    product.image,
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop',
  ] : [];

  const colors = [
    { name: 'Phantom Black', value: 'black', hex: '#000000' },
    { name: 'Cream', value: 'cream', hex: '#FFFDD0' },
    { name: 'Graphite', value: 'graphite', hex: '#4A4A4A' },
    { name: 'Sky Blue', value: 'blue', hex: '#87CEEB' },
  ];

  const storages = ['128GB', '256GB', '512GB', '1TB'];

  const handleAddToCart = () => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    alert(`🎉 ${product.name} added to cart!`);
  };

  const handleAddToWishlist = () => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        alert(`❤️ ${product.name} removed from wishlist`);
        return prev.filter(item => item.id !== product.id);
      } else {
        alert(`❤️ ${product.name} added to wishlist!`);
        return [...prev, product];
      }
    });
  };

  const handleCheckPincode = () => {
    if (pinCode.length === 6) {
      alert(`✅ Delivery available to ${pinCode} by ${deliveryDate}`);
    } else {
      alert('Please enter a valid 6-digit pincode');
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />;
          } else if (i === fullStars && hasHalfStar) {
            return (
              <div key={i} className="relative">
                <FiStar className="w-5 h-5 text-gray-300" />
                <FiStar className="w-5 h-5 text-yellow-400 fill-current absolute inset-0 clip-half" />
              </div>
            );
          } else {
            return <FiStar key={i} className="w-5 h-5 text-gray-300" />;
          }
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="samsung-container">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="h-96 bg-gray-200 rounded-2xl"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-10 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="samsung-container text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiArrowLeft className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-samsung-blue text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
          >
            Go Back to Products
          </button>
        </div>
      </div>
    );
  }

  const isInWishlist = wishlist.some(item => item.id === product.id);
  const isInCart = cart.some(item => item.id === product.id);
  const totalPrice = product.price * quantity;
  const savingsAmount = (product.originalPrice - product.price) * quantity;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="samsung-container py-4">
          <div className="flex items-center text-sm text-gray-600">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 hover:text-samsung-blue transition-colors duration-300"
            >
              <FiChevronLeft className="w-4 h-4" />
              Back to Products
            </button>
            <span className="mx-2">/</span>
            <span className="capitalize">{product.category}</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="samsung-container py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div>
            {/* Badges */}
            <div className="flex gap-3 mb-6">
              {product.isNew && (
                <span className="bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2">
                  <IoSparklesOutline className="w-4 h-4" />
                  NEW ARRIVAL
                </span>
              )}
              {product.discount > 0 && (
                <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold px-4 py-2 rounded-full">
                  -{product.discount}% OFF
                </span>
              )}
              {product.isFeatured && (
                <span className="bg-gradient-to-r from-samsung-blue to-blue-600 text-white text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2">
                  <MdVerified className="w-4 h-4" />
                  FEATURED
                </span>
              )}
            </div>

            {/* Main Image Swiper */}
            <div className="mb-4">
              <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Navigation, Thumbs]}
                className="rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
              >
                {images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className="h-[500px] flex items-center justify-center p-8">
                      <img
                        src={img}
                        alt={`${product.name} view ${index + 1}`}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Thumbnail Swiper */}
            <div className="px-4">
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={12}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs]}
              >
                {images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className={`h-24 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                      selectedImage === index ? 'border-samsung-blue' : 'border-transparent'
                    }`}>
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Color Variants */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Color:</h3>
              <div className="flex gap-4">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-300 ${
                      selectedColor === color.value
                        ? 'border-samsung-blue bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div
                      className="w-12 h-12 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div>
            {/* Product Info */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  {renderStars(product.rating)}
                  <span className="text-gray-600">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{product.reviewCount} Ratings</span>
                <span className="text-gray-400">•</span>
                <span className="text-green-600 font-medium">1.2K+ Sold</span>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-medium text-samsung-blue bg-blue-50 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MdVerified className="w-4 h-4 text-green-500" />
                  <span>Samsung Official</span>
                </div>
              </div>
            </div>

            {/* Price Section */}
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-2xl text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              {product.discount > 0 && (
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-green-600">
                    Save ${savingsAmount.toFixed(2)} ({product.discount}% OFF)
                  </span>
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-bold rounded-full">
                    Limited Time Deal
                  </span>
                </div>
              )}
              
              {product.price > 500 && (
                <div className="text-lg text-gray-700 mt-3">
                  <span className="font-medium">EMI:</span> From ${(product.price / 12).toFixed(2)}/month
                </div>
              )}
            </div>

            {/* Storage Variants */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Storage:</h3>
              <div className="flex flex-wrap gap-3">
                {storages.map((storage) => (
                  <button
                    key={storage}
                    onClick={() => setSelectedStorage(storage)}
                    className={`px-6 py-3 rounded-xl border-2 font-medium transition-all duration-300 ${
                      selectedStorage === storage
                        ? 'border-samsung-blue bg-blue-50 text-samsung-blue'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {storage}
                  </button>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features:</h3>
              <div className="space-y-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Info */}
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FiTruck className="w-5 h-5" />
                Delivery Options
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MdLocalShipping className="w-6 h-6 text-green-600" />
                    <div>
                      <div className="font-medium text-gray-900">Free Standard Delivery</div>
                      <div className="text-sm text-gray-600">Delivered by {deliveryDate}</div>
                    </div>
                  </div>
                  <div className="text-sm text-green-600 font-medium">FREE</div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Enter Pincode"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-samsung-blue focus:ring-2 focus:ring-samsung-blue/20 outline-none"
                    />
                  </div>
                  <button
                    onClick={handleCheckPincode}
                    className="px-6 py-3 bg-samsung-blue text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 whitespace-nowrap"
                  >
                    Check
                  </button>
                </div>
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium">Quantity:</span>
                <div className="flex items-center border-2 border-gray-300 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-gray-600 hover:text-samsung-blue hover:bg-gray-100 rounded-l-xl"
                  >
                    <FiMinus className="w-5 h-5" />
                  </button>
                  <span className="w-16 text-center text-xl font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-gray-600 hover:text-samsung-blue hover:bg-gray-100 rounded-r-xl"
                  >
                    <FiPlus className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  {product.stock} items available
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={handleAddToCart}
                  className={`flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                    isInCart
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg'
                      : 'bg-gradient-to-r from-samsung-blue to-blue-600 text-white hover:shadow-lg'
                  }`}
                >
                  <FiShoppingCart className="w-6 h-6" />
                  {isInCart ? 'Added to Cart' : `Add to Cart - $${totalPrice.toFixed(2)}`}
                </button>
                
                <button
                  onClick={() => {
                    handleAddToCart();
                    alert('Proceeding to checkout...');
                  }}
                  className="flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300"
                >
                  <BsLightningChargeFill className="w-6 h-6" />
                  Buy Now
                </button>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToWishlist}
                  className={`flex items-center justify-center gap-2 py-3 px-6 rounded-xl border transition-all duration-300 ${
                    isInWishlist
                      ? 'border-red-500 text-red-500 bg-red-50'
                      : 'border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500 hover:bg-red-50'
                  }`}
                >
                  <FiHeart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
                  {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                </button>
                
                <button
                  onClick={() => alert('Share feature coming soon!')}
                  className="flex items-center justify-center gap-2 py-3 px-6 border border-gray-300 text-gray-700 rounded-xl hover:border-samsung-blue hover:text-samsung-blue hover:bg-blue-50 transition-all duration-300"
                >
                  <FiShare2 className="w-5 h-5" />
                  Share
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                <FiShield className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">2 Year Warranty</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                <FiRefreshCw className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">30 Day Returns</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                <BsShieldCheck className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Genuine Product</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
                <MdLocalShipping className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Free Shipping</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-12 bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Description</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-4">
              Experience the pinnacle of technology with the {product.name}. This premium device combines 
              cutting-edge features with elegant design to deliver an unparalleled user experience.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Advanced processor for seamless performance</span>
              </li>
              <li className="flex items-start gap-2">
                <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Crystal-clear display with vibrant colors</span>
              </li>
              <li className="flex items-start gap-2">
                <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Long-lasting battery life for all-day use</span>
              </li>
              <li className="flex items-start gap-2">
                <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Premium build quality with durable materials</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-8 bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">General</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Brand</span>
                    <span className="font-medium">Samsung</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Model</span>
                    <span className="font-medium">{product.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Color</span>
                    <span className="font-medium">{colors.find(c => c.value === selectedColor)?.name}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Display</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Size</span>
                    <span className="font-medium">6.7 inches</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Resolution</span>
                    <span className="font-medium">QHD+</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Storage</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Internal Storage</span>
                    <span className="font-medium">{selectedStorage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">RAM</span>
                    <span className="font-medium">8GB</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Battery</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Capacity</span>
                    <span className="font-medium">5000 mAh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Charging</span>
                    <span className="font-medium">Fast Charging 45W</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;