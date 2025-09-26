import { Bell, User, Train, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-gradient-primary border-b border-border flex items-center justify-between px-6 shadow-card">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-foreground/20 rounded-lg">
            <Train className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <div className="text-xl font-bold text-primary-foreground">KRITHYATHA</div>
            <div className="text-[10px] text-primary-foreground/80">കൃത്യത</div>
          </div>
        </div>
        <div className="h-8 w-px bg-primary-foreground/30 mx-4" />
        <h1 className="text-lg font-semibold text-primary-foreground">{title}</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <ThemeToggle />
        
        <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10 relative">
          <Bell className="h-5 w-5" />
          <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
            3
          </Badge>
        </Button>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-primary-foreground border-primary-foreground/30">
            <Shield className="w-3 h-3 mr-1" />
            {user?.role === 'admin' ? 'Administrator' : 'Supervisor'}
          </Badge>
          <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
            <User className="h-5 w-5" />
            <span className="ml-2">{user?.username}</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary-foreground hover:bg-primary-foreground/10"
            onClick={logout}
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};