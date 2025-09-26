import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Train, 
  Activity,
  Eye,
  RefreshCw,
  AlertTriangle,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TrainLocation {
  id: string;
  status: 'service' | 'maintenance' | 'standby' | 'emergency';
  currentStation: string;
  nextStation: string;
  direction: 'northbound' | 'southbound';
  passengerLoad: number;
  delay: number; // minutes
}

const MetroLineMap = () => {
  const navigate = useNavigate();
  // All 22 stations of Kochi Metro Line 1 (Aluva to Petta)
  const stations = [
    { name: "Aluva", code: "ALV", x: 950, y: 100, isTerminal: true, isDepot: true },
    { name: "Pulinchodu", code: "PCH", x: 870, y: 100 },
    { name: "Companypady", code: "CMP", x: 790, y: 100 },
    { name: "Ambattukavu", code: "AMB", x: 710, y: 100 },
    { name: "Muttom", code: "MUT", x: 630, y: 100, isDepot: true },
    { name: "Kalamassery", code: "KLM", x: 550, y: 100 },
    { name: "CUSAT", code: "CUS", x: 470, y: 100 },
    { name: "Pathadipalam", code: "PTH", x: 390, y: 100 },
    { name: "Edapally", code: "EDP", x: 310, y: 100 },
    { name: "Changampuzha Park", code: "CGP", x: 230, y: 100 },
    { name: "Palarivattom", code: "PLR", x: 180, y: 150 },
    { name: "JLN Stadium", code: "JLN", x: 180, y: 200 },
    { name: "Kaloor", code: "KLR", x: 180, y: 250 },
    { name: "Town Hall", code: "TWH", x: 120, y: 300 },
    { name: "Ernakulam South", code: "ERS", x: 120, y: 350, isTerminal: true },
    { name: "Kadavanthra", code: "KDV", x: 180, y: 400 },
    { name: "Elamkulam", code: "ELK", x: 240, y: 450 },
    { name: "Vyttila Hub", code: "VYT", x: 300, y: 500, isHub: true },
    { name: "Thaikoodam", code: "THK", x: 400, y: 550 },
    { name: "Petta", code: "PET", x: 500, y: 580, isTerminal: true },
    { name: "Maharaja's College", code: "MRC", x: 80, y: 250 },
    { name: "Ernakulam Junction", code: "ERN", x: 120, y: 380 }
  ];

  // KMRL Train Names mapping
  const trainNames = {
    "01": "KRISHNA", "02": "TAPTI", "03": "NILA", "04": "SARAYU", "05": "ARUTH",
    "06": "VAIGAI", "07": "JHANAVI", "08": "DHWANIL", "09": "BHAVANI", "10": "PADMA",
    "11": "MANDAKINI", "12": "YAMUNA", "13": "PERIYAR", "14": "KABANI", "15": "VAAYU",
    "16": "KAVERI", "17": "SHIRIYA", "18": "PAMPA", "19": "NARMADA", "20": "MAHE",
    "21": "MAARUT", "22": "SABARMATHI", "23": "GODHAVARI", "24": "GANGA", "25": "PAVAN"
  };

  // Current train positions on the line with real names
  const activeTrains: TrainLocation[] = [
    { id: "KRISHNA", status: "service", currentStation: "Aluva", nextStation: "Pulinchodu", direction: "southbound", passengerLoad: 65, delay: 0 },
    { id: "NILA", status: "service", currentStation: "Edapally", nextStation: "Changampuzha Park", direction: "southbound", passengerLoad: 82, delay: 2 },
    { id: "ARUTH", status: "service", currentStation: "Petta", nextStation: "Thaikoodam", direction: "northbound", passengerLoad: 78, delay: 1 },
    { id: "JHANAVI", status: "service", currentStation: "Kaloor", nextStation: "Town Hall", direction: "southbound", passengerLoad: 91, delay: 0 },
    { id: "BHAVANI", status: "service", currentStation: "Vyttila Hub", nextStation: "Thaikoodam", direction: "southbound", passengerLoad: 55, delay: 0 },
    { id: "MANDAKINI", status: "service", currentStation: "CUSAT", nextStation: "Pathadipalam", direction: "southbound", passengerLoad: 43, delay: 0 },
    { id: "PERIYAR", status: "service", currentStation: "Town Hall", nextStation: "Ernakulam South", direction: "southbound", passengerLoad: 89, delay: 3 },
    { id: "VAAYU", status: "service", currentStation: "Changampuzha Park", nextStation: "Palarivattom", direction: "southbound", passengerLoad: 67, delay: 0 },
    { id: "SHIRIYA", status: "service", currentStation: "Kalamassery", nextStation: "CUSAT", direction: "southbound", passengerLoad: 72, delay: 1 },
    { id: "VAIGAI", status: "emergency", currentStation: "JLN Stadium", nextStation: "Kaloor", direction: "southbound", passengerLoad: 45, delay: 15 }
  ];

  // Force a straight horizontal layout with evenly spaced stations
  const baseY = 200;
  const startX = 60;
  const endX = 960;
  const step = (endX - startX) / (stations.length - 1);
  const linearStations = stations.map((s, i) => ({
    ...s,
    x: startX + i * step,
    y: baseY
  }));

  const getStationPosition = (stationName: string) => {
    const station = linearStations.find(s => s.name === stationName);
    return station ? { x: station.x, y: station.y } : { x: 0, y: 0 };
  };

  const getTrainStatusColor = (status: string) => {
    switch (status) {
      case 'service': return '#22c55e';
      case 'emergency': return '#ef4444';
      case 'maintenance': return '#f59e0b';
      case 'standby': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getPassengerLoadColor = (load: number) => {
    if (load >= 85) return '#ef4444'; // Red - High
    if (load >= 70) return '#f59e0b'; // Yellow - Medium
    return '#22c55e'; // Green - Low
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Train className="w-5 h-5" />
          Depot Map
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
        {/* Map Legend */}
        <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium dark:text-white">In Service ({activeTrains.filter(t => t.status === 'service').length})</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="text-sm font-medium dark:text-white">Emergency ({activeTrains.filter(t => t.status === 'emergency').length})</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="w-4 h-4 bg-gray-500 rounded"></div>
            <span className="text-sm font-medium dark:text-white">Stations (22)</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm font-medium dark:text-white">Depot/Terminal</span>
          </div>
        </div>

        {/* Metro Line Map */}
        <div className="relative bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-900 dark:to-slate-800 rounded-lg p-6 min-h-[300px] overflow-auto">
          <svg viewBox="0 0 1020 320" className="w-full h-full">
            {/* Background watermark */}
            <text x="510" y="160" textAnchor="middle" className="text-4xl font-bold fill-blue-100 dark:fill-slate-700 opacity-50">
              KOCHI METRO
            </text>
            
            {/* Straight Main Metro Line */}
            <line x1={startX} y1={baseY} x2={endX} y2={baseY} stroke="#22c55e" strokeWidth="8" strokeLinecap="round" />

            {/* Station Dots */}
            {linearStations.map((station, index) => (
              <g key={index}>
                <circle 
                  cx={station.x} 
                  cy={station.y} 
                  r={station.isTerminal || station.isDepot ? "12" : station.isHub ? "10" : "8"}
                  fill={station.isTerminal ? "#3b82f6" : station.isDepot ? "#8b5cf6" : station.isHub ? "#f59e0b" : "#ffffff"}
                  stroke="#22c55e"
                  strokeWidth="3"
                  className={station.name === "Muttom" ? "cursor-pointer hover:opacity-80" : undefined}
                  onClick={station.name === "Muttom" ? () => navigate("/depot") : undefined}
                />
                {/* Station Labels - alternate above/below to avoid overlap */}
                <text 
                  x={station.x} 
                  y={station.y + (index % 2 === 0 ? -22 : 26)} 
                  textAnchor="middle" 
                  className="text-[10px] font-semibold fill-gray-800 dark:fill-gray-100"
                >
                  {station.name.length > 16 ? station.name.slice(0, 15) + '…' : station.name}
                </text>
                <text 
                  x={station.x} 
                  y={station.y + (index % 2 === 0 ? -10 : 38)} 
                  textAnchor="middle" 
                  className="text-[10px] fill-gray-600 dark:fill-gray-300"
                >
                  {station.code}
                </text>
              </g>
            ))}

            {/* Legend */}
            <g transform="translate(50, 550)">
              <text x="0" y="0" className="text-sm font-bold fill-gray-800">Live Indicators:</text>
              <circle cx="0" cy="20" r="6" fill="#22c55e" />
              <text x="15" y="25" className="text-xs fill-gray-600">Low Load (&lt;70%)</text>
              <circle cx="100" cy="20" r="6" fill="#f59e0b" />
              <text x="115" y="25" className="text-xs fill-gray-600">Medium Load (70-85%)</text>
              <circle cx="220" cy="20" r="6" fill="#ef4444" />
              <text x="235" y="25" className="text-xs fill-gray-600">High Load (&gt;85%)</text>
              <circle cx="340" cy="20" r="6" fill="#ef4444" />
              <text x="355" y="25" className="text-xs fill-gray-600">Delay (minutes)</text>
            </g>

            {/* System Status */}
            <g transform="translate(700, 550)">
              <text x="0" y="0" className="text-sm font-bold fill-gray-800">System Status:</text>
              <text x="0" y="20" className="text-xs fill-green-600">● All Systems Operational</text>
              <text x="0" y="35" className="text-xs fill-blue-600">● {activeTrains.length} Trains Active</text>
              <text x="0" y="50" className="text-xs fill-gray-600">Updated: {new Date().toLocaleTimeString()}</text>
            </g>
          </svg>
        </div>

        {/* Train Status Details */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2 dark:text-white">
              <Activity className="w-4 h-4" />
              Active Trains
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {activeTrains.filter(train => train.status === 'service').slice(0, 6).map((train) => (
                <div key={train.id} className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Train className="w-4 h-4 text-green-600" />
                    <span className="font-semibold">{train.id}</span>
                    <Badge variant="outline" className="text-xs">
                      {train.currentStation} → {train.nextStation}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold" style={{ color: getPassengerLoadColor(train.passengerLoad) }}>
                      {train.passengerLoad}%
                    </div>
                    {train.delay > 0 && (
                      <div className="text-xs text-red-600">+{train.delay}min</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2 dark:text-white">
              <AlertTriangle className="w-4 h-4" />
              Issues & Delays
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {activeTrains.filter(train => train.status === 'emergency' || train.delay > 0).map((train) => (
                <div key={train.id} className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span className="font-semibold">{train.id}</span>
                    <Badge variant="destructive" className="text-xs">
                      {train.status === 'emergency' ? 'Emergency' : `${train.delay}min delay`}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">{train.currentStation}</div>
                    <div className="text-xs text-red-600">Load: {train.passengerLoad}%</div>
                  </div>
                </div>
              ))}
              {activeTrains.filter(train => train.status === 'emergency' || train.delay > 0).length === 0 && (
                <div className="p-4 text-center text-gray-500 bg-green-50 rounded-lg">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  All trains running on time
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {activeTrains.filter(t => t.delay === 0).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">On Time</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {activeTrains.filter(t => t.delay > 0 && t.delay < 5).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Minor Delay</div>
          </div>
          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {activeTrains.filter(t => t.delay >= 5).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Major Delay</div>
          </div>
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(activeTrains.reduce((acc, train) => acc + train.passengerLoad, 0) / activeTrains.length)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Avg Load</div>
          </div>
          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">99.7%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Punctuality</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetroLineMap;
