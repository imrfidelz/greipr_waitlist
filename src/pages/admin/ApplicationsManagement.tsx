import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Tag, FileText, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Application {
  id: string;
  applicantName: string;
  applicantPhoto: string;
  location: string;
  message: string;
  jobTitle: string;
  company: string;
  jobLocation: string;
  applicantsCount: number;
  companyDescription: string;
  tags: string[];
  status: 'active' | 'accepted' | 'declined';
  submittedTime: string;
  isSaved: boolean;
}

const mockApplications: Application[] = [
  {
    id: '1',
    applicantName: 'Benjamin Franklin',
    applicantPhoto: '/lovable-uploads/0d41e9be-6f02-4111-b099-c5debea9ed50.png',
    location: 'Lagos, Nigeria',
    message: 'I am writing to express my strong interest in the Kitchen Assistant position at [Company Name], as advertised on [where you found the job listing]. As a dedicated and detail-oriented individual, I am confident that my passion for food and my commitment to maintaining a clean and efficient kitchen environment make me an ideal candidate...',
    jobTitle: 'Kitchen Assistant',
    company: 'GREPR GROUP',
    jobLocation: 'N100Juyr • Ojota, Lagos',
    applicantsCount: 12,
    companyDescription: 'GREPR GROUP is a pioneering technology company that has redefined the way we access, organize, and utilize information. Established in 1998, Google has become synonymous with online search and innovation. Through its powerful search engine, the company has empowered individuals across the globe to access a vast repository of knowledge at their fingertips.',
    tags: ['Hospitality', 'Kitchen assistant'],
    status: 'active',
    submittedTime: '2 hours ago',
    isSaved: false
  },
  {
    id: '2',
    applicantName: 'Sarah Johnson',
    applicantPhoto: '/lovable-uploads/60246116-1823-4009-939d-620e4a6c7f12.png',
    location: 'Abuja, Nigeria',
    message: 'I am excited to apply for the Software Engineer position. With 5 years of experience in full-stack development and a strong background in React and Node.js, I believe I can contribute significantly to your team...',
    jobTitle: 'Software Engineer',
    company: 'Tech Innovations Ltd',
    jobLocation: 'Abuja',
    applicantsCount: 8,
    companyDescription: 'Tech Innovations Ltd is a leading software development company specializing in cutting-edge solutions for businesses.',
    tags: ['Technology', 'Software Development'],
    status: 'accepted',
    submittedTime: '1 day ago',
    isSaved: true
  },
  {
    id: '3',
    applicantName: 'Michael Chen',
    applicantPhoto: '/lovable-uploads/7a9376ab-111f-4036-bf63-3a1c97b5eae4.png',
    location: 'Port Harcourt, Nigeria',
    message: 'Thank you for considering my application for the Marketing Manager role. I have over 7 years of experience in digital marketing and brand strategy...',
    jobTitle: 'Marketing Manager',
    company: 'Brand Solutions Inc',
    jobLocation: 'Port Harcourt',
    applicantsCount: 15,
    companyDescription: 'Brand Solutions Inc helps businesses build and grow their brand presence across multiple channels.',
    tags: ['Marketing', 'Management'],
    status: 'declined',
    submittedTime: '3 days ago',
    isSaved: false
  }
];

export default function ApplicationsManagement() {
  const [activeTab, setActiveTab] = useState<'active' | 'accepted' | 'declined'>('active');
  const [savedApplications, setSavedApplications] = useState<Set<string>>(new Set());

  const filteredApplications = mockApplications.filter(app => app.status === activeTab);

  const toggleSave = (id: string) => {
    setSavedApplications(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleViewProfile = (id: string) => {
    console.log('View profile:', id);
  };
  const handleInterview = (id: string) => {
    console.log('handle Interview:', id);
  };
  const handleViewResume = (id: string) => {
    console.log('View resume:', id);
  };

  return (
    <AdminLayout title="Applications Management">
      <div className="space-y-6">
        {filteredApplications.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No {activeTab} applications found.</p>
            </CardContent>
          </Card>
        ) : (
          filteredApplications.map((application) => (
            <Card key={application.id} className="overflow-hidden">
              <CardContent className="p-6">
                {/* Applicant Details Section */}
                <div className="border-t pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={application.applicantPhoto} />
                      <AvatarFallback>{application.applicantName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold">{application.applicantName}</h4>
                      <p className="text-sm text-muted-foreground">{application.location}</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {application.message}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewResume(application.id)}
                        className="border-green-700 text-green-700 hover:bg-green-50"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Resume
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleInterview(application.id)}
                        className="border-green-700 text-green-700 hover:bg-green-50"
                      >
                      <Tag className="h-4 w-4 mr-2" />
                        Interview
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewProfile(application.id)}
                        className="border-green-700 text-green-700 hover:bg-green-50"
                      >
                        <User className="h-4 w-4 mr-2" />
                        View Profile
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Submitted {application.submittedTime}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </AdminLayout>
  );
}
