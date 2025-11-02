import { 
  User, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Monitor,
  Globe,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { authService } from '@/services/authService';
import { toast } from '@/hooks/use-toast';

export const UserProfileDropdown = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await authService.logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="focus:outline-none focus:ring-2 focus:ring-primary rounded-full">
          <img 
            src="/lovable-uploads/0d41e9be-6f02-4111-b099-c5debea9ed50.png"
            alt="Profile"  
            className="w-8 h-8 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="end">
        <div className="flex flex-col">
          {/* User Profile Section */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/0d41e9be-6f02-4111-b099-c5debea9ed50.png"
                alt="Profile"  
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <p className="font-semibold text-sm">John Doe</p>
                <p className="text-xs text-muted-foreground">john.doe@example.com</p>
              </div>
            </div>
            <Link to="/profile">
              <Button variant="link" className="text-primary text-xs p-0 h-auto mt-2">
                View your profile
              </Button>
            </Link>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link to="/profile">
              <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-accent text-sm transition-colors">
                <User className="h-5 w-5" />
                <span>member Id</span>
              </button>
            </Link>

            <Link to="/settings">
              <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-accent text-sm transition-colors">
                <Settings className="h-5 w-5" />
                <span>esn score</span>
              </button>
            </Link>
          </div>

          <Separator />

          {/* Preferences Section */}
          <div className="py-2">
            <button className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-accent text-sm transition-colors">
              <div className="flex items-center gap-3">
                <Monitor className="h-5 w-5" />
                <span>Appearance: Device theme</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </button>

            <button className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-accent text-sm transition-colors">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5" />
                <span>Language: English</span>
              </div>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <Separator />

          {/* Bottom Actions */}
          <div className="py-2">
            <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-accent text-sm transition-colors">
              <HelpCircle className="h-5 w-5" />
              <span>Help</span>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-accent text-sm transition-colors">
              <MessageSquare className="h-5 w-5" />
              <span>Send feedback</span>
            </button>

            <button 
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-accent text-sm transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
