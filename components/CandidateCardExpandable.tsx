import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  ChevronUp,
  ChevronDown,
  CheckCircle,
  DollarSign,
  Clock,
  Briefcase,
  GraduationCap,
  Award,
  Heart,
  Users,
  Share2,
  FileText,
  Video,
  MoreHorizontal,
  Languages,
  Target,
  Settings,
  Wifi,
  ExternalLink,
  MapPin
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import type { Candidate } from '../types';

interface CandidateCardExpandableProps {
  candidate: Candidate;
  isOpen: boolean;
  onToggle: (id: string) => void;
  onShortlist: (id: string) => void;
  onAddToPipeline: (id: string) => void;
  onShare: (id: string) => void;
}

export function CandidateCardExpandable({
  candidate,
  isOpen,
  onToggle,
  onShortlist,
  onAddToPipeline,
  onShare
}: CandidateCardExpandableProps) {
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Static data for improved UX design
  const candidateName = 'Jane Martínez';
  const candidateStatus = 'Available for Work';
  const candidateCountry = 'Mexico';
  const candidateFlag = '🇲🇽';
  const candidateTimezone = 'CST';
  const candidateExperience = '3 yrs';
  const candidateLanguages = 'Spanish, English';
  const candidateRate = '$8.5-14.5/hr';
  const candidateAvailability = '40+ hours/week';
  const candidateJobType = 'Full-time';

  // Role data - limit to exactly 2 for preview
  const workAsRoles = [
    { role: 'Customer Support Representative', experience: '2 yr' },
    { role: 'Executive Assistant', experience: '4 yr' },
    { role: 'Online Business Manager', experience: '2 yr' },
    { role: 'Administrative Assistant', experience: '3 yr' }
  ];

  const previewRoles = workAsRoles.slice(0, 2);
  const remainingRolesCount = workAsRoles.length - 2;

  const skillsList = [
    'Client Care', 'Scheduling', 'EMR', 'Patient Support', 
    'Medical Administration', 'HIPAA Compliance'
  ];

  const toolsList = [
    'Epic EMR', 'Cerner', 'IntakeQ', '8x8 Phone', 'Calendly'
  ];

  const allSkillsList = [
    'Client Care', 'Scheduling', 'EMR', 'Patient Support', 
    'Medical Administration', 'HIPAA Compliance', 'Data Entry',
    'Email Management', 'Calendar Management', 'Customer Service',
    'Documentation', 'Project Coordination', 'Team Communication',
    'Problem Solving', 'Multi-tasking', 'Time Management',
    'Attention to Detail', 'Process Improvement', 'Quality Assurance',
    'Training & Development', 'Workflow Optimization', 'CRM Management',
    'Report Generation'
  ];

  const allToolsList = [
    'Epic EMR', 'Cerner', 'IntakeQ', '8x8 Phone', 'Calendly',
    'Microsoft Office', 'Google Workspace', 'Slack', 'Zoom',
    'Trello', 'Asana', 'HubSpot', 'Salesforce'
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen && cardRef.current) {
      const cardTop = cardRef.current.offsetTop;
      window.scrollTo({
        top: cardTop - 100,
        behavior: 'smooth'
      });
    }
  }, [isOpen]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onToggle(candidate.id);
    } else if (event.key === 'Escape' && isOpen) {
      onToggle(candidate.id);
    }
  };

  // Safe className generation
  const cardBaseClasses = "w-full bg-white rounded-xl border border-gray-200 transition-all duration-300 overflow-hidden hover:shadow-md";
  const cardOpenClasses = "shadow-lg border-[#2E5E47]/20";
  const cardClosedClasses = "shadow-sm";

  return (
    <div
      ref={cardRef}
      className={isOpen ? `${cardBaseClasses} ${cardOpenClasses}` : `${cardBaseClasses} ${cardClosedClasses}`}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-expanded={isOpen}
      aria-label={`${candidateName} candidate profile`}
    >
      {/* Enhanced Summary Frame - Improved Layout */}
      <div className="p-5">
        {/* 1. Header Section - Avatar + Info + Actions */}
        <div className="flex items-start gap-4 mb-5">
          {/* Avatar with verified badge */}
          <div className="relative flex-shrink-0">
            <Avatar className="h-16 w-16 ring-2 ring-[#2E5E47] shadow-sm">
              <AvatarImage src={candidate.avatar || ''} alt={candidateName} />
              <AvatarFallback className="text-lg font-semibold bg-[#2E5E47] text-white">
                JM
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1">
              <div className="w-5 h-5 bg-[#2E5E47] rounded-full flex items-center justify-center shadow-md ring-2 ring-white">
                <CheckCircle className="h-3 w-3 text-white" />
              </div>
            </div>
          </div>

          {/* Name + Status + Location Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                {/* Name and Status - Horizontal Layout */}
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 flex-shrink-0">
                    {candidateName}
                  </h3>
                  
                  {/* Status Pill - Next to Name */}
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    {candidateStatus}
                  </div>
                </div>

                {/* Location & Meta Info - Reordered: Timezone first, then Country */}
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{candidateTimezone}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-base">{candidateFlag}</span>
                    <span className="font-medium">{candidateCountry}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-3.5 w-3.5" />
                    <span>{candidateExperience}</span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons - Desktop */}
              {!isMobile && (
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-[#2E5E47] text-white border-[#2E5E47] hover:bg-[#2E5E47]/90 h-8 px-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Watch video:', candidate.id);
                    }}
                  >
                    <Video className="h-3.5 w-3.5 mr-1.5" />
                    Video
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 h-8 px-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggle(candidate.id);
                    }}
                  >
                    <span className="mr-1.5">Details</span>
                    {isOpen ? (
                      <ChevronUp className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
              )}

              {/* Mobile Menu */}
              {isMobile && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); console.log('Watch video'); }}>
                      <Video className="mr-2 h-4 w-4" />
                      Watch Video
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onToggle(candidate.id); }}>
                      <FileText className="mr-2 h-4 w-4" />
                      {isOpen ? 'Hide Details' : 'View Details'}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onShortlist(candidate.id); }}>
                      <Heart className="mr-2 h-4 w-4" />
                      Shortlist
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onAddToPipeline(candidate.id); }}>
                      <Users className="mr-2 h-4 w-4" />
                      Add to Pipeline
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onShare(candidate.id); }}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* Languages */}
            <div className="flex items-center gap-2 text-sm mb-2">
              <Languages className="h-3.5 w-3.5 text-purple-600" />
              <span className="font-medium text-gray-700">Languages:</span>
              <span className="text-gray-600">{candidateLanguages}</span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2 text-sm">
              <svg className="h-3.5 w-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-medium text-gray-700">Email:</span>
              <span className="text-gray-600 text-sm font-mono">{candidate.email}</span>
            </div>
          </div>
        </div>

        {/* Mobile Action Buttons */}
        {isMobile && (
          <div className="flex items-center gap-2 mb-4">
            <Button
              variant="outline"
              size="sm"
              className="bg-[#2E5E47] text-white border-[#2E5E47] hover:bg-[#2E5E47]/90 flex-1"
              onClick={(e) => {
                e.stopPropagation();
                console.log('Watch video:', candidate.id);
              }}
            >
              <Video className="h-4 w-4 mr-2" />
              Video
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 flex-1"
              onClick={(e) => {
                e.stopPropagation();
                onToggle(candidate.id);
              }}
            >
              {isOpen ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-2" />
                  Hide Details
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-2" />
                  View Details
                </>
              )}
            </Button>
          </div>
        )}

        {/* 2. Compensation & Availability Grid */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg mb-4">
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1 font-medium">Hourly Rate</div>
            <div className="font-semibold text-gray-900 text-sm">{candidateRate}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1 font-medium">Availability</div>
            <div className="font-semibold text-gray-900 text-sm">{candidateAvailability}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1 font-medium">Job Type</div>
            <div className="font-semibold text-gray-900 text-sm">{candidateJobType}</div>
          </div>
        </div>

        {/* 3. I Can Work As Preview - Limited to 2 + Count */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Target className="h-4 w-4 text-[#2E5E47]" />
            <span className="font-semibold text-gray-900 text-sm">I can work as</span>
            {remainingRolesCount > 0 && (
              <Badge variant="outline" className="text-xs text-gray-500 border-gray-300 px-2 py-0.5">
                +{remainingRolesCount} more
              </Badge>
            )}
          </div>
          <div className="space-y-2">
            {previewRoles.map((role, index) => (
              <div key={index} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-900">{role.role}</span>
                <Badge variant="outline" className="text-xs text-gray-600 border-gray-300 px-2 py-0.5">
                  {role.experience}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Skills Preview - Compact */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="h-4 w-4 text-blue-600" />
            <span className="font-semibold text-gray-900 text-sm">Skills</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {skillsList.map((skill, index) => (
              <Badge
                key={index}
                className="candidate-skill-badge h-6 px-2.5 text-xs"
              >
                {skill}
              </Badge>
            ))}
            <Badge
              variant="outline"
              className="h-6 px-2.5 text-xs text-blue-600 border-blue-300 bg-blue-50"
            >
              +17 more
            </Badge>
          </div>
        </div>

        {/* 5. Tools Preview - Compact */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Award className="h-4 w-4 text-green-600" />
            <span className="font-semibold text-gray-900 text-sm">Tools & Technologies</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {toolsList.map((tool, index) => (
              <Badge
                key={index}
                className="candidate-tool-badge h-6 px-2.5 text-xs"
              >
                {tool}
              </Badge>
            ))}
            <Badge
              variant="outline"
              className="h-6 px-2.5 text-xs text-green-600 border-green-300 bg-green-50"
            >
              +8 more
            </Badge>
          </div>
        </div>
      </div>

      {/* Enhanced Details Frame - Only Visible When Expanded */}
      {isOpen && (
        <div className="border-t border-gray-100 animate-in slide-in-from-top-2 duration-300">
          <div className="p-5 space-y-6">
            {/* Professional Summary */}
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#2E5E47]" />
                Professional Summary
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Experienced virtual assistant with 3+ years of specialization in healthcare administration and customer support. Proven track record of managing complex schedules, maintaining HIPAA compliance, and delivering exceptional patient care coordination.
              </p>
            </div>

            {/* Complete "I can work as" List */}
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Target className="h-4 w-4 text-[#2E5E47]" />
                Complete Role List ({workAsRoles.length} roles)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {workAsRoles.map((role, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900 text-sm">{role.role}</span>
                    <Badge variant="outline" className="text-xs text-gray-600 border-gray-300">
                      {role.experience}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Complete Skills */}
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Settings className="h-4 w-4 text-[#2E5E47]" />
                Complete Skills ({allSkillsList.length} total)
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {allSkillsList.map((skill, index) => (
                  <Badge
                    key={index}
                    className="candidate-skill-badge h-7 px-3 text-sm"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Complete Tools */}
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Award className="h-4 w-4 text-[#2E5E47]" />
                Complete Tools & Technologies ({allToolsList.length} total)
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {allToolsList.map((tool, index) => (
                  <Badge
                    key={index}
                    className="candidate-tool-badge h-7 px-3 text-sm"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-[#2E5E47]" />
                Experience
              </h4>
              <div className="space-y-3">
                <div className="border-l-2 border-[#2E5E47] pl-4">
                  <h5 className="font-semibold text-gray-900 text-sm">Senior Virtual Medical Assistant</h5>
                  <p className="text-sm text-[#2E5E47] font-medium">HealthCare Solutions Inc.</p>
                  <p className="text-xs text-gray-500 mb-1">2022 - Present</p>
                  <p className="text-sm text-gray-700">Leading patient scheduling and EMR management for 5 healthcare providers, improving efficiency by 40%</p>
                </div>
                <div className="border-l-2 border-[#2E5E47] pl-4">
                  <h5 className="font-semibold text-gray-900 text-sm">Customer Support Representative</h5>
                  <p className="text-sm text-[#2E5E47] font-medium">MedTech Support</p>
                  <p className="text-xs text-gray-500 mb-1">2021 - 2022</p>
                  <p className="text-sm text-gray-700">Provided technical support for medical software, maintained 95% customer satisfaction rating</p>
                </div>
              </div>
            </div>

            {/* Education & Certifications */}
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-[#2E5E47]" />
                Education & Certifications
              </h4>
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2 text-sm">Education</h5>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h6 className="font-medium text-gray-900 text-sm">Certificate in Medical Administration</h6>
                    <p className="text-xs text-gray-600">Healthcare Training Institute • 2021</p>
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 mb-2 text-sm">Certifications</h5>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="bg-yellow-50 text-yellow-700 border-yellow-200 p-2 text-xs"
                    >
                      <Award className="h-3 w-3 mr-1" />
                      HIPAA Compliance • 2023
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-yellow-50 text-yellow-700 border-yellow-200 p-2 text-xs"
                    >
                      <Award className="h-3 w-3 mr-1" />
                      Medical Terminology • 2022
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Tests & Assessments */}
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#2E5E47]" />
                Tests & Assessments
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900 text-sm">Communication Skills</span>
                    <div className="text-xs text-gray-600">Skills Assessment</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    95%
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900 text-sm">Medical Knowledge</span>
                    <div className="text-xs text-gray-600">Domain Assessment</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    88%
                  </Badge>
                </div>
              </div>
            </div>

            {/* Internet Speed Test */}
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Wifi className="h-4 w-4 text-[#2E5E47]" />
                Internet Speed Test
              </h4>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Download Speed</div>
                  <span className="text-lg font-semibold text-gray-900">150.5 MB/s</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open('https://www.speedtest.net/result/sample', '_blank', 'noopener,noreferrer');
                  }}
                  className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors ml-auto"
                  title="View speedtest result"
                >
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Readiness for Work */}
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#2E5E47]" />
                Readiness for Work
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center gap-3 p-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-900">Dedicated Workspace</span>
                </div>
                <div className="flex items-center gap-3 p-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-900">Computer</span>
                </div>
                <div className="flex items-center gap-3 p-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-900">Webcam</span>
                </div>
                <div className="flex items-center gap-3 p-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-900">Reliable Internet</span>
                </div>
                <div className="flex items-center gap-3 p-2">
                  <CheckCircle className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-500">Backup Power</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Sticky Action Bar - Desktop Only */}
          {!isMobile && (
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    CST • 🇲🇽 Mexico • 3 yrs exp
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onShortlist(candidate.id);
                    }}
                    className="h-8"
                  >
                    <Heart className="h-3.5 w-3.5 mr-1" />
                    Shortlist
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToPipeline(candidate.id);
                    }}
                    className="h-8"
                  >
                    <Users className="h-3.5 w-3.5 mr-1" />
                    Add to Pipeline
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onShare(candidate.id);
                    }}
                    className="h-8"
                  >
                    <Share2 className="h-3.5 w-3.5 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}