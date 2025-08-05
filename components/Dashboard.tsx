import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Checkbox } from './ui/checkbox';
import { 
  Users, 
  CheckCircle, 
  Clock, 
  ChevronRight,
  Calendar,
  Target,
  AlertCircle,
  Activity,
  Database,
  RefreshCw,
  BookmarkCheck,
  GitBranch,
  BarChart3,
  Plus,
  X
} from 'lucide-react';
import { TaskModal } from './modals/TaskModal';
import { toast } from 'sonner@2.0.3';
import type { ScreenType, ModalType } from '../types';

interface DashboardProps {
  onNavigateToScreen: (screen: ScreenType) => void;
  onOpenModal: (modal: ModalType) => void;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  completed: boolean;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  category: 'interview' | 'follow_up' | 'review' | 'client' | 'admin' | 'other';
  createdAt: string;
}

// Streamlined metrics - only 3 essential KPIs
const essentialMetrics = {
  totalCandidates: 1247,
  newThisWeek: 23,
  urgentTasks: 6
};

// Enhanced My Tasks data with full task structure
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Review shortlist for Backend Engineer',
    description: 'Review and approve candidates for the senior backend engineer position at TechCorp Solutions',
    dueDate: 'Today, 2:00 PM',
    completed: false,
    priority: 'urgent',
    category: 'review',
    createdAt: '2024-01-15T08:00:00Z'
  },
  {
    id: '2',
    title: 'Interview follow-up with Sarah Chen',
    description: 'Follow up on technical interview feedback and next steps',
    dueDate: 'Today, 4:30 PM',
    completed: false,
    priority: 'high',
    category: 'follow_up',
    createdAt: '2024-01-15T09:30:00Z'
  },
  {
    id: '3',
    title: 'Client check-in: TechCorp Solutions',
    description: 'Weekly check-in call to discuss pipeline status and requirements',
    dueDate: 'Tomorrow, 10:00 AM',
    completed: false,
    priority: 'medium',
    category: 'client',
    createdAt: '2024-01-14T15:00:00Z'
  },
  {
    id: '4',
    title: 'Update pipeline status for 5 candidates',
    description: 'Update status in the system for candidates who completed interviews this week',
    dueDate: 'Tomorrow, 3:00 PM',
    completed: true,
    priority: 'low',
    category: 'admin',
    createdAt: '2024-01-14T10:00:00Z'
  },
  {
    id: '5',
    title: 'Prepare Q1 placement report',
    description: 'Compile placement statistics and KPIs for quarterly review',
    dueDate: 'Friday, 11:00 AM',
    completed: false,
    priority: 'medium',
    category: 'admin',
    createdAt: '2024-01-13T14:00:00Z'
  },
  {
    id: '6',
    title: 'Schedule interviews for Frontend Developer role',
    description: 'Coordinate with hiring manager and candidates for next week interviews',
    dueDate: 'Wednesday, 2:00 PM',
    completed: true,
    priority: 'high',
    category: 'interview',
    createdAt: '2024-01-12T11:00:00Z'
  }
];

// Simplified recent activities
const recentActivities = [
  {
    id: '1',
    type: 'candidate_sync',
    candidate: 'Sarah Chen',
    action: 'Profile synced from database',
    time: '2 hours ago',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b120?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    type: 'interview_scheduled',
    candidate: 'Marcus Johnson',
    action: 'Interview scheduled with TechCorp',
    time: '4 hours ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    type: 'placement_success',
    candidate: 'Emily Rodriguez',
    action: 'Successfully placed at GreenEnergy',
    time: '6 hours ago',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '4',
    type: 'candidate_sync',
    candidate: 'David Kim',
    action: 'New profile synced',
    time: '1 day ago',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  }
];

