import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Clock, 
  User, 
  Wrench, 
  AlertTriangle,
  FileText,
  Calendar,
  MapPin,
  Activity
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface JobCardProps {
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
  onClose?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

const JobCard = ({
  id,
  trainId,
  type,
  title,
  description,
  priority,
  status,
  assignedTo,
  estimatedDuration,
  progress,
  startTime,
  dueTime,
  location,
  onClose,
  onViewDetails
}: JobCardProps) => {
  const { user } = useAuth();
  const isSupervisor = user?.role === 'supervisor';

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'maintenance': return <Wrench className="w-4 h-4" />;
      case 'cleaning': return <Activity className="w-4 h-4" />;
      case 'inspection': return <FileText className="w-4 h-4" />;
      case 'repair': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const canClose = isSupervisor && status !== 'completed' && status !== 'cancelled';

  return (
    <Card className={`transition-all hover:shadow-md ${
      status === 'completed' ? 'opacity-75' : ''
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getTypeIcon(type)}
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={`text-xs ${getStatusColor(status)}`}>
              {status.replace('-', ' ')}
            </Badge>
            <div className={`w-3 h-3 rounded-full ${getPriorityColor(priority)}`}></div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Train and Location Info */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 dark:text-gray-300">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{trainId}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-semibold">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Assignment and Timing */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300 mb-1">
              <User className="w-4 h-4" />
              <span>Assigned to</span>
            </div>
            <span className="font-medium">{assignedTo}</span>
          </div>
          <div>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300 mb-1">
              <Clock className="w-4 h-4" />
              <span>Duration</span>
            </div>
            <span className="font-medium">{estimatedDuration}</span>
          </div>
        </div>

        {/* Timing Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300 mb-1">
              <Calendar className="w-4 h-4" />
              <span>Started</span>
            </div>
            <span className="font-medium">{startTime}</span>
          </div>
          <div>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300 mb-1">
              <Calendar className="w-4 h-4" />
              <span>Due</span>
            </div>
            <span className="font-medium">{dueTime}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails?.(id)}
            className="flex-1"
          >
            <FileText className="w-4 h-4 mr-2" />
            View Details
          </Button>
          
          {canClose && (
            <Button
              variant="default"
              size="sm"
              onClick={() => onClose?.(id)}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Close Job
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
