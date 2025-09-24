import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Train, 
  Activity, 
  Calendar, 
  MapPin, 
  Wrench, 
  AlertTriangle,
  TrendingUp,
  Battery,
  Thermometer,
  Gauge,
  Clock,
  User,
  FileText,
  Camera,
  Bell,
  Shield,
  Zap,
  Settings,
  BarChart3
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useParams } from 'react-router-dom';

const TrainDetails = () => {
  const { trainId } = useParams();
  const currentTrainId = trainId || 'KMRL-07';

  // Comprehensive train data
  const trainData = {
    id: currentTrainId,
    model: "Alstom Metropolis",
    manufactureYear: 2017,
    totalMileage: 387420,
    currentLocation: "Aluva-Petta Route",
    status: "service",
    healthScore: 87,
    lastMaintenance: "2024-09-15",
    nextMaintenance: "2024-10-02",
    assignedCrew: "Team Alpha",
    bay: "A-07",
    capacity: 975,
    avgDailyMileage: 245
  };

  const realTimeMetrics = {
    speed: 32,
    temperature: 24,
    batteryLevel: 89,
    doorCycles: 1247,
    brakePressure: 8.5,
    hvacEfficiency: 92,
    passengerLoad: 68,
    energyConsumption: 145.8
  };

  const maintenanceHistory = [
    { date: "2024-09-15", type: "A-Check Service", cost: 125000, technician: "Ram Kumar", duration: "6h", status: "completed" },
    { date: "2024-08-30", type: "Brake Inspection", cost: 45000, technician: "Suresh Nair", duration: "3h", status: "completed" },
    { date: "2024-08-10", type: "HVAC Cleaning", cost: 25000, technician: "Anil Jose", duration: "2h", status: "completed" },
    { date: "2024-07-25", type: "Door Mechanism", cost: 85000, technician: "Ravi Menon", duration: "4h", status: "completed" }
  ];

  const componentHealth = [
    { component: "Traction Motors", health: 92, nextService: 45, criticality: "low" },
    { component: "Brake System", health: 85, nextService: 12, criticality: "medium" },
    { component: "Door Mechanisms", health: 78, nextService: 8, criticality: "high" },
    { component: "HVAC System", health: 94, nextService: 60, criticality: "low" },
    { component: "Signaling Equipment", health: 88, nextService: 25, criticality: "medium" },
    { component: "Bogies & Suspension", health: 91, nextService: 30, criticality: "low" }
  ];

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

  const brandingInfo = {
    currentContract: "Kerala Tourism",
    revenue: 450000,
    hoursRequired: 120,
    hoursCompleted: 87,
    contractEnd: "2024-12-31",
    exposureRate: 72.5
  };

  const alerts = [
    { id: 1, type: "Warning", message: "Door closing delay increasing", severity: "medium", time: "14:23" },
    { id: 2, type: "Info", message: "Scheduled brake inspection due", severity: "low", time: "13:45" },
    { id: 3, type: "Critical", message: "HVAC temperature variance detected", severity: "high", time: "12:30" }
  ];

  const getHealthColor = (health: number) => {
    if (health >= 90) return "text-green-600 bg-green-50";
    if (health >= 75) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getCriticalityColor = (criticality: string) => {
    switch (criticality) {
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
      <Layout title="Train Details">

      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{trainData.id} - Comprehensive Analysis</h1>
            <p className="text-gray-600 mt-1">
              {trainData.model} • Current Location: {trainData.currentLocation}
            </p>
            <div className="flex items-center gap-4 mt-2">
              <Badge variant="outline" className={trainData.status === 'service' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}>
                <Activity className="w-4 h-4 mr-2" />
                {trainData.status === 'service' ? 'In Service' : 'Maintenance'}
              </Badge>
              <Badge variant="outline">
                <Train className="w-4 h-4 mr-2" />
                Bay: {trainData.bay}
              </Badge>
              <Badge variant="outline">
                <User className="w-4 h-4 mr-2" />
                {trainData.assignedCrew}
              </Badge>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Camera className="w-4 h-4 mr-2" />
              Live Camera
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Set Alert
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </Button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className={`text-2xl font-bold ${getHealthColor(trainData.healthScore).split(' ')[0]}`}>
                {trainData.healthScore}%
              </div>
              <div className="text-sm text-gray-600">Health Score</div>
              <Progress value={trainData.healthScore} className="mt-2 h-2" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{trainData.totalMileage.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Mileage (km)</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{realTimeMetrics.speed}</div>
              <div className="text-sm text-gray-600">Current Speed (km/h)</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{realTimeMetrics.batteryLevel}%</div>
              <div className="text-sm text-gray-600">Battery Level</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{realTimeMetrics.passengerLoad}%</div>
              <div className="text-sm text-gray-600">Passenger Load</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-cyan-600">{realTimeMetrics.energyConsumption}</div>
              <div className="text-sm text-gray-600">Energy (kWh)</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="health">Health Analysis</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="commercial">Commercial</TabsTrigger>
            <TabsTrigger value="alerts">Live Alerts</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
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
                      <Line type="monotone" dataKey="energy" stroke="#82ca9d" name="Energy (kWh)" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Real-Time Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Gauge className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Speed</span>
                      </div>
                      <span className="font-semibold">{realTimeMetrics.speed} km/h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-red-500" />
                        <span className="text-sm">Temperature</span>
                      </div>
                      <span className="font-semibold">{realTimeMetrics.temperature}°C</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Battery className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Battery</span>
                      </div>
                      <span className="font-semibold">{realTimeMetrics.batteryLevel}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm">Energy</span>
                      </div>
                      <span className="font-semibold">{realTimeMetrics.energyConsumption} kWh</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Health Analysis Tab */}
          <TabsContent value="health" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Component Health Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {componentHealth.map((component, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold">{component.component}</span>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${getCriticalityColor(component.criticality)}`}></div>
                            <span className={`font-bold ${getHealthColor(component.health).split(' ')[0]}`}>
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

              <Card>
                <CardHeader>
                  <CardTitle>Health Trend Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <TrendingUp className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Predictive Health Analytics</h3>
                    <p className="text-gray-600 mb-4">
                      ML-powered component failure prediction and health forecasting coming soon.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Maintenance Tab */}
          <TabsContent value="maintenance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="w-5 h-5" />
                  Maintenance History & Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {maintenanceHistory.map((record, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold">{record.type}</div>
                          <div className="text-sm text-gray-600">{record.date} • {record.technician}</div>
                          <div className="text-sm text-gray-500">Duration: {record.duration}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">₹{record.cost.toLocaleString()}</div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 mt-1">
                            {record.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Operational Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="passengers" stackId="1" stroke="#8884d8" fill="#8884d8" name="Passenger Load %" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Commercial Tab */}
          <TabsContent value="commercial" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Branding & Commercial Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-blue-800">Current Contract</div>
                      <div className="text-2xl font-bold text-blue-900">{brandingInfo.currentContract}</div>
                      <div className="text-sm text-blue-700">Expires: {brandingInfo.contractEnd}</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="font-semibold text-green-800">Total Revenue</div>
                      <div className="text-2xl font-bold text-green-900">₹{brandingInfo.revenue.toLocaleString()}</div>
                      <div className="text-sm text-green-700">This contract period</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Exposure Progress</span>
                        <span>{brandingInfo.hoursCompleted}h / {brandingInfo.hoursRequired}h</span>
                      </div>
                      <Progress value={(brandingInfo.hoursCompleted / brandingInfo.hoursRequired) * 100} className="h-3" />
                    </div>
                    <div>
                      <div className="font-semibold mb-2">Exposure Rate</div>
                      <div className="text-2xl font-bold text-purple-600">{brandingInfo.exposureRate}%</div>
                      <div className="text-sm text-gray-600">Daily average</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Active Alerts & Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                      alert.severity === 'high' ? 'border-red-500 bg-red-50' :
                      alert.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                      'border-blue-500 bg-blue-50'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge variant={alert.severity === 'high' ? 'destructive' : 
                                       alert.severity === 'medium' ? 'default' : 'secondary'}>
                            {alert.type}
                          </Badge>
                          <div className="mt-2 font-semibold">{alert.message}</div>
                        </div>
                        <div className="text-sm text-gray-600">{alert.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TrainDetails;
