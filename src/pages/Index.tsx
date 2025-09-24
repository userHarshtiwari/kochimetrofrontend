import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Train, 
  Brain, 
  TrendingUp, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Target
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const systemOverview = {
    trainsManaged: 25,
    aiAccuracy: 94.7,
    costSavings: 23.5,
    uptime: 99.8
  };

  const recentAchievements = [
    { title: "99.7% Punctuality Achieved", description: "Exceeded monthly target by 0.2%", icon: <Target className="w-5 h-5 text-green-600" /> },
    { title: "₹1.2Cr Cost Reduction", description: "Through AI-optimized scheduling", icon: <TrendingUp className="w-5 h-5 text-blue-600" /> },
    { title: "Zero Safety Incidents", description: "Maintained perfect safety record", icon: <Shield className="w-5 h-5 text-purple-600" /> },
    { title: "25 Trains Fully Integrated", description: "Complete fleet digitization", icon: <Train className="w-5 h-5 text-orange-600" /> }
  ];

  const quickActions = [
    { title: "View Live Dashboard", description: "Real-time fleet monitoring", link: "/dashboard", icon: <TrendingUp className="w-5 h-5" />, color: "bg-blue-600" },
    { title: "Generate Induction Plan", description: "AI-powered scheduling", link: "/induction-plan", icon: <Brain className="w-5 h-5" />, color: "bg-green-600" },
    { title: "Depot Management", description: "Bay allocation & staff", link: "/depot", icon: <Users className="w-5 h-5" />, color: "bg-purple-600" },
    { title: "System Reports", description: "Analytics & compliance", link: "/reports", icon: <CheckCircle className="w-5 h-5" />, color: "bg-orange-600" }
  ];

  const systemStats = [
    { label: "Active Trains", value: "18/25", sublabel: "Currently in service" },
    { label: "AI Predictions", value: "1,247", sublabel: "Made this month" },
    { label: "Maintenance Tasks", value: "156", sublabel: "Completed on time" },
    { label: "System Uptime", value: "99.8%", sublabel: "This month" }
  ];

  return (
    <Layout title="KMRL RAGI System">
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center py-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to KMRL <span className="text-blue-600">RAGI</span> System
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              AI-Powered Real-time Autonomous Guidance Intelligence for optimal train induction planning
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Launch Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/induction-plan">
                <Button variant="outline" size="lg">
                  <Brain className="w-5 h-5 mr-2" />
                  AI Planning
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* System Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <Train className="w-8 h-8 mx-auto text-blue-600 mb-3" />
              <div className="text-3xl font-bold text-gray-900">{systemOverview.trainsManaged}</div>
              <div className="text-sm text-gray-600">Trains Managed</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Brain className="w-8 h-8 mx-auto text-green-600 mb-3" />
              <div className="text-3xl font-bold text-gray-900">{systemOverview.aiAccuracy}%</div>
              <div className="text-sm text-gray-600">AI Accuracy</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <TrendingUp className="w-8 h-8 mx-auto text-purple-600 mb-3" />
              <div className="text-3xl font-bold text-gray-900">{systemOverview.costSavings}%</div>
              <div className="text-sm text-gray-600">Cost Savings</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Shield className="w-8 h-8 mx-auto text-orange-600 mb-3" />
              <div className="text-3xl font-bold text-gray-900">{systemOverview.uptime}%</div>
              <div className="text-sm text-gray-600">System Uptime</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.link}>
                  <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-white mb-3`}>
                      {action.icon}
                    </div>
                    <div className="font-semibold text-gray-900">{action.title}</div>
                    <div className="text-sm text-gray-600">{action.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="mt-1">{achievement.icon}</div>
                    <div>
                      <div className="font-semibold text-gray-900">{achievement.title}</div>
                      <div className="text-sm text-gray-600">{achievement.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Live System Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemStats.map((stat, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-900">{stat.label}</div>
                      <div className="text-sm text-gray-600">{stat.sublabel}</div>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              System Status & Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <CheckCircle className="w-8 h-8 mx-auto text-green-600 mb-2" />
                <div className="font-semibold text-green-800">All Systems Operational</div>
                <div className="text-sm text-green-600">Last updated: Just now</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Brain className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                <div className="font-semibold text-blue-800">AI Model: RAGI v2.3</div>
                <div className="text-sm text-blue-600">Accuracy: 94.7%</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Shield className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                <div className="font-semibold text-purple-800">Security: Active</div>
                <div className="text-sm text-purple-600">All integrations secure</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Index;
