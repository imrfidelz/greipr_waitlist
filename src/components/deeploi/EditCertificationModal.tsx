import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Award, Calendar, Link2, ChevronRight, ChevronLeft } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

export interface CertificationFormData {
  _id?: string;
  name: string;
  organization?: string;
  issueDate: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

interface EditCertificationModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: CertificationFormData) => void;
  initialData?: CertificationFormData;
  isEditing: boolean;
}

const EditCertificationModal = ({ 
  open, 
  onClose, 
  onSave, 
  initialData,
  isEditing
}: EditCertificationModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CertificationFormData>(
    initialData || {
      name: '',
      organization: '',
      issueDate: '',
      expirationDate: '',
      credentialId: '',
      credentialUrl: ''
    }
  );

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (open) {
      setCurrentStep(1);
    }
  }, [open]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.name.trim()) {
          toast({
            title: "Missing Information",
            description: "Please enter the certification name.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      case 2:
        if (!formData.issueDate) {
          toast({
            title: "Missing Information",
            description: "Please select an issue date.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      case 3:
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (currentStep === totalSteps) {
      onSave(formData);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentStep < totalSteps) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const stepTitles = [
    { icon: Award, title: 'Basic Information' },
    { icon: Calendar, title: 'Dates' },
    { icon: Link2, title: 'Credentials' }
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {isEditing ? 'Edit' : 'Add'} Certification
          </DialogTitle>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="space-y-3">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between items-center">
            {stepTitles.map((step, index) => {
              const StepIcon = step.icon;
              const stepNumber = index + 1;
              const isActive = currentStep === stepNumber;
              const isCompleted = currentStep > stepNumber;
              
              return (
                <div 
                  key={stepNumber} 
                  className={`flex flex-col items-center gap-2 flex-1 ${
                    isActive ? 'opacity-100' : 'opacity-50'
                  }`}
                >
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isActive 
                        ? 'bg-primary text-primary-foreground scale-110 shadow-lg' 
                        : isCompleted
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-medium text-center ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} noValidate onKeyDownCapture={handleKeyDown} className="space-y-6 mt-6">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-semibold">
                  Certification Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="e.g. AWS Certified Solutions Architect"
                  className="h-11"
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization" className="text-base font-semibold">
                  Issuing Organization
                </Label>
                <Input
                  id="organization"
                  value={formData.organization || ''}
                  onChange={(e) => handleChange('organization', e.target.value)}
                  placeholder="e.g. Amazon Web Services"
                  className="h-11"
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
          )}

          {/* Step 2: Dates */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="issueDate" className="text-base font-semibold">
                    Issue Date *
                  </Label>
                  <Input
                    id="issueDate"
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) => handleChange('issueDate', e.target.value)}
                    className="h-11"
                    onKeyDown={handleKeyDown}
                    autoFocus
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expirationDate" className="text-base font-semibold">
                    Expiration Date
                  </Label>
                  <Input
                    id="expirationDate"
                    type="date"
                    value={formData.expirationDate || ''}
                    onChange={(e) => handleChange('expirationDate', e.target.value)}
                    className="h-11"
                    onKeyDown={handleKeyDown}
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave empty if it doesn't expire
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Credentials */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="credentialId" className="text-base font-semibold">
                  Credential ID
                </Label>
                <Input
                  id="credentialId"
                  value={formData.credentialId || ''}
                  onChange={(e) => handleChange('credentialId', e.target.value)}
                  placeholder="e.g. ABC123XYZ"
                  className="h-11"
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
                <p className="text-xs text-muted-foreground">
                  The unique identifier for this certification
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="credentialUrl" className="text-base font-semibold">
                  Credential URL
                </Label>
                <Input
                  id="credentialUrl"
                  type="url"
                  value={formData.credentialUrl || ''}
                  onChange={(e) => handleChange('credentialUrl', e.target.value)}
                  placeholder="https://..."
                  className="h-11"
                  onKeyDown={handleKeyDown}
                />
                <p className="text-xs text-muted-foreground">
                  Link to verify your certification online
                </p>
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between items-center gap-3 mt-8">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="order-first"
            >
              Cancel
            </Button>
            
            <div className="flex gap-2">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
              )}
              
              {currentStep < totalSteps ? (
                <Button type="button" onClick={handleNext}>
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button type="button" onClick={() => handleSubmit()}>
                  {isEditing ? 'Save Changes' : 'Add Certification'}
                </Button>
              )}
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCertificationModal;
