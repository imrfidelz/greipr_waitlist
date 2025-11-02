import { 
  Users, 
  Settings,
  Calendar,
  SlidersHorizontal,
  X,
  Tag,
  LogOut,
  Briefcase,
  LayoutDashboard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface AdminSidebarProps {
  collapsed?: boolean;
  toggleCollapse?: () => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

// Sidebar menu items
const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', link: '/admin/dashboard'},
  { icon: Users, label: 'Users Management', link: '/admin/users'},
  { icon: Briefcase, label: 'Job Postings', link: '/admin/jobs'},
  { icon: Tag, label: 'Applicants', link: '/admin/applicants'},
];

export default function AdminSidebar({ 
  collapsed = false, 
  toggleCollapse,
  isMobileOpen,
  setIsMobileOpen 
}: AdminSidebarProps) {
  const location = useLocation();
  
  const isActiveRoute = (link: string) => {
    return location.pathname === link;
  };
  
  const handleLogout = async () => {
    // Logout logic here
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
                <span className="text-green-700">GRE</span>
                <span className="text-neutral-800">i</span>
                <span className="text-green-700">PR</span>
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
