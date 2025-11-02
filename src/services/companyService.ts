import { apiClient } from './config';

export interface Company {
  _id: string;
  name: string;
  owner: string;
  industry?: string;
  description?: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: {
    country?: string;
    state?: string;
    city?: string;
  };
  ban?: string;
  banStatus?: 'unverified' | 'pending' | 'approved' | 'rejected';
  logo?: string;
  verified?: boolean;
  createdAt?: string;
}

export interface CreateCompanyData {
  name: string;
  owner: string;
  industry?: string;
  description?: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: {
    country?: string;
    state?: string;
    city?: string;
  };
  logo?: File;
}

const companyService = {
  // Get all companies
  async getCompanies() {
    const response = await apiClient.get('/companies');
    return response.data;
  },

  // Get single company
  async getCompany(id: string) {
    const response = await apiClient.get(`/companies/${id}`);
    return response.data;
  },

  // Create company with optional logo upload
  async createCompany(data: CreateCompanyData) {
    const formData = new FormData();
    
    formData.append('name', data.name);
    formData.append('owner', data.owner);
    
    if (data.industry) formData.append('industry', data.industry);
    if (data.description) formData.append('description', data.description);
    if (data.website) formData.append('website', data.website);
    if (data.email) formData.append('email', data.email);
    if (data.phone) formData.append('phone', data.phone);
    
    if (data.address) {
      formData.append('address', JSON.stringify(data.address));
    }
    
    if (data.logo) {
      formData.append('logo', data.logo);
    }

    const response = await apiClient.post('/companies', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update company
  async updateCompany(id: string, data: Partial<CreateCompanyData>) {
    const formData = new FormData();
    
    if (data.name) formData.append('name', data.name);
    if (data.owner) formData.append('owner', data.owner);
    if (data.industry) formData.append('industry', data.industry);
    if (data.description) formData.append('description', data.description);
    if (data.website) formData.append('website', data.website);
    if (data.email) formData.append('email', data.email);
    if (data.phone) formData.append('phone', data.phone);
    
    if (data.address) {
      formData.append('address', JSON.stringify(data.address));
    }
    
    if (data.logo) {
      formData.append('logo', data.logo);
    }

    const response = await apiClient.put(`/companies/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete company
  async deleteCompany(id: string) {
    const response = await apiClient.delete(`/companies/${id}`);
    return response.data;
  },
};

export default companyService;
