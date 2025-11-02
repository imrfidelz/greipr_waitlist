import axios from 'axios';
import { API_URL } from './config';

export const applicationService = {
  // Get all applications (with optional filters)
  getApplications: async (filters?: { candidate?: string; job?: string }) => {
    const params = new URLSearchParams();
    if (filters?.candidate) params.append('candidate', filters.candidate);
    if (filters?.job) params.append('job', filters.job);
    
    return axios.get(`${API_URL}/applications?${params.toString()}`);
  },

  // Get my applications (for logged-in candidate)
  getMyApplications: async () => {
    return axios.get(`${API_URL}/applications/my-applications`);
  },

  // Get single application
  getApplication: async (applicationId: string) => {
    return axios.get(`${API_URL}/applications/${applicationId}`);
  },

  // Create new application
  createApplication: async (applicationData: { job: string; coverLetter?: string }) => {
    return axios.post(`${API_URL}/applications`, applicationData);
  },

  // Update application (admin/employer only)
  updateApplication: async (applicationId: string, updateData: any) => {
    return axios.put(`${API_URL}/applications/${applicationId}`, updateData);
  },

  // Delete application
  deleteApplication: async (applicationId: string) => {
    return axios.delete(`${API_URL}/applications/${applicationId}`);
  },

  // Review application (admin/employer only)
  reviewApplication: async (applicationId: string, status: string) => {
    return axios.patch(`${API_URL}/applications/${applicationId}/review`, { status });
  },

  // Get interview for a job application
  getInterviewForApplication: async (jobId: string) => {
    return axios.get(`${API_URL}/applications/job/${jobId}/interview`);
  }
};

export default applicationService;
