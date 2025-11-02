import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import DashboardLayout from '@/components/deeploi/DashboardLayout';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <DashboardLayout title="Find Job">
      <div className="p-6">
        <div className="max-w-6xl mx-auto">

          {/* Search Section */}
          <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search job title or keyword..."
                  className="w-full pl-12 pr-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
              </div>
              <Button className="bg-brand-green hover:bg-brand-green-light px-8">
                <Filter className="mr-2" />
                Filter
              </Button>
            </div>

            {/* Filter Tags */}
            <div className="flex flex-wrap gap-3 mt-4">
              <div className="flex items-center bg-green-50 text-brand-green px-3 py-1 rounded-full text-sm">
                Hospitality
                <button className="ml-2">&times;</button>
              </div>
              <div className="flex items-center bg-green-50 text-brand-green px-3 py-1 rounded-full text-sm">
                Lagos
                <button className="ml-2">&times;</button>
              </div>
              <button className="text-sm text-gray-500 hover:text-brand-green">
                Clear all
              </button>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            <JobCard id="1" />
            <JobCard id="2" />
            <JobCard id="3" />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

// Job Card Component
const JobCard = ({ id = "1" }: { id?: string }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-start">
        <div className="flex gap-4 flex-1">
          <img 
            src="/lovable-uploads/60246116-1823-4009-939d-620e4a6c7f12.png"
            alt="Company Logo"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <Link to={`/job/${id}`} className="block">
              <h3 className="font-semibold text-lg hover:text-brand-green">Kitchen Assistant</h3>
            </Link>
            <p className="text-brand-green font-medium">GREIPR GROUP</p>
            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
              <span>N100k/yr</span>
              <span>•</span>
              <span>Ojota, Lagos</span>
              <span>•</span>
              <span>12 applied</span>
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-red-500">
          <Heart />
        </button>
      </div>
      
      <p className="mt-4 text-gray-600">
        GREIPR GROUP is a pioneering technology company that has redefined the way we access, organize, and utilize information.
        Through its powerful platform, the company has empowered individuals across the globe to access vast opportunities.
      </p>

      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-2">
          <span className="bg-green-50 text-brand-green px-3 py-1 rounded-full text-sm">Hospitality</span>
          <span className="bg-green-50 text-brand-green px-3 py-1 rounded-full text-sm">Kitchen assistant</span>
        </div>
        <Link to={`/job/${id}`} className="text-sm text-brand-green hover:underline">
          View details →
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
