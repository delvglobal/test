import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Share, 
  Download, 
  Edit3, 
  MoreVertical, 
  Grid,
  List,
  MapPin,
  Calendar,
  Star,
  Clock,
  Users,
  BookmarkCheck,
  Eye,
  Link,
  ChevronDown,
  ChevronUp,
  Info,
  CheckCircle,
  Video,
  Target,
  Briefcase,
  Settings,
  ExternalLink
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from './ui/utils';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import type { ScreenType, ModalType } from '../types';

// Mock shortlist data
const mockShortlist = {
  id: '1',
  name: 'Frontend Seniors',
  description: 'Senior frontend developers with React expertise for our new product team. Looking for candidates with 5+ years experience in modern JavaScript frameworks.',
  candidates: [
    {
      id: '1',
      name: 'Sarah Johnson',
      isVerified: true,
      availabilityStatus: 'Available for Work',
      timezone: 'PST',
      country: 'United States',
      countryFlag: '🇺🇸',
      experience: '6 yrs',
      languages: ['English', 'Spanish'],
      hourlyRate: '$75-95/hr',
      weeklyAvailability: '40+ hours/week',
      jobType: 'Full-time',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b120?w=150&h=150&fit=crop&crop=face',
      workRoles: [
        { title: 'Senior React Developer', experience: '4 yr' },
        { title: 'Frontend Team Lead', experience: '2 yr' },
        { title: 'UI/UX Developer', experience: '3 yr' }
      ],
      skills: ['React', 'TypeScript', 'GraphQL', 'Next.js', 'Redux', 'Jest'],
      tools: ['VS Code', 'Figma', 'GitHub', 'Docker', 'AWS', 'Vercel'],
      profileUrl: 'https://delv.global/candidate/sarah-johnson'
    },
    {
      id: '2',
      name: 'Michael Chen',
      isVerified: true,
      availabilityStatus: 'Available Soon',
      timezone: 'EST',
      country: 'Canada',
      countryFlag: '🇨🇦',
      experience: '8 yrs',
      languages: ['English', 'Mandarin'],
      hourlyRate: '$85-110/hr',
      weeklyAvailability: '35+ hours/week',
      jobType: 'Contract',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      workRoles: [
        { title: 'Frontend Architect', experience: '3 yr' },
        { title: 'Vue.js Specialist', experience: '5 yr' },
        { title: 'Technical Lead', experience: '2 yr' }
      ],
      skills: ['Vue.js', 'React', 'GraphQL', 'TypeScript', 'Nuxt.js', 'Cypress'],
      tools: ['VS Code', 'Sketch', 'GitLab', 'Kubernetes', 'GCP', 'Netlify'],
      profileUrl: 'https://delv.global/candidate/michael-chen'
    },
    {
      id: '3',
      name: 'Emma Wilson',
      isVerified: false,
      availabilityStatus: 'Open to Offers',
      timezone: 'CST',
      country: 'Mexico',
      countryFlag: '🇲🇽',
      experience: '5 yrs',
      languages: ['Spanish', 'English'],
      hourlyRate: '$60-80/hr',
      weeklyAvailability: '40+ hours/week',
      jobType: 'Full-time',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      workRoles: [
        { title: 'React Developer', experience: '3 yr' },
        { title: 'Full-stack Developer', experience: '2 yr' },
        { title: 'Mobile Developer', experience: '1 yr' }
      ],
      skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'React Native', 'Tailwind'],
      tools: ['VS Code', 'Adobe XD', 'GitHub', 'Heroku', 'MongoDB', 'Stripe'],
      profileUrl: 'https://delv.global/candidate/emma-wilson'
    },
    {
      id: '4',
      name: 'David Rodriguez',
      isVerified: true,
      availabilityStatus: 'Available for Work',
      timezone: 'PST',
      country: 'United States',
      countryFlag: '🇺🇸',
      experience: '7 yrs',
      languages: ['English'],
      hourlyRate: '$80-100/hr',
      weeklyAvailability: '30+ hours/week',
      jobType: 'Part-time',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      workRoles: [
        { title: 'React Specialist', experience: '5 yr' },
        { title: 'Redux Expert', experience: '4 yr' },
        { title: 'Performance Engineer', experience: '2 yr' }
      ],
      skills: ['React', 'Redux', 'JavaScript', 'Webpack', 'Performance', 'Testing'],
      tools: ['VS Code', 'Chrome DevTools', 'GitHub', 'Jenkins', 'New Relic', 'Sentry'],
      profileUrl: 'https://delv.global/candidate/david-rodriguez'
    }
  ],
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-19T14:30:00Z',
  viewCount: 124,
  tags: ['Frontend', 'React', 'Senior', 'Remote-OK'],
  clientVisible: true,
  shareableLink: 'https://delv.global/shortlists/frontend-seniors-abc123'
};

interface ShortlistDetailProps {
  shortlistId?: string;
  onNavigateToScreen: (screen: ScreenType, entityId?: string) => void;
  onOpenModal: (modal: ModalType) => void;
  sidebarOpen?: boolean;
  isMobile?: boolean;
  isTablet?: boolean;
}

