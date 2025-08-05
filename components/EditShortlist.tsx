import React, { useState } from 'react';
import { cn } from './ui/utils';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { CandidateCardSmall } from './CandidateCardSmall';
import { CandidatePickerModal } from './modals/CandidatePickerModal';
import { ShortlistPreviewModal } from './modals/ShortlistPreviewModal';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { toast } from 'sonner';
import { 
  Plus, 
  Share2, 
  Trash2, 
  X,
  Calendar,
  Target,
  Building,
  Tag,
  Lock,
  Users
} from 'lucide-react';
import type { Candidate, Shortlist } from '../types';

// Mock data for demonstration
const mockShortlist: Shortlist = {
  id: 'sl-1',
  name: 'Frontend Senior Developers',
  description: 'Senior-level frontend developers with React expertise for our Q2 expansion',
  candidateIds: ['1', '2', '3', '4'],
  clientId: 'client-1',
  jobRequirementId: 'req-1',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-20T14:30:00Z',
  sharedWith: ['recruiter@company.com', 'hr@company.com'],
  status: 'draft'
};

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    title: 'Senior Frontend Developer',
    role: 'Frontend Developer',
    experience: '6 years',
    location: 'San Francisco, CA',
    country: 'United States',
    countryFlag: '🇺🇸',
    skills: ['React', 'TypeScript', 'Next.js', 'GraphQL'],
    tools: ['Figma', 'VS Code', 'Git', 'Docker'],
    languages: ['English', 'Mandarin'],
    summary: 'Experienced frontend developer with expertise in React ecosystem',
    status: 'available',
    rating: 4.8,
    rate: 120,
    currency: 'USD',
    timezone: 'PST',
    timezoneOffset: '-8',
    verified: true,
    availability: 'immediate',
    lastUpdated: '2024-01-20T10:00:00Z',
    source: 'database_sync',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b120?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2', 
    name: 'Marcus Rodriguez',
    email: 'marcus.rodriguez@email.com',
    title: 'Frontend Team Lead',
    role: 'Frontend Developer',
    experience: '8 years',
    location: 'Austin, TX',
    country: 'United States',
    countryFlag: '🇺🇸',
    skills: ['React', 'Vue.js', 'JavaScript', 'CSS'],
    tools: ['Webpack', 'Jest', 'Cypress', 'Storybook'],
    languages: ['English', 'Spanish'],
    summary: 'Frontend team leader with strong technical and leadership skills',
    status: 'available',
    rating: 4.9,
    rate: 135,
    currency: 'USD',
    timezone: 'CST',
    timezoneOffset: '-6',
    verified: true,
    availability: 'short',
    lastUpdated: '2024-01-19T15:30:00Z',
    source: 'database_sync',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  }
];

interface EditShortlistProps {
  shortlistId?: string;
  onNavigateToScreen?: (screen: any) => void;
  onBack?: () => void;
}

