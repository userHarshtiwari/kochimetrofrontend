import { Bell, User, LogOut, Shield, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Maintenance Alert",
      message: "Train KRISHNA requires immediate brake inspection",
      time: "2 minutes ago",
      type: "critical",
      read: false
    },
    {
      id: 2,
      title: "System Update",
      message: "Fleet management system updated to v2.1.3",
      time: "1 hour ago",
      type: "info",
      read: false
    },
    {
      id: 3,
      title: "Schedule Change",
      message: "Route Aluva-Petta delayed by 5 minutes",
      time: "3 hours ago",
      type: "warning",
      read: true
    },
    {
      id: 4,
      title: "Maintenance Complete",
      message: "Train TAPTI maintenance completed successfully",
      time: "5 hours ago",
      type: "success",
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "critical": return "🔴";
      case "warning": return "🟡";
      case "success": return "🟢";
      case "info": return "🔵";
      default: return "⚪";
    }
  };

  return (
    <header className="h-16 bg-navy-900 dark:bg-navy-900 border-b border-white/20 dark:border-white/20 flex items-center justify-between px-6 shadow-card">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <Logo size="md" showText={true} />
        </div>
        <div className="h-8 w-px bg-black/30 dark:bg-white/30 mx-4" />
        <h1 className="text-lg font-semibold text-black dark:text-white">{title}</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <ThemeToggle />
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10 relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{unreadCount} unread</p>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer ${
                    !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {notifications.length === 0 && (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No notifications</p>
              </div>
            )}
          </PopoverContent>
        </Popover>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-black dark:text-white border-black/30 dark:border-white/30">
            <Shield className="w-3 h-3 mr-1" />
            {user?.role === 'admin' ? 'Administrator' : 'Supervisor'}
          </Badge>
          <Button variant="ghost" size="sm" className="text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10">
            <User className="h-5 w-5" />
            <span className="ml-2">{user?.username}</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10"
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