export function Dashboard({ onNavigateToScreen, onOpenModal }: DashboardProps) {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'create_shortlist':
        onNavigateToScreen('shortlists');
        break;
      case 'view_pipeline':
        onNavigateToScreen('pipeline');
        break;
      case 'generate_report':
        onNavigateToScreen('reports');
        break;
      case 'sync_candidates':
        toast.success('Candidate sync initiated...');
        break;
      default:
        break;
    }
  };

  const handleTaskToggle = (taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    toast.success('Task removed successfully');
  };

  const handleAddTask = () => {
    setShowTaskModal(true);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'candidate_sync':
        return <Database className="h-4 w-4 text-blue-600" />;
      case 'interview_scheduled':
        return <Calendar className="h-4 w-4 text-green-600" />;
      case 'placement_success':
        return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPriorityBadge = (priority: string, completed: boolean = false) => {
    const baseClasses = "px-2 py-0.5 text-xs font-medium rounded-full border";
    
    if (completed) {
      return (
        <Badge variant="outline" className="px-2 py-0.5 text-xs bg-gray-50 text-gray-500 border-gray-200">
          {priority}
        </Badge>
      );
    }

    switch (priority) {
      case 'urgent':
        return (
          <Badge className="px-2 py-0.5 text-xs bg-red-50 text-red-700 border-red-200 hover:bg-red-100">
            Urgent
          </Badge>
        );
      case 'high':
        return (
          <Badge className="px-2 py-0.5 text-xs bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100">
            High
          </Badge>
        );
      case 'medium':
        return (
          <Badge className="px-2 py-0.5 text-xs bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100">
            Medium
          </Badge>
        );
      case 'low':
        return (
          <Badge className="px-2 py-0.5 text-xs bg-green-50 text-green-700 border-green-200 hover:bg-green-100">
            Low
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="px-2 py-0.5 text-xs">
            {priority}
          </Badge>
        );
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const visibleTasks = tasks.slice(0, 5); // Show only first 5 tasks
  const urgentTaskCount = tasks.filter(task => !task.completed && task.priority === 'urgent').length;

  return (
    <div className="space-y-6">
      {/* Header with System Status */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Your hiring operations overview</p>
        </div>
        
        {/* Single Line System Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-600">DB Sync</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">5 min ago</span>
          </div>
          <Button 
            onClick={() => handleQuickAction('sync_candidates')}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Sync
          </Button>
        </div>
      </div>

      {/* Essential KPI Cards - Only 3 with updated urgent tasks count */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onNavigateToScreen('candidates')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Candidates</p>
                <p className="text-2xl font-semibold text-gray-900">{essentialMetrics.totalCandidates}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">New This Week</p>
                <p className="text-2xl font-semibold text-green-600">+{essentialMetrics.newThisWeek}</p>
              </div>
              <Database className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setShowTaskModal(true)}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Urgent Tasks</p>
                <p className="text-2xl font-semibold text-red-600">{urgentTaskCount}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* My Tasks and Recent Activity - Side by Side 50%-50% */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Tasks Section - Left 50% */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#2E5E47]" />
              <CardTitle>My Tasks</CardTitle>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {completedTasks}/{totalTasks}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleAddTask}
                className="text-sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Task
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowTaskModal(true)}
                className="text-sm"
              >
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {visibleTasks.length > 0 ? (
              <div className="space-y-3">
                {visibleTasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-all duration-200 group">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <Checkbox
                        id={task.id}
                        checked={task.completed}
                        onCheckedChange={() => handleTaskToggle(task.id)}
                        className="h-4 w-4 mt-0.5 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <label 
                            htmlFor={task.id}
                            className={`font-medium cursor-pointer flex-1 min-w-0 ${
                              task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                            }`}
                          >
                            {task.title}
                          </label>
                          {getPriorityBadge(task.priority, task.completed)}
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500">{task.dueDate}</p>
                          {task.completed && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleTaskDelete(task.id)}
                              className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {tasks.length > 5 && (
                  <div className="text-center pt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowTaskModal(true)}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      View {tasks.length - 5} more tasks
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              /* Empty State Variant */
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No tasks at the moment</p>
                <p className="text-gray-400 text-xs">Click "Add Task" to create your first task</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity Section - Right 50% */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-[#2E5E47]" />
              Recent Activity
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => onOpenModal('recent-activity')}>
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-all duration-200">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src={activity.avatar} alt={activity.candidate} />
                    <AvatarFallback>
                      {activity.candidate.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {getActivityIcon(activity.type)}
                      <p className="font-medium text-gray-900 truncate">{activity.candidate}</p>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{activity.action}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions - 3 Button Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-[#2E5E47]" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 min-h-[44px]"
              onClick={() => handleQuickAction('create_shortlist')}
            >
              <BookmarkCheck className="h-6 w-6 text-[#2E5E47]" />
              <span className="text-sm font-medium">Create Shortlist</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 min-h-[44px]"
              onClick={() => handleQuickAction('view_pipeline')}
            >
              <GitBranch className="h-6 w-6 text-[#2E5E47]" />
              <span className="text-sm font-medium">View Pipeline</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 min-h-[44px]"
              onClick={() => handleQuickAction('generate_report')}
            >
              <BarChart3 className="h-6 w-6 text-[#2E5E47]" />
              <span className="text-sm font-medium">Generate Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <TaskModal
        open={showTaskModal}
        onOpenChange={setShowTaskModal}
        tasks={tasks}
        onTaskUpdate={setTasks}
      />
    </div>
  );
}