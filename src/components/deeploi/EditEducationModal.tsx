import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { GraduationCap, Calendar, FileText, ChevronRight, ChevronLeft } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

export interface EducationFormData {
  _id?: string;
  school: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate?: string;
  grade?: string;
  description?: string;
}

interface EditEducationModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: EducationFormData) => void;
  initialData?: EducationFormData;
  isEditing: boolean;
}

const EditEducationModal = ({ 
  open, 
  onClose, 
  onSave, 
  initialData,
  isEditing
}: EditEducationModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<EducationFormData>(
    initialData || {
      school: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      grade: '',
      description: ''
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
        if (!formData.school.trim()) {
          toast({
            title: "Missing Information",
            description: "Please enter the school/institution name.",
            variant: "destructive"
          });
          return false;
        }
        return true;
      case 2:
        if (!formData.startDate) {
          toast({
            title: "Missing Information",
            description: "Please select a start date.",
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
    // Prevent Enter key from submitting form on non-final steps
    if (e.key === 'Enter' && currentStep < totalSteps) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const stepTitles = [
    { icon: GraduationCap, title: 'Institution & Program' },
    { icon: Calendar, title: 'Timeline' },
    { icon: FileText, title: 'Details' }
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {isEditing ? 'Edit' : 'Add'} Education
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
          {/* Step 1: Institution & Program */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="school" className="text-base font-semibold">
                  School/Institution *
                </Label>
                <Input
                  id="school"
                  value={formData.school}
                  onChange={(e) => handleChange('school', e.target.value)}
                  placeholder="e.g. University of Lagos"
                  className="h-11"
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="degree" className="text-base font-semibold">
                    Degree
                  </Label>
                  <Input
                    id="degree"
                    value={formData.degree || ''}
                    onChange={(e) => handleChange('degree', e.target.value)}
                    placeholder="e.g. Bachelor's"
                    className="h-11"
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fieldOfStudy" className="text-base font-semibold">
                    Field of Study
                  </Label>
                  <Input
                    id="fieldOfStudy"
                    value={formData.fieldOfStudy || ''}
                    onChange={(e) => handleChange('fieldOfStudy', e.target.value)}
                    placeholder="e.g. Computer Science"
                    className="h-11"
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Timeline */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-base font-semibold">
                    Start Date *
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleChange('startDate', e.target.value)}
                    className="h-11"
                    onKeyDown={handleKeyDown}
                    autoFocus
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-base font-semibold">
                    End Date
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate || ''}
                    onChange={(e) => handleChange('endDate', e.target.value)}
                    className="h-11"
                    onKeyDown={handleKeyDown}
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave empty if currently studying
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Details */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="grade" className="text-base font-semibold">
                  Grade/GPA
                </Label>
                <Input
                  id="grade"
                  value={formData.grade || ''}
                  onChange={(e) => handleChange('grade', e.target.value)}
                  placeholder="e.g. 3.8/4.0 or First Class"
                  className="h-11"
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-semibold">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Activities, societies, achievements, honors..."
                  rows={5}
                  onKeyDown={handleKeyDown}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Share relevant activities, honors, or achievements
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
                  {isEditing ? 'Save Changes' : 'Add Education'}
                </Button>
              )}
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEducationModal;
