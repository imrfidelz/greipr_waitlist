import axios from 'axios';
import { API_URL } from './config';

// Configure axios with authentication token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  signup: async (userData: any) => {
    try {
      // Using the correct API endpoint from the backend
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      if (response.data.success && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  login: async (email: string, password: string, token?: string) => {
    try {
      const payload: any = { email, password };
      if (token) {
        payload.token = token;
      }
      
      const response = await axios.post(`${API_URL}/auth/login`, payload);
      console.log('Login response from backend:', response.data);
      
      // If 2FA is required, return the tempToken
      if (response.data.requires2FA && response.data.tempToken) {
        return {
          success: true,
          requires2FA: true,
          tempToken: response.data.tempToken,
          message: response.data.message
        };
      }
      
      // Regular login or 2FA completed
      if (response.data.success && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  register: async (userData: any) => {
    try {
      // This is just an alias for signup, using the updated endpoint
      return await authService.signup(userData);
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      await axios.get(`${API_URL}/auth/logout`);
    } finally {
      // Always remove items whether API call succeeds or fails
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  forgotPassword: async (email: string) => {
    return axios.post(`${API_URL}/auth/forgotpassword`, { email });
  },

  resetPassword: async (token: string, password: string) => {
    return axios.put(`${API_URL}/auth/resetpassword/${token}`, { password });
  },

  verifyEmail: async (token: string) => {
    return axios.get(`${API_URL}/auth/verify-email/${token}`);
  },

  sendVerificationEmail: async () => {
    return axios.post(`${API_URL}/auth/verify-email`);
  },
  
  getProfile: async () => {
    try {
      console.log('Auth service fetching own profile');
      // For own profile, use the /auth/profile endpoint with GET method
      const response = await axios.get(`${API_URL}/auth/profile`);
      console.log('Profile response:', response.data);
      return response;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },
  
  getProfileById: async (userId: string) => {
    try {
      console.log('Auth service fetching user by id:', userId);
      // For other user profiles, use the /auth/profile/:id endpoint
      return await axios.get(`${API_URL}/auth/profile/${userId}`);
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },
  
  googleAuth: async (googleData: any) => {
    try {
      // Using the correct API endpoint from the backend
      const response = await axios.post(`${API_URL}/auth/google-auth`, googleData);
      console.log('Google auth response from backend:', response.data);
      
      if (response.data.success && response.data.token) {
        localStorage.setItem('token', response.data.token);
        
        // Handle the nested user data structure from backend
        const userData = response.data.data?.user || response.data.user;
        if (userData) {
          localStorage.setItem('user', JSON.stringify(userData));
        }
      }
      return response.data;
    } catch (error) {
      console.error('Google auth error:', error);
      throw error;
    }
  },
  
  updateProfile: async (userData: any) => {
    try {
      console.log('Updating profile with data:', userData);
      
      // Check if userData is FormData (for file uploads)
      if (userData instanceof FormData) {
        console.log('Uploading file data');
        const response = await axios.put(`${API_URL}/auth/updatedetails`, userData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        console.log('File upload response:', response);
        
        // If the response includes updated user data, update the stored user info
        if (response.data && response.data.data) {
          const updatedUser = response.data.data;
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
        
        return response;
      } else {
        // Regular profile update without file
        const response = await axios.put(`${API_URL}/auth/updatedetails`, userData);
        
        console.log('Update profile response:', response);
        
        // If the response includes updated user data, update the stored user info
        if (response.data && response.data.data) {
          const updatedUser = response.data.data;
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
        
        return response;
      }
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },
  
  followUser: async (userId: string) => {
    return axios.post(`${API_URL}/auth/follow/${userId}`);
  },
  
  unfollowUser: async (userId: string) => {
    return axios.delete(`${API_URL}/auth/unfollow/${userId}`);
  },
  
  getFollowers: async (userId: string) => {
    return axios.get(`${API_URL}/auth/${userId}/connections/followers`);
  },
  
  getFollowing: async (userId: string) => {
    return axios.get(`${API_URL}/auth/${userId}/connections/following`);
  },

  // Function to check if user is already authenticated
  checkAuth: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found in localStorage');
        return null;
      }
      
      console.log('Checking authentication with token');
      // Use the profile endpoint to get current user data
      const response = await axios.get(`${API_URL}/auth/profile`);
      console.log('Auth check response structure:', response.data);
      return response;
    } catch (error) {
      console.error('Auth check error:', error);
      // Clear invalid auth data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return null;
    }
  },

  setUserType: async (userType: 'user' | 'employers') => {
    try {
      const response = await axios.patch(`${API_URL}/auth/set-user-type`, { userType });
      if (response.data.success && response.data.data) {
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }
      return response.data;
    } catch (error) {
      console.error('Set user type error:', error);
      throw error;
    }
  },

  setup2FA: async () => {
    try {
      const response = await axios.post(`${API_URL}/auth/2fa/setup`);
      return response;
    } catch (error) {
      console.error('2FA setup error:', error);
      throw error;
    }
  },

  enable2FA: async (email: string, token: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/2fa/verify`, { email, token });
      if (response.data.success) {
        // Update user data in localStorage
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user.isTwoFactorEnabled = true;
        localStorage.setItem('user', JSON.stringify(user));
      }
      return response.data;
    } catch (error) {
      console.error('2FA enable error:', error);
      throw error;
    }
  },

  disable2FA: async (token: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/2fa/disable`, { token });
      if (response.data.success) {
        // Update user data in localStorage
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user.isTwoFactorEnabled = false;
        localStorage.setItem('user', JSON.stringify(user));
      }
      return response.data;
    } catch (error) {
      console.error('2FA disable error:', error);
      throw error;
    }
  },

  verify2FA: async (email: string, token: string, tempToken?: string) => {
    try {
      const config = {};
      if (tempToken) {
        // Send tempToken as Bearer in Authorization header instead of default
        (config as any).headers = {
          'Authorization': `Bearer ${tempToken}`,
        };
      }
      const response = await axios.post(`${API_URL}/auth/2fa/verify`, { email, token }, config);
      if (response.data.success && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('2FA verification error:', error);
      throw error;
    }
  },
  
  toggleFollow: async (userId: string, isFollowing: boolean) => {
    if (isFollowing) {
      return authService.unfollowUser(userId);
    } else {
      return authService.followUser(userId);
    }
  },
  
  saveJob: async (jobId: string) => {
    return axios.post(`${API_URL}/auth/save-job/${jobId}`);
  },
  
  unsavejob: async (jobId: string) => {
    return axios.delete(`${API_URL}/auth/unsave-job/${jobId}`);
  },
  
  getSavedJobs: async () => {
    return axios.get(`${API_URL}/auth/saved-jobs`);
  },

  logoutAll: async () => {
    try {
      await axios.post(`${API_URL}/auth/logout-all`);
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout all error:', error);
      throw error;
    }
  },

  deactivateAccount: async () => {
    try {
      const response = await axios.delete(`${API_URL}/auth/deactivate`);
      // Clear local storage after deactivation
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return response.data;
    } catch (error) {
      console.error('Deactivate account error:', error);
      throw error;
    }
  },

  updatePassword: async (currentPassword: string, newPassword: string) => {
    try {
      const response = await axios.put(`${API_URL}/auth/updatepassword`, {
        currentPassword,
        newPassword
      });
      
      // Update token if backend sends a new one
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      console.error('Update password error:', error);
      throw error;
    }
  }
};

export default authService;
