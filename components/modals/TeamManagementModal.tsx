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
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { LoadingButton } from '../ui/loading-button';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  Users,
  Shield,
  Settings,
  Building,
  Mail,
  Calendar,
  Clock,
  MoreHorizontal,
  Plus,
  Edit,
  Trash2,
  UserPlus,
  UserMinus,
  Crown,
  Save,
  X,
  Search,
  Filter
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface TeamManagementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock data
const teamMembers = [
  { id: 1, name: 'Alexandra Morgan', email: 'alex.morgan@found24.com', role: 'Admin', department: 'Leadership', status: 'active', lastActive: '2024-01-15T14:30:00Z', joinDate: '2020-03-15', avatar: null },
  { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@found24.com', role: 'Hiring Manager', department: 'Talent Acquisition', status: 'active', lastActive: '2024-01-15T12:00:00Z', joinDate: '2021-06-10', avatar: null },
  { id: 3, name: 'Mike Chen', email: 'mike.chen@found24.com', role: 'Recruiter', department: 'Talent Acquisition', status: 'active', lastActive: '2024-01-15T10:15:00Z', joinDate: '2021-09-20', avatar: null },
  { id: 4, name: 'Emma Williams', email: 'emma.williams@found24.com', role: 'HR Coordinator', department: 'Human Resources', status: 'active', lastActive: '2024-01-14T16:45:00Z', joinDate: '2022-01-12', avatar: null },
  { id: 5, name: 'David Kim', email: 'david.kim@found24.com', role: 'Analyst', department: 'Analytics', status: 'inactive', lastActive: '2024-01-10T09:30:00Z', joinDate: '2022-05-18', avatar: null }
];

const roles = [
  { id: 'admin', name: 'Admin', description: 'Full access to all features', permissions: ['read', 'write', 'delete', 'admin'] },
  { id: 'hiring-manager', name: 'Hiring Manager', description: 'Manage hiring processes', permissions: ['read', 'write', 'manage-team'] },
  { id: 'recruiter', name: 'Recruiter', description: 'Source and manage candidates', permissions: ['read', 'write', 'candidates'] },
  { id: 'viewer', name: 'Viewer', description: 'Read-only access', permissions: ['read'] }
];

export function TeamManagementModal({ open, onOpenChange }: TeamManagementModalProps) {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('members');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', email: '', role: 'viewer', department: 'talent-acquisition' });

  const handleSave = async (section: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`${section} settings saved`);
    } finally {
      setLoading(false);
    }
  };

  const handleInviteMember = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Invitation sent');
      setShowInviteDialog(false);
      setNewMember({ name: '', email: '', role: 'viewer', department: 'talent-acquisition' });
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterRole === 'all' || member.role === filterRole)
  );

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl h-[95vh] p-0 gap-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-gray-600" />
              <div>
                <DialogTitle className="text-lg">Team Management</DialogTitle>
                <DialogDescription className="text-sm text-gray-600">Manage team members, roles, and permissions.</DialogDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => setShowInviteDialog(true)} size="sm">
                <UserPlus className="h-4 w-4 mr-2" />Invite Member
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 flex flex-col min-h-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
            {/* Tabs */}
            <div className="px-6 py-2 border-b shrink-0">
              <ScrollArea orientation="horizontal" className="w-full whitespace-nowrap">
                <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg">
                  {[
                    { id: 'members', label: 'Members' },
                    { id: 'roles', label: 'Roles' },
                    { id: 'departments', label: 'Departments' },
                    { id: 'permissions', label: 'Permissions' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                        activeTab === tab.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 min-h-0">
              <ScrollArea className="h-full">
                <div className="p-6">
                  {/* Members Tab */}
                  <TabsContent value="members" className="mt-0">
                    <div className="space-y-6">
                      {/* Search and Filters */}
                      <div className="flex gap-4">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input placeholder="Search members..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
                        </div>
                        <Select value={filterRole} onValueChange={setFilterRole}>
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Filter by role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Roles</SelectItem>
                            {roles.map(role => (<SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Members List */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center justify-between">
                            <span>Team Members</span>
                            <Badge variant="secondary">{filteredMembers.length} members</Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ScrollArea className="h-96">
                            <div className="space-y-4 pr-3">
                              {filteredMembers.map((member) => (
                                <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                      <AvatarImage src={member.avatar} />
                                      <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <div className="font-medium flex items-center gap-2">
                                        {member.name}
                                        {member.role === 'Admin' && <Crown className="h-4 w-4 text-yellow-500" />}
                                        <Badge variant={member.status === 'active' ? 'default' : 'secondary'} className={member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                          {member.status}
                                        </Badge>
                                      </div>
                                      <div className="text-sm text-gray-600">{member.email}</div>
                                      <div className="text-xs text-gray-500">{member.role} • {member.department}</div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                                    {member.role !== 'Admin' && (
                                      <Button variant="ghost" size="sm" className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Roles Tab */}
                  <TabsContent value="roles" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">User Roles</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-96">
                          <div className="space-y-4 pr-3">
                            {roles.map((role) => (
                              <div key={role.id} className="p-4 border rounded-lg">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="font-medium">{role.name}</div>
                                    <div className="text-sm text-gray-600 mb-3">{role.description}</div>
                                    <div className="flex flex-wrap gap-2">
                                      {role.permissions.map((perm) => (
                                        <Badge key={perm} variant="secondary" className="text-xs">{perm}</Badge>
                                      ))}
                                    </div>
                                  </div>
                                  <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Departments Tab */}
                  <TabsContent value="departments" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Departments</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-96">
                          <div className="space-y-4 pr-3">
                            {['Leadership', 'Talent Acquisition', 'Human Resources', 'Analytics'].map((dept) => (
                              <div key={dept} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-3">
                                  <Building className="h-5 w-5 text-gray-600" />
                                  <div>
                                    <div className="font-medium">{dept}</div>
                                    <div className="text-sm text-gray-600">{teamMembers.filter(m => m.department === dept).length} members</div>
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Permissions Tab */}
                  <TabsContent value="permissions" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Available Permissions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-96">
                          <div className="space-y-4 pr-3">
                            {['Read', 'Write', 'Delete', 'Admin', 'Manage Team', 'Candidates'].map((permission) => (
                              <div key={permission} className="p-4 border rounded-lg">
                                <div className="font-medium">{permission}</div>
                                <div className="text-sm text-gray-600">Permission description for {permission.toLowerCase()}</div>
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

        {/* Invite Dialog */}
        <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input value={newMember.name} onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))} />
              </div>
              <div>
                <Label>Email Address</Label>
                <Input type="email" value={newMember.email} onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))} />
              </div>
              <div>
                <Label>Role</Label>
                <Select value={newMember.role} onValueChange={(value) => setNewMember(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {roles.map(role => (<SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowInviteDialog(false)}>Cancel</Button>
              <LoadingButton onClick={handleInviteMember} loading={loading} className="bg-[#2E5E47]">Send Invitation</LoadingButton>
            </div>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}