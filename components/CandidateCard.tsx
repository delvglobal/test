import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { 
  CheckCircle,
  Clock,
  Briefcase,
  Languages,
  ChevronDown,
  Video,
  Settings,
  Play,
  MoreHorizontal,
  ExternalLink
} from 'lucide-react';
import { cn } from './ui/utils';
import type { Candidate } from '../types';

interface CandidateCardProps {
  candidate: Candidate;
  viewMode: 'grid' | 'list';
  isSelected: boolean;
  onSelect: (candidateId: string, selected: boolean) => void;
  onView: (candidateId: string) => void;
  onAction?: (action: string, candidateId: string) => void;
}

// Helper function to format country with flag
const getCountryWithFlag = (country: string, countryFlag?: string) => {
  const countryFlags: Record<string, string> = {
    'United States': '🇺🇸',
    'Canada': '🇨🇦',
    'Mexico': '🇲🇽',
    'United Kingdom': '🇬🇧',
    'Germany': '🇩🇪',
    'France': '🇫🇷',
    'Spain': '🇪🇸',
    'Italy': '🇮🇹',
    'Netherlands': '🇳🇱',
    'Switzerland': '🇨🇭',
    'Sweden': '🇸🇪',
    'Norway': '🇳🇴',
    'Denmark': '🇩🇰',
    'Finland': '🇫🇮',
    'Austria': '🇦🇹',
    'Belgium': '🇧🇪',
    'Ireland': '🇮🇪',
    'Poland': '🇵🇱',
    'Czech Republic': '🇨🇿',
    'Portugal': '🇵🇹',
    'Australia': '🇦🇺',
    'Japan': '🇯🇵',
    'Singapore': '🇸🇬',
    'India': '🇮🇳',
    'New Zealand': '🇳🇿',
    'South Korea': '🇰🇷',
    'China': '🇨🇳',
    'Hong Kong': '🇭🇰',
    'Taiwan': '🇹🇼',
    'Thailand': '🇹🇭',
    'Malaysia': '🇲🇾',
    'Philippines': '🇵🇭',
    'Indonesia': '🇮🇩',
    'Vietnam': '🇻🇳',
    'Brazil': '🇧🇷',
    'Argentina': '🇦🇷',
    'Colombia': '🇨🇴',
    'Chile': '🇨🇱',
    'Peru': '🇵🇪',
    'Uruguay': '🇺🇾',
    'UAE': '🇦🇪',
    'Israel': '🇮🇱',
    'Saudi Arabia': '🇸🇦',
    'Qatar': '🇶🇦',
    'Kuwait': '🇰🇼',
    'Bahrain': '🇧🇭',
    'Turkey': '🇹🇷',
    'Egypt': '🇪🇬',
    'South Africa': '🇿🇦',
    'Nigeria': '🇳🇬',
    'Kenya': '🇰🇪',
    'Ghana': '🇬🇭',
    'Morocco': '🇲🇦',
    'Tunisia': '🇹🇳'
  };
  
  const flag = countryFlag || countryFlags[country] || '🌍';
  return `${flag} ${country}`;
};

// Helper function to get availability status
const getAvailabilityStatus = (availability?: string) => {
  switch (availability) {
    case 'immediate': return 'Available for Work';
    case 'short': return 'Available Soon';
    case 'medium': return 'Available in 1-2 months';
    case 'long': return 'Available in 2+ months';
    case 'not-looking': return 'Not Available';
    default: return 'Available for Work';
  }
};

// Helper function to get availability hours
const getAvailabilityHours = (availability?: string) => {
  switch (availability) {
    case 'immediate': return '40+ hours/week';
    case 'short': return '30+ hours/week';
    case 'medium': return '20+ hours/week';
    case 'long': return '15+ hours/week';
    default: return '40+ hours/week';
  }
};

