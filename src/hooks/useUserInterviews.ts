import { useState, useEffect } from 'react';
import { applicationService, interviewService } from '@/services';
import { useToast } from '@/hooks/use-toast';

export interface InterviewWithApplication {
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
  application?: any;
  submittedAt?: string;
  totalScore?: number;
}

export const useUserInterviews = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [availableInterviews, setAvailableInterviews] = useState<InterviewWithApplication[]>([]);
  const [completedInterviews, setCompletedInterviews] = useState<InterviewWithApplication[]>([]);

  const fetchInterviews = async () => {
    try {
      setLoading(true);

      // Fetch all required data
      const [applicationsRes, interviewsRes, responsesRes] = await Promise.all([
        applicationService.getMyApplications(),
        interviewService.getInterviews(),
        interviewService.getMyResponses()
      ]);

      const userApplications = applicationsRes.data.data || [];
      const allInterviews = interviewsRes.data.data || [];
      const userResponses = responsesRes.data.data || [];

      // Filter available interviews: only for jobs user applied to with reviewed/shortlisted status
      const available = allInterviews.filter((interview: any) => {
        // Check if user has an application for this job
        const application = userApplications.find(
          (app: any) => app.job._id === interview.job._id
        );

        // Must have application with reviewed or shortlisted status
        if (!application) return false;
        if (!['reviewed', 'shortlisted'].includes(application.status)) return false;

        // Must not have completed this interview yet
        const hasCompleted = userResponses.some(
          (response: any) => response.interview._id === interview._id
        );

        return interview.isActive && !hasCompleted;
      }).map((interview: any) => ({
        ...interview,
        application: userApplications.find((app: any) => app.job._id === interview.job._id)
      }));

      // Map completed interviews with their response data and application
      const completed = userResponses
        .map((response: any) => ({
          ...response.interview,
          submittedAt: response.submittedAt,
          totalScore: response.totalScore,
          application: userApplications.find(
            (app: any) => app.job._id === response.interview.job._id
          )
        }))
        .filter((interview: any) => interview.application); // Only show if application exists

      setAvailableInterviews(available);
      setCompletedInterviews(completed);
    } catch (error: any) {
      console.error('Error fetching interviews:', error);
      
      // Handle 404 errors gracefully (no candidate profile yet)
      if (error.response?.status !== 404) {
        toast({
          title: "Error",
          description: error.response?.data?.error || "Failed to load interviews",
          variant: "destructive"
        });
      }
      
      setAvailableInterviews([]);
      setCompletedInterviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  return {
    availableInterviews,
    completedInterviews,
    loading,
    refetch: fetchInterviews
  };
};
