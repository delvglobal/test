import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CandidateFilterDrawer } from './CandidateFilterDrawer';
import { CandidateCardTile } from './CandidateCardTile';
import { Checkbox } from './ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Plus,
  Download,
  MoreVertical,
  SortAsc,
  SortDesc,
  Filter,
  Search,
  X,
  Users,
  FolderPlus,
  Mail,
  Archive,
  Trash2
} from 'lucide-react';
import { cn } from './ui/utils';
import type { Candidate, ScreenType, ModalType } from '../types';

interface CandidateListProps {
  onNavigateToScreen: (screen: ScreenType, candidateId?: string) => void;
  onOpenModal: (modal: ModalType) => void;
}

// Enhanced mock data with comprehensive details
const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Jane Martínez',
    email: 'jane.martinez@example.com',
    phone: '+52-555-0123',
    position: 'Healthcare Virtual Assistant',
    status: 'new',
    location: 'Mexico City, Mexico',
    country: 'Mexico',
    countryFlag: '🇲🇽',
    experience: '3 years',
    skills: ['Client Care', 'Scheduling', 'EMR', 'Patient Support', 'Medical Administration', 'HIPAA Compliance'],
    tools: ['Epic EMR', 'Cerner', 'IntakeQ', '8x8 Phone', 'Calendly', 'Microsoft Office'],
    source: 'referral',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b120?w=150&h=150&fit=crop&crop=face',
    role: 'Healthcare Virtual Assistant',
    rate: 8.50,
    currency: '$',
    timezone: 'CST',
    timezoneOffset: 'UTC-6',
    languages: ['Spanish', 'English'],
    availability: 'immediate',
    matchScore: 94,
    lastActivity: '2 hours ago',
    certifications: ['HIPAA Certified', 'Medical Assistant'],
    workPreference: 'remote',
    contractType: 'fulltime',
    education: 'associates'
  },
  {
    id: '2',
    name: 'Carlos Rodriguez',
    email: 'carlos.rodriguez@example.com',
    phone: '+52-555-0124',
    position: 'Full Stack Developer',
    status: 'screening',
    location: 'Guadalajara, Mexico',
    country: 'Mexico',
    countryFlag: '🇲🇽',
    experience: '5 years',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'GraphQL', 'PostgreSQL'],
    tools: ['VS Code', 'Git', 'Docker', 'Figma', 'Slack', 'Jira', 'Postman'],
    source: 'linkedin',
    createdAt: '2024-01-14',
    updatedAt: '2024-01-16',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    role: 'Full Stack Developer',
    rate: 25.00,
    currency: '$',
    timezone: 'CST',
    timezoneOffset: 'UTC-6',
    languages: ['Spanish', 'English'],
    availability: 'short',
    matchScore: 88,
    lastActivity: '1 day ago',
    certifications: ['AWS Solutions Architect', 'MongoDB Certified'],
    workPreference: 'hybrid',
    contractType: 'contract',
    education: 'bachelors'
  },
  {
    id: '3',
    name: 'Ana Silva',
    email: 'ana.silva@example.com',
    phone: '+55-11-9999-0123',
    position: 'Digital Marketing Specialist',
    status: 'interview',
    location: 'São Paulo, Brazil',
    country: 'Brazil',
    countryFlag: '🇧🇷',
    experience: '4 years',
    skills: ['Social Media Marketing', 'Google Ads', 'SEO', 'Content Creation', 'Analytics', 'Email Marketing'],
    tools: ['Hootsuite', 'Google Analytics', 'Canva', 'Adobe Creative', 'HubSpot', 'Mailchimp'],
    source: 'website',
    createdAt: '2024-01-13',
    updatedAt: '2024-01-17',
    verified: false,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    role: 'Digital Marketing Specialist',
    rate: 18.00,
    currency: '$',
    timezone: 'BRT',
    timezoneOffset: 'UTC-3',
    languages: ['Portuguese', 'English', 'Spanish'],
    availability: 'medium',
    matchScore: 76,
    lastActivity: '3 hours ago',
    certifications: ['Google Analytics Certified', 'HubSpot Certified'],
    workPreference: 'remote',
    contractType: 'fulltime',
    education: 'bachelors'
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@example.com',
    phone: '+1-555-0125',
    position: 'UX Designer',
    status: 'offer',
    location: 'Toronto, Canada',
    country: 'Canada',
    countryFlag: '🇨🇦',
    experience: '6 years',
    skills: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping', 'Design Systems', 'Accessibility'],
    tools: ['Figma', 'Sketch', 'Adobe XD', 'Principle', 'Miro', 'InVision'],
    source: 'referral',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-18',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'UX Designer',
    rate: 35.00,
    currency: '$',
    timezone: 'EST',
    timezoneOffset: 'UTC-5',
    languages: ['English', 'Korean'],
    availability: 'immediate',
    matchScore: 92,
    lastActivity: '5 minutes ago',
    certifications: ['Google UX Design', 'Adobe Certified'],
    workPreference: 'hybrid',
    contractType: 'fulltime',
    education: 'masters'
  },
  {
    id: '5',
    name: 'Maria González',
    email: 'maria.gonzalez@example.com',
    phone: '+34-600-123456',
    position: 'Content Writer',
    status: 'new',
    location: 'Madrid, Spain',
    country: 'Spain',
    countryFlag: '🇪🇸',
    experience: '2 years',
    skills: ['Content Writing', 'Copywriting', 'SEO Writing', 'Blog Writing', 'Social Media', 'Translation'],
    tools: ['WordPress', 'Grammarly', 'Hemingway', 'Ahrefs', 'Google Docs', 'Canva'],
    source: 'website',
    createdAt: '2024-01-16',
    updatedAt: '2024-01-16',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    role: 'Content Writer',
    rate: 12.00,
    currency: '$',
    timezone: 'CET',
    timezoneOffset: 'UTC+1',
    languages: ['Spanish', 'English', 'French'],
    availability: 'medium',
    matchScore: 85,
    lastActivity: '1 hour ago',
    certifications: ['Google Analytics Certified'],
    workPreference: 'remote',
    contractType: 'freelance',
    education: 'bachelors'
  },
  {
    id: '6',
    name: 'Sophie Laurent',
    email: 'sophie.laurent@example.com',
    phone: '+33-6-12345678',
    position: 'Project Manager',
    status: 'screening',
    location: 'Paris, France',
    country: 'France',
    countryFlag: '🇫🇷',
    experience: '7 years',
    skills: ['Project Management', 'Agile', 'Scrum', 'Team Leadership', 'Risk Management', 'Stakeholder Management'],
    tools: ['Jira', 'Asana', 'Slack', 'Microsoft Project', 'Trello', 'Zoom'],
    source: 'linkedin',
    createdAt: '2024-01-11',
    updatedAt: '2024-01-17',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    role: 'Project Manager',
    rate: 45.00,
    currency: '$',
    timezone: 'CET',
    timezoneOffset: 'UTC+1',
    languages: ['French', 'English', 'German'],
    availability: 'immediate',
    matchScore: 91,
    lastActivity: '30 minutes ago',
    certifications: ['PMP', 'Scrum Master', 'Agile Certified'],
    workPreference: 'hybrid',
    contractType: 'fulltime',
    education: 'masters'
  },
  {
    id: '7',
    name: 'Raj Patel',
    email: 'raj.patel@example.com',
    phone: '+91-98765-43210',
    position: 'Data Scientist',
    status: 'new',
    location: 'Bangalore, India',
    country: 'India',
    countryFlag: '🇮🇳',
    experience: '4 years',
    skills: ['Machine Learning', 'Python', 'R', 'SQL', 'Data Analysis', 'TensorFlow', 'PyTorch'],
    tools: ['Jupyter', 'Pandas', 'NumPy', 'Tableau', 'Power BI', 'Git'],
    source: 'referral',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    role: 'Data Scientist',
    rate: 22.00,
    currency: '$',
    timezone: 'IST',
    timezoneOffset: 'UTC+5:30',
    languages: ['English', 'Hindi', 'Gujarati'],
    availability: 'short',
    matchScore: 89,
    lastActivity: '4 hours ago',
    certifications: ['Google Cloud Professional', 'TensorFlow Certified'],
    workPreference: 'remote',
    contractType: 'contract',
    education: 'masters'
  },
  {
    id: '8',
    name: 'Emily Chen',
    email: 'emily.chen@example.com',
    phone: '+61-412-345-678',
    position: 'Frontend Developer',
    status: 'interview',
    location: 'Sydney, Australia',
    country: 'Australia',
    countryFlag: '🇦🇺',
    experience: '3 years',
    skills: ['React', 'Vue.js', 'JavaScript', 'TypeScript', 'CSS', 'HTML', 'Tailwind CSS'],
    tools: ['VS Code', 'Git', 'Webpack', 'Vite', 'Figma', 'Chrome DevTools'],
    source: 'website',
    createdAt: '2024-01-09',
    updatedAt: '2024-01-17',
    verified: false,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    role: 'Frontend Developer',
    rate: 28.00,
    currency: '$',
    timezone: 'AEST',
    timezoneOffset: 'UTC+10',
    languages: ['English', 'Chinese'],
    availability: 'medium',
    matchScore: 82,
    lastActivity: '6 hours ago',
    certifications: ['React Certified'],
    workPreference: 'remote',
    contractType: 'fulltime',
    education: 'bachelors'
  }
];

