import { 
  Home, 
  Heart, 
  MessageSquare, 
  Users, 
  Settings,
  Calendar,
  User,
  SlidersHorizontal,
  X,
  Tag,
  LogOut,
  Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { authService } from '@/services/authService';
import { toast } from '@/hooks/use-toast';

interface DashboardSidebarProps {
  collapsed?: boolean;
  toggleCollapse?: () => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

// Sidebar menu items
const menuItems = [
  { icon: Home, label: 'Home', link: '/dashboard'},
  { icon: Tag, label: 'My Interviews', link: '/interviews'},
  { icon: Briefcase, label: 'My Applications', link: '/applications'},
  { icon: Heart, label: 'Saved Jobs', link: '/saved-jobs'},
  { icon: User, label: 'My Profile', link: '/profile'},
  { icon: MessageSquare, label: 'Messages', link: '/messages'},
  { icon: Users, label: 'Forum', link: '/forum'},
  { icon: Settings, label: 'Settings', link: '/settings'},
];

export default function DashboardSidebar({ 
  collapsed = false, 
  toggleCollapse,
  isMobileOpen,
  setIsMobileOpen 
}: DashboardSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActiveRoute = (link: string) => {
    return location.pathname === link;
  };
  
  const handleLogout = async () => {
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
    <>
      {/* Overlay for mobile/tablet */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 xl:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      <div className={cn(
        "h-screen bg-white border-r overflow-y-auto transition-all duration-300 text-neutral-800 z-50",
        collapsed ? "xl:w-0" : "w-full xl:w-64",
        isMobileOpen ? "fixed left-0 top-0 w-64" : "hidden xl:block",
        "xl:sticky xl:top-0"
      )}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center w-full justify-between">
            {(!collapsed || isMobileOpen) && (
              <h3 className="font-bold text-xl flex items-center gap-1">
                <span className="text-green-700">DEEPL</span>
                <span className="text-neutral-800">O</span>
                <span className="text-green-700">i</span>
              </h3>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-neutral-100"
              onClick={() => {
                if (window.innerWidth < 1280) {
                  setIsMobileOpen(false);
                } else {
                  toggleCollapse?.();
                }
              }}
            >
              {(collapsed && !isMobileOpen) ? <SlidersHorizontal size={18} /> : <X size={18} />}
            </Button>
          </div>
        </div>
        
        {/* Main menu */}
        <div className="mb-4 space-y-1">
          {menuItems.map((item, index) => {
            const isActive = isActiveRoute(item.link);
            return (
              <Link 
                key={index}
                to={item.link}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 w-full transition-all duration-200",
                  isActive 
                    ? "bg-green-700 text-white" 
                    : "text-neutral-700 hover:bg-neutral-50"
                )}
              >
                <item.icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
        
        <Separator className="my-6 bg-neutral-200" />
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full hover:bg-neutral-50 transition-colors text-neutral-700"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Log out</span>
        </button>
      </div>
    </div>
    </>
  );
}