export function EditShortlist({ shortlistId, onNavigateToScreen, onBack }: EditShortlistProps) {
  const [shortlist, setShortlist] = useState(mockShortlist);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [showCandidatePicker, setShowCandidatePicker] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [formData, setFormData] = useState({
    name: shortlist.name,
    description: shortlist.description || '',
    clientId: shortlist.clientId || '',
    priority: 'medium',
    tags: ['React', 'Senior', 'Frontend'],
    isPrivate: false,
    deadline: '2024-03-01'
  });

  const handleSelectCandidate = (candidateId: string) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateId) 
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCandidates.length === mockCandidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(mockCandidates.map(c => c.id));
    }
  };

  const handleRemoveSelected = () => {
    toast.success(`Removed ${selectedCandidates.length} candidate(s) from shortlist`);
    setSelectedCandidates([]);
  };

  const handleAddCandidates = (candidateIds: string[]) => {
    toast.success(`Added ${candidateIds.length} candidate(s) to shortlist`);
    setShowCandidatePicker(false);
  };

  const handleSaveSettings = () => {
    setShortlist(prev => ({
      ...prev,
      name: formData.name,
      description: formData.description,
      clientId: formData.clientId,
      updatedAt: new Date().toISOString()
    }));
    toast.success('Shortlist settings saved successfully');
  };

  const handleDeleteShortlist = () => {
    toast.success('Shortlist deleted successfully');
    onBack?.();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6" style={{ maxWidth: '1440px', padding: '0 24px' }}>
          {/* Header Content */}
          <div className="space-y-4">
            {/* Title and Stats */}
            <div className="space-y-2">
              <h1 className="text-4xl font-semibold text-[#1E1E1E]" style={{ fontSize: '32px', lineHeight: '40px' }}>
                {shortlist.name}
              </h1>
              <div className="text-base text-[#4A4A4A]" style={{ fontSize: '16px' }}>
                {mockCandidates.length} candidates • 47 views • Updated {formatDate(shortlist.updatedAt)}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => setShowCandidatePicker(true)}
                className="bg-[#008080] hover:bg-[#006666] text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Candidates
              </Button>
              
              <Button 
                variant="ghost" 
                onClick={() => setShowPreviewModal(true)}
                className="text-[#1E1E1E] hover:bg-gray-100"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Shortlist</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{shortlist.name}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDeleteShortlist}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8" style={{ maxWidth: '1440px', padding: '48px 24px' }}>
        <Tabs defaultValue="candidates" className="space-y-6">
          {/* Tabs Header */}
          <TabsList className="grid w-full grid-cols-2 max-w-md bg-[#F8F9FA] p-1">
            <TabsTrigger 
              value="candidates" 
              className="data-[state=active]:bg-white data-[state=active]:text-[#1E1E1E]"
            >
              Candidates
            </TabsTrigger>
            <TabsTrigger 
              value="settings"
              className="data-[state=active]:bg-white data-[state=active]:text-[#1E1E1E]"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Candidates Tab */}
          <TabsContent value="candidates" className="space-y-6">
            {/* Bulk Action Bar */}
            {selectedCandidates.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-blue-800 font-medium">
                    {selectedCandidates.length} selected
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCandidates([])}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  onClick={handleRemoveSelected}
                  className="text-red-600 hover:text-red-800 hover:bg-red-50"
                >
                  Remove from Shortlist
                </Button>
              </div>
            )}

            {/* Candidate Grid */}
            <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))' }}>
              {mockCandidates.map((candidate) => (
                <CandidateCardSmall
                  key={candidate.id}
                  candidate={candidate}
                  noteEditable={true}
                  isSelected={selectedCandidates.includes(candidate.id)}
                  onSelect={() => handleSelectCandidate(candidate.id)}
                />
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="max-w-2xl space-y-6 bg-white rounded-xl p-6 border border-gray-200">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1E1E1E] flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Basic Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="shortlist-name">Shortlist Name</Label>
                    <Input
                      id="shortlist-name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="mt-2"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Client & Priority */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1E1E1E] flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Assignment
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="client">Client</Label>
                    <Select value={formData.clientId} onValueChange={(value) => setFormData(prev => ({ ...prev, clientId: value }))}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="client-1">TechCorp Inc.</SelectItem>
                        <SelectItem value="client-2">StartupXYZ</SelectItem>
                        <SelectItem value="client-3">Enterprise Ltd.</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Tags & Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1E1E1E] flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Tags & Preferences
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <Label>Tags</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-[#F8F9FA] text-[#1E1E1E]">
                          {tag}
                          <button
                            onClick={() => setFormData(prev => ({
                              ...prev,
                              tags: prev.tags.filter((_, i) => i !== index)
                            }))}
                            className="ml-2 hover:text-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-lg">
                    <div className="flex items-center gap-3">
                      <Lock className="h-5 w-5 text-gray-600" />
                      <div>
                        <Label className="text-[#1E1E1E]">Private List</Label>
                        <p className="text-sm text-gray-600">Only visible to you</p>
                      </div>
                    </div>
                    <Switch
                      checked={formData.isPrivate}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPrivate: checked }))}
                    />
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1E1E1E] flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Timeline
                </h3>
                
                <div>
                  <Label htmlFor="deadline">Target Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <Button variant="ghost" onClick={onBack}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveSettings}
                  className="bg-[#008080] hover:bg-[#006666] text-white"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <CandidatePickerModal
        open={showCandidatePicker}
        onOpenChange={setShowCandidatePicker}
        onAddCandidates={handleAddCandidates}
      />

      <ShortlistPreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        shortlist={shortlist}
        onCandidateView={(candidateId) => {
          onNavigateToScreen?.('candidate-detail');
        }}
        onCandidateAction={(action, candidateId) => {
          toast.success(`${action} action triggered for candidate ${candidateId}`);
        }}
      />
    </div>
  );
}