export function CandidateCard({ 
  candidate, 
  viewMode, 
  isSelected, 
  onSelect, 
  onView, 
  onAction 
}: CandidateCardProps) {
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [showAllTools, setShowAllTools] = useState(false);
  const [showAllRoles, setShowAllRoles] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger card click if clicking on interactive elements
    if ((e.target as HTMLElement).closest('button, .checkbox-wrapper, .dropdown-wrapper')) {
      return;
    }
    onView(candidate.id);
  };

  // Provide default values for optional fields
  const displayName = candidate.name || 'Unknown';
  const displayRole = candidate.role || candidate.position || 'Not specified';
  const displayCountry = candidate.country || candidate.location || 'Unknown';
  const displaySkills = candidate.skills || [];
  const displayTools = candidate.tools || [];
  const displayLanguages = candidate.languages || ['English'];
  const displayRate = candidate.rate || 0;
  const displayCurrency = candidate.currency || '$';
  const displayTimezone = candidate.timezoneOffset || candidate.timezone || 'UTC+0';
  const displayAvatar = candidate.avatar || '';
  const displayExperience = candidate.experience || '0 yrs';

  // Mock work roles data (in real implementation, this would come from candidate data)
  const workRoles = [
    { title: 'Customer Support Representative', experience: '2 yr' },
    { title: 'Executive Assistant', experience: '4 yr' },
    { title: 'Data Entry Specialist', experience: '1 yr' },
    { title: 'Virtual Assistant', experience: '3 yr' }
  ];

  if (viewMode === 'list') {
    // For list view, use a simplified horizontal layout
    return (
      <Card 
        className={cn(
          "cursor-pointer transition-all duration-200 hover:shadow-md hover:shadow-[#2E5E47]/10 border border-gray-200",
          isSelected && "ring-2 ring-[#2E5E47] bg-[#2E5E47]/5"
        )}
        onClick={handleCardClick}
      >
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            {/* Selection Checkbox */}
            <div className="checkbox-wrapper mt-1">
              <Checkbox
                checked={isSelected}
                onCheckedChange={(checked) => onSelect(candidate.id, checked as boolean)}
              />
            </div>

            {/* Avatar */}
            <div className="candidate-avatar-container">
              <Avatar className="h-16 w-16">
                <AvatarImage src={displayAvatar} alt={displayName} />
                <AvatarFallback className="text-lg bg-[#2E5E47] text-white">
                  {displayName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {candidate.verified && (
                <div className="candidate-verification-badge">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Header Row */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{displayName}</h3>
                    <Badge className="bg-green-100 text-green-800 border-0 px-2 py-1 text-xs">
                      {getAvailabilityStatus(candidate.availability)}
                    </Badge>
                  </div>
                  
                  {/* Meta Row */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{displayTimezone.replace('UTC', 'CST')}</span>
                    </div>
                    <span>{getCountryWithFlag(displayCountry, candidate.countryFlag)}</span>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      <span>{displayExperience}</span>
                    </div>
                  </div>
                  
                  {/* Languages */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Languages className="h-4 w-4" />
                    <span>Languages: {displayLanguages.slice(0, 2).join(', ')}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    size="sm"
                    className="bg-[#2E5E47] hover:bg-[#1d3d2b] text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAction?.('video', candidate.id);
                    }}
                  >
                    <Video className="h-4 w-4 mr-1" />
                    Video
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Details
                        <ChevronDown className="h-4 w-4 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView(candidate.id)}>
                        View Full Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onAction?.('email', candidate.id)}>
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onAction?.('schedule', candidate.id)}>
                        Schedule Interview
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Grid Mode - Matches the design exactly
  return (
    <Card 
      className={cn(
        "w-full cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-[#2E5E47]/10 border border-gray-200 bg-white",
        isSelected && "ring-2 ring-[#2E5E47] bg-[#2E5E47]/5"
      )}
      onClick={handleCardClick}
    >
      <CardContent className="p-6">
        {/* Header Section */}
        <div className="flex items-start gap-4 mb-4">
          {/* Selection Checkbox - Top Left */}
          <div className="checkbox-wrapper mt-1">
            <Checkbox
              checked={isSelected}
              onCheckedChange={(checked) => onSelect(candidate.id, checked as boolean)}
            />
          </div>

          {/* Avatar */}
          <div className="candidate-avatar-container">
            <Avatar className="h-20 w-20">
              <AvatarImage src={displayAvatar} alt={displayName} />
              <AvatarFallback className="text-xl bg-[#2E5E47] text-white">
                {displayName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {candidate.verified && (
              <div className="candidate-verification-badge">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            )}
          </div>

          {/* Name and Status */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-semibold text-gray-900">{displayName}</h3>
              <Badge className="bg-green-100 text-green-800 border-0 px-3 py-1">
                {getAvailabilityStatus(candidate.availability)}
              </Badge>
            </div>
            
            {/* Meta Row */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{displayTimezone.replace('UTC', 'CST')}</span>
              </div>
              <span>{getCountryWithFlag(displayCountry, candidate.countryFlag)}</span>
              <div className="flex items-center gap-1.5">
                <Briefcase className="h-4 w-4" />
                <span>{displayExperience}</span>
              </div>
            </div>
            
            {/* Languages */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Languages className="h-4 w-4" />
              <span>Languages: {displayLanguages.slice(0, 2).join(', ')}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="bg-[#2E5E47] hover:bg-[#1d3d2b] text-white px-4 py-2"
              onClick={(e) => {
                e.stopPropagation();
                onAction?.('video', candidate.id);
              }}
            >
              <Video className="h-4 w-4 mr-1.5" />
              Video
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="px-4 py-2">
                  Details
                  <ChevronDown className="h-4 w-4 ml-1.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onView(candidate.id)}>
                  View Full Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAction?.('email', candidate.id)}>
                  Send Message
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAction?.('schedule', candidate.id)}>
                  Schedule Interview
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Rate/Availability Grid */}
        <div className="candidate-rate-grid grid grid-cols-3 gap-4 p-4 mb-6">
          <div className="text-center">
            <div className="text-xs font-medium text-gray-500 mb-1">Hourly Rate</div>
            <div className="text-lg font-semibold text-gray-900">
              {displayCurrency}{displayRate}-{Math.floor(displayRate * 1.5)}/hr
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs font-medium text-gray-500 mb-1">Availability</div>
            <div className="text-lg font-semibold text-gray-900">
              {getAvailabilityHours(candidate.availability)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs font-medium text-gray-500 mb-1">Job Type</div>
            <div className="text-lg font-semibold text-gray-900">Full-time</div>
          </div>
        </div>

        {/* Work Roles Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-[#2E5E47]"></div>
            <span className="text-sm font-medium text-gray-700">I can work as</span>
            {workRoles.length > 2 && (
              <Badge 
                variant="outline" 
                className="text-xs px-2 py-0.5 bg-gray-50 text-gray-600 border-gray-300 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAllRoles(!showAllRoles);
                }}
              >
                +{workRoles.length - 2} more
              </Badge>
            )}
          </div>
          
          <div className="space-y-2">
            {(showAllRoles ? workRoles : workRoles.slice(0, 2)).map((role, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-900">{role.title}</span>
                <Badge variant="outline" className="text-xs px-2 py-1 bg-white text-gray-600 border-gray-300">
                  {role.experience}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Settings className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Skills</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {(showAllSkills ? displaySkills : displaySkills.slice(0, 6)).map((skill, index) => (
              <Badge
                key={index}
                className="candidate-skill-badge text-xs px-3 py-1"
              >
                {skill}
              </Badge>
            ))}
            {displaySkills.length > 6 && (
              <Badge 
                variant="outline" 
                className="text-xs px-3 py-1 bg-blue-50 text-blue-600 border-blue-200 cursor-pointer hover:bg-blue-100"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAllSkills(!showAllSkills);
                }}
              >
                {showAllSkills ? 'Show less' : `+${displaySkills.length - 6} more`}
              </Badge>
            )}
          </div>
        </div>

        {/* Tools & Technologies Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-4 h-4 rounded bg-green-600 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-sm"></div>
            </div>
            <span className="text-sm font-medium text-gray-700">Tools & Technologies</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {(showAllTools ? displayTools : displayTools.slice(0, 5)).map((tool, index) => (
              <Badge
                key={index}
                className="candidate-tool-badge text-xs px-3 py-1"
              >
                {tool}
              </Badge>
            ))}
            {displayTools.length > 5 && (
              <Badge 
                variant="outline" 
                className="text-xs px-3 py-1 bg-green-50 text-green-600 border-green-200 cursor-pointer hover:bg-green-100"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAllTools(!showAllTools);
                }}
              >
                {showAllTools ? 'Show less' : `+${displayTools.length - 5} more`}
              </Badge>
            )}
          </div>
        </div>

        {/* View Profile Button */}
        <div className="border-t border-gray-100 pt-4">
          <Button
            className="w-full bg-[#2E5E47] hover:bg-[#1d3d2b] text-white py-3 text-sm font-medium"
            onClick={(e) => {
              e.stopPropagation();
              onView(candidate.id);
            }}
          >
            View Profile
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}