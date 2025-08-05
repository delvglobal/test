import React from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { 
  Play, 
  CheckCircle, 
  MapPin, 
  Clock, 
  DollarSign, 
  Globe, 
  Star, 
  Briefcase, 
  Calendar,
  MoreVertical,
  Eye,
  MessageCircle,
  UserPlus,
  Download,
  Heart,
  Flag
} from 'lucide-react';
import { cn } from './ui/utils';
import type { Candidate } from '../types';

interface CandidateListItemProps {
  candidate: Candidate;
  isSelected?: boolean;
  onSelect?: (candidateId: string, selected: boolean) => void;
  onView?: (candidateId: string) => void;
  onPreviewVideo?: (candidateId: string) => void;
  onAddToShortlist?: (candidateId: string) => void;
  onDownloadResume?: (candidateId: string) => void;
  onSendMessage?: (candidateId: string) => void;
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
  return { flag, country };
};

// Helper function to get availability color and icon
const getAvailabilityInfo = (availability: string) => {
  const availabilityMap: Record<string, { color: string; bgColor: string; icon: React.ElementType; label: string }> = {
    'immediate': { color: 'text-emerald-700', bgColor: 'bg-emerald-50 border-emerald-200', icon: Clock, label: 'Available Now' },
    'short': { color: 'text-blue-700', bgColor: 'bg-blue-50 border-blue-200', icon: Calendar, label: 'Available Soon' },
    'medium': { color: 'text-yellow-700', bgColor: 'bg-yellow-50 border-yellow-200', icon: Calendar, label: 'Available Later' },
    'long': { color: 'text-gray-700', bgColor: 'bg-gray-50 border-gray-200', icon: Calendar, label: 'Long Term' },
    'not-looking': { color: 'text-red-700', bgColor: 'bg-red-50 border-red-200', icon: Star, label: 'Not Looking' }
  };
  
  return availabilityMap[availability] || { color: 'text-gray-700', bgColor: 'bg-gray-50 border-gray-200', icon: Calendar, label: 'Available' };
};

