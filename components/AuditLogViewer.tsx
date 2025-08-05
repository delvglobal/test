import React, { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { 
  Search,
  Filter,
  Calendar,
  ChevronDown,
  ChevronRight,
  Download,
  RefreshCw,
  AlertCircle,
  Shield,
  User,
  Settings,
  Database,
  FileText,
  Eye,
  Activity,
  Clock,
  Globe,
  Monitor,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  ExternalLink,
  Copy,
  Users,
  GitBranch,
  Star,
  Calendar as CalendarIcon,
  Building,
  UserCheck,
  UserX,
  ArrowRight,
  MessageSquare,
  Send,
  FileSpreadsheet,
  Briefcase,
  Target,
  Layers
} from 'lucide-react';
import { cn } from './ui/utils';
import type { AuditLogEntry, AuditEventType, AuditLogFilters } from '../types';

interface AuditLogViewerProps {
  onNavigateToScreen?: (screen: any) => void;
  onOpenModal?: (modal: any) => void;
}

// Updated mock audit log data for hiring marketplace
const mockAuditLogs: AuditLogEntry[] = [
  {
    id: '1',
    timestamp: '2024-01-15T10:30:00Z',
    adminEmail: 'recruiter@delv.global',
    eventType: 'candidate_created',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    details: 'Added new Frontend Developer candidate',
    metadata: { 
      candidateId: 'cand_456', 
      name: 'Sarah Chen', 
      skills: ['React', 'TypeScript', 'Node.js'],
      location: 'San Francisco, CA',
      experience: '5+ years'
    },
    target: 'Sarah Chen',
    success: true
  },
  {
    id: '2',
    timestamp: '2024-01-15T10:25:00Z',
    adminEmail: 'admin@delv.global',
    eventType: 'candidate_status_change',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    details: 'Moved candidate to Interview stage',
    metadata: { 
      candidateId: 'cand_123', 
      name: 'John Doe',
      fromStatus: 'Application Review',
      toStatus: 'Technical Interview',
      pipelineId: 'pipe_789'
    },
    target: 'John Doe',
    success: true
  },
  {
    id: '3',
    timestamp: '2024-01-15T09:45:00Z',
    adminEmail: 'manager@delv.global',
    eventType: 'interview_scheduled',
    ipAddress: '10.0.0.50',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    details: 'Scheduled technical interview',
    metadata: { 
      candidateId: 'cand_123',
      interviewerId: 'int_456',
      interviewerName: 'Alex Rodriguez',
      scheduledDate: '2024-01-20T14:00:00Z',
      type: 'Technical Interview',
      duration: 60
    },
    target: 'John Doe',
    success: true
  },
  {
    id: '4',
    timestamp: '2024-01-15T09:30:00Z',
    adminEmail: 'recruiter@delv.global',
    eventType: 'shortlist_created',
    ipAddress: '172.16.0.25',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    details: 'Created shortlist for Frontend Developer role',
    metadata: { 
      shortlistId: 'short_789',
      name: 'Frontend Developers Q1 2024',
      candidateCount: 8,
      role: 'Frontend Developer',
      clientId: 'client_123'
    },
    target: 'Frontend Developers Q1 2024',
    success: true
  },
  {
    id: '5',
    timestamp: '2024-01-15T08:15:00Z',
    adminEmail: 'hacker@malicious.com',
    eventType: 'login',
    ipAddress: '203.0.113.42',
    userAgent: 'curl/7.68.0',
    details: 'Failed login attempt - suspicious activity detected',
    metadata: { 
      attempts: 3, 
      blocked: true, 
      reason: 'suspicious_activity',
      location: 'Unknown'
    },
    success: false
  },
  {
    id: '6',
    timestamp: '2024-01-14T16:20:00Z',
    adminEmail: 'admin@delv.global',
    eventType: 'pipeline_created',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    details: 'Created new hiring pipeline',
    metadata: { 
      pipelineId: 'pipe_789', 
      name: 'Senior Backend Engineer 2024',
      stages: ['Application Review', 'Phone Screen', 'Technical Interview', 'Final Interview', 'Offer'],
      clientId: 'client_456'
    },
    target: 'Senior Backend Engineer 2024',
    success: true
  },
  {
    id: '7',
    timestamp: '2024-01-14T15:10:00Z',
    adminEmail: 'recruiter@delv.global',
    eventType: 'candidate_export',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    details: 'Exported candidate data for client report',
    metadata: { 
      exportType: 'candidate_profiles',
      format: 'csv',
      recordCount: 45,
      clientId: 'client_123',
      filters: { skills: ['React', 'Python'], location: 'Remote', experience: '3+ years' }
    },
    success: true
  },
  {
    id: '8',
    timestamp: '2024-01-14T14:30:00Z',
    adminEmail: 'manager@delv.global',
    eventType: 'client_communication',
    ipAddress: '10.0.0.50',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    details: 'Sent weekly progress report to client',
    metadata: { 
      clientId: 'client_123',
      clientName: 'TechCorp Inc.',
      communicationType: 'progress_report',
      candidatesPresented: 12,
      interviewsScheduled: 5
    },
    target: 'TechCorp Inc.',
    success: true
  }
];

// Updated event types for hiring marketplace
const eventTypeOptions: { value: AuditEventType; label: string; icon: React.ComponentType<{ className?: string }>; category: string }[] = [
  { value: 'login', label: 'System Login', icon: User, category: 'Authentication' },
  { value: 'logout', label: 'System Logout', icon: User, category: 'Authentication' },
  { value: 'password_change', label: 'Password Changed', icon: Shield, category: 'Security' },
  
  { value: 'candidate_created', label: 'Candidate Added', icon: UserCheck, category: 'Candidate Management' },
  { value: 'candidate_updated', label: 'Candidate Updated', icon: User, category: 'Candidate Management' },
  { value: 'candidate_deleted', label: 'Candidate Removed', icon: UserX, category: 'Candidate Management' },
  { value: 'candidate_status_change', label: 'Candidate Status Changed', icon: ArrowRight, category: 'Candidate Management' },
  
  { value: 'interview_scheduled', label: 'Interview Scheduled', icon: CalendarIcon, category: 'Interview Management' },
  { value: 'interview_completed', label: 'Interview Completed', icon: CheckCircle, category: 'Interview Management' },
  { value: 'interview_cancelled', label: 'Interview Cancelled', icon: XCircle, category: 'Interview Management' },
  
  { value: 'pipeline_created', label: 'Pipeline Created', icon: GitBranch, category: 'Pipeline Operations' },
  { value: 'pipeline_updated', label: 'Pipeline Modified', icon: GitBranch, category: 'Pipeline Operations' },
  { value: 'pipeline_deleted', label: 'Pipeline Deleted', icon: GitBranch, category: 'Pipeline Operations' },
  
  { value: 'shortlist_created', label: 'Shortlist Created', icon: Star, category: 'Shortlist Management' },
  { value: 'shortlist_updated', label: 'Shortlist Modified', icon: Star, category: 'Shortlist Management' },
  { value: 'shortlist_shared', label: 'Shortlist Shared', icon: Send, category: 'Shortlist Management' },
  
  { value: 'client_communication', label: 'Client Communication', icon: MessageSquare, category: 'Client Relations' },
  { value: 'client_onboarded', label: 'Client Onboarded', icon: Building, category: 'Client Relations' },
  { value: 'client_requirements_updated', label: 'Requirements Updated', icon: FileText, category: 'Client Relations' },
  
  { value: 'candidate_export', label: 'Candidate Data Export', icon: FileSpreadsheet, category: 'Data Operations' },
  { value: 'bulk_import', label: 'Bulk Data Import', icon: Database, category: 'Data Operations' },
  { value: 'report_generated', label: 'Report Generated', icon: TrendingUp, category: 'Data Operations' },
  
  { value: 'user_created', label: 'Team Member Added', icon: Users, category: 'Team Management' },
  { value: 'user_updated', label: 'Team Member Updated', icon: Users, category: 'Team Management' },
  { value: 'permission_changed', label: 'Permissions Changed', icon: Shield, category: 'Team Management' },
  
  { value: 'settings_updated', label: 'Platform Settings', icon: Settings, category: 'System Configuration' },
  { value: 'system_config', label: 'System Configuration', icon: Settings, category: 'System Configuration' }
];

// Updated admin users for hiring context
const adminUsers = [
  'admin@delv.global',
  'recruiter@delv.global', 
  'manager@delv.global',
  'coordinator@delv.global'
];

// Group event types by category
const eventTypesByCategory = eventTypeOptions.reduce((acc, option) => {
  if (!acc[option.category]) {
    acc[option.category] = [];
  }
  acc[option.category].push(option);
  return acc;
}, {} as Record<string, typeof eventTypeOptions>);

export function AuditLogViewer({ onNavigateToScreen, onOpenModal }: AuditLogViewerProps) {
  const [filters, setFilters] = useState<AuditLogFilters>({
    eventTypes: [],
    adminUsers: [],
    searchTerm: ''
  });
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');

  // Updated quick filter presets for hiring operations
  const quickFilters = [
    { 
      id: 'candidate-activities', 
      label: 'Candidate Activities', 
      icon: UserCheck, 
      filters: { eventTypes: ['candidate_created', 'candidate_updated', 'candidate_status_change'] }, 
      color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' 
    },
    { 
      id: 'interviews', 
      label: 'Interview Events', 
      icon: CalendarIcon, 
      filters: { eventTypes: ['interview_scheduled', 'interview_completed', 'interview_cancelled'] }, 
      color: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' 
    },
    { 
      id: 'client-interactions', 
      label: 'Client Relations', 
      icon: Building, 
      filters: { eventTypes: ['client_communication', 'client_onboarded', 'shortlist_shared'] }, 
      color: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' 
    },
    { 
      id: 'security-alerts', 
      label: 'Security Alerts', 
      icon: Shield, 
      filters: { eventTypes: ['login'], success: false }, 
      color: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100' 
    }
  ];

  // Filter and search logic
  const filteredLogs = useMemo(() => {
    return mockAuditLogs.filter(log => {
      // Event type filter
      if (filters.eventTypes.length > 0 && !filters.eventTypes.includes(log.eventType)) {
        return false;
      }
      
      // Admin user filter
      if (filters.adminUsers.length > 0 && !filters.adminUsers.includes(log.adminEmail)) {
        return false;
      }
      
      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        return (
          log.adminEmail.toLowerCase().includes(searchLower) ||
          log.eventType.toLowerCase().includes(searchLower) ||
          log.details.toLowerCase().includes(searchLower) ||
          log.ipAddress.includes(searchLower) ||
          (log.target && log.target.toLowerCase().includes(searchLower)) ||
          JSON.stringify(log.metadata).toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    });
  }, [filters]);

  // Updated summary stats for hiring operations
  const summaryStats = useMemo(() => {
    const candidateActivities = filteredLogs.filter(log => 
      ['candidate_created', 'candidate_updated', 'candidate_status_change'].includes(log.eventType)
    ).length;
    
    const interviewEvents = filteredLogs.filter(log => 
      ['interview_scheduled', 'interview_completed', 'interview_cancelled'].includes(log.eventType)
    ).length;
    
    const clientInteractions = filteredLogs.filter(log => 
      ['client_communication', 'shortlist_shared', 'client_onboarded'].includes(log.eventType)
    ).length;
    
    const securityAlerts = filteredLogs.filter(log => !log.success).length;
    
    return { 
      total: filteredLogs.length, 
      candidateActivities, 
      interviewEvents, 
      clientInteractions, 
      securityAlerts 
    };
  }, [filteredLogs]);

  // Pagination logic
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleRowExpansion = (logId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(logId)) {
      newExpanded.delete(logId);
    } else {
      newExpanded.add(logId);
    }
    setExpandedRows(newExpanded);
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getEventIcon = (eventType: AuditEventType) => {
    const option = eventTypeOptions.find(opt => opt.value === eventType);
    return option?.icon || Activity;
  };

  const getEventColor = (eventType: AuditEventType, success: boolean) => {
    if (!success) return 'bg-red-50 text-red-700 border-red-200';
    
    // Color coding based on hiring operations
    if (['candidate_created', 'candidate_updated', 'candidate_status_change'].includes(eventType)) {
      return 'bg-blue-50 text-blue-700 border-blue-200';
    }
    if (['interview_scheduled', 'interview_completed'].includes(eventType)) {
      return 'bg-green-50 text-green-700 border-green-200';
    }
    if (['client_communication', 'shortlist_shared', 'client_onboarded'].includes(eventType)) {
      return 'bg-purple-50 text-purple-700 border-purple-200';
    }
    if (['pipeline_created', 'shortlist_created'].includes(eventType)) {
      return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    }
    if (['candidate_export', 'report_generated'].includes(eventType)) {
      return 'bg-orange-50 text-orange-700 border-orange-200';
    }
    
    return 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const clearFilters = () => {
    setFilters({
      eventTypes: [],
      adminUsers: [],
      searchTerm: ''
    });
    setCurrentPage(1);
  };

  const applyQuickFilter = (quickFilter: any) => {
    setFilters(prev => ({
      ...prev,
      ...quickFilter.filters
    }));
  };

  const exportLogs = () => {
    console.log('Exporting logs...', filteredLogs);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Modern Header Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <span>Security</span>
              <ChevronRight className="h-4 w-4" />
              <span>Compliance</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-gray-900 font-medium">Activity Audit</span>
            </div>

            {/* Header Content */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-[#2E5E47] rounded-xl">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl text-gray-900 mb-1">Hiring Activity Monitor</h1>
                    <p className="text-gray-600">Track all recruitment activities and compliance events across the platform</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button 
                  className="bg-[#2E5E47] hover:bg-[#2E5E47]/90"
                  size="sm"
                  onClick={exportLogs}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Audit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Updated Stats Grid for Hiring Operations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Candidate Activities</p>
                <p className="text-2xl font-bold text-gray-900">{summaryStats.candidateActivities}</p>
                <p className="text-xs text-blue-600 mt-1">+23% this week</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Interview Events</p>
                <p className="text-2xl font-bold text-gray-900">{summaryStats.interviewEvents}</p>
                <p className="text-xs text-green-600 mt-1">+15% this week</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CalendarIcon className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Client Interactions</p>
                <p className="text-2xl font-bold text-gray-900">{summaryStats.clientInteractions}</p>
                <p className="text-xs text-purple-600 mt-1">+8% this week</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Building className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Security Alerts</p>
                <p className="text-2xl font-bold text-gray-900">{summaryStats.securityAlerts}</p>
                <p className="text-xs text-red-600 mt-1">{summaryStats.securityAlerts > 0 ? 'Needs attention' : 'All clear'}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="p-6">
            {/* Search and Quick Filters Row */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search candidates, activities, clients..."
                    value={filters.searchTerm || ''}
                    onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                    className="pl-10 h-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto">
                {quickFilters.map(filter => (
                  <Button
                    key={filter.id}
                    variant="outline"
                    size="sm"
                    onClick={() => applyQuickFilter(filter)}
                    className={cn("whitespace-nowrap border transition-colors", filter.color)}
                  >
                    <filter.icon className="h-4 w-4 mr-2" />
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Advanced Filters Toggle */}
            <div className="border-t border-gray-200 pt-4">
              <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-between hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Advanced Filtering Options
                      {(filters.eventTypes.length > 0 || filters.adminUsers.length > 0 || filters.searchTerm) && (
                        <Badge variant="secondary" className="ml-2">
                          {filters.eventTypes.length + filters.adminUsers.length + (filters.searchTerm ? 1 : 0)} active
                        </Badge>
                      )}
                    </div>
                    <ChevronDown className={cn("h-4 w-4 transition-transform", filtersOpen && "rotate-180")} />
                  </Button>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="mt-4">
                  <div className="grid gap-6">
                    {/* Time Range and Team Member Filter */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Time Period</Label>
                        <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                          <SelectTrigger className="h-9 bg-gray-50 border-gray-200">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1h">Last Hour</SelectItem>
                            <SelectItem value="24h">Last 24 Hours</SelectItem>
                            <SelectItem value="7d">Last 7 Days</SelectItem>
                            <SelectItem value="30d">Last 30 Days</SelectItem>
                            <SelectItem value="custom">Custom Range</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Team Member</Label>
                        <Select 
                          value={filters.adminUsers[0] || 'all'} 
                          onValueChange={(value) => {
                            setFilters(prev => ({ 
                              ...prev, 
                              adminUsers: value === 'all' ? [] : [value] 
                            }));
                          }}
                        >
                          <SelectTrigger className="h-9 bg-gray-50 border-gray-200">
                            <SelectValue placeholder="All team members" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All team members</SelectItem>
                            {adminUsers.map(user => (
                              <SelectItem key={user} value={user}>
                                {user.replace('@delv.global', '').replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Event Types by Category */}
                    <div className="space-y-4">
                      <Label className="text-sm font-medium text-gray-700">Activity Types</Label>
                      <div className="grid gap-4">
                        {Object.entries(eventTypesByCategory).map(([category, events]) => (
                          <div key={category} className="bg-gray-50 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                              <Layers className="h-4 w-4" />
                              {category}
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                              {events.map(option => (
                                <div key={option.value} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={option.value}
                                    checked={filters.eventTypes.includes(option.value)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setFilters(prev => ({
                                          ...prev,
                                          eventTypes: [...prev.eventTypes, option.value]
                                        }));
                                      } else {
                                        setFilters(prev => ({
                                          ...prev,
                                          eventTypes: prev.eventTypes.filter(t => t !== option.value)
                                        }));
                                      }
                                    }}
                                  />
                                  <label 
                                    htmlFor={option.value} 
                                    className="text-sm cursor-pointer flex items-center gap-1"
                                  >
                                    <option.icon className="h-3 w-3" />
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Filter Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <Button onClick={clearFilters} variant="outline" size="sm">
                        Clear All Filters
                      </Button>
                      <div className="text-sm text-gray-600">
                        {filteredLogs.length} of {mockAuditLogs.length} activities match your filters
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>

        {/* Enhanced Results Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900">Activity Timeline</h2>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Showing {paginatedLogs.length} of {filteredLogs.length} activities</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {paginatedLogs.length === 0 ? (
              <div className="text-center py-16">
                <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4">
                  <Activity className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No activities found</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-4">
                  No hiring activities match your current filters. Try adjusting your search criteria or time range.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="w-4 pl-6"></TableHead>
                    <TableHead className="font-medium text-gray-700">Time</TableHead>
                    <TableHead className="font-medium text-gray-700">Activity</TableHead>
                    <TableHead className="font-medium text-gray-700">Team Member</TableHead>
                    <TableHead className="font-medium text-gray-700">Target</TableHead>
                    <TableHead className="font-medium text-gray-700">Status</TableHead>
                    <TableHead className="font-medium text-gray-700">Details</TableHead>
                    <TableHead className="w-4 pr-6"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedLogs.map((log) => {
                    const EventIcon = getEventIcon(log.eventType);
                    const isExpanded = expandedRows.has(log.id);
                    
                    return (
                      <React.Fragment key={log.id}>
                        <TableRow className="hover:bg-gray-50 group transition-colors">
                          <TableCell className="pl-6">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleRowExpansion(log.id)}
                              className="p-1 hover:bg-gray-200"
                            >
                              {isExpanded ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>
                          </TableCell>
                          
                          <TableCell className="font-mono text-sm">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span>{formatTimestamp(log.timestamp)}</span>
                            </div>
                          </TableCell>
                          
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={cn("gap-1 font-medium", getEventColor(log.eventType, log.success))}
                            >
                              <EventIcon className="h-3 w-3" />
                              {eventTypeOptions.find(opt => opt.value === log.eventType)?.label || log.eventType}
                            </Badge>
                          </TableCell>
                          
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-[#2E5E47] rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-white" />
                              </div>
                              <div>
                                <div className="font-medium text-sm">
                                  {log.adminEmail.replace('@delv.global', '').replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </div>
                                <div className="text-xs text-gray-500">{log.adminEmail}</div>
                              </div>
                            </div>
                          </TableCell>
                          
                          <TableCell>
                            {log.target && (
                              <div className="flex items-center gap-2">
                                <Target className="h-4 w-4 text-gray-400" />
                                <span className="text-sm font-medium">{log.target}</span>
                              </div>
                            )}
                          </TableCell>
                          
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {log.success ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-500" />
                              )}
                              <span className={cn(
                                "text-sm font-medium",
                                log.success ? "text-green-700" : "text-red-700"
                              )}>
                                {log.success ? "Success" : "Failed"}
                              </span>
                            </div>
                          </TableCell>
                          
                          <TableCell className="max-w-sm">
                            <span className="text-sm text-gray-700 line-clamp-1">{log.details}</span>
                          </TableCell>
                          
                          <TableCell className="pr-6">
                            <Button variant="ghost" size="sm" className="p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                        
                        {/* Enhanced Expanded Row Content */}
                        {isExpanded && (
                          <TableRow>
                            <TableCell colSpan={8} className="bg-gray-50 border-t p-6">
                              <div className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                  <div className="space-y-4">
                                    <h4 className="font-medium text-gray-900 flex items-center gap-2">
                                      <FileText className="h-4 w-4" />
                                      Activity Details
                                    </h4>
                                    <div className="bg-white rounded-lg p-4 space-y-3 text-sm">
                                      <div className="flex justify-between py-2 border-b border-gray-200">
                                        <span className="text-gray-600">Activity ID:</span>
                                        <span className="font-mono font-medium">{log.id}</span>
                                      </div>
                                      <div className="flex justify-between py-2 border-b border-gray-200">
                                        <span className="text-gray-600">Timestamp:</span>
                                        <span className="font-mono">{new Date(log.timestamp).toLocaleString()}</span>
                                      </div>
                                      <div className="flex justify-between py-2 border-b border-gray-200">
                                        <span className="text-gray-600">IP Address:</span>
                                        <span className="font-mono">{log.ipAddress}</span>
                                      </div>
                                      <div className="flex justify-between py-2 border-b border-gray-200">
                                        <span className="text-gray-600">User Agent:</span>
                                        <span className="font-mono text-xs max-w-xs truncate">{log.userAgent}</span>
                                      </div>
                                      {log.target && (
                                        <div className="flex justify-between py-2">
                                          <span className="text-gray-600">Target Resource:</span>
                                          <span className="font-medium">{log.target}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-4">
                                    <h4 className="font-medium text-gray-900 flex items-center gap-2">
                                      <Database className="h-4 w-4" />
                                      Context & Metadata
                                    </h4>
                                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs font-mono overflow-x-auto">
                                      <pre className="whitespace-pre-wrap">{JSON.stringify(log.metadata, null, 2)}</pre>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                                  <Button variant="outline" size="sm">
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    View Full Details
                                  </Button>
                                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(JSON.stringify(log, null, 2))}>
                                    <Copy className="h-4 w-4 mr-2" />
                                    Copy Data
                                  </Button>
                                  {log.target && ['candidate_created', 'candidate_updated'].includes(log.eventType) && (
                                    <Button variant="outline" size="sm" onClick={() => onNavigateToScreen?.('candidates')}>
                                      <User className="h-4 w-4 mr-2" />
                                      View Candidate
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </div>
        </div>

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <p className="text-sm text-gray-600">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredLogs.length)} of {filteredLogs.length} activities
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  First
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="px-3 py-1 text-sm bg-gray-100 rounded font-medium">
                  {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  Last
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}