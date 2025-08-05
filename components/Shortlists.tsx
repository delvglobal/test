import React, { useState } from 'react';
import { BookmarkCheck, Plus, MoreVertical, Users, Share, Trash2, Edit3, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import type { ScreenType, ModalType } from '../types';

interface ShortlistsProps {
  onNavigateToScreen: (screen: ScreenType, candidateId?: string) => void;
  onOpenModal: (modal: ModalType, data?: any) => void;
}

interface Candidate {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  experience: string;
  location: string;
  skills: string[];
  title?: string;
}

interface Shortlist {
  id: string;
  name: string;
  description: string;
  candidates: Candidate[];
  status: 'active' | 'draft' | 'shared' | 'archived';
  priority: 'urgent' | 'high' | 'medium' | 'low';
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

// Mock shortlists data - optimized without client references
const shortlists: Shortlist[] = [
  {
    id: '1',
    name: 'Senior Frontend Developers',
    description: 'Experienced React/Vue.js developers for senior-level positions with modern JavaScript frameworks and strong design skills.',
    status: 'active',
    priority: 'high',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    tags: ['Frontend', 'React', 'Senior', 'Remote'],
    candidates: [
      {
        id: '1',
        name: 'Sarah Chen',
        role: 'Senior Frontend Developer',
        title: 'Senior Frontend Developer',
        experience: '5+ years',
        location: 'San Francisco, CA',
        skills: ['React', 'TypeScript', 'Vue.js'],
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b120?w=150&h=150&fit=crop&crop=face'
      },
      {
        id: '2',
        name: 'Marcus Johnson',
        role: 'Frontend Developer',
        title: 'Frontend Developer',
        experience: '4+ years',
        location: 'New York, NY',
        skills: ['React', 'Angular', 'JavaScript'],
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      {
        id: '3',
        name: 'Emily Rodriguez',
        role: 'UI/UX Developer',
        title: 'UI/UX Developer',
        experience: '6+ years',
        location: 'Austin, TX',
        skills: ['React', 'Design Systems', 'Figma'],
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
      },
      {
        id: '4',
        name: 'David Kim',
        role: 'Senior React Developer',
        title: 'Senior React Developer',
        experience: '7+ years',
        location: 'Seattle, WA',
        skills: ['React', 'Next.js', 'GraphQL'],
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      {
        id: '5',
        name: 'Anna Wilson',
        role: 'Frontend Architect',
        title: 'Frontend Architect',
        experience: '8+ years',
        location: 'Portland, OR',
        skills: ['React', 'Architecture', 'Performance'],
        avatar: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=150&h=150&fit=crop&crop=face'
      }
    ]
  },
  {
    id: '2',
    name: 'DevOps Engineers',
    description: 'Cloud infrastructure and automation specialists for scalable deployment and monitoring solutions.',
    status: 'active',
    priority: 'urgent',
    createdAt: '2024-01-18',
    updatedAt: '2024-01-22',
    tags: ['DevOps', 'Cloud', 'AWS', 'Kubernetes'],
    candidates: [
      {
        id: '6',
        name: 'Michael Torres',
        role: 'DevOps Engineer',
        title: 'DevOps Engineer',
        experience: '4+ years',
        location: 'Denver, CO',
        skills: ['AWS', 'Kubernetes', 'Terraform'],
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face'
      },
      {
        id: '7',
        name: 'Lisa Park',
        role: 'Cloud Engineer',
        title: 'Cloud Engineer',
        experience: '5+ years',
        location: 'Chicago, IL',
        skills: ['Azure', 'Docker', 'CI/CD'],
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face'
      },
      {
        id: '8',
        name: 'James Mitchell',
        role: 'Site Reliability Engineer',
        title: 'Site Reliability Engineer',
        experience: '6+ years',
        location: 'Boston, MA',
        skills: ['Monitoring', 'Automation', 'Linux'],
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
      }
    ]
  },
  {
    id: '3',
    name: 'Full-Stack Developers',
    description: 'Versatile developers with both frontend and backend expertise using modern technology stacks.',
    status: 'draft',
    priority: 'medium',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-21',
    tags: ['Full-Stack', 'Node.js', 'React', 'API'],
    candidates: [
      {
        id: '9',
        name: 'Rachel Green',
        role: 'Full-Stack Developer',
        title: 'Full-Stack Developer',
        experience: '3+ years',
        location: 'Miami, FL',
        skills: ['React', 'Node.js', 'MongoDB'],
        avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop&crop=face'
      },
      {
        id: '10',
        name: 'Kevin Wong',
        role: 'Software Engineer',
        title: 'Software Engineer',
        experience: '4+ years',
        location: 'San Diego, CA',
        skills: ['Vue.js', 'Python', 'PostgreSQL'],
        avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face'
      }
    ]
  },
  {
    id: '4',
    name: 'Mobile Developers',
    description: 'Native and cross-platform mobile application developers for iOS and Android platforms.',
    status: 'shared',
    priority: 'medium',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-19',
    tags: ['Mobile', 'React Native', 'iOS', 'Android'],
    candidates: [
      {
        id: '11',
        name: 'Alex Thompson',
        role: 'Mobile Developer',
        title: 'Mobile Developer',
        experience: '5+ years',
        location: 'Phoenix, AZ',
        skills: ['React Native', 'iOS', 'Android'],
        avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face'
      },
      {
        id: '12',
        name: 'Jordan Lee',
        role: 'iOS Developer',
        title: 'iOS Developer',
        experience: '4+ years',
        location: 'Nashville, TN',
        skills: ['Swift', 'SwiftUI', 'Core Data'],
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face'
      },
      {
        id: '13',
        name: 'Taylor Swift',
        role: 'Android Developer',
        title: 'Android Developer',
        experience: '3+ years',
        location: 'Atlanta, GA',
        skills: ['Kotlin', 'Jetpack Compose', 'Firebase'],
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
      }
    ]
  }
];

export function Shortlists({ onNavigateToScreen, onOpenModal }: ShortlistsProps) {
  const [selectedShortlist, setSelectedShortlist] = useState<string | null>(null);

  const handleCandidateClick = (candidateId: string) => {
    onNavigateToScreen('candidate-detail', candidateId);
  };

  const handleViewShortlist = (shortlistId: string) => {
    const shortlist = shortlists.find(s => s.id === shortlistId);
    if (shortlist) {
      // Transform shortlist data for modal
      const modalData = {
        id: shortlist.id,
        name: shortlist.name,
        candidates: shortlist.candidates,
        views: Math.floor(Math.random() * 100) + 10, // Mock views data
        updatedAt: shortlist.updatedAt
      };
      onOpenModal('shortlist-preview', modalData);
    }
  };

  const handleViewCandidates = (shortlistId: string) => {
    setSelectedShortlist(shortlistId);
    onNavigateToScreen('candidates');
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-700',
      draft: 'bg-gray-100 text-gray-600',
      shared: 'bg-blue-100 text-blue-700',
      archived: 'bg-orange-100 text-orange-700'
    };
    return variants[status as keyof typeof variants] || variants.draft;
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      urgent: 'bg-red-100 text-red-700',
      high: 'bg-orange-100 text-orange-700',
      medium: 'bg-yellow-100 text-yellow-700',
      low: 'bg-gray-100 text-gray-600'
    };
    return variants[priority as keyof typeof variants] || variants.medium;
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Responsive Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1 sm:space-y-2">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Shortlists</h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage and organize candidate collections for efficient hiring
          </p>
        </div>
        <Button 
          onClick={() => onOpenModal('create-shortlist')} 
          className="bg-[#2E5E47] hover:bg-[#1d3d2b] text-white w-full sm:w-auto"
          size="lg"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Shortlist
        </Button>
      </div>

      {/* Fully Responsive Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="glass-card">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Shortlists</p>
                <p className="text-2xl sm:text-3xl font-semibold text-gray-900">{shortlists.length}</p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-[#2E5E47]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookmarkCheck className="h-5 w-5 sm:h-6 sm:w-6 text-[#2E5E47]" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Active Lists</p>
                <p className="text-2xl sm:text-3xl font-semibold text-gray-900">
                  {shortlists.filter(s => s.status === 'active').length}
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-green-500"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Candidates</p>
                <p className="text-2xl sm:text-3xl font-semibold text-gray-900">
                  {shortlists.reduce((acc, s) => acc + s.candidates.length, 0)}
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-[#E4B063]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-[#E4B063]" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Urgent Lists</p>
                <p className="text-2xl sm:text-3xl font-semibold text-gray-900">
                  {shortlists.filter(s => s.priority === 'urgent').length}
                </p>
              </div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-red-500"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fully Responsive Shortlists Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {shortlists.map((shortlist) => (
          <Card 
            key={shortlist.id} 
            className="group shortlist-card-optimized hover:shadow-xl transition-all duration-300 cursor-pointer border-0"
            onClick={() => handleViewShortlist(shortlist.id)}
          >
            {/* Mobile-Optimized Header Section */}
            <CardHeader className="pb-3 sm:pb-4 space-y-2 sm:space-y-3">
              {/* Title Row - Responsive */}
              <div className="flex items-start justify-between gap-2 sm:gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate group-hover:text-[#2E5E47] transition-colors">
                    {shortlist.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mt-1 leading-5">
                    {shortlist.description}
                  </p>
                </div>
                
                <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                  <Badge className={`text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 font-medium border-0 ${getStatusBadge(shortlist.status)}`}>
                    {shortlist.status}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 opacity-60 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        handleViewShortlist(shortlist.id);
                      }}>
                        <BookmarkCheck className="h-4 w-4 mr-2" />
                        View Shortlist
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        handleViewCandidates(shortlist.id);
                      }}>
                        <Users className="h-4 w-4 mr-2" />
                        Browse Candidates
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        onNavigateToScreen('edit-shortlist', shortlist.id);
                      }}>
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit Shortlist
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                        <Share className="h-4 w-4 mr-2" />
                        Share Shortlist
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-red-600 focus:text-red-600"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Shortlist
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Metrics Row - Mobile Optimized */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Badge className={`text-xs px-1.5 sm:px-2 py-0.5 border-0 font-medium ${getPriorityBadge(shortlist.priority)}`}>
                    {shortlist.priority}
                  </Badge>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm font-medium text-gray-900">
                    {shortlist.candidates.length} candidates
                  </span>
                </div>
                
                {/* Candidate Avatars - Touch Friendly */}
                <div className="flex -space-x-1 sm:-space-x-1.5">
                  {shortlist.candidates.slice(0, 3).map((candidate, index) => (
                    <Avatar 
                      key={candidate.id}
                      className="h-6 w-6 sm:h-7 sm:w-7 border-2 border-white ring-1 ring-gray-200"
                    >
                      <AvatarImage src={candidate.avatar} alt={candidate.name} />
                      <AvatarFallback className="text-xs bg-[#2E5E47] text-white">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {shortlist.candidates.length > 3 && (
                    <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-gray-100 border-2 border-white ring-1 ring-gray-200 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">
                        +{shortlist.candidates.length - 3}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0 space-y-3 sm:space-y-4">
              {/* Tags Row - Responsive Wrapping */}
              {shortlist.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {shortlist.tags.slice(0, 3).map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className="text-xs px-1.5 sm:px-2 py-0.5 bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {shortlist.tags.length > 3 && (
                    <Badge 
                      variant="outline" 
                      className="text-xs px-1.5 sm:px-2 py-0.5 bg-gray-50 text-gray-500 border-gray-200"
                    >
                      +{shortlist.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}

              {/* Top Candidates List - Mobile Optimized */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">Top Candidates</span>
                </div>
                
                <div className="space-y-1 sm:space-y-1.5">
                  {shortlist.candidates.slice(0, 2).map((candidate) => (
                    <button
                      key={candidate.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCandidateClick(candidate.id);
                      }}
                      className="w-full flex items-center gap-2 sm:gap-2.5 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left group/candidate touch-action-manipulation"
                    >
                      <Avatar className="h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0">
                        <AvatarImage src={candidate.avatar} alt={candidate.name} />
                        <AvatarFallback className="text-xs bg-[#2E5E47] text-white">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium text-gray-900 group-hover/candidate:text-[#2E5E47] transition-colors truncate block">
                          {candidate.name}
                        </span>
                        <span className="text-xs text-gray-500 truncate block">
                          {candidate.experience} • {candidate.title}
                        </span>
                      </div>
                    </button>
                  ))}
                  
                  {shortlist.candidates.length > 2 && (
                    <div className="text-xs text-gray-500 px-2 py-1">
                      +{shortlist.candidates.length - 2} more candidates
                    </div>
                  )}
                </div>
              </div>

              {/* Actions Row - Mobile Optimized */}
              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 bg-[#2E5E47] text-white border-[#2E5E47] hover:bg-[#1d3d2b] hover:border-[#1d3d2b] touch-action-manipulation min-h-[44px] sm:min-h-[36px]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewShortlist(shortlist.id);
                  }}
                >
                  <BookmarkCheck className="h-3 w-3 mr-1.5" />
                  <span className="hidden sm:inline">View Details</span>
                  <span className="sm:hidden">View</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="px-2 sm:px-3 hover:bg-gray-50 touch-action-manipulation min-h-[44px] sm:min-h-[36px] min-w-[44px] sm:min-w-[36px]"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle share action
                  }}
                >
                  <Share className="h-3 w-3" />
                </Button>
              </div>

              {/* Footer Metadata - Mobile Optimized */}
              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span className="hidden sm:inline">Updated {new Date(shortlist.updatedAt).toLocaleDateString()}</span>
                    <span className="sm:hidden">{new Date(shortlist.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <span>#{shortlist.id}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Responsive Empty State */}
      {shortlists.length === 0 && (
        <div className="text-center py-8 sm:py-12 px-4">
          <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <BookmarkCheck className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No shortlists yet</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-md mx-auto">
            Create your first shortlist to organize and manage candidate collections for efficient hiring.
          </p>
          <Button 
            onClick={() => onOpenModal('create-shortlist')}
            className="bg-[#2E5E47] hover:bg-[#1d3d2b] text-white w-full sm:w-auto"
            size="lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create First Shortlist
          </Button>
        </div>
      )}
    </div>
  );
}