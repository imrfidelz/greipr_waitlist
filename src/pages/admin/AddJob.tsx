import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AddJob = () => {
  const { toast } = useToast();
  const [responsibilities, setResponsibilities] = useState<string[]>(['']);
  const [qualifications, setQualifications] = useState<string[]>(['']);
  const [benefits, setBenefits] = useState<string[]>(['']);

  const addItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => [...prev, '']);
  };

  const removeItem = (index: number, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const updateItem = (
    index: number,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) => prev.map((item, i) => (i === index ? value : item)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Job Posted Successfully',
      description: 'The job posting has been created and is now active.',
    });
  };

  return (
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Job Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">
                      Job Title <span className="text-red-500">*</span>
                    </Label>
                    <Input id="jobTitle" placeholder="e.g., Kitchen Assistant" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">
                      Company Name <span className="text-red-500">*</span>
                    </Label>
                    <Input id="company" placeholder="e.g., GREPR GROUP" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">
                      Location <span className="text-red-500">*</span>
                    </Label>
                    <Input id="location" placeholder="e.g., Ojota, Lagos" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobType">
                      Job Type <span className="text-red-500">*</span>
                    </Label>
                    <Select required>
                      <SelectTrigger id="jobType">
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="workingDays">
                      Working hours/days a week <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="workingDays"
                      placeholder="e.g., 5 days a week, 9am - 5pm"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary">
                      Salary Range <span className="text-red-500">*</span>
                    </Label>
                    <Input id="salary" placeholder="e.g., $50,000 - $70,000" required />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="overview">
                    Position Overview <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="overview"
                    rows={6}
                    placeholder="As a Kitchen Assistant at 'Your Company Name', you will play a vital role in supporting our kitchen operations. You will work closely with our culinary team to ensure the smooth and efficient functioning of the kitchen..."
                    required
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    (40 less than 20 words)
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>
                      Key Responsibilities <span className="text-red-500">*</span>
                    </Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addItem(setResponsibilities)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Item
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {responsibilities.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder="e.g., Food Preparation: Assist in the preparation of ingredients..."
                          value={item}
                          onChange={(e) =>
                            updateItem(index, e.target.value, setResponsibilities)
                          }
                          required
                        />
                        {responsibilities.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(index, setResponsibilities)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>
                      Qualifications <span className="text-red-500">*</span>
                    </Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addItem(setQualifications)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Item
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {qualifications.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder="e.g., Previous experience in a kitchen environment or a..."
                          value={item}
                          onChange={(e) =>
                            updateItem(index, e.target.value, setQualifications)
                          }
                          required
                        />
                        {qualifications.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(index, setQualifications)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Benefits</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addItem(setBenefits)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Item
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {benefits.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder="e.g., Competitive pay, Opportunity for growth..."
                          value={item}
                          onChange={(e) => updateItem(index, e.target.value, setBenefits)}
                        />
                        {benefits.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(index, setBenefits)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                className="w-full md:w-auto px-16 bg-green-700 hover:bg-green-800 text-white"
                size="lg"
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
  );
};

export default AddJob;
