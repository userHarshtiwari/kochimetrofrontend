import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Home, ArrowLeft, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const suggestedPages = [
    { title: "Operations Dashboard", link: "/dashboard", description: "Real-time fleet monitoring and control center" },
    { title: "AI Induction Planning", link: "/induction-plan", description: "Smart train deployment optimization" },
    { title: "Train Fleet Details", link: "/trains/KMRL-01", description: "Individual train management and analytics" },
    { title: "Depot Management", link: "/depot", description: "Bay allocation and facility operations" },
    { title: "System Reports", link: "/reports", description: "Performance analytics and compliance tracking" },
    { title: "System Settings", link: "/settings", description: "Configuration and user management" }
  ];

  return (
    <Layout title="Page Not Found">
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-4">
          {/* 404 Icon and Message */}
          <div className="mb-8">
            <AlertTriangle className="w-24 h-24 mx-auto text-yellow-500 mb-6" />
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
            <p className="text-gray-600 mb-8">
              The page you're looking for doesn't exist in the KMRL RAGI system.
              <br />
              It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              onClick={() => navigate(-1)}
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </Button>
            <Link to="/">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                <Home className="w-5 h-5" />
                Home Dashboard
              </Button>
            </Link>
          </div>

          {/* Suggested Pages */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Search className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold">Suggested Pages</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {suggestedPages.map((page, index) => (
                  <Link key={index} to={page.link}>
                    <div className="p-4 border rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left">
                      <div className="font-semibold text-gray-900 mb-1">{page.title}</div>
                      <div className="text-sm text-gray-600">{page.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <div className="mt-8 text-sm text-gray-500">
            <p>KMRL RAGI System • All services operational • v2.3</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
