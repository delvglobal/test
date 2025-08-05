import React, { useState } from 'react';
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
  MoreVertical,
  Eye,
  MessageCircle,
  Download,
  Heart,
  Flag
} from 'lucide-react';
import { cn } from './ui/utils';
import type { Candidate } from '../types';

interface CandidateCardTileProps {
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
    'United States': '🇺🇸', 'Canada': '🇨🇦', 'Mexico': '🇲🇽', 'United Kingdom': '🇬🇧',
    'Germany': '🇩🇪', 'France': '🇫🇷', 'Spain': '🇪🇸', 'Italy': '🇮🇹',
    'Netherlands': '🇳🇱', 'Switzerland': '🇨🇭', 'Sweden': '🇸🇪', 'Norway': '🇳🇴',
    'Denmark': '🇩🇰', 'Finland': '🇫🇮', 'Austria': '🇦🇹', 'Belgium': '🇧🇪',
    'Ireland': '🇮🇪', 'Poland': '🇵🇱', 'Czech Republic': '🇨🇿', 'Portugal': '🇵🇹',
    'Australia': '🇦🇺', 'Japan': '🇯🇵', 'Singapore': '🇸🇬', 'India': '🇮🇳',
    'New Zealand': '🇳🇿', 'South Korea': '🇰🇷', 'China': '🇨🇳', 'Hong Kong': '🇭🇰',
    'Taiwan': '🇹🇼', 'Thailand': '🇹🇭', 'Malaysia': '🇲🇾', 'Philippines': '🇵🇭',
    'Indonesia': '🇮🇩', 'Vietnam': '🇻🇳', 'Brazil': '🇧🇷', 'Argentina': '🇦🇷',
    'Colombia': '🇨🇴', 'Chile': '🇨🇱', 'Peru': '🇵🇪', 'Uruguay': '🇺🇾',
    'UAE': '🇦🇪', 'Israel': '🇮🇱', 'Saudi Arabia': '🇸🇦', 'Qatar': '🇶🇦',
    'Kuwait': '🇰🇼', 'Bahrain': '🇧🇭', 'Turkey': '🇹🇷', 'Egypt': '🇪🇬',
    'South Africa': '🇿🇦', 'Nigeria': '🇳🇬', 'Kenya': '🇰🇪', 'Ghana': '🇬🇭',
    'Morocco': '🇲🇦', 'Tunisia': '🇹🇳'
  };
  
  const flag = countryFlag || countryFlags[country] || '🌍';
  return { flag, country };
};