// FilterState interface matching the comprehensive filter drawer
interface FilterState {
  search: string;
  regions: string[];
  countries: string[];
  timezones: string[];
  roles: string[];
  rateRange: [number, number];
  experienceRange: [number, number];
  availability: string[];
  languages: string[];
  education: string[];
  verified: boolean | null;
  skills: string[];
  tools: string[];
  certifications: string[];
  workPreference: string[];
  contractType: string[];
  portfolioRequired: boolean | null;
  githubRequired: boolean | null;
  linkedinRequired: boolean | null;
  matchScoreRange: [number, number];
  lastActiveRange: string;
  salaryExpectationRange: [number, number];
  noticePeriod: string[];
}

const initialFilters: FilterState = {
  search: '',
  regions: [],
  countries: [],
  timezones: [],
  roles: [],
  rateRange: [0, 200],
  experienceRange: [0, 20],
  availability: [],
  languages: [],
  education: [],
  verified: null,
  skills: [],
  tools: [],
  certifications: [],
  workPreference: [],
  contractType: [],
  portfolioRequired: null,
  githubRequired: null,
  linkedinRequired: null,
  matchScoreRange: [0, 100],
  lastActiveRange: 'all',
  salaryExpectationRange: [0, 300],
  noticePeriod: [],
};

