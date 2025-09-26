import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Train, 
  Search,
  Filter,
  Calendar, 
  Wrench, 
  AlertTriangle,
  Battery,
  Gauge,
  Clock,
  FileText,
  MapPin,
  Thermometer,
  CheckCircle,
  XCircle,
  AlertCircle,
  Activity,
  Plus,
  Settings,
  Download,
  User,
  Zap,
  Shield,
  TrendingUp,
  BarChart3
} from "lucide-react";
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const TrainFleet = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrain, setSelectedTrain] = useState("KMRL-01");

  // Generate 25 trains data
  const generateFleetData = () => {
    const statuses = ["active", "maintenance", "inactive"];
    const locations = [
      "Aluva-Petta Route", "Palarivattom-Vytilla", "Edapally-JLN Stadium", 
      "MG Road-Maharaja's", "Ernakulam South-Kadavanthra", "Kaloor-Town Hall",
      "Depot A-Bay 1", "Depot A-Bay 2", "Depot A-Bay 3", "Depot B-Bay 1",
      "Depot B-Bay 2", "Depot C-Bay 1", "Lissie-Vyttila", "SN Junction-Maharaja's"
    ];
    const cleaningStatuses = ["clean", "pending", "dirty"];
    
    return Array.from({ length: 25 }, (_, i) => {
      const trainNumber = String(i + 1).padStart(2, '0');
      const isActive = Math.random() > 0.3;
      const hasIssues = Math.random() > 0.7;
      
      return {
        id: `KMRL-${trainNumber}`,
        model: "Alstom Metropolis",
        status: isActive ? (Math.random() > 0.8 ? "maintenance" : "active") : "inactive",
        location: locations[Math.floor(Math.random() * locations.length)],
        healthScore: Math.floor(Math.random() * 40 + 60), // 60-100
        totalMileage: Math.floor(Math.random() * 200000 + 250000), // 250k-450k
        lastMaintenance: new Date(2024, 8, Math.floor(Math.random() * 25 + 1)).toISOString().split('T')[0],
        nextMaintenance: new Date(2024, 9, Math.floor(Math.random() * 30 + 1)).toISOString().split('T')[0],
        maintenanceDue: Math.floor(Math.random() * 30 + 1),
        fitnessValid: Math.random() > 0.2,
        fitnessExpiry: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28 + 1)).toISOString().split('T')[0],
        cleaningStatus: cleaningStatuses[Math.floor(Math.random() * cleaningStatuses.length)],
        criticalIssues: hasIssues ? Math.floor(Math.random() * 3 + 1) : 0,
        batteryLevel: Math.floor(Math.random() * 50 + 50), // 50-100
        currentSpeed: isActive ? Math.floor(Math.random() * 40 + 10) : 0,
        passengerLoad: isActive ? Math.floor(Math.random() * 60 + 30) : 0,
        avgDailyMileage: Math.floor(Math.random() * 100 + 200),
        manufactureYear: 2017 + Math.floor(Math.random() * 6),
        assignedCrew: `Team ${String.fromCharCode(65 + Math.floor(Math.random() * 8))}`,
        bay: `${String.fromCharCode(65 + Math.floor(Math.random() * 3))}-${String(i + 1).padStart(2, '0')}`
      };
    });
  };

  const [fleetData] = useState(generateFleetData());

  const filteredTrains = fleetData.filter(train =>
    train.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    train.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentTrain = fleetData.find(train => train.id === selectedTrain) || fleetData[0];

  // Performance data for selected train
  const performanceData = [
    { time: '06:00', speed: 28, energy: 120, passengers: 45 },
    { time: '08:00', speed: 32, energy: 155, passengers: 85 },
    { time: '10:00', speed: 35, energy: 140, passengers: 65 },
    { time: '12:00', speed: 30, energy: 145, passengers: 70 },
    { time: '14:00', speed: 33, energy: 150, passengers: 78 },
    { time: '16:00', speed: 29, energy: 165, passengers: 92 },
    { time: '18:00', speed: 31, energy: 175, passengers: 95 },
    { time: '20:00', speed: 34, energy: 160, passengers: 82 }
  ];

  const componentHealth = [
    { component: "Traction Motors", health: 92, nextService: 45, criticality: "low" },
    { component: "Brake System", health: 85, nextService: 12, criticality: "medium" },
    { component: "Door Mechanisms", health: 78, nextService: 8, criticality: "high" },
    { component: "HVAC System", health: 94, nextService: 60, criticality: "low" },
    { component: "Signaling Equipment", health: 88, nextService: 25, criticality: "medium" },
    { component: "Bogies & Suspension", health: 91, nextService: 30, criticality: "low" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 border-green-200";
      case "maintenance": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "inactive": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getHealthColor = (health) => {
    if (health >= 90) return "text-green-600";
    if (health >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const getCleaningColor = (status) => {
    switch (status) {
      case "clean": return "text-green-600";
      case "pending": return "text-yellow-600";
      case "dirty": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getCriticalityColor = (criticality) => {
    switch (criticality) {
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const fleetStats = {
    total: fleetData.length,
    active: fleetData.filter(t => t.status === "active").length,
    maintenance: fleetData.filter(t => t.status === "maintenance").length,
    critical: fleetData.filter(t => t.criticalIssues > 0).length,
    avgHealth: Math.round(fleetData.reduce((sum, t) => sum + t.healthScore, 0) / fleetData.length)
  };

  return (
    <Layout title="Train Fleet Management">
      <div className="flex h-screen overflow-hidden">
        {/* Left Sidebar - Train List */}
        <div className="w-96 border-r border-gray-200 flex flex-col bg-gray-50">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 bg-white">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Fleet Overview</h2>
            
            {/* Fleet Stats */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="text-center p-2 bg-blue-50 rounded">
                <div className="text-lg font-bold text-blue-600">{fleetStats.total}</div>
                <div className="text-xs text-gray-600">Total</div>
              </div>
              <div className="text-center p-2 bg-green-50 rounded">
                <div className="text-lg font-bold text-green-600">{fleetStats.active}</div>
                <div className="text-xs text-gray-600">Active</div>
              </div>
              <div className="text-center p-2 bg-yellow-50 rounded">
                <div className="text-lg font-bold text-yellow-600">{fleetStats.maintenance}</div>
                <div className="text-xs text-gray-600">Maintenance</div>
              </div>
              <div className="text-center p-2 bg-red-50 rounded">
                <div className="text-lg font-bold text-red-600">{fleetStats.critical}</div>
                <div className="text-xs text-gray-600">Critical</div>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Search trains..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Train List */}
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-2">
              {filteredTrains.map((train) => (
                <Card 
                  key={train.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedTrain === train.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedTrain(train.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Train className="w-5 h-5 text-blue-600" />
                        <h3 className="font-bold text-sm">{train.id}</h3>
                      </div>
                      <Badge className={`text-xs ${getStatusColor(train.status)}`}>
                        {train.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-3 h-3 mr-1" />
                        {train.location.length > 20 ? train.location.substring(0, 20) + '...' : train.location}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Shield className="w-3 h-3 mr-1" />
                          <span className={`font-semibold ${getHealthColor(train.healthScore)}`}>
                            {train.healthScore}%
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {train.criticalIssues > 0 && (
                            <div className="flex items-center text-red-600">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              <span>{train.criticalIssues}</span>
                            </div>
                          )}
                          <div className="flex items-center">
                            {train.fitnessValid ? 
                              <CheckCircle className="w-3 h-3 text-green-600" /> :
                              <XCircle className="w-3 h-3 text-red-600" />
                            }
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between text-gray-500">
                        <span>Due: {train.maintenanceDue}d</span>
                        <span className={getCleaningColor(train.cleaningStatus)}>
                          {train.cleaningStatus}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Right Panel - Train Details */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-6 space-y-6">
              {/* Train Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {currentTrain.id} - Detailed Analysis
                  </h1>
                  <p className="text-gray-600">
                    {currentTrain.model} • {currentTrain.location}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <Badge className={getStatusColor(currentTrain.status)}>
                      <Activity className="w-4 h-4 mr-2" />
                      {currentTrain.status.charAt(0).toUpperCase() + currentTrain.status.slice(1)}
                    </Badge>
                    <Badge variant="outline">
                      <Train className="w-4 h-4 mr-2" />
                      Bay: {currentTrain.bay}
                    </Badge>
                    <Badge variant="outline">
                      <User className="w-4 h-4 mr-2" />
                      {currentTrain.assignedCrew}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className={`text-2xl font-bold ${getHealthColor(currentTrain.healthScore)}`}>
                      {currentTrain.healthScore}%
                    </div>
                    <div className="text-sm text-gray-600">Health Score</div>
                    <Progress value={currentTrain.healthScore} className="mt-2 h-2" />
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {currentTrain.totalMileage.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Mileage (km)</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{currentTrain.currentSpeed}</div>
                    <div className="text-sm text-gray-600">Speed (km/h)</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{currentTrain.batteryLevel}%</div>
                    <div className="text-sm text-gray-600">Battery Level</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">{currentTrain.passengerLoad}%</div>
                    <div className="text-sm text-gray-600">Passenger Load</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-cyan-600">{currentTrain.avgDailyMileage}</div>
                    <div className="text-sm text-gray-600">Avg Daily (km)</div>
                  </CardContent>
                </Card>
              </div>

              {/* Essential Information Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Fitness Certificate */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Fitness Certificate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Status:</span>
                        <div className="flex items-center gap-2">
                          {currentTrain.fitnessValid ? 
                            <CheckCircle className="w-5 h-5 text-green-600" /> :
                            <XCircle className="w-5 h-5 text-red-600" />
                          }
                          <span className={currentTrain.fitnessValid ? 'text-green-600' : 'text-red-600'}>
                            {currentTrain.fitnessValid ? 'Valid' : 'Expired'}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span>Expiry Date:</span>
                        <span className="font-semibold">{currentTrain.fitnessExpiry}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Manufacture Year:</span>
                        <span className="font-semibold">{currentTrain.manufactureYear}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Maintenance Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wrench className="w-5 h-5" />
                      Maintenance Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Last Service:</span>
                        <span className="font-semibold">{currentTrain.lastMaintenance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Next Service:</span>
                        <span className="font-semibold">{currentTrain.nextMaintenance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Due In:</span>
                        <span className={`font-semibold ${
                          currentTrain.maintenanceDue <= 5 ? 'text-red-600' : 
                          currentTrain.maintenanceDue <= 10 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {currentTrain.maintenanceDue} days
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cleaning Status:</span>
                        <span className={`font-semibold capitalize ${getCleaningColor(currentTrain.cleaningStatus)}`}>
                          {currentTrain.cleaningStatus}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Usage Balance */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Usage Balance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Total Mileage:</span>
                        <span className="font-semibold">{currentTrain.totalMileage.toLocaleString()} km</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Daily Average:</span>
                        <span className="font-semibold">{currentTrain.avgDailyMileage} km</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Critical Issues:</span>
                        <span className={`font-semibold ${currentTrain.criticalIssues > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {currentTrain.criticalIssues}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Current Load:</span>
                        <span className="font-semibold">{currentTrain.passengerLoad}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Today's Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="speed" stroke="#8884d8" name="Speed (km/h)" />
                      <Line type="monotone" dataKey="passengers" stroke="#82ca9d" name="Passengers %" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Component Health */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Component Health Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {componentHealth.map((component, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold">{component.component}</span>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${getCriticalityColor(component.criticality)}`}></div>
                            <span className={`font-bold ${getHealthColor(component.health)}`}>
                              {component.health}%
                            </span>
                          </div>
                        </div>
                        <Progress value={component.health} className="mb-2 h-2" />
                        <div className="text-sm text-gray-600">
                          Next service in {component.nextService} days
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </div>
      </div>
    </Layout>
  );
};

export default TrainFleet;
