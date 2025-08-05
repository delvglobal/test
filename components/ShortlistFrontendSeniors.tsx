import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import { 
  Info, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check,
  Link,
  MapPin,
  Clock,
  Sparkles,
  Play,
  MoreHorizontal,
  ExternalLink
} from 'lucide-react';

// Mock shortlist data
const mockShortlistData = {
  id: '1',
  name: 'Frontend Seniors',
  description: 'Senior frontend developers with React expertise for our new product team. Looking for candidates with 5+ years experience in modern JavaScript frameworks and a proven track record of building scalable web applications.',
  tags: ['Frontend', 'React', 'Senior', 'Remote-OK', 'TypeScript'],
  shareableLink: 'https://delv.global/shortlists/frontend-seniors-abc123',
  candidateCount: 4,
  viewCount: 124,
  updatedAt: '2024-01-19T14:30:00Z'
};

// Enhanced mock candidate data for custom cards
const mockCandidates = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b120?w=150&h=150&fit=crop&crop=face',
    status: 'Available for Work',
    statusColor: 'green',
    timezone: 'PST (UTC-8)',
    country: '🇺🇸 United States',
    experience: '8 years',
    languages: ['English', 'Spanish', 'Mandarin'],
    rate: '$85/hr',
    availability: 'Immediate',
    jobType: 'Contract/Full-time',
    roles: [
      'Senior Frontend Developer at Airbnb (3 years)',
      'Lead React Developer at Stripe (2 years)',
      'Frontend Architect at Netflix (3 years)'
    ],
    skills: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Redux', 'Jest'],
    tools: ['VS Code', 'Figma', 'GitHub', 'Docker', 'AWS', 'Vercel']
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    status: 'Available in 2 weeks',
    statusColor: 'yellow',
    timezone: 'EST (UTC-5)',
    country: '🇨🇦 Canada',
    experience: '12 years',
    languages: ['English', 'French'],
    rate: '$95/hr',
    availability: '2-4 weeks',
    jobType: 'Contract preferred',
    roles: [
      'Frontend Architect at Shopify (4 years)',
      'Senior Developer at Square (3 years)',
      'Tech Lead at Zoom (5 years)'
    ],
    skills: ['React', 'Vue.js', 'Angular', 'TypeScript', 'GraphQL', 'Cypress'],
    tools: ['VS Code', 'Sketch', 'GitLab', 'Kubernetes', 'GCP', 'Netlify']
  },
  {
    id: '3',
    name: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    status: 'Available for Work',
    statusColor: 'green',
    timezone: 'GMT (UTC+0)',
    country: '🇬🇧 United Kingdom',
    experience: '6 years',
    languages: ['English'],
    rate: '£75/hr',
    availability: 'Immediate',
    jobType: 'Remote only',
    roles: [
      'Senior React Developer at Monzo (2 years)',
      'Frontend Developer at BBC (2 years)',
      'Full-stack Developer at Revolut (2 years)'
    ],
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'React Native', 'Tailwind'],
    tools: ['VS Code', 'Adobe XD', 'GitHub', 'Heroku', 'MongoDB', 'Stripe']
  },
  {
    id: '4',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    status: 'Open to Opportunities',
    statusColor: 'blue',
    timezone: 'AEST (UTC+10)',
    country: '🇦🇺 Australia',
    experience: '10 years',
    languages: ['English', 'Korean'],
    rate: 'A$80/hr',
    availability: '1-2 months',
    jobType: 'Full-time preferred',
    roles: [
      'Frontend Team Lead at Atlassian (3 years)',
      'Senior Developer at Canva (3 years)',
      'React Specialist at Freelancer (4 years)'
    ],
    skills: ['React', 'Redux', 'JavaScript', 'Webpack', 'Performance', 'Testing'],
    tools: ['VS Code', 'Chrome DevTools', 'GitHub', 'Jenkins', 'New Relic', 'Sentry']
  }
];

