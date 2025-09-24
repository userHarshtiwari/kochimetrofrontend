import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Settings as SettingsIcon, 
  Users, 
  Database, 
  Bell, 
  Shield,
  Brain,
  Zap,
  Key,
  Globe,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Sliders
} from "lucide-react";

const Settings = () => {
  const systemConfig = {
    aiModel: "RAGI v2.3",
    confidenceThreshold: 85,
    planningWindow: "21:00-23:00",
    dataRefreshInterval: 15,
    maxTrainsPerBay: 1,
    emergencyOverride: true,
    autoApproval: false,
    backupRetention: 30
  };

  const userRoles = [
    { id: 1, name: "Rajesh Kumar", role: "Supervisor", department: "Operations", status: "active", lastLogin: "2024-09-24 21:45" },
    { id: 2, name: "Suresh Nair", role: "Maintenance Head", department: "Rolling Stock", status: "active", lastLogin: "2024-09-24 20:30" },
    { id: 3, name: "Anil Jose", role: "Technician", department: "Signalling", status: "active", lastLogin: "2024-09-24 19:15" },
    { id: 4, name: "Priya Menon", role: "Analyst", department: "Planning", status: "inactive", lastLogin: "2024-09-22 16:20" },
    { id: 5, name: "Ravi Krishnan", role: "Admin", department: "IT", status: "active", lastLogin: "2024-09-24 22:10" }
  ];

  const integrations = [
    { name: "IBM Maximo", status: "connected", lastSync: "2024-09-24 21:45", health: "good" },
    { name: "WhatsApp Business API", status: "connected", lastSync: "2024-09-24 21:44", health: "good" },
    { name: "IoT Sensors", status: "partial", lastSync: "2024-09-24 21:40", health: "warning" },
    { name: "Depot CCTV", status: "connected", lastSync: "2024-09-24 21:43", health: "good" },
    { name: "Employee Portal", status: "disconnected", lastSync: "2024-09-23 18:30", health: "error" }
  ];

  const alertSettings = [
    { type: "Critical System Failure", enabled: true, channels: ["SMS", "Email", "WhatsApp"], threshold: "Immediate" },
    { type: "Maintenance Overdue", enabled: true, channels: ["Email", "Dashboard"], threshold: "24 hours" },
    { type: "Low Confidence Prediction", enabled: false, channels: ["Dashboard"], threshold: "Below 80%" },
    { type: "Manual Override Used", enabled: true, channels: ["Email"], threshold: "Immediate" },
    { type: "Budget Threshold Exceeded", enabled: true, channels: ["SMS", "Email"], threshold: "90% of budget" }
  ];

  const mlModelSettings = {
    currentVersion: "RAGI v2.3",
    lastTrained: "2024-09-20 14:30",
    accuracy: 94.7,
    predictionLatency: 12,
    dataPoints: 156789,
    retrainingSchedule: "Weekly"
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': case 'active': case 'good': return 'bg-green-100 text-green-800';
      case 'partial': case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'disconnected': case 'inactive': case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
      <Layout title="System Settings">

      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">System Configuration & Settings</h1>
            <p className="text-gray-600 mt-1">
              Manage user access, integrations, and system-wide configurations
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Sync All
            </Button>
            <Button variant="outline" size="sm">
              <Database className="w-4 h-4 mr-2" />
              Backup
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="system" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="users">Users & Roles</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="alerts">Notifications</TabsTrigger>
            <TabsTrigger value="ai">AI Model</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* System Configuration Tab */}
          <TabsContent value="system" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SettingsIcon className="w-5 h-5" />
                    Core System Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="planning-window">Planning Window</Label>
                      <Input id="planning-window" value={systemConfig.planningWindow} />
                    </div>
                    <div>
                      <Label htmlFor="confidence-threshold">AI Confidence Threshold (%)</Label>
                      <Input id="confidence-threshold" type="number" value={systemConfig.confidenceThreshold} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="refresh-interval">Data Refresh Interval (min)</Label>
                      <Input id="refresh-interval" type="number" value={systemConfig.dataRefreshInterval} />
                    </div>
                    <div>
                      <Label htmlFor="backup-retention">Backup Retention (days)</Label>
                      <Input id="backup-retention" type="number" value={systemConfig.backupRetention} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Emergency Override</Label>
                        <p className="text-sm text-gray-600">Allow manual override in emergency situations</p>
                      </div>
                      <Switch checked={systemConfig.emergencyOverride} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Auto-approval</Label>
                        <p className="text-sm text-gray-600">Automatically approve high-confidence plans</p>
                      </div>
                      <Switch checked={systemConfig.autoApproval} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Performance Targets
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="punctuality-target">Punctuality Target (%)</Label>
                    <Input id="punctuality-target" type="number" value="99.5" />
                  </div>
                  
                  <div>
                    <Label htmlFor="availability-target">Fleet Availability Target (%)</Label>
                    <Input id="availability-target" type="number" value="95.0" />
                  </div>
                  
                  <div>
                    <Label htmlFor="cost-target">Daily Cost Target (₹ Lakhs)</Label>
                    <Input id="cost-target" type="number" value="28.0" />
                  </div>
                  
                  <div>
                    <Label htmlFor="efficiency-target">Energy Efficiency Target (%)</Label>
                    <Input id="efficiency-target" type="number" value="88.0" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users & Roles Tab */}
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    User Management
                  </div>
                  <Button size="sm">
                    <Users className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userRoles.map((user) => (
                    <div key={user.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold">{user.name}</div>
                          <div className="text-sm text-gray-600">{user.role} • {user.department}</div>
                          <div className="text-xs text-gray-500">Last login: {user.lastLogin}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  External System Integrations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {integrations.map((integration, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold">{integration.name}</div>
                          <div className="text-sm text-gray-600">Last sync: {integration.lastSync}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getStatusColor(integration.health)}>
                            {integration.health}
                          </Badge>
                          <Badge variant="outline" className={getStatusColor(integration.status)}>
                            {integration.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            {integration.status === 'connected' ? 'Configure' : 'Connect'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Alert & Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alertSettings.map((alert, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-semibold">{alert.type}</div>
                          <div className="text-sm text-gray-600">Threshold: {alert.threshold}</div>
                        </div>
                        <Switch checked={alert.enabled} />
                      </div>
                      <div className="flex gap-2">
                        {alert.channels.map((channel, idx) => (
                          <Badge key={idx} variant="outline" className="bg-blue-50">
                            {channel}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Model Tab */}
          <TabsContent value="ai" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    ML Model Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Current Model</span>
                      <Badge variant="outline" className="bg-white">{mlModelSettings.currentVersion}</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      Last trained: {mlModelSettings.lastTrained}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded">
                      <div className="text-2xl font-bold text-green-600">{mlModelSettings.accuracy}%</div>
                      <div className="text-sm text-gray-600">Accuracy</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded">
                      <div className="text-2xl font-bold text-blue-600">{mlModelSettings.predictionLatency}s</div>
                      <div className="text-sm text-gray-600">Latency</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="retraining-schedule">Retraining Schedule</Label>
                      <Select value={mlModelSettings.retrainingSchedule}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sliders className="w-5 h-5" />
                    Model Parameters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="ensemble-weights">Ensemble Model Weights</Label>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Gradient Boosting</span>
                        <Input className="w-20" type="number" value="35" />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Random Forest</span>
                        <Input className="w-20" type="number" value="25" />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">LSTM</span>
                        <Input className="w-20" type="number" value="20" />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Transformer</span>
                        <Input className="w-20" type="number" value="20" />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Retrain Model
                    </Button>
                    <Button variant="outline" size="sm">
                      <Database className="w-4 h-4 mr-2" />
                      Export Model
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-600">Require 2FA for all admin users</p>
                    </div>
                    <Switch checked={true} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Session Timeout</Label>
                      <p className="text-sm text-gray-600">Auto-logout after inactivity</p>
                    </div>
                    <Select value="30">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Data Encryption</Label>
                      <p className="text-sm text-gray-600">Encrypt sensitive data at rest</p>
                    </div>
                    <Switch checked={true} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Audit Logging</Label>
                      <p className="text-sm text-gray-600">Log all user actions</p>
                    </div>
                    <Switch checked={true} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    API Keys & Access Tokens
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="font-semibold">Maximo API Key</div>
                    <div className="text-sm text-gray-600 font-mono">mk_prod_••••••••••••4521</div>
                    <div className="text-xs text-green-600 mt-1">Active • Expires: Dec 2024</div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="font-semibold">WhatsApp Business Token</div>
                    <div className="text-sm text-gray-600 font-mono">wa_••••••••••••7892</div>
                    <div className="text-xs text-green-600 mt-1">Active • No expiration</div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="font-semibold">IoT Platform Key</div>
                    <div className="text-sm text-gray-600 font-mono">iot_••••••••••••1234</div>
                    <div className="text-xs text-yellow-600 mt-1">Limited • Partial access</div>
                  </div>

                  <Button variant="outline" size="sm">
                    <Key className="w-4 h-4 mr-2" />
                    Generate New Token
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
