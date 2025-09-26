import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Train, 
  Wrench, 
  RefreshCw,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";
import { useBay } from "@/contexts/BayContext";

interface TrainPosition {
  id: string;
  x: number;
  y: number;
  status: 'service' | 'maintenance' | 'standby' | 'emergency' | 'cleaning';
  bay: string;
  activity?: string;
}

interface DepotMapProps {
  onBayClick?: (bayId: string) => void;
}

const DepotMap = ({ onBayClick }: DepotMapProps) => {
  const { bayLayout } = useBay();
  // Mock data for train positions in the depot with real KMRL train names
  const trainPositions: TrainPosition[] = [
    // Service Section (A-Bays)
    { id: "KRISHNA", x: 100, y: 40, status: "service", bay: "A-01", activity: "Ready for Service" },
    { id: "NILA", x: 200, y: 40, status: "service", bay: "A-02", activity: "Pre-service Check" },
    { id: "ARUTH", x: 300, y: 40, status: "standby", bay: "A-03", activity: "Standby Ready" },
    { id: "JHANAVI", x: 400, y: 40, status: "service", bay: "A-04", activity: "Boarding" },
    { id: "BHAVANI", x: 500, y: 40, status: "service", bay: "A-05", activity: "Ready" },
    
    // Maintenance Section (B-Bays)
    { id: "TAPTI", x: 150, y: 90, status: "maintenance", bay: "B-01", activity: "A-Check Service" },
    { id: "DHWANIL", x: 250, y: 90, status: "maintenance", bay: "B-02", activity: "Brake Repair" },
    { id: "YAMUNA", x: 350, y: 90, status: "maintenance", bay: "B-03", activity: "HVAC Service" },
    { id: "VAAYU", x: 450, y: 90, status: "emergency", bay: "B-04", activity: "Emergency Repair" },
    
    // Inspection Bay Line (IBL)
    { id: "PAMPA", x: 200, y: 140, status: "maintenance", bay: "IBL-1", activity: "Major Overhaul" },
    { id: "MAARUT", x: 350, y: 140, status: "maintenance", bay: "IBL-2", activity: "Inspection" },
    
    // Cleaning Section (C-Bays)
    { id: "KABANI", x: 100, y: 190, status: "cleaning", bay: "C-01", activity: "Deep Cleaning" },
    { id: "SHIRIYA", x: 250, y: 190, status: "cleaning", bay: "C-02", activity: "Exterior Wash" },
    { id: "GODHAVARI", x: 400, y: 190, status: "cleaning", bay: "C-03", activity: "Interior Detail" }
  ];

  // Get bay occupancy from real data
  const getBayStatus = (bayId: string) => {
    if (!bayLayout) return { occupied: false, train: null };
    
    const bay = bayLayout.find(b => b.id === bayId);
    if (!bay) return { occupied: false, train: null };
    
    return {
      occupied: bay.status === 'occupied',
      train: bay.train
    };
  };

  const getBayColor = (bayId: string) => {
    const bayStatus = getBayStatus(bayId);
    return bayStatus.occupied ? '#3b82f6' : '#22c55e'; // Blue for occupied, Green for available
  };

  const getTrainStatusColor = (status: string) => {
    switch (status) {
      case 'service': return '#22c55e'; // Green
      case 'maintenance': return '#f59e0b'; // Yellow
      case 'standby': return '#3b82f6'; // Blue
      case 'emergency': return '#ef4444'; // Red
      case 'cleaning': return '#8b5cf6'; // Purple
      default: return '#6b7280'; // Gray
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'service': return <CheckCircle className="w-4 h-4" />;
      case 'maintenance': return <Wrench className="w-4 h-4" />;
      case 'standby': return <Clock className="w-4 h-4" />;
      case 'emergency': return <AlertTriangle className="w-4 h-4" />;
      case 'cleaning': return <RefreshCw className="w-4 h-4" />;
      default: return <Train className="w-4 h-4" />;
    }
  };

  const depotSections = [
    { name: "Service Bays (A-Section)", color: "#22c55e", count: 5, description: "Ready for passenger service" },
    { name: "Maintenance Bays (B-Section)", color: "#f59e0b", count: 4, description: "Scheduled maintenance work" },
    { name: "Inspection Bay Line (IBL)", color: "#ef4444", count: 2, description: "Major overhauls and inspections" },
    { name: "Cleaning Bays (C-Section)", color: "#8b5cf6", count: 3, description: "Cleaning and detailing" }
  ];

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Muttom Depot - Live Bay Map
        </CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Full Screen
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Depot Legend */}
        <div className="mb-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {depotSections.map((section, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: section.color }}
                ></div>
                <div>
                  <div className="font-semibold text-sm dark:text-white">{section.name}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">{section.count} trains</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clean Depot Map */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">KMRL Muttom Depot</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">Live Status</span>
          </div>
          
          {/* Bay Grid */}
          <div className="space-y-3">
            {/* Service Bays */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Service Bays</h4>
              <div className="flex gap-2">
                {["A-01", "A-02", "A-03", "A-04", "A-05"].map((bayId) => {
                  const bayStatus = getBayStatus(bayId);
                  return (
                    <button
                      key={bayId}
                      onClick={() => onBayClick?.(bayId)}
                      className={`w-8 h-8 rounded-full text-white text-xs font-bold hover:opacity-80 transition-colors ${
                        bayStatus.occupied ? 'bg-blue-600' : 'bg-green-500'
                      }`}
                      title={bayStatus.occupied ? `Occupied by ${bayStatus.train}` : 'Available'}
                    >
                      {bayId.split('-')[1]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Maintenance Bays */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
              <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-2">Maintenance Bays</h4>
              <div className="flex gap-2">
                {["B-01", "B-02", "B-03", "B-04"].map((bayId) => {
                  const bayStatus = getBayStatus(bayId);
                  return (
                    <button
                      key={bayId}
                      onClick={() => onBayClick?.(bayId)}
                      className={`w-8 h-8 rounded-full text-white text-xs font-bold hover:opacity-80 transition-colors ${
                        bayStatus.occupied ? 'bg-blue-600' : 'bg-green-500'
                      }`}
                      title={bayStatus.occupied ? `Occupied by ${bayStatus.train}` : 'Available'}
                    >
                      {bayId.split('-')[1]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inspection Bays */}
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
              <h4 className="text-sm font-medium text-red-800 dark:text-red-300 mb-2">Inspection Bay Line</h4>
              <div className="flex gap-2">
                {["IBL-1", "IBL-2"].map((bayId) => {
                  const bayStatus = getBayStatus(bayId);
                  return (
                    <button
                      key={bayId}
                      onClick={() => onBayClick?.(bayId)}
                      className={`w-8 h-8 rounded-full text-white text-xs font-bold hover:opacity-80 transition-colors ${
                        bayStatus.occupied ? 'bg-blue-600' : 'bg-green-500'
                      }`}
                      title={bayStatus.occupied ? `Occupied by ${bayStatus.train}` : 'Available'}
                    >
                      {bayId.split('-')[1]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cleaning Bays */}
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
              <h4 className="text-sm font-medium text-purple-800 dark:text-purple-300 mb-2">Cleaning Bays</h4>
              <div className="flex gap-2">
                {["C-01", "C-02", "C-03"].map((bayId) => {
                  const bayStatus = getBayStatus(bayId);
                  return (
                    <button
                      key={bayId}
                      onClick={() => onBayClick?.(bayId)}
                      className={`w-8 h-8 rounded-full text-white text-xs font-bold hover:opacity-80 transition-colors ${
                        bayStatus.occupied ? 'bg-blue-600' : 'bg-green-500'
                      }`}
                      title={bayStatus.occupied ? `Occupied by ${bayStatus.train}` : 'Available'}
                    >
                      {bayId.split('-')[1]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Status Legend */}
        <div className="mt-4 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <span className="text-gray-600 dark:text-gray-300">Occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-600 dark:text-gray-300">Available</span>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default DepotMap;
export type { DepotMapProps };
