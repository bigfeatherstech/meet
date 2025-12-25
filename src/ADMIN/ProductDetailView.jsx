import React from 'react';

const ProductDetailView = ({ product, onClose }) => {
  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Product Details</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Main Image and Basic Info */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* Images */}
          <div className="lg:w-1/2">
            {product.images && product.images[0] ? (
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-xl p-4">
                  <img
                    src={product.images[0]}
                    alt={product.product_name}
                    className="w-full h-64 object-contain rounded-lg"
                  />
                </div>
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.images.slice(1).map((image, index) => (
                      <div key={index} className="bg-gray-100 rounded-lg p-2">
                        <img
                          src={image}
                          alt={`${product.product_name} ${index + 2}`}
                          className="w-full h-16 object-cover rounded"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center">
                <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className="lg:w-1/2">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full mb-2">
                {product.category}
              </span>
              <h3 className="text-2xl font-bold text-gray-900">{product.product_name}</h3>
              <p className="text-gray-600 mt-1">Model: {product.model}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Brand</div>
                <div className="font-medium text-gray-900">{product.brand}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Power</div>
                <div className="font-medium text-gray-900">{product.power}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Voltage</div>
                <div className="font-medium text-gray-900">{product.voltage}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Warranty</div>
                <div className="font-medium text-gray-900">{product.warranty}</div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="text-sm text-gray-500 mb-2">Country of Origin</div>
              <div className="font-medium text-gray-900">{product.country_of_origin}</div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-500">Dimensions</div>
              <div className="font-medium text-gray-900">{product.dimensions || 'Not specified'}</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-500">Weight</div>
              <div className="font-medium text-gray-900">{product.weight || 'Not specified'}</div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        {product.key_features && product.key_features.length > 0 && (
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {product.key_features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Close Button */}
        <div className="flex justify-end pt-6 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;