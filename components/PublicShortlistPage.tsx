import React, { useState } from 'react';
import { ExternalLink, Copy, Users, Eye, Calendar, ChevronDown, Info, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { CandidateCard } from './CandidateCard';
import { toast } from 'sonner';
import type { Candidate } from '../types';

interface PublicShortlistPageProps {
  shortlist: {
    id: string;
    name: string;
    candidates: Candidate[];
    views?: number;
    updatedAt: string;
    client?: string;
    location?: string;
    timezone?: string;
    description?: string;
    tags?: string[];
  };
  onCandidateView?: (candidateId: string) => void;
  onCandidateAction?: (action: string, candidateId: string) => void;
}

// Enhanced CandidateCardSmall component with Agency Notes
interface CandidateCardSmallProps {
  candidate: Candidate;
  isSelected: boolean;
  onSelect: (candidateId: string, selected: boolean) => void;
  onView: (candidateId: string) => void;
  onAction?: (action: string, candidateId: string) => void;
}

function CandidateCardSmall({ 
  candidate, 
  isSelected, 
  onSelect, 
  onView, 
  onAction 
}: CandidateCardSmallProps) {
  const [showAgencyNotes, setShowAgencyNotes] = useState(false);

  return (
    <div className="w-full max-w-[540px] h-fit">
      <div className="relative">
        <CandidateCard
          candidate={candidate}
          viewMode="grid"
          isSelected={isSelected}
          onSelect={onSelect}
          onView={onView}
          onAction={onAction}
        />
        
        {/* Agency Notes Section */}
        <div className="mt-4">
          <Collapsible open={showAgencyNotes} onOpenChange={setShowAgencyNotes}>
            <Card className="bg-[#F8F9FA] border-[#E5E5E5] shadow-none">
              <CardContent className="p-4">
                <CollapsibleTrigger asChild>
                  <div className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-semibold text-gray-700">Agency Notes</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${showAgencyNotes ? 'rotate-180' : ''}`} />
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="mt-3">
                  <div className="text-sm text-gray-600 leading-relaxed">
                    Add internal context about this candidate's background, interview performance, 
                    or specific notes for the client presentation...
                  </div>
                </CollapsibleContent>
              </CardContent>
            </Card>
          </Collapsible>
        </div>
      </div>
    </div>
  );
}

export function PublicShortlistPage({
  shortlist,
  onCandidateView,
  onCandidateAction
}: PublicShortlistPageProps) {
  const [selectedCandidates, setSelectedCandidates] = useState<Set<string>>(new Set());
  const [showPositionDetails, setShowPositionDetails] = useState(false);

  // Mock data for demonstration
  const mockData = {
    views: shortlist.views || 142,
    updatedAt: new Date(shortlist.updatedAt).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }),
    client: shortlist.client || "TechCorp Inc.",
    location: shortlist.location || "San Francisco, CA / PST",
    description: shortlist.description || "We're looking for experienced frontend developers to join our growing engineering team. The ideal candidates should have strong experience with React, TypeScript, and modern development practices.",
    tags: shortlist.tags || ["React", "TypeScript", "Senior Level", "Full-time", "Remote OK"]
  };

  const handleCopyShareLink = async () => {
    const shareUrl = `${window.location.origin}/shortlist/${shortlist.id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Share link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const handleOpenInNewTab = () => {
    const shareUrl = `${window.location.origin}/shortlist/${shortlist.id}`;
    window.open(shareUrl, '_blank');
  };

  const handleCandidateSelect = (candidateId: string, selected: boolean) => {
    const newSelected = new Set(selectedCandidates);
    if (selected) {
      newSelected.add(candidateId);
    } else {
      newSelected.delete(candidateId);
    }
    setSelectedCandidates(newSelected);
  };

  const handleCandidateView = (candidateId: string) => {
    onCandidateView?.(candidateId);
  };

  const handleCandidateAction = (action: string, candidateId: string) => {
    onCandidateAction?.(action, candidateId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Public Shortlist Content */}
        <div className="bg-white rounded-[20px] shadow-[0_24px_48px_rgba(0,0,0,0.12)] flex flex-col">
          {/* Header Section */}
          <div className="flex-shrink-0 p-12 pb-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                {/* H1 Title */}
                <h1 className="text-[32px] font-semibold leading-[40px] text-gray-900 mb-3">
                  {shortlist.name}
                </h1>
                
                {/* Stats Row */}
                <div className="flex items-center gap-4 text-base text-[#4A4A4A] mb-6">
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    <span>{shortlist.candidates.length} candidates</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Eye className="h-4 w-4" />
                    <span>{mockData.views} views</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <span>Updated {mockData.updatedAt}</span>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="border-t border-[#E0E0E0] mb-6"></div>
              </div>
              
              {/* Header Actions */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleCopyShareLink}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 h-10"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Share Link
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleOpenInNewTab}
                  className="h-10 w-10 p-0 border-gray-300"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Position Details Card */}
            <div className="mb-8">
              <Card className="bg-white shadow-[0_4px_8px_rgba(0,0,0,0.05)] border border-gray-200 rounded-xl">
                <CardContent className="p-6">
                  <Collapsible open={showPositionDetails} onOpenChange={setShowPositionDetails}>
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <Info className="h-5 w-5 text-blue-600" />
                          <span className="text-sm font-semibold text-gray-900">Position Details</span>
                        </div>
                        <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${showPositionDetails ? 'rotate-180' : ''}`} />
                      </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent className="mt-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="text-sm font-medium text-gray-700 mb-1">Client</div>
                          <div className="text-base text-gray-900">{mockData.client}</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-700 mb-1">Location / Time Zone</div>
                          <div className="text-base text-gray-900">{mockData.location}</div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-2">Description</div>
                        <div className="text-base leading-6 text-gray-900">
                          {mockData.description}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-3">Tags</div>
                        <div className="flex flex-wrap gap-2">
                          {mockData.tags.map((tag, index) => (
                            <Badge 
                              key={index} 
                              variant="outline"
                              className="bg-[#F3F3F3] text-gray-700 border-gray-300 px-3 py-1 text-sm rounded-lg"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Candidates Grid Section */}
          <div className="candidate-grid flex-1 px-12 pb-6">
            <div 
              className="grid gap-8 mt-8"
              style={{ 
                gridTemplateColumns: 'repeat(auto-fit, minmax(540px, 1fr))',
                columnGap: '32px',
                rowGap: '32px'
              }}
            >
              {shortlist.candidates.map((candidate) => (
                <CandidateCardSmall
                  key={candidate.id}
                  candidate={candidate}
                  isSelected={selectedCandidates.has(candidate.id)}
                  onSelect={handleCandidateSelect}
                  onView={handleCandidateView}
                  onAction={handleCandidateAction}
                />
              ))}
            </div>
            
            {shortlist.candidates.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates yet</h3>
                <p className="text-gray-600">
                  This shortlist is empty. Add candidates to get started.
                </p>
                </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 px-12 pb-12 pt-6">
            <div className="text-center">
              <p className="text-xs text-gray-500">Powered by Found24</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}