import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  variant?: "default" | "success" | "warning" | "destructive";
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export const KPICard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  variant = "default",
  trend 
}: KPICardProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "success":
        return "border-success/20 bg-success/5";
      case "warning":
        return "border-warning/20 bg-warning/5";
      case "destructive":
        return "border-destructive/20 bg-destructive/5";
      default:
        return "border-primary/20 bg-primary/5";
    }
  };

  const getIconVariant = () => {
    switch (variant) {
      case "success":
        return "text-success";
      case "warning":
        return "text-warning";
      case "destructive":
        return "text-destructive";
      default:
        return "text-primary";
    }
  };

  return (
    <Card className={cn("shadow-card hover:shadow-elevated transition-all duration-200", getVariantClasses())}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
            )}
            {trend && (
              <div className="flex items-center mt-2">
                <span className={cn(
                  "text-sm font-medium",
                  trend.isPositive ? "text-success" : "text-destructive"
                )}>
                  {trend.isPositive ? "+" : ""}{trend.value}
                </span>
                <span className="text-sm text-muted-foreground ml-1">from last week</span>
              </div>
            )}
          </div>
          <div className={cn("p-3 rounded-lg bg-background/50", getIconVariant())}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};