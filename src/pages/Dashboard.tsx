import { Layout } from "@/components/Layout";
import { KPICard } from "@/components/KPICard";
import MetroLineMap from "@/components/MetroLineMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Train, 
  Wrench, 
  Pause, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  Calendar, 
  Eye, 
  ChevronRight,
  Activity,
  TrendingUp,
  Users,
  Zap,
  Shield,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  Timer
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const Dashboard = () => {
  // Mock data representing real KMRL operations
  const currentTime = new Date();
  const currentShift = currentTime.getHours() >= 6 && currentTime.getHours() < 22 ? "Day Shift" : "Night Shift";
  
  const fleetData = {
    total: 25,
    inService: 18,
    maintenance: 4,
    standby: 2,
    emergency: 1
  };

  const todayMetrics = {
    punctuality: 99.7,
    avgSpeed: 32.5,
    passengerCount: 145820,
    energyEfficiency: 92.3,
    maintenanceCost: 2850000,
    revenue: 4120000
  };

  const trains = [
    { id: "KRISHNA", status: "service", location: "Aluva-Petta", mileage: 42150, health: 94, nextMaintenance: "3 days", priority: "low" },
    { id: "TAPTI", status: "maintenance", location: "Depot Bay A2", mileage: 38900, health: 76, nextMaintenance: "In Progress", priority: "high" },
    { id: "NILA", status: "service", location: "Petta-Aluva", mileage: 35200, health: 91, nextMaintenance: "7 days", priority: "low" },
    { id: "SARAYU", status: "standby", location: "Depot Bay C1", mileage: 41800, health: 88, nextMaintenance: "2 days", priority: "medium" },
    { id: "ARUTH", status: "service", location: "Aluva-Petta", mileage: 39500, health: 85, nextMaintenance: "1 day", priority: "medium" },
    { id: "VAIGAI", status: "emergency", location: "JLN Stadium", mileage: 44200, health: 45, nextMaintenance: "Immediate", priority: "critical" },
    { id: "JHANAVI", status: "service", location: "Petta-Aluva", mileage: 36800, health: 93, nextMaintenance: "5 days", priority: "low" },
    { id: "DHWANIL", status: "maintenance", location: "Depot Bay B1", mileage: 43100, health: 78, nextMaintenance: "In Progress", priority: "high" }
  ];

  const alerts = [
    { id: 1, train: "VAIGAI", type: "Critical", message: "Door mechanism failure", time: "14:23", status: "active" },
    { id: 2, train: "YAMUNA", type: "Warning", message: "Brake pad wear 85%", time: "13:45", status: "active" },
    { id: 3, train: "NILA", type: "Info", message: "Scheduled maintenance due", time: "12:30", status: "pending" },
    { id: 4, train: "NARMADA", type: "Warning", message: "HVAC temperature variance", time: "11:15", status: "resolved" }
  ];

  const punctualityData = [
    { time: '06:00', value: 99.2 },
    { time: '08:00', value: 98.8 },
    { time: '10:00', value: 99.5 },
    { time: '12:00', value: 99.1 },
    { time: '14:00', value: 99.7 },
    { time: '16:00', value: 98.9 },
    { time: '18:00', value: 99.3 },
    { time: '20:00', value: 99.6 }
  ];

  const maintenanceSchedule = [
    { train: "DHWANIL", type: "A-Check Service", technician: "Team Alpha", startTime: "22:00", duration: "6h", bay: "Bay A2", priority: "high" },
    { train: "VAAYU", type: "Brake Inspection", technician: "Team Beta", startTime: "23:30", duration: "3h", bay: "Bay B1", priority: "medium" },
    { train: "GODHAVARI", type: "HVAC Maintenance", technician: "Team Gamma", startTime: "01:00", duration: "4h", bay: "Bay C3", priority: "medium" },
    { train: "ARUTH", type: "Door System Check", technician: "Team Alpha", startTime: "02:30", duration: "2h", bay: "Bay A1", priority: "low" }
  ];

  const brandingContracts = [
    { advertiser: "Kerala Tourism", trains: ["KRISHNA", "JHANAVI", "YAMUNA"], hoursRequired: 120, hoursCompleted: 87, revenue: 850000, status: "active" },
    { advertiser: "Cochin Shipyard", trains: ["NILA", "PAMPA"], hoursRequired: 80, hoursCompleted: 65, revenue: 450000, status: "active" },
    { advertiser: "Federal Bank", trains: ["BHAVANI"], hoursRequired: 60, hoursCompleted: 58, revenue: 320000, status: "completing" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "service": return "bg-green-500";
      case "maintenance": return "bg-yellow-500";
      case "standby": return "bg-blue-500";
      case "emergency": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-600";
      case "high": return "bg-orange-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Layout title="Operations Dashboard">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">KMRL Operations Command Center</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              {currentShift} • {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString()}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Activity className="w-4 h-4 mr-2" />
              Live View
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Night Planning
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
        <KPICard
          title="Fleet in Service"
          value={`${fleetData.inService}/${fleetData.total}`}
          icon={<Train className="w-5 h-5" />}
          variant="success"
          trend={{ value: "+2", isPositive: true }}
        />
        <KPICard
          title="Punctuality Rate"
          value={`${todayMetrics.punctuality}%`}
          icon={<Clock className="w-5 h-5" />}
          variant="success"
          trend={{ value: "+0.3%", isPositive: true }}
        />
        <KPICard
          title="In Maintenance"
          value={fleetData.maintenance.toString()}
          icon={<Wrench className="w-5 h-5" />}
          variant="warning"
        />
        <KPICard
          title="Emergency Issues"
          value={fleetData.emergency.toString()}
          icon={<AlertTriangle className="w-5 h-5" />}
          variant="destructive"
        />
        <KPICard
          title="Daily Passengers"
          value={`${Math.round(todayMetrics.passengerCount / 1000)}K`}
          icon={<Users className="w-5 h-5" />}
          variant="default"
          trend={{ value: "+5.2%", isPositive: true }}
        />
        <KPICard
          title="Energy Efficiency"
          value={`${todayMetrics.energyEfficiency}%`}
          icon={<Zap className="w-5 h-5" />}
          variant="success"
          trend={{ value: "+1.8%", isPositive: true }}
        />
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Fleet Overview</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="branding">Commercial</TabsTrigger>
          <TabsTrigger value="alerts">Live Alerts</TabsTrigger>
        </TabsList>

        {/* Fleet Overview Tab - WITH METRO LINE MAP */}
        <TabsContent value="overview" className="space-y-4">
          {/* Metro Line Map - Featured First */}
          <MetroLineMap />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live Train Status */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Live Train Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trains.slice(0, 6).map((train) => (
                    <div key={train.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(train.status)}`}></div>
                        <div>
                          <div className="font-semibold">{train.id}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">{train.location}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={`${getPriorityColor(train.priority)} text-white`}>
                            {train.priority}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Health: {train.health}%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{train.mileage.toLocaleString()} km</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Overall Fleet Health</span>
                      <span className="text-sm font-semibold">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Rolling Stock</span>
                      <span className="text-sm font-semibold">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Signaling Systems</span>
                      <span className="text-sm font-semibold">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Telecom Systems</span>
                      <span className="text-sm font-semibold">88%</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Maintenance Tab */}
        <TabsContent value="maintenance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tonight's Maintenance Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {maintenanceSchedule.map((task, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold">{task.train}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">{task.type}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{task.technician} • {task.bay}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold">{task.startTime}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">{task.duration}</div>
                          <Badge variant="outline" className={`${getPriorityColor(task.priority)} text-white mt-1`}>
                            {task.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Maintenance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">4</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Scheduled Tonight</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">92%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">On-Time Completion</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">2.8M</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Monthly Cost (₹)</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">15</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Days Avg Cycle</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Today's Punctuality Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={punctualityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[98, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Operational Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{todayMetrics.avgSpeed}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Avg Speed (km/h)</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{Math.round(todayMetrics.passengerCount/1000)}K</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Daily Passengers</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{todayMetrics.energyEfficiency}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Energy Efficiency</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">₹{Math.round(todayMetrics.revenue/100000)/10}L</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Daily Revenue</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Commercial/Branding Tab */}
        <TabsContent value="branding" className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Active Branding Contracts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {brandingContracts.map((contract, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-semibold text-lg">{contract.advertiser}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">Trains: {contract.trains.join(', ')}</div>
                        </div>
                        <Badge variant={contract.status === 'active' ? 'default' : 'secondary'}>
                          {contract.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">Exposure Progress</div>
                          <Progress value={(contract.hoursCompleted / contract.hoursRequired) * 100} className="h-2 mt-1" />
                          <div className="text-sm mt-1">{contract.hoursCompleted}h / {contract.hoursRequired}h</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">Revenue</div>
                          <div className="text-lg font-semibold">₹{contract.revenue.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">Completion Rate</div>
                          <div className="text-lg font-semibold">{Math.round((contract.hoursCompleted / contract.hoursRequired) * 100)}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Live Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Live System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                    alert.type === 'Critical' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                    alert.type === 'Warning' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                    'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant={alert.type === 'Critical' ? 'destructive' : 
                                       alert.type === 'Warning' ? 'default' : 'secondary'}>
                            {alert.type}
                          </Badge>
                          <span className="font-semibold">{alert.train}</span>
                        </div>
                        <div className="mt-1 text-gray-700 dark:text-gray-300">{alert.message}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600 dark:text-gray-300">{alert.time}</div>
                        <Badge variant="outline" className={
                          alert.status === 'active' ? 'border-red-500' :
                          alert.status === 'resolved' ? 'border-green-500' :
                          'border-yellow-500'
                        }>
                          {alert.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Dashboard;
