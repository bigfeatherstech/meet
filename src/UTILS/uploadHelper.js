import axiosInstance from './axiosInstance';

/**
 * Get signed upload parameters from backend
 */
export const getUploadSignature = async (purpose = 'product', maxFiles = 5) => {
  try {
    const response = await axiosInstance.post('/uploads/signature', {
      purpose,
      max_files: maxFiles
    });
    
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    console.error('Error getting upload signature:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to get upload signature'
    };
  }
};

/**
 * Validate uploaded images with backend
 */
export const validateUploadedImages = async (images) => {
  try {
    const response = await axiosInstance.post('/uploads/validate', {
      images: images.map(img => ({
        url: img.url,
        public_id: img.public_id
      }))
    });
    
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    console.error('Error validating images:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to validate images'
    };
  }
};

/**
 * Delete image from Cloudinary
 */
export const deleteImageFromCloudinary = async (publicId) => {
  try {
    await axiosInstance.delete(`/uploads/${publicId}`);
    return { success: true };
  } catch (error) {
    console.error('Error deleting image:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to delete image'
    };
  }
};

/**
 * Convert File to Base64 (for preview)
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

/**
 * Format file size to human readable format
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Validate image file
 */
export const validateImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Please upload JPEG, PNG, or WebP images.'
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File size exceeds 5MB limit.'
    };
  }

  return { valid: true };
};