export function CandidateCardTile({
  candidate,
  isSelected = false,
  onSelect,
  onView,
  onPreviewVideo,
  onAddToShortlist,
  onDownloadResume,
  onSendMessage
}: CandidateCardTileProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [showAllTools, setShowAllTools] = useState(false);

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
  const displayExperience = candidate.experience || '0 years';
  const displayTimezone = candidate.timezone || 'UTC';
  
  const { flag, country } = getCountryWithFlag(displayCountry, candidate.countryFlag);

  // Mobile detection for responsive behavior
  const isMobile = window.innerWidth < 768;

  return (
    <div 
      className={cn(
        "relative w-full bg-white rounded-xl border border-gray-200 shadow-sm",
        "p-5 lg:p-6 cursor-pointer transition-all duration-300",
        "hover:shadow-lg hover:border-[#2E5E47]/30 hover:-translate-y-1",
        "flex flex-col gap-4 lg:gap-5 h-full",
        isSelected && "ring-2 ring-[#2E5E47] bg-[#2E5E47]/5 border-[#2E5E47]/50"
      )}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ minHeight: '384px' }}
    >
      {/* Tweak #2: Relocate checkbox - Show on hover in top-right */}
      {(isHovered || isSelected) && (
        <div className="absolute top-4 lg:top-5 right-12 lg:right-14 z-10">
          <Checkbox
            checked={isSelected}
            onCheckedChange={(checked) => {
              onSelect?.(candidate.id, checked as boolean);
            }}
            onClick={(e) => e.stopPropagation()}
            className="h-5 w-5 border-2 border-gray-300 data-[state=checked]:bg-[#2E5E47] data-[state=checked]:border-[#2E5E47] bg-white shadow-sm"
          />
        </div>
      )}

      {/* Menu Dropdown - Top Right */}
      <div className="absolute top-4 lg:top-5 right-4 lg:right-5 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onView?.(candidate.id); }}>
              <Eye className="mr-3 h-4 w-4" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onSendMessage?.(candidate.id); }}>
              <MessageCircle className="mr-3 h-4 w-4" />
              Send Message
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onPreviewVideo?.(candidate.id); }}>
              <Play className="mr-3 h-4 w-4" />
              Watch Video
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onAddToShortlist?.(candidate.id); }}>
              <Heart className="mr-3 h-4 w-4" />
              Add to Shortlist
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDownloadResume?.(candidate.id); }}>
              <Download className="mr-3 h-4 w-4" />
              Download Resume
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <Flag className="mr-3 h-4 w-4" />
              Report Profile
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 1. Header Section - Avatar, Name, Position */}
      <div className="flex items-start gap-4 pt-2">
        <div className="relative flex-shrink-0">
          <Avatar className="h-14 w-14 lg:h-16 lg:w-16 ring-3 ring-gray-100 shadow-sm">
            <AvatarImage src={displayAvatar} alt={displayName} />
            <AvatarFallback className="text-base lg:text-lg font-semibold bg-gradient-to-br from-[#2E5E47] to-[#22c55e] text-white">
              {displayName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {candidate.verified && (
            <div className="absolute -bottom-1 -right-1">
              <div className="w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-[#2E5E47] to-[#22c55e] rounded-full flex items-center justify-center shadow-md ring-2 ring-white">
                <CheckCircle className="h-3 w-3 lg:h-4 lg:w-4 text-white" />
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg lg:text-xl text-gray-900 truncate mb-1">
            {displayName}
          </h3>
          <p className="text-sm lg:text-base text-gray-600 truncate mb-2">
            {candidate.position || candidate.role || 'No position specified'}
          </p>
          
          {/* Tweak #4: Country + Tenure row - Combined subtitle */}
          <div className="text-sm text-gray-500">
            <span className="inline-flex items-center gap-1">
              {flag} {country} • {displayExperience}
            </span>
          </div>
        </div>
      </div>

      {/* Tweak #3: Rate block - Simplified with subtle divider */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="w-px h-6 bg-gray-300"></div>
          <div className="text-right flex-1">
            <div className="font-bold text-xl text-gray-900">
              {displayCurrency}{displayRate}/hr
            </div>
            <div className="text-xs text-gray-500">{displayTimezone}</div>
          </div>
        </div>
      </div>

      {/* Mobile: Single scrollable chips row */}
      {isMobile ? (
        <div className="overflow-x-auto scrollbar-none">
          <div className="flex gap-1.5 pb-2">
            {/* Languages with neutral gray */}
            {displayLanguages.slice(0, 2).map((lang, index) => (
              <Badge
                key={`lang-${index}`}
                variant="secondary"
                className="h-6 px-2 text-xs bg-gray-100 text-gray-700 border-0 font-medium whitespace-nowrap"
              >
                {lang}
              </Badge>
            ))}
            {/* Skills with brand blue */}
            {displaySkills.slice(0, 3).map((skill, index) => (
              <Badge
                key={`skill-${index}`}
                variant="secondary"
                className="h-6 px-2 text-xs bg-blue-50 text-blue-700 border-0 font-medium whitespace-nowrap"
              >
                {skill}
              </Badge>
            ))}
            {/* Tools with brand green */}
            {displayTools.slice(0, 2).map((tool, index) => (
              <Badge
                key={`tool-${index}`}
                variant="secondary"
                className="h-6 px-2 text-xs bg-green-50 text-green-700 border-0 font-medium whitespace-nowrap"
              >
                {tool}
              </Badge>
            ))}
            {(displayLanguages.length > 2 || displaySkills.length > 3 || displayTools.length > 2) && (
              <Badge
                variant="outline"
                className="h-6 px-2 text-xs text-gray-500 border-gray-300 font-medium whitespace-nowrap"
              >
                +{(displayLanguages.length - 2) + (displaySkills.length - 3) + (displayTools.length - 2)} more
              </Badge>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Desktop: Separate sections with color coding */}
          
          {/* Tweak #5: Languages - Neutral Gray */}
          <div>
            <div className="text-sm font-medium text-gray-600 mb-2">Languages</div>
            <div className="flex flex-wrap gap-1.5">
              {displayLanguages.slice(0, 3).map((language, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="h-6 px-2 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 border-0 font-medium"
                >
                  {language}
                </Badge>
              ))}
              {displayLanguages.length > 3 && (
                <Badge
                  variant="outline"
                  className="h-6 px-2 text-xs text-gray-500 border-gray-300 font-medium"
                >
                  +{displayLanguages.length - 3}
                </Badge>
              )}
            </div>
          </div>

          {/* Tweak #1 & #5: Skills - Brand Blue with compact toggle */}
          {displaySkills.length > 0 && (
            <div>
              <div className="text-sm font-medium text-gray-600 mb-2">Skills</div>
              <div className="flex flex-wrap gap-1.5">
                {(showAllSkills ? displaySkills : displaySkills.slice(0, 3)).map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="h-6 px-2 text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 border-0 font-medium"
                  >
                    {skill}
                  </Badge>
                ))}
                {displaySkills.length > 3 && (
                  <Badge
                    variant="outline"
                    className="h-6 px-2 text-xs text-gray-500 border-gray-300 font-medium cursor-pointer hover:bg-gray-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAllSkills(!showAllSkills);
                    }}
                  >
                    {showAllSkills ? 'Show less' : `+${displaySkills.length - 3} more`}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Tweak #1 & #5: Tools - Brand Green with compact toggle */}
          {displayTools.length > 0 && (
            <div>
              <div className="text-sm font-medium text-gray-600 mb-2">Tools</div>
              <div className="flex flex-wrap gap-1.5">
                {(showAllTools ? displayTools : displayTools.slice(0, 3)).map((tool, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="h-6 px-2 text-xs bg-green-50 text-green-700 hover:bg-green-100 border-0 font-medium"
                  >
                    {tool}
                  </Badge>
                ))}
                {displayTools.length > 3 && (
                  <Badge
                    variant="outline"
                    className="h-6 px-2 text-xs text-gray-500 border-gray-300 font-medium cursor-pointer hover:bg-gray-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAllTools(!showAllTools);
                    }}
                  >
                    {showAllTools ? 'Show less' : `+${displayTools.length - 3} more`}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* Tweak #6: Video CTA styling - Fluid width with play icon circle */}
      <div className="flex justify-center mt-auto pt-4 border-t border-gray-100">
        <Button
          variant="outline"
          className="w-full h-9 text-sm border-[#2E5E47] text-[#2E5E47] hover:bg-[#2E5E47] hover:text-white font-semibold rounded-lg flex items-center justify-center gap-2"
          onClick={(e) => {
            e.stopPropagation();
            onPreviewVideo?.(candidate.id);
          }}
        >
          <div className="w-5 h-5 rounded-full bg-current flex items-center justify-center">
            <Play className="h-2.5 w-2.5 text-white fill-current ml-0.5" />
          </div>
          Watch Video
        </Button>
      </div>
    </div>
  );
}