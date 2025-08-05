import React, { useState } from 'react';
import { cn } from './ui/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';
import { 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Edit3, 
  Save, 
  X,
  ExternalLink,
  Plus
} from 'lucide-react';
import type { Candidate } from '../types';

interface CandidateCardSmallProps {
  candidate: Candidate;
  noteEditable?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  onViewProfile?: (candidateId: string) => void;
}

type NoteState = 'empty' | 'editing' | 'saved';

export function CandidateCardSmall({ 
  candidate, 
  noteEditable = false, 
  isSelected = false, 
  onSelect,
  onViewProfile 
}: CandidateCardSmallProps) {
  const [noteState, setNoteState] = useState<NoteState>('empty');
  const [noteText, setNoteText] = useState('');
  const [tempNoteText, setTempNoteText] = useState('');

  const handleStartEditing = () => {
    setTempNoteText(noteText);
    setNoteState('editing');
  };

  const handleSaveNote = () => {
    setNoteText(tempNoteText);
    setNoteState(tempNoteText.trim() ? 'saved' : 'empty');
  };

  const handleCancelEdit = () => {
    setTempNoteText('');
    setNoteState(noteText.trim() ? 'saved' : 'empty');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'interviewing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'placed':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'immediate':
        return 'bg-green-100 text-green-800';
      case 'short':
        return 'bg-yellow-100 text-yellow-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'long':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={cn(
      "relative bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-200",
      "hover:border-[#008080]/20 hover:shadow-lg",
      isSelected && "ring-2 ring-[#008080] ring-opacity-50"
    )} style={{ borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.06)' }}>
      
      {/* Selection Checkbox */}
      {noteEditable && onSelect && (
        <div className="absolute top-4 left-4 z-10">
          <Checkbox
            checked={isSelected}
            onCheckedChange={onSelect}
            className="data-[state=checked]:bg-[#008080] data-[state=checked]:border-[#008080] bg-white border-gray-300"
          />
        </div>
      )}

      <div className="p-6 space-y-4">
        {/* Header */}
        <div className={cn("flex items-start gap-4", noteEditable && "mt-6")}>
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <Avatar className="h-16 w-16 ring-2 ring-gray-100">
              <AvatarImage src={candidate.avatar} alt={candidate.name} />
              <AvatarFallback className="bg-gray-200 text-gray-700">
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {candidate.verified && (
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                <CheckCircle2 className="h-4 w-4 text-white" />
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-[#1E1E1E] truncate">{candidate.name}</h3>
                  <span className="text-lg">{candidate.countryFlag}</span>
                </div>
                <p className="text-gray-600 text-sm truncate">{candidate.title}</p>
              </div>
              
              {/* Status Badge */}
              <Badge 
                variant="outline" 
                className={cn("capitalize ml-2 flex-shrink-0", getStatusColor(candidate.status))}
              >
                {candidate.status.replace('_', ' ')}
              </Badge>
            </div>
          </div>
        </div>

        {/* Meta Information */}
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{candidate.country}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{candidate.timezone}</span>
          </div>
          <div className="text-gray-600">
            <span className="truncate">{candidate.experience}</span>
          </div>
        </div>

        {/* Rate Information */}
        <div className="bg-[#F8F9FA] rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Rate</span>
            <span className="font-semibold text-[#1E1E1E]">
              ${candidate.rate}/{candidate.currency === 'USD' ? 'hr' : 'hour'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Availability</span>
            <Badge 
              variant="secondary" 
              className={cn("text-xs capitalize", getAvailabilityColor(candidate.availability || 'medium'))}
            >
              {candidate.availability?.replace('_', ' ') || 'Available'}
            </Badge>
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-3">
          {/* Primary Skills */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
            <div className="flex flex-wrap gap-1.5">
              {candidate.skills.slice(0, 4).map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-xs bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
                >
                  {skill}
                </Badge>
              ))}
              {candidate.skills.length > 4 && (
                <Badge variant="secondary" className="text-xs bg-gray-50 text-gray-600">
                  +{candidate.skills.length - 4} more
                </Badge>
              )}
            </div>
          </div>

          {/* Tools */}
          {candidate.tools && candidate.tools.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Tools</h4>
              <div className="flex flex-wrap gap-1.5">
                {candidate.tools.slice(0, 3).map((tool, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-xs bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
                  >
                    {tool}
                  </Badge>
                ))}
                {candidate.tools.length > 3 && (
                  <Badge variant="secondary" className="text-xs bg-gray-50 text-gray-600">
                    +{candidate.tools.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Languages */}
        {candidate.languages && candidate.languages.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Languages</h4>
            <div className="flex flex-wrap gap-1.5">
              {candidate.languages.map((language, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs bg-gray-50 text-gray-700 border-gray-200"
                >
                  {language}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Editable Notes Section */}
        {noteEditable && (
          <div className="border-t border-gray-100 pt-4">
            {noteState === 'empty' && (
              <button
                onClick={handleStartEditing}
                className="w-full text-left text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add note
              </button>
            )}

            {noteState === 'editing' && (
              <div className="space-y-3">
                <Textarea
                  placeholder="Add internal notes about this candidate..."
                  value={tempNoteText}
                  onChange={(e) => setTempNoteText(e.target.value)}
                  className="min-h-[80px] text-sm resize-none"
                />
                <div className="flex items-center gap-2 justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCancelEdit}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSaveNote}
                    className="bg-[#008080] hover:bg-[#006666] text-white"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </div>
              </div>
            )}

            {noteState === 'saved' && (
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="text-sm text-gray-700 flex-1">{noteText}</div>
                  <button
                    onClick={handleStartEditing}
                    className="text-gray-400 hover:text-gray-600 ml-2 flex-shrink-0"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        <div className="border-t border-gray-100 pt-4">
          <Button
            variant="outline"
            className="w-full justify-center border-[#008080] text-[#008080] hover:bg-[#008080] hover:text-white"
            onClick={() => onViewProfile?.(candidate.id)}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View Profile
          </Button>
        </div>
      </div>
    </div>
  );
}