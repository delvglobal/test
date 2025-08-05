import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent } from '../ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { ScrollArea } from '../ui/scroll-area';
import { Search, Users, MapPin, DollarSign, Star, Filter, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AddCandidateToPipelineModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pipelineName: string;
  stageId?: string;
  stageName?: string;
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  avatar: string;
  matchScore: number;
  currentSalary?: number;
  expectedSalary?: number;
  location: string;
  experience: number;
  skills: string[];
  status: 'active' | 'passive' | 'unavailable';
  lastActivity: string;
  verified: boolean;
}

// Mock candidate pool data
const mockCandidates: Candidate[] = [
  {
    id: 'c1',
    name: 'Emma Rodriguez',
    email: 'emma.rodriguez@email.com',
    avatar: '/avatar-1.jpg',
    matchScore: 95,
    currentSalary: 120000,
    expectedSalary: 145000,
    location: 'San Francisco, CA',
    experience: 6,
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
    status: 'active',
    lastActivity: '2 hours ago',
    verified: true
  },
  {
    id: 'c2',
    name: 'James Chen',
    email: 'james.chen@email.com',
    avatar: '/avatar-2.jpg',
    matchScore: 92,
    currentSalary: 110000,
    expectedSalary: 135000,
    location: 'Seattle, WA',
    experience: 5,
    skills: ['React', 'Python', 'Django', 'PostgreSQL'],
    status: 'passive',
    lastActivity: '1 day ago',
    verified: true
  },
  {
    id: 'c3',
    name: 'Sofia Martinez',
    email: 'sofia.martinez@email.com',
    avatar: '/avatar-3.jpg',
    matchScore: 88,
    currentSalary: 95000,
    expectedSalary: 125000,
    location: 'Austin, TX',
    experience: 4,
    skills: ['React', 'JavaScript', 'MongoDB', 'Express'],
    status: 'active',
    lastActivity: '3 hours ago',
    verified: false
  },
  {
    id: 'c4',
    name: 'Michael Thompson',
    email: 'michael.thompson@email.com',
    avatar: '/avatar-4.jpg',
    matchScore: 90,
    currentSalary: 105000,
    expectedSalary: 130000,
    location: 'Denver, CO',
    experience: 7,
    skills: ['React', 'Vue.js', 'Node.js', 'Docker', 'Kubernetes'],
    status: 'active',
    lastActivity: '5 hours ago',
    verified: true
  },
  {
    id: 'c5',
    name: 'Ashley Kim',
    email: 'ashley.kim@email.com',
    avatar: '/avatar-5.jpg',
    matchScore: 87,
    currentSalary: 115000,
    expectedSalary: 140000,
    location: 'Portland, OR',
    experience: 6,
    skills: ['React', 'TypeScript', 'Redux', 'Testing', 'CI/CD'],
    status: 'passive',
    lastActivity: '1 day ago',
    verified: true
  },
  {
    id: 'c6',
    name: 'David Wilson',
    email: 'david.wilson@email.com',
    avatar: '/avatar-6.jpg',
    matchScore: 85,
    currentSalary: 90000,
    expectedSalary: 115000,
    location: 'Phoenix, AZ',
    experience: 3,
    skills: ['React', 'JavaScript', 'HTML', 'CSS'],
    status: 'unavailable',
    lastActivity: '3 days ago',
    verified: false
  }
];

