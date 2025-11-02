import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/deeploi/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Calendar, Clock, CheckCircle, AlertCircle, FileText, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUserInterviews } from '@/hooks/useUserInterviews';
import { CardDescription } from '@/components/ui/card';

const Interviews = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { availableInterviews, completedInterviews, loading: isLoading } = useUserInterviews();
  const [searchQuery, setSearchQuery] = useState('');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredAvailable = availableInterviews.filter((interview: any) =>
    interview.job?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    interview.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    interview.job?.owner?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCompleted = completedInterviews.filter((interview: any) =>
    interview.job?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    interview.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    interview.job?.owner?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <DashboardLayout title="My Interviews">
        <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="My Interviews">
      <div className="max-w-6xl mx-auto px-6 py-8">

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search interviews..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </div>

        <Tabs defaultValue="available" className="space-y-8">
          <TabsList className="bg-white border w-full justify-start gap-8 h-auto p-1 rounded-lg">
            <TabsTrigger 
              value="available"
              className="data-[state=active]:bg-gray-100 rounded-md px-4 py-2"
            >
              Available ({filteredAvailable.length})
            </TabsTrigger>
            <TabsTrigger 
              value="completed"
              className="data-[state=active]:bg-gray-100 rounded-md px-4 py-2"
            >
              Completed ({filteredCompleted.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5 text-brand-green" />
              <h2 className="text-xl font-semibold">Available Interviews</h2>
            </div>
            
            {isLoading ? (
              <Skeleton className="h-64 w-full" />
            ) : filteredAvailable.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <AlertCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No Interviews Available</h3>
                  <p className="text-muted-foreground mb-4">
                    Interviews will appear here once your job applications are reviewed.
                  </p>
                  <Button onClick={() => navigate('/dashboard')} className="bg-brand-green hover:bg-brand-green-light">
                    Browse Jobs
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredAvailable.map((interview: any) => (
                  <Card key={interview._id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          {interview.job?.owner?.logo ? (
                            <img 
                              src={interview.job.owner.logo} 
                              alt={interview.job.owner.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                              <FileText className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <CardTitle className="text-lg">{interview.title}</CardTitle>
                            <CardDescription>
                              {interview.job?.title} at {interview.job?.owner?.name}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          Round {interview.round}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {interview.description && (
                          <p className="text-sm text-gray-600">{interview.description}</p>
                        )}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            <span>{interview.questions?.length || 0} questions</span>
                          </div>
                          {interview.durationMinutes > 0 && (
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{interview.durationMinutes} minutes</span>
                            </div>
                          )}
                          {interview.passScorePercentage > 0 && (
                            <div className="flex items-center gap-2">
                              <span>Pass: {interview.passScorePercentage}%</span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                            {interview.application?.status === 'reviewed' ? 'Application Reviewed' : 'Shortlisted'}
                          </Badge>
                          <Button 
                            className="w-full sm:w-auto bg-brand-green hover:bg-brand-green-light"
                            onClick={() => navigate(`/interview/${interview._id}`)}
                          >
                            Take Interview
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5 text-brand-green" />
              <h2 className="text-xl font-semibold">Completed Interviews</h2>
            </div>
            
            {filteredCompleted.length > 0 ? (
              <div className="space-y-4">
                {filteredCompleted.map((interview: any) => (
                  <Card key={interview._id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          {interview.job?.owner?.logo ? (
                            <img 
                              src={interview.job.owner.logo} 
                              alt={interview.job.owner.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                              <FileText className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <CardTitle className="text-lg">{interview.title}</CardTitle>
                            <CardDescription>
                              {interview.job?.title} at {interview.job?.owner?.name}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Completed
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>Submitted: {formatDate(interview.response?.submittedAt)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-brand-green">
                              Score: {interview.response?.totalScore || 0} points
                            </span>
                          </div>
                        </div>
                        {interview.allowReviewAfterSubmit && (
                          <div className="pt-2">
                            <Button 
                              variant="outline"
                              onClick={() => navigate(`/interview/${interview._id}/review`)}
                            >
                              Review Answers
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-500">No completed interviews yet.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Interviews;
