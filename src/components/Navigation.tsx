import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Train, 
  Building, 
  ClipboardList, 
  FileText, 
  Settings 
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/trains", label: "Train Details", icon: Train },
  { to: "/depot", label: "Depot View", icon: Building },
  { to: "/induction", label: "Induction Plan", icon: ClipboardList },
  { to: "/reports", label: "Reports & Audit", icon: FileText },
  { to: "/settings", label: "Settings", icon: Settings },
];

export const Navigation = () => {
  return (
    <nav className="w-64 bg-card border-r border-border p-4 shadow-card">
      <div className="space-y-2">
        {navigationItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};