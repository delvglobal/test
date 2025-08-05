// This file has been replaced by OrganizationSettingsModal.tsx
// TODO: Remove this file - kept for reference during transition

import React, { useState } from 'react';
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
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { LoadingButton } from '../ui/loading-button';
import { Separator } from '../ui/separator';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  Building2,
  CreditCard,
  Users,
  Shield,
  Globe,
  Key,
  Database,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Check,
  X,
  Plus,
  Trash2,
  Edit,
  Copy,
  RefreshCw,
  Download,
  Upload,
  Activity,
  AlertTriangle,
  Crown,
  Zap,
  Settings,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AccountSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const planFeatures = {
  starter: ['Up to 5 team members', 'Basic candidate management', '100 candidates/month', 'Email support'],
  professional: ['Up to 25 team members', 'Advanced analytics', '1,000 candidates/month', 'Priority support', 'Custom integrations'],
  enterprise: ['Unlimited team members', 'Full analytics suite', 'Unlimited candidates', '24/7 phone support', 'Custom integrations', 'SSO', 'Advanced security']
};

const teamMembers = [
  { id: 1, name: 'Alexandra Morgan', email: 'alex.morgan@globalhiring.com', role: 'Admin', status: 'Active', avatar: '/placeholder-avatar.jpg' },
  { id: 2, name: 'Michael Chen', email: 'michael.chen@globalhiring.com', role: 'Recruiter', status: 'Active', avatar: null },
  { id: 3, name: 'Sarah Johnson', email: 'sarah.johnson@globalhiring.com', role: 'Manager', status: 'Active', avatar: null },
  { id: 4, name: 'David Kim', email: 'david.kim@globalhiring.com', role: 'Recruiter', status: 'Pending', avatar: null }
];

const integrations = [
  { id: 1, name: 'Slack', description: 'Get notifications in Slack', status: 'Connected', icon: '💬' },
  { id: 2, name: 'LinkedIn', description: 'Import candidates from LinkedIn', status: 'Connected', icon: '💼' },
  { id: 3, name: 'Google Calendar', description: 'Sync interview schedules', status: 'Connected', icon: '📅' },
  { id: 4, name: 'Zoom', description: 'Create video interview links', status: 'Disconnected', icon: '📹' },
  { id: 5, name: 'Microsoft Teams', description: 'Team collaboration', status: 'Disconnected', icon: '👥' }
];

