import React, { useState, useEffect } from 'react';
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
import { ScrollArea } from '../ui/scroll-area';
import { 
  Building2,
  Settings,
  Plug,
  Shield,
  FileText,
  Mail,
  Save,
  X,
  CheckCircle,
  Clock
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface OrganizationSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock data
const organizationData = {
  name: 'Found24 Global',
  website: 'https://found24.com',
  industry: 'Technology',
  size: '51-200 employees',
  founded: '2020',
  description: 'AI-powered global hiring marketplace connecting companies with top talent worldwide.',
  email: 'contact@found24.com',
  phone: '+1 (555) 123-4567',
  address: '123 Market Street, San Francisco, CA 94105',
  timezone: 'America/Los_Angeles',
  currency: 'USD',
  language: 'English'
};

const integrations = [
  { id: 1, name: 'Slack', status: 'connected', lastSync: '2024-01-15T14:30:00Z' },
  { id: 2, name: 'Google Calendar', status: 'connected', lastSync: '2024-01-15T12:00:00Z' },
  { id: 3, name: 'LinkedIn', status: 'disconnected', lastSync: null },
  { id: 4, name: 'Zoom', status: 'connected', lastSync: '2024-01-15T10:15:00Z' },
  { id: 5, name: 'Microsoft Teams', status: 'pending', lastSync: null },
  { id: 6, name: 'Salesforce', status: 'connected', lastSync: '2024-01-15T08:30:00Z' },
  { id: 7, name: 'HubSpot', status: 'disconnected', lastSync: null },
  { id: 8, name: 'Greenhouse', status: 'connected', lastSync: '2024-01-14T16:45:00Z' },
  { id: 9, name: 'Google Workspace', status: 'connected', lastSync: '2024-01-15T09:15:00Z' },
  { id: 10, name: 'Jira', status: 'connected', lastSync: '2024-01-15T11:20:00Z' }
];

const auditLogs = [
  { id: 1, action: 'Organization name updated', user: 'Alex Morgan', timestamp: '2024-01-15T14:30:00Z' },
  { id: 2, action: 'Slack integration connected', user: 'Sarah Johnson', timestamp: '2024-01-15T12:00:00Z' },
  { id: 3, action: 'User role changed', user: 'Mike Chen', timestamp: '2024-01-14T16:45:00Z' },
  { id: 4, action: 'Integration settings updated', user: 'Alex Morgan', timestamp: '2024-01-14T09:20:00Z' },
  { id: 5, action: 'Team member invited', user: 'Sarah Johnson', timestamp: '2024-01-13T15:30:00Z' },
  { id: 6, action: 'Security settings updated', user: 'Alex Morgan', timestamp: '2024-01-13T11:15:00Z' },
  { id: 7, action: 'Integration disconnected', user: 'Mike Chen', timestamp: '2024-01-12T14:20:00Z' },
  { id: 8, action: 'Profile updated', user: 'Emma Williams', timestamp: '2024-01-12T09:45:00Z' }
];

export function OrganizationSettingsModal({ open, onOpenChange }: OrganizationSettingsModalProps) {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [orgSettings, setOrgSettings] = useState(organizationData);
  const [complianceSettings, setComplianceSettings] = useState({
    gdprCompliance: true,
    ccpaCompliance: true,
    dataRetention: '7-years',
    auditLogs: true,
    accessControls: true
  });

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

  const handleIntegrationToggle = (integrationId: number) => {
    toast.success('Integration status updated');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[80vh] p-0 gap-0 overflow-hidden">
        {/* Compact Header */}
        <DialogHeader className="px-6 py-3 border-b bg-gradient-to-r from-gray-50 to-white shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 border border-blue-200">
                <Building2 className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold">Organization Settings</DialogTitle>
                <DialogDescription className="text-sm text-gray-600">
                  Configure organization profile, integrations, and compliance
                </DialogDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 flex flex-col min-h-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
            {/* Compact Tabs */}
            <div className="px-6 py-2 border-b bg-gray-50/50 shrink-0">
              <div className="flex items-center gap-1">
                {[
                  { id: 'general', label: 'General', icon: Building2 },
                  { id: 'integrations', label: 'Integrations', icon: Plug },
                  { id: 'compliance', label: 'Compliance', icon: Shield },
                  { id: 'audit', label: 'Audit', icon: FileText }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-white text-gray-900 shadow-sm border'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Optimized Content Area */}
            <div className="flex-1 min-h-0">
              <ScrollArea className="h-full">
                <div className="p-4">
                  {/* General Tab */}
                  <TabsContent value="general" className="mt-0 space-y-4">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                      {/* Organization Profile */}
                      <Card className="border border-gray-200">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-blue-600" />
                            Organization Profile
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="space-y-1.5">
                            <Label className="text-sm">Organization Name</Label>
                            <Input 
                              value={orgSettings.name}
                              onChange={(e) => setOrgSettings(prev => ({ ...prev, name: e.target.value }))}
                              className="h-8"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-sm">Website</Label>
                            <Input 
                              value={orgSettings.website}
                              onChange={(e) => setOrgSettings(prev => ({ ...prev, website: e.target.value }))}
                              className="h-8"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1.5">
                              <Label className="text-sm">Industry</Label>
                              <Select 
                                value={orgSettings.industry}
                                onValueChange={(value) => setOrgSettings(prev => ({ ...prev, industry: value }))}
                              >
                                <SelectTrigger className="h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Technology">Technology</SelectItem>
                                  <SelectItem value="Finance">Finance</SelectItem>
                                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                                  <SelectItem value="Education">Education</SelectItem>
                                  <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                                  <SelectItem value="Retail">Retail</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-sm">Size</Label>
                              <Select 
                                value={orgSettings.size}
                                onValueChange={(value) => setOrgSettings(prev => ({ ...prev, size: value }))}
                              >
                                <SelectTrigger className="h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1-10 employees">1-10</SelectItem>
                                  <SelectItem value="11-50 employees">11-50</SelectItem>
                                  <SelectItem value="51-200 employees">51-200</SelectItem>
                                  <SelectItem value="201-1000 employees">201-1000</SelectItem>
                                  <SelectItem value="1000+ employees">1000+</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Contact Information */}
                      <Card className="border border-gray-200">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Mail className="h-4 w-4 text-green-600" />
                            Contact Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="space-y-1.5">
                            <Label className="text-sm">Email</Label>
                            <Input 
                              value={orgSettings.email}
                              onChange={(e) => setOrgSettings(prev => ({ ...prev, email: e.target.value }))}
                              className="h-8"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-sm">Phone</Label>
                            <Input 
                              value={orgSettings.phone}
                              onChange={(e) => setOrgSettings(prev => ({ ...prev, phone: e.target.value }))}
                              className="h-8"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1.5">
                              <Label className="text-sm">Time Zone</Label>
                              <Select 
                                value={orgSettings.timezone}
                                onValueChange={(value) => setOrgSettings(prev => ({ ...prev, timezone: value }))}
                              >
                                <SelectTrigger className="h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="America/Los_Angeles">Pacific</SelectItem>
                                  <SelectItem value="America/Denver">Mountain</SelectItem>
                                  <SelectItem value="America/Chicago">Central</SelectItem>
                                  <SelectItem value="America/New_York">Eastern</SelectItem>
                                  <SelectItem value="Europe/London">GMT</SelectItem>
                                  <SelectItem value="Europe/Paris">CET</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-sm">Language</Label>
                              <Select 
                                value={orgSettings.language}
                                onValueChange={(value) => setOrgSettings(prev => ({ ...prev, language: value }))}
                              >
                                <SelectTrigger className="h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="English">English</SelectItem>
                                  <SelectItem value="Spanish">Spanish</SelectItem>
                                  <SelectItem value="French">French</SelectItem>
                                  <SelectItem value="German">German</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="flex justify-end">
                      <LoadingButton 
                        onClick={() => handleSave('General')}
                        loading={loading}
                        className="bg-[#2E5E47] hover:bg-[#2E5E47]/90"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </LoadingButton>
                    </div>
                  </TabsContent>

                  {/* Integrations Tab */}
                  <TabsContent value="integrations" className="mt-0 space-y-4">
                    {/* Integration Settings */}
                    <Card className="border border-gray-200">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Settings className="h-4 w-4 text-gray-600" />
                          Settings
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Auto-sync</Label>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Webhooks</Label>
                            <Switch defaultChecked />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-sm">Frequency</Label>
                            <Select defaultValue="hourly">
                              <SelectTrigger className="h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="real-time">Real-time</SelectItem>
                                <SelectItem value="hourly">Hourly</SelectItem>
                                <SelectItem value="daily">Daily</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Available Integrations */}
                    <Card className="border border-gray-200">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Plug className="h-4 w-4 text-blue-600" />
                            Available Integrations
                          </CardTitle>
                          <Badge variant="secondary" className="text-xs">
                            {integrations.filter(i => i.status === 'connected').length} connected
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-64">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pr-4">
                            {integrations.map((integration) => (
                              <div key={integration.id} className="flex items-center justify-between p-2 border rounded hover:bg-gray-50">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                                    <Plug className="h-3 w-3 text-gray-600" />
                                  </div>
                                  <span className="text-sm font-medium">{integration.name}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Badge 
                                    variant={integration.status === 'connected' ? 'default' : 'secondary'}
                                    className={`text-xs px-1.5 ${
                                      integration.status === 'connected' ? 'bg-green-100 text-green-800' :
                                      integration.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-gray-100 text-gray-800'
                                    }`}
                                  >
                                    {integration.status}
                                  </Badge>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleIntegrationToggle(integration.id)}
                                    className="h-6 text-xs px-1.5"
                                  >
                                    {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Compliance Tab */}
                  <TabsContent value="compliance" className="mt-0 space-y-4">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                      {/* Compliance Settings */}
                      <Card className="border border-gray-200">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Shield className="h-4 w-4 text-green-600" />
                            Settings
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">GDPR Compliance</Label>
                            <Switch 
                              checked={complianceSettings.gdprCompliance}
                              onCheckedChange={(checked) => 
                                setComplianceSettings(prev => ({ ...prev, gdprCompliance: checked }))
                              }
                            />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">CCPA Compliance</Label>
                            <Switch 
                              checked={complianceSettings.ccpaCompliance}
                              onCheckedChange={(checked) => 
                                setComplianceSettings(prev => ({ ...prev, ccpaCompliance: checked }))
                              }
                            />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Audit Logs</Label>
                            <Switch 
                              checked={complianceSettings.auditLogs}
                              onCheckedChange={(checked) => 
                                setComplianceSettings(prev => ({ ...prev, auditLogs: checked }))
                              }
                            />
                          </div>
                          <Separator />
                          <div className="space-y-1.5">
                            <Label className="text-sm">Data Retention</Label>
                            <Select 
                              value={complianceSettings.dataRetention}
                              onValueChange={(value) => setComplianceSettings(prev => ({ ...prev, dataRetention: value }))}
                            >
                              <SelectTrigger className="h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1-year">1 Year</SelectItem>
                                <SelectItem value="3-years">3 Years</SelectItem>
                                <SelectItem value="5-years">5 Years</SelectItem>
                                <SelectItem value="7-years">7 Years</SelectItem>
                                <SelectItem value="indefinite">Indefinite</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Compliance Status */}
                      <Card className="border border-gray-200">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-medium">GDPR</span>
                            </div>
                            <Badge className="bg-green-100 text-green-800 text-xs">Active</Badge>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-medium">CCPA</span>
                            </div>
                            <Badge className="bg-green-100 text-green-800 text-xs">Active</Badge>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-yellow-50 border border-yellow-200 rounded">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-yellow-600" />
                              <span className="text-sm font-medium">SOC 2</span>
                            </div>
                            <Badge className="bg-yellow-100 text-yellow-800 text-xs">In Progress</Badge>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-medium">HIPAA</span>
                            </div>
                            <Badge className="bg-green-100 text-green-800 text-xs">Active</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="flex justify-end">
                      <LoadingButton 
                        onClick={() => handleSave('Compliance')}
                        loading={loading}
                        className="bg-[#2E5E47] hover:bg-[#2E5E47]/90"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </LoadingButton>
                    </div>
                  </TabsContent>

                  {/* Audit Tab */}
                  <TabsContent value="audit" className="mt-0 space-y-4">
                    <Card className="border border-gray-200">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <FileText className="h-4 w-4 text-purple-600" />
                          Audit Log
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-64">
                          <div className="space-y-2 pr-4">
                            {auditLogs.map((log) => (
                              <div key={log.id} className="flex items-start gap-2 p-2 border rounded hover:bg-gray-50">
                                <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center shrink-0 mt-0.5">
                                  <Settings className="h-3 w-3 text-gray-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium">{log.action}</div>
                                  <div className="text-xs text-gray-600">
                                    {log.user} • {new Date(log.timestamp).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
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