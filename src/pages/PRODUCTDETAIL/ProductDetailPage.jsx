import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
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
  FiArrowLeft,
  FiSearch,
  FiMail,
  FiPhone,
  FiArrowRight,
  FiInfo,
  FiTag,
  FiZap,
  FiPackage,
  FiClock,
  FiAlertCircle
} from 'react-icons/fi';
import {
  MdLocalShipping,
  MdVerified,
  MdOutlineCompareArrows,
  MdWorkspacePremium,
  MdOutlineDescription,
  MdOutlineFeaturedVideo
} from 'react-icons/md';
import {
  BsLightningChargeFill,
  BsShieldCheck,
  BsFillStarFill
} from 'react-icons/bs';
import { IoSparklesOutline, IoHardwareChipOutline } from 'react-icons/io5';
import { GiElectric, GiWeight } from 'react-icons/gi';
import { TbDimensions } from 'react-icons/tb';
import categoriesData from '../../DATA/data.json';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

const ProductDetailPage = () => {
  // Define the same color variables as in HeroSection
  const bluePrimary = 'rgb(0, 42, 100)';
  const blueSecondary = 'rgb(0, 61, 130)';
  const blueDark = 'rgb(0, 18, 36)';

  const { productId } = useParams(); // This will be the model number
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Phantom Black');
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [pinCode, setPinCode] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [zoomActive, setZoomActive] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    productModel: '',
    quantity: '1',
    message: '',
    preferredContact: 'email'
  });
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Enhanced product data preparation
  const prepareProductData = (productData) => {
    // Generate realistic pricing for display (but we'll hide it per client request)
    const basePrice = Math.floor(Math.random() * 50000) + 10000;
    const discount = Math.floor(Math.random() * 30) + 5;
    const finalPrice = Math.floor(basePrice * (1 - discount/100));
    
    return {
      ...productData,
      id: productData.model, // Use model as ID
      price: finalPrice,
      originalPrice: basePrice,
      discount: discount,
      rating: (Math.random() * 1.5 + 3.5).toFixed(1),
      reviewCount: Math.floor(Math.random() * 1000) + 50,
      stock: Math.floor(Math.random() * 100) + 10,
      isNew: Math.random() > 0.5,
      isFeatured: Math.random() > 0.7,
      deliveryTime: Math.floor(Math.random() * 7) + 1,
      warranty: parseInt(productData.warranty) || 2,
      features: productData.key_features || [],
      specs: {
        brand: productData.brand,
        model: productData.model,
        power: productData.power,
        voltage: productData.voltage,
        dimensions: productData.dimensions,
        weight: productData.weight,
        country_of_origin: productData.country_of_origin,
        warranty: productData.warranty
      }
    };
  };

  useEffect(() => {
    const loadProduct = () => {
      try {
        // Flatten all products from categories
        const allProducts = [];
        categoriesData.forEach(category => {
          category.products.forEach(product => {
            allProducts.push(prepareProductData({
              ...product,
              category: category.category_name
            }));
          });
        });

        // Find product by model (productId is the model)
        const foundProduct = allProducts.find(p => p.model === productId);
        
        if (foundProduct) {
          setProduct(foundProduct);
          // Pre-fill product model in enquiry form
          setEnquiryForm(prev => ({
            ...prev,
            productModel: `${foundProduct.brand} ${foundProduct.product_name} - ${foundProduct.model}`
          }));

          // Calculate delivery date (3 days from now)
          const date = new Date();
          date.setDate(date.getDate() + 3);
          setDeliveryDate(date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'short', 
            day: 'numeric' 
          }));

          // Load related products (same category)
          const related = allProducts
            .filter(p => p.category === foundProduct.category && p.model !== foundProduct.model)
            .slice(0, 8);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  // Get images from product data
  const images = product ? product.images || [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop',
  ] : [];

  const colors = [
    { name: 'Phantom Black', value: 'black', hex: '#000000' },
    { name: 'Matte White', value: 'white', hex: '#FFFFFF' },
    { name: 'Steel Gray', value: 'gray', hex: '#4A4A4A' },
    { name: 'Ocean Blue', value: 'blue', hex: '#0077BE' },
  ];

  const handleAddToCart = () => {
    if (!product) return;
    
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
    
    // Show enquiry form instead of cart notification
    document.getElementById('enquiryForm').scrollIntoView({ behavior: 'smooth' });
    alert(`📝 Please fill the enquiry form for ${product.product_name}`);
  };

  const handleAddToWishlist = () => {
    if (!product) return;
    
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        setIsInWishlist(false);
        alert(`❤️ ${product.product_name} removed from wishlist`);
        return prev.filter(item => item.id !== product.id);
      } else {
        setIsInWishlist(true);
        alert(`❤️ ${product.product_name} added to wishlist!`);
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

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!enquiryForm.name || !enquiryForm.email || !enquiryForm.phone) {
      alert('Please fill in all required fields (Name, Email, Phone)');
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Enquiry submitted:', enquiryForm);
    
    // Show success message
    setFormSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setEnquiryForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        productModel: product ? `${product.brand} ${product.product_name} - ${product.model}` : '',
        quantity: '1',
        message: '',
        preferredContact: 'email'
      });
      setQuantity(1);
    }, 3000);

    alert('✅ Thank you for your enquiry! Our sales team will contact you within 24 hours.');
  };

  const handleMouseMove = (e) => {
    if (!zoomActive) return;
    
    const container = e.currentTarget;
    const img = container.querySelector('img');
    const rect = container.getBoundingClientRect();
    
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x, y });
  };

  const renderStars = (rating) => {
    const numericRating = parseFloat(rating);
    const fullStars = Math.floor(numericRating);
    const hasHalfStar = numericRating % 1 >= 0.5;
    
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
        <span className="ml-2 text-sm font-medium text-gray-700">{numericRating.toFixed(1)}</span>
      </div>
    );
  };

  // Call to action button for enquiry
  const renderEnquiryCTA = () => (
    <div className="mb-8 p-6 rounded-2xl border border-gray-200 bg-gradient-to-r from-blue-50 to-white">
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 rounded-full bg-white border border-gray-200 shadow-sm">
          <FiAlertCircle className="w-6 h-6" style={{ color: bluePrimary }} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Get Pricing & Quote</h3>
          <p className="text-gray-600 mb-4">
            Fill out our enquiry form to get the best price, bulk discounts, and customized solutions for {product?.product_name}.
            Our sales team will contact you within 24 hours.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => document.getElementById('enquiryForm').scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-lg text-white"
          style={{ background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})` }}
        >
          <FiMail className="w-6 h-6" />
          Request Quote Now
        </button>
        
        <button
          onClick={() => window.open(`tel:+911234567890`, '_blank')}
          className="flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300"
        >
          <FiPhone className="w-6 h-6" />
          Call for Instant Quote
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiArrowLeft className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/products')}
            className="px-8 py-3 rounded-xl font-semibold text-white hover:shadow-xl transition-all duration-300"
            style={{ background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})` }}
          >
            Go Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Navigation */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <button
                onClick={() => navigate('/products')}
                className="flex items-center gap-2 hover:transition-colors duration-300"
                style={{ '--tw-text-opacity': 1, color: `rgba(0, 42, 100, var(--tw-text-opacity))` }}
              >
                <FiChevronLeft className="w-4 h-4" />
                Back to Products
              </button>
              <span className="mx-2">/</span>
              <span className="capitalize">{product.category}</span>
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium">{product.product_name}</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleAddToWishlist}
                className={`p-2 rounded-lg border transition-all duration-300 ${
                  isInWishlist
                    ? 'border-red-500 text-red-500 bg-red-50'
                    : 'border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <FiHeart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
              </button>
              
              <button
                onClick={() => window.print()}
                className="p-2 border border-gray-300 text-gray-700 rounded-lg hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
              >
                <FiShare2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="product-details-container flex flex-wrap gap-8 lg:gap-12">
            {/* Left Column - Product Gallery */}
            <div 
              className="product-gallery flex-1 min-w-full lg:min-w-[400px] lg:max-w-[600px]"
              style={{ position: 'sticky', top: '80px', alignSelf: 'flex-start' }}
            >
              {/* Main Image Container */}
              <div 
                className="main-image-container h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-4 relative border border-gray-200 bg-gray-50 flex items-center justify-center cursor-zoom-in"
                onMouseEnter={() => setZoomActive(true)}
                onMouseLeave={() => setZoomActive(false)}
                onMouseMove={handleMouseMove}
                onClick={() => setIsModalOpen(true)}
              >
                <img
                  src={images[selectedImage]}
                  alt={product.product_name}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x600?text=Product+Image';
                  }}
                />
                
                {/* Zoom Lens - Desktop only */}
                {zoomActive && (
                  <div className="zoom-lens hidden lg:block absolute w-32 h-32 rounded-full border-2 border-white/80 bg-white/30 pointer-events-none z-10 shadow-lg"
                    style={{
                      left: `${zoomPosition.x}%`,
                      top: `${zoomPosition.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  />
                )}
                
                {/* Zoom Icon */}
                <div className="absolute bottom-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
                  <FiZoomIn className="w-5 h-5 text-gray-700" />
                </div>
                
                {/* New/Featured Badge */}
                {product.isNew && (
                  <div className="absolute top-4 left-4">
                    <span 
                      className="px-3 py-1.5 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1"
                      style={{ backgroundColor: blueSecondary }}
                    >
                      <IoSparklesOutline className="w-3 h-3" />
                      NEW ARRIVAL
                    </span>
                  </div>
                )}
                
                {product.isFeatured && (
                  <div className="absolute top-4 right-4">
                    <span 
                      className="px-3 py-1.5 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1"
                      style={{ background: `linear-gradient(135deg, ${bluePrimary}, ${blueSecondary})` }}
                    >
                      <MdWorkspacePremium className="w-3 h-3" />
                      FEATURED
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnail Container */}
              <div className="thumbnail-container flex gap-3 py-3 overflow-x-auto scroll-smooth">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`thumbnail w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden cursor-pointer border-2 transition-all duration-300 flex-shrink-0 bg-gray-100 ${
                      selectedImage === index ? 'border-blue-600 shadow-md' : 'border-transparent hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100x100?text=Thumbnail';
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="product-info flex-1 min-w-full lg:min-w-[300px] lg:max-w-[600px]">
              {/* Product Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span 
                    className="text-sm font-medium px-3 py-1 rounded-full"
                    style={{ backgroundColor: `${bluePrimary}15`, color: bluePrimary }}
                  >
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MdVerified className="w-4 h-4 text-green-500" />
                    <span>{product.brand} Official</span>
                  </div>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {product.product_name} - {product.model}
                </h1>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{product.reviewCount} Ratings</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-green-600 font-medium">In Stock</span>
                </div>
              </div>

              {/* Call to Action - Request Quote */}
              {renderEnquiryCTA()}

              {/* Product Description */}
              <div className="mb-8">
                <div className="product-description mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <MdOutlineDescription className="w-5 h-5" />
                    Product Description
                  </h3>
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      The {product.brand} {product.product_name} ({product.model}) is a premium electrical appliance 
                      designed for efficiency and durability. This high-performance device combines advanced technology 
                      with user-friendly features to deliver exceptional results for both residential and commercial use.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      With its robust construction and intelligent design, it offers reliable performance while 
                      maintaining energy efficiency. Ideal for various applications, this product comes with 
                      comprehensive warranty support and professional installation services.
                    </p>
                  </div>
                </div>

                {/* Key Features */}
                <div className="product-features mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <MdOutlineFeaturedVideo className="w-5 h-5" />
                    Key Features & Benefits
                  </h3>
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="p-1.5 rounded-md mt-0.5"
                            style={{ backgroundColor: `${bluePrimary}15` }}>
                            <FiCheck className="w-4 h-4" style={{ color: bluePrimary }} />
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Technical Specifications */}
                <div className="product-specs mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <IoHardwareChipOutline className="w-5 h-5" />
                    Technical Specifications
                  </h3>
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="divide-y divide-gray-100">
                      <div className="grid grid-cols-2 p-4 hover:bg-gray-50">
                        <div className="font-medium text-gray-900">Brand</div>
                        <div className="text-gray-700">{product.specs.brand}</div>
                      </div>
                      <div className="grid grid-cols-2 p-4 hover:bg-gray-50">
                        <div className="font-medium text-gray-900">Model</div>
                        <div className="text-gray-700">{product.specs.model}</div>
                      </div>
                      <div className="grid grid-cols-2 p-4 hover:bg-gray-50">
                        <div className="font-medium text-gray-900">Power Rating</div>
                        <div className="text-gray-700">{product.specs.power}</div>
                      </div>
                      <div className="grid grid-cols-2 p-4 hover:bg-gray-50">
                        <div className="font-medium text-gray-900">Voltage</div>
                        <div className="text-gray-700">{product.specs.voltage}</div>
                      </div>
                      <div className="grid grid-cols-2 p-4 hover:bg-gray-50">
                        <div className="font-medium text-gray-900">Dimensions</div>
                        <div className="text-gray-700">{product.specs.dimensions}</div>
                      </div>
                      <div className="grid grid-cols-2 p-4 hover:bg-gray-50">
                        <div className="font-medium text-gray-900">Weight</div>
                        <div className="text-gray-700">{product.specs.weight}</div>
                      </div>
                      <div className="grid grid-cols-2 p-4 hover:bg-gray-50">
                        <div className="font-medium text-gray-900">Country of Origin</div>
                        <div className="text-gray-700">{product.specs.country_of_origin}</div>
                      </div>
                      <div className="grid grid-cols-2 p-4 hover:bg-gray-50">
                        <div className="font-medium text-gray-900">Warranty</div>
                        <div className="text-gray-700">{product.specs.warranty}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Why Choose This Product */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <BsShieldCheck className="w-5 h-5" />
                    Why Choose {product.brand}?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg border border-blue-100">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-white border border-blue-200">
                          <GiElectric className="w-5 h-5" style={{ color: bluePrimary }} />
                        </div>
                        <div className="font-medium text-gray-900">Energy Efficient</div>
                      </div>
                      <p className="text-sm text-gray-600">Consumes less power while delivering optimal performance</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg border border-blue-100">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-white border border-blue-200">
                          <FiShield className="w-5 h-5" style={{ color: bluePrimary }} />
                        </div>
                        <div className="font-medium text-gray-900">Premium Warranty</div>
                      </div>
                      <p className="text-sm text-gray-600">{product.warranty} years comprehensive warranty</p>
                    </div>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="mb-8 p-6 rounded-2xl border border-gray-200 bg-gray-50">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FiTruck className="w-5 h-5" />
                    Delivery & Installation
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MdLocalShipping className="w-6 h-6 text-green-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Free Standard Delivery</div>
                        <div className="text-sm text-gray-600">
                          Delivered by {deliveryDate} • Installation service available
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            placeholder="Enter Pincode for delivery estimate"
                            value={pinCode}
                            onChange={(e) => setPinCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                          />
                          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        <button
                          onClick={handleCheckPincode}
                          className="px-6 py-3 text-white rounded-lg font-semibold hover:shadow-md transition-all duration-300 whitespace-nowrap"
                          style={{ background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})` }}
                        >
                          Check Availability
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center p-4 bg-white rounded-xl border border-gray-200 hover:shadow-sm transition-shadow">
                    <FiShield className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-900">{product.warranty} Year Warranty</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl border border-gray-200 hover:shadow-sm transition-shadow">
                    <FiRefreshCw className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-900">Easy Returns</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl border border-gray-200 hover:shadow-sm transition-shadow">
                    <BsShieldCheck className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-900">Genuine Product</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl border border-gray-200 hover:shadow-sm transition-shadow">
                    <MdLocalShipping className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                    <div className="text-sm font-medium text-gray-900">Free Shipping</div>
                  </div>
                </div>
              </div>

              {/* Enquiry Form - Large Prominent Section */}
              <div id="enquiryForm" className="mt-12 bg-white rounded-2xl p-6 md:p-8 border-2 border-blue-100 shadow-lg">
                {formSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FiCheck className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Enquiry Submitted Successfully!</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Thank you for your interest in {product.product_name}. Our sales team will contact you within 24 hours with pricing and additional details.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="px-6 py-3 rounded-lg font-semibold hover:shadow-md transition-all duration-300"
                      style={{ 
                        background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})`,
                        color: 'white'
                      }}
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-8">
                      <div className="inline-flex p-3 rounded-xl mb-4"
                        style={{ backgroundColor: `${bluePrimary}10` }}>
                        <FiMail className="w-8 h-8" style={{ color: bluePrimary }} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Request Quote & Pricing</h3>
                      <p className="text-gray-600">
                        Fill out the form below to get the best price, bulk discounts, and customized solutions. Our team will contact you within 24 hours.
                      </p>
                    </div>
                    
                    <form onSubmit={handleEnquirySubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={enquiryForm.name}
                            onChange={(e) => setEnquiryForm({...enquiryForm, name: e.target.value})}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={enquiryForm.email}
                            onChange={(e) => setEnquiryForm({...enquiryForm, email: e.target.value})}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                            placeholder="Enter your email address"
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={enquiryForm.phone}
                            onChange={(e) => setEnquiryForm({...enquiryForm, phone: e.target.value})}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                            placeholder="Enter your phone number"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company Name
                          </label>
                          <input
                            type="text"
                            value={enquiryForm.company}
                            onChange={(e) => setEnquiryForm({...enquiryForm, company: e.target.value})}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                            placeholder="Enter your company name (optional)"
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Product
                          </label>
                          <input
                            type="text"
                            value={enquiryForm.productModel}
                            readOnly
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 cursor-not-allowed"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Preferred Contact Method
                          </label>
                          <select
                            value={enquiryForm.preferredContact}
                            onChange={(e) => setEnquiryForm({...enquiryForm, preferredContact: e.target.value})}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                          >
                            <option value="email">Email</option>
                            <option value="phone">Phone Call</option>
                            <option value="whatsapp">WhatsApp</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Requirements <span className="text-red-500">*</span>
                          <span className="text-xs text-gray-500 ml-2">(Please specify quantity, usage, and any special requirements)</span>
                        </label>
                        <textarea
                          required
                          value={enquiryForm.message}
                          onChange={(e) => setEnquiryForm({...enquiryForm, message: e.target.value})}
                          rows={5}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                          placeholder="Example: I need 50 units for my manufacturing facility. Need installation service. Please provide best price with bulk discount and delivery timeline."
                        ></textarea>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="flex items-start gap-3">
                          <FiInfo className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-sm text-blue-800">
                              <strong>Note:</strong> Our sales team will contact you within 24 hours with pricing, 
                              bulk discounts, and customized solutions. For urgent requirements, please call us at 
                              <strong> +91 12345 67890</strong>.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        type="submit"
                        className="w-full py-4 px-6 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                        style={{ background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})` }}
                      >
                        <FiArrowRight className="w-6 h-6" />
                        Submit Enquiry & Get Quote
                      </button>
                      
                      <p className="text-center text-sm text-gray-500">
                        By submitting this form, you agree to our Privacy Policy and consent to be contacted by our sales team.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">You Might Also Like</h2>
              <p className="text-gray-600 text-lg">
                Explore similar products from the same category
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                <div 
                  key={relatedProduct.id} 
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 group cursor-pointer"
                  onClick={() => navigate(`/products/${relatedProduct.model}`)}
                >
                  <div className="h-48 overflow-hidden bg-gray-50 p-4">
                    <img
                      src={relatedProduct.images?.[0] || 'https://via.placeholder.com/400x300?text=Product+Image'}
                      alt={relatedProduct.product_name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium px-2 py-1 rounded"
                        style={{ backgroundColor: `${bluePrimary}15`, color: bluePrimary }}>
                        {relatedProduct.brand}
                      </span>
                      {relatedProduct.isNew && (
                        <span className="text-xs font-bold px-2 py-1 rounded text-white"
                          style={{ backgroundColor: blueSecondary }}>
                          NEW
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-12">
                      {relatedProduct.product_name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        <BsFillStarFill className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-medium ml-1">{relatedProduct.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500">({relatedProduct.reviewCount})</span>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <GiElectric className="w-4 h-4" />
                        <span>{relatedProduct.power}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiShield className="w-4 h-4" />
                        <span>{relatedProduct.warranty} Warranty</span>
                      </div>
                    </div>
                    
                    <button
                      className="w-full py-2.5 text-white rounded-lg font-medium hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2"
                      style={{ background: `linear-gradient(to right, ${bluePrimary}, ${blueSecondary})` }}
                    >
                      <FiInfo className="w-4 h-4" />
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Zoom Modal */}
      {isModalOpen && (
        <div className="zoom-modal fixed inset-0 bg-black/90 flex items-center justify-center z-50 animate-fadeIn">
          <div className="zoom-modal-content relative max-w-5xl max-h-[90vh]">
            <img
              src={images[selectedImage]}
              alt={product.product_name}
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button
              onClick={() => setIsModalOpen(false)}
              className="close-zoom absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors duration-300"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .product-details-container {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
        }
        
        .product-gallery {
          flex: 1;
          min-width: 400px;
          max-width: 600px;
        }
        
        .product-info {
          flex: 1;
          min-width: 300px;
          max-width: 600px;
        }
        
        .main-image-container {
          height: 400px;
          overflow: hidden;
          margin-bottom: 1rem;
          border-radius: 0.5rem;
          position: relative;
          cursor: crosshair;
          border: 1px solid #e5e7eb;
          background-color: #f9fafb;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .main-image-container img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform 0.2s ease;
        }
        
        .thumbnail-container {
          display: flex;
          gap: 0.75rem;
          padding: 0.5rem 0.25rem;
          overflow-x: auto;
          scroll-behavior: smooth;
        }
        
        .thumbnail {
          width: 4rem;
          height: 4rem;
          border-radius: 0.375rem;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.3s ease;
          flex-shrink: 0;
          background-color: #f3f4f6;
        }
        
        .thumbnail:hover {
          border-color: #d1d5db;
          transform: translateY(-0.125rem);
        }
        
        .thumbnail.active {
          border-color: ${bluePrimary};
          transform: translateY(-0.125rem);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .zoom-lens {
          position: absolute;
          border: 2px solid rgba(255, 255, 255, 0.8);
          background-color: rgba(255, 255, 255, 0.3);
          cursor: none;
          pointer-events: none;
          display: none;
          z-index: 10;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          width: 8rem;
          height: 8rem;
          transform: translate(-50%, -50%);
        }
        
        .zoom-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }
        
        .zoom-modal.active {
          opacity: 1;
          visibility: visible;
        }
        
        .zoom-modal-content {
          max-width: 90%;
          max-height: 90%;
          position: relative;
        }
        
        .zoom-modal-content img {
          max-width: 100%;
          max-height: 90vh;
          object-fit: contain;
        }
        
        .close-zoom {
          position: absolute;
          top: 1rem;
          right: 1.5rem;
          color: white;
          font-size: 2.5rem;
          cursor: pointer;
          z-index: 51;
        }
        
        .close-zoom:hover {
          color: #d1d5db;
        }
        
        .clip-half {
          clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
        }
        
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        
        @media (min-width: 1024px) {
          .zoom-lens {
            display: block;
          }
        }
        
        @media (max-width: 768px) {
          .product-gallery,
          .product-info {
            min-width: 100%;
            max-width: 100%;
          }
          
          .main-image-container {
            height: 300px;
          }
          
          .zoom-lens {
            display: none !important;
          }
          
          .main-image-container {
            cursor: zoom-in;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetailPage;

// // pages/ProductDetailPage.js
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   FiStar,
//   FiShoppingCart,
//   FiHeart,
//   FiChevronLeft,
//   FiCheck,
//   FiTruck,
//   FiShield,
//   FiRefreshCw,
//   FiShare2,
//   FiZoomIn,
//   FiMinus,
//   FiPlus,
//   FiArrowLeft
// } from 'react-icons/fi';
// import {
//   MdLocalShipping,
//   MdVerified,
//   MdOutlineCompareArrows
// } from 'react-icons/md';
// import {
//   BsLightningChargeFill,
//   BsShieldCheck
// } from 'react-icons/bs';
// import { IoSparklesOutline } from 'react-icons/io5';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/thumbs';
// import productData from '../../DATA/data.json';

// const ProductDetailPage = () => {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [selectedColor, setSelectedColor] = useState('black');
//   const [selectedStorage, setSelectedStorage] = useState('256GB');
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);
//   const [cart, setCart] = useState([]);
//   const [wishlist, setWishlist] = useState([]);
//   const [pinCode, setPinCode] = useState('');
//   const [deliveryDate, setDeliveryDate] = useState('');

//   useEffect(() => {
//     const loadProduct = () => {
//       try {
//         const foundProduct = productData.find(p => p.id.toString() === productId);
//         setProduct(foundProduct);
        
//         // Calculate delivery date (3 days from now)
//         const date = new Date();
//         date.setDate(date.getDate() + 3);
//         setDeliveryDate(date.toLocaleDateString('en-US', { 
//           weekday: 'long', 
//           month: 'short', 
//           day: 'numeric' 
//         }));
//       } catch (error) {
//         console.error('Error loading product:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProduct();
//   }, [productId]);

//   const images = product ? [
//     product.image,
//     'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop',
//     'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop',
//     'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop',
//   ] : [];

//   const colors = [
//     { name: 'Phantom Black', value: 'black', hex: '#000000' },
//     { name: 'Cream', value: 'cream', hex: '#FFFDD0' },
//     { name: 'Graphite', value: 'graphite', hex: '#4A4A4A' },
//     { name: 'Sky Blue', value: 'blue', hex: '#87CEEB' },
//   ];

//   const storages = ['128GB', '256GB', '512GB', '1TB'];

//   const handleAddToCart = () => {
//     setCart(prev => {
//       const existing = prev.find(item => item.id === product.id);
//       if (existing) {
//         return prev.map(item =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         );
//       }
//       return [...prev, { ...product, quantity }];
//     });
//     alert(`🎉 ${product.name} added to cart!`);
//   };

//   const handleAddToWishlist = () => {
//     setWishlist(prev => {
//       const exists = prev.find(item => item.id === product.id);
//       if (exists) {
//         alert(`❤️ ${product.name} removed from wishlist`);
//         return prev.filter(item => item.id !== product.id);
//       } else {
//         alert(`❤️ ${product.name} added to wishlist!`);
//         return [...prev, product];
//       }
//     });
//   };

//   const handleCheckPincode = () => {
//     if (pinCode.length === 6) {
//       alert(`✅ Delivery available to ${pinCode} by ${deliveryDate}`);
//     } else {
//       alert('Please enter a valid 6-digit pincode');
//     }
//   };

//   const renderStars = (rating) => {
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 >= 0.5;
    
//     return (
//       <div className="flex items-center">
//         {[...Array(5)].map((_, i) => {
//           if (i < fullStars) {
//             return <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />;
//           } else if (i === fullStars && hasHalfStar) {
//             return (
//               <div key={i} className="relative">
//                 <FiStar className="w-5 h-5 text-gray-300" />
//                 <FiStar className="w-5 h-5 text-yellow-400 fill-current absolute inset-0 clip-half" />
//               </div>
//             );
//           } else {
//             return <FiStar key={i} className="w-5 h-5 text-gray-300" />;
//           }
//         })}
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-20">
//         <div className="samsung-container">
//           <div className="animate-pulse">
//             <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//               <div className="h-96 bg-gray-200 rounded-2xl"></div>
//               <div className="space-y-4">
//                 <div className="h-8 bg-gray-200 rounded w-3/4"></div>
//                 <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                 <div className="h-10 bg-gray-200 rounded w-1/4"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-20">
//         <div className="samsung-container text-center">
//           <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <FiArrowLeft className="w-12 h-12 text-red-500" />
//           </div>
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h2>
//           <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
//           <button
//             onClick={() => navigate('/')}
//             className="px-8 py-3 bg-samsung-blue text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
//           >
//             Go Back to Products
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const isInWishlist = wishlist.some(item => item.id === product.id);
//   const isInCart = cart.some(item => item.id === product.id);
//   const totalPrice = product.price * quantity;
//   const savingsAmount = (product.originalPrice - product.price) * quantity;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Breadcrumb */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="samsung-container py-4">
//           <div className="flex items-center text-sm text-gray-600">
//             <button
//               onClick={() => navigate('/')}
//               className="flex items-center gap-2 hover:text-samsung-blue transition-colors duration-300"
//             >
//               <FiChevronLeft className="w-4 h-4" />
//               Back to Products
//             </button>
//             <span className="mx-2">/</span>
//             <span className="capitalize">{product.category}</span>
//             <span className="mx-2">/</span>
//             <span className="text-gray-900 font-medium">{product.name}</span>
//           </div>
//         </div>
//       </div>

//       <div className="samsung-container py-8">
//         <div className="grid lg:grid-cols-2 gap-12">
//           {/* Left Column - Images */}
//           <div>
//             {/* Badges */}
//             <div className="flex gap-3 mb-6">
//               {product.isNew && (
//                 <span className="bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2">
//                   <IoSparklesOutline className="w-4 h-4" />
//                   NEW ARRIVAL
//                 </span>
//               )}
//               {product.discount > 0 && (
//                 <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold px-4 py-2 rounded-full">
//                   -{product.discount}% OFF
//                 </span>
//               )}
//               {product.isFeatured && (
//                 <span className="bg-gradient-to-r from-samsung-blue to-blue-600 text-white text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2">
//                   <MdVerified className="w-4 h-4" />
//                   FEATURED
//                 </span>
//               )}
//             </div>

//             {/* Main Image Swiper */}
//             <div className="mb-4">
//               <Swiper
//                 spaceBetween={10}
//                 navigation={true}
//                 thumbs={{ swiper: thumbsSwiper }}
//                 modules={[Navigation, Thumbs]}
//                 className="rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
//               >
//                 {images.map((img, index) => (
//                   <SwiperSlide key={index}>
//                     <div className="h-[500px] flex items-center justify-center p-8">
//                       <img
//                         src={img}
//                         alt={`${product.name} view ${index + 1}`}
//                         className="max-h-full max-w-full object-contain"
//                       />
//                     </div>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//             </div>

//             {/* Thumbnail Swiper */}
//             <div className="px-4">
//               <Swiper
//                 onSwiper={setThumbsSwiper}
//                 spaceBetween={12}
//                 slidesPerView={4}
//                 freeMode={true}
//                 watchSlidesProgress={true}
//                 modules={[FreeMode, Thumbs]}
//               >
//                 {images.map((img, index) => (
//                   <SwiperSlide key={index}>
//                     <div className={`h-24 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
//                       selectedImage === index ? 'border-samsung-blue' : 'border-transparent'
//                     }`}>
//                       <img
//                         src={img}
//                         alt={`Thumbnail ${index + 1}`}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//             </div>

//             {/* Color Variants */}
//             <div className="mt-8">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Color:</h3>
//               <div className="flex gap-4">
//                 {colors.map((color) => (
//                   <button
//                     key={color.value}
//                     onClick={() => setSelectedColor(color.value)}
//                     className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-300 ${
//                       selectedColor === color.value
//                         ? 'border-samsung-blue bg-blue-50'
//                         : 'border-gray-200 hover:border-gray-300'
//                     }`}
//                   >
//                     <div
//                       className="w-12 h-12 rounded-full border-2 border-gray-300"
//                       style={{ backgroundColor: color.hex }}
//                     />
//                     <span className="text-sm font-medium text-gray-700">
//                       {color.name}
//                     </span>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Details */}
//           <div>
//             {/* Product Info */}
//             <div className="mb-6">
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="flex items-center gap-2">
//                   {renderStars(product.rating)}
//                   <span className="text-gray-600">{product.rating.toFixed(1)}</span>
//                 </div>
//                 <span className="text-gray-400">•</span>
//                 <span className="text-gray-600">{product.reviewCount} Ratings</span>
//                 <span className="text-gray-400">•</span>
//                 <span className="text-green-600 font-medium">1.2K+ Sold</span>
//               </div>
              
//               <div className="flex items-center gap-2 mb-4">
//                 <span className="text-sm font-medium text-samsung-blue bg-blue-50 px-3 py-1 rounded-full">
//                   {product.category}
//                 </span>
//                 <div className="flex items-center gap-1 text-sm text-gray-600">
//                   <MdVerified className="w-4 h-4 text-green-500" />
//                   <span>Samsung Official</span>
//                 </div>
//               </div>
//             </div>

//             {/* Price Section */}
//             <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl">
//               <div className="flex items-baseline gap-4 mb-2">
//                 <span className="text-4xl font-bold text-gray-900">
//                   ${product.price.toFixed(2)}
//                 </span>
//                 {product.originalPrice > product.price && (
//                   <span className="text-2xl text-gray-500 line-through">
//                     ${product.originalPrice.toFixed(2)}
//                   </span>
//                 )}
//               </div>
              
//               {product.discount > 0 && (
//                 <div className="flex items-center gap-4">
//                   <span className="text-lg font-bold text-green-600">
//                     Save ${savingsAmount.toFixed(2)} ({product.discount}% OFF)
//                   </span>
//                   <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-bold rounded-full">
//                     Limited Time Deal
//                   </span>
//                 </div>
//               )}
              
//               {product.price > 500 && (
//                 <div className="text-lg text-gray-700 mt-3">
//                   <span className="font-medium">EMI:</span> From ${(product.price / 12).toFixed(2)}/month
//                 </div>
//               )}
//             </div>

//             {/* Storage Variants */}
//             <div className="mb-8">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Storage:</h3>
//               <div className="flex flex-wrap gap-3">
//                 {storages.map((storage) => (
//                   <button
//                     key={storage}
//                     onClick={() => setSelectedStorage(storage)}
//                     className={`px-6 py-3 rounded-xl border-2 font-medium transition-all duration-300 ${
//                       selectedStorage === storage
//                         ? 'border-samsung-blue bg-blue-50 text-samsung-blue'
//                         : 'border-gray-300 text-gray-700 hover:border-gray-400'
//                     }`}
//                   >
//                     {storage}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Key Features */}
//             <div className="mb-8">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features:</h3>
//               <div className="space-y-3">
//                 {product.features.map((feature, index) => (
//                   <div key={index} className="flex items-center gap-3">
//                     <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
//                     <span className="text-gray-700">{feature}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Delivery Info */}
//             <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl">
//               <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                 <FiTruck className="w-5 h-5" />
//                 Delivery Options
//               </h4>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <MdLocalShipping className="w-6 h-6 text-green-600" />
//                     <div>
//                       <div className="font-medium text-gray-900">Free Standard Delivery</div>
//                       <div className="text-sm text-gray-600">Delivered by {deliveryDate}</div>
//                     </div>
//                   </div>
//                   <div className="text-sm text-green-600 font-medium">FREE</div>
//                 </div>
                
//                 <div className="flex items-center gap-3">
//                   <div className="relative flex-1">
//                     <input
//                       type="text"
//                       placeholder="Enter Pincode"
//                       value={pinCode}
//                       onChange={(e) => setPinCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
//                       className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-samsung-blue focus:ring-2 focus:ring-samsung-blue/20 outline-none"
//                     />
//                   </div>
//                   <button
//                     onClick={handleCheckPincode}
//                     className="px-6 py-3 bg-samsung-blue text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 whitespace-nowrap"
//                   >
//                     Check
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Quantity & Actions */}
//             <div className="space-y-6">
//               <div className="flex items-center gap-4">
//                 <span className="text-gray-700 font-medium">Quantity:</span>
//                 <div className="flex items-center border-2 border-gray-300 rounded-xl">
//                   <button
//                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                     className="p-3 text-gray-600 hover:text-samsung-blue hover:bg-gray-100 rounded-l-xl"
//                   >
//                     <FiMinus className="w-5 h-5" />
//                   </button>
//                   <span className="w-16 text-center text-xl font-bold">{quantity}</span>
//                   <button
//                     onClick={() => setQuantity(quantity + 1)}
//                     className="p-3 text-gray-600 hover:text-samsung-blue hover:bg-gray-100 rounded-r-xl"
//                   >
//                     <FiPlus className="w-5 h-5" />
//                   </button>
//                 </div>
//                 <div className="text-sm text-gray-600">
//                   {product.stock} items available
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <button
//                   onClick={handleAddToCart}
//                   className={`flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
//                     isInCart
//                       ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg'
//                       : 'bg-gradient-to-r from-samsung-blue to-blue-600 text-white hover:shadow-lg'
//                   }`}
//                 >
//                   <FiShoppingCart className="w-6 h-6" />
//                   {isInCart ? 'Added to Cart' : `Add to Cart - $${totalPrice.toFixed(2)}`}
//                 </button>
                
//                 <button
//                   onClick={() => {
//                     handleAddToCart();
//                     alert('Proceeding to checkout...');
//                   }}
//                   className="flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300"
//                 >
//                   <BsLightningChargeFill className="w-6 h-6" />
//                   Buy Now
//                 </button>
//               </div>

//               <div className="flex gap-4">
//                 <button
//                   onClick={handleAddToWishlist}
//                   className={`flex items-center justify-center gap-2 py-3 px-6 rounded-xl border transition-all duration-300 ${
//                     isInWishlist
//                       ? 'border-red-500 text-red-500 bg-red-50'
//                       : 'border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500 hover:bg-red-50'
//                   }`}
//                 >
//                   <FiHeart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
//                   {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
//                 </button>
                
//                 <button
//                   onClick={() => alert('Share feature coming soon!')}
//                   className="flex items-center justify-center gap-2 py-3 px-6 border border-gray-300 text-gray-700 rounded-xl hover:border-samsung-blue hover:text-samsung-blue hover:bg-blue-50 transition-all duration-300"
//                 >
//                   <FiShare2 className="w-5 h-5" />
//                   Share
//                 </button>
//               </div>
//             </div>

//             {/* Trust Badges */}
//             <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
//               <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
//                 <FiShield className="w-8 h-8 text-green-500 mx-auto mb-2" />
//                 <div className="text-sm font-medium text-gray-900">2 Year Warranty</div>
//               </div>
//               <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
//                 <FiRefreshCw className="w-8 h-8 text-blue-500 mx-auto mb-2" />
//                 <div className="text-sm font-medium text-gray-900">30 Day Returns</div>
//               </div>
//               <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
//                 <BsShieldCheck className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
//                 <div className="text-sm font-medium text-gray-900">Genuine Product</div>
//               </div>
//               <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
//                 <MdLocalShipping className="w-8 h-8 text-orange-500 mx-auto mb-2" />
//                 <div className="text-sm font-medium text-gray-900">Free Shipping</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Product Description */}
//         <div className="mt-12 bg-white rounded-2xl p-8 border border-gray-200">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Description</h2>
//           <div className="prose max-w-none">
//             <p className="text-gray-700 mb-4">
//               Experience the pinnacle of technology with the {product.name}. This premium device combines 
//               cutting-edge features with elegant design to deliver an unparalleled user experience.
//             </p>
//             <ul className="space-y-2 mb-6">
//               <li className="flex items-start gap-2">
//                 <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
//                 <span>Advanced processor for seamless performance</span>
//               </li>
//               <li className="flex items-start gap-2">
//                 <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
//                 <span>Crystal-clear display with vibrant colors</span>
//               </li>
//               <li className="flex items-start gap-2">
//                 <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
//                 <span>Long-lasting battery life for all-day use</span>
//               </li>
//               <li className="flex items-start gap-2">
//                 <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
//                 <span>Premium build quality with durable materials</span>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Specifications */}
//         <div className="mt-8 bg-white rounded-2xl p-8 border border-gray-200">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
//           <div className="grid md:grid-cols-2 gap-6">
//             <div className="space-y-4">
//               <div>
//                 <h3 className="font-semibold text-gray-900 mb-2">General</h3>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Brand</span>
//                     <span className="font-medium">Samsung</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Model</span>
//                     <span className="font-medium">{product.name}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Color</span>
//                     <span className="font-medium">{colors.find(c => c.value === selectedColor)?.name}</span>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-900 mb-2">Display</h3>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Size</span>
//                     <span className="font-medium">6.7 inches</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Resolution</span>
//                     <span className="font-medium">QHD+</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="space-y-4">
//               <div>
//                 <h3 className="font-semibold text-gray-900 mb-2">Storage</h3>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Internal Storage</span>
//                     <span className="font-medium">{selectedStorage}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">RAM</span>
//                     <span className="font-medium">8GB</span>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-900 mb-2">Battery</h3>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Capacity</span>
//                     <span className="font-medium">5000 mAh</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-600">Charging</span>
//                     <span className="font-medium">Fast Charging 45W</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetailPage;