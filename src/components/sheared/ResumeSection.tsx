
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, CheckCircle, Clock, Plus, Edit, Trash } from 'lucide-react';
import EditResumeModal from '../deeploi/EditResumeModal';

export type VerificationStatus = 'confirmed' | 'pending' | null;

export type ResumeSectionItem = {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  verified: VerificationStatus;
};

type ResumeSectionProps = {
  title: string;
  items: ResumeSectionItem[];
  setItems: React.Dispatch<React.SetStateAction<ResumeSectionItem[]>>;
  icon?: React.ReactNode; // Make icon prop optional
};

const ResumeSection = ({ title, items, setItems, icon }: ResumeSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<ResumeSectionItem | null>(null);

  const handleAddItem = () => {
    setCurrentItem(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (item: ResumeSectionItem) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleSaveItem = (item: any) => {
    if (currentItem) {
      // Edit existing item
      setItems(prevItems => 
        prevItems.map(prevItem => 
          prevItem.id === currentItem.id ? { ...item, id: currentItem.id } : prevItem
        )
      );
    } else {
      // Add new item
      setItems(prevItems => [...prevItems, { ...item, id: Date.now().toString() }]);
    }
    setIsModalOpen(false);
  };

  const handleVerificationChange = (id: string, status: VerificationStatus) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, verified: status } : item
      )
    );
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          {icon}
          {title}
        </h3>
        <Button 
          onClick={handleAddItem}
          variant="outline"
          size="sm"
          className="text-brand-green border-brand-green hover:bg-brand-green/5"
        >
          <Plus className="mr-1 h-4 w-4" /> Add {title}
        </Button>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500 italic">No {title.toLowerCase()} added yet.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg border p-4 relative">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium text-lg">{item.title}</h4>
                  <p className="text-gray-600">{item.organization}</p>
                  <p className="text-gray-500 text-sm">{item.period}</p>
                </div>
                <div className="mt-2 md:mt-0 flex gap-2">
                  <div className="flex flex-wrap gap-2">
                    {item.verified === 'confirmed' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" /> Verified
                      </span>
                    ) : item.verified === 'pending' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Clock className="w-3 h-3 mr-1" /> Pending Verification
                      </span>
                    ) : (
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="h-7 text-xs"
                          onClick={() => handleVerificationChange(item.id, 'pending')}
                        >
                          <Clock className="w-3 h-3 mr-1" /> Pending
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="h-7 text-xs text-green-600 border-green-600 hover:bg-green-50"
                          onClick={() => handleVerificationChange(item.id, 'confirmed')}
                        >
                          <CheckCircle className="w-3 h-3 mr-1" /> Confirm
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mt-2">{item.description}</p>
              <div className="flex space-x-2 mt-3">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="h-8 px-2"
                  onClick={() => handleEditItem(item)}
                >
                  <Edit className="h-3 w-3 mr-1" /> Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="h-8 px-2 text-red-600 border-red-600 hover:bg-red-50"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <Trash className="h-3 w-3 mr-1" /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <EditResumeModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveItem}
        type={title === "Work Experience" ? "experience" : title === "Education" ? "education" : "certification"}
        initialData={currentItem as any}
        isEditing={!!currentItem}
      />
    </div>
  );
};

export default ResumeSection;
