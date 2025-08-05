import React, { useState } from 'react';
import { cn } from '../ui/utils';
import { Dialog, DialogContent } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { 
  X, 
  Search, 
  Filter, 
  MapPin, 
  Code, 
  Users,
  CheckCircle2
} from 'lucide-react';
import type { Candidate } from '../../types';

// Mock candidate data for the picker
const mockAvailableCandidates: Candidate[] = [
  {
    id: '10',
    name: 'Emma Thompson',
    email: 'emma.thompson@email.com',
    title: 'Senior React Developer',
    role: 'Frontend Developer',
    experience: '5 years',
    location: 'London, UK',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    skills: ['React', 'TypeScript', 'Node.js'],
    tools: ['Figma', 'VS Code'],
    languages: ['English'],
    summary: 'Senior React developer with strong TypeScript skills',
    status: 'available',
    rating: 4.7,
    rate: 95,
    currency: 'USD',
    timezone: 'GMT',
    timezoneOffset: '+0',
    verified: true,
    availability: 'immediate',
    lastUpdated: '2024-01-20T10:00:00Z',
    source: 'database_sync',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '11',
    name: 'David Park',
    email: 'david.park@email.com',
    title: 'Full Stack Developer',
    role: 'Full Stack Developer',
    experience: '7 years',
    location: 'Seoul, South Korea',
    country: 'South Korea',
    countryFlag: '🇰🇷',
    skills: ['React', 'Python', 'PostgreSQL'],
    tools: ['Docker', 'AWS'],
    languages: ['English', 'Korean'],
    summary: 'Full stack developer with backend expertise',
    status: 'available',
    rating: 4.9,
    rate: 85,
    currency: 'USD',
    timezone: 'KST',
    timezoneOffset: '+9',
    verified: true,
    availability: 'short',
    lastUpdated: '2024-01-19T15:30:00Z',
    source: 'database_sync',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '12',
    name: 'Sofia Martinez',
    email: 'sofia.martinez@email.com',
    title: 'UI/UX Developer',
    role: 'Frontend Developer',
    experience: '4 years',
    location: 'Barcelona, Spain',
    country: 'Spain',
    countryFlag: '🇪🇸',
    skills: ['React', 'CSS', 'JavaScript'],
    tools: ['Figma', 'Adobe XD'],
    languages: ['English', 'Spanish', 'Catalan'],
    summary: 'Frontend developer with strong design background',
    status: 'available',
    rating: 4.6,
    rate: 75,
    currency: 'USD',
    timezone: 'CET',
    timezoneOffset: '+1',
    verified: false,
    availability: 'medium',
    lastUpdated: '2024-01-18T12:00:00Z',
    source: 'database_sync',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b120?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '13',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@email.com',
    title: 'Senior Frontend Engineer',
    role: 'Frontend Developer',
    experience: '6 years',
    location: 'Dubai, UAE',
    country: 'United Arab Emirates',
    countryFlag: '🇦🇪',
    skills: ['Vue.js', 'React', 'TypeScript'],
    tools: ['Webpack', 'Git'],
    languages: ['English', 'Arabic'],
    summary: 'Senior frontend engineer with Vue.js expertise',
    status: 'available',
    rating: 4.8,
    rate: 110,
    currency: 'USD',
    timezone: 'GST',
    timezoneOffset: '+4',
    verified: true,
    availability: 'immediate',
    lastUpdated: '2024-01-21T08:45:00Z',
    source: 'database_sync',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '14',
    name: 'Lisa Chen',
    email: 'lisa.chen@email.com',
    title: 'React Native Developer',
    role: 'Mobile Developer',
    experience: '5 years',
    location: 'Toronto, Canada',
    country: 'Canada',
    countryFlag: '🇨🇦',
    skills: ['React Native', 'React', 'JavaScript'],
    tools: ['Xcode', 'Android Studio'],
    languages: ['English', 'French'],
    summary: 'Mobile developer specializing in React Native',
    status: 'available',
    rating: 4.7,
    rate: 100,
    currency: 'USD',
    timezone: 'EST',
    timezoneOffset: '-5',
    verified: true,
    availability: 'short',
    lastUpdated: '2024-01-20T16:20:00Z',
    source: 'database_sync',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
  }
];

interface CandidatePickerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCandidates: (candidateIds: string[]) => void;
}

