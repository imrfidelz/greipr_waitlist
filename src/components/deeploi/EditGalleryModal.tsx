import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Loader2, Upload, X, Briefcase, User, Award, FileCheck, FolderOpen, Image as ImageIcon } from 'lucide-react';

interface EditGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  galleryItem?: any;
}

const EditGalleryModal = ({ isOpen, onClose, onSave, galleryItem }: EditGalleryModalProps) => {
  const [formData, setFormData] = useState({
    image: null as File | null,
    title: '',
    description: '',
    category: 'other' as 'work' | 'personal' | 'achievement' | 'certificate' | 'other',
    isPublic: true
  });
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (galleryItem) {
      setFormData({
        image: null,
        title: galleryItem.title || '',
        description: galleryItem.description || '',
        category: galleryItem.category || 'other',
        isPublic: galleryItem.isPublic ?? true
      });
      setPreviewUrl(galleryItem.imageUrl || '');
    } else {
      setFormData({
        image: null,
        title: '',
        description: '',
        category: 'other',
        isPublic: true
      });
      setPreviewUrl('');
    }
  }, [galleryItem, isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      return;
    }
    setFormData({ ...formData, image: file });
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, image: null });
    setPreviewUrl(galleryItem?.imageUrl || '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'work': return Briefcase;
      case 'personal': return User;
      case 'achievement': return Award;
      case 'certificate': return FileCheck;
      default: return FolderOpen;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!galleryItem && !formData.image) {
      return;
    }

    setIsLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving gallery item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-semibold flex items-center gap-2">
            <ImageIcon className="w-6 h-6" />
            {galleryItem ? 'Edit' : 'Add'} Gallery Photo
          </DialogTitle>
          <DialogDescription className="text-base">
            Share your best moments by uploading a photo with optional details.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Image Upload Area */}
          <div className="space-y-2">
            <Label className="text-base font-medium">
              Photo {!galleryItem && <span className="text-destructive ml-1">*</span>}
            </Label>
            
            {!previewUrl ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`
                  relative border-2 border-dashed rounded-lg p-8 transition-all cursor-pointer
                  ${isDragging 
                    ? 'border-primary bg-primary/5 scale-[1.02]' 
                    : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/50'
                  }
                `}
              >
                <div className="flex flex-col items-center justify-center gap-3 text-center">
                  <div className={`p-4 rounded-full transition-colors ${isDragging ? 'bg-primary/10' : 'bg-muted'}`}>
                    <Upload className={`w-8 h-8 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <p className="text-base font-medium">
                      {isDragging ? 'Drop your image here' : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
                <Input
                  ref={fileInputRef}
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required={!galleryItem}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="relative group">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-3">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => fileInputRef.current?.click()}
                    className="gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Change
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={handleRemoveImage}
                    className="gap-2"
                  >
                    <X className="w-4 h-4" />
                    Remove
                  </Button>
                </div>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            )}
          </div>

          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base font-medium">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Give your photo a memorable title"
              className="h-11"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-medium">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Tell the story behind this photo..."
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-base font-medium">Category</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value: any) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger className="h-11">
                <div className="flex items-center gap-2">
                  {(() => {
                    const Icon = getCategoryIcon(formData.category);
                    return <Icon className="w-4 h-4" />;
                  })()}
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="work" className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Work
                  </div>
                </SelectItem>
                <SelectItem value="personal" className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Personal
                  </div>
                </SelectItem>
                <SelectItem value="achievement" className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Achievement
                  </div>
                </SelectItem>
                <SelectItem value="certificate" className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4" />
                    Certificate
                  </div>
                </SelectItem>
                <SelectItem value="other" className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="w-4 h-4" />
                    Other
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Privacy Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
            <div className="space-y-0.5">
              <Label htmlFor="isPublic" className="text-base font-medium cursor-pointer">
                Public Photo
              </Label>
              <p className="text-sm text-muted-foreground">
                Allow others to see this photo on your profile
              </p>
            </div>
            <Switch
              id="isPublic"
              checked={formData.isPublic}
              onCheckedChange={(checked) => setFormData({ ...formData, isPublic: checked })}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} size="lg">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} size="lg" className="min-w-[120px]">
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {galleryItem ? 'Update Photo' : 'Add Photo'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditGalleryModal;
