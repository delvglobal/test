import React, { useState, useEffect, useCallback } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { LoadingButton } from '../ui/loading-button';
import { Separator } from '../ui/separator';
import { Alert, AlertDescription } from '../ui/alert';
import { ScrollArea } from '../ui/scroll-area';
import { Progress } from '../ui/progress';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { 
  Shield,
  Eye,
  Lock,
  Monitor,
  Database,
  History,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  User,
  Download,
  Settings,
  Save,
  Trash2,
  LogOut,
  RefreshCw,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SecurityPrivacyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Simplified mock data
const currentUser = {
  id: 1,
  name: 'Alexandra Morgan',
  email: 'alex.morgan@found24.com',
  role: 'Admin',
  securityScore: 85,
  mfaEnabled: true
};

const activeSessions = [
  { 
    id: 1, 
    device: 'MacBook Pro', 
    browser: 'Chrome', 
    location: 'San Francisco, CA', 
    lastActive: '2 minutes ago',
    current: true,
    trusted: true,
    riskScore: 'low'
  },
  { 
    id: 2, 
    device: 'iPhone 15 Pro', 
    browser: 'Safari', 
    location: 'San Francisco, CA', 
    lastActive: '1 hour ago',
    current: false,
    trusted: true,
    riskScore: 'low'
  },
  { 
    id: 3, 
    device: 'Unknown Device', 
    browser: 'Firefox', 
    location: 'Unknown', 
    lastActive: '2 days ago',
    current: false,
    trusted: false,
    riskScore: 'high'
  },
  { 
    id: 4, 
    device: 'iPad Air', 
    browser: 'Safari', 
    location: 'San Francisco, CA', 
    lastActive: '3 hours ago',
    current: false,
    trusted: true,
    riskScore: 'low'
  },
  { 
    id: 5, 
    device: 'Android Phone', 
    browser: 'Chrome', 
    location: 'Los Angeles, CA', 
    lastActive: '1 day ago',
    current: false,
    trusted: true,
    riskScore: 'low'
  }
];

const securityEvents = [
  { 
    id: 1, 
    type: 'login', 
    description: 'Successful login from MacBook Pro', 
    timestamp: '2024-01-15T14:30:00Z', 
    severity: 'success'
  },
  { 
    id: 2, 
    type: 'password_change', 
    description: 'Password updated successfully', 
    timestamp: '2024-01-14T09:15:00Z', 
    severity: 'info'
  },
  { 
    id: 3, 
    type: 'suspicious_login', 
    description: 'Login attempt blocked from unknown location', 
    timestamp: '2024-01-12T22:30:00Z', 
    severity: 'warning',
    blocked: true
  },
  { 
    id: 4, 
    type: 'mfa_enabled', 
    description: 'Two-factor authentication enabled', 
    timestamp: '2024-01-11T15:20:00Z', 
    severity: 'success'
  },
  { 
    id: 5, 
    type: 'session_timeout', 
    description: 'Session automatically terminated due to inactivity', 
    timestamp: '2024-01-10T18:45:00Z', 
    severity: 'info'
  },
  { 
    id: 6, 
    type: 'failed_login', 
    description: 'Multiple failed login attempts detected', 
    timestamp: '2024-01-09T11:30:00Z', 
    severity: 'warning'
  }
];

const dataAccessLogs = [
  { id: 1, resource: 'Candidate Database', action: 'View Profile', details: 'Viewed John Smith profile', timestamp: '2024-01-15T14:25:00Z' },
  { id: 2, resource: 'Interview Scheduler', action: 'Create Event', details: 'Scheduled interview with Sarah Johnson', timestamp: '2024-01-15T13:45:00Z' },
  { id: 3, resource: 'Analytics Dashboard', action: 'Generate Report', details: 'Monthly hiring metrics report', timestamp: '2024-01-15T10:30:00Z' },
  { id: 4, resource: 'Team Management', action: 'Update Role', details: 'Changed role permissions', timestamp: '2024-01-14T16:15:00Z' },
  { id: 5, resource: 'Security Settings', action: 'Modify Config', details: 'Updated security preferences', timestamp: '2024-01-14T09:20:00Z' },
  { id: 6, resource: 'User Profile', action: 'Update Info', details: 'Changed contact information', timestamp: '2024-01-13T15:30:00Z' },
  { id: 7, resource: 'Candidate Database', action: 'Export Data', details: 'Exported candidate list to CSV', timestamp: '2024-01-13T11:10:00Z' },
  { id: 8, resource: 'Pipeline Management', action: 'Update Status', details: 'Moved candidate to next stage', timestamp: '2024-01-12T14:55:00Z' },
  { id: 9, resource: 'Interview Notes', action: 'Create Entry', details: 'Added interview feedback', timestamp: '2024-01-12T09:30:00Z' },
  { id: 10, resource: 'System Configuration', action: 'View Settings', details: 'Accessed system configuration panel', timestamp: '2024-01-11T16:20:00Z' }
];

export function SecurityPrivacyModal({ open, onOpenChange }: SecurityPrivacyModalProps) {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isMobile, setIsMobile] = useState(false);
  
  const [securitySettings, setSecuritySettings] = useState({
    mfaEnabled: true,
    loginNotifications: true,
    sessionTimeout: '8h',
    riskBasedAuth: true,
    geoBlocking: false,
    bruteForceProtection: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'team',
    activityTracking: true,
    analyticsOptIn: true,
    locationTracking: false,
    cookiePreferences: 'essential'
  });

  const [dataSettings, setDataSettings] = useState({
    dataRetention: '7-years',
    personalDataMinimization: true,
    anonymizeReports: true
  });

  // Check screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getSecurityScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSecurityScoreLevel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Fair';
    return 'Needs Improvement';
  };

  const handleSave = async (section: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`${section} settings saved`);
    } catch (error) {
      toast.error(`Failed to save ${section.toLowerCase()} settings`);
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeSession = (sessionId: number) => {
    toast.success('Session ended successfully');
  };

  const filteredEvents = securityEvents.filter(event => {
    const matchesSearch = event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || event.severity === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[98vw] h-[98vh] p-0 gap-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-gray-600" />
              <div>
                <DialogTitle className="text-lg">Security & Privacy</DialogTitle>
                <DialogDescription className="text-sm text-gray-600">
                  Manage your security settings and privacy preferences.
                </DialogDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 flex flex-col min-h-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
            {/* Horizontal Scrollable Tabs */}
            <div className="px-6 py-2 border-b shrink-0">
              <ScrollArea className="w-full" orientation="horizontal">
                <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg min-w-max">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'security', label: 'Security' },
                    { id: 'privacy', label: 'Privacy' },
                    { id: 'sessions', label: 'Sessions' },
                    { id: 'data', label: 'Data' },
                    { id: 'audit', label: 'Audit' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Enhanced Scrollable Content Area */}
            <div className="flex-1 min-h-0">
              <ScrollArea className="h-full w-full">
                <div className="p-6 min-w-0">
                  {/* Overview Tab with Enhanced Scrolling */}
                  <TabsContent value="overview" className="mt-0">
                    <div className="space-y-6">
                      {/* Horizontal Scrollable Grid */}
                      <ScrollArea className="w-full" orientation="horizontal">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-w-max md:min-w-0">
                          {/* Security Score */}
                          <Card className="border border-gray-200 rounded-lg min-w-[280px]">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-base flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                Security Score
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ScrollArea className="h-48">
                                <div className="text-center space-y-3 pr-3">
                                  <div className={`text-3xl font-bold ${getSecurityScoreColor(currentUser.securityScore)}`}>
                                    {currentUser.securityScore}
                                  </div>
                                  <Progress value={currentUser.securityScore} className="h-2" />
                                  <div className="text-sm text-gray-600">{getSecurityScoreLevel(currentUser.securityScore)}</div>
                                  <div className="mt-4 space-y-2 text-xs text-gray-500">
                                    <div>Last updated: 2 hours ago</div>
                                    <div>Next check: Tomorrow</div>
                                  </div>
                                </div>
                              </ScrollArea>
                            </CardContent>
                          </Card>

                          {/* Activity Summary */}
                          <Card className="border border-gray-200 rounded-lg min-w-[280px]">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-base">Activity Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ScrollArea className="h-48">
                                <div className="space-y-3 pr-3">
                                  <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Active Sessions</span>
                                    <span className="font-medium">{activeSessions.length}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Security Events</span>
                                    <span className="font-medium">{securityEvents.length}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Data Access Logs</span>
                                    <span className="font-medium">{dataAccessLogs.length}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Data Exports</span>
                                    <span className="font-medium">3</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Last Login</span>
                                    <span className="font-medium text-sm">2 hours ago</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Failed Attempts</span>
                                    <span className="font-medium text-red-600">0</span>
                                  </div>
                                </div>
                              </ScrollArea>
                            </CardContent>
                          </Card>

                          {/* Recent Activity */}
                          <Card className="border border-gray-200 rounded-lg min-w-[280px]">
                            <CardHeader className="pb-3">
                              <CardTitle className="text-base">Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ScrollArea className="h-48">
                                <div className="space-y-3 pr-3">
                                  {securityEvents.slice(0, 5).map((event) => (
                                    <div key={event.id} className="flex items-center gap-2 text-sm">
                                      {event.severity === 'success' && <CheckCircle className="h-3 w-3 text-green-500 shrink-0" />}
                                      {event.severity === 'warning' && <AlertTriangle className="h-3 w-3 text-yellow-500 shrink-0" />}
                                      {event.severity === 'info' && <Info className="h-3 w-3 text-blue-500 shrink-0" />}
                                      <span className="text-gray-600 text-xs leading-tight">{event.description}</span>
                                    </div>
                                  ))}
                                </div>
                              </ScrollArea>
                            </CardContent>
                          </Card>
                        </div>
                      </ScrollArea>
                    </div>
                  </TabsContent>

                  {/* Security Tab with Enhanced Scrolling */}
                  <TabsContent value="security" className="mt-0">
                    <div className="space-y-6">
                      {/* Horizontal Scrollable Grid */}
                      <ScrollArea className="w-full" orientation="horizontal">
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 min-w-max xl:min-w-0">
                          {/* Authentication */}
                          <Card className="border border-gray-200 rounded-lg min-w-[400px]">
                            <CardHeader>
                              <CardTitle className="text-base flex items-center gap-2">
                                <Lock className="h-4 w-4" />
                                Authentication
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ScrollArea className="h-96">
                                <div className="space-y-4 pr-3">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <Label className="text-sm font-medium">Two-Factor Authentication</Label>
                                      <p className="text-sm text-gray-600">Secure your account with 2FA</p>
                                    </div>
                                    <Switch
                                      checked={securitySettings.mfaEnabled}
                                      onCheckedChange={(checked) => 
                                        setSecuritySettings(prev => ({ ...prev, mfaEnabled: checked }))
                                      }
                                    />
                                  </div>
                                  
                                  <Separator />
                                  
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <Label className="text-sm font-medium">Login Notifications</Label>
                                      <p className="text-sm text-gray-600">Get notified of new logins</p>
                                    </div>
                                    <Switch
                                      checked={securitySettings.loginNotifications}
                                      onCheckedChange={(checked) => 
                                        setSecuritySettings(prev => ({ ...prev, loginNotifications: checked }))
                                      }
                                    />
                                  </div>
                                  
                                  <Separator />
                                  
                                  <div className="space-y-2">
                                    <Label className="text-sm font-medium">Session Timeout</Label>
                                    <Select 
                                      value={securitySettings.sessionTimeout}
                                      onValueChange={(value) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: value }))}
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="15m">15 minutes</SelectItem>
                                        <SelectItem value="30m">30 minutes</SelectItem>
                                        <SelectItem value="1h">1 hour</SelectItem>
                                        <SelectItem value="4h">4 hours</SelectItem>
                                        <SelectItem value="8h">8 hours</SelectItem>
                                        <SelectItem value="24h">24 hours</SelectItem>
                                        <SelectItem value="never">Never timeout</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <Separator />

                                  <div className="space-y-2">
                                    <Label className="text-sm font-medium">Backup Codes</Label>
                                    <p className="text-sm text-gray-600">Generate backup codes for emergency access</p>
                                    <Button variant="outline" size="sm" className="w-full">
                                      Generate New Codes
                                    </Button>
                                  </div>
                                </div>
                              </ScrollArea>
                            </CardContent>
                          </Card>

                          {/* Advanced Security */}
                          <Card className="border border-gray-200 rounded-lg min-w-[400px]">
                            <CardHeader>
                              <CardTitle className="text-base flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                Advanced Security
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ScrollArea className="h-96">
                                <div className="space-y-4 pr-3">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <Label className="text-sm font-medium">Risk-Based Authentication</Label>
                                      <p className="text-sm text-gray-600">Enhanced security for suspicious activity</p>
                                    </div>
                                    <Switch
                                      checked={securitySettings.riskBasedAuth}
                                      onCheckedChange={(checked) => 
                                        setSecuritySettings(prev => ({ ...prev, riskBasedAuth: checked }))
                                      }
                                    />
                                  </div>
                                  
                                  <Separator />
                                  
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <Label className="text-sm font-medium">Geographic Blocking</Label>
                                      <p className="text-sm text-gray-600">Block logins from unexpected locations</p>
                                    </div>
                                    <Switch
                                      checked={securitySettings.geoBlocking}
                                      onCheckedChange={(checked) => 
                                        setSecuritySettings(prev => ({ ...prev, geoBlocking: checked }))
                                      }
                                    />
                                  </div>
                                  
                                  <Separator />
                                  
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <Label className="text-sm font-medium">Brute Force Protection</Label>
                                      <p className="text-sm text-gray-600">Automatically block failed attempts</p>
                                    </div>
                                    <Switch
                                      checked={securitySettings.bruteForceProtection}
                                      onCheckedChange={(checked) => 
                                        setSecuritySettings(prev => ({ ...prev, bruteForceProtection: checked }))
                                      }
                                    />
                                  </div>

                                  <Separator />

                                  <div className="space-y-2">
                                    <Label className="text-sm font-medium">Allowed Login Locations</Label>
                                    <p className="text-sm text-gray-600">Manage trusted locations for login</p>
                                    <div className="space-y-2">
                                      <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded">
                                        • San Francisco, CA, USA
                                      </div>
                                      <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded">
                                        • Los Angeles, CA, USA
                                      </div>
                                    </div>
                                    <Button variant="outline" size="sm" className="w-full">
                                      Add Current Location
                                    </Button>
                                  </div>
                                </div>
                              </ScrollArea>
                            </CardContent>
                          </Card>
                        </div>
                      </ScrollArea>

                      <div className="flex justify-end">
                        <LoadingButton 
                          onClick={() => handleSave('Security')}
                          loading={loading}
                          className="bg-[#2E5E47] hover:bg-[#2E5E47]/90"
                        >
                          Save Changes
                        </LoadingButton>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Privacy Tab with Enhanced Scrolling */}
                  <TabsContent value="privacy" className="mt-0">
                    <div className="space-y-6">
                      <ScrollArea className="w-full" orientation="horizontal">
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 min-w-max xl:min-w-0">
                          {/* Profile Privacy */}
                          <Card className="border border-gray-200 rounded-lg min-w-[400px]">
                            <CardHeader>
                              <CardTitle className="text-base flex items-center gap-2">
                                <Eye className="h-4 w-4" />
                                Profile Privacy
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ScrollArea className="h-96">
                                <div className="space-y-4 pr-3">
                                  <div className="space-y-2">
                                    <Label className="text-sm font-medium">Profile Visibility</Label>
                                    <Select 
                                      value={privacySettings.profileVisibility}
                                      onValueChange={(value) => setPrivacySettings(prev => ({ ...prev, profileVisibility: value }))}
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="public">Everyone</SelectItem>
                                        <SelectItem value="team">Team Only</SelectItem>
                                        <SelectItem value="department">Department Only</SelectItem>
                                        <SelectItem value="private">Private</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  
                                  <Separator />
                                  
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <Label className="text-sm font-medium">Activity Tracking</Label>
                                      <p className="text-sm text-gray-600">Track your activity for analytics</p>
                                    </div>
                                    <Switch
                                      checked={privacySettings.activityTracking}
                                      onCheckedChange={(checked) => 
                                        setPrivacySettings(prev => ({ ...prev, activityTracking: checked }))
                                      }
                                    />
                                  </div>
                                  
                                  <Separator />
                                  
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <Label className="text-sm font-medium">Location Tracking</Label>
                                      <p className="text-sm text-gray-600">Track your location for security</p>
                                    </div>
                                    <Switch
                                      checked={privacySettings.locationTracking}
                                      onCheckedChange={(checked) => 
                                        setPrivacySettings(prev => ({ ...prev, locationTracking: checked }))
                                      }
                                    />
                                  </div>

                                  <Separator />

                                  <div className="space-y-2">
                                    <Label className="text-sm font-medium">Data Sharing Preferences</Label>
                                    <p className="text-sm text-gray-600">Control how your data is shared</p>
                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between text-sm">
                                        <span>Share with team members</span>
                                        <Switch defaultChecked />
                                      </div>
                                      <div className="flex items-center justify-between text-sm">
                                        <span>Include in reports</span>
                                        <Switch defaultChecked />
                                      </div>
                                      <div className="flex items-center justify-between text-sm">
                                        <span>Third-party integrations</span>
                                        <Switch />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </ScrollArea>
                            </CardContent>
                          </Card>

                          {/* Data & Analytics */}
                          <Card className="border border-gray-200 rounded-lg min-w-[400px]">
                            <CardHeader>
                              <CardTitle className="text-base flex items-center gap-2">
                                <Database className="h-4 w-4" />
                                Data & Analytics
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ScrollArea className="h-96">
                                <div className="space-y-4 pr-3">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <Label className="text-sm font-medium">Analytics Opt-in</Label>
                                      <p className="text-sm text-gray-600">Help improve our tools</p>
                                    </div>
                                    <Switch
                                      checked={privacySettings.analyticsOptIn}
                                      onCheckedChange={(checked) => 
                                        setPrivacySettings(prev => ({ ...prev, analyticsOptIn: checked }))
                                      }
                                    />
                                  </div>
                                  
                                  <Separator />
                                  
                                  <div className="space-y-2">
                                    <Label className="text-sm font-medium">Cookie Preferences</Label>
                                    <Select 
                                      value={privacySettings.cookiePreferences}
                                      onValueChange={(value) => setPrivacySettings(prev => ({ ...prev, cookiePreferences: value }))}
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="essential">Essential Only</SelectItem>
                                        <SelectItem value="functional">Essential + Functional</SelectItem>
                                        <SelectItem value="analytics">Essential + Analytics</SelectItem>
                                        <SelectItem value="marketing">Essential + Marketing</SelectItem>
                                        <SelectItem value="all">All Cookies</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <Separator />

                                  <div className="space-y-2">
                                    <Label className="text-sm font-medium">Marketing Communications</Label>
                                    <p className="text-sm text-gray-600">Manage communication preferences</p>
                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between text-sm">
                                        <span>Product updates</span>
                                        <Switch defaultChecked />
                                      </div>
                                      <div className="flex items-center justify-between text-sm">
                                        <span>Feature announcements</span>
                                        <Switch defaultChecked />
                                      </div>
                                      <div className="flex items-center justify-between text-sm">
                                        <span>Marketing emails</span>
                                        <Switch />
                                      </div>
                                      <div className="flex items-center justify-between text-sm">
                                        <span>SMS notifications</span>
                                        <Switch />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </ScrollArea>
                            </CardContent>
                          </Card>
                        </div>
                      </ScrollArea>

                      <div className="flex justify-end">
                        <LoadingButton 
                          onClick={() => handleSave('Privacy')}
                          loading={loading}
                          className="bg-[#2E5E47] hover:bg-[#2E5E47]/90"
                        >
                          Save Changes
                        </LoadingButton>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Sessions Tab with Enhanced Scrolling */}
                  <TabsContent value="sessions" className="mt-0">
                    <Card className="border border-gray-200 rounded-lg">
                      <CardHeader>
                        <CardTitle className="text-base flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Monitor className="h-4 w-4" />
                            Active Sessions
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {activeSessions.length} total
                            </Badge>
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              {activeSessions.filter(s => s.riskScore === 'low').length} secure
                            </Badge>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-[600px] w-full">
                          <div className="space-y-4 pr-3">
                            {activeSessions.map((session) => (
                              <div 
                                key={session.id} 
                                className={`p-4 rounded-lg border ${
                                  session.riskScore === 'high' 
                                    ? 'border-red-200 bg-red-50' 
                                    : session.current 
                                    ? 'border-green-200 bg-green-50' 
                                    : 'border-gray-200'
                                }`}
                              >
                                <ScrollArea className="w-full" orientation="horizontal">
                                  <div className="flex justify-between items-start min-w-max">
                                    <div className="flex items-start gap-3">
                                      <Monitor className="h-5 w-5 text-gray-600 mt-0.5 shrink-0" />
                                      <div className="min-w-0">
                                        <div className="font-medium flex items-center gap-2 flex-wrap">
                                          <span className="whitespace-nowrap">{session.device}</span>
                                          {session.current && (
                                            <Badge variant="outline" className="text-xs whitespace-nowrap">Current</Badge>
                                          )}
                                          {session.riskScore === 'high' && (
                                            <Badge variant="destructive" className="text-xs whitespace-nowrap">Suspicious</Badge>
                                          )}
                                        </div>
                                        <div className="text-sm text-gray-600 mt-1 whitespace-nowrap">
                                          {session.browser} • {session.location}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1 whitespace-nowrap">
                                          Last active: {session.lastActive}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="ml-4 shrink-0">
                                      {!session.current && (
                                        <Button variant="outline" size="sm" onClick={() => handleRevokeSession(session.id)}>
                                          End Session
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                </ScrollArea>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Data Tab with Enhanced Scrolling */}
                  <TabsContent value="data" className="mt-0">
                    <div className="space-y-6">
                      <ScrollArea className="w-full" orientation="horizontal">
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 min-w-max xl:min-w-0">
                          {/* Data Export */}
                          <Card className="border border-gray-200 rounded-lg min-w-[400px]">
                            <CardHeader>
                              <CardTitle className="text-base flex items-center gap-2">
                                <Download className="h-4 w-4" />
                                Data Export
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ScrollArea className="h-96">
                                <div className="space-y-3 pr-3">
                                  <Button variant="outline" className="w-full justify-between min-h-[3rem]">
                                    <div className="flex items-center gap-2">
                                      <User className="h-4 w-4" />
                                      <span>Profile Data</span>
                                    </div>
                                    <Badge variant="secondary">2.3 MB</Badge>
                                  </Button>
                                  <Button variant="outline" className="w-full justify-between min-h-[3rem]">
                                    <div className="flex items-center gap-2">
                                      <History className="h-4 w-4" />
                                      <span>Activity Logs</span>
                                    </div>
                                    <Badge variant="secondary">15.7 MB</Badge>
                                  </Button>
                                  <Button variant="outline" className="w-full justify-between min-h-[3rem]">
                                    <div className="flex items-center gap-2">
                                      <Shield className="h-4 w-4" />
                                      <span>Security Events</span>
                                    </div>
                                    <Badge variant="secondary">8.2 MB</Badge>
                                  </Button>
                                  <Button variant="outline" className="w-full justify-between min-h-[3rem]">
                                    <div className="flex items-center gap-2">
                                      <Database className="h-4 w-4" />
                                      <span>Data Access Logs</span>
                                    </div>
                                    <Badge variant="secondary">4.1 MB</Badge>
                                  </Button>
                                  <Button variant="outline" className="w-full justify-between min-h-[3rem]">
                                    <div className="flex items-center gap-2">
                                      <Settings className="h-4 w-4" />
                                      <span>Account Settings</span>
                                    </div>
                                    <Badge variant="secondary">0.5 MB</Badge>
                                  </Button>
                                  <Button variant="outline" className="w-full justify-between min-h-[3rem]">
                                    <div className="flex items-center gap-2">
                                      <Download className="h-4 w-4" />
                                      <span>Complete Archive</span>
                                    </div>
                                    <Badge variant="secondary">31.3 MB</Badge>
                                  </Button>
                                </div>
                              </ScrollArea>
                            </CardContent>
                          </Card>

                          {/* Data Settings */}
                          <Card className="border border-gray-200 rounded-lg min-w-[400px]">
                            <CardHeader>
                              <CardTitle className="text-base flex items-center gap-2">
                                <Settings className="h-4 w-4" />
                                Data Settings
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ScrollArea className="h-96">
                                <div className="space-y-4 pr-3">
                                  <div className="space-y-2">
                                    <Label className="text-sm font-medium">Data Retention</Label>
                                    <Select 
                                      value={dataSettings.dataRetention}
                                      onValueChange={(value) => setDataSettings(prev => ({ ...prev, dataRetention: value }))}
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="6-months">6 Months</SelectItem>
                                        <SelectItem value="1-year">1 Year</SelectItem>
                                        <SelectItem value="3-years">3 Years</SelectItem>
                                        <SelectItem value="5-years">5 Years</SelectItem>
                                        <SelectItem value="7-years">7 Years (Default)</SelectItem>
                                        <SelectItem value="indefinite">Indefinite</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  
                                  <Separator />
                                  
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <Label className="text-sm font-medium">Data Minimization</Label>
                                      <p className="text-sm text-gray-600">Keep only essential data</p>
                                    </div>
                                    <Switch
                                      checked={dataSettings.personalDataMinimization}
                                      onCheckedChange={(checked) => 
                                        setDataSettings(prev => ({ ...prev, personalDataMinimization: checked }))
                                      }
                                    />
                                  </div>

                                  <Separator />

                                  <div className="flex items-center justify-between">
                                    <div>
                                      <Label className="text-sm font-medium">Anonymize Reports</Label>
                                      <p className="text-sm text-gray-600">Remove personal identifiers from reports</p>
                                    </div>
                                    <Switch
                                      checked={dataSettings.anonymizeReports}
                                      onCheckedChange={(checked) => 
                                        setDataSettings(prev => ({ ...prev, anonymizeReports: checked }))
                                      }
                                    />
                                  </div>
                                  
                                  <Separator />
                                  
                                  <div className="space-y-2">
                                    <Label className="text-sm font-medium">Automatic Cleanup</Label>
                                    <p className="text-sm text-gray-600">Automatically delete old data</p>
                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between text-sm">
                                        <span>Old session logs</span>
                                        <Switch defaultChecked />
                                      </div>
                                      <div className="flex items-center justify-between text-sm">
                                        <span>Expired security events</span>
                                        <Switch defaultChecked />
                                      </div>
                                      <div className="flex items-center justify-between text-sm">
                                        <span>Temporary files</span>
                                        <Switch defaultChecked />
                                      </div>
                                    </div>
                                  </div>

                                  <Separator />
                                  
                                  <div className="pt-2">
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                                          <Trash2 className="h-4 w-4 mr-2" />
                                          Delete All Data
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Delete All Data?</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            This will permanently delete all your data. This action cannot be undone.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                                            Delete Data
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </div>
                                </div>
                              </ScrollArea>
                            </CardContent>
                          </Card>
                        </div>
                      </ScrollArea>

                      <div className="flex justify-end">
                        <LoadingButton 
                          onClick={() => handleSave('Data')}
                          loading={loading}
                          className="bg-[#2E5E47] hover:bg-[#2E5E47]/90"
                        >
                          Save Changes
                        </LoadingButton>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Audit Tab with Enhanced Scrolling */}
                  <TabsContent value="audit" className="mt-0">
                    <div className="space-y-6">
                      {/* Search and Filter with Horizontal Scroll */}
                      <ScrollArea className="w-full" orientation="horizontal">
                        <div className="flex gap-3 min-w-max">
                          <div className="relative min-w-[300px]">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                              placeholder="Search events..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="pl-10"
                            />
                          </div>
                          <Select value={filterType} onValueChange={setFilterType}>
                            <SelectTrigger className="w-32 whitespace-nowrap">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All</SelectItem>
                              <SelectItem value="success">Success</SelectItem>
                              <SelectItem value="warning">Warning</SelectItem>
                              <SelectItem value="info">Info</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button variant="outline" size="default" className="whitespace-nowrap">
                            <Download className="h-4 w-4 mr-2" />
                            Export Logs
                          </Button>
                        </div>
                      </ScrollArea>

                      <ScrollArea className="w-full" orientation="horizontal">
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 min-w-max xl:min-w-0">
                          {/* Security Events */}
                          <Card className="border border-gray-200 rounded-lg min-w-[450px]">
                            <CardHeader>
                              <CardTitle className="text-base flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Shield className="h-4 w-4" />
                                  Security Events
                                </div>
                                <Badge variant="secondary">{filteredEvents.length}</Badge>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ScrollArea className="h-96 w-full">
                                <div className="space-y-3 pr-3">
                                  {filteredEvents.map((event) => (
                                    <div key={event.id} className="border rounded-lg overflow-hidden">
                                      <ScrollArea className="w-full" orientation="horizontal">
                                        <div className="flex items-start gap-3 p-3 min-w-max">
                                          {event.severity === 'success' && <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />}
                                          {event.severity === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />}
                                          {event.severity === 'info' && <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />}
                                          <div className="flex-1 min-w-0">
                                            <div className="text-sm font-medium whitespace-nowrap">{event.description}</div>
                                            <div className="text-xs text-gray-500 mt-1 whitespace-nowrap">
                                              {new Date(event.timestamp).toLocaleString()}
                                            </div>
                                          </div>
                                        </div>
                                      </ScrollArea>
                                    </div>
                                  ))}
                                </div>
                              </ScrollArea>
                            </CardContent>
                          </Card>

                          {/* Data Access Logs */}
                          <Card className="border border-gray-200 rounded-lg min-w-[450px]">
                            <CardHeader>
                              <CardTitle className="text-base flex items-center gap-2">
                                <Database className="h-4 w-4" />
                                Data Access Logs
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ScrollArea className="h-96 w-full">
                                <div className="space-y-3 pr-3">
                                  {dataAccessLogs.filter(log => 
                                    log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    log.action.toLowerCase().includes(searchTerm.toLowerCase())
                                  ).map((log) => (
                                    <div key={log.id} className="border rounded-lg overflow-hidden">
                                      <ScrollArea className="w-full" orientation="horizontal">
                                        <div className="flex items-start gap-3 p-3 min-w-max">
                                          <Database className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                                          <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start gap-4">
                                              <div className="text-sm font-medium whitespace-nowrap">{log.resource}</div>
                                              <Badge variant="outline" className="text-xs whitespace-nowrap">{log.action}</Badge>
                                            </div>
                                            <div className="text-sm text-gray-600 mt-1 whitespace-nowrap">{log.details}</div>
                                            <div className="text-xs text-gray-500 mt-1 whitespace-nowrap">
                                              {new Date(log.timestamp).toLocaleString()}
                                            </div>
                                          </div>
                                        </div>
                                      </ScrollArea>
                                    </div>
                                  ))}
                                </div>
                              </ScrollArea>
                            </CardContent>
                          </Card>
                        </div>
                      </ScrollArea>
                    </div>
                  </TabsContent>
                </div>
              </ScrollArea>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}