export function AccountSettingsModal({ open, onOpenChange }: AccountSettingsModalProps) {
  const [loading, setLoading] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  
  const [accountData, setAccountData] = useState({
    companyName: 'Global Hiring Solutions',
    companyEmail: 'admin@globalhiring.com',
    companyPhone: '+1 (555) 123-4567',
    companyAddress: '123 Business Ave, San Francisco, CA 94105',
    industry: 'Technology',
    companySize: '50-100',
    website: 'https://globalhiring.com'
  });

  const [subscription, setSubscription] = useState({
    plan: 'professional',
    status: 'active',
    billing: 'monthly',
    nextBilling: '2024-12-15',
    seats: 25,
    usedSeats: 18
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    ssoEnabled: false,
    sessionTimeout: '4h',
    ipWhitelist: false,
    auditLogs: true
  });

  const [apiSettings, setApiSettings] = useState({
    apiKey: 'ghs_1234567890abcdef1234567890abcdef12345678',
    webhookUrl: 'https://your-app.com/webhook',
    rateLimit: '1000'
  });

  const handleSave = async (section: string) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success(`${section} settings saved!`, {
      description: 'Your account settings have been updated successfully.'
    });
    
    setLoading(false);
  };

  const handleInviteUser = () => {
    toast.success('Invitation sent!', {
      description: 'The user will receive an email invitation to join your team.'
    });
  };

  const handleRemoveUser = (userName: string) => {
    toast.success(`${userName} removed`, {
      description: 'The user has been removed from your team.'
    });
  };

  const handleToggleIntegration = (name: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Connected' ? 'Disconnected' : 'Connected';
    toast.success(`${name} ${newStatus.toLowerCase()}`, {
      description: `${name} integration has been ${newStatus.toLowerCase()}.`
    });
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiSettings.apiKey);
    toast.success('API key copied to clipboard');
  };

  const regenerateApiKey = () => {
    toast.success('API key regenerated', {
      description: 'Please update your applications with the new key.'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Building2 className="h-5 w-5 text-[#2E5E47]" />
            <span>Account Settings</span>
          </DialogTitle>
          <DialogDescription>
            Manage your organization's account, billing, team, and security settings.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="account" className="flex-1">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <div className="mt-6 max-h-[500px] overflow-y-auto">
            <TabsContent value="account" className="space-y-6">
              {/* Account Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5 text-[#2E5E47]" />
                    <span>Company Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        value={accountData.companyName}
                        onChange={(e) => setAccountData(prev => ({ ...prev, companyName: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select 
                        value={accountData.industry} 
                        onValueChange={(value) => setAccountData(prev => ({ ...prev, industry: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="Retail">Retail</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyEmail" className="flex items-center space-x-1">
                        <Mail className="h-4 w-4" />
                        <span>Company Email</span>
                      </Label>
                      <Input
                        id="companyEmail"
                        type="email"
                        value={accountData.companyEmail}
                        onChange={(e) => setAccountData(prev => ({ ...prev, companyEmail: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyPhone" className="flex items-center space-x-1">
                        <Phone className="h-4 w-4" />
                        <span>Phone Number</span>
                      </Label>
                      <Input
                        id="companyPhone"
                        value={accountData.companyPhone}
                        onChange={(e) => setAccountData(prev => ({ ...prev, companyPhone: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyAddress" className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>Address</span>
                    </Label>
                    <Input
                      id="companyAddress"
                      value={accountData.companyAddress}
                      onChange={(e) => setAccountData(prev => ({ ...prev, companyAddress: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companySize">Company Size</Label>
                      <Select 
                        value={accountData.companySize} 
                        onValueChange={(value) => setAccountData(prev => ({ ...prev, companySize: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="50-100">50-100 employees</SelectItem>
                          <SelectItem value="100-500">100-500 employees</SelectItem>
                          <SelectItem value="500+">500+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website" className="flex items-center space-x-1">
                        <Globe className="h-4 w-4" />
                        <span>Website</span>
                      </Label>
                      <Input
                        id="website"
                        value={accountData.website}
                        onChange={(e) => setAccountData(prev => ({ ...prev, website: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <LoadingButton 
                      onClick={() => handleSave('Account')}
                      loading={loading}
                      loadingText="Saving..."
                      className="bg-[#2E5E47] hover:bg-[#2E5E47]/90"
                    >
                      Save Changes
                    </LoadingButton>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="space-y-6">
              {/* Current Plan */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Crown className="h-5 w-5 text-[#2E5E47]" />
                      <span>Current Plan</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#2E5E47]">${subscription.plan === 'professional' ? '99' : subscription.plan === 'enterprise' ? '299' : '29'}</div>
                      <div className="text-sm text-gray-600">per month</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{subscription.usedSeats}/{subscription.seats}</div>
                      <div className="text-sm text-gray-600">team seats used</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        <Calendar className="h-6 w-6 mx-auto text-[#2E5E47]" />
                      </div>
                      <div className="text-sm text-gray-600">Next billing: {subscription.nextBilling}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Plan Features</Label>
                    <div className="space-y-1">
                      {planFeatures[subscription.plan as keyof typeof planFeatures].map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download Invoice
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Update Payment
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Zap className="h-4 w-4 mr-2" />
                      Upgrade Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Billing History */}
              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { date: '2024-11-15', amount: '$99.00', status: 'Paid', invoice: 'INV-2024-011' },
                      { date: '2024-10-15', amount: '$99.00', status: 'Paid', invoice: 'INV-2024-010' },
                      { date: '2024-09-15', amount: '$99.00', status: 'Paid', invoice: 'INV-2024-009' }
                    ].map((bill, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div>
                            <div className="font-medium">{bill.invoice}</div>
                            <div className="text-sm text-gray-600">{bill.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="font-medium">{bill.amount}</div>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {bill.status}
                            </Badge>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              {/* Team Members */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-[#2E5E47]" />
                      <span>Team Members</span>
                    </div>
                    <Button onClick={handleInviteUser} className="bg-[#2E5E47] hover:bg-[#2E5E47]/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Invite User
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={member.avatar || undefined} alt={member.name} />
                            <AvatarFallback className="bg-[#2E5E47] text-white">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-gray-600">{member.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <Badge variant="outline">{member.role}</Badge>
                            <div className="text-sm text-gray-600 mt-1">
                              <Badge 
                                variant={member.status === 'Active' ? 'default' : 'secondary'}
                                className={member.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
                              >
                                {member.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleRemoveUser(member.name)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              {/* Security Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-[#2E5E47]" />
                    <span>Security Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="font-medium">Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-600">Require 2FA for all team members</p>
                      </div>
                      <Switch
                        checked={securitySettings.twoFactorAuth}
                        onCheckedChange={(checked) => 
                          setSecuritySettings(prev => ({ ...prev, twoFactorAuth: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="font-medium">Single Sign-On (SSO)</Label>
                        <p className="text-sm text-gray-600">Enable SAML/OAuth authentication</p>
                      </div>
                      <Switch
                        checked={securitySettings.ssoEnabled}
                        onCheckedChange={(checked) => 
                          setSecuritySettings(prev => ({ ...prev, ssoEnabled: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="font-medium">IP Whitelist</Label>
                        <p className="text-sm text-gray-600">Restrict access to specific IP addresses</p>
                      </div>
                      <Switch
                        checked={securitySettings.ipWhitelist}
                        onCheckedChange={(checked) => 
                          setSecuritySettings(prev => ({ ...prev, ipWhitelist: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="font-medium">Audit Logs</Label>
                        <p className="text-sm text-gray-600">Track all user actions and changes</p>
                      </div>
                      <Switch
                        checked={securitySettings.auditLogs}
                        onCheckedChange={(checked) => 
                          setSecuritySettings(prev => ({ ...prev, auditLogs: checked }))
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Session Timeout</Label>
                    <Select 
                      value={securitySettings.sessionTimeout} 
                      onValueChange={(value) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1h">1 hour</SelectItem>
                        <SelectItem value="4h">4 hours</SelectItem>
                        <SelectItem value="8h">8 hours</SelectItem>
                        <SelectItem value="24h">24 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-end">
                    <LoadingButton 
                      onClick={() => handleSave('Security')}
                      loading={loading}
                      loadingText="Saving..."
                      className="bg-[#2E5E47] hover:bg-[#2E5E47]/90"
                    >
                      Save Security Settings
                    </LoadingButton>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-6">
              {/* API Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Key className="h-5 w-5 text-[#2E5E47]" />
                    <span>API Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>API Key</Label>
                    <div className="flex space-x-2">
                      <Input
                        type={showApiKey ? "text" : "password"}
                        value={apiSettings.apiKey}
                        readOnly
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button variant="outline" size="sm" onClick={copyApiKey}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={regenerateApiKey}>
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Webhook URL</Label>
                    <Input
                      value={apiSettings.webhookUrl}
                      onChange={(e) => setApiSettings(prev => ({ ...prev, webhookUrl: e.target.value }))}
                      placeholder="https://your-app.com/webhook"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Rate Limit (requests/hour)</Label>
                    <Input
                      type="number"
                      value={apiSettings.rateLimit}
                      onChange={(e) => setApiSettings(prev => ({ ...prev, rateLimit: e.target.value }))}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Integrations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-[#2E5E47]" />
                    <span>Third-Party Integrations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {integrations.map((integration) => (
                      <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl">{integration.icon}</div>
                          <div>
                            <div className="font-medium">{integration.name}</div>
                            <div className="text-sm text-gray-600">{integration.description}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge 
                            variant={integration.status === 'Connected' ? 'default' : 'secondary'}
                            className={integration.status === 'Connected' ? 'bg-green-100 text-green-800' : ''}
                          >
                            {integration.status}
                          </Badge>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleToggleIntegration(integration.name, integration.status)}
                          >
                            {integration.status === 'Connected' ? 'Disconnect' : 'Connect'}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>

          <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}