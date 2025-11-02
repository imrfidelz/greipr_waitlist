import { apiClient } from './config';

export interface User {
  _id: string;
  name: string;
  userName?: string;
  email: string;
  phoneNumber?: string;
  role: 'user' | 'employers' | 'admin';
  emailVerified: boolean;
  isPhoneNumberVerified: boolean;
  followers: string[];
  following: string[];
  savedJobs: string[];
  esnScore: number;
  esnStatus: 'unverified' | 'pending' | 'approved' | 'rejected';
  esn?: string;
  kycStatus: 'unverified' | 'pending' | 'approved' | 'rejected';
  kycRejectionReason?: string;
  active?: boolean;
  createdAt: string;
  settings?: {
    notifications: {
      email: boolean;
      sms: boolean;
      propertyUpdates: boolean;
      followRequests: boolean;
      messages: boolean;
    };
    privacy: {
      whoCanFollow: 'everyone' | 'followers';
      privateProfile: boolean;
    };
  };
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role?: string;
  phoneNumber?: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
}

const userService = {
  // Get all users (admin only)
  getUsers: async (filters?: {
    role?: string;
    search?: string;
  }) => {
    const params = new URLSearchParams();
    if (filters?.role) params.append('role', filters.role);
    if (filters?.search) params.append('search', filters.search);
    
    const queryString = params.toString();
    const response = await apiClient.get(`/users${queryString ? `?${queryString}` : ''}`);
    return response.data;
  },

  // Get single user by ID
  getUser: async (id: string) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  // Create new user (admin only)
  createUser: async (userData: CreateUserData) => {
    const response = await apiClient.post('/users', userData);
    return response.data;
  },

  // Update user (admin only)
  updateUser: async (id: string, userData: UpdateUserData) => {
    const response = await apiClient.put(`/users/${id}`, userData);
    return response.data;
  },

  // Delete user (admin only)
  deleteUser: async (id: string) => {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  },

  // Toggle user active status (admin only)
  toggleUserStatus: async (id: string) => {
    const response = await apiClient.patch(`/users/${id}/status`);
    return response.data;
  },

  // Update user role (admin only)
  updateUserRole: async (id: string, role: 'user' | 'employers' | 'admin') => {
    const response = await apiClient.patch(`/users/${id}/role`, { role });
    return response.data;
  },

  // Initialize KYC with Sumsub
  initKycSumsub: async () => {
    const response = await apiClient.post('/auth/kyc/init-sumsub');
    return response;
  },
};

export default userService;
