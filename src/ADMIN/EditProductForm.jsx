import React, { useState } from 'react';

const EditProductForm = ({ product, onSave, onClose }) => {
  const [formData, setFormData] = useState({ ...product });

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
        <h2 className="text-xl font-bold text-gray-900">Edit Product</h2>
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
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeKeyFeature(index)}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
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
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
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
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;