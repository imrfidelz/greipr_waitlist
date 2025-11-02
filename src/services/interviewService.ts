import { apiClient } from './config';

export interface Interview {
  _id: string;
  job: {
    _id: string;
    title: string;
    owner: {
      _id: string;
      name: string;
      logo?: string;
    };
  };
  title: string;
  description?: string;
  round: number;
  questions: any[];
  passScorePercentage: number;
  durationMinutes: number;
  maxAttempts: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InterviewResponse {
  _id: string;
  interview: Interview;
  candidate: any;
  answers: any[];
  totalScore: number;
  submittedAt: string;
}

const interviewService = {
  // Get all interviews
  async getInterviews() {
    const response = await apiClient.get('/interviews');
    return response.data;
  },

  // Get single interview
  async getInterview(id: string) {
    const response = await apiClient.get(`/interviews/${id}`);
    return response.data;
  },

  // Get interview responses for user
  async getMyResponses() {
    const response = await apiClient.get('/interviews/responses/my');
    return response.data;
  },

  // Get responses for specific interview
  async getInterviewResponses(interviewId: string) {
    const response = await apiClient.get(`/interviews/${interviewId}/responses`);
    return response.data;
  },

  // Submit interview response
  async submitResponse(interviewId: string, answers: any[]) {
    const response = await apiClient.post('/interviews/submit', {
      interviewId,
      answers
    });
    return response.data;
  },

  // Create interview (company/admin only)
  async createInterview(data: any) {
    const response = await apiClient.post('/interviews', data);
    return response.data;
  },

  // Update interview (company/admin only)
  async updateInterview(id: string, data: any) {
    const response = await apiClient.put(`/interviews/${id}`, data);
    return response.data;
  },

  // Delete interview (company/admin only)
  async deleteInterview(id: string) {
    const response = await apiClient.delete(`/interviews/${id}`);
    return response.data;
  }
};

export default interviewService;
