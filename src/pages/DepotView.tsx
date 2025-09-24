import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Users, 
  Clock, 
  Wrench, 
  AlertTriangle,
  CheckCircle,
  Calendar,
  Activity,
  Truck,
  HardHat,
  Zap,
  Thermometer,
  Eye,
  Settings,
  RefreshCw
} from "lucide-react";

const DepotView = () => {
  const depotData = {
    name: "Muttom Depot",
    location: "Aluva, Kerala",
    capacity: 30,
    currentOccupancy: 25,
    operationalSince: "2017",
    area: "42 acres",
    bays: {
      service: 15,
      maintenance: 8,
      cleaning: 4,
      storage: 3
    }
  };

  const bayLayout = [
    // Service Bays (A-Section)
    { id: "A-01", type: "service", train: "KMRL-01", status: "occupied", activity: "Standby", crew: "Team Alpha" },
    { id: "A-02", type: "service", train: "KMRL-03", status: "occupied", activity: "Pre-service Check", crew: "Team Beta" },
    { id: "A-03", type: "service", train: "KMRL-05", status: "occupied", activity: "Cleaning", crew: "Cleaning-1" },
    { id: "A-04", type: "service", train: null, status: "available", activity: "Ready", crew: null },
    { id: "A-05", type: "service", train: "KMRL-07", status: "occupied", activity: "Inspection", crew: "Team Gamma" },
    
    // Maintenance Bays (B-Section)
    { id: "B-01", type: "maintenance", train: "KMRL-02", status: "occupied", activity: "A-Check Service", crew: "Maint-Alpha", duration: "6h" },
    { id: "B-02", type: "maintenance", train: "KMRL-08", status: "occupied", activity: "Brake Repair", crew: "Maint-Beta", duration: "4h" },
    { id: "B-03", type: "maintenance", train: "KMRL-12", status: "occupied", activity: "HVAC Service", crew: "Maint-Gamma", duration: "3h" },
    { id: "B-04", type: "maintenance", train: null, status: "available", activity: "Ready", crew: null },
    
    // Inspection Bay Line (IBL)
    { id: "IBL-1", type: "inspection", train: "KMRL-15", status: "occupied", activity: "Major Overhaul", crew: "IBL-Team", duration: "12h" },
    { id: "IBL-2", type: "inspection", train: null, status: "available", activity: "Ready", crew: null },
    
    // Cleaning Bays (C-Section)
    { id: "C-01", type: "cleaning", train: "KMRL-18", status: "occupied", activity: "Deep Clean", crew: "Clean-1" },
    { id: "C-02", type: "cleaning", train: "KMRL-21", status: "occupied", activity: "Exterior Wash", crew: "Clean-2" },
    { id: "C-03", type: "cleaning", train: null, status: "available", activity: "Ready", crew: null }
  ];

  const staffSchedule = [
    { shift: "Night (22:00-06:00)", supervisor: "Rajesh Kumar", technicians: 12, cleaners: 6, security: 3, total: 21 },
    { shift: "Morning (06:00-14:00)", supervisor: "Suresh Nair", technicians: 15, cleaners: 8, security: 2, total: 25 },
    { shift: "Evening (14:00-22:00)", supervisor: "Anil Jose", technicians: 14, cleaners: 7, security: 2, total: 23 }
  ];

  const equipmentStatus = [
    { equipment: "Overhead Cranes", total: 6, operational: 5, maintenance: 1, efficiency: 83 },
    { equipment: "Jack Systems", total: 8, operational: 7, maintenance: 1, efficiency: 88 },
    { equipment: "Cleaning Equipment", total: 12, operational: 11, maintenance: 1, efficiency: 92 },
    { equipment: "Testing Equipment", total: 15, operational: 14, maintenance: 1, efficiency: 93 },
    { equipment: "Power Tools", total: 45, operational: 42, maintenance: 3, efficiency: 93 }
  ];

  const environmentalMetrics = {
    temperature: 28,
    humidity: 65,
    airQuality: 92,
    noiseLevel: 45,
    lightingLevel: 85,
    powerConsumption: 245
  };

  const todayActivities = [
    { time: "22:30", activity: "KMRL-02 entered Bay B-01 for A-Check", status: "in-progress" },
    { time: "23:15", activity: "KMRL-15 major overhaul completed", status: "completed" },
    { time: "00:45", activity: "KMRL-18 exterior cleaning started", status: "in-progress" },
    { time: "01:20", activity: "Bay A-04 prepared for incoming train", status: "ready" },
    { time: "02:00", activity: "Emergency repair on KMRL-08 brake system", status: "urgent" }
  ];

  const getBayStatusColor = (status: string) => {
    switch (status) {
      case "occupied": return "bg-blue-500";
      case "available": return "bg-green-500";
      case "maintenance": return "bg-yellow-500";
      case "blocked": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getBayTypeIcon = (type: string) => {
    switch (type) {
      case "service": return <CheckCircle className="w-4 h-4" />;
      case "maintenance": return <Wrench className="w-4 h-4" />;
      case "inspection": return <Eye className="w-4 h-4" />;
      case "cleaning": return <RefreshCw className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  return (
      <Layout title="Depot Management">

      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{depotData.name} - Operations Center</h1>
            <p className="text-gray-600 mt-1">
              {depotData.location} • {depotData.area} • Operational since {depotData.operationalSince}
            </p>
            <div className="flex items-center gap-4 mt-2">
              <Badge variant="outline" className="bg-blue-50">
                <MapPin className="w-4 h-4 mr-2" />
                Capacity: {depotData.currentOccupancy}/{depotData.capacity}
              </Badge>
              <Badge variant="outline" className="bg-green-50">
                <Activity className="w-4 h-4 mr-2" />
                Operational
              </Badge>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              CCTV View
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
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
              <div className="text-2xl font-bold text-blue-600">{depotData.currentOccupancy}</div>
              <div className="text-sm text-gray-600">Trains Present</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{bayLayout.filter(b => b.status === 'available').length}</div>
              <div className="text-sm text-gray-600">Available Bays</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{bayLayout.filter(b => b.activity?.includes('Service') || b.activity?.includes('Repair')).length}</div>
              <div className="text-sm text-gray-600">In Maintenance</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{staffSchedule.find(s => s.shift.includes('Night'))?.total || 0}</div>
              <div className="text-sm text-gray-600">Night Staff</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-cyan-600">{environmentalMetrics.temperature}°C</div>
              <div className="text-sm text-gray-600">Temperature</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{environmentalMetrics.powerConsumption}</div>
              <div className="text-sm text-gray-600">Power (kW)</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="layout" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="layout">Bay Layout</TabsTrigger>
            <TabsTrigger value="staff">Staff & Crews</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
            <TabsTrigger value="environment">Environment</TabsTrigger>
            <TabsTrigger value="activities">Live Activities</TabsTrigger>
          </TabsList>

          {/* Bay Layout Tab */}
          <TabsContent value="layout" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Service Bays */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    Service Bays (A-Section)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {bayLayout.filter(bay => bay.type === 'service').map((bay) => (
                      <div key={bay.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${getBayStatusColor(bay.status)}`}></div>
                            <span className="font-semibold">{bay.id}</span>
                          </div>
                          <Badge variant="outline">
                            {bay.train || 'Empty'}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">{bay.activity}</div>
                        {bay.crew && <div className="text-xs text-gray-500">{bay.crew}</div>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Maintenance Bays */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-600">
                    <Wrench className="w-5 h-5" />
                    Maintenance Bays (B-Section)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {bayLayout.filter(bay => bay.type === 'maintenance').map((bay) => (
                      <div key={bay.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${getBayStatusColor(bay.status)}`}></div>
                            <span className="font-semibold">{bay.id}</span>
                          </div>
                          <Badge variant="outline">
                            {bay.train || 'Empty'}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">{bay.activity}</div>
                        {bay.crew && <div className="text-xs text-gray-500">{bay.crew}</div>}
                        {bay.duration && <div className="text-xs text-blue-600">Duration: {bay.duration}</div>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Inspection Bays */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <Eye className="w-5 h-5" />
                    Inspection Bay Line (IBL)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {bayLayout.filter(bay => bay.type === 'inspection').map((bay) => (
                      <div key={bay.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${getBayStatusColor(bay.status)}`}></div>
                            <span className="font-semibold">{bay.id}</span>
                          </div>
                          <Badge variant="outline">
                            {bay.train || 'Empty'}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">{bay.activity}</div>
                        {bay.crew && <div className="text-xs text-gray-500">{bay.crew}</div>}
                        {bay.duration && <div className="text-xs text-blue-600">Duration: {bay.duration}</div>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Cleaning Bays */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <RefreshCw className="w-5 h-5" />
                    Cleaning Bays (C-Section)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {bayLayout.filter(bay => bay.type === 'cleaning').map((bay) => (
                      <div key={bay.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${getBayStatusColor(bay.status)}`}></div>
                            <span className="font-semibold">{bay.id}</span>
                          </div>
                          <Badge variant="outline">
                            {bay.train || 'Empty'}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">{bay.activity}</div>
                        {bay.crew && <div className="text-xs text-gray-500">{bay.crew}</div>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Staff Tab */}
          <TabsContent value="staff" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Shift-wise Staff Allocation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {staffSchedule.map((shift, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-semibold text-lg">{shift.shift}</div>
                          <div className="text-gray-600">Supervisor: {shift.supervisor}</div>
                        </div>
                        <Badge variant="outline" className="bg-blue-50">
                          Total: {shift.total} staff
                        </Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded">
                          <div className="text-xl font-bold text-blue-600">{shift.technicians}</div>
                          <div className="text-sm text-gray-600">Technicians</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded">
                          <div className="text-xl font-bold text-green-600">{shift.cleaners}</div>
                          <div className="text-sm text-gray-600">Cleaners</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded">
                          <div className="text-xl font-bold text-purple-600">{shift.security}</div>
                          <div className="text-sm text-gray-600">Security</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded">
                          <div className="text-xl font-bold text-orange-600">1</div>
                          <div className="text-sm text-gray-600">Supervisor</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Equipment Tab */}
          <TabsContent value="equipment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Equipment Status & Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {equipmentStatus.map((equipment, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <div className="font-semibold">{equipment.equipment}</div>
                        <div className="text-right">
                          <div className="font-semibold text-green-600">{equipment.efficiency}%</div>
                          <div className="text-sm text-gray-600">Efficiency</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div className="text-center p-2 bg-blue-50 rounded">
                          <div className="font-bold text-blue-600">{equipment.total}</div>
                          <div className="text-xs text-gray-600">Total</div>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded">
                          <div className="font-bold text-green-600">{equipment.operational}</div>
                          <div className="text-xs text-gray-600">Operational</div>
                        </div>
                        <div className="text-center p-2 bg-yellow-50 rounded">
                          <div className="font-bold text-yellow-600">{equipment.maintenance}</div>
                          <div className="text-xs text-gray-600">Maintenance</div>
                        </div>
                      </div>
                      <Progress value={equipment.efficiency} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Environment Tab */}
          <TabsContent value="environment" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Thermometer className="w-5 h-5" />
                    Environmental Monitoring
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Temperature</span>
                      <span className="text-lg font-bold text-orange-600">{environmentalMetrics.temperature}°C</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Humidity</span>
                      <span className="text-lg font-bold text-blue-600">{environmentalMetrics.humidity}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Air Quality Index</span>
                      <span className="text-lg font-bold text-green-600">{environmentalMetrics.airQuality}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Noise Level</span>
                      <span className="text-lg font-bold text-purple-600">{environmentalMetrics.noiseLevel} dB</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Lighting Level</span>
                      <span className="text-lg font-bold text-yellow-600">{environmentalMetrics.lightingLevel}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Energy Consumption
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-cyan-600 mb-2">
                      {environmentalMetrics.powerConsumption} kW
                    </div>
                    <div className="text-gray-600 mb-4">Current Power Usage</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-blue-50 rounded">
                        <div className="font-bold text-blue-600">185 kW</div>
                        <div className="text-sm text-gray-600">Daily Average</div>
                      </div>
                      <div className="p-3 bg-green-50 rounded">
                        <div className="font-bold text-green-600">92%</div>
                        <div className="text-sm text-gray-600">Efficiency</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Real-time Depot Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todayActivities.map((activity, index) => (
                    <div key={index} className={`p-4 rounded-lg border-l-4 ${
                      activity.status === 'urgent' ? 'border-red-500 bg-red-50' :
                      activity.status === 'in-progress' ? 'border-blue-500 bg-blue-50' :
                      activity.status === 'completed' ? 'border-green-500 bg-green-50' :
                      'border-gray-500 bg-gray-50'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold">{activity.activity}</div>
                          <Badge variant={
                            activity.status === 'urgent' ? 'destructive' :
                            activity.status === 'in-progress' ? 'default' :
                            activity.status === 'completed' ? 'secondary' :
                            'outline'
                          } className="mt-2">
                            {activity.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">{activity.time}</div>
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

export default DepotView;
