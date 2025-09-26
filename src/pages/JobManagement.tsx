import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobCard from "@/components/JobCard";
import { 
  Search, 
  Filter, 
  Plus, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Wrench,
  Activity,
  FileText,
  Calendar,
  TrendingUp,
  Users
} from "lucide-react";
import { useState, useEffect } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { useBay } from "@/contexts/BayContext";

interface Job {
  id: string;
  trainId: string;
  type: 'maintenance' | 'cleaning' | 'inspection' | 'repair';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  assignedTo: string;
  estimatedDuration: string;
  progress: number;
  startTime: string;
  dueTime: string;
  location: string;
  closedBy?: string;
  closedAt?: string;
}

const JobManagement = () => {
  const { user } = useAuth();
  const { updateBayStatus } = useBay();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Load jobs from localStorage or use default
  const [jobs, setJobs] = useState<Job[]>(() => {
    try {
      const saved = localStorage.getItem('kmrl-jobs');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading jobs from localStorage:', error);
    }
    
    // Default job data
    return [
    {
      id: "JOB-001",
      trainId: "KRISHNA",
      type: "maintenance",
      title: "A-Check Service",
      description: "Complete A-check service including brake inspection, door mechanism check, and HVAC system test.",
      priority: "high",
      status: "in-progress",
      assignedTo: "Team Alpha",
      estimatedDuration: "6 hours",
      progress: 65,
      startTime: "22:00",
      dueTime: "04:00",
      location: "Bay A-01"
    },
    {
      id: "JOB-002",
      trainId: "NILA",
      type: "cleaning",
      title: "Deep Cleaning",
      description: "Complete interior and exterior cleaning including seat sanitization and floor deep clean.",
      priority: "medium",
      status: "pending",
      assignedTo: "Cleaning Team-1",
      estimatedDuration: "3 hours",
      progress: 0,
      startTime: "01:00",
      dueTime: "04:00",
      location: "Bay C-01"
    },
    {
      id: "JOB-003",
      trainId: "VAAYU",
      type: "repair",
      title: "Emergency Brake Repair",
      description: "Urgent brake system repair due to hydraulic leak detected during routine inspection.",
      priority: "critical",
      status: "in-progress",
      assignedTo: "Emergency Team",
      estimatedDuration: "4 hours",
      progress: 30,
      startTime: "20:30",
      dueTime: "00:30",
      location: "Bay B-02"
    },
    {
      id: "JOB-004",
      trainId: "ARUTH",
      type: "inspection",
      title: "Monthly Safety Inspection",
      description: "Comprehensive safety inspection including all safety systems, emergency equipment, and passenger safety features.",
      priority: "high",
      status: "completed",
      assignedTo: "Inspection Team",
      estimatedDuration: "2 hours",
      progress: 100,
      startTime: "18:00",
      dueTime: "20:00",
      location: "Bay A-03",
      closedBy: "Supervisor Rajesh",
      closedAt: "19:45"
    },
    {
      id: "JOB-005",
      trainId: "JHANAVI",
      type: "maintenance",
      title: "HVAC System Service",
      description: "Regular HVAC maintenance including filter replacement, system calibration, and performance testing.",
      priority: "medium",
      status: "pending",
      assignedTo: "HVAC Team",
      estimatedDuration: "2.5 hours",
      progress: 0,
      startTime: "23:00",
      dueTime: "01:30",
      location: "Bay A-04"
    }
    ];
  });

  // Save jobs to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('kmrl-jobs', JSON.stringify(jobs));
    } catch (error) {
      console.error('Error saving jobs to localStorage:', error);
    }
  }, [jobs]);

  const handleCloseJob = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    // Update job status
    setJobs(prevJobs => 
      prevJobs.map(job => 
        job.id === jobId 
          ? { 
              ...job, 
              status: 'completed' as const,
              progress: 100,
              closedBy: user?.username || 'Supervisor',
              closedAt: new Date().toLocaleTimeString()
            }
          : job
      )
    );

    // Update bay status to available
    if (job.location) {
      // Extract bay ID from location (e.g., "Bay A-01" -> "A-01")
      const bayId = job.location.replace('Bay ', '');
      updateBayStatus(bayId, 'available', null);
    }
  };

  const handleViewDetails = (jobId: string) => {
    // Navigate to job details or open modal
    console.log('View details for job:', jobId);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        job.trainId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        job.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    const matchesType = typeFilter === "all" || job.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const jobStats = {
    total: jobs.length,
    pending: jobs.filter(j => j.status === 'pending').length,
    inProgress: jobs.filter(j => j.status === 'in-progress').length,
    completed: jobs.filter(j => j.status === 'completed').length,
    critical: jobs.filter(j => j.priority === 'critical').length
  };

  return (
    <Layout title="Job Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Job Management</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              {user?.role === 'supervisor' 
                ? 'Manage and close job cards for metro maintenance operations'
                : 'Monitor job progress and maintenance operations'
              }
            </p>
          </div>
          {user?.role === 'supervisor' && (
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create New Job
            </Button>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{jobStats.total}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Jobs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{jobStats.pending}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{jobStats.inProgress}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">In Progress</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{jobStats.completed}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{jobStats.critical}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Critical</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
                  <Input
                    placeholder="Search jobs, trains, or assigned teams..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                  <SelectItem value="inspection">Inspection</SelectItem>
                  <SelectItem value="repair">Repair</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Job Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              {...job}
              onClose={user?.role === 'supervisor' ? handleCloseJob : undefined}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-gray-500 dark:text-gray-400">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No jobs found</p>
                <p className="text-sm">Try adjusting your search or filter criteria</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default JobManagement;
