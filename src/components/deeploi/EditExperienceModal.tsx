import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Briefcase, Building2, MapPin, Calendar, FileText, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { cn } from "@/lib/utils";

export interface ExperienceFormData {
  _id?: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description?: string;
}

interface EditExperienceModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: ExperienceFormData) => void;
  initialData?: ExperienceFormData;
  isEditing: boolean;
}

const EditExperienceModal = ({ 
  open, 
  onClose, 
  onSave, 
  initialData,
  isEditing
}: EditExperienceModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  const [formData, setFormData] = useState<ExperienceFormData>(
    initialData || {
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: ''
    }
  );

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
        const step1Valid = !!(formData.title && formData.company);
        console.log('Step 1 validation:', { title: formData.title, company: formData.company, valid: step1Valid });
        return step1Valid;
      case 2:
        // Validate startDate and endDate (if not current)
        if (!formData.startDate) {
          console.log('Step 2 validation failed: no startDate');
          return false;
        }
        if (!formData.isCurrent && !formData.endDate) {
          console.log('Step 2 validation failed: not current and no endDate');
          return false;
        }
        console.log('Step 2 validation passed:', { startDate: formData.startDate, isCurrent: formData.isCurrent, endDate: formData.endDate });
        return true;
      case 3:
        console.log('Step 3 validation: always valid (description optional)');
        return true; // Description is optional
      default:
        return false;
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    console.log('Next button clicked, current step:', currentStep, 'validation:', validateStep(currentStep));
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Form submitted, current step:', currentStep);
    
    // Only submit if we're on the last step
    if (currentStep === totalSteps && validateStep(currentStep)) {
      console.log('Saving experience data:', formData);
      onSave(formData);
      setCurrentStep(1);
    } else {
      console.log('Form submission blocked - not on last step');
    }
  };

  const steps = [
    { number: 1, title: 'Position', icon: Briefcase },
    { number: 2, title: 'Timeline', icon: Calendar },
    { number: 3, title: 'Details', icon: FileText },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto animate-scale-in">
        <DialogHeader className="pb-6 border-b">
          <DialogDescription className="sr-only">
            {isEditing ? 'Edit' : 'Add'} work experience details across position, timeline, and description.
          </DialogDescription>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-brand-green" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold">
                {isEditing ? 'Edit' : 'Add'} Work Experience
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Step {currentStep} of {totalSteps}
              </p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mt-6 px-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isCompleted = currentStep > step.number;
              const isCurrent = currentStep === step.number;
              
              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                        isCompleted && "bg-brand-green text-white",
                        isCurrent && "bg-brand-green text-white ring-4 ring-brand-green/20",
                        !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                      )}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <StepIcon className="w-5 h-5" />
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-xs font-medium transition-colors",
                        (isCurrent || isCompleted) && "text-brand-green",
                        !isCompleted && !isCurrent && "text-muted-foreground"
                      )}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "h-0.5 flex-1 mx-2 transition-colors duration-300",
                        isCompleted ? "bg-brand-green" : "bg-muted"
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="py-6" onKeyDown={(e) => {
          // Prevent Enter key from submitting the form unless we're on the last step
          if (e.key === 'Enter' && currentStep < totalSteps) {
            e.preventDefault();
          }
        }}>
          {/* Step 1: Position Details */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold">Position Information</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Tell us about your role and company
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="flex items-center gap-2 text-sm font-medium">
                  <Briefcase className="w-4 h-4 text-brand-green" />
                  Job Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="e.g. Senior Software Engineer"
                  className="transition-all duration-200 focus:ring-2 focus:ring-brand-green/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center gap-2 text-sm font-medium">
                  <Building2 className="w-4 h-4 text-brand-green" />
                  Company *
                </Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  placeholder="e.g. Tech Corp Inc."
                  className="transition-all duration-200 focus:ring-2 focus:ring-brand-green/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2 text-sm font-medium">
                  <MapPin className="w-4 h-4 text-brand-green" />
                  Location
                </Label>
                <Input
                  id="location"
                  value={formData.location || ''}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="e.g. Lagos, Nigeria"
                  className="transition-all duration-200 focus:ring-2 focus:ring-brand-green/20"
                />
                <p className="text-xs text-muted-foreground">Optional</p>
              </div>
            </div>
          )}

          {/* Step 2: Timeline */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold">Employment Timeline</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  When did you work here?
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate" className="flex items-center gap-2 text-sm font-medium">
                  <Calendar className="w-4 h-4 text-brand-green" />
                  Start Date *
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleChange('startDate', e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-brand-green/20"
                  required
                />
              </div>

              <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer group">
                <Checkbox
                  id="isCurrent"
                  checked={formData.isCurrent}
                  onCheckedChange={(checked) => {
                    const isChecked = checked === true;
                    console.log('Checkbox changed:', isChecked);
                    handleChange('isCurrent', isChecked);
                    if (isChecked) handleChange('endDate', '');
                  }}
                  className="data-[state=checked]:bg-brand-green data-[state=checked]:border-brand-green"
                />
                <label 
                  htmlFor="isCurrent" 
                  className="text-sm font-medium cursor-pointer flex-1 select-none group-hover:text-brand-green transition-colors"
                >
                  I currently work here
                </label>
              </div>

              {!formData.isCurrent && (
                <div className="space-y-2 animate-fade-in">
                  <Label htmlFor="endDate" className="flex items-center gap-2 text-sm font-medium">
                    <Calendar className="w-4 h-4 text-brand-green" />
                    End Date *
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate || ''}
                    onChange={(e) => handleChange('endDate', e.target.value)}
                    className="transition-all duration-200 focus:ring-2 focus:ring-brand-green/20"
                    required={!formData.isCurrent}
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 3: Description */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold">Role Description</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Highlight your achievements and responsibilities
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="flex items-center gap-2 text-sm font-medium">
                  <FileText className="w-4 h-4 text-brand-green" />
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="• Key responsibilities and achievements&#10;• Projects you worked on&#10;• Skills you developed&#10;• Impact you made"
                  rows={8}
                  className="transition-all duration-200 focus:ring-2 focus:ring-brand-green/20 resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  This field is optional but recommended
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  💡 <strong>Tip:</strong> Use bullet points to list your key achievements and quantify your impact where possible (e.g., "Increased sales by 30%")
                </p>
              </div>
            </div>
          )}

          <DialogFooter className="gap-3 pt-6 border-t mt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={currentStep === 1 ? onClose : handlePrevious}
              className="hover-scale"
            >
              {currentStep === 1 ? (
                'Cancel'
              ) : (
                <>
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </>
              )}
            </Button>
            
            {currentStep < totalSteps ? (
              <Button 
                type="button"
                onClick={handleNext}
                disabled={!validateStep(currentStep)}
                className="bg-brand-green hover:bg-brand-green/90 hover-scale"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button 
                type="submit"
                className="bg-brand-green hover:bg-brand-green/90 hover-scale"
              >
                <Check className="w-4 h-4 mr-1" />
                {isEditing ? 'Save Changes' : 'Add Experience'}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditExperienceModal;
