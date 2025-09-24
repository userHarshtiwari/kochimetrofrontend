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

interface TrainPosition {
  id: string;
  x: number;
  y: number;
  status: 'service' | 'maintenance' | 'standby' | 'emergency' | 'cleaning';
  bay: string;
  activity?: string;
}

const DepotMap = () => {
  // Mock data for train positions in the depot
  const trainPositions: TrainPosition[] = [
    // Service Section (A-Bays)
    { id: "KMRL-01", x: 100, y: 80, status: "service", bay: "A-01", activity: "Ready for Service" },
    { id: "KMRL-03", x: 200, y: 80, status: "service", bay: "A-02", activity: "Pre-service Check" },
    { id: "KMRL-05", x: 300, y: 80, status: "standby", bay: "A-03", activity: "Standby Ready" },
    { id: "KMRL-07", x: 400, y: 80, status: "service", bay: "A-04", activity: "Boarding" },
    { id: "KMRL-09", x: 500, y: 80, status: "service", bay: "A-05", activity: "Ready" },
    
    // Maintenance Section (B-Bays)
    { id: "KMRL-02", x: 150, y: 200, status: "maintenance", bay: "B-01", activity: "A-Check Service" },
    { id: "KMRL-08", x: 250, y: 200, status: "maintenance", bay: "B-02", activity: "Brake Repair" },
    { id: "KMRL-12", x: 350, y: 200, status: "maintenance", bay: "B-03", activity: "HVAC Service" },
    { id: "KMRL-15", x: 450, y: 200, status: "emergency", bay: "B-04", activity: "Emergency Repair" },
    
    // Inspection Bay Line (IBL)
    { id: "KMRL-18", x: 200, y: 320, status: "maintenance", bay: "IBL-1", activity: "Major Overhaul" },
    { id: "KMRL-21", x: 350, y: 320, status: "maintenance", bay: "IBL-2", activity: "Inspection" },
    
    // Cleaning Section (C-Bays)
    { id: "KMRL-14", x: 100, y: 440, status: "cleaning", bay: "C-01", activity: "Deep Cleaning" },
    { id: "KMRL-17", x: 250, y: 440, status: "cleaning", bay: "C-02", activity: "Exterior Wash" },
    { id: "KMRL-23", x: 400, y: 440, status: "cleaning", bay: "C-03", activity: "Interior Detail" }
  ];

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
              <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: section.color }}
                ></div>
                <div>
                  <div className="font-semibold text-sm">{section.name}</div>
                  <div className="text-xs text-gray-600">{section.count} trains</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Depot Map */}
        <div className="relative bg-gray-100 rounded-lg p-4 min-h-[500px] overflow-auto">
          {/* Depot Layout Background */}
          <svg viewBox="0 0 600 500" className="w-full h-full">
            {/* Service Section Background */}
            <rect x="50" y="50" width="500" height="80" rx="8" fill="#f0f9ff" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />
            <text x="60" y="45" className="text-sm font-semibold fill-blue-600">Service Bays (A-Section)</text>
            
            {/* Maintenance Section Background */}
            <rect x="100" y="170" width="400" height="80" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" />
            <text x="110" y="165" className="text-sm font-semibold fill-yellow-600">Maintenance Bays (B-Section)</text>
            
            {/* IBL Section Background */}
            <rect x="150" y="290" width="300" height="80" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
            <text x="160" y="285" className="text-sm font-semibold fill-red-600">Inspection Bay Line (IBL)</text>
            
            {/* Cleaning Section Background */}
            <rect x="50" y="410" width="400" height="80" rx="8" fill="#faf5ff" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,5" />
            <text x="60" y="405" className="text-sm font-semibold fill-purple-600">Cleaning Bays (C-Section)</text>
            
            {/* Train Positions */}
            {trainPositions.map((train) => (
              <g key={train.id}>
                {/* Train Representation */}
                <rect 
                  x={train.x - 15} 
                  y={train.y - 10} 
                  width="30" 
                  height="20" 
                  rx="4" 
                  fill={getTrainStatusColor(train.status)}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="cursor-pointer hover:opacity-80"
                />
                {/* Train ID */}
                <text 
                  x={train.x} 
                  y={train.y + 2} 
                  textAnchor="middle" 
                  className="text-xs font-semibold fill-white"
                >
                  {train.id.split('-')[1]}
                </text>
                {/* Bay Label */}
                <text 
                  x={train.x} 
                  y={train.y + 25} 
                  textAnchor="middle" 
                  className="text-xs fill-gray-600"
                >
                  {train.bay}
                </text>
              </g>
            ))}
            
            {/* Depot Infrastructure */}
            <text x="50" y="30" className="text-lg font-bold fill-gray-800">KMRL Muttom Depot - Live Status</text>
            <text x="450" y="30" className="text-sm fill-gray-600">Updated: {new Date().toLocaleTimeString()}</text>
          </svg>
        </div>

        {/* Train Status Details */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-3">Active Trains</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {trainPositions.filter(train => train.status === 'service' || train.status === 'standby').map((train) => (
                <div key={train.id} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(train.status)}
                    <span className="font-semibold">{train.id}</span>
                    <Badge variant="outline">{train.bay}</Badge>
                  </div>
                  <span className="text-sm text-gray-600">{train.activity}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Maintenance & Issues</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {trainPositions.filter(train => train.status === 'maintenance' || train.status === 'emergency' || train.status === 'cleaning').map((train) => (
                <div key={train.id} className={`flex items-center justify-between p-2 rounded-lg ${
                  train.status === 'emergency' ? 'bg-red-50' : 
                  train.status === 'maintenance' ? 'bg-yellow-50' : 
                  'bg-purple-50'
                }`}>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(train.status)}
                    <span className="font-semibold">{train.id}</span>
                    <Badge variant="outline">{train.bay}</Badge>
                  </div>
                  <span className="text-sm text-gray-600">{train.activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {trainPositions.filter(t => t.status === 'service').length}
            </div>
            <div className="text-sm text-gray-600">In Service</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {trainPositions.filter(t => t.status === 'standby').length}
            </div>
            <div className="text-sm text-gray-600">Standby</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {trainPositions.filter(t => t.status === 'maintenance').length}
            </div>
            <div className="text-sm text-gray-600">Maintenance</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {trainPositions.filter(t => t.status === 'emergency').length}
            </div>
            <div className="text-sm text-gray-600">Emergency</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {trainPositions.filter(t => t.status === 'cleaning').length}
            </div>
            <div className="text-sm text-gray-600">Cleaning</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DepotMap;
