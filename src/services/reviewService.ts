import axios from 'axios';
import { API_URL } from './config';

export interface Review {
  _id: string;
  reviewer: {
    _id: string;
    name: string;
    email: string;
    esn?: number;
    image?: string;
  };
  reviewerModel: 'User' | 'Candidate' | 'Company';
  reviewee: {
    _id: string;
    name: string;
    email: string;
    industry?: string;
    esn?: number;
  };
  revieweeModel: 'Candidate' | 'Company';
  rating: number;
  comment?: string;
  job?: string;
  interview?: string;
  isAnonymous: boolean;
  createdAt: string;
}

export interface CreateReviewData {
  reviewee: string;
  revieweeModel: 'Candidate' | 'Company';
  rating: number;
  comment?: string;
  job?: string;
  interview?: string;
  isAnonymous?: boolean;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
};

const reviewService = {
  // Create a new review
  createReview: (data: CreateReviewData) => {
    return axios.post(`${API_URL}/reviews`, data, getAuthHeaders());
  },

  // Get all reviews with optional filters
  getReviews: (params?: {
    reviewee?: string;
    reviewer?: string;
    revieweeModel?: 'Candidate' | 'Company';
  }) => {
    return axios.get(`${API_URL}/reviews`, {
      params,
      ...getAuthHeaders()
    });
  },

  // Get reviews for a specific user (as reviewee)
  getReviewsForUser: (userId: string) => {
    return axios.get(`${API_URL}/reviews`, {
      params: { reviewee: userId },
      ...getAuthHeaders()
    });
  },

  // Get reviews by a specific user (as reviewer)
  getReviewsByUser: (userId: string) => {
    return axios.get(`${API_URL}/reviews`, {
      params: { reviewer: userId },
      ...getAuthHeaders()
    });
  },

  // Get a single review
  getReview: (id: string) => {
    return axios.get(`${API_URL}/reviews/${id}`, getAuthHeaders());
  },

  // Update a review
  updateReview: (id: string, data: Partial<CreateReviewData>) => {
    return axios.put(`${API_URL}/reviews/${id}`, data, getAuthHeaders());
  },

  // Delete a review
  deleteReview: (id: string) => {
    return axios.delete(`${API_URL}/reviews/${id}`, getAuthHeaders());
  }
};

export default reviewService;
