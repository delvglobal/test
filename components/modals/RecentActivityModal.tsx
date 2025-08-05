import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';
import { 
  Database, 
  Calendar, 
  CheckCircle, 
  Activity,
  FileText,
  TrendingUp,
  Clock,
  RefreshCw,
  GitBranch,
  Settings
} from 'lucide-react';

interface RecentActivityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ActivityItem {
  id: string;
  type: 'candidate_sync' | 'interview_scheduled' | 'placement_success' | 'shortlist_created' | 'shortlist_updated' | 'pipeline_created' | 'pipeline_update' | 'settings_updated' | 'dashboard_viewed';
  title: string;
  candidate?: string;
  description: string;
  time: string;
  timestamp: Date;
  avatar?: string;
  priority: 'urgent' | 'high' | 'medium' | 'low' | 'success';
  category: 'candidates' | 'pipeline' | 'shortlists' | 'settings' | 'dashboard';
}

// Recent activities - last 20 activities focused on current core features
const recentActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'candidate_sync',
    title: 'Sarah Chen',
    description: 'Profile synced from database with updated portfolio',
    time: '2h ago',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b120?w=150&h=150&fit=crop&crop=face',
    priority: 'medium',
    category: 'candidates'
  },
  {
    id: '2',
    type: 'interview_scheduled',
    title: 'Marcus Johnson',
    description: 'Technical interview scheduled for senior backend position',
    time: '4h ago',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    priority: 'high',
    category: 'pipeline'
  },
  {
    id: '3',
    type: 'placement_success',
    title: 'Emily Rodriguez',
    description: 'Successfully placed as Lead Developer',
    time: '6h ago',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    priority: 'success',
    category: 'pipeline'
  },
  {
    id: '4',
    type: 'shortlist_created',
    title: 'Frontend Specialists Shortlist',
    description: 'New shortlist created with 8 qualified candidates',
    time: '8h ago',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    priority: 'medium',
    category: 'shortlists'
  },
  {
    id: '5',
    type: 'candidate_sync',
    title: 'David Kim',
    description: 'Profile updated with new certifications',
    time: '1d ago',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    priority: 'medium',
    category: 'candidates'
  },
  {
    id: '6',
    type: 'pipeline_created',
    title: 'DevOps Engineering Pipeline',
    description: 'New recruitment pipeline created for cloud infrastructure roles',
    time: '1d ago',
    timestamp: new Date(Date.now() - 28 * 60 * 60 * 1000),
    priority: 'high',
    category: 'pipeline'
  },
  {
    id: '7',
    type: 'pipeline_update',
    title: 'Backend Development Pipeline',
    description: '3 candidates moved to final interview stage',
    time: '2d ago',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    priority: 'medium',
    category: 'pipeline'
  },
  {
    id: '8',
    type: 'shortlist_updated',
    title: 'Mobile Developers Shortlist',
    description: '2 new candidates added to existing shortlist',
    time: '2d ago',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    priority: 'medium',
    category: 'shortlists'
  },
  {
    id: '9',
    type: 'settings_updated',
    title: 'Organization Settings',
    description: 'Updated pipeline automation preferences',
    time: '3d ago',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    priority: 'low',
    category: 'settings'
  },
  {
    id: '10',
    type: 'interview_scheduled',
    title: 'Anna Wilson',
    description: 'Final round interview scheduled for senior developer role',
    time: '3d ago',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    avatar: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=150&h=150&fit=crop&crop=face',
    priority: 'high',
    category: 'pipeline'
  },
  {
    id: '11',
    type: 'candidate_sync',
    title: 'Michael Torres',
    description: 'New certifications added to profile',
    time: '4d ago',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    priority: 'medium',
    category: 'candidates'
  },
  {
    id: '12',
    type: 'placement_success',
    title: 'Lisa Park',
    description: 'Successfully placed as Senior Data Analyst',
    time: '4d ago',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    priority: 'success',
    category: 'pipeline'
  },
  {
    id: '13',
    type: 'shortlist_created',
    title: 'Cloud Engineers Shortlist',
    description: 'Urgent shortlist created for cloud infrastructure positions',
    time: '5d ago',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    priority: 'urgent',
    category: 'shortlists'
  },
  {
    id: '14',
    type: 'dashboard_viewed',
    title: 'Analytics Dashboard',
    description: 'KPI metrics reviewed for Q4 performance',
    time: '5d ago',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    priority: 'low',
    category: 'dashboard'
  },
  {
    id: '15',
    type: 'interview_scheduled',
    title: 'James Mitchell',
    description: 'Panel interview scheduled for technical lead position',
    time: '6d ago',
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    priority: 'high',
    category: 'pipeline'
  },
  {
    id: '16',
    type: 'candidate_sync',
    title: 'Rachel Green',
    description: 'Mobile development expertise added to profile',
    time: '1w ago',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop&crop=face',
    priority: 'medium',
    category: 'candidates'
  },
  {
    id: '17',
    type: 'pipeline_update',
    title: 'Mobile Development Pipeline',
    description: '2 candidates advanced to technical assessment stage',
    time: '1w ago',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    priority: 'medium',
    category: 'pipeline'
  },
  {
    id: '18',
    type: 'shortlist_updated',
    title: 'Full-Stack Developers Shortlist',
    description: '3 candidates added after skills assessment',
    time: '1w ago',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    priority: 'medium',
    category: 'shortlists'
  },
  {
    id: '19',
    type: 'settings_updated',
    title: 'Profile Settings',
    description: 'Updated notification preferences and security settings',
    time: '1w ago',
    timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    priority: 'low',
    category: 'settings'
  },
  {
    id: '20',
    type: 'placement_success',
    title: 'Kevin Wong',
    description: 'Successfully placed as ML Engineer',
    time: '1w ago',
    timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face',
    priority: 'success',
    category: 'pipeline'
  }
].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

