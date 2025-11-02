import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, Clock, Home, Building2, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { authService, candidateService } from '@/services';
import DashboardLayout from '@/components/deeploi/DashboardLayout';

export interface ProfileFormData {
  headline?: string;
  bio?: string;
  location?: {
    country?: string;
    state?: string;
    city?: string;
  };
  jobPreferencesType?: string[];
  maritalStatus?: string;
  gender?: string;
  dateOfBirth?: string;
  preferredIndustries?: string[];
  relocationWillingness?: boolean;
  preferredLocations?: string[];
  socialLinks?: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
    twitter?: string;
  };
}

const EditProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [candidateData, setCandidateData] = useState<any>(null);
  
  const [formData, setFormData] = useState<ProfileFormData>({
    headline: '',
    bio: '',
    location: {},
    jobPreferencesType: [],
    socialLinks: {}
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          toast({
            title: "Authentication Required",
            description: "Please log in to edit your profile.",
            variant: "destructive"
          });
          navigate('/login');
          return;
        }

        // Fetch candidate profile data
        const candidateResponse = await candidateService.getMyCandidate();
        const candidate = candidateResponse.data.data;
        setCandidateData(candidate);
        
        setFormData({
          headline: candidate?.headline || '',
          bio: candidate?.bio || '',
          location: candidate?.location || {},
          jobPreferencesType: candidate?.jobPreferencesType || [],
          maritalStatus: candidate?.maritalStatus || '',
          gender: candidate?.gender || '',
          dateOfBirth: candidate?.dateOfBirth ? new Date(candidate.dateOfBirth).toISOString().split('T')[0] : '',
          preferredIndustries: candidate?.preferredIndustries || [],
          relocationWillingness: candidate?.relocationWillingness || false,
          preferredLocations: candidate?.preferredLocations || [],
          socialLinks: candidate?.socialLinks || {}
        });
      } catch (error: any) {
        console.error('Error fetching profile data:', error);
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [navigate, toast]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof ProfileFormData] as any),
        [field]: value
      }
    }));
  };

  const handleJobPrefChange = (value: string) => {
    setFormData(prev => {
      const current = prev.jobPreferencesType || [];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, jobPreferencesType: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSaving(true);
      console.log('Starting profile update...');
      
      // Update candidate profile
      const candidateUpdateData = {
        headline: formData.headline,
        bio: formData.bio,
        location: formData.location,
        jobPreferencesType: formData.jobPreferencesType,
        maritalStatus: formData.maritalStatus,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        preferredIndustries: formData.preferredIndustries,
        relocationWillingness: formData.relocationWillingness,
        preferredLocations: formData.preferredLocations,
        socialLinks: formData.socialLinks
      };
      
      console.log('Updating candidate data:', candidateUpdateData);
      console.log('Candidate ID:', candidateData?._id);
      
      if (candidateData?._id) {
        const response = await candidateService.updateCandidate(candidateData._id, candidateUpdateData);
        console.log('Candidate update response:', response.data);
      } else {
        const response = await candidateService.createOrUpdateCandidate(candidateUpdateData);
        console.log('Candidate create response:', response.data);
      }
      
      console.log('Profile update completed successfully');
      
      toast({
        title: "Success",
        description: "Profile updated successfully"
      });
      
      navigate('/profile');
    } catch (error: any) {
      console.error('Profile update error:', error);
      console.error('Error response:', error.response?.data);
      toast({
        title: "Error",
        description: error.response?.data?.error || error.message || "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-full">
          <div className="text-center">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-full bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/profile')}
              className="mb-6 -ml-2 hover:bg-accent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Profile
            </Button>
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Edit Profile</h1>
              <p className="text-muted-foreground text-lg">Keep your professional information up to date</p>
            </div>
          </div>

          {/* Form Container with Fixed Actions */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Form */}
            <div className="flex-1">
              <form id="editProfileForm" onSubmit={handleSubmit} className="space-y-6">
                {/* Professional Information Section */}
                <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                  <div className="bg-muted/50 px-6 py-4 border-b">
                    <h2 className="text-xl font-semibold">Professional Information</h2>
                    <p className="text-sm text-muted-foreground mt-1">Your headline and bio help employers understand your expertise</p>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="headline" className="text-sm font-medium">
                        Professional Headline *
                      </Label>
                      <Input
                        id="headline"
                        value={formData.headline || ''}
                        onChange={(e) => handleChange('headline', e.target.value)}
                        placeholder="e.g. Full Stack Developer | React Expert"
                        maxLength={100}
                        className="text-base"
                      />
                      <p className="text-xs text-muted-foreground">
                        {formData.headline?.length || 0}/100 characters
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-sm font-medium">
                        Professional Bio
                      </Label>
                      <Textarea
                        id="bio"
                        value={formData.bio || ''}
                        onChange={(e) => handleChange('bio', e.target.value)}
                        placeholder="Share your professional story, key achievements, and what makes you unique..."
                        rows={5}
                        maxLength={500}
                        className="text-base resize-none"
                      />
                      <p className="text-xs text-muted-foreground">
                        {formData.bio?.length || 0}/500 characters
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location Section */}
                <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                  <div className="bg-muted/50 px-6 py-4 border-b">
                    <h2 className="text-xl font-semibold">Location</h2>
                    <p className="text-sm text-muted-foreground mt-1">Where are you based?</p>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="country" className="text-sm font-medium">Country</Label>
                        <Input
                          id="country"
                          value={formData.location?.country || ''}
                          onChange={(e) => handleNestedChange('location', 'country', e.target.value)}
                          placeholder="Nigeria"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state" className="text-sm font-medium">State</Label>
                        <Input
                          id="state"
                          value={formData.location?.state || ''}
                          onChange={(e) => handleNestedChange('location', 'state', e.target.value)}
                          placeholder="Lagos"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-sm font-medium">City</Label>
                        <Input
                          id="city"
                          value={formData.location?.city || ''}
                          onChange={(e) => handleNestedChange('location', 'city', e.target.value)}
                          placeholder="Ikeja"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="relocationWillingness"
                          checked={formData.relocationWillingness || false}
                          onCheckedChange={(checked) => handleChange('relocationWillingness', checked)}
                          className="mt-1"
                        />
                        <div className="space-y-1">
                          <label htmlFor="relocationWillingness" className="text-sm font-medium cursor-pointer">
                            Open to relocation
                          </label>
                          <p className="text-xs text-muted-foreground">
                            I'm willing to relocate for the right opportunity
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Job Preferences Section */}
                <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                  <div className="bg-muted/50 px-6 py-4 border-b">
                    <h2 className="text-xl font-semibold">Job Preferences</h2>
                    <p className="text-sm text-muted-foreground mt-1">Select all work arrangements you're interested in</p>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { 
                          type: 'Full-time', 
                          icon: Briefcase, 
                          description: 'Standard 40-hour work week',
                          color: 'primary'
                        },
                        { 
                          type: 'Part-time', 
                          icon: Clock, 
                          description: 'Flexible hours, less than full-time',
                          color: 'primary'
                        },
                        { 
                          type: 'Remote', 
                          icon: Home, 
                          description: 'Work from anywhere',
                          color: 'primary'
                        },
                        { 
                          type: 'Hybrid', 
                          icon: Building2, 
                          description: 'Mix of office and remote work',
                          color: 'primary'
                        },
                        { 
                          type: 'Contract', 
                          icon: FileText, 
                          description: 'Project-based or temporary',
                          color: 'primary'
                        }
                      ].map(({ type, icon: Icon, description }) => {
                        const isSelected = formData.jobPreferencesType?.includes(type);
                        return (
                          <div
                            key={type}
                            onClick={() => handleJobPrefChange(type)}
                            className={`
                              relative group cursor-pointer rounded-xl p-5 border-2 transition-all duration-200
                              ${isSelected 
                                ? 'border-primary bg-primary/5 shadow-md hover:shadow-lg' 
                                : 'border-border bg-background hover:border-primary/30 hover:bg-accent/50'
                              }
                            `}
                          >
                            {/* Selected indicator */}
                            <div className={`
                              absolute top-3 right-3 w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center
                              ${isSelected 
                                ? 'border-primary bg-primary' 
                                : 'border-muted-foreground/30 bg-background'
                              }
                            `}>
                              {isSelected && (
                                <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 12 12">
                                  <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                                </svg>
                              )}
                            </div>

                            {/* Icon */}
                            <div className={`
                              w-12 h-12 rounded-lg flex items-center justify-center mb-3 transition-all duration-200
                              ${isSelected 
                                ? 'bg-primary/10 text-primary' 
                                : 'bg-muted text-muted-foreground group-hover:bg-primary/5 group-hover:text-primary'
                              }
                            `}>
                              <Icon className="w-6 h-6" />
                            </div>

                            {/* Content */}
                            <div>
                              <h3 className={`font-semibold text-base mb-1 transition-colors ${
                                isSelected ? 'text-foreground' : 'text-foreground'
                              }`}>
                                {type}
                              </h3>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Selection Summary */}
                    {formData.jobPreferencesType && formData.jobPreferencesType.length > 0 && (
                      <div className="mt-6 pt-6 border-t">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">
                            {formData.jobPreferencesType.length} preference{formData.jobPreferencesType.length !== 1 ? 's' : ''} selected:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {formData.jobPreferencesType.map(type => (
                              <span key={type} className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Personal Information Section */}
                <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                  <div className="bg-muted/50 px-6 py-4 border-b">
                    <h2 className="text-xl font-semibold">Personal Information</h2>
                    <p className="text-sm text-muted-foreground mt-1">Optional details for a complete profile</p>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="gender" className="text-sm font-medium">Gender</Label>
                        <Select value={formData.gender || ''} onValueChange={(value) => handleChange('gender', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maritalStatus" className="text-sm font-medium">Marital Status</Label>
                        <Select value={formData.maritalStatus || ''} onValueChange={(value) => handleChange('maritalStatus', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married</SelectItem>
                            <SelectItem value="divorced">Divorced</SelectItem>
                            <SelectItem value="widowed">Widowed</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth" className="text-sm font-medium">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth || ''}
                        onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Social Links Section */}
                <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                  <div className="bg-muted/50 px-6 py-4 border-b">
                    <h2 className="text-xl font-semibold">Social & Professional Links</h2>
                    <p className="text-sm text-muted-foreground mt-1">Connect your professional profiles</p>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="linkedin" className="text-sm font-medium">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          placeholder="https://linkedin.com/in/yourprofile"
                          value={formData.socialLinks?.linkedin || ''}
                          onChange={(e) => handleNestedChange('socialLinks', 'linkedin', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="github" className="text-sm font-medium">GitHub</Label>
                        <Input
                          id="github"
                          placeholder="https://github.com/yourusername"
                          value={formData.socialLinks?.github || ''}
                          onChange={(e) => handleNestedChange('socialLinks', 'github', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="portfolio" className="text-sm font-medium">Portfolio</Label>
                        <Input
                          id="portfolio"
                          placeholder="https://yourportfolio.com"
                          value={formData.socialLinks?.portfolio || ''}
                          onChange={(e) => handleNestedChange('socialLinks', 'portfolio', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="twitter" className="text-sm font-medium">Twitter / X</Label>
                        <Input
                          id="twitter"
                          placeholder="https://twitter.com/yourusername"
                          value={formData.socialLinks?.twitter || ''}
                          onChange={(e) => handleNestedChange('socialLinks', 'twitter', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Action Buttons */}
                <div className="lg:hidden flex gap-3 sticky bottom-4 bg-background/95 backdrop-blur-sm p-4 rounded-lg border shadow-lg">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate('/profile')}
                    disabled={isSaving}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSaving} className="flex-1">
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </div>

            {/* Sticky Sidebar for Desktop */}
            <div className="hidden lg:block lg:w-80">
              <div className="sticky top-6 space-y-4">
                {/* Quick Actions Card */}
                <div className="bg-card rounded-xl border shadow-sm p-6">
                  <h3 className="font-semibold text-lg mb-4">Actions</h3>
                  <div className="space-y-3">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => navigate('/profile')}
                      disabled={isSaving}
                      className="w-full justify-start"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      form="editProfileForm"
                      disabled={isSaving}
                      className="w-full"
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </div>

                {/* Tips Card */}
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20 p-6">
                  <h3 className="font-semibold text-lg mb-3">Profile Tips</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>A strong headline helps you stand out to employers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Keep your bio concise and highlight key achievements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Link your professional profiles to build credibility</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Complete profiles get 3x more views</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditProfile;
