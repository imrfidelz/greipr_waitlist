import axios from 'axios';
import { API_URL } from './config';

export const candidateService = {
  // Get current user's candidate profile
  getMyCandidate: async () => {
    return axios.get(`${API_URL}/candidates/me`);
  },

  // Get candidate profile by user ID
  getCandidate: async (candidateId: string) => {
    return axios.get(`${API_URL}/candidates/${candidateId}`);
  },

  // Get public candidate profile by user ID
  getPublicProfile: async (userId: string) => {
    return axios.get(`${API_URL}/candidates/public/${userId}`);
  },

  // Get all candidates
  getCandidates: async () => {
    return axios.get(`${API_URL}/candidates`);
  },

  // Create or update candidate profile
  createOrUpdateCandidate: async (candidateData: any) => {
    return axios.post(`${API_URL}/candidates`, candidateData);
  },

  // Update candidate profile by ID
  updateCandidate: async (candidateId: string, candidateData: any) => {
    return axios.put(`${API_URL}/candidates/${candidateId}`, candidateData);
  },

  // Certifications
  getCertifications: async () => {
    return axios.get(`${API_URL}/candidates/certificates`);
  },

  createCertification: async (certData: any) => {
    return axios.post(`${API_URL}/candidates/certificates`, certData);
  },

  updateCertification: async (certId: string, certData: any) => {
    return axios.put(`${API_URL}/candidates/certificates/${certId}`, certData);
  },

  deleteCertification: async (certId: string) => {
    const token = localStorage.getItem('token');
    return axios.delete(`${API_URL}/candidates/certificates/${certId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
  },

  // Education
  getEducations: async () => {
    return axios.get(`${API_URL}/candidates/educations`);
  },

  createEducation: async (eduData: any) => {
    return axios.post(`${API_URL}/candidates/educations`, eduData);
  },

  updateEducation: async (eduId: string, eduData: any) => {
    return axios.put(`${API_URL}/candidates/educations/${eduId}`, eduData);
  },

  deleteEducation: async (eduId: string) => {
    return axios.delete(`${API_URL}/candidates/educations/${eduId}`);
  },

  // Experience
  getExperiences: async () => {
    return axios.get(`${API_URL}/candidates/experiences`);
  },

  createExperience: async (expData: any) => {
    return axios.post(`${API_URL}/candidates/experiences`, expData);
  },

  updateExperience: async (expId: string, expData: any) => {
    return axios.put(`${API_URL}/candidates/experiences/${expId}`, expData);
  },

  deleteExperience: async (expId: string) => {
    return axios.delete(`${API_URL}/candidates/experiences/${expId}`);
  },

  // Skills
  getSkills: async () => {
    const token = localStorage.getItem('token');
    return axios.get(`${API_URL}/candidates/skills`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
  },

  createSkill: async (skillData: any) => {
    const token = localStorage.getItem('token');
    return axios.post(`${API_URL}/candidates/skills`, skillData, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
  },

  updateSkill: async (skillId: string, skillData: any) => {
    const token = localStorage.getItem('token');
    return axios.put(`${API_URL}/candidates/skills/${skillId}`, skillData, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
  },

  deleteSkill: async (skillId: string) => {
    const token = localStorage.getItem('token');
    return axios.delete(`${API_URL}/candidates/skills/${skillId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
  },

  // Guarantors
  getGuarantors: async () => {
    return axios.get(`${API_URL}/candidates/guarantors`);
  },

  createGuarantor: async (guarantorData: any) => {
    return axios.post(`${API_URL}/candidates/guarantors`, guarantorData);
  },

  updateGuarantor: async (guarantorId: string, guarantorData: any) => {
    return axios.put(`${API_URL}/candidates/guarantors/${guarantorId}`, guarantorData);
  },

  deleteGuarantor: async (guarantorId: string) => {
    return axios.delete(`${API_URL}/candidates/guarantors/${guarantorId}`);
  }
};

export default candidateService;