export function CandidateList({ onNavigateToScreen, onOpenModal }: CandidateListProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCandidates, setSelectedCandidates] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'match' | 'rate'>('match');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Enhanced responsive detection
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      const tablet = width >= 768 && width < 1024;
      
      setIsMobile(mobile);
      setIsTablet(tablet);
      
      // Responsive filter drawer behavior
      if (mobile) {
        setIsFilterDrawerOpen(false); // Always closed on mobile
      } else if (tablet) {
        setIsFilterDrawerOpen(false); // Closed on tablet for more space
      } else {
        setIsFilterDrawerOpen(true); // Open on desktop
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Enhanced filter logic with all comprehensive filters
  const filteredCandidates = mockCandidates.filter(candidate => {
    if (activeTab === 'verified' && !candidate.verified) return false;
    if (activeTab === 'unverified' && candidate.verified) return false;
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const searchableText = `${candidate.name} ${candidate.email} ${candidate.position} ${candidate.role} ${candidate.skills?.join(' ') || ''} ${candidate.tools?.join(' ') || ''} ${candidate.location}`.toLowerCase();
      if (!searchableText.includes(searchTerm)) return false;
    }
    
    if (filters.verified !== null && candidate.verified !== filters.verified) return false;
    
    if (filters.skills.length > 0) {
      const candidateSkills = candidate.skills || [];
      const hasMatchingSkill = filters.skills.some(skill => 
        candidateSkills.some(candidateSkill => 
          candidateSkill.toLowerCase().includes(skill.toLowerCase())
        )
      );
      if (!hasMatchingSkill) return false;
    }
    
    if (filters.tools.length > 0) {
      const candidateTools = candidate.tools || [];
      const hasMatchingTool = filters.tools.some(tool => 
        candidateTools.some(candidateTool => 
          candidateTool.toLowerCase().includes(tool.toLowerCase())
        )
      );
      if (!hasMatchingTool) return false;
    }
    
    if (filters.countries.length > 0) {
      const candidateCountry = candidate.country || candidate.location || '';
      const hasMatchingCountry = filters.countries.some(country => 
        candidateCountry.toLowerCase().includes(country.toLowerCase())
      );
      if (!hasMatchingCountry) return false;
    }
    
    if (filters.languages.length > 0) {
      const candidateLanguages = candidate.languages || [];
      const hasMatchingLanguage = filters.languages.some(language => 
        candidateLanguages.some(candidateLanguage => 
          candidateLanguage.toLowerCase().includes(language.toLowerCase())
        )
      );
      if (!hasMatchingLanguage) return false;
    }
    
    const candidateRate = candidate.rate || 0;
    if (candidateRate < filters.rateRange[0] || candidateRate > filters.rateRange[1]) return false;
    
    const candidateExperience = parseInt(candidate.experience?.replace(/\D/g, '') || '0');
    if (candidateExperience < filters.experienceRange[0] || candidateExperience > filters.experienceRange[1]) return false;
    
    const candidateMatchScore = candidate.matchScore || 0;
    if (candidateMatchScore < filters.matchScoreRange[0] || candidateMatchScore > filters.matchScoreRange[1]) return false;
    
    return true;
  });

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    let aValue, bValue;
    switch (sortBy) {
      case 'name': aValue = a.name; bValue = b.name; break;
      case 'date': aValue = new Date(a.updatedAt); bValue = new Date(b.updatedAt); break;
      case 'match': aValue = a.matchScore || 0; bValue = b.matchScore || 0; break;
      case 'rate': aValue = a.rate || 0; bValue = b.rate || 0; break;
      default: return 0;
    }
    return sortOrder === 'asc' ? (aValue < bValue ? -1 : 1) : (aValue > bValue ? -1 : 1);
  });

  const handleSelectCandidate = (candidateId: string, selected: boolean) => {
    setSelectedCandidates(prev => {
      const newSet = new Set(prev);
      selected ? newSet.add(candidateId) : newSet.delete(candidateId);
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedCandidates.size === sortedCandidates.length) {
      setSelectedCandidates(new Set());
    } else {
      setSelectedCandidates(new Set(sortedCandidates.map(c => c.id)));
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} for candidates:`, Array.from(selectedCandidates));
    // TODO: Implement bulk actions
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    count += filters.regions.length + filters.countries.length + filters.skills.length + filters.tools.length;
    if (filters.verified !== null) count++;
    if (filters.rateRange[0] > 0 || filters.rateRange[1] < 200) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  // Calculate checkbox states properly
  const allSelected = selectedCandidates.size === sortedCandidates.length && sortedCandidates.length > 0;
  const someSelected = selectedCandidates.size > 0 && selectedCandidates.size < sortedCandidates.length;

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="flex h-full">
        {/* Navigation Sidebar Space - Always account for it on desktop */}
        <div className={cn(
          "flex-shrink-0 transition-all duration-300",
          !isMobile && !isTablet ? "w-64" : "w-0"
        )} />

        {/* Main Content Area */}
        <div className={cn(
          "flex-1 min-w-0 transition-all duration-300",
          // Add right margin only when filter drawer is open on desktop
          !isMobile && !isTablet && isFilterDrawerOpen && "mr-80"
        )}>
          <div className="h-full overflow-auto">
            <div className="w-full px-4 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
              {/* Header - Reduced spacing */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6 mb-6 lg:mb-7">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-[#2E5E47] mb-2">Candidates</h1>
                  <p className="text-base lg:text-lg text-gray-600">Discover and manage top talent for your organization</p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <Button onClick={() => onOpenModal('bulk-import')} variant="outline" size="default">
                    <Download className="h-4 w-4 mr-2" />Import
                  </Button>
                  <Button onClick={() => onOpenModal('create-candidate')} className="bg-[#2E5E47] hover:bg-[#2E5E47]/90" size="default">
                    <Plus className="h-4 w-4 mr-2" />Add Candidate
                  </Button>
                </div>
              </div>

              {/* Tabs - Reduced spacing */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6 lg:mb-7">
                <TabsList className="grid w-full grid-cols-3 max-w-lg h-11">
                  <TabsTrigger value="all" className="text-sm lg:text-base">All ({mockCandidates.length})</TabsTrigger>
                  <TabsTrigger value="verified" className="text-sm lg:text-base">Verified ({mockCandidates.filter(c => c.verified).length})</TabsTrigger>
                  <TabsTrigger value="unverified" className="text-sm lg:text-base">Unverified ({mockCandidates.filter(c => !c.verified).length})</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="space-y-5 lg:space-y-6">
                  {/* Controls Bar - Reduced padding */}
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 lg:p-5">
                    <div className="flex flex-col lg:flex-row gap-3 lg:gap-5 items-start lg:items-center justify-between">
                      <div className="flex items-center gap-3 lg:gap-5 flex-wrap">
                        {/* Select All Checkbox - Fixed indeterminate prop */}
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={allSelected}
                            indeterminate={someSelected ? true : undefined}
                            onCheckedChange={handleSelectAll}
                            className="h-5 w-5 border-2 border-gray-300 data-[state=checked]:bg-[#2E5E47] data-[state=checked]:border-[#2E5E47]"
                          />
                          <span className="text-sm lg:text-base font-medium text-gray-700">
                            Select All
                          </span>
                        </div>

                        <div className="h-6 lg:h-7 w-px bg-gray-300" />

                        <div className="text-sm lg:text-base text-gray-600">
                          <span className="font-semibold">{sortedCandidates.length}</span> candidates found
                          {selectedCandidates.size > 0 && (
                            <span className="ml-2 lg:ml-3 text-[#2E5E47] font-semibold">
                              ({selectedCandidates.size} selected)
                            </span>
                          )}
                        </div>
                        
                        {activeFilterCount > 0 && (
                          <Badge variant="secondary" className="bg-[#2E5E47] text-white text-sm px-3 py-1">
                            {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-3 flex-wrap">
                        {(isMobile || isTablet) && (
                          <Button 
                            variant="outline" 
                            size="default"
                            onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)} 
                            className={cn(
                              "h-9 px-4",
                              activeFilterCount > 0 && "border-[#2E5E47] text-[#2E5E47]"
                            )}
                          >
                            <Filter className="h-4 w-4 mr-2" />
                            Filters
                            {activeFilterCount > 0 && (
                              <Badge className="ml-2 bg-[#2E5E47] text-white h-5 text-xs px-2">
                                {activeFilterCount}
                              </Badge>
                            )}
                          </Button>
                        )}

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="default" className="h-9 px-4">
                              {sortOrder === 'asc' ? <SortAsc className="h-4 w-4 mr-2" /> : <SortDesc className="h-4 w-4 mr-2" />}
                              Sort
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem onClick={() => { setSortBy('match'); setSortOrder('desc'); }}>
                              Match Score (High to Low)
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { setSortBy('rate'); setSortOrder('desc'); }}>
                              Rate (High to Low)
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { setSortBy('rate'); setSortOrder('asc'); }}>
                              Rate (Low to High)
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => { setSortBy('name'); setSortOrder('asc'); }}>
                              Name (A to Z)
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { setSortBy('date'); setSortOrder('desc'); }}>
                              Recently Updated
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>

                  {/* Candidates Grid - Reduced gaps for smaller cards */}
                  <div className="min-h-[500px]">
                    <div className={cn(
                      "grid gap-4 lg:gap-6",
                      // Responsive grid: 1 column on mobile, 2 on larger screens
                      "grid-cols-1 lg:grid-cols-2"
                    )}>
                      {sortedCandidates.map((candidate) => (
                        <CandidateCardTile
                          key={candidate.id}
                          candidate={candidate}
                          isSelected={selectedCandidates.has(candidate.id)}
                          onSelect={handleSelectCandidate}
                          onView={(id) => onNavigateToScreen('candidate-detail', id)}
                          onPreviewVideo={(id) => console.log('Preview video:', id)}
                          onAddToShortlist={(id) => console.log('Add to shortlist:', id)}
                          onDownloadResume={(id) => console.log('Download resume:', id)}
                          onSendMessage={(id) => console.log('Send message:', id)}
                        />
                      ))}
                    </div>

                    {sortedCandidates.length === 0 && (
                      <div className="text-center py-12 lg:py-16 bg-white rounded-xl border border-gray-200">
                        <Search className="h-14 lg:h-16 w-14 lg:w-16 text-gray-400 mx-auto mb-4 lg:mb-5" />
                        <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2 lg:mb-3">No candidates found</h3>
                        <p className="text-base lg:text-lg text-gray-600 mb-5 lg:mb-6">Try adjusting your filters or search terms to discover more talent.</p>
                        <Button variant="outline" size="lg" onClick={() => setFilters(initialFilters)}>
                          Clear All Filters
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Filter Drawer - Fixed position */}
        <CandidateFilterDrawer
          isOpen={isFilterDrawerOpen}
          onToggle={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
          onApplyFilters={setFilters}
          currentFilters={filters}
          isMobile={isMobile || isTablet}
          totalResults={sortedCandidates.length}
        />

        {/* Mobile/Tablet Overlay for Filter Drawer */}
        {(isMobile || isTablet) && isFilterDrawerOpen && (
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsFilterDrawerOpen(false)} />
        )}
      </div>

      {/* Enhanced Bulk Actions Footer - Slightly smaller */}
      {selectedCandidates.size > 0 && (
        <div className="fixed bottom-4 lg:bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white border border-gray-200 rounded-xl shadow-xl p-3 lg:p-4 mx-4 min-w-[280px] lg:min-w-[380px]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 lg:h-5 w-4 lg:w-5 text-[#2E5E47]" />
                <span className="font-semibold text-sm lg:text-base text-gray-900">
                  {selectedCandidates.size} candidate{selectedCandidates.size !== 1 ? 's' : ''} selected
                </span>
              </div>
              <Button size="sm" variant="ghost" onClick={() => setSelectedCandidates(new Set())} className="h-7 w-7 p-0">
                <X className="h-3 w-3" />
              </Button>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('shortlist')} className="text-xs lg:text-sm h-8">
                <FolderPlus className="h-3 w-3 mr-1" />
                Shortlist
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('pipeline')} className="text-xs lg:text-sm h-8">
                <Users className="h-3 w-3 mr-1" />
                Pipeline
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleBulkAction('message')} className="text-xs lg:text-sm h-8">
                <Mail className="h-3 w-3 mr-1" />
                Message
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline" className="text-xs lg:text-sm h-8">
                    <MoreVertical className="h-3 w-3 mr-1" />
                    More
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleBulkAction('export')}>
                    <Download className="mr-2 h-4 w-4" />
                    Export Selected
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleBulkAction('archive')}>
                    <Archive className="mr-2 h-4 w-4" />
                    Archive
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600" onClick={() => handleBulkAction('delete')}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}