export function CandidateListItem({
  candidate,
  isSelected = false,
  onSelect,
  onView,
  onPreviewVideo,
  onAddToShortlist,
  onDownloadResume,
  onSendMessage
}: CandidateListItemProps) {
  const handleClick = () => {
    onView?.(candidate.id);
  };

  // Provide default values for optional fields
  const displayName = candidate.name || 'Unknown';
  const displayCountry = candidate.country || candidate.location || 'Unknown';
  const displayLanguages = candidate.languages || ['English'];
  const displayRate = candidate.rate || 0;
  const displayCurrency = candidate.currency || '$';
  const displayAvatar = candidate.avatar || '';
  const displaySkills = candidate.skills || [];
  const displayTools = candidate.tools || [];
  const displayAvailability = candidate.availability || 'medium';
  const displayExperience = candidate.experience || '0 years';
  const displayTimezone = candidate.timezone || 'UTC';
  const displayMatchScore = candidate.matchScore || 0;
  const displayLastActivity = candidate.lastActivity || 'Unknown';
  
  const { flag, country } = getCountryWithFlag(displayCountry, candidate.countryFlag);
  const availabilityInfo = getAvailabilityInfo(displayAvailability);

  return (
    <div 
      className={cn(
        "w-full bg-white rounded-xl border border-gray-200 shadow-sm",
        "flex items-center gap-6 px-8 py-6",
        "cursor-pointer transition-all duration-200 hover:shadow-md hover:border-[#2E5E47]/30",
        isSelected && "ring-2 ring-[#2E5E47] bg-[#2E5E47]/5 border-[#2E5E47]/50"
      )}
      onClick={handleClick}
      style={{ minHeight: '130px' }}
    >
      {/* Selection Checkbox */}
      <div className="flex-shrink-0">
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) => {
            onSelect?.(candidate.id, checked as boolean);
          }}
          onClick={(e) => e.stopPropagation()}
          className="h-5 w-5 border-2 border-gray-300 data-[state=checked]:bg-[#2E5E47] data-[state=checked]:border-[#2E5E47]"
        />
      </div>

      {/* Avatar with Verification */}
      <div className="flex-shrink-0 relative">
        <Avatar className="h-16 w-16 ring-2 ring-gray-100 shadow-sm">
          <AvatarImage src={displayAvatar} alt={displayName} />
          <AvatarFallback className="text-sm font-semibold bg-gradient-to-br from-[#2E5E47] to-[#4ade80] text-white">
            {displayName.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        {candidate.verified && (
          <div className="absolute -bottom-1 -right-1">
            <div className="w-6 h-6 bg-gradient-to-r from-[#2E5E47] to-[#4ade80] rounded-full flex items-center justify-center shadow-sm ring-2 ring-white">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Name & Position */}
      <div className="flex-shrink-0 min-w-0 w-60">
        <div className="font-semibold text-lg text-gray-900 truncate mb-1">
          {displayName}
        </div>
        <div className="text-sm text-gray-600 truncate mb-2">
          {candidate.position || candidate.role || 'No position specified'}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="text-base leading-none">{flag}</span>
          <span className="truncate">{country}</span>
          <span className="mx-1">•</span>
          <Briefcase className="h-3 w-3" />
          <span>{displayExperience}</span>
        </div>
      </div>

      {/* Skills & Tools */}
      <div className="flex-shrink-0 w-72">
        <div className="space-y-2">
          {displaySkills.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              <span className="text-xs text-gray-500 font-medium mr-1 min-w-fit">Skills:</span>
              {displaySkills.slice(0, 3).map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="h-5 px-2 text-xs bg-blue-50 text-blue-700 border-0 font-medium"
                >
                  {skill}
                </Badge>
              ))}
              {displaySkills.length > 3 && (
                <Badge
                  variant="outline"
                  className="h-5 px-2 text-xs text-gray-500 border-gray-300"
                >
                  +{displaySkills.length - 3}
                </Badge>
              )}
            </div>
          )}
          {displayTools.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              <span className="text-xs text-gray-500 font-medium mr-1 min-w-fit">Tools:</span>
              {displayTools.slice(0, 3).map((tool, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="h-5 px-2 text-xs bg-green-50 text-green-700 border-0 font-medium"
                >
                  {tool}
                </Badge>
              ))}
              {displayTools.length > 3 && (
                <Badge
                  variant="outline"
                  className="h-5 px-2 text-xs text-gray-500 border-gray-300"
                >
                  +{displayTools.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Languages & Timezone */}
      <div className="flex-shrink-0 w-40">
        <div className="text-sm">
          <div className="flex items-center gap-1 text-gray-600 mb-2">
            <Globe className="h-3 w-3" />
            <span className="font-medium">Languages</span>
          </div>
          <div className="text-gray-800 text-sm mb-2">
            {displayLanguages.slice(0, 2).join(', ')}
            {displayLanguages.length > 2 && ` +${displayLanguages.length - 2}`}
          </div>
          <div className="text-xs text-gray-500">
            {displayTimezone}
          </div>
        </div>
      </div>

      {/* Availability */}
      <div className="flex-shrink-0 w-40">
        <div className={cn(
          "flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium border",
          availabilityInfo.bgColor,
          availabilityInfo.color
        )}>
          <availabilityInfo.icon className="h-3 w-3" />
          <span className="truncate">{availabilityInfo.label}</span>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          Last active: {displayLastActivity}
        </div>
      </div>

      {/* Rate & Match Score */}
      <div className="flex-shrink-0 w-36 text-right">
        <div className="font-bold text-xl text-gray-900 mb-1">
          {displayCurrency}{displayRate}/hr
        </div>
        {displayMatchScore > 0 && (
          <Badge variant="secondary" className="bg-[#2E5E47]/10 text-[#2E5E47] font-semibold">
            {displayMatchScore}% match
          </Badge>
        )}
      </div>

      {/* Video Button */}
      <div className="flex-shrink-0">
        <Button
          variant="outline"
          size="sm"
          className="h-9 px-4 border-[#2E5E47] text-[#2E5E47] hover:bg-[#2E5E47] hover:text-white"
          onClick={(e) => {
            e.stopPropagation();
            onPreviewVideo?.(candidate.id);
          }}
        >
          <Play className="h-3 w-3 mr-2" />
          Video
        </Button>
      </div>

      {/* Menu Dropdown */}
      <div className="flex-shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 hover:bg-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onView?.(candidate.id); }}>
              <Eye className="mr-2 h-4 w-4" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onSendMessage?.(candidate.id); }}>
              <MessageCircle className="mr-2 h-4 w-4" />
              Send Message
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onPreviewVideo?.(candidate.id); }}>
              <Play className="mr-2 h-4 w-4" />
              Watch Video
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onAddToShortlist?.(candidate.id); }}>
              <Heart className="mr-2 h-4 w-4" />
              Add to Shortlist
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDownloadResume?.(candidate.id); }}>
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <Flag className="mr-2 h-4 w-4" />
              Report Profile
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}