export function ShortlistDetail({
  shortlistId,
  onNavigateToScreen,
  onOpenModal,
  sidebarOpen = false,
  isMobile = false,
  isTablet = false
}: ShortlistDetailProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showDetails, setShowDetails] = useState(false);
  
  const shortlist = mockShortlist; // In real app, fetch by shortlistId

  const handleViewProfile = (profileUrl: string) => {
    window.open(profileUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(shortlist.shareableLink);
    // In real app, show toast notification
  };

  const handleExport = () => {
    // In real app, trigger export functionality
    console.log('Exporting shortlist...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner - Full Width */}
      <div className="shortlist-header-banner">
        <div className="shortlist-container py-8">
          <div className="flex items-center justify-between">
            {/* Left: Breadcrumb + Title */}
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigateToScreen('shortlists')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-white/60 transition-all duration-200 rounded-lg px-3 py-1.5 flex-shrink-0"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="font-medium">Back to Shortlists</span>
              </Button>
              
              <div className="h-5 w-px bg-gray-300" />
              
              <div className="min-w-0">
                <h1 className="text-2xl font-semibold text-gray-900 mb-1">{shortlist.name}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{shortlist.candidates.length} candidates</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {shortlist.viewCount} views
                  </span>
                  <span>•</span>
                  <span>Updated {new Date(shortlist.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            {/* Right: View Toggle + Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* View Toggle */}
              <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 w-8 p-0"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Actions Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => onNavigateToScreen('shortlist-page-wrapper')}>
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Client View
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleShare}>
                    <Share className="h-4 w-4 mr-2" />
                    Share Link
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExport}>
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Shortlist
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="shortlist-container py-10">
        {/* Shortlist Details Card */}
        <Collapsible open={showDetails} onOpenChange={setShowDetails}>
          <Card className="mb-6">
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-gray-500" />
                    <CardTitle className="text-base">Shortlist Details</CardTitle>
                  </div>
                  {showDetails ? (
                    <ChevronUp className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  )}
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600 leading-relaxed">{shortlist.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {shortlist.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Shareable Link</h4>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <Link className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <code className="text-sm text-gray-600 flex-1 min-w-0 truncate">
                        {shortlist.shareableLink}
                      </code>
                      <Button variant="outline" size="sm" onClick={handleShare}>
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Candidates Grid */}
        <div className={cn(
          "gap-6",
          viewMode === 'grid' ? "grid grid-cols-1 lg:grid-cols-2" : "space-y-6"
        )}>
          {shortlist.candidates.map((candidate) => (
            <Card 
              key={candidate.id}
              className="shortlist-candidate-card"
            >
              <CardContent className="p-6">
                {/* Header Section */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <Avatar className="h-16 w-16 flex-shrink-0">
                      <AvatarImage src={candidate.avatar} alt={candidate.name} />
                      <AvatarFallback className="bg-[#2E5E47] text-white text-lg">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {candidate.isVerified && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{candidate.name}</h3>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Button variant="outline" size="sm" className="bg-[#2E5E47] text-white border-[#2E5E47] hover:bg-[#1d3d2b]">
                          <Video className="h-3 w-3 mr-1" />
                          Video
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              Details
                              <ChevronDown className="h-3 w-3 ml-1" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewProfile(candidate.profileUrl)}>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Full Profile
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "mb-2 text-xs",
                        candidate.availabilityStatus === 'Available for Work' && "bg-green-100 text-green-700"
                      )}
                    >
                      {candidate.availabilityStatus}
                    </Badge>
                  </div>
                </div>

                {/* Location & Experience Row */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {candidate.timezone}
                  </span>
                  <span className="flex items-center gap-1">
                    <span>{candidate.countryFlag}</span>
                    {candidate.country}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    {candidate.experience}
                  </span>
                </div>

                {/* Languages */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-purple-600">✨</span>
                  <span className="text-sm text-gray-600">Languages:</span>
                  <span className="text-sm text-gray-900">{candidate.languages.join(', ')}</span>
                </div>

                {/* Rate & Availability Grid */}
                <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Hourly Rate</p>
                    <p className="text-sm font-semibold text-gray-900">{candidate.hourlyRate}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Availability</p>
                    <p className="text-sm font-semibold text-gray-900">{candidate.weeklyAvailability}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Job Type</p>
                    <p className="text-sm font-semibold text-gray-900">{candidate.jobType}</p>
                  </div>
                </div>

                {/* Work Roles */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900">I can work as</span>
                    <Badge variant="secondary" className="text-xs bg-gray-200 text-gray-600">
                      +{candidate.workRoles.length - 1} more
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    {candidate.workRoles.slice(0, 2).map((role, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-900">{role.title}</span>
                        <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                          {role.experience}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Settings className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium text-gray-900">Skills</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.slice(0, 6).map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="secondary" 
                        className="candidate-skill-badge text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                    {candidate.skills.length > 6 && (
                      <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                        +{candidate.skills.length - 6} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Tools & Technologies */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-4 w-4 bg-green-500 rounded-sm flex items-center justify-center">
                      <div className="h-2 w-2 bg-white rounded-sm"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">Tools &amp; Technologies</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {candidate.tools.slice(0, 5).map((tool) => (
                      <Badge 
                        key={tool} 
                        variant="secondary" 
                        className="candidate-tool-badge text-xs"
                      >
                        {tool}
                      </Badge>
                    ))}
                    {candidate.tools.length > 5 && (
                      <Badge variant="secondary" className="text-xs bg-green-50 text-green-700">
                        +{candidate.tools.length - 5} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* View Profile Button */}
                <Button 
                  onClick={() => handleViewProfile(candidate.profileUrl)}
                  className="w-full bg-[#2E5E47] hover:bg-[#1d3d2b] text-white"
                >
                  View Profile
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {shortlist.candidates.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="space-y-4">
                <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">No candidates yet</h3>
                  <p className="text-gray-500 text-sm">This shortlist doesn't have any candidates.</p>
                </div>
                <Button onClick={() => onNavigateToScreen('candidates')}>
                  Browse Candidates
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}