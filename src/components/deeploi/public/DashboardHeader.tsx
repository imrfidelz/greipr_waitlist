import { Search, Bell, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const DashboardHeader = () => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-xl border-b border-border/50 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        {/* Logo and Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/uploads/log.png" alt="GREiPR" className="h-10 object-contain" />
            <div className="h-8 w-px bg-border" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">DEEPLOi</h1>
              <p className="text-sm text-muted-foreground">GREiPR Digital CV Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-full max-w-md hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search by name or ESN ID..."
                className="pl-10 bg-white/50 border-white/30 focus:bg-white/70"
              />
            </div>
            <Button size="icon" variant="ghost" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
