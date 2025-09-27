import { useTheme } from "./ThemeProvider";
import { useState } from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

export const Logo = ({ className = "", size = "md", showText = true }: LogoProps) => {
  const { theme } = useTheme();
  const [logoError, setLogoError] = useState(false);
  const [textError, setTextError] = useState(false);
  
  // Determine which logo to use based on theme
  const getLogoSrc = () => {
    // For system theme, check the actual system preference
    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return isDark ? "/krithyatha_dark.png" : "/krithyatha_light.png";
    }
    
    return theme === "dark" ? "/krithyatha_dark.png" : "/krithyatha_light.png";
  };

  // Determine which text image to use based on theme
  const getTextSrc = () => {
    // For system theme, check the actual system preference
    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return isDark ? "/krithyatha_text_dark.png" : "/krithyatha_text_light.png";
    }
    
    return theme === "dark" ? "/krithyatha_text_dark.png" : "/krithyatha_text_light.png";
  };

  // Size classes for logo
  const logoSizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10", 
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  // Size classes for text image
  const textSizeClasses = {
    sm: "h-8",
    md: "h-10", 
    lg: "h-12",
    xl: "h-16"
  };

  const handleLogoError = () => {
    setLogoError(true);
  };

  const handleTextError = () => {
    setTextError(true);
  };

  // If logo fails to load, show a fallback
  if (logoError) {
    return (
      <div className={`${logoSizeClasses[size]} ${className} bg-primary-foreground/20 rounded-lg flex items-center justify-center`}>
        <span className="text-primary-foreground font-bold text-xs">K</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Text Image Only */}
      {showText && (
        <>
          {textError ? (
            <div className={`${textSizeClasses[size]} flex items-center justify-center`}>
              <span className="text-primary-foreground font-bold text-sm">KRITHYATHA</span>
            </div>
          ) : (
            <img
              src={getTextSrc()}
              alt="Krithyatha Text"
              className={`${textSizeClasses[size]} object-contain`}
              onError={handleTextError}
            />
          )}
        </>
      )}
    </div>
  );
};
