import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw, 
  Download,
  Eye,
  Settings,
  TrendingUp,
  Calendar,
  MapPin,
  Wrench,
  Train,
  Zap,
  Target,
  BarChart3
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const InductionPlan = () => {
  const currentTime = new Date();
  const planningWindow = "21:00 - 23:00 IST";
  const nextUpdate = "22:15 IST";

  // AI-generated induction plan data
  const inductionPlan = {
    generatedAt: "21:45 IST",
    confidence: 94.7,
    totalTrains: 25,
    assignments: {
      service: 18,
      standby: 3,
      maintenance: 4
    },
    optimizationScore: 92.3,
    estimatedSavings: 147000
  };

  const serviceTrains = [
    { id: "KRISHNA", confidence: 96.2, healthScore: 94, mileage: 42150, brandingHours: 12, bay: "A1", reason: "Optimal health, branding commitment fulfilled" },
    { id: "NILA", confidence: 94.8, healthScore: 91, mileage: 35200, brandingHours: 8, bay: "A2", reason: "High reliability, balanced mileage" },
    { id: "ARUTH", confidence: 93.1, healthScore: 89, mileage: 39500, brandingHours: 15, bay: "A3", reason: "Good condition, commercial priority" },
    { id: "JHANAVI", confidence: 95.5, healthScore: 93, mileage: 36800, brandingHours: 6, bay: "A4", reason: "Excellent health metrics" },
    { id: "BHAVANI", confidence: 91.7, healthScore: 87, mileage: 41200, brandingHours: 10, bay: "B1", reason: "Adequate condition, route optimization" }
  ];

  const standbyTrains = [
    { id: "TAPTI", confidence: 88.4, healthScore: 85, mileage: 43800, reason: "Scheduled for cleaning, backup ready", bay: "C1" },
    { id: "DHWANIL", confidence: 87.2, healthScore: 82, mileage: 40100, reason: "Minor maintenance completed, reserve capacity", bay: "C2" },
    { id: "YAMUNA", confidence: 89.6, healthScore: 86, mileage: 38900, reason: "Flexibility buffer, optimal positioning", bay: "C3" }
  ];

  const maintenanceTrains = [
    { id: "VAAYU", priority: "High", type: "A-Check Service", duration: "6h", bay: "IBL-1", issue: "15,000 km maintenance due", cost: 85000 },
    { id: "PAMPA", priority: "Critical", type: "Door System Repair", duration: "4h", bay: "IBL-2", issue: "Door mechanism failure", cost: 120000 },
    { id: "MAARUT", priority: "Medium", type: "HVAC Maintenance", duration: "3h", bay: "IBL-3", issue: "Temperature control issues", cost: 45000 },
    { id: "KABANI", priority: "High", type: "Brake Inspection", duration: "5h", bay: "IBL-4", issue: "Brake pad replacement", cost: 75000 }
  ];

  const aiInsights = [
    { metric: "Punctuality Impact", prediction: "+0.3%", confidence: 92 },
    { metric: "Maintenance Cost", prediction: "-12%", confidence: 89 },
    { metric: "Energy Efficiency", prediction: "+5%", confidence: 87 },
    { metric: "Revenue Protection", prediction: "₹2.4L", confidence: 95 }
  ];

  const constraintsSatisfied = [
    { constraint: "Fitness Certificates", status: "satisfied", details: "All service trains have valid certificates" },
    { constraint: "Maintenance Windows", status: "optimized", details: "4 trains scheduled for optimal timing" },
    { constraint: "Bay Capacity", status: "satisfied", details: "No depot capacity conflicts" },
    { constraint: "Branding Commitments", status: "satisfied", details: "All advertiser SLAs maintained" },
    { constraint: "Mileage Balancing", status: "optimized", details: "Variance reduced by 18%" },
    { constraint: "Crew Availability", status: "satisfied", details: "Night shift capacity adequate" }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
      <Layout title="Induction Plan">

      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI-Powered Induction Planning</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Intelligent train deployment optimization for {currentTime.toLocaleDateString()}
            </p>
            <div className="flex items-center gap-4 mt-2">
              <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20">
                <Brain className="w-4 h-4 mr-2" />
                AI Model: RAGI v2.3
              </Badge>
              <Badge variant="outline">
                <Clock className="w-4 h-4 mr-2" />
                Generated: {inductionPlan.generatedAt}
              </Badge>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Simulation Mode
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Regenerate Plan
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve & Deploy
            </Button>
          </div>
        </div>

        {/* AI Confidence & Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600">{inductionPlan.confidence}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">AI Confidence</div>
              <Progress value={inductionPlan.confidence} className="mt-2 h-2" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600">{inductionPlan.optimizationScore}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Optimization Score</div>
              <Progress value={inductionPlan.optimizationScore} className="mt-2 h-2" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600">₹{Math.round(inductionPlan.estimatedSavings/1000)}K</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Est. Daily Savings</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600">{inductionPlan.totalTrains}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Fleet</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="plan" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="plan">Induction Plan</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="constraints">Constraints</TabsTrigger>
            <TabsTrigger value="simulation">What-If</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Induction Plan Tab */}
          <TabsContent value="plan" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Service Trains */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <Train className="w-5 h-5" />
                    Service Deployment ({serviceTrains.length + 13})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {serviceTrains.map((train) => (
                      <div key={train.id} className="p-3 border rounded-lg bg-green-50 dark:bg-green-900/20">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-semibold">{train.id}</div>
                          <Badge variant="outline" className="bg-white dark:bg-gray-800">
                            {train.confidence}% confident
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">{train.reason}</div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>Health: {train.healthScore}%</div>
                          <div>Bay: {train.bay}</div>
                          <div>Mileage: {train.mileage.toLocaleString()}</div>
                          <div>Brand: {train.brandingHours}h</div>
                        </div>
                      </div>
                    ))}
                    <div className="text-center text-sm text-gray-600 dark:text-gray-300 py-2">
                      + 13 additional trains assigned to service
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Standby Trains */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <Clock className="w-5 h-5" />
                    Standby Reserve ({standbyTrains.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {standbyTrains.map((train) => (
                      <div key={train.id} className="p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-semibold">{train.id}</div>
                          <Badge variant="outline" className="bg-white dark:bg-gray-800">
                            {train.confidence}% confident
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">{train.reason}</div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>Health: {train.healthScore}%</div>
                          <div>Bay: {train.bay}</div>
                          <div>Mileage: {train.mileage.toLocaleString()}</div>
                          <div>Ready: 30min</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Maintenance Trains */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-600">
                    <Wrench className="w-5 h-5" />
                    Maintenance Queue ({maintenanceTrains.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {maintenanceTrains.map((train) => (
                      <div key={train.id} className="p-3 border rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-semibold">{train.id}</div>
                          <Badge variant={train.priority === 'Critical' ? 'destructive' : 'default'}>
                            {train.priority}
                          </Badge>
                        </div>
                        <div className="text-sm font-medium mb-1">{train.type}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">{train.issue}</div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>Duration: {train.duration}</div>
                          <div>Bay: {train.bay}</div>
                          <div>Cost: ₹{train.cost.toLocaleString()}</div>
                          <div>Start: 22:00</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="insights" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    AI Predictions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {aiInsights.map((insight, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <div className="font-semibold">{insight.metric}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">{insight.confidence}% confidence</div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${insight.prediction.includes('+') ? 'text-green-600' : 'text-blue-600'}`}>
                            {insight.prediction}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Fleet Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Service', value: inductionPlan.assignments.service },
                          { name: 'Standby', value: inductionPlan.assignments.standby },
                          { name: 'Maintenance', value: inductionPlan.assignments.maintenance }
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[0, 1, 2].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Constraints Tab */}
          <TabsContent value="constraints" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Constraint Satisfaction Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {constraintsSatisfied.map((constraint, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className={`w-3 h-3 rounded-full mt-1 ${
                        constraint.status === 'satisfied' ? 'bg-green-500' :
                        constraint.status === 'optimized' ? 'bg-blue-500' :
                        'bg-yellow-500'
                      }`}></div>
                      <div className="flex-1">
                        <div className="font-semibold">{constraint.constraint}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{constraint.details}</div>
                      </div>
                      <Badge variant={
                        constraint.status === 'satisfied' ? 'default' :
                        constraint.status === 'optimized' ? 'secondary' :
                        'outline'
                      }>
                        {constraint.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* What-If Simulation Tab */}
          <TabsContent value="simulation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Interactive Scenario Planning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Zap className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">What-If Simulation Engine</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Interactive scenario planning and optimization sandbox coming soon.
                  </p>
                  <Button variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure Simulation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Historical Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Historical Analysis Dashboard</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Track induction plan performance, accuracy metrics, and continuous improvement.
                  </p>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Historical Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default InductionPlan;
