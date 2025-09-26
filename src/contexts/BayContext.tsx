import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Bay {
  id: string;
  type: string;
  train: string | null;
  status: 'occupied' | 'available';
  activity: string;
  crew: string | null;
  duration?: string;
}

interface BayContextType {
  bayLayout: Bay[];
  updateBayStatus: (bayId: string, status: 'occupied' | 'available', train?: string | null) => void;
  getBayStatus: (bayId: string) => Bay | null;
}

const BayContext = createContext<BayContextType | undefined>(undefined);

export const BayProvider = ({ children }: { children: ReactNode }) => {
  // Default bay layout
  const defaultBayLayout: Bay[] = [
    // Service Bays (A-Section)
    { id: "A-01", type: "service", train: "KRISHNA", status: "occupied", activity: "Standby", crew: "Team Alpha" },
    { id: "A-02", type: "service", train: "NILA", status: "occupied", activity: "Pre-service Check", crew: "Team Beta" },
    { id: "A-03", type: "service", train: "ARUTH", status: "occupied", activity: "Cleaning", crew: "Cleaning-1" },
    { id: "A-04", type: "service", train: null, status: "available", activity: "Ready", crew: null },
    { id: "A-05", type: "service", train: "JHANAVI", status: "occupied", activity: "Inspection", crew: "Team Gamma" },
    
    // Maintenance Bays (B-Section)
    { id: "B-01", type: "maintenance", train: "TAPTI", status: "occupied", activity: "A-Check Service", crew: "Maint-Alpha", duration: "6h" },
    { id: "B-02", type: "maintenance", train: "DHWANIL", status: "occupied", activity: "Brake Repair", crew: "Maint-Beta", duration: "4h" },
    { id: "B-03", type: "maintenance", train: "YAMUNA", status: "occupied", activity: "HVAC Service", crew: "Maint-Gamma", duration: "3h" },
    { id: "B-04", type: "maintenance", train: null, status: "available", activity: "Ready", crew: null },
    
    // Inspection Bay Line (IBL)
    { id: "IBL-1", type: "inspection", train: "VAAYU", status: "occupied", activity: "Major Overhaul", crew: "IBL-Team", duration: "12h" },
    { id: "IBL-2", type: "inspection", train: null, status: "available", activity: "Ready", crew: null },
    
    // Cleaning Bays (C-Section)
    { id: "C-01", type: "cleaning", train: "PAMPA", status: "occupied", activity: "Deep Clean", crew: "Clean-1" },
    { id: "C-02", type: "cleaning", train: "MAARUT", status: "occupied", activity: "Exterior Wash", crew: "Clean-2" },
    { id: "C-03", type: "cleaning", train: null, status: "available", activity: "Ready", crew: null }
  ];

  // Load bay layout from localStorage or use default
  const [bayLayout, setBayLayout] = useState<Bay[]>(() => {
    try {
      const saved = localStorage.getItem('kmrl-bay-layout');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading bay layout from localStorage:', error);
    }
    return defaultBayLayout;
  });

  // Save bay layout to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('kmrl-bay-layout', JSON.stringify(bayLayout));
    } catch (error) {
      console.error('Error saving bay layout to localStorage:', error);
    }
  }, [bayLayout]);

  const updateBayStatus = (bayId: string, status: 'occupied' | 'available', train?: string | null) => {
    setBayLayout(prevLayout => 
      prevLayout.map(bay => 
        bay.id === bayId 
          ? { 
              ...bay, 
              status, 
              train: train !== undefined ? train : bay.train,
              activity: status === 'available' ? 'Ready' : bay.activity,
              crew: status === 'available' ? null : bay.crew
            }
          : bay
      )
    );
  };

  const getBayStatus = (bayId: string) => {
    return bayLayout.find(bay => bay.id === bayId) || null;
  };

  return (
    <BayContext.Provider value={{ bayLayout, updateBayStatus, getBayStatus }}>
      {children}
    </BayContext.Provider>
  );
};

export const useBay = () => {
  const context = useContext(BayContext);
  if (context === undefined) {
    throw new Error('useBay must be used within a BayProvider');
  }
  return context;
};