export function RecentActivityModal({ open, onOpenChange }: RecentActivityModalProps) {
  const getActivityIcon = (type: string) => {
    const iconClasses = "h-4 w-4 flex-shrink-0";
    
    switch (type) {
      case 'candidate_sync':
        return <Database className={`${iconClasses} text-gray-500`} />;
      case 'interview_scheduled':
        return <Calendar className={`${iconClasses} text-gray-500`} />;
      case 'placement_success':
        return <CheckCircle className={`${iconClasses} text-gray-500`} />;
      case 'shortlist_created':
      case 'shortlist_updated':
        return <FileText className={`${iconClasses} text-gray-500`} />;
      case 'pipeline_created':
      case 'pipeline_update':
        return <GitBranch className={`${iconClasses} text-gray-500`} />;
      case 'settings_updated':
        return <Settings className={`${iconClasses} text-gray-500`} />;
      case 'dashboard_viewed':
        return <TrendingUp className={`${iconClasses} text-gray-500`} />;
      default:
        return <Activity className={`${iconClasses} text-gray-500`} />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#2E5E47] rounded-lg">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl text-gray-900">Recent Activity</DialogTitle>
                <DialogDescription className="text-sm text-gray-600">
                  Last 20 platform activities
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Activity List */}
        <div className="flex-1 px-6 pb-6">
          <ScrollArea className="h-[500px]">
            <div className="space-y-3 pt-4">
              {recentActivities.map((activity) => (
                <div 
                  key={activity.id} 
                  className="flex items-start gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  {/* Avatar/Icon */}
                  <div className="flex-shrink-0">
                    {activity.avatar ? (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={activity.avatar} alt={activity.title} />
                        <AvatarFallback className="bg-[#2E5E47] text-white text-xs">
                          {activity.title.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                        {getActivityIcon(activity.type)}
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900 truncate">{activity.title}</h4>
                        {activity.candidate && (
                          <span className="text-xs text-gray-500">• {activity.candidate}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-400 flex-shrink-0">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}