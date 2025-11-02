import { apiClient } from './config';

export interface Job {
  _id: string;
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  industry: string;
  jobType: 'Full-time' | 'Part-time' | 'Remote' | 'Hybrid' | 'Contract';
  level: 'Internship' | 'Entry' | 'Mid' | 'Senior' | 'Executive';
  salary: {
    currency: string;
    min: number;
    max: number;
  };
  experienceRequired: string;
  qualifications: string[];
  location: {
    country: string;
    state: string;
    city: string;
  };
  remote: boolean;
  skillsRequired: string[];
  owner: {
    _id: string;
    name: string;
    industry?: string;
  };
  applicants: string[];
  status: 'open' | 'closed' | 'paused';
  isFeatured: boolean;
  isVerified: boolean;
  views: number;
  postedAt: string;
  closingDate?: string;
}

export interface CreateJobData {
  title: string;
  description: string;
  requirements?: string[];
  responsibilities?: string[];
  benefits?: string[];
  industry: string;
  jobType?: string;
  level?: string;
  salary?: {
    currency?: string;
    min?: number;
    max?: number;
  };
  experienceRequired?: string;
  qualifications?: string[];
  location?: {
    country?: string;
    state?: string;
    city?: string;
  };
  remote?: boolean;
  skillsRequired?: string[];
  status?: string;
  closingDate?: string;
}

const jobService = {
  // Get all jobs with optional filters
  getJobs: async (filters?: {
    industry?: string;
    jobType?: string;
    level?: string;
    status?: string;
  }) => {
    const params = new URLSearchParams();
    if (filters?.industry) params.append('industry', filters.industry);
    if (filters?.jobType) params.append('jobType', filters.jobType);
    if (filters?.level) params.append('level', filters.level);
    if (filters?.status) params.append('status', filters.status);
    
    const queryString = params.toString();
    const response = await apiClient.get(`/jobs${queryString ? `?${queryString}` : ''}`);
    return response.data;
  },

  // Get single job by ID
  getJob: async (id: string) => {
    const response = await apiClient.get(`/jobs/${id}`);
    return response.data;
  },

  // Create new job (requires authentication)
  createJob: async (jobData: CreateJobData) => {
    const response = await apiClient.post('/jobs', jobData);
    return response.data;
  },

  // Update job (requires authentication and ownership)
  updateJob: async (id: string, jobData: Partial<CreateJobData>) => {
    const response = await apiClient.put(`/jobs/${id}`, jobData);
    return response.data;
  },

  // Delete job (requires authentication and ownership)
  deleteJob: async (id: string) => {
    const response = await apiClient.delete(`/jobs/${id}`);
    return response.data;
  },
};

export default jobService;
