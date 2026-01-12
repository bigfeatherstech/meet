


import React, { useState } from 'react';

const AddProductForm = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    model: '',
    product_name: '',
    brand: '',
    voltage: '',
    power: '',
    dimensions: '',
    weight: '',
    key_features: [''],
    warranty: '',
    country_of_origin: '',
    category: 'Home Appliances',
    images: ['']
  });

  const categories = [
    "Home Appliances",
    "Kitchen Appliances", 
    "Large Appliances",
    "Personal Care Appliances",
    "Heating & Cooling Appliances",
    "Cleaning Appliances",
    "Electrical Tools & Equipment",
    "Lighting & Electricals",
    "Smart & IoT Appliances",
    "Commercial Electrical Appliances",
    "Spare Parts & Accessories"
  ];

  const productOptions = {
    "Home Appliances": ["Ceiling Fans", "Table Fans", "Wall Fans", "Exhaust Fans", "Air Coolers", "Room Heaters", "Water Geysers", "Air Purifiers"],
    "Kitchen Appliances": ["Mixer Grinder", "Juicer Mixer", "Induction Cooktop", "Electric Kettle", "Rice Cooker", "Microwave Oven", "OTG Oven", "Toaster & Sandwich Maker", "Coffee Maker"],
    "Large Appliances": ["Refrigerator", "Washing Machine", "Dishwasher", "Air Conditioner", "Deep Freezer"],
    "Personal Care Appliances": ["Hair Dryer", "Hair Straightener", "Trimmer", "Shaver", "Electric Toothbrush", "Massager"],
    "Heating & Cooling Appliances": ["Room Heaters", "Water Heaters", "Air Coolers", "Dehumidifiers"],
    "Cleaning Appliances": ["Vacuum Cleaner", "Handheld Vacuum", "Steam Cleaner", "Floor Cleaner", "Robotic Vacuum Cleaner"],
    "Electrical Tools & Equipment": ["Electric Drill", "Heat Gun", "Soldering Machine", "Angle Grinder", "Power Tool Accessories"],
    "Lighting & Electricals": ["LED Bulbs", "LED Tube Lights", "Smart Lights", "Emergency Lights", "Inverters & UPS", "Voltage Stabilizers"],
    "Smart & IoT Appliances": ["Smart Plugs", "Smart Switches", "Smart Fans", "Smart Kitchen Appliances"],
    "Commercial Electrical Appliances": ["Commercial Mixer Grinder", "Commercial Oven", "Display Freezer", "Water Dispenser"],
    "Spare Parts & Accessories": ["Appliance Motors", "Heating Elements", "Filters", "Blades & Attachments", "Power Cables & Adapters"]
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleKeyFeatureChange = (index, value) => {
    const newFeatures = [...formData.key_features];
    newFeatures[index] = value;
    setFormData(prev => ({
      ...prev,
      key_features: newFeatures
    }));
  };

  const addKeyFeature = () => {
    setFormData(prev => ({
      ...prev,
      key_features: [...prev.key_features, '']
    }));
  };

  const removeKeyFeature = (index) => {
    const newFeatures = formData.key_features.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      key_features: newFeatures
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const removeImageField = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if model already exists
    const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
    const isDuplicate = existingProducts.some(product => product.model === formData.model);
    
    if (isDuplicate) {
      alert('A product with this model already exists. Please use a different model number.');
      return;
    }
    
    // Clean data
    const cleanedData = {
      ...formData,
      key_features: formData.key_features.filter(feature => feature.trim() !== ''),
      images: formData.images.filter(image => image.trim() !== '')
    };
    
    onSave(cleanedData);
  };

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Product Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Product Type</label>
          <select
            name="product_name"
            value={formData.product_name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Product Type</option>
            {productOptions[formData.category]?.map(product => (
              <option key={product} value={product}>{product}</option>
            ))}
          </select>
        </div>

        {/* Basic Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Model Number *</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              placeholder="CF-1200X"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand *</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              placeholder="Crompton"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Voltage *</label>
            <input
              type="text"
              name="voltage"
              value={formData.voltage}
              onChange={handleInputChange}
              placeholder="220-240V"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Power *</label>
            <input
              type="text"
              name="power"
              value={formData.power}
              onChange={handleInputChange}
              placeholder="70W"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions</label>
            <input
              type="text"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleInputChange}
              placeholder="1200mm"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              placeholder="5.2kg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Warranty *</label>
            <input
              type="text"
              name="warranty"
              value={formData.warranty}
              onChange={handleInputChange}
              placeholder="2 Years"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country of Origin *</label>
            <input
              type="text"
              name="country_of_origin"
              value={formData.country_of_origin}
              onChange={handleInputChange}
              placeholder="India"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* Key Features */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="block text-sm font-medium text-gray-700">Key Features</label>
            <button
              type="button"
              onClick={addKeyFeature}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              + Add Feature
            </button>
          </div>
          <div className="space-y-2">
            {formData.key_features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleKeyFeatureChange(index, e.target.value)}
                  placeholder={`Feature ${index + 1}`}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {formData.key_features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeKeyFeature(index)}
                    className="p-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Image URLs */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="block text-sm font-medium text-gray-700">Image URLs</label>
            <button
              type="button"
              onClick={addImageField}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              + Add Image URL
            </button>
          </div>
          <div className="space-y-2">
            {formData.images.map((image, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="url"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {formData.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="p-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-6 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;




















// import React, { useState, useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createProduct } from '../Redux/slices/productSlice';
// import { 
//   getUploadSignature, 
//   clearUploadedImages, 
//   setPrimaryImage, 
//   removeUploadedImage,
//   addUploadedImage,
//   clearError
// } from '../Redux/slices/uploadSlice';

// const AddProductForm = ({ onClose }) => {
//   const dispatch = useDispatch();
//   const { loading: productLoading, error: productError } = useSelector((state) => state.products);
//   const { uploadParams, uploadedImages, loading: uploadLoading, error: uploadError } = useSelector((state) => state.upload);
  
//   const [formData, setFormData] = useState({
//     model: '',
//     product_name: '',
//     brand: '',
//     voltage: '',
//     power: '',
//     dimensions: '',
//     weight: '',
//     key_features: [''],
//     warranty: '',
//     country_of_origin: '',
//     category: 'Home Appliances',
//   });

//   const [loading, setLoading] = useState(false);
//   const [localError, setLocalError] = useState('');
//   const [isUploading, setIsUploading] = useState(false);
//   const cloudinaryWidgetRef = useRef(null);

//   const categories = [
//     "Home Appliances",
//     "Kitchen Appliances", 
//     "Large Appliances",
//     "Personal Care Appliances",
//     "Heating & Cooling Appliances",
//     "Cleaning Appliances",
//     "Electrical Tools & Equipment",
//     "Lighting & Electricals",
//     "Smart & IoT Appliances",
//     "Commercial Electrical Appliances",
//     "Spare Parts & Accessories"
//   ];

//   const productOptions = {
//     "Home Appliances": ["Ceiling Fans", "Table Fans", "Wall Fans", "Exhaust Fans", "Air Coolers", "Room Heaters", "Water Geysers", "Air Purifiers"],
//     "Kitchen Appliances": ["Mixer Grinder", "Juicer Mixer", "Induction Cooktop", "Electric Kettle", "Rice Cooker", "Microwave Oven", "OTG Oven", "Toaster & Sandwich Maker", "Coffee Maker"],
//     "Large Appliances": ["Refrigerator", "Washing Machine", "Dishwasher", "Air Conditioner", "Deep Freezer"],
//     "Personal Care Appliances": ["Hair Dryer", "Hair Straightener", "Trimmer", "Shaver", "Electric Toothbrush", "Massager"],
//     "Heating & Cooling Appliances": ["Room Heaters", "Water Heaters", "Air Coolers", "Dehumidifiers"],
//     "Cleaning Appliances": ["Vacuum Cleaner", "Handheld Vacuum", "Steam Cleaner", "Floor Cleaner", "Robotic Vacuum Cleaner"],
//     "Electrical Tools & Equipment": ["Electric Drill", "Heat Gun", "Soldering Machine", "Angle Grinder", "Power Tool Accessories"],
//     "Lighting & Electricals": ["LED Bulbs", "LED Tube Lights", "Smart Lights", "Emergency Lights", "Inverters & UPS", "Voltage Stabilizers"],
//     "Smart & IoT Appliances": ["Smart Plugs", "Smart Switches", "Smart Fans", "Smart Kitchen Appliances"],
//     "Commercial Electrical Appliances": ["Commercial Mixer Grinder", "Commercial Oven", "Display Freezer", "Water Dispenser"],
//     "Spare Parts & Accessories": ["Appliance Motors", "Heating Elements", "Filters", "Blades & Attachments", "Power Cables & Adapters"]
//   };

//   // Load Cloudinary widget script
//   useEffect(() => {
//     const loadCloudinaryScript = () => {
//       return new Promise((resolve, reject) => {
//         if (window.cloudinary) {
//           resolve();
//           return;
//         }

//         const script = document.createElement('script');
//         script.src = 'https://upload-widget.cloudinary.com/global/all.js';
//         script.async = true;
//         script.onload = () => {
//           if (window.cloudinary) {
//             console.log('Cloudinary script loaded successfully');
//             resolve();
//           } else {
//             reject(new Error('Cloudinary script failed to load'));
//           }
//         };
//         script.onerror = () => reject(new Error('Failed to load Cloudinary script'));
        
//         document.head.appendChild(script);
//       });
//     };

//     loadCloudinaryScript()
//       .then(() => {
//         console.log('Cloudinary widget ready');
//       })
//       .catch(error => {
//         console.error('Failed to load Cloudinary:', error);
//         setLocalError('Failed to load image uploader. Please refresh the page.');
//       });

//     // Get upload signature
//     dispatch(getUploadSignature({ purpose: 'product', maxFiles: 5 }));
    
//     // Clear uploaded images when component unmounts
//     return () => {
//       dispatch(clearUploadedImages());
//       dispatch(clearError());
//     };
//   }, [dispatch]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleKeyFeatureChange = (index, value) => {
//     const newFeatures = [...formData.key_features];
//     newFeatures[index] = value;
//     setFormData(prev => ({
//       ...prev,
//       key_features: newFeatures
//     }));
//   };

//   const addKeyFeature = () => {
//     setFormData(prev => ({
//       ...prev,
//       key_features: [...prev.key_features, '']
//     }));
//   };

//   const removeKeyFeature = (index) => {
//     const newFeatures = formData.key_features.filter((_, i) => i !== index);
//     setFormData(prev => ({
//       ...prev,
//       key_features: newFeatures
//     }));
//   };

//   // Handle Cloudinary upload - SIMPLIFIED WORKING VERSION
//   const handleImageUpload = async () => {
//     if (!window.cloudinary) {
//       setLocalError('Image uploader is still loading. Please wait...');
//       return;
//     }

//     if (uploadedImages.length >= 5) {
//       setLocalError('Maximum 5 images allowed');
//       return;
//     }

//     setIsUploading(true);
//     setLocalError('');

//     try {
//       // Create upload widget
//       const widget = window.cloudinary.createUploadWidget(
//         {
//           cloudName: 'dxbvyedko', // Your Cloudinary cloud name
//           uploadPreset: 'unsigned_preset', // Create this in Cloudinary dashboard
//           sources: ['local', 'url', 'camera'],
//           multiple: true,
//           maxFiles: 5 - uploadedImages.length, // Remaining slots
//           maxFileSize: 5000000, // 5MB
//           clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
//           cropping: false,
//           showAdvancedOptions: false,
//           styles: {
//             palette: {
//               window: '#FFFFFF',
//               sourceBg: '#F4F4F5',
//               windowBorder: '#90A0B3',
//               tabIcon: '#0E2F5A',
//               inactiveTabIcon: '#555A5F',
//               menuIcons: '#5A616A',
//               link: '#0078FF',
//               action: '#FF620C',
//               inProgress: '#0078FF',
//               complete: '#20B832',
//               error: '#E63F3F',
//               textDark: '#000000',
//               textLight: '#FFFFFF'
//             }
//           }
//         },
//         (error, result) => {
//           if (error) {
//             console.error('Upload error:', error);
//             setLocalError('Upload failed: ' + error.message);
//             setIsUploading(false);
//             return;
//           }

//           if (result && result.event === 'success') {
//             const imageData = {
//               url: result.info.secure_url,
//               public_id: result.info.public_id,
//               format: result.info.format,
//               bytes: result.info.bytes,
//               width: result.info.width,
//               height: result.info.height,
//               is_primary: uploadedImages.length === 0, // First image is primary
//               order: uploadedImages.length + 1
//             };

//             // Add to Redux state
//             dispatch(addUploadedImage(imageData));
//             console.log('Image uploaded:', imageData);
//           }

//           if (result && result.event === 'close') {
//             setIsUploading(false);
//             console.log('Widget closed, total images:', uploadedImages.length);
//           }

//           if (result && result.event === 'abort') {
//             setIsUploading(false);
//             console.log('Upload aborted');
//           }
//         }
//       );

//       cloudinaryWidgetRef.current = widget;
//       widget.open();
//     } catch (error) {
//       console.error('Widget error:', error);
//       setLocalError('Failed to open upload widget: ' + error.message);
//       setIsUploading(false);
//     }
//   };

//   // Handle file input for manual upload
//   const handleFileInput = async (e) => {
//     const files = Array.from(e.target.files);
//     setLocalError('');
    
//     // Validate number of files
//     if (uploadedImages.length + files.length > 5) {
//       setLocalError('Maximum 5 images allowed');
//       return;
//     }
    
//     // Clear file input
//     e.target.value = '';
    
//     // Use widget for upload
//     handleImageUpload();
//   };

//   // Remove uploaded image
//   const handleRemoveImage = (publicId) => {
//     dispatch(removeUploadedImage(publicId));
//   };

//   // Set primary image
//   const handleSetPrimary = (publicId) => {
//     dispatch(setPrimaryImage(publicId));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLocalError('');
    
//     // Validate form
//     if (!formData.model || !formData.product_name || !formData.brand || 
//         !formData.voltage || !formData.power || !formData.warranty || 
//         !formData.country_of_origin) {
//       setLocalError('Please fill all required fields');
//       return;
//     }
    
//     // Validate images (at least 1 required)
//     if (uploadedImages.length === 0) {
//       setLocalError('At least one image is required');
//       return;
//     }
    
//     // Ensure at least one image is primary
//     const hasPrimary = uploadedImages.some(img => img.is_primary);
//     const formattedImages = uploadedImages.map((img, index) => ({
//       url: img.url,
//       public_id: img.public_id,
//       is_primary: !hasPrimary ? index === 0 : img.is_primary
//     }));
    
//     // Prepare product data
//     const productData = {
//       ...formData,
//       images: formattedImages,
//       key_features: formData.key_features.filter(feature => feature.trim() !== '')
//     };
    
//     console.log('Submitting product:', productData);
    
//     try {
//       setLoading(true);
//       await dispatch(createProduct(productData)).unwrap();
//       onClose(); // Close modal on success
//     } catch (error) {
//       console.error('Create product error:', error);
//       setLocalError(error || 'Failed to create product');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       {/* Header */}
//       <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
//         <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
//         <button
//           onClick={onClose}
//           className="text-gray-400 hover:text-gray-600"
//           disabled={loading || isUploading}
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
//       </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="p-6 space-y-6">
//         {/* Error Messages */}
//         {(localError || productError || uploadError) && (
//           <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
//             <div className="flex items-center text-red-700">
//               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <span className="text-sm">{localError || productError || uploadError}</span>
//             </div>
//           </div>
//         )}

//         {/* Image Upload Section */}
//         <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
//           <div className="flex justify-between items-center mb-4">
//             <div>
//               <h3 className="text-lg font-medium text-gray-900">Product Images</h3>
//               <p className="text-sm text-gray-500">
//                 Upload 1-5 images. First image will be primary. Max 5MB per image.
//               </p>
//             </div>
//             <div className="text-sm text-gray-500">
//               {uploadedImages.length}/5 images
//             </div>
//           </div>

//           {/* Uploaded Images Preview */}
//           {uploadedImages.length > 0 ? (
//             <div className="mb-6">
//               <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//                 {uploadedImages.map((img, index) => (
//                   <div key={img.public_id} className="relative group">
//                     <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
//                       <img
//                         src={img.url}
//                         alt={`Product ${index + 1}`}
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                           e.target.onerror = null;
//                           e.target.src = 'https://placehold.co/400x400?text=Image+Error';
//                         }}
//                       />
//                       {img.is_primary && (
//                         <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
//                           Primary
//                         </div>
//                       )}
//                     </div>
//                     <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
//                       <div className="flex space-x-2">
//                         <button
//                           type="button"
//                           onClick={() => handleSetPrimary(img.public_id)}
//                           className="p-2 bg-white rounded-full hover:bg-gray-100"
//                           title="Set as primary"
//                         >
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//                           </svg>
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => handleRemoveImage(img.public_id)}
//                           className="p-2 bg-white rounded-full hover:bg-gray-100"
//                           title="Remove image"
//                         >
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                           </svg>
//                         </button>
//                       </div>
//                     </div>
//                     <div className="mt-2 text-xs text-gray-500 truncate">
//                       Image {index + 1}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <div className="mb-6 p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
//               <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 002 2z" />
//               </svg>
//               <p className="text-gray-500">No images uploaded yet</p>
//               <p className="text-sm text-gray-400 mt-1">Upload at least 1 image</p>
//             </div>
//           )}

//           {/* Upload Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4">
//             <button
//               type="button"
//               onClick={handleImageUpload}
//               disabled={isUploading || uploadLoading || uploadedImages.length >= 5}
//               className={`flex-1 px-4 py-3 rounded-lg border-2 border-dashed flex flex-col items-center justify-center transition-colors ${
//                 isUploading || uploadLoading || uploadedImages.length >= 5
//                   ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
//                   : 'border-blue-300 hover:border-blue-500 hover:bg-blue-50'
//               }`}
//             >
//               {isUploading || uploadLoading ? (
//                 <div className="flex items-center">
//                   <svg className="animate-spin h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                   </svg>
//                   <span className="text-sm font-medium text-blue-600">Opening uploader...</span>
//                 </div>
//               ) : (
//                 <>
//                   <svg className="w-8 h-8 text-blue-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 002 2z" />
//                   </svg>
//                   <span className="text-sm font-medium text-gray-700">Upload Images</span>
//                   <span className="text-xs text-gray-500 mt-1">Click to open upload widget</span>
//                 </>
//               )}
//             </button>

//             <div className="relative">
//               <input
//                 type="file"
//                 id="file-input"
//                 multiple
//                 accept="image/*"
//                 onChange={handleFileInput}
//                 className="hidden"
//                 disabled={isUploading || uploadedImages.length >= 5}
//               />
//               <label
//                 htmlFor="file-input"
//                 className={`flex-1 px-4 py-3 rounded-lg border-2 border-dashed flex flex-col items-center justify-center transition-colors cursor-pointer ${
//                   isUploading || uploadedImages.length >= 5
//                     ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
//                     : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
//                 }`}
//               >
//                 <svg className="w-8 h-8 text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//                 <span className="text-sm font-medium text-gray-700">Choose Files</span>
//                 <span className="text-xs text-gray-500 mt-1">JPEG, PNG, WebP up to 5MB</span>
//               </label>
//             </div>
//           </div>

//           {/* Upload Tips */}
//           <div className="mt-4 text-xs text-gray-500 space-y-1">
//             <p>• First image will be used as primary/thumbnail</p>
//             <p>• Maximum 5 images per product</p>
//             <p>• Supported formats: JPG, PNG, WebP</p>
//             <p>• Max file size: 5MB per image</p>
//             {uploadedImages.length > 0 && (
//               <p className="text-green-600 font-medium">
//                 ✓ {uploadedImages.length} image{uploadedImages.length > 1 ? 's' : ''} uploaded
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Rest of the form remains the same... */}
//         {/* Category Selection */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-3">Category *</label>
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleInputChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             required
//             disabled={loading || isUploading}
//           >
//             {categories.map(category => (
//               <option key={category} value={category}>{category}</option>
//             ))}
//           </select>
//         </div>

//         {/* Product Type Selection */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-3">Product Type *</label>
//           <select
//             name="product_name"
//             value={formData.product_name}
//             onChange={handleInputChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             required
//             disabled={loading || isUploading}
//           >
//             <option value="">Select Product Type</option>
//             {productOptions[formData.category]?.map(product => (
//               <option key={product} value={product}>{product}</option>
//             ))}
//           </select>
//         </div>

//         {/* Basic Info Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Model Number *
//             </label>
//             <input
//               type="text"
//               name="model"
//               value={formData.model}
//               onChange={handleInputChange}
//               placeholder="CF-1200X"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//               disabled={loading || isUploading}
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Brand *
//             </label>
//             <input
//               type="text"
//               name="brand"
//               value={formData.brand}
//               onChange={handleInputChange}
//               placeholder="Crompton"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//               disabled={loading || isUploading}
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Voltage *
//             </label>
//             <input
//               type="text"
//               name="voltage"
//               value={formData.voltage}
//               onChange={handleInputChange}
//               placeholder="220-240V"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//               disabled={loading || isUploading}
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Power *
//             </label>
//             <input
//               type="text"
//               name="power"
//               value={formData.power}
//               onChange={handleInputChange}
//               placeholder="70W"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//               disabled={loading || isUploading}
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Dimensions
//             </label>
//             <input
//               type="text"
//               name="dimensions"
//               value={formData.dimensions}
//               onChange={handleInputChange}
//               placeholder="1200mm"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               disabled={loading || isUploading}
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Weight
//             </label>
//             <input
//               type="text"
//               name="weight"
//               value={formData.weight}
//               onChange={handleInputChange}
//               placeholder="5.2kg"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               disabled={loading || isUploading}
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Warranty *
//             </label>
//             <input
//               type="text"
//               name="warranty"
//               value={formData.warranty}
//               onChange={handleInputChange}
//               placeholder="2 Years"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//               disabled={loading || isUploading}
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Country of Origin *
//             </label>
//             <input
//               type="text"
//               name="country_of_origin"
//               value={formData.country_of_origin}
//               onChange={handleInputChange}
//               placeholder="India"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//               disabled={loading || isUploading}
//             />
//           </div>
//         </div>

//         {/* Key Features */}
//         <div>
//           <div className="flex justify-between items-center mb-3">
//             <label className="block text-sm font-medium text-gray-700">Key Features</label>
//             <button
//               type="button"
//               onClick={addKeyFeature}
//               className="text-sm text-blue-600 hover:text-blue-800"
//               disabled={loading || isUploading}
//             >
//               + Add Feature
//             </button>
//           </div>
//           <div className="space-y-2">
//             {formData.key_features.map((feature, index) => (
//               <div key={index} className="flex items-center gap-2">
//                 <input
//                   type="text"
//                   value={feature}
//                   onChange={(e) => handleKeyFeatureChange(index, e.target.value)}
//                   placeholder={`Feature ${index + 1}`}
//                   className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   disabled={loading || isUploading}
//                 />
//                 {formData.key_features.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => removeKeyFeature(index)}
//                     className="p-2 text-red-600 hover:text-red-800"
//                     disabled={loading || isUploading}
//                   >
//                     Remove
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Form Actions */}
//         <div className="flex justify-end space-x-3 pt-6 border-t">
//           <button
//             type="button"
//             onClick={onClose}
//             className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//             disabled={loading || isUploading}
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//             disabled={loading || isUploading || uploadedImages.length === 0}
//           >
//             {loading ? 'Adding Product...' : 'Add Product'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddProductForm;