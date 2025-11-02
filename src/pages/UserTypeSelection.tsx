
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, GraduationCap } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const UserTypeSelection = () => {
  const [selectedType, setSelectedType] = useState<'employers' | 'user' | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSelection = (type: 'employers' | 'user') => {
    setSelectedType(type);
  };

  const handleContinue = async () => {
    if (!selectedType) {
      toast({
        title: "Selection required",
        description: "Please select whether you're an employer or a candidate",
        variant: "destructive",
      });
      return;
    }

    try {
      // Save the user type to backend
      const { authService } = await import('@/services');
      await authService.setUserType(selectedType);

      toast({
        title: "Profile set up successfully",
        description: `You're now registered as ${selectedType === 'employers' ? 'an employer' : 'a candidate'}`,
      });

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Error setting user type:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to set user type. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen">
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">How will you use Greipr?</h1>
            <p className="text-gray-600">Select how you want to use our platform. This will personalize your experience.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Employer Card */}
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedType === 'employers' ? 'ring-2 ring-brand-green' : ''
              }`}
              onClick={() => handleSelection('employers')}
            >
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Briefcase className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">I'm an Employer</h3>
                <p className="text-gray-600 mb-6">
                  Post jobs, review applications, and find the best candidates for your company.
                </p>
                <ul className="text-sm text-left space-y-2 w-full">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-green">✓</span>
                    <span>Post unlimited job listings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-green">✓</span>
                    <span>Verified candidate profiles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-green">✓</span>
                    <span>Schedule interviews</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Candidate Card */}
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedType === 'user' ? 'ring-2 ring-brand-green' : ''
              }`}
              onClick={() => handleSelection('user')}
            >
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <GraduationCap className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">I'm a Candidate</h3>
                <p className="text-gray-600 mb-6">
                  Find job opportunities, apply to positions, and advance your career.
                </p>
                <ul className="text-sm text-left space-y-2 w-full">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-green">✓</span>
                    <span>Apply to verified jobs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-green">✓</span>
                    <span>Professional CV builder</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-green">✓</span>
                    <span>Interview preparation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-10 text-center">
            <Button
              onClick={handleContinue}
              className="bg-brand-green hover:bg-brand-green-light text-white px-8 py-6 text-lg"
              disabled={!selectedType}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default UserTypeSelection;
