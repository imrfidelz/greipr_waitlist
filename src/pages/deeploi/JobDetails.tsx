import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Building, 
  GraduationCap, 
  Check, 
  Shield,
  ArrowLeft,
  Share2,
  Heart
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import DashboardLayout from '@/components/deeploi/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const JobDetails = () => {
  const [saved, setSaved] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log("JobDetails page loaded with ID:", id);
  }, [id]);

  const toggleSaved = () => {
    setSaved(!saved);
  };

  const goBack = () => {
    navigate(-1);
  };

  const job = {
    id: id || '1',
    title: 'Senior Chef',
    company: 'Cuisine Palace',
    location: 'Lekki, Lagos',
    salary: 'N150k - N200k/month',
    employmentType: 'Full-time',
    experienceLevel: '3+ years',
    postedDate: '3 days ago',
    description: `Cuisine Palace is looking for an experienced Senior Chef to join our team. The ideal candidate will have extensive knowledge of local and international cuisines, strong leadership abilities, and a passion for creating exceptional dining experiences.

    As a Senior Chef at Cuisine Palace, you will be responsible for managing the kitchen staff, developing new recipes, ensuring food quality, and maintaining food safety standards.`,
    responsibilities: [
      'Supervise and coordinate kitchen staff in daily activities',
      'Develop and implement new recipes and menu items',
      'Ensure consistent food quality and presentation',
      'Manage inventory and food ordering',
      'Train and mentor junior kitchen staff',
      'Adhere to and enforce food safety regulations',
      'Collaborate with restaurant management on menu planning and special events'
    ],
    requirements: [
      'Minimum of 3 years experience as a Chef or Sous Chef',
      'Proven culinary skills and knowledge of various cuisines',
      'Strong leadership and team management abilities',
      'Excellent communication and organizational skills',
      'Knowledge of food safety regulations and procedures',
      'Ability to work in a fast-paced environment',
      'Culinary degree or equivalent professional certification preferred'
    ],
    benefits: [
      'Competitive salary package',
      'Health insurance',
      'Performance bonuses',
      'Professional development opportunities',
      'Staff meals',
      'Flexible scheduling options'
    ],
    companyInfo: 'Cuisine Palace is a prestigious restaurant known for its exceptional dining experience, featuring a fusion of local and international cuisines. With multiple locations across Lagos, we are committed to providing our customers with extraordinary culinary experiences while fostering a collaborative and growth-oriented environment for our staff.',
    isVerified: true
  };

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Invalid job ID. Please try again.</p>
      </div>
    );
  }

  return (
    <DashboardLayout title="Job Details">
      <div className="max-w-5xl mx-auto p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={goBack}
              className="flex items-center text-gray-600 hover:text-brand-green transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span>Back to Jobs</span>
            </button>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <img 
                src="/lovable-uploads/0d41e9be-6f02-4111-b099-c5debea9ed50.png" 
                alt="Profile" 
                className="w-10 h-10 rounded-full"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 md:p-8 border-b">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex gap-4">
                  <img 
                    src="/lovable-uploads/60246116-1823-4009-939d-620e4a6c7f12.png"
                    alt="Company Logo"
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <div className="flex items-center flex-wrap gap-2">
                      <h1 className="text-2xl font-bold">{job.title}</h1>
                      {job.isVerified && (
                        <div className="bg-green-100 text-brand-green text-xs px-2 py-1 rounded-full flex items-center">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </div>
                      )}
                    </div>
                    <p className="text-brand-green font-medium">{job.company}</p>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-1">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>Posted {job.postedDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                  <Button 
                    variant="outline" 
                    className={`flex items-center gap-2 ${saved ? 'bg-red-50 text-red-500 border-red-200' : 'text-gray-600'}`}
                    onClick={toggleSaved}
                  >
                    <Heart className={`w-4 h-4 ${saved ? 'fill-red-500 text-red-500' : ''}`} />
                    {saved ? 'Saved' : 'Save'}
                  </Button>
                  <Button className="bg-brand-green hover:bg-brand-green-light">
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <div className="px-6 md:px-8 border-b">
                <TabsList className="bg-transparent h-12 p-0 w-full justify-start space-x-6">
                  <TabsTrigger 
                    value="overview" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-brand-green data-[state=active]:text-brand-green rounded-none h-12 px-1"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="company" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-brand-green data-[state=active]:text-brand-green rounded-none h-12 px-1"
                  >
                    Company
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reviews" 
                    className="data-[state=active]:border-b-2 data-[state=active]:border-brand-green data-[state=active]:text-brand-green rounded-none h-12 px-1"
                  >
                    Reviews
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="pt-4 px-6 md:px-8 pb-8 focus-visible:outline-none focus-visible:ring-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-brand-green" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Salary</p>
                      <p className="font-medium">{job.salary}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-brand-green" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Job Type</p>
                      <p className="font-medium">{job.employmentType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-brand-green" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Experience</p>
                      <p className="font-medium">{job.experienceLevel}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                  <p className="text-gray-600 whitespace-pre-line">{job.description}</p>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Responsibilities</h2>
                  <ul className="space-y-2">
                    {job.responsibilities.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-brand-green mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                  <ul className="space-y-2">
                    {job.requirements.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-brand-green mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Benefits</h2>
                  <ul className="space-y-2">
                    {job.benefits.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-brand-green mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-center mt-8">
                  <Button className="bg-brand-green hover:bg-brand-green-light px-12 py-6 text-lg h-auto">
                    Apply for this Position
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="company" className="pt-4 px-6 md:px-8 pb-8 focus-visible:outline-none focus-visible:ring-0">
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">About {job.company}</h2>
                  <p className="text-gray-600">{job.companyInfo}</p>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Company Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3">
                      <Building className="w-5 h-5 text-brand-green" />
                      <div>
                        <p className="text-sm text-gray-500">Industry</p>
                        <p className="font-medium">Hospitality & Food Service</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-brand-green" />
                      <div>
                        <p className="text-sm text-gray-500">Company Size</p>
                        <p className="font-medium">50-100 employees</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-brand-green" />
                      <div>
                        <p className="text-sm text-gray-500">Headquarters</p>
                        <p className="font-medium">Lagos, Nigeria</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-brand-green" />
                      <div>
                        <p className="text-sm text-gray-500">Founded</p>
                        <p className="font-medium">2018</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Company Images</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                        <img 
                          src={`/lovable-uploads/bd43b7d1-6621-4952-9d72-b463780fe40e.png`} 
                          alt="Company" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Other Jobs at {job.company}</h2>
                  <div className="space-y-4">
                    {[
                      {title: "Kitchen Assistant", location: "Victoria Island, Lagos", type: "Full-time"},
                      {title: "Restaurant Manager", location: "Ikeja, Lagos", type: "Full-time"}
                    ].map((item, index) => (
                      <div key={index} className="p-4 border rounded-lg hover:border-brand-green transition-colors cursor-pointer">
                        <h3 className="font-medium">{item.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                          <span>{item.type}</span>
                          <span>•</span>
                          <span>{item.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="pt-4 px-6 md:px-8 pb-8 focus-visible:outline-none focus-visible:ring-0">
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Company Reviews</h2>
                    <Button variant="outline" className="text-brand-green border-brand-green hover:bg-green-50">
                      Write a Review
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {[
                      {
                        name: "Sarah O.",
                        rating: 4.5,
                        position: "Line Cook",
                        date: "2 months ago",
                        comment: "Great work environment with supportive management. The kitchen is well-equipped and there are opportunities for growth. Work-life balance could be better during peak seasons."
                      },
                      {
                        name: "Michael T.",
                        rating: 5,
                        position: "Senior Chef",
                        date: "4 months ago",
                        comment: "I've been working here for over a year and it's been an amazing experience. The team is collaborative and there's a real focus on quality and innovation. Management is responsive to feedback and genuinely cares about staff wellbeing."
                      }
                    ].map((review, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                              <span className="font-medium text-brand-green">{review.name.charAt(0)}</span>
                            </div>
                            <div>
                              <p className="font-medium">{review.name}</p>
                              <p className="text-sm text-gray-500">{review.position}</p>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            {review.date}
                          </div>
                        </div>
                        <div className="flex items-center mb-3">
                          {Array(5).fill(0).map((_, i) => (
                            <svg 
                              key={i} 
                              className={`w-5 h-5 ${i < Math.floor(review.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-2 text-sm font-medium text-gray-500">{review.rating}/5</span>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Similar Jobs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  id: "2",
                  title: "Executive Chef",
                  company: "Five Star Dining",
                  location: "Ikoyi, Lagos",
                  salary: "N200k - N250k/month"
                },
                {
                  id: "3",
                  title: "Head Chef",
                  company: "Gourmet Foods Ltd",
                  location: "Maryland, Lagos",
                  salary: "N180k - N220k/month"
                }
              ].map((job, index) => (
                <Link to={`/job/${job.id}`} key={index} className="bg-white p-4 rounded-lg shadow-sm border hover:border-brand-green transition-colors">
                  <h3 className="font-semibold">{job.title}</h3>
                  <p className="text-brand-green">{job.company}</p>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-1">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      <span>{job.salary}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
    </DashboardLayout>
  );
};

export default JobDetails;
