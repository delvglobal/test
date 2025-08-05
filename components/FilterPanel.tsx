import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Checkbox } from './ui/checkbox';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { Calendar } from './ui/calendar';
import { 
  Filter, 
  X, 
  Search, 
  MapPin, 
  DollarSign, 
  Calendar as CalendarIcon, 
  Star, 
  Briefcase, 
  Users, 
  Code, 
  GraduationCap,
  Building2,
  Globe,
  CheckCircle,
  XCircle,
  Clock,
  ChevronDown,
  SlidersHorizontal,
  Zap,
  Target,
  AlertCircle
} from 'lucide-react';
import { cn } from './ui/utils';

interface FilterPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  onApplyFilters: (filters: FilterState) => void;
  currentFilters: FilterState;
  resultCount?: number;
}

interface FilterState {
  search: string;
  status: string[];
  location: string[];
  skills: string[];
  salaryRange: [number, number];
  experienceRange: [number, number];
  availability: string[];
  jobTypes: string[];
  educationLevel: string[];
  verificationStatus: string;
  lastActivity: string;
  dateAdded: [Date | null, Date | null];
  matchScore: [number, number];
  clientTypes: string[];
}

const statusOptions = [
  { id: 'active', label: 'Active', icon: CheckCircle, color: 'text-green-600' },
  { id: 'passive', label: 'Passive', icon: Clock, color: 'text-yellow-600' },
  { id: 'unavailable', label: 'Unavailable', icon: XCircle, color: 'text-red-600' },
  { id: 'interview', label: 'In Interview', icon: Users, color: 'text-blue-600' },
  { id: 'offer', label: 'Offer Stage', icon: Target, color: 'text-purple-600' },
];

const availabilityOptions = [
  { id: 'immediate', label: 'Immediate (0-2 weeks)' },
  { id: 'short', label: 'Short term (2-4 weeks)' },
  { id: 'medium', label: 'Medium term (1-2 months)' },
  { id: 'long', label: 'Long term (2+ months)' },
  { id: 'not-looking', label: 'Not actively looking' },
];

const jobTypeOptions = [
  { id: 'full-time', label: 'Full-time' },
  { id: 'part-time', label: 'Part-time' },
  { id: 'contract', label: 'Contract' },
  { id: 'freelance', label: 'Freelance' },
  { id: 'internship', label: 'Internship' },
];

const educationOptions = [
  { id: 'high-school', label: 'High School' },
  { id: 'associates', label: 'Associate Degree' },
  { id: 'bachelors', label: 'Bachelor\'s Degree' },
  { id: 'masters', label: 'Master\'s Degree' },
  { id: 'phd', label: 'PhD/Doctorate' },
  { id: 'bootcamp', label: 'Bootcamp/Certificate' },
];

const popularSkills = [
  'React', 'JavaScript', 'TypeScript', 'Python', 'Java', 'Node.js',
  'AWS', 'Docker', 'Kubernetes', 'SQL', 'MongoDB', 'GraphQL',
  'Next.js', 'Vue.js', 'Angular', 'Go', 'Rust', 'DevOps',
  'UI/UX Design', 'Product Management', 'Data Science', 'Machine Learning'
];

const popularLocations = [
  'San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Austin, TX',
  'Los Angeles, CA', 'Boston, MA', 'Denver, CO', 'Portland, OR',
  'Chicago, IL', 'Remote', 'United States', 'Canada', 'Europe'
];

const clientTypeOptions = [
  { id: 'startup', label: 'Startup', icon: Zap },
  { id: 'enterprise', label: 'Enterprise', icon: Building2 },
  { id: 'agency', label: 'Agency', icon: Users },
  { id: 'consulting', label: 'Consulting', icon: Briefcase },
];

