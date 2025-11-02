import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '@/components/deeploi/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Heart, FileText, User, Clock, MapPin, Briefcase, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { applicationService, interviewService } from '@/services';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

// Status mapping: backend -> frontend
const statusMap: Record<string, 'active' | 'accepted' | 'declined'> = {
  'pending': 'active',
  'reviewed': 'active',
  'shortlisted': 'accepted',
  'hired': 'accepted',
  'rejected': 'declined'
};

export default function MyApplications() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'active' | 'accepted' | 'declined'>('active');
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [interviews, setInterviews] = useState<any[]>([]);
  const [completedInterviews, setCompletedInterviews] = useState<string[]>([]);

  // Fetch applications on mount
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        
        // Check authentication
        const token = localStorage.getItem('token');
        if (!token) {
          toast({
            title: "Authentication Required",
            description: "Please log in to view your applications.",
            variant: "destructive"
          });
          navigate('/login');
          return;
        }

        // Fetch applications, interviews, and responses
        const [appResponse, interviewsRes, responsesRes] = await Promise.all([
          applicationService.getMyApplications(),
          interviewService.getInterviews(),
          interviewService.getMyResponses()
        ]);

        console.log('Applications response:', appResponse.data);
        
        if (appResponse.data.success) {
          setApplications(appResponse.data.data || []);
        }

        // Store interviews and completed interview IDs
        const allInterviews = interviewsRes.data.data || [];
        const userResponses = responsesRes.data.data || [];
        
        setInterviews(allInterviews);
        setCompletedInterviews(userResponses.map((r: any) => r.interview._id));
      } catch (error: any) {
        console.error('Error fetching applications:', error);
        toast({
          title: "Error",
          description: error.response?.data?.error || "Failed to load applications",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [navigate, toast]);

  // Format date helper
  const formatDate = (date: string) => {
    const now = new Date();
    const posted = new Date(date);
    const diffTime = Math.abs(now.getTime() - posted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
  };

  // Get status badge variant
  const getStatusBadge = (status: string) => {
    const badges: Record<string, { text: string; className: string }> = {
      'pending': { text: 'Pending', className: 'bg-yellow-100 text-yellow-700' },
      'reviewed': { text: 'Under Review', className: 'bg-blue-100 text-blue-700' },
      'shortlisted': { text: 'Shortlisted', className: 'bg-green-100 text-green-700' },
      'rejected': { text: 'Rejected', className: 'bg-red-100 text-red-700' },
      'hired': { text: 'Hired', className: 'bg-green-100 text-green-700' }
    };
    return badges[status] || { text: status, className: 'bg-gray-100 text-gray-700' };
  };

  const filteredApplications = applications.filter(app => 
    statusMap[app.status] === activeTab
  );

  if (isLoading) {
    return (
      <DashboardLayout title="My Applications">
        <div className="space-y-6">
          <div className="bg-white border-b">
            <div className="flex gap-4 px-6 py-3">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-32 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="My Applications">
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="bg-white border-b w-full justify-start rounded-none h-auto p-0">
            <TabsTrigger 
              value="active" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-brand-green rounded-none px-6 py-3"
            >
              Active ({applications.filter(app => statusMap[app.status] === 'active').length})
            </TabsTrigger>
            <TabsTrigger 
              value="accepted"
              className="data-[state=active]:border-b-2 data-[state=active]:border-brand-green rounded-none px-6 py-3"
            >
              Accepted ({applications.filter(app => statusMap[app.status] === 'accepted').length})
            </TabsTrigger>
            <TabsTrigger 
              value="declined"
              className="data-[state=active]:border-b-2 data-[state=active]:border-brand-green rounded-none px-6 py-3"
            >
              Declined ({applications.filter(app => statusMap[app.status] === 'declined').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6 space-y-4">
            {filteredApplications.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-muted-foreground mb-4">No {activeTab} applications found.</p>
                  <Link to="/dashboard">
                    <Button className="bg-brand-green hover:bg-brand-green-light">
                      Browse Jobs
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              filteredApplications.map((application) => {
                const statusBadge = getStatusBadge(application.status);
                const company = application.job?.owner;
                const job = application.job;
                
                return (
                  <Card key={application._id} className="overflow-hidden">
                    <CardContent className="p-6">
                      {/* Job Details Section */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4 flex-1">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={company?.logo || "/placeholder.svg"} />
                            <AvatarFallback className="bg-neutral-200">
                              {company?.name?.charAt(0) || 'C'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <Link to={`/job/${job?._id}`}>
                                  <h3 className="font-semibold text-lg hover:text-brand-green">
                                    {job?.title || 'Job Title'}
                                  </h3>
                                </Link>
                                <p className="text-sm text-brand-green font-medium">
                                  {company?.name || 'Company'}
                                </p>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                                  {job?.location?.city && (
                                    <div className="flex items-center gap-1">
                                      <MapPin className="w-3 h-3" />
                                      <span>{job.location.city}, {job.location.state || job.location.country}</span>
                                    </div>
                                  )}
                                  {job?.jobType && (
                                    <div className="flex items-center gap-1">
                                      <Briefcase className="w-3 h-3" />
                                      <span>{job.jobType}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <Badge className={statusBadge.className}>
                                {statusBadge.text}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      {company?.description && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {company.description}
                        </p>
                      )}

                      {application.coverLetter && (
                        <div className="bg-gray-50 p-4 rounded-md mb-4">
                          <p className="text-xs font-semibold text-gray-600 mb-2">Your Cover Letter:</p>
                          <p className="text-sm text-gray-700 line-clamp-3">
                            {application.coverLetter}
                          </p>
                        </div>
                      )}

                      {/* Interview Status */}
                      {['reviewed', 'shortlisted'].includes(application.status) && (() => {
                        const jobInterview = interviews.find(
                          (int: any) => int.job._id === job?._id && int.isActive
                        );
                        const hasCompleted = jobInterview && completedInterviews.includes(jobInterview._id);

                        return (
                          <div className="bg-blue-50 p-4 rounded-md mb-4 border border-blue-200">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {hasCompleted ? (
                                  <>
                                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    <div>
                                      <p className="text-sm font-semibold text-green-700">Interview Completed</p>
                                      <p className="text-xs text-green-600">You've successfully submitted your interview</p>
                                    </div>
                                  </>
                                ) : jobInterview ? (
                                  <>
                                    <AlertCircle className="w-5 h-5 text-blue-600" />
                                    <div>
                                      <p className="text-sm font-semibold text-blue-700">Interview Available</p>
                                      <p className="text-xs text-blue-600">Your application has been reviewed - take the interview now</p>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <Clock className="w-5 h-5 text-gray-600" />
                                    <div>
                                      <p className="text-sm font-semibold text-gray-700">No Interview Required</p>
                                      <p className="text-xs text-gray-600">This position doesn't require an interview</p>
                                    </div>
                                  </>
                                )}
                              </div>
                              {jobInterview && !hasCompleted && (
                                <Button 
                                  onClick={() => navigate(`/interview/${jobInterview._id}`)}
                                  size="sm"
                                  className="bg-brand-green hover:bg-brand-green-light"
                                >
                                  Take Interview
                                </Button>
                              )}
                            </div>
                          </div>
                        );
                      })()}

                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {job?.industry && (
                            <Badge variant="secondary" className="bg-green-50 text-green-700">
                              {job.industry}
                            </Badge>
                          )}
                          {job?.level && (
                            <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                              {job.level}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>Applied {formatDate(application.createdAt)}</span>
                        </div>
                      </div>

                      {application.feedback && (
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                          <p className="text-xs font-semibold text-blue-700 mb-1">Employer Feedback:</p>
                          <p className="text-sm text-blue-900">{application.feedback}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