export function CandidatePickerModal({ open, onOpenChange, onAddCandidates }: CandidatePickerModalProps) {
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [skillsFilter, setSkillsFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [filteredCandidates, setFilteredCandidates] = useState(mockAvailableCandidates);

  // Filter candidates based on search and filters
  React.useEffect(() => {
    let filtered = mockAvailableCandidates;

    if (searchTerm) {
      filtered = filtered.filter(candidate => 
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        candidate.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (skillsFilter) {
      filtered = filtered.filter(candidate =>
        candidate.skills.some(skill => skill.toLowerCase().includes(skillsFilter.toLowerCase()))
      );
    }

    if (locationFilter) {
      filtered = filtered.filter(candidate =>
        candidate.location.toLowerCase().includes(locationFilter.toLowerCase()) ||
        candidate.country.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    setFilteredCandidates(filtered);
  }, [searchTerm, skillsFilter, locationFilter]);

  const handleSelectCandidate = (candidateId: string) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCandidates.length === filteredCandidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(filteredCandidates.map(c => c.id));
    }
  };

  const handleAddSelected = () => {
    onAddCandidates(selectedCandidates);
    setSelectedCandidates([]);
    setSearchTerm('');
    setSkillsFilter('');
    setLocationFilter('');
  };

  const handleClose = () => {
    onOpenChange(false);
    setSelectedCandidates([]);
    setSearchTerm('');
    setSkillsFilter('');
    setLocationFilter('');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSkillsFilter('');
    setLocationFilter('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full h-[600px] p-0 gap-0 bg-white" style={{ borderRadius: '20px' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-[#E0E0E0]">
          <h2 className="text-2xl font-semibold text-[#1E1E1E]" style={{ fontSize: '24px', lineHeight: '32px' }}>
            Add Candidates
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Filters Bar */}
        <div className="p-6 border-b border-[#E0E0E0] bg-[#F8F9FA]">
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>

            {/* Skills Filter */}
            <Select value={skillsFilter} onValueChange={setSkillsFilter}>
              <SelectTrigger className="w-48 bg-white">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4 text-gray-400" />
                  <SelectValue placeholder="All Skills" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Skills</SelectItem>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="vue">Vue.js</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="node">Node.js</SelectItem>
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-48 bg-white">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <SelectValue placeholder="All Locations" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Locations</SelectItem>
                <SelectItem value="united states">United States</SelectItem>
                <SelectItem value="united kingdom">United Kingdom</SelectItem>
                <SelectItem value="canada">Canada</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="asia">Asia</SelectItem>
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            {(searchTerm || skillsFilter || locationFilter) && (
              <Button variant="ghost" onClick={clearFilters} className="text-[#008080] hover:text-[#006666]">
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        <Separator />

        {/* Results List */}
        <div className="flex-1 overflow-hidden">
          {/* Results Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#E0E0E0] bg-gray-50">
            <div className="flex items-center gap-4">
              <Checkbox
                checked={selectedCandidates.length === filteredCandidates.length && filteredCandidates.length > 0}
                onCheckedChange={handleSelectAll}
                className="data-[state=checked]:bg-[#008080] data-[state=checked]:border-[#008080]"
              />
              <span className="text-sm text-gray-600">
                {filteredCandidates.length} candidate{filteredCandidates.length !== 1 ? 's' : ''} found
              </span>
            </div>
            {selectedCandidates.length > 0 && (
              <span className="text-sm font-medium text-[#008080]">
                {selectedCandidates.length} selected
              </span>
            )}
          </div>

          {/* Candidate List */}
          <ScrollArea className="h-full">
            <div className="space-y-2 p-6">
              {filteredCandidates.map((candidate) => (
                <CandidateRow
                  key={candidate.id}
                  candidate={candidate}
                  isSelected={selectedCandidates.includes(candidate.id)}
                  onSelect={() => handleSelectCandidate(candidate.id)}
                />
              ))}
              
              {filteredCandidates.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No candidates found matching your criteria</p>
                  <Button variant="ghost" onClick={clearFilters} className="mt-2 text-[#008080]">
                    Clear filters to see all candidates
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-[#E0E0E0] bg-gray-50">
          <span className="text-sm text-gray-600">
            {selectedCandidates.length} candidate{selectedCandidates.length !== 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              onClick={handleAddSelected}
              disabled={selectedCandidates.length === 0}
              className="bg-[#008080] hover:bg-[#006666] text-white disabled:bg-gray-300"
            >
              Add {selectedCandidates.length} Selected
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface CandidateRowProps {
  candidate: Candidate;
  isSelected: boolean;
  onSelect: () => void;
}

function CandidateRow({ candidate, isSelected, onSelect }: CandidateRowProps) {
  return (
    <div 
      className={cn(
        "flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all duration-200",
        "hover:bg-gray-50 hover:border-[#008080]/20",
        isSelected 
          ? "bg-[#008080]/5 border-[#008080]/30" 
          : "bg-white border-gray-200"
      )}
      onClick={onSelect}
    >
      {/* Checkbox */}
      <Checkbox
        checked={isSelected}
        onCheckedChange={onSelect}
        className="data-[state=checked]:bg-[#008080] data-[state=checked]:border-[#008080]"
      />

      {/* Avatar */}
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage src={candidate.avatar} alt={candidate.name} />
          <AvatarFallback className="bg-gray-200">
            {candidate.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        {candidate.verified && (
          <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
            <CheckCircle2 className="h-3 w-3 text-white" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-[#1E1E1E] truncate">{candidate.name}</h4>
              <span className="text-sm text-gray-500">{candidate.countryFlag}</span>
            </div>
            <p className="text-sm text-gray-600 truncate">{candidate.title}</p>
            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
              <span>{candidate.experience}</span>
              <span>•</span>
              <span>{candidate.location}</span>
              <span>•</span>
              <span>${candidate.rate}/hr</span>
            </div>
          </div>
          
          {/* Skills */}
          <div className="flex items-center gap-1 ml-4">
            {candidate.skills.slice(0, 3).map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs bg-blue-50 text-blue-700 border border-blue-200"
              >
                {skill}
              </Badge>
            ))}
            {candidate.skills.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-gray-50 text-gray-600">
                +{candidate.skills.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}