export function FilterPanel({ isOpen, onToggle, onApplyFilters, currentFilters, resultCount }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>(currentFilters);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    basic: true,
    skills: false,
    compensation: false,
    experience: false,
    preferences: false,
    advanced: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const addToArrayFilter = (key: keyof FilterState, value: string) => {
    const currentArray = filters[key] as string[];
    if (!currentArray.includes(value)) {
      updateFilter(key, [...currentArray, value]);
    }
  };

  const removeFromArrayFilter = (key: keyof FilterState, value: string) => {
    const currentArray = filters[key] as string[];
    updateFilter(key, currentArray.filter(item => item !== value));
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      search: '',
      status: [],
      location: [],
      skills: [],
      salaryRange: [0, 300],
      experienceRange: [0, 20],
      availability: [],
      jobTypes: [],
      educationLevel: [],
      verificationStatus: 'all',
      lastActivity: 'all',
      dateAdded: [null, null],
      matchScore: [0, 100],
      clientTypes: [],
    };
    setFilters(clearedFilters);
  };

  const applyFilters = () => {
    onApplyFilters(filters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    count += filters.status.length;
    count += filters.location.length;
    count += filters.skills.length;
    count += filters.availability.length;
    count += filters.jobTypes.length;
    count += filters.educationLevel.length;
    count += filters.clientTypes.length;
    if (filters.verificationStatus !== 'all') count++;
    if (filters.lastActivity !== 'all') count++;
    if (filters.salaryRange[0] > 0 || filters.salaryRange[1] < 300) count++;
    if (filters.experienceRange[0] > 0 || filters.experienceRange[1] < 20) count++;
    if (filters.matchScore[0] > 0 || filters.matchScore[1] < 100) count++;
    if (filters.dateAdded[0] || filters.dateAdded[1]) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        onClick={onToggle}
        className="flex items-center gap-2 relative"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Advanced Filters
        {activeFilterCount > 0 && (
          <Badge className="bg-[#2E5E47] text-white ml-2">
            {activeFilterCount}
          </Badge>
        )}
      </Button>
    );
  }

  return (
    <Card className="backdrop-blur-md bg-white/95 border border-white/20 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-[#2E5E47]/10 rounded-lg">
              <SlidersHorizontal className="h-5 w-5 text-[#2E5E47]" />
            </div>
            Advanced Filters
            {activeFilterCount > 0 && (
              <Badge className="bg-[#2E5E47] text-white">
                {activeFilterCount} active
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            {resultCount !== undefined && (
              <Badge variant="secondary">
                {resultCount.toLocaleString()} results
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={onToggle}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 max-h-[70vh] overflow-y-auto">
        {/* Basic Search & Status */}
        <Collapsible 
          open={expandedSections.basic} 
          onOpenChange={() => toggleSection('basic')}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-gray-50/50 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <Search className="h-4 w-4 text-[#2E5E47]" />
              <span className="font-medium">Basic Search & Status</span>
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform",
              expandedSections.basic && "rotate-180"
            )} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-4">
            {/* Search */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Search Candidates</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, email, skills, or company..."
                  value={filters.search}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  className="pl-10 h-11"
                />
              </div>
            </div>

            {/* Status */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Candidate Status</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {statusOptions.map((status) => (
                  <div
                    key={status.id}
                    className={cn(
                      "flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all",
                      filters.status.includes(status.id)
                        ? "border-[#2E5E47] bg-[#2E5E47]/5"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    )}
                    onClick={() => {
                      if (filters.status.includes(status.id)) {
                        removeFromArrayFilter('status', status.id);
                      } else {
                        addToArrayFilter('status', status.id);
                      }
                    }}
                  >
                    <status.icon className={cn("h-4 w-4", status.color)} />
                    <span className="text-sm font-medium">{status.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Status */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Verification Status</Label>
              <Select 
                value={filters.verificationStatus} 
                onValueChange={(value) => updateFilter('verificationStatus', value)}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="All candidates" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Candidates</SelectItem>
                  <SelectItem value="verified">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Verified Only
                    </div>
                  </SelectItem>
                  <SelectItem value="unverified">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                      Unverified Only
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Skills & Technologies */}
        <Collapsible 
          open={expandedSections.skills} 
          onOpenChange={() => toggleSection('skills')}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-gray-50/50 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <Code className="h-4 w-4 text-[#2E5E47]" />
              <span className="font-medium">Skills & Technologies</span>
              {filters.skills.length > 0 && (
                <Badge variant="secondary">{filters.skills.length}</Badge>
              )}
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform",
              expandedSections.skills && "rotate-180"
            )} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-4">
            {/* Selected Skills */}
            {filters.skills.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Selected Skills</Label>
                <div className="flex flex-wrap gap-2">
                  {filters.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="default"
                      className="bg-[#2E5E47] text-white hover:bg-[#2E5E47]/90"
                    >
                      {skill}
                      <X
                        className="h-3 w-3 ml-1 cursor-pointer"
                        onClick={() => removeFromArrayFilter('skills', skill)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Add Skills */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Popular Skills</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                {popularSkills.map((skill) => (
                  <Button
                    key={skill}
                    variant="outline"
                    size="sm"
                    onClick={() => addToArrayFilter('skills', skill)}
                    disabled={filters.skills.includes(skill)}
                    className="justify-start h-8"
                  >
                    {skill}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Skill Input */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Add Custom Skill</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Type skill name..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const value = e.currentTarget.value.trim();
                      if (value && !filters.skills.includes(value)) {
                        addToArrayFilter('skills', value);
                        e.currentTarget.value = '';
                      }
                    }
                  }}
                  className="h-9"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Location */}
        <Collapsible 
          open={expandedSections.experience} 
          onOpenChange={() => toggleSection('experience')}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-gray-50/50 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-[#2E5E47]" />
              <span className="font-medium">Location & Availability</span>
              {filters.location.length > 0 && (
                <Badge variant="secondary">{filters.location.length}</Badge>
              )}
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform",
              expandedSections.experience && "rotate-180"
            )} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-4">
            {/* Selected Locations */}
            {filters.location.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Selected Locations</Label>
                <div className="flex flex-wrap gap-2">
                  {filters.location.map((location) => (
                    <Badge
                      key={location}
                      variant="default"
                      className="bg-[#2E5E47] text-white hover:bg-[#2E5E47]/90"
                    >
                      {location}
                      <X
                        className="h-3 w-3 ml-1 cursor-pointer"
                        onClick={() => removeFromArrayFilter('location', location)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Locations */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Popular Locations</Label>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                {popularLocations.map((location) => (
                  <Button
                    key={location}
                    variant="outline"
                    size="sm"
                    onClick={() => addToArrayFilter('location', location)}
                    disabled={filters.location.includes(location)}
                    className="justify-start h-8 text-xs"
                  >
                    {location}
                  </Button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Availability</Label>
              <div className="space-y-2">
                {availabilityOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={filters.availability.includes(option.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          addToArrayFilter('availability', option.id);
                        } else {
                          removeFromArrayFilter('availability', option.id);
                        }
                      }}
                    />
                    <Label htmlFor={option.id} className="text-sm">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Compensation & Experience */}
        <Collapsible 
          open={expandedSections.compensation} 
          onOpenChange={() => toggleSection('compensation')}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-gray-50/50 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <DollarSign className="h-4 w-4 text-[#2E5E47]" />
              <span className="font-medium">Compensation & Experience</span>
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform",
              expandedSections.compensation && "rotate-180"
            )} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-6 mt-4">
            {/* Salary Range */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Expected Salary Range: ${filters.salaryRange[0]}k - ${filters.salaryRange[1]}k
              </Label>
              <Slider
                value={filters.salaryRange}
                onValueChange={(value) => updateFilter('salaryRange', value)}
                max={300}
                min={0}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>$0k</span>
                <span>$300k+</span>
              </div>
            </div>

            {/* Experience Range */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Experience: {filters.experienceRange[0]} - {filters.experienceRange[1]} years
              </Label>
              <Slider
                value={filters.experienceRange}
                onValueChange={(value) => updateFilter('experienceRange', value)}
                max={20}
                min={0}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0 years</span>
                <span>20+ years</span>
              </div>
            </div>

            {/* Match Score */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Match Score: {filters.matchScore[0]}% - {filters.matchScore[1]}%
              </Label>
              <Slider
                value={filters.matchScore}
                onValueChange={(value) => updateFilter('matchScore', value)}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Advanced Options */}
        <Collapsible 
          open={expandedSections.advanced} 
          onOpenChange={() => toggleSection('advanced')}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-gray-50/50 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <Briefcase className="h-4 w-4 text-[#2E5E47]" />
              <span className="font-medium">Advanced Options</span>
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform",
              expandedSections.advanced && "rotate-180"
            )} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-4">
            {/* Job Types */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Preferred Job Types</Label>
              <div className="space-y-2">
                {jobTypeOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={filters.jobTypes.includes(option.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          addToArrayFilter('jobTypes', option.id);
                        } else {
                          removeFromArrayFilter('jobTypes', option.id);
                        }
                      }}
                    />
                    <Label htmlFor={option.id} className="text-sm">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Level */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Education Level</Label>
              <div className="space-y-2">
                {educationOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={filters.educationLevel.includes(option.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          addToArrayFilter('educationLevel', option.id);
                        } else {
                          removeFromArrayFilter('educationLevel', option.id);
                        }
                      }}
                    />
                    <Label htmlFor={option.id} className="text-sm">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Types */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Preferred Client Types</Label>
              <div className="grid grid-cols-2 gap-2">
                {clientTypeOptions.map((type) => (
                  <div
                    key={type.id}
                    className={cn(
                      "flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all",
                      filters.clientTypes.includes(type.id)
                        ? "border-[#2E5E47] bg-[#2E5E47]/5"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    )}
                    onClick={() => {
                      if (filters.clientTypes.includes(type.id)) {
                        removeFromArrayFilter('clientTypes', type.id);
                      } else {
                        addToArrayFilter('clientTypes', type.id);
                      }
                    }}
                  >
                    <type.icon className="h-4 w-4 text-[#2E5E47]" />
                    <span className="text-sm font-medium">{type.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Last Activity */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Last Activity</Label>
              <Select 
                value={filters.lastActivity} 
                onValueChange={(value) => updateFilter('lastActivity', value)}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Any time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This week</SelectItem>
                  <SelectItem value="month">This month</SelectItem>
                  <SelectItem value="quarter">This quarter</SelectItem>
                  <SelectItem value="year">This year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t">
          <Button
            onClick={clearAllFilters}
            variant="outline"
            className="flex-1"
            disabled={activeFilterCount === 0}
          >
            <X className="h-4 w-4 mr-2" />
            Clear All
          </Button>
          <Button
            onClick={applyFilters}
            className="flex-1 bg-[#2E5E47] hover:bg-[#2E5E47]/90"
          >
            <Filter className="h-4 w-4 mr-2" />
            Apply Filters
            {activeFilterCount > 0 && (
              <Badge className="ml-2 bg-white text-[#2E5E47]">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}