// Custom Candidate Card Component
function CustomCandidateCard({ candidate }: { candidate: typeof mockCandidates[0] }) {
  const getStatusColor = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'yellow':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'blue':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div 
      className="bg-white rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      style={{
        boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
        border: '1px solid rgba(0,0,0,0.08)'
      }}
    >
      {/* Header with Avatar, Name, Status, and Actions */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={candidate.avatar} alt={candidate.name} />
            <AvatarFallback className="text-base font-medium">
              {candidate.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              {candidate.name}
            </h2>
            <Badge 
              className={`text-xs font-medium border ${getStatusColor(candidate.statusColor)}`}
              variant="outline"
            >
              {candidate.status}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="bg-[#2E5E47] text-white hover:bg-[#1d3d2b] border-[#2E5E47]"
          >
            <Play className="h-3 w-3 mr-1" />
            Video
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Meta Row */}
      <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          <span>{candidate.country}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{candidate.timezone}</span>
        </div>
        <div>
          <span className="font-medium">{candidate.experience}</span> experience
        </div>
      </div>

      {/* Languages Line */}
      <div className="flex items-center gap-2 mb-4 text-sm">
        <Sparkles className="h-4 w-4 text-amber-500" />
        <span className="text-gray-600">Languages:</span>
        <span className="text-gray-900 font-medium">
          {candidate.languages.join(' · ')}
        </span>
      </div>

      {/* Rates/Availability/Job Type Sub-card */}
      <div 
        className="bg-gray-50 rounded-lg p-3 mb-4"
        style={{ backgroundColor: '#F3F3F3' }}
      >
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div>
            <div className="text-gray-600 text-xs mb-1">Rate</div>
            <div className="font-semibold text-gray-900">{candidate.rate}</div>
          </div>
          <div>
            <div className="text-gray-600 text-xs mb-1">Availability</div>
            <div className="font-semibold text-gray-900">{candidate.availability}</div>
          </div>
          <div>
            <div className="text-gray-600 text-xs mb-1">Job Type</div>
            <div className="font-semibold text-gray-900 text-xs">{candidate.jobType}</div>
          </div>
        </div>
      </div>

      {/* Roles List */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Roles</h4>
        <div className="space-y-1">
          {candidate.roles.slice(0, 2).map((role, index) => (
            <div key={index} className="text-sm text-gray-700 leading-relaxed">
              {role}
            </div>
          ))}
          {candidate.roles.length > 2 && (
            <div className="text-sm text-gray-500">
              +{candidate.roles.length - 2} more roles
            </div>
          )}
        </div>
      </div>

      {/* Skills & Tools */}
      <div className="space-y-3 mb-4">
        {/* Skills */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Skills</h4>
          <div className="flex flex-wrap gap-1.5">
            {candidate.skills.map((skill) => (
              <Badge 
                key={skill} 
                variant="secondary" 
                className="text-xs px-2 py-1 bg-blue-50 text-blue-700 border-blue-200"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Tools</h4>
          <div className="flex flex-wrap gap-1.5">
            {candidate.tools.map((tool) => (
              <Badge 
                key={tool} 
                variant="secondary" 
                className="text-xs px-2 py-1 bg-green-50 text-green-700 border-green-200"
              >
                {tool}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Footer - View Profile Button */}
      <Button 
        className="w-full bg-[#2E5E47] hover:bg-[#1d3d2b] text-white"
        size="sm"
      >
        <ExternalLink className="h-4 w-4 mr-2" />
        View Profile
      </Button>
    </div>
  );
}

export function ShortlistFrontendSeniors() {
  const [showDetails, setShowDetails] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(mockShortlistData.shareableLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Main Container - Content Columns 3-12 equivalent */}
      <div className="max-w-7xl mx-auto px-8" style={{ paddingTop: '48px' }}>
        
        {/* 1. Hero/Header Section */}
        <div className="mb-8">
          {/* H1 Title - 32px semibold, 40px line-height */}
          <h1 
            className="font-semibold text-gray-900 mb-3"
            style={{ 
              fontSize: '32px', 
              lineHeight: '40px' 
            }}
          >
            Frontend Seniors
          </h1>
          
          {/* Subline - 16px/24px regular, #4A4A4A with bullets */}
          <div 
            className="flex items-center gap-4 mb-6"
            style={{ 
              fontSize: '16px', 
              lineHeight: '24px',
              color: '#4A4A4A'
            }}
          >
            <span>{mockShortlistData.candidateCount} candidates</span>
            <div className="w-1 h-1 bg-current rounded-full"></div>
            <span>{mockShortlistData.viewCount} views</span>
            <div className="w-1 h-1 bg-current rounded-full"></div>
            <span>Updated {formatDate(mockShortlistData.updatedAt)}</span>
          </div>
          
          {/* Divider - 1px #E0E0E0, full width, 24px margin below */}
          <div className="w-full h-px bg-gray-200 mb-6" style={{ backgroundColor: '#E0E0E0' }}></div>
        </div>

        {/* 2. Collapsible "Shortlist Details" Card - 32px margin from hero */}
        <div className="mb-12" style={{ marginTop: '32px' }}>
          <Collapsible open={showDetails} onOpenChange={setShowDetails}>
            <Card 
              className="bg-white border border-gray-200"
              style={{
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                padding: '24px'
              }}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50/50 transition-colors p-0 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-gray-500" />
                      <CardTitle 
                        className="text-gray-900"
                        style={{ fontSize: '14px', fontWeight: '600' }}
                      >
                        Shortlist Details
                      </CardTitle>
                    </div>
                    {showDetails ? (
                      <ChevronUp className="h-4 w-4 text-gray-500 transition-transform" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-500 transition-transform" />
                    )}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="p-0 space-y-4">
                  {/* Description - 16px/24px regular */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                    <p 
                      className="text-gray-600"
                      style={{ fontSize: '16px', lineHeight: '24px' }}
                    >
                      {mockShortlistData.description}
                    </p>
                  </div>
                  
                  {/* Tags - pill chips, 14px/20px, bg #F3F3F3, radius 8px */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {mockShortlistData.tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary" 
                          className="text-gray-700"
                          style={{ 
                            fontSize: '14px', 
                            lineHeight: '20px',
                            backgroundColor: '#F3F3F3',
                            borderRadius: '8px',
                            padding: '4px 12px'
                          }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Shareable Link - input-style field with copy button */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Shareable Link</h4>
                    <div 
                      className="flex items-center gap-3 p-3 border rounded-lg"
                      style={{ backgroundColor: '#F3F3F3', borderRadius: '8px' }}
                    >
                      <Link className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <code className="text-sm text-gray-600 flex-1 min-w-0 truncate">
                        {mockShortlistData.shareableLink}
                      </code>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleCopyLink}
                        className="flex-shrink-0"
                      >
                        {linkCopied ? (
                          <>
                            <Check className="h-3 w-3 mr-1" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </div>

        {/* 3. Candidate Grid - 48px margin from details card */}
        <div style={{ marginTop: '48px' }}>
          {/* Two-column grid, 32px gap, collapse to one column below 768px */}
          <div 
            className="grid gap-8 lg:grid-cols-2 grid-cols-1 mb-8"
            style={{ gap: '32px' }}
          >
            {mockCandidates.map((candidate) => (
              <CustomCandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        </div>

        {/* Bottom Padding */}
        <div className="pb-16"></div>
      </div>
    </div>
  );
}