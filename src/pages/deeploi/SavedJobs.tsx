import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Heart,
  Search,
  Filter,
  X
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import DashboardLayout from '@/components/deeploi/DashboardLayout';
import { authService } from '@/services';
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const SavedJobs = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [isRemoving, setIsRemoving] = useState<string | null>(null);

  // Fetch saved jobs on mount
  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        setIsLoading(true);
        
        // Check if user is authenticated
        const token = localStorage.getItem('token');
        if (!token) {
          toast({
            title: "Authentication Required",
            description: "Please log in to view your saved jobs.",
            variant: "destructive"
          });
          navigate('/login');
          return;
        }

        const response = await authService.getSavedJobs();
        console.log('Saved jobs response:', response.data);
        
        if (response.data.status === 'success') {
          setSavedJobs(response.data.data.jobs || []);
        }
      } catch (error: any) {
        console.error('Error fetching saved jobs:', error);
        toast({
          title: "Error",
          description: error.response?.data?.error || "Failed to load saved jobs",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedJobs();
  }, [navigate, toast]);

  const removeFromSaved = async (jobId: string) => {
    try {
      setIsRemoving(jobId);
      
      await authService.unsavejob(jobId);
      
      // Update local state
      setSavedJobs(prev => prev.filter(job => job._id !== jobId));
      
      toast({
        title: "Job Removed",
        description: "Job has been removed from your saved list.",
      });
    } catch (error: any) {
      console.error('Error removing job:', error);
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to remove job",
        variant: "destructive"
      });
    } finally {
      setIsRemoving(null);
    }
  };

  // Format date helper
  const formatPostedDate = (date: string) => {
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

  // Format salary helper
  const formatSalary = (salary: any) => {
    if (!salary) return 'Salary not specified';
    const { currency = 'NGN', min, max } = salary;
    const symbol = currency === 'NGN' ? 'N' : '$';
    
    if (min && max) {
      return `${symbol}${min.toLocaleString()} - ${symbol}${max.toLocaleString()}/month`;
    }
    if (min) return `${symbol}${min.toLocaleString()}/month`;
    if (max) return `Up to ${symbol}${max.toLocaleString()}/month`;
    return 'Salary not specified';
  };

  // Filter jobs based on search term
  const filteredJobs = savedJobs.filter(job => {
    const searchLower = searchTerm.toLowerCase();
    const companyName = job.owner?.name || '';
    const location = `${job.location?.city || ''} ${job.location?.state || ''}`;
    
    return job.title.toLowerCase().includes(searchLower) || 
           companyName.toLowerCase().includes(searchLower) ||
           location.toLowerCase().includes(searchLower);
  });

  if (isLoading) {
    return (
      <DashboardLayout title="Saved Jobs">
        <div className="max-w-6xl mx-auto p-6 md:p-8">
          <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                <Skeleton className="h-24 w-full" />
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Saved Jobs">
      <div className="max-w-6xl mx-auto p-6 md:p-8">
          <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
              <div className="relative w-full md:w-1/2">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search saved jobs..."
                  className="w-full pl-12 pr-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-brand-green"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </Button>
                <Button className="bg-brand-green hover:bg-brand-green-light">
                  Recent
                </Button>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-gray-500 mb-2">{filteredJobs.length} saved job{filteredJobs.length !== 1 ? 's' : ''}</p>
            </div>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div key={job._id} className="bg-white p-6 rounded-lg shadow-sm relative">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex gap-4">
                      <img 
                        src={job.owner?.logo || "/lovable-uploads/60246116-1823-4009-939d-620e4a6c7f12.png"}
                        alt={`${job.owner?.name || 'Company'} Logo`}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2 pr-8 md:pr-0">
                          <h3 className="font-semibold text-lg">{job.title}</h3>
                          {job.isVerified && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                              Verified
                            </span>
                          )}
                          <button 
                            onClick={() => removeFromSaved(job._id)} 
                            className="absolute top-6 right-6 md:static p-1 hover:bg-red-50 rounded-full disabled:opacity-50"
                            aria-label="Remove from saved"
                            disabled={isRemoving === job._id}
                          >
                            <X className={`w-5 h-5 text-red-500 ${isRemoving === job._id ? 'animate-spin' : ''}`} />
                          </button>
                        </div>
                        <p className="text-brand-green font-medium">{job.owner?.name || 'Company'}</p>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-1">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{job.location?.city ? `${job.location.city}, ${job.location.state || job.location.country}` : 'Location not specified'}</span>
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="w-4 h-4 mr-1" />
                            <span>{job.jobType}</span>
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            <span>{formatSalary(job.salary)}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>Posted {formatPostedDate(job.postedAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex gap-3">
                      <Link to={`/job/${job._id}`}>
                        <Button variant="outline" className="text-brand-green border-brand-green hover:bg-green-50">
                          View Details
                        </Button>
                      </Link>
                      <Button className="bg-brand-green hover:bg-brand-green-light">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No saved jobs found</h3>
              <p className="text-gray-500 mb-6">You haven't saved any jobs matching your search criteria.</p>
              {searchTerm ? (
                <Button 
                  variant="outline" 
                  onClick={() => setSearchTerm('')}
                  className="mx-auto"
                >
                  Clear Search
                </Button>
              ) : (
                <Link to="/dashboard">
                  <Button className="bg-brand-green hover:bg-brand-green-light mx-auto">
                    Browse Jobs
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
    </DashboardLayout>
  );
};

export default SavedJobs;
