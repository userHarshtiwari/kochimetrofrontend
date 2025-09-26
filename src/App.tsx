import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { BayProvider } from "@/contexts/BayContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TrainDetails from "./pages/TrainDetails";
import DepotView from "./pages/DepotView";
import JobManagement from "./pages/JobManagement";
import InductionPlan from "./pages/InductionPlan";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="metro-fleet-theme">
      <AuthProvider>
        <BayProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/trains" element={
                <ProtectedRoute>
                  <TrainDetails />
                </ProtectedRoute>
              } />
              <Route path="/depot" element={
                <ProtectedRoute>
                  <DepotView />
                </ProtectedRoute>
              } />
              <Route path="/jobs" element={
                <ProtectedRoute requiredRole="supervisor">
                  <JobManagement />
                </ProtectedRoute>
              } />
              <Route path="/induction" element={
                <ProtectedRoute>
                  <InductionPlan />
                </ProtectedRoute>
              } />
              <Route path="/reports" element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute requiredRole="admin">
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
        </BayProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
