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
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { LoadingButton } from '../ui/loading-button';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera,
  Upload,
  Globe,
  Bell,
  Shield,
  Settings
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ProfileSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const timezones = [
  'UTC-8 (PST - Los Angeles)',
  'UTC-7 (MST - Denver)', 
  'UTC-6 (CST - Chicago)',
  'UTC-5 (EST - New York)',
  'UTC+0 (GMT - London)',
  'UTC+1 (CET - Paris)',
  'UTC+8 (CST - Beijing)',
  'UTC+9 (JST - Tokyo)'
];

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'zh', name: '中文', flag: '🇨🇳' }
];

const departments = [
  'Talent Acquisition',
  'Human Resources',
  'Engineering',
  'Product Management',
  'Sales',
  'Marketing',
  'Customer Success',
  'Operations',
  'Finance',
  'Legal'
];

export function ProfileSettingsModal({ open, onOpenChange }: ProfileSettingsModalProps) {
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  const [profileData, setProfileData] = useState({
    firstName: 'Alexandra',
    lastName: 'Morgan',
    email: 'alex.morgan@globalhiring.com',
    phone: '+1 (555) 123-4567',
    title: 'Senior Recruiter',
    department: 'Talent Acquisition',
    location: 'San Francisco, CA',
    bio: 'Experienced technical recruiter specializing in engineering and product roles.'
  });

  const [preferences, setPreferences] = useState({
    timezone: 'UTC-8 (PST - Los Angeles)',
    language: 'en',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h'
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReport: true,
    candidateUpdates: true,
    interviewReminders: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'team',
    activityStatus: true,
    dataSharing: false
  });

  const handleSave = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Settings saved successfully!', {
      description: 'Your profile has been updated.'
    });
    
    setLoading(false);
    onOpenChange(false);
  };

  const handleAvatarUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          toast.error('File too large. Please choose an image smaller than 5MB.');
          return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
          setAvatarPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="h-5 w-5 text-[#2E5E47]" />
            <span>Profile Settings</span>
          </DialogTitle>
          <DialogDescription>
            Manage your personal information and preferences.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="profile" className="flex-1">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          <div className="mt-6 max-h-[500px] overflow-y-auto">
            <TabsContent value="profile" className="space-y-6">
              {/* Avatar Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Camera className="h-5 w-5 text-[#2E5E47]" />
                    <span>Profile Picture</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <Avatar className="h-20 w-20">
                        <AvatarImage 
                          src={avatarPreview || "/placeholder-avatar.jpg"} 
                          alt="Profile"
                        />
                        <AvatarFallback className="bg-[#2E5E47] text-white text-xl">
                          {profileData.firstName[0]}{profileData.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <Button 
                        size="sm" 
                        className="absolute -bottom-1 -right-1 rounded-full h-8 w-8 p-0"
                        onClick={handleAvatarUpload}
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                    <div>
                      <h4 className="font-medium">Upload new picture</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        JPG, PNG or GIF. Max size 5MB.
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2" 
                        onClick={handleAvatarUpload}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-[#2E5E47]" />
                    <span>Basic Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center space-x-1">
                      <Mail className="h-4 w-4" />
                      <span>Email Address</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center space-x-1">
                        <Phone className="h-4 w-4" />
                        <span>Phone Number</span>
                      </Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>Location</span>
                      </Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title</Label>
                      <Input
                        id="title"
                        value={profileData.title}
                        onChange={(e) => setProfileData(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select 
                        value={profileData.department} 
                        onValueChange={(value) => setProfileData(prev => ({ ...prev, department: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      rows={3}
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5 text-[#2E5E47]" />
                    <span>Regional Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select 
                        value={preferences.language} 
                        onValueChange={(value) => setPreferences(prev => ({ ...prev, language: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((lang) => (
                            <SelectItem key={lang.code} value={lang.code}>
                              <div className="flex items-center space-x-2">
                                <span>{lang.flag}</span>
                                <span>{lang.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Timezone</Label>
                      <Select 
                        value={preferences.timezone} 
                        onValueChange={(value) => setPreferences(prev => ({ ...prev, timezone: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {timezones.map((tz) => (
                            <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date Format</Label>
                      <Select 
                        value={preferences.dateFormat} 
                        onValueChange={(value) => setPreferences(prev => ({ ...prev, dateFormat: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Time Format</Label>
                      <Select 
                        value={preferences.timeFormat} 
                        onValueChange={(value) => setPreferences(prev => ({ ...prev, timeFormat: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12h">12 Hour</SelectItem>
                          <SelectItem value="24h">24 Hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5 text-[#2E5E47]" />
                    <span>Notification Preferences</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-gray-600">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, emailNotifications: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-gray-600">Receive browser notifications</p>
                      </div>
                      <Switch
                        checked={notifications.pushNotifications}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, pushNotifications: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-gray-600">Receive text messages</p>
                      </div>
                      <Switch
                        checked={notifications.smsNotifications}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, smsNotifications: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Weekly Reports</Label>
                        <p className="text-sm text-gray-600">Weekly performance summaries</p>
                      </div>
                      <Switch
                        checked={notifications.weeklyReport}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, weeklyReport: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Candidate Updates</Label>
                        <p className="text-sm text-gray-600">When candidates update profiles</p>
                      </div>
                      <Switch
                        checked={notifications.candidateUpdates}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, candidateUpdates: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Interview Reminders</Label>
                        <p className="text-sm text-gray-600">Reminders for upcoming interviews</p>
                      </div>
                      <Switch
                        checked={notifications.interviewReminders}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, interviewReminders: checked }))
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-[#2E5E47]" />
                    <span>Privacy Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Label>Profile Visibility</Label>
                    <Select 
                      value={privacy.profileVisibility} 
                      onValueChange={(value) => setPrivacy(prev => ({ ...prev, profileVisibility: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">
                          <div className="flex items-center space-x-2">
                            <Globe className="h-4 w-4" />
                            <span>Public - Visible to everyone</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="team">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>Team - Visible to team members only</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="private">
                          <div className="flex items-center space-x-2">
                            <Shield className="h-4 w-4" />
                            <span>Private - Only visible to you</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Activity Status</Label>
                      <p className="text-sm text-gray-600">Show when you're online</p>
                    </div>
                    <Switch
                      checked={privacy.activityStatus}
                      onCheckedChange={(checked) => 
                        setPrivacy(prev => ({ ...prev, activityStatus: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Data Sharing</Label>
                      <p className="text-sm text-gray-600">Share anonymized usage data</p>
                    </div>
                    <Switch
                      checked={privacy.dataSharing}
                      onCheckedChange={(checked) => 
                        setPrivacy(prev => ({ ...prev, dataSharing: checked }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>

          <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <LoadingButton 
              onClick={handleSave}
              loading={loading}
              loadingText="Saving..."
              className="bg-[#2E5E47] hover:bg-[#2E5E47]/90"
            >
              Save Settings
            </LoadingButton>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}