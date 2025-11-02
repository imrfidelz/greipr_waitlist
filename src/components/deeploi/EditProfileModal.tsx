import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

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

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: ProfileFormData) => void;
  initialData?: ProfileFormData;
}

const EditProfileModal = ({ 
  open, 
  onClose, 
  onSave, 
  initialData
}: EditProfileModalProps) => {
  const [formData, setFormData] = useState<ProfileFormData>(
    initialData || {
      headline: '',
      bio: '',
      location: {},
      jobPreferencesType: [],
      socialLinks: {}
    }
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="headline">Headline</Label>
            <Input
              id="headline"
              value={formData.headline || ''}
              onChange={(e) => handleChange('headline', e.target.value)}
              placeholder="e.g. Full Stack Developer | React Expert"
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio || ''}
              onChange={(e) => handleChange('bio', e.target.value)}
              placeholder="Tell us about yourself..."
              rows={4}
              maxLength={500}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={formData.location?.country || ''}
                onChange={(e) => handleNestedChange('location', 'country', e.target.value)}
                placeholder="Nigeria"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={formData.location?.state || ''}
                onChange={(e) => handleNestedChange('location', 'state', e.target.value)}
                placeholder="Lagos"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.location?.city || ''}
                onChange={(e) => handleNestedChange('location', 'city', e.target.value)}
                placeholder="Ikeja"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Job Preferences</Label>
            <div className="grid grid-cols-2 gap-2">
              {['Full-time', 'Part-time', 'Remote', 'Hybrid', 'Contract'].map(type => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    checked={formData.jobPreferencesType?.includes(type)}
                    onCheckedChange={() => handleJobPrefChange(type)}
                  />
                  <label htmlFor={type} className="text-sm cursor-pointer">{type}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
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
              <Label htmlFor="maritalStatus">Marital Status</Label>
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
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth || ''}
              onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Social Links</Label>
            <div className="space-y-2">
              <Input
                placeholder="LinkedIn URL"
                value={formData.socialLinks?.linkedin || ''}
                onChange={(e) => handleNestedChange('socialLinks', 'linkedin', e.target.value)}
              />
              <Input
                placeholder="GitHub URL"
                value={formData.socialLinks?.github || ''}
                onChange={(e) => handleNestedChange('socialLinks', 'github', e.target.value)}
              />
              <Input
                placeholder="Portfolio URL"
                value={formData.socialLinks?.portfolio || ''}
                onChange={(e) => handleNestedChange('socialLinks', 'portfolio', e.target.value)}
              />
              <Input
                placeholder="Twitter URL"
                value={formData.socialLinks?.twitter || ''}
                onChange={(e) => handleNestedChange('socialLinks', 'twitter', e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="relocationWillingness"
              checked={formData.relocationWillingness || false}
              onCheckedChange={(checked) => handleChange('relocationWillingness', checked)}
            />
            <label htmlFor="relocationWillingness" className="text-sm cursor-pointer">
              Willing to relocate
            </label>
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
