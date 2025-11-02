import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface SkillFormData {
  _id?: string;
  name: string;
  level: 'Novice' | 'Intermediate' | 'Advanced' | 'Expert';
}

interface EditSkillModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: SkillFormData) => void;
  initialData?: SkillFormData;
  isEditing: boolean;
}

const EditSkillModal = ({ 
  open, 
  onClose, 
  onSave, 
  initialData,
  isEditing
}: EditSkillModalProps) => {
  const [formData, setFormData] = useState<SkillFormData>(
    initialData || {
      name: '',
      level: 'Intermediate'
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit' : 'Add'} Skill</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Skill Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g. JavaScript, Project Management"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="level">Proficiency Level *</Label>
            <Select 
              value={formData.level} 
              onValueChange={(value) => handleChange('level', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Novice">Novice</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
                <SelectItem value="Expert">Expert</SelectItem>
              </SelectContent>
            </Select>
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

export default EditSkillModal;
