import React, { useState } from 'react';
import { cn } from './ui/utils';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Copy,
  Check,
  ExternalLink,
  MapPin,
  Shield,
  Calendar,
  Users,
  Star,
  Clock,
  Building,
  Eye,
  Verified,
  Target,
  Award,
  ChevronRight
} from 'lucide-react';

// Mock candidate data - keeping exactly the same
const mockCandidates = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b120?w=150&h=150&fit=crop&crop=face',
    title: 'Senior Frontend Developer',
    location: 'San Francisco, CA',
    experience: '8 years',
    rate: '$85/hr',
    availability: 'Available now',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    tools: ['Figma', 'Git', 'Docker', 'AWS'],
    timezone: 'PST'
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    title: 'Frontend Architect',
    location: 'Austin, TX',
    experience: '12 years',
    rate: '$95/hr',
    availability: 'Available in 2 weeks',
    skills: ['React', 'Vue.js', 'Angular', 'GraphQL'],
    tools: ['Sketch', 'Git', 'Jenkins', 'Azure'],
    timezone: 'CST'
  }
];

// Candidate Card Component - keeping exactly the same
interface CandidateCardProps {
  candidate: typeof mockCandidates[0];
}

function CandidateCard({ candidate }: CandidateCardProps) {
  return (
    <div className="w-[340px] bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="candidate-avatar-container">
          <Avatar className="h-12 w-12">
            <AvatarImage src={candidate.avatar} alt={candidate.name} />
            <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="candidate-verification-badge">
            <Shield className="h-3 w-3 text-white" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{candidate.name}</h3>
          <p className="text-sm text-gray-600 truncate">{candidate.title}</p>
          <div className="flex items-center gap-1 mt-1">
            <MapPin className="h-3 w-3 text-gray-400" />
            <span className="text-xs text-gray-500">{candidate.location}</span>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="candidate-rate-grid p-3 mb-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-500 block">Experience</span>
            <span className="font-medium text-gray-900">{candidate.experience}</span>
          </div>
          <div>
            <span className="text-gray-500 block">Rate</span>
            <span className="font-medium text-gray-900">{candidate.rate}</span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100">
          <span className="text-gray-500 text-xs block">Availability</span>
          <span className="font-medium text-gray-900 text-sm">{candidate.availability}</span>
        </div>
      </div>

      {/* Skills & Tools */}
      <div className="space-y-3 mb-4">
        <div>
          <h4 className="text-xs font-medium text-gray-700 mb-2">Skills</h4>
          <div className="flex flex-wrap gap-1.5">
            {candidate.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="candidate-skill-badge text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-medium text-gray-700 mb-2">Tools</h4>
          <div className="flex flex-wrap gap-1.5">
            {candidate.tools.map((tool) => (
              <Badge key={tool} variant="secondary" className="candidate-tool-badge text-xs">
                {tool}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2 border-t border-gray-100">
        <Button size="sm" className="flex-1">
          <ExternalLink className="h-3 w-3 mr-1" />
          View Profile
        </Button>
      </div>
    </div>
  );
}

export function ShortlistPageWrapper() {
  const [linkCopied, setLinkCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText('https://delv.global/shortlists/frontend-seniors-abc123');
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      
      {/* COMPACT HERO SECTION */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-pink-600/10"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-cyan-400/10 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-2/3 bg-gradient-to-tr from-violet-400/10 to-transparent blur-2xl"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
          {/* Company Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                  <Building className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">ACME Health</h4>
                  <p className="text-blue-200 text-sm">Curated by DELV Global</p>
                </div>
              </div>
            </div>
            
            <Button
              variant="outline" 
              size="sm"
              onClick={handleCopyLink}
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:border-white/30"
            >
              {linkCopied ? (
                <>
                  <Check className="h-4 w-4 mr-2 text-emerald-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Share
                </>
              )}
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-center">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                    <Verified className="h-3 w-3 mr-1" />
                    Verified Candidates
                  </Badge>
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                    <Target className="h-3 w-3 mr-1" />
                    Hand-picked
                  </Badge>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                  Frontend Development
                  <span className="block text-transparent bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text">
                    Senior Talent
                  </span>
                </h1>
                
                <p className="text-xl text-slate-300 leading-relaxed">
                  Meet the senior frontend architects selected specifically for your technical requirements. 
                  Each candidate has been vetted for expertise in React, TypeScript, and modern development practices.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg"
                  onClick={() => document.getElementById('candidates')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <ChevronRight className="h-5 w-5 mr-2" />
                  View Candidates Below
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg" 
                  className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Schedule Interviews
                </Button>
              </div>
            </div>

            {/* Stats Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Shortlist Summary
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Total Candidates</span>
                    <span className="text-2xl font-bold text-white">4</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Avg. Experience</span>
                    <span className="text-2xl font-bold text-cyan-300">8+ yrs</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Availability</span>
                    <span className="text-lg font-semibold text-emerald-300">Immediate</span>
                  </div>
                  
                  <div className="pt-3 border-t border-white/20">
                    <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <Eye className="h-4 w-4" />
                      <span>Last updated January 19, 2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CANDIDATES SECTION */}
      <div id="candidates" className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium mb-4">
              <Users className="h-4 w-4" />
              Senior Frontend Candidates
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Ready to Interview</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each candidate has been carefully selected based on your technical requirements, 
              team culture, and project timeline.
            </p>
          </div>
          
          {/* Candidate Grid - keeping cards exactly the same */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center mb-12">
            {mockCandidates.map((candidate) => (
              <div key={candidate.id} className="transform hover:scale-105 transition-all duration-300">
                <CandidateCard candidate={candidate} />
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-4xl mx-auto">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Next Steps</h3>
                  <p className="text-lg text-gray-600">
                    Ready to move forward? Schedule interviews with your preferred candidates 
                    or request additional profiles from our talent network.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button size="lg" className="bg-[#2E5E47] hover:bg-[#1d3d2b] text-white px-8">
                    <Calendar className="h-5 w-5 mr-2" />
                    Schedule Interviews
                  </Button>
                  
                  <Button variant="outline" size="lg" className="px-8">
                    Request More Candidates
                  </Button>
                </div>
                
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-2 text-gray-500">
                    <Shield className="h-4 w-4" />
                    <span>All candidates are verified and reference-checked</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}