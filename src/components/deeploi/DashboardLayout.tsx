
import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardSidebar from "@/components/deeploi/DashboardSidebar";
import { NotificationDropdown } from "@/components/sheared/NotificationDropdown";
import { UserProfileDropdown } from "@/components/sheared/UserProfileDropdown";
import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

const DashboardLayout = ({ children, title = "Dashboard" }: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="fixed inset-0 flex bg-white overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar
        collapsed={sidebarCollapsed} 
        toggleCollapse={toggleSidebar}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      
      {/* Main Content - full width when sidebar is collapsed */}
      <div className="flex-1 flex flex-col overflow-hidden h-full">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b py-4 px-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile Toggle Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
              >
                <SlidersHorizontal size={20} />
              </Button>
            
              {/* Desktop Toggle Button (when collapsed) */}
              {sidebarCollapsed && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hidden lg:flex"
                  onClick={toggleSidebar}
                >
                  <SlidersHorizontal size={18} />
                </Button>
              )}
              
              <h1 className="text-xl font-semibold">{title}</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <NotificationDropdown />
              <UserProfileDropdown />
            </div>
          </div>
        </div>
        
        {/* Page Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