export function AddCandidateToPipelineModal({ 
  open, 
  onOpenChange, 
  pipelineName, 
  stageId, 
  stageName 
}: AddCandidateToPipelineModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [verificationFilter, setVerificationFilter] = useState<string>('all');
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filter candidates
  const filteredCandidates = mockCandidates.filter(candidate => {
    const matchesSearch = searchTerm === '' || 
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    const matchesVerification = verificationFilter === 'all' || 
      (verificationFilter === 'verified' && candidate.verified) ||
      (verificationFilter === 'unverified' && !candidate.verified);

    return matchesSearch && matchesStatus && matchesVerification;
  });

  const handleCandidateSelection = (candidateId: string, selected: boolean) => {
    if (selected) {
      setSelectedCandidates(prev => [...prev, candidateId]);
    } else {
      setSelectedCandidates(prev => prev.filter(id => id !== candidateId));
    }
  };

  const handleSelectAll = () => {
    if (selectedCandidates.length === filteredCandidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(filteredCandidates.map(c => c.id));
    }
  };

  const handleAddCandidates = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Candidates added successfully!', {
        description: `${selectedCandidates.length} candidate(s) added to ${pipelineName}${stageName ? ` (${stageName} stage)` : ''}.`
      });
      
      handleClose();
    } catch (error) {
      toast.error('Failed to add candidates');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setVerificationFilter('all');
    setSelectedCandidates([]);
    setIsLoading(false);
    onOpenChange(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'passive': return 'bg-yellow-100 text-yellow-700';
      case 'unavailable': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-[#2E5E47]/10 rounded-lg">
              <Users className="h-5 w-5 text-[#2E5E47]" />
            </div>
            Add Candidates to Pipeline
          </DialogTitle>
          <DialogDescription>
            Select candidates from your talent pool to add to <strong>{pipelineName}</strong>
            {stageName && <span> in the <strong>{stageName}</strong> stage</span>}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search candidates by name, email, location, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="passive">Passive</SelectItem>
                  <SelectItem value="unavailable">Unavailable</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={verificationFilter} onValueChange={setVerificationFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Verification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Candidates</SelectItem>
                  <SelectItem value="verified">Verified Only</SelectItem>
                  <SelectItem value="unverified">Unverified Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Selection Controls */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-4">
              <Checkbox
                checked={selectedCandidates.length === filteredCandidates.length && filteredCandidates.length > 0}
                onCheckedChange={handleSelectAll}
                disabled={filteredCandidates.length === 0}
              />
              <span className="text-sm font-medium">
                {selectedCandidates.length > 0 
                  ? `${selectedCandidates.length} of ${filteredCandidates.length} selected`
                  : `Select all ${filteredCandidates.length} candidates`
                }
              </span>
            </div>
            {selectedCandidates.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCandidates([])}
              >
                <X className="h-4 w-4 mr-2" />
                Clear Selection
              </Button>
            )}
          </div>

          {/* Candidates List */}
          <ScrollArea className="h-96">
            {filteredCandidates.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No candidates found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-2">
                {filteredCandidates.map((candidate) => (
                  <Card 
                    key={candidate.id} 
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedCandidates.includes(candidate.id) 
                        ? 'ring-2 ring-[#2E5E47] bg-[#2E5E47]/5' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleCandidateSelection(
                      candidate.id, 
                      !selectedCandidates.includes(candidate.id)
                    )}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={selectedCandidates.includes(candidate.id)}
                          onCheckedChange={(checked) => 
                            handleCandidateSelection(candidate.id, checked as boolean)
                          }
                          onClick={(e) => e.stopPropagation()}
                        />
                        
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={candidate.avatar} alt={candidate.name} />
                          <AvatarFallback>
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium truncate">{candidate.name}</h4>
                            {candidate.verified && (
                              <Badge className="bg-[#2E5E47] text-white text-xs">
                                Verified
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-sm text-gray-600 truncate mb-2">
                            {candidate.email}
                          </p>
                          
                          <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {candidate.location}
                            </span>
                            <span>{candidate.experience}y exp</span>
                            <span>Match: {candidate.matchScore}%</span>
                          </div>
                          
                          <div className="flex items-center justify-between mb-2">
                            <Badge className={`text-xs ${getStatusColor(candidate.status)}`}>
                              {candidate.status}
                            </Badge>
                            {candidate.expectedSalary && (
                              <span className="text-xs text-gray-600 flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                ${candidate.expectedSalary.toLocaleString()}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {candidate.skills.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {candidate.skills.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{candidate.skills.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>

        <DialogFooter className="flex gap-3 pt-6">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleClose}
            className="px-6"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAddCandidates}
            className="bg-[#2E5E47] hover:bg-[#2E5E47]/90 px-6"
            disabled={isLoading || selectedCandidates.length === 0}
          >
            {isLoading 
              ? 'Adding Candidates...' 
              : `Add ${selectedCandidates.length} Candidate${selectedCandidates.length !== 1 ? 's' : ''}`
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}