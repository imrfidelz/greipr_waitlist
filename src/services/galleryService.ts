import axios from 'axios';
import { API_URL } from './config';

export interface GalleryItem {
  _id: string;
  candidate: string;
  imageUrl: string;
  title?: string;
  description?: string;
  category: 'work' | 'personal' | 'achievement' | 'certificate' | 'other';
  order: number;
  isPublic: boolean;
  status: 'active' | 'archived' | 'flagged';
  createdAt: string;
  updatedAt: string;
}

export interface CreateGalleryItemData {
  image: File;
  title?: string;
  description?: string;
  category?: 'work' | 'personal' | 'achievement' | 'certificate' | 'other';
  isPublic?: boolean;
}

export interface UpdateGalleryItemData {
  image?: File;
  title?: string;
  description?: string;
  category?: 'work' | 'personal' | 'achievement' | 'certificate' | 'other';
  isPublic?: boolean;
  status?: 'active' | 'archived' | 'flagged';
}

export interface ReorderItem {
  id: string;
  order: number;
}

const galleryService = {
  // Get all gallery items (admin only)
  getAllGallery: async () => {
    return axios.get(`${API_URL}/gallery`);
  },

  // Get gallery items for a specific candidate (public)
  getCandidateGallery: async (candidateId: string) => {
    return axios.get(`${API_URL}/gallery/candidate/${candidateId}`);
  },

  // Get my gallery items
  getMyGallery: async () => {
    return axios.get(`${API_URL}/gallery/my-gallery`);
  },

  // Get single gallery item
  getGalleryItem: async (id: string) => {
    return axios.get(`${API_URL}/gallery/${id}`);
  },

  // Create new gallery item
  createGalleryItem: async (data: CreateGalleryItemData) => {
    const formData = new FormData();
    formData.append('image', data.image);
    if (data.title) formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.category) formData.append('category', data.category);
    if (data.isPublic !== undefined) formData.append('isPublic', String(data.isPublic));

    return axios.post(`${API_URL}/gallery`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Update gallery item
  updateGalleryItem: async (id: string, data: UpdateGalleryItemData) => {
    const formData = new FormData();
    if (data.image) formData.append('image', data.image);
    if (data.title) formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.category) formData.append('category', data.category);
    if (data.isPublic !== undefined) formData.append('isPublic', String(data.isPublic));
    if (data.status) formData.append('status', data.status);

    return axios.put(`${API_URL}/gallery/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Delete gallery item
  deleteGalleryItem: async (id: string) => {
    return axios.delete(`${API_URL}/gallery/${id}`);
  },

  // Reorder gallery items
  reorderGallery: async (items: ReorderItem[]) => {
    return axios.put(`${API_URL}/gallery/reorder`, { items });
  }
};

export default galleryService;
