// Cloudinary Upload Widget Configuration
class CloudinaryUploadWidget {
  constructor() {
    this.widget = null;
    this.uploadedImages = [];
  }

  /**
   * Initialize and open Cloudinary Upload Widget
   * @param {Object} options - Widget options
   * @param {Function} callback - Callback function when upload completes
   */
  async openWidget(options = {}, callback) {
    try {
      // Load Cloudinary widget script if not already loaded
      await this.loadCloudinaryScript();
      
      const defaultOptions = {
        cloudName: options.cloudName,
        uploadPreset: options.uploadPreset,
        sources: ['local', 'url', 'camera'], // Enable multiple sources
        multiple: true, // Allow multiple files
        maxFiles: 5, // Max 5 files
        maxFileSize: 5000000, // 5MB per file
        clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
        cropping: false, // No cropping
        showAdvancedOptions: true,
        styles: {
          palette: {
            window: '#FFFFFF',
            sourceBg: '#F4F4F5',
            windowBorder: '#90A0B3',
            tabIcon: '#0E2F5A',
            inactiveTabIcon: '#555A5F',
            menuIcons: '#5A616A',
            link: '#0078FF',
            action: '#FF620C',
            inProgress: '#0078FF',
            complete: '#20B832',
            error: '#E63F3F',
            textDark: '#000000',
            textLight: '#FFFFFF'
          },
          fonts: {
            default: null,
            "'Poppins', sans-serif": {
              url: 'https://fonts.googleapis.com/css?family=Poppins',
              active: true
            }
          }
        }
      };

      // Merge user options with defaults
      const widgetOptions = { ...defaultOptions, ...options };

      // Create and open widget
      this.widget = window.cloudinary.createUploadWidget(
        widgetOptions,
        (error, result) => {
          this.handleUploadResult(error, result, callback);
        }
      );

      this.widget.open();
    } catch (error) {
      console.error('Error opening Cloudinary widget:', error);
      if (callback) callback({ error: 'Failed to open upload widget' });
    }
  }

  /**
   * Load Cloudinary widget script
   */
  loadCloudinaryScript() {
    return new Promise((resolve, reject) => {
      // Check if script is already loaded
      if (window.cloudinary) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://upload-widget.cloudinary.com/global/all.js';
      script.async = true;
      script.onload = () => {
        if (window.cloudinary) {
          resolve();
        } else {
          reject(new Error('Cloudinary script failed to load'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load Cloudinary script'));
      
      document.head.appendChild(script);
    });
  }

  /**
   * Handle upload results
   */
  handleUploadResult(error, result, callback) {
    if (error) {
      console.error('Upload widget error:', error);
      if (callback) callback({ error: error.message || 'Upload failed' });
      return;
    }

    if (result && result.event === 'success') {
      const imageData = {
        url: result.info.secure_url,
        public_id: result.info.public_id,
        format: result.info.format,
        bytes: result.info.bytes,
        width: result.info.width,
        height: result.info.height,
        created_at: result.info.created_at
      };

      this.uploadedImages.push(imageData);
      
      if (callback) {
        callback({
          event: 'single-success',
          image: imageData,
          allImages: this.uploadedImages
        });
      }
    }

    if (result && result.event === 'close') {
      if (callback && this.uploadedImages.length > 0) {
        callback({
          event: 'batch-complete',
          images: [...this.uploadedImages]
        });
      }
      this.reset();
    }

    if (result && result.event === 'abort') {
      this.reset();
      if (callback) callback({ event: 'aborted' });
    }
  }

  /**
   * Close the widget
   */
  closeWidget() {
    if (this.widget) {
      this.widget.close();
      this.reset();
    }
  }

  /**
   * Reset uploaded images
   */
  reset() {
    this.uploadedImages = [];
  }

  /**
   * Get current uploaded images
   */
  getUploadedImages() {
    return [...this.uploadedImages];
  }
}

// Create singleton instance
export const cloudinaryWidget = new CloudinaryUploadWidget();

/**
 * Upload image to Cloudinary using signed upload
 * @param {File} file - Image file
 * @param {Object} uploadParams - Signed upload parameters from backend
 * @returns {Promise} Upload result
 */
export const uploadImageWithSignature = async (file, uploadParams) => {
  try {
    const formData = new FormData();
    
    // Add all signed parameters
    formData.append('file', file);
    formData.append('api_key', uploadParams.api_key);
    formData.append('timestamp', uploadParams.timestamp);
    formData.append('signature', uploadParams.signature);
    formData.append('folder', uploadParams.folder);
    formData.append('public_id', uploadParams.public_id);
    
    // Add transformations
    if (uploadParams.eager) {
      formData.append('eager', JSON.stringify(uploadParams.eager));
    }
    
    const response = await fetch(uploadParams.upload_endpoint, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Upload failed');
    }
    
    const result = await response.json();
    return {
      success: true,
      data: {
        url: result.secure_url,
        public_id: result.public_id,
        format: result.format,
        bytes: result.bytes,
        width: result.width,
        height: result.height
      }
    };
  } catch (error) {
    console.error('Image upload error:', error);
    return {
      success: false,
      error: error.message || 'Failed to upload image'
    };
  }
};