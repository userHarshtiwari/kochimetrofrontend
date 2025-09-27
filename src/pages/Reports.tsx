import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  FileText,
  Download,
  Calendar,
  TrendingUp,
  Shield,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle,
  Users,
  Zap,
  Target,
  Wrench,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Reports = () => {
  const currentDate = new Date().toLocaleDateString();

  // Performance Analytics Data
  const monthlyPerformance = [
    {
      month: "Jan",
      punctuality: 99.2,
      availability: 94.5,
      efficiency: 87.3,
      cost: 28.5,
    },
    {
      month: "Feb",
      punctuality: 99.4,
      availability: 95.1,
      efficiency: 88.7,
      cost: 27.8,
    },
    {
      month: "Mar",
      punctuality: 99.1,
      availability: 93.8,
      efficiency: 86.9,
      cost: 29.2,
    },
    {
      month: "Apr",
      punctuality: 99.6,
      availability: 96.2,
      efficiency: 89.4,
      cost: 26.9,
    },
    {
      month: "May",
      punctuality: 99.3,
      availability: 95.7,
      efficiency: 88.1,
      cost: 28.1,
    },
    {
      month: "Jun",
      punctuality: 99.5,
      availability: 96.8,
      efficiency: 90.2,
      cost: 25.6,
    },
  ];

  const maintenanceAnalytics = [
    {
      type: "Preventive",
      completed: 145,
      scheduled: 160,
      cost: 1250000,
      efficiency: 91,
    },
    {
      type: "Corrective",
      completed: 89,
      scheduled: 95,
      cost: 890000,
      efficiency: 94,
    },
    {
      type: "Emergency",
      completed: 23,
      scheduled: 18,
      cost: 450000,
      efficiency: 78,
    },
    {
      type: "Overhaul",
      completed: 12,
      scheduled: 15,
      cost: 2100000,
      efficiency: 80,
    },
  ];

  const kpiSummary = {
    punctuality: { current: 99.5, target: 99.5, trend: "+0.2%" },
    availability: { current: 96.8, target: 95.0, trend: "+1.8%" },
    mtbf: { current: 125000, target: 120000, trend: "+4.2%" },
    cost: { current: 25.6, target: 28.0, trend: "-8.6%" },
    efficiency: { current: 90.2, target: 88.0, trend: "+2.5%" },
    safety: { current: 99.98, target: 99.95, trend: "+0.03%" },
  };

  const auditTrail = [
    {
      timestamp: "2024-09-24 22:15",
      user: "Rajesh Kumar",
      action: "Approved induction plan",
      module: "AI Planning",
      status: "success",
    },
    {
      timestamp: "2024-09-24 21:45",
      user: "System AI",
      action: "Generated optimal induction plan",
      module: "ML Engine",
      status: "automated",
    },
    {
      timestamp: "2024-09-24 21:30",
      user: "Suresh Nair",
      action: "Updated train KMRL-07 maintenance status",
      module: "Maintenance",
      status: "success",
    },
    {
      timestamp: "2024-09-24 21:15",
      user: "Anil Jose",
      action: "Override AI recommendation for KMRL-12",
      module: "Manual Override",
      status: "manual",
    },
    {
      timestamp: "2024-09-24 20:45",
      user: "System",
      action: "Maximo data sync completed",
      module: "Data Integration",
      status: "automated",
    },
  ];

  const complianceMetrics = {
    safetyCompliance: 99.8,
    environmentalCompliance: 97.2,
    regulatoryCompliance: 99.5,
    qualityStandards: 96.8,
    dataPrivacy: 100.0,
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-50 text-green-700";
      case "automated":
        return "bg-blue-50 text-blue-700";
      case "manual":
        return "bg-yellow-50 text-yellow-700";
      case "error":
        return "bg-red-50 text-red-700";
      default:
        return "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300";
    }
  };

  return (
    <Layout title="Reports & Analytics">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Reports & Analytics Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Comprehensive performance analytics and compliance tracking for{" "}
              {currentDate}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* KPI Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {kpiSummary.punctuality.current}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Punctuality</div>
              <div className="text-xs text-green-600">
                {kpiSummary.punctuality.trend}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {kpiSummary.availability.current}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Availability</div>
              <div className="text-xs text-green-600">
                {kpiSummary.availability.trend}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(kpiSummary.mtbf.current / 1000)}K
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">MTBF (km)</div>
              <div className="text-xs text-green-600">
                {kpiSummary.mtbf.trend}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                ₹{kpiSummary.cost.current}L
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Cost/Day</div>
              <div className="text-xs text-green-600">
                {kpiSummary.cost.trend}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-cyan-600">
                {kpiSummary.efficiency.current}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Efficiency</div>
              <div className="text-xs text-green-600">
                {kpiSummary.efficiency.trend}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {kpiSummary.safety.current}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Safety Score</div>
              <div className="text-xs text-green-600">
                {kpiSummary.safety.trend}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          </TabsList>

          {/* Performance Analytics Tab */}
          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Monthly Performance Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[80, 100]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="punctuality"
                        stroke="#8884d8"
                        name="Punctuality %"
                      />
                      <Line
                        type="monotone"
                        dataKey="availability"
                        stroke="#82ca9d"
                        name="Availability %"
                      />
                      <Line
                        type="monotone"
                        dataKey="efficiency"
                        stroke="#ffc658"
                        name="Efficiency %"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Monthly Cost Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="cost"
                        fill="#8884d8"
                        name="Cost (₹ Lakhs)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Performance Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Operational Excellence
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">On-time Performance</span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">99.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Service Reliability</span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">98.7%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Fleet Availability</span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">96.8%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-gray-900 dark:text-white">Asset Utilization</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Average Daily Distance</span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">245 km</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Energy Efficiency</span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">90.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Capacity Utilization</span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">72%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold text-gray-900 dark:text-white">Safety & Quality</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Safety Incidents</span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Quality Score</span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">96.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Passenger Satisfaction</span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">4.7/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Maintenance Analytics Tab */}
          <TabsContent value="maintenance" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="w-5 h-5" />
                    Maintenance Type Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={maintenanceAnalytics}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="completed"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {maintenanceAnalytics.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Efficiency Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {maintenanceAnalytics.map((item, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold">{item.type}</span>
                          <Badge variant="outline">
                            {item.efficiency}% efficient
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>Completed: {item.completed}</div>
                          <div>Scheduled: {item.scheduled}</div>
                          <div>
                            Cost: ₹{Math.round(item.cost / 100000) / 10}L
                          </div>
                        </div>
                        <Progress
                          value={item.efficiency}
                          className="mt-2 h-2"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Financial Analysis Tab */}
          <TabsContent value="financial" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Monthly Financial Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-sm text-green-800">
                        Total Revenue
                      </div>
                      <div className="text-2xl font-bold text-green-900">
                        ₹8.45 Cr
                      </div>
                      <div className="text-sm text-green-700">
                        +12.3% from last month
                      </div>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg">
                      <div className="text-sm text-red-800">Total Expenses</div>
                      <div className="text-2xl font-bold text-red-900">
                        ₹6.78 Cr
                      </div>
                      <div className="text-sm text-red-700">
                        -5.2% from last month
                      </div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-sm text-blue-800">Net Profit</div>
                      <div className="text-2xl font-bold text-blue-900">
                        ₹1.67 Cr
                      </div>
                      <div className="text-sm text-blue-700">
                        +24.8% from last month
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cost Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Maintenance</span>
                      <span className="font-semibold">₹2.85 Cr (42%)</span>
                    </div>
                    <Progress value={42} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Energy</span>
                      <span className="font-semibold">₹1.89 Cr (28%)</span>
                    </div>
                    <Progress value={28} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Staff</span>
                      <span className="font-semibold">₹1.35 Cr (20%)</span>
                    </div>
                    <Progress value={20} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Other</span>
                      <span className="font-semibold">₹0.69 Cr (10%)</span>
                    </div>
                    <Progress value={10} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>ROI Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-3xl font-bold text-purple-600">
                        24.6%
                      </div>
                      <div className="text-sm text-purple-800">Overall ROI</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">AI System Savings</span>
                        <span className="text-sm font-semibold text-green-600">
                          ₹1.47 Cr
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Efficiency Gains</span>
                        <span className="text-sm font-semibold text-blue-600">
                          ₹0.89 Cr
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Reduced Downtime</span>
                        <span className="text-sm font-semibold text-purple-600">
                          ₹0.67 Cr
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Compliance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Safety Compliance</span>
                        <span className="font-bold text-green-600">
                          {complianceMetrics.safetyCompliance}%
                        </span>
                      </div>
                      <Progress
                        value={complianceMetrics.safetyCompliance}
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">
                          Environmental Compliance
                        </span>
                        <span className="font-bold text-green-600">
                          {complianceMetrics.environmentalCompliance}%
                        </span>
                      </div>
                      <Progress
                        value={complianceMetrics.environmentalCompliance}
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">
                          Regulatory Compliance
                        </span>
                        <span className="font-bold text-green-600">
                          {complianceMetrics.regulatoryCompliance}%
                        </span>
                      </div>
                      <Progress
                        value={complianceMetrics.regulatoryCompliance}
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Quality Standards</span>
                        <span className="font-bold text-yellow-600">
                          {complianceMetrics.qualityStandards}%
                        </span>
                      </div>
                      <Progress
                        value={complianceMetrics.qualityStandards}
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Data Privacy</span>
                        <span className="font-bold text-green-600">
                          {complianceMetrics.dataPrivacy}%
                        </span>
                      </div>
                      <Progress
                        value={complianceMetrics.dataPrivacy}
                        className="h-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regulatory Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-semibold">ISO 9001:2015</div>
                        <div className="text-sm text-gray-600">
                          Quality Management
                        </div>
                      </div>
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-semibold">ISO 14001:2015</div>
                        <div className="text-sm text-gray-600">
                          Environmental Management
                        </div>
                      </div>
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-semibold">ISO 45001:2018</div>
                        <div className="text-sm text-gray-600">
                          Occupational Health & Safety
                        </div>
                      </div>
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div>
                        <div className="font-semibold">
                          Railway Safety Audit
                        </div>
                        <div className="text-sm text-gray-600">
                          Due: Dec 2024
                        </div>
                      </div>
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Audit Trail Tab */}
          <TabsContent value="audit" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  System Audit Trail & Activity Log
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {auditTrail.map((entry, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold">{entry.action}</div>
                          <div className="text-sm text-gray-600">
                            User: {entry.user} • Module: {entry.module}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">
                            {entry.timestamp}
                          </div>
                          <Badge
                            variant="outline"
                            className={getStatusColor(entry.status)}
                          >
                            {entry.status}
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
      </div>
    </Layout>
  );
};

export default Reports;
