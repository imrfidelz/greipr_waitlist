import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface EditBioModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (bio: string) => void;
  initialBio?: string;
}

const EditBioModal = ({ open, onClose, onSave, initialBio = '' }: EditBioModalProps) => {
  const [bio, setBio] = useState(initialBio);

  useEffect(() => {
    setBio(initialBio);
  }, [initialBio]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(bio);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Bio</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell employers about yourself..."
                rows={6}
                className="mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBioModal;
