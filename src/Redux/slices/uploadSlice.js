import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../UTILS/axiosInstance';

// Async thunks
export const getUploadSignature = createAsyncThunk(
  'upload/getSignature',
  async ({ purpose = 'product', maxFiles = 5 }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/uploads/signature', {
        purpose,
        max_files: maxFiles
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get upload signature');
    }
  }
);

export const validateImages = createAsyncThunk(
  'upload/validateImages',
  async (images, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/uploads/validate', {
        images: images.map(img => ({
          url: img.url,
          public_id: img.public_id
        }))
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to validate images');
    }
  }
);

export const deleteImage = createAsyncThunk(
  'upload/deleteImage',
  async (publicId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/uploads/${publicId}`);
      return publicId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete image');
    }
  }
);

const uploadSlice = createSlice({
  name: 'upload',
  initialState: {
    uploadParams: null,
    uploadedImages: [],
    loading: false,
    error: null,
    validating: false,
    validationError: null
  },
  reducers: {
    clearUploadedImages: (state) => {
      state.uploadedImages = [];
    },
    addUploadedImage: (state, action) => {
      state.uploadedImages.push(action.payload);
    },
    removeUploadedImage: (state, action) => {
      state.uploadedImages = state.uploadedImages.filter(
        img => img.public_id !== action.payload
      );
    },
    reorderImages: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      const result = Array.from(state.uploadedImages);
      const [removed] = result.splice(fromIndex, 1);
      result.splice(toIndex, 0, removed);
      state.uploadedImages = result;
    },
    setPrimaryImage: (state, action) => {
      const publicId = action.payload;
      state.uploadedImages = state.uploadedImages.map(img => ({
        ...img,
        is_primary: img.public_id === publicId
      }));
    },
    clearError: (state) => {
      state.error = null;
      state.validationError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get upload signature
      .addCase(getUploadSignature.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUploadSignature.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadParams = action.payload;
      })
      .addCase(getUploadSignature.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Validate images
      .addCase(validateImages.pending, (state) => {
        state.validating = true;
        state.validationError = null;
      })
      .addCase(validateImages.fulfilled, (state, action) => {
        state.validating = false;
        state.uploadedImages = action.payload.images;
      })
      .addCase(validateImages.rejected, (state, action) => {
        state.validating = false;
        state.validationError = action.payload;
      })
      
      // Delete image
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.uploadedImages = state.uploadedImages.filter(
          img => img.public_id !== action.payload
        );
      });
  }
});

export const {
  clearUploadedImages,
  addUploadedImage,
  removeUploadedImage,
  reorderImages,
  setPrimaryImage,
  clearError
} = uploadSlice.actions;

export default uploadSlice.reducer;