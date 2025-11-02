
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export type ResumeSectionType = 'experience' | 'education' | 'certification';

export interface ResumeItemFormData {
  id?: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  verified?: 'pending' | 'confirmed' | null;
}

interface EditResumeModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: ResumeItemFormData) => void;
  type: ResumeSectionType;
  initialData?: ResumeItemFormData;
  isEditing: boolean;
}

const EditResumeModal = ({ 
  open, 
  onClose, 
  onSave, 
  type, 
  initialData,
  isEditing
}: EditResumeModalProps) => {
  const [formData, setFormData] = useState<ResumeItemFormData>(
    initialData || {
      title: '',
      organization: '',
      period: '',
      description: '',
      verified: type === 'experience' ? null : undefined
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const getTitle = () => {
    const action = isEditing ? 'Edit' : 'Add';
    switch (type) {
      case 'experience':
        return `${action} Work Experience`;
      case 'education':
        return `${action} Education`;
      case 'certification':
        return `${action} Certification`;
      default:
        return `${action} Resume Item`;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">
              {type === 'experience' ? 'Job Title' : type === 'education' ? 'Degree/Program' : 'Certification Name'}
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder={
                type === 'experience' 
                  ? 'e.g. Software Engineer' 
                  : type === 'education' 
                    ? 'e.g. Bachelor of Science in Computer Science' 
                    : 'e.g. AWS Certified Solutions Architect'
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="organization">
              {type === 'experience' ? 'Company' : type === 'education' ? 'Institution' : 'Issuing Organization'}
            </Label>
            <Input
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder={
                type === 'experience' 
                  ? 'e.g. Acme Inc.' 
                  : type === 'education' 
                    ? 'e.g. University of Lagos' 
                    : 'e.g. Amazon Web Services'
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="period">Time Period</Label>
            <Input
              id="period"
              name="period"
              value={formData.period}
              onChange={handleChange}
              placeholder="e.g. 2020 - Present or Jan 2020 - Dec 2022"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Briefly describe your role, responsibilities, achievements, etc."
              rows={4}
              required
            />
          </div>
          
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">{isEditing ? 'Save Changes' : 'Add'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditResumeModal;
