import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
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
import { Separator } from '../ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { Checkbox } from '../ui/checkbox';
import { 
  Plus, 
  X, 
  GripVertical, 
  Building2, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Target, 
  Users, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Zap,
  ChevronDown,
  ChevronUp,
  FileText,
  Settings,
  Eye,
  Save,
  Lightbulb,
  Star,
  Globe,
  Monitor,
  Wifi,
  MessageSquare,
  Video,
  Code,
  Wrench,
  GraduationCap,
  Languages
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export interface CreatePipelineModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  // Basic Information
  roleName: string;
  clientName: string;
  department?: string;
  workArrangement: 'fully-remote' | 'hybrid' | 'office-flexible';
  
  // Remote Work Details
  timezoneRequirement: 'flexible' | 'specific' | 'overlap';
  timezonePreference?: string;
  overlapHours?: string;
  communicationStyle: string[];
  
  // Position Details
  rateType: 'hourly' | 'monthly' | 'annual';
  rateMin?: number;
  rateMax?: number;
  contractType: 'fulltime' | 'contract' | 'parttime';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  deadline?: string;
  startDate?: string;
  
  // Requirements
  experienceLevel: 'junior' | 'mid' | 'senior' | 'lead' | 'executive';
  skills: string[];
  tools: string[];
  languages: string[];
  softSkills: string[];
  requirements: Requirement[];
  
  // Description
  description?: string;
  companyDescription?: string;
  
  // Pipeline
  stages: Stage[];
}

interface Requirement {
  id: string;
  category: 'technical' | 'experience' | 'soft-skills' | 'remote' | 'other';
  text: string;
  priority: 'must-have' | 'nice-to-have';
}

interface Stage {
  id: string;
  name: string;
  description?: string;
  color: string;
  estimatedDays?: number;
}

interface Errors {
  [key: string]: string;
}

const workArrangementOptions = [
  { 
    value: 'fully-remote', 
    label: 'Fully Remote', 
    description: 'Work from anywhere',
    icon: Monitor 
  },
  { 
    value: 'hybrid', 
    label: 'Hybrid Remote', 
    description: 'Mix of remote and office',
    icon: Building2 
  },
  { 
    value: 'office-flexible', 
    label: 'Office with Remote Days', 
    description: 'Primarily office with remote flexibility',
    icon: Briefcase 
  }
];

const timezoneOptions = [
  { value: 'flexible', label: 'Timezone Flexible', description: 'Any timezone works' },
  { value: 'specific', label: 'Specific Timezone', description: 'Must work in specific timezone' },
  { value: 'overlap', label: 'Overlap Required', description: 'Must have overlap hours with team' }
];

const timezoneRegions = [
  'EST (UTC-5)', 'CST (UTC-6)', 'PST (UTC-8)', 'GMT (UTC+0)', 
  'CET (UTC+1)', 'IST (UTC+5:30)', 'JST (UTC+9)', 'AEST (UTC+10)'
];

const experienceLevels = [
  { value: 'junior', label: 'Junior (0-2 years)', color: 'bg-blue-100 text-blue-700' },
  { value: 'mid', label: 'Mid-level (2-5 years)', color: 'bg-green-100 text-green-700' },
  { value: 'senior', label: 'Senior (5-8 years)', color: 'bg-purple-100 text-purple-700' },
  { value: 'lead', label: 'Lead (8+ years)', color: 'bg-orange-100 text-orange-700' },
  { value: 'executive', label: 'Executive (10+ years)', color: 'bg-red-100 text-red-700' }
];

const communicationTools = [
  'Slack', 'Microsoft Teams', 'Discord', 'Zoom', 'Google Meet', 
  'Asana', 'Jira', 'Notion', 'Linear', 'GitHub', 'GitLab'
];

const commonSkills = {
  'Development': ['React', 'Node.js', 'TypeScript', 'Python', 'Java', 'AWS', 'Docker', 'GraphQL'],
  'Design': ['Figma', 'Adobe XD', 'Sketch', 'UI/UX Design', 'Prototyping', 'Design Systems'],
  'Marketing': ['SEO', 'Google Analytics', 'Content Marketing', 'Social Media', 'Email Marketing'],
  'Operations': ['Project Management', 'Process Optimization', 'Data Analysis', 'Customer Success']
};

const commonTools = {
  'Development': ['VS Code', 'Git', 'Postman', 'Docker', 'Kubernetes', 'Jenkins'],
  'Design': ['Figma', 'Adobe Creative Suite', 'InVision', 'Miro', 'Principle'],
  'Collaboration': ['Slack', 'Zoom', 'Jira', 'Confluence', 'Notion', 'Linear'],
  'Analytics': ['Google Analytics', 'Mixpanel', 'Tableau', 'Power BI', 'Hotjar']
};

const softSkillsOptions = [
  'Strong Communication', 'Self-motivated', 'Team Collaboration', 'Problem Solving',
  'Time Management', 'Adaptability', 'Leadership', 'Mentoring', 'Client Facing',
  'Cross-functional Collaboration', 'Remote Work Experience', 'Async Communication'
];

const languageOptions = [
  'English (Native)', 'English (Fluent)', 'English (Conversational)',
  'Spanish', 'French', 'German', 'Portuguese', 'Mandarin', 'Japanese'
];

// Remote-optimized pipeline templates
const stageTemplates = {
  remote: [
    { name: 'Application Review', description: 'Review application and portfolio', color: 'bg-blue-500', estimatedDays: 2 },
    { name: 'Phone Screening', description: 'Initial phone or video call', color: 'bg-green-500', estimatedDays: 3 },
    { name: 'Technical Assessment', description: 'Skills evaluation or take-home project', color: 'bg-purple-500', estimatedDays: 5 },
    { name: 'Team Interview', description: 'Video interview with team members', color: 'bg-orange-500', estimatedDays: 3 },
    { name: 'Final Interview', description: 'Interview with hiring manager', color: 'bg-red-500', estimatedDays: 2 },
    { name: 'Reference Check', description: 'Verify references and background', color: 'bg-yellow-500', estimatedDays: 3 },
    { name: 'Offer', description: 'Extend job offer', color: 'bg-emerald-500', estimatedDays: 1 }
  ],
  technical: [
    { name: 'Resume Review', description: 'Technical resume screening', color: 'bg-blue-500', estimatedDays: 1 },
    { name: 'Coding Challenge', description: 'Technical coding assessment', color: 'bg-purple-500', estimatedDays: 7 },
    { name: 'Technical Interview', description: 'Deep technical discussion', color: 'bg-indigo-500', estimatedDays: 3 },
    { name: 'System Design', description: 'Architecture and design interview', color: 'bg-orange-500', estimatedDays: 2 },
    { name: 'Cultural Fit', description: 'Team and culture interview', color: 'bg-green-500', estimatedDays: 2 },
    { name: 'Final Review', description: 'Decision and offer preparation', color: 'bg-red-500', estimatedDays: 2 }
  ],
  executive: [
    { name: 'Executive Screening', description: 'Initial executive assessment', color: 'bg-gray-500', estimatedDays: 3 },
    { name: 'Strategic Interview', description: 'Strategic thinking and vision', color: 'bg-blue-500', estimatedDays: 5 },
    { name: 'Board Presentation', description: 'Present to board or leadership', color: 'bg-purple-500', estimatedDays: 7 },
    { name: 'Reference Verification', description: 'Executive reference checks', color: 'bg-orange-500', estimatedDays: 5 },
    { name: 'Final Decision', description: 'Leadership final decision', color: 'bg-green-500', estimatedDays: 3 }
  ],
  quick: [
    { name: 'Application', description: 'Application received', color: 'bg-blue-500', estimatedDays: 1 },
    { name: 'Interview', description: 'Single interview round', color: 'bg-green-500', estimatedDays: 2 },
    { name: 'Decision', description: 'Hiring decision', color: 'bg-purple-500', estimatedDays: 1 },
    { name: 'Offer', description: 'Job offer extended', color: 'bg-emerald-500', estimatedDays: 1 }
  ]
};

const initialFormData: FormData = {
  roleName: '',
  clientName: '',
  department: '',
  workArrangement: 'fully-remote',
  timezoneRequirement: 'flexible',
  timezonePreference: '',
  overlapHours: '',
  communicationStyle: [],
  rateType: 'hourly',
  rateMin: undefined,
  rateMax: undefined,
  contractType: 'fulltime',
  priority: 'medium',
  deadline: '',
  startDate: '',
  experienceLevel: 'mid',
  skills: [],
  tools: [],
  languages: [],
  softSkills: [],
  requirements: [
    { id: '1', category: 'technical', text: '', priority: 'must-have' },
    { id: '2', category: 'experience', text: '', priority: 'must-have' },
    { id: '3', category: 'remote', text: '', priority: 'must-have' }
  ],
  description: '',
  companyDescription: '',
  stages: [...stageTemplates.remote]
};

export function CreatePipelineModal({ open, onOpenChange }: CreatePipelineModalProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Errors>({});
  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof stageTemplates>('remote');
  const [newStageName, setNewStageName] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    basics: true,
    remote: true,
    details: false,
    requirements: false,
    description: false,
    stages: false,
    preview: false
  });

  // Generate unique IDs
  const generateId = () => Math.random().toString(36).substr(2, 9);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFieldChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleArrayFieldToggle = (field: keyof FormData, value: string) => {
    const currentArray = formData[field] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    handleFieldChange(field, newArray);
  };

  const handleAddRequirement = (category: Requirement['category'] = 'technical') => {
    const newRequirement: Requirement = {
      id: generateId(),
      category,
      text: '',
      priority: 'must-have'
    };
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, newRequirement]
    }));
  };

  const handleUpdateRequirement = (id: string, field: keyof Requirement, value: any) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.map(req =>
        req.id === id ? { ...req, [field]: value } : req
      )
    }));
  };

  const handleRemoveRequirement = (id: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter(req => req.id !== id)
    }));
  };

  const handleTemplateChange = (template: keyof typeof stageTemplates) => {
    setSelectedTemplate(template);
    setFormData(prev => ({
      ...prev,
      stages: [...stageTemplates[template]]
    }));
  };

  const handleAddStage = () => {
    if (!newStageName.trim()) return;
    
    const newStage: Stage = {
      id: generateId(),
      name: newStageName.trim(),
      description: '',
      color: 'bg-gray-500',
      estimatedDays: 2
    };
    
    setFormData(prev => ({
      ...prev,
      stages: [...prev.stages, newStage]
    }));
    setNewStageName('');
  };

  const handleUpdateStage = (id: string, field: keyof Stage, value: any) => {
    setFormData(prev => ({
      ...prev,
      stages: prev.stages.map(stage =>
        stage.id === id ? { ...stage, [field]: value } : stage
      )
    }));
  };

  const handleRemoveStage = (id: string) => {
    setFormData(prev => ({
      ...prev,
      stages: prev.stages.filter(stage => stage.id !== id)
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.roleName.trim()) {
      newErrors.roleName = 'Role name is required';
    }
    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Client name is required';
    }
    if (formData.rateMin && formData.rateMax && formData.rateMin > formData.rateMax) {
      newErrors.rateMax = 'Maximum rate must be greater than minimum rate';
    }
    
    const validRequirements = formData.requirements.filter(req => req.text.trim());
    if (validRequirements.length === 0) {
      newErrors.requirements = 'At least one requirement is needed';
    }
    
    if (formData.stages.length < 2) {
      newErrors.stages = 'At least 2 pipeline stages are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    // Filter out empty requirements
    const cleanedData = {
      ...formData,
      requirements: formData.requirements.filter(req => req.text.trim())
    };

    console.log('Pipeline created:', cleanedData);
    toast.success('Pipeline created successfully!');
    onOpenChange(false);
    
    // Reset form
    setFormData(initialFormData);
    setErrors({});
    setExpandedSections({
      basics: true,
      remote: true,
      details: false,
      requirements: false,
      description: false,
      stages: false,
      preview: false
    });
  };

  const priorityConfig = {
    low: { color: 'bg-blue-100 text-blue-700', icon: Clock },
    medium: { color: 'bg-yellow-100 text-yellow-700', icon: Target },
    high: { color: 'bg-orange-100 text-orange-700', icon: AlertCircle },
    urgent: { color: 'bg-red-100 text-red-700', icon: Zap }
  };

  const PriorityIcon = priorityConfig[formData.priority].icon;

  const getRequirementsByCategory = (category: Requirement['category']) => {
    return formData.requirements.filter(req => req.category === category);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[95vh] p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-gradient-to-r from-[#2E5E47]/5 to-[#2E5E47]/10 flex-shrink-0">
          <DialogTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
            <div className="p-1.5 sm:p-2 bg-[#2E5E47]/10 rounded-lg">
              <Target className="h-5 w-5 sm:h-6 sm:w-6 text-[#2E5E47]" />
            </div>
            Create New Pipeline
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Set up a new hiring pipeline for remote positions. Configure requirements, stages, and preferences.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 p-3 sm:p-4">
            {/* Basic Information Section */}
            <Collapsible open={expandedSections.basics} onOpenChange={() => toggleSection('basics')}>
              <Card className="transition-all duration-200 hover:shadow-md">
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-gray-50/50 transition-colors py-3 sm:py-4">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="p-1.5 bg-[#2E5E47]/10 rounded-lg">
                          <Building2 className="h-4 w-4 text-[#2E5E47]" />
                        </div>
                        <div>
                          <span className="text-base sm:text-lg">Basic Information</span>
                          <p className="text-xs sm:text-sm font-normal text-gray-600">Role and client details</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {(formData.roleName || formData.clientName) && (
                          <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            <span className="hidden sm:inline">Completed</span>
                            <span className="sm:hidden">✓</span>
                          </Badge>
                        )}
                        {expandedSections.basics ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0 pb-4 sm:pb-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                      <div className="space-y-1.5 sm:space-y-2">
                        <Label htmlFor="roleName" className="flex items-center gap-2 text-sm">
                          Position/Role Title 
                          <span className="text-red-500">*</span>
                          {formData.roleName && <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />}
                        </Label>
                        <Input
                          id="roleName"
                          value={formData.roleName || ''}
                          onChange={(e) => handleFieldChange('roleName', e.target.value)}
                          placeholder="e.g., Senior React Developer, UX Designer"
                          className={`h-9 sm:h-10 ${errors.roleName ? 'border-red-300 focus:border-red-500' : ''}`}
                          required
                        />
                        {errors.roleName && (
                          <p className="text-xs sm:text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.roleName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5 sm:space-y-2">
                        <Label htmlFor="clientName" className="flex items-center gap-2 text-sm">
                          Client Company
                          <span className="text-red-500">*</span>
                          {formData.clientName && <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />}
                        </Label>
                        <Input
                          id="clientName"
                          value={formData.clientName || ''}
                          onChange={(e) => handleFieldChange('clientName', e.target.value)}
                          placeholder="e.g., TechCorp Inc., Design Studio LLC"
                          className={`h-9 sm:h-10 ${errors.clientName ? 'border-red-300 focus:border-red-500' : ''}`}
                          required
                        />
                        {errors.clientName && (
                          <p className="text-xs sm:text-sm text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.clientName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5 sm:space-y-2">
                        <Label htmlFor="department" className="text-sm">Department/Team</Label>
                        <Input
                          id="department"
                          value={formData.department || ''}
                          onChange={(e) => handleFieldChange('department', e.target.value)}
                          placeholder="e.g., Engineering, Product, Marketing"
                          className="h-9 sm:h-10"
                        />
                      </div>

                      <div className="space-y-1.5 sm:space-y-2">
                        <Label htmlFor="experienceLevel" className="text-sm">Experience Level</Label>
                        <Select 
                          value={formData.experienceLevel} 
                          onValueChange={(value: any) => handleFieldChange('experienceLevel', value)}
                        >
                          <SelectTrigger className="h-9 sm:h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {experienceLevels.map((level) => (
                              <SelectItem key={level.value} value={level.value}>
                                <div className="flex items-center gap-2">
                                  <Badge className={`text-xs ${level.color}`}>
                                    {level.label}
                                  </Badge>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Remote Work Configuration */}
            <Collapsible open={expandedSections.remote} onOpenChange={() => toggleSection('remote')}>
              <Card className="transition-all duration-200 hover:shadow-md border-[#2E5E47]/20">
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-gray-50/50 transition-colors py-3 sm:py-4">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="p-1.5 bg-[#2E5E47]/10 rounded-lg">
                          <Globe className="h-4 w-4 text-[#2E5E47]" />
                        </div>
                        <div>
                          <span className="text-base sm:text-lg">Remote Work Configuration</span>
                          <p className="text-xs sm:text-sm font-normal text-gray-600">Work arrangement and collaboration preferences</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Badge variant="secondary" className="bg-[#2E5E47]/10 text-[#2E5E47] text-xs">
                          Remote Focused
                        </Badge>
                        {expandedSections.remote ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0 pb-4 sm:pb-6 space-y-4 sm:space-y-6">
                    {/* Work Arrangement */}
                    <div className="space-y-2 sm:space-y-3">
                      <Label className="text-sm">Work Arrangement</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                        {workArrangementOptions.map((option) => (
                          <div
                            key={option.value}
                            className={`p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              formData.workArrangement === option.value
                                ? 'border-[#2E5E47] bg-[#2E5E47]/5'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => handleFieldChange('workArrangement', option.value)}
                          >
                            <div className="flex items-center gap-2 sm:gap-3">
                              <option.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${
                                formData.workArrangement === option.value ? 'text-[#2E5E47]' : 'text-gray-500'
                              }`} />
                              <div>
                                <div className="font-medium text-xs sm:text-sm">{option.label}</div>
                                <div className="text-xs text-gray-600 hidden sm:block">{option.description}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      {/* Timezone Requirements */}
                      <div className="space-y-2 sm:space-y-3">
                        <Label className="text-sm">Timezone Requirements</Label>
                        <Select 
                          value={formData.timezoneRequirement} 
                          onValueChange={(value: any) => handleFieldChange('timezoneRequirement', value)}
                        >
                          <SelectTrigger className="h-9 sm:h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {timezoneOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                <div>
                                  <div className="font-medium text-sm">{option.label}</div>
                                  <div className="text-xs text-gray-500">{option.description}</div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {formData.timezoneRequirement === 'specific' && (
                          <Select 
                            value={formData.timezonePreference || ''} 
                            onValueChange={(value) => handleFieldChange('timezonePreference', value)}
                          >
                            <SelectTrigger className="h-9 sm:h-10">
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              {timezoneRegions.map((tz) => (
                                <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}

                        {formData.timezoneRequirement === 'overlap' && (
                          <Input
                            value={formData.overlapHours || ''}
                            onChange={(e) => handleFieldChange('overlapHours', e.target.value)}
                            placeholder="e.g., 9 AM - 1 PM EST"
                            className="h-9 sm:h-10"
                          />
                        )}
                      </div>

                      {/* Communication Tools */}
                      <div className="space-y-2 sm:space-y-3">
                        <Label className="text-sm">Required Communication Tools</Label>
                        <div className="space-y-1.5 max-h-28 sm:max-h-32 overflow-y-auto scrollbar-thin">
                          {communicationTools.map((tool) => (
                            <div key={tool} className="flex items-center space-x-2">
                              <Checkbox
                                id={`comm-${tool}`}
                                checked={formData.communicationStyle.includes(tool)}
                                onCheckedChange={() => handleArrayFieldToggle('communicationStyle', tool)}
                                className="h-4 w-4"
                              />
                              <label htmlFor={`comm-${tool}`} className="text-sm cursor-pointer">
                                {tool}
                              </label>
                            </div>
                          ))}
                        </div>
                        {formData.communicationStyle.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {formData.communicationStyle.map((tool) => (
                              <Badge key={tool} variant="secondary" className="text-xs">
                                {tool}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Position Details Section */}
            <Collapsible open={expandedSections.details} onOpenChange={() => toggleSection('details')}>
              <Card className="transition-all duration-200 hover:shadow-md">
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-gray-50/50 transition-colors py-3 sm:py-4">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="p-1.5 bg-[#2E5E47]/10 rounded-lg">
                          <DollarSign className="h-4 w-4 text-[#2E5E47]" />
                        </div>
                        <div>
                          <span className="text-base sm:text-lg">Position Details</span>
                          <p className="text-xs sm:text-sm font-normal text-gray-600">Compensation, priority, and timeline</p>
                        </div>
                      </div>
                      {expandedSections.details ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0 pb-4 sm:pb-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      {/* Rate Configuration */}
                      <div className="space-y-3 sm:space-y-4">
                        <div className="space-y-1.5 sm:space-y-2">
                          <Label className="text-sm">Rate Type</Label>
                          <Select 
                            value={formData.rateType} 
                            onValueChange={(value: any) => handleFieldChange('rateType', value)}
                          >
                            <SelectTrigger className="h-9 sm:h-10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hourly">Hourly Rate ($/hour)</SelectItem>
                              <SelectItem value="monthly">Monthly Salary ($/month)</SelectItem>
                              <SelectItem value="annual">Annual Salary ($/year)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          <div className="space-y-1.5 sm:space-y-2">
                            <Label htmlFor="rateMin" className="text-sm">
                              Min {formData.rateType === 'hourly' ? 'Rate' : 'Salary'}
                            </Label>
                            <Input
                              id="rateMin"
                              type="number"
                              value={formData.rateMin || ''}
                              onChange={(e) => handleFieldChange('rateMin', parseFloat(e.target.value) || undefined)}
                              placeholder={formData.rateType === 'hourly' ? '25' : formData.rateType === 'monthly' ? '5000' : '60000'}
                              className="h-9 sm:h-10"
                            />
                          </div>
                          <div className="space-y-1.5 sm:space-y-2">
                            <Label htmlFor="rateMax" className="text-sm">
                              Max {formData.rateType === 'hourly' ? 'Rate' : 'Salary'}
                            </Label>
                            <Input
                              id="rateMax"
                              type="number"
                              value={formData.rateMax || ''}
                              onChange={(e) => handleFieldChange('rateMax', parseFloat(e.target.value) || undefined)}
                              placeholder={formData.rateType === 'hourly' ? '45' : formData.rateType === 'monthly' ? '8000' : '100000'}
                              className={`h-9 sm:h-10 ${errors.rateMax ? 'border-red-300 focus:border-red-500' : ''}`}
                            />
                            {errors.rateMax && (
                              <p className="text-xs sm:text-sm text-red-600 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {errors.rateMax}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Timeline and Priority */}
                      <div className="space-y-3 sm:space-y-4">
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          <div className="space-y-1.5 sm:space-y-2">
                            <Label htmlFor="priority" className="text-sm">Priority</Label>
                            <Select 
                              value={formData.priority} 
                              onValueChange={(value: any) => handleFieldChange('priority', value)}
                            >
                              <SelectTrigger className="h-9 sm:h-10">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-3.5 w-3.5 text-blue-600" />
                                    <span className="text-sm">Low Priority</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="medium">
                                  <div className="flex items-center gap-2">
                                    <Target className="h-3.5 w-3.5 text-yellow-600" />
                                    <span className="text-sm">Medium Priority</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="high">
                                  <div className="flex items-center gap-2">
                                    <AlertCircle className="h-3.5 w-3.5 text-orange-600" />
                                    <span className="text-sm">High Priority</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="urgent">
                                  <div className="flex items-center gap-2">
                                    <Zap className="h-3.5 w-3.5 text-red-600" />
                                    <span className="text-sm">Urgent</span>
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-1.5 sm:space-y-2">
                            <Label htmlFor="contractType" className="text-sm">Contract Type</Label>
                            <Select 
                              value={formData.contractType} 
                              onValueChange={(value: any) => handleFieldChange('contractType', value)}
                            >
                              <SelectTrigger className="h-9 sm:h-10">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="fulltime">Full-time</SelectItem>
                                <SelectItem value="contract">Contract</SelectItem>
                                <SelectItem value="parttime">Part-time</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          <div className="space-y-1.5 sm:space-y-2">
                            <Label htmlFor="startDate" className="text-sm">Preferred Start Date</Label>
                            <Input
                              id="startDate"
                              type="date"
                              value={formData.startDate || ''}
                              onChange={(e) => handleFieldChange('startDate', e.target.value)}
                              className="h-9 sm:h-10"
                            />
                          </div>
                          <div className="space-y-1.5 sm:space-y-2">
                            <Label htmlFor="deadline" className="text-sm">Application Deadline</Label>
                            <Input
                              id="deadline"
                              type="date"
                              value={formData.deadline || ''}
                              onChange={(e) => handleFieldChange('deadline', e.target.value)}
                              className="h-9 sm:h-10"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Requirements Section */}
            <Collapsible open={expandedSections.requirements} onOpenChange={() => toggleSection('requirements')}>
              <Card className="transition-all duration-200 hover:shadow-md">
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-gray-50/50 transition-colors py-3 sm:py-4">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="p-1.5 bg-[#2E5E47]/10 rounded-lg">
                          <CheckCircle2 className="h-4 w-4 text-[#2E5E47]" />
                        </div>
                        <div>
                          <span className="text-base sm:text-lg">Skills & Requirements</span>
                          <p className="text-xs sm:text-sm font-normal text-gray-600">Technical skills, tools, and qualifications</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                          {formData.skills.length + formData.tools.length + formData.languages.length + formData.softSkills.length} items
                        </Badge>
                        {expandedSections.requirements ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0 pb-4 sm:pb-6 space-y-4 sm:space-y-6">
                    {/* Skills and Tools Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      {/* Technical Skills */}
                      <div className="space-y-2 sm:space-y-3">
                        <Label className="flex items-center gap-2 text-sm">
                          <Code className="h-3.5 w-3.5" />
                          Technical Skills
                        </Label>
                        <div className="space-y-2">
                          {Object.entries(commonSkills).map(([category, skills]) => (
                            <div key={category} className="space-y-1.5">
                              <div className="text-xs font-medium text-gray-600">{category}</div>
                              <div className="flex flex-wrap gap-1">
                                {skills.map((skill) => (
                                  <Badge
                                    key={skill}
                                    variant={formData.skills.includes(skill) ? "default" : "outline"}
                                    className={`cursor-pointer text-xs transition-colors ${
                                      formData.skills.includes(skill)
                                        ? 'bg-[#2E5E47] hover:bg-[#2E5E47]/90'
                                        : 'hover:bg-gray-100'
                                    }`}
                                    onClick={() => handleArrayFieldToggle('skills', skill)}
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tools & Technologies */}
                      <div className="space-y-2 sm:space-y-3">
                        <Label className="flex items-center gap-2 text-sm">
                          <Wrench className="h-3.5 w-3.5" />
                          Tools & Technologies
                        </Label>
                        <div className="space-y-2">
                          {Object.entries(commonTools).map(([category, tools]) => (
                            <div key={category} className="space-y-1.5">
                              <div className="text-xs font-medium text-gray-600">{category}</div>
                              <div className="flex flex-wrap gap-1">
                                {tools.map((tool) => (
                                  <Badge
                                    key={tool}
                                    variant={formData.tools.includes(tool) ? "default" : "outline"}
                                    className={`cursor-pointer text-xs transition-colors ${
                                      formData.tools.includes(tool)
                                        ? 'bg-[#2E5E47] hover:bg-[#2E5E47]/90'
                                        : 'hover:bg-gray-100'
                                    }`}
                                    onClick={() => handleArrayFieldToggle('tools', tool)}
                                  >
                                    {tool}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Languages and Soft Skills */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      {/* Languages */}
                      <div className="space-y-2 sm:space-y-3">
                        <Label className="flex items-center gap-2 text-sm">
                          <Languages className="h-3.5 w-3.5" />
                          Language Requirements
                        </Label>
                        <div className="flex flex-wrap gap-1">
                          {languageOptions.map((language) => (
                            <Badge
                              key={language}
                              variant={formData.languages.includes(language) ? "default" : "outline"}
                              className={`cursor-pointer text-xs transition-colors ${
                                formData.languages.includes(language)
                                  ? 'bg-[#2E5E47] hover:bg-[#2E5E47]/90'
                                  : 'hover:bg-gray-100'
                              }`}
                              onClick={() => handleArrayFieldToggle('languages', language)}
                            >
                              {language}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Soft Skills */}
                      <div className="space-y-2 sm:space-y-3">
                        <Label className="flex items-center gap-2 text-sm">
                          <Users className="h-3.5 w-3.5" />
                          Soft Skills & Traits
                        </Label>
                        <div className="flex flex-wrap gap-1">
                          {softSkillsOptions.map((skill) => (
                            <Badge
                              key={skill}
                              variant={formData.softSkills.includes(skill) ? "default" : "outline"}
                              className={`cursor-pointer text-xs transition-colors ${
                                formData.softSkills.includes(skill)
                                  ? 'bg-[#2E5E47] hover:bg-[#2E5E47]/90'
                                  : 'hover:bg-gray-100'
                              }`}
                              onClick={() => handleArrayFieldToggle('softSkills', skill)}
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Custom Requirements */}
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Additional Requirements</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddRequirement()}
                          className="border-dashed h-8 text-xs"
                        >
                          <Plus className="h-3.5 w-3.5 mr-1.5" />
                          Add Requirement
                        </Button>
                      </div>

                      {errors.requirements && (
                        <p className="text-xs sm:text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.requirements}
                        </p>
                      )}
                      
                      <div className="space-y-2.5 max-h-56 sm:max-h-64 overflow-y-auto scrollbar-thin">
                        {formData.requirements.map((requirement, index) => (
                          <div key={requirement.id} className="flex items-start gap-2.5 p-2.5 sm:p-3 bg-gray-50/50 rounded-lg border border-gray-200/50 group hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-center w-6 h-6 bg-[#2E5E47] text-white rounded-full text-xs font-medium flex-shrink-0 mt-1">
                              {index + 1}
                            </div>
                            
                            <div className="flex-1 space-y-1.5">
                              <div className="flex gap-1.5 sm:gap-2">
                                <Select
                                  value={requirement.category}
                                  onValueChange={(value: any) => handleUpdateRequirement(requirement.id, 'category', value)}
                                >
                                  <SelectTrigger className="w-24 sm:w-28 h-7 text-xs">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="technical">Technical</SelectItem>
                                    <SelectItem value="experience">Experience</SelectItem>
                                    <SelectItem value="soft-skills">Soft Skills</SelectItem>
                                    <SelectItem value="remote">Remote Work</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                
                                <Select
                                  value={requirement.priority}
                                  onValueChange={(value: any) => handleUpdateRequirement(requirement.id, 'priority', value)}
                                >
                                  <SelectTrigger className="w-24 sm:w-28 h-7 text-xs">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="must-have">Must Have</SelectItem>
                                    <SelectItem value="nice-to-have">Nice to Have</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <Input
                                value={requirement.text}
                                onChange={(e) => handleUpdateRequirement(requirement.id, 'text', e.target.value)}
                                placeholder="e.g., 5+ years React experience, Strong communication skills"
                                className="h-8 border-0 bg-transparent focus:bg-white focus:border-gray-300 text-sm"
                              />
                            </div>

                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveRequirement(requirement.id)}
                              className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              disabled={formData.requirements.length <= 1}
                            >
                              <X className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Description Section */}
            <Collapsible open={expandedSections.description} onOpenChange={() => toggleSection('description')}>
              <Card className="transition-all duration-200 hover:shadow-md">
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-gray-50/50 transition-colors py-3 sm:py-4">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="p-1.5 bg-[#2E5E47]/10 rounded-lg">
                          <FileText className="h-4 w-4 text-[#2E5E47]" />
                        </div>
                        <div>
                          <span className="text-base sm:text-lg">Role & Company Description</span>
                          <p className="text-xs sm:text-sm font-normal text-gray-600">Detailed information for candidates</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {(formData.description || formData.companyDescription) && (
                          <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            <span className="hidden sm:inline">Content Added</span>
                            <span className="sm:hidden">✓</span>
                          </Badge>
                        )}
                        {expandedSections.description ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0 pb-4 sm:pb-6 space-y-4">
                    <div className="space-y-3 sm:space-y-4">
                      <div className="space-y-1.5 sm:space-y-2">
                        <Label htmlFor="description" className="text-sm">
                          Role Description
                        </Label>
                        <Textarea
                          id="description"
                          value={formData.description || ''}
                          onChange={(e) => handleFieldChange('description', e.target.value)}
                          placeholder="Describe the role, responsibilities, day-to-day tasks, and what success looks like in this position..."
                          rows={3}
                          className="resize-none text-sm"
                        />
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-1.5">
                            <Lightbulb className="h-3.5 w-3.5" />
                            <span>Include key responsibilities, growth opportunities, and team structure</span>
                          </div>
                          <span>{formData.description?.length || 0} characters</span>
                        </div>
                      </div>

                      <div className="space-y-1.5 sm:space-y-2">
                        <Label htmlFor="companyDescription" className="text-sm">
                          Company & Culture Description
                        </Label>
                        <Textarea
                          id="companyDescription"
                          value={formData.companyDescription || ''}
                          onChange={(e) => handleFieldChange('companyDescription', e.target.value)}
                          placeholder="Tell candidates about the company culture, values, remote work environment, benefits, and what makes your company a great place to work..."
                          rows={3}
                          className="resize-none text-sm"
                        />
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-1.5">
                            <Building2 className="h-3.5 w-3.5" />
                            <span>Highlight company culture, benefits, and remote work setup</span>
                          </div>
                          <span>{formData.companyDescription?.length || 0} characters</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Pipeline Stages Section */}
            <Collapsible open={expandedSections.stages} onOpenChange={() => toggleSection('stages')}>
              <Card className="transition-all duration-200 hover:shadow-md">
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-gray-50/50 transition-colors py-3 sm:py-4">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="p-1.5 bg-[#2E5E47]/10 rounded-lg">
                          <Settings className="h-4 w-4 text-[#2E5E47]" />
                        </div>
                        <div>
                          <span className="text-base sm:text-lg">Hiring Pipeline Stages</span>
                          <p className="text-xs sm:text-sm font-normal text-gray-600">Configure your hiring process flow</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                          {formData.stages?.length || 0} stages
                        </Badge>
                        {expandedSections.stages ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0 pb-4 sm:pb-6">
                    <div className="space-y-4 sm:space-y-6">
                      {errors.stages && (
                        <p className="text-xs sm:text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.stages}
                        </p>
                      )}

                      {/* Stage Templates */}
                      <div className="space-y-3 sm:space-y-4">
                        <div>
                          <Label className="text-sm font-medium mb-2 sm:mb-3 block">Choose a Template:</Label>
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                            {Object.entries(stageTemplates).map(([key, template]) => (
                              <Button
                                key={key}
                                type="button"
                                variant={selectedTemplate === key ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => handleTemplateChange(key as keyof typeof stageTemplates)}
                                className={`h-12 sm:h-14 flex-col gap-0.5 sm:gap-1 text-xs ${
                                  selectedTemplate === key 
                                    ? 'bg-[#2E5E47] hover:bg-[#2E5E47]/90' 
                                    : 'hover:bg-[#2E5E47]/5 hover:border-[#2E5E47]/30'
                                }`}
                              >
                                <span className="font-medium capitalize">{key}</span>
                                <span className="text-xs opacity-70">{template.length} stages</span>
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Stages List */}
                      <div className="space-y-3 sm:space-y-4">
                        <Label className="text-sm font-medium">Customize Your Stages:</Label>
                        <div className="space-y-2.5 max-h-64 sm:max-h-80 overflow-y-auto scrollbar-thin">
                          {formData.stages?.map((stage, index) => (
                            <div key={stage.id} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200/50 rounded-lg bg-gray-50/30 hover:bg-gray-50/50 transition-colors group">
                              <div className="flex items-center justify-center w-7 h-7 bg-[#2E5E47] text-white rounded-full text-sm font-medium flex-shrink-0 mt-1.5">
                                {index + 1}
                              </div>
                              
                              <div className="flex-1 space-y-2">
                                <Input
                                  value={stage.name}
                                  onChange={(e) => handleUpdateStage(stage.id, 'name', e.target.value)}
                                  placeholder="Stage name"
                                  className="font-medium h-9 bg-white/50 focus:bg-white text-sm"
                                />
                                <Input
                                  value={stage.description || ''}
                                  onChange={(e) => handleUpdateStage(stage.id, 'description', e.target.value)}
                                  placeholder="Stage description (optional)"
                                  className="text-xs h-8 bg-white/50 focus:bg-white"
                                />
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-1.5">
                                    <Label className="text-xs">Est. days:</Label>
                                    <Input
                                      type="number"
                                      value={stage.estimatedDays || ''}
                                      onChange={(e) => handleUpdateStage(stage.id, 'estimatedDays', parseInt(e.target.value) || undefined)}
                                      className="w-14 h-7 text-xs"
                                      min="1"
                                      max="30"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 mt-1.5">
                                <div className={`w-5 h-5 rounded-lg ${stage.color} border-2 border-white shadow-sm`} />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <GripVertical className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveStage(stage.id)}
                                  className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                                  disabled={(formData.stages?.length || 0) <= 2}
                                >
                                  <X className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Add New Stage */}
                        <div className="flex gap-2 sm:gap-3 p-3 sm:p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50/30 hover:bg-gray-50/50 transition-colors">
                          <Input
                            value={newStageName}
                            onChange={(e) => setNewStageName(e.target.value)}
                            placeholder="Enter new stage name..."
                            className="flex-1 h-9 sm:h-10 bg-white/70 focus:bg-white text-sm"
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddStage())}
                          />
                          <Button
                            type="button"
                            onClick={handleAddStage}
                            disabled={!newStageName.trim()}
                            className="h-9 sm:h-10 px-4 sm:px-6 bg-[#2E5E47] hover:bg-[#2E5E47]/90 text-sm"
                          >
                            <Plus className="h-3.5 w-3.5 mr-1.5" />
                            <span className="hidden sm:inline">Add Stage</span>
                            <span className="sm:hidden">Add</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* Preview Section */}
            <Collapsible open={expandedSections.preview} onOpenChange={() => toggleSection('preview')}>
              <Card className="transition-all duration-200 hover:shadow-md border-[#2E5E47]/20 bg-gradient-to-r from-[#2E5E47]/5 to-[#2E5E47]/10">
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-[#2E5E47]/5 transition-colors py-3 sm:py-4">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="p-1.5 bg-[#2E5E47]/10 rounded-lg">
                          <Eye className="h-4 w-4 text-[#2E5E47]" />
                        </div>
                        <div>
                          <span className="text-base sm:text-lg">Pipeline Preview</span>
                          <p className="text-xs sm:text-sm font-normal text-gray-600">Review your pipeline configuration</p>
                        </div>
                      </div>
                      {expandedSections.preview ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0 pb-4 sm:pb-6">
                    {(formData.roleName || formData.clientName) ? (
                      <div className="space-y-4 sm:space-y-6">
                        {/* Key Metrics */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                          <div className="text-center p-3 sm:p-4 bg-white/70 rounded-lg border border-white/50">
                            <div className="text-base sm:text-xl font-bold text-[#2E5E47] mb-1 truncate">
                              {formData.roleName || '—'}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600">Position</div>
                          </div>
                          <div className="text-center p-3 sm:p-4 bg-white/70 rounded-lg border border-white/50">
                            <div className="text-base sm:text-xl font-bold text-[#2E5E47] mb-1 truncate">
                              {formData.clientName || '—'}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600">Client</div>
                          </div>
                          <div className="text-center p-3 sm:p-4 bg-white/70 rounded-lg border border-white/50">
                            <div className="text-base sm:text-xl font-bold text-[#2E5E47] mb-1">
                              {formData.stages?.length || 0}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600">Stages</div>
                          </div>
                          <div className="text-center p-3 sm:p-4 bg-white/70 rounded-lg border border-white/50">
                            <div className="text-base sm:text-xl font-bold text-[#2E5E47] mb-1">
                              {formData.stages?.reduce((total, stage) => total + (stage.estimatedDays || 0), 0) || 0}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600">Est. Days</div>
                          </div>
                        </div>
                        
                        {/* Tags Preview */}
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          <Badge className="bg-[#2E5E47] text-xs">
                            {formData.workArrangement.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {formData.experienceLevel.charAt(0).toUpperCase() + formData.experienceLevel.slice(1)} Level
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {formData.contractType.charAt(0).toUpperCase() + formData.contractType.slice(1)}
                          </Badge>
                          {formData.priority && (
                            <Badge className={`${priorityConfig[formData.priority].color} text-xs`}>
                              <PriorityIcon className="h-3 w-3 mr-1" />
                              {formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1)} Priority
                            </Badge>
                          )}
                        </div>

                        {/* Stage Flow Preview */}
                        {formData.stages && formData.stages.length > 0 && (
                          <div className="space-y-2 sm:space-y-3">
                            <Label className="text-sm font-medium">Stage Flow:</Label>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                              {formData.stages.map((stage, index) => (
                                <div key={stage.id} className="flex items-center gap-1.5 sm:gap-2">
                                  <div className={`px-2.5 py-1 rounded-full text-white text-xs font-medium ${stage.color}`}>
                                    <span className="hidden sm:inline">{stage.name}</span>
                                    <span className="sm:hidden">{stage.name.slice(0, 8)}...</span>
                                    {stage.estimatedDays && (
                                      <span className="ml-1 text-xs opacity-75">({stage.estimatedDays}d)</span>
                                    )}
                                  </div>
                                  {index < formData.stages.length - 1 && (
                                    <ChevronDown className="h-3.5 w-3.5 text-gray-400 rotate-[-90deg]" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Selected Skills Preview */}
                        {(formData.skills.length > 0 || formData.tools.length > 0) && (
                          <div className="space-y-2 sm:space-y-3">
                            <Label className="text-sm font-medium">Required Skills & Tools:</Label>
                            <div className="flex flex-wrap gap-1">
                              {formData.skills.slice(0, 8).map((skill) => (
                                <Badge key={skill} className="bg-blue-100 text-blue-700 text-xs">
                                  {skill}
                                </Badge>
                              ))}
                              {formData.tools.slice(0, 4).map((tool) => (
                                <Badge key={tool} className="bg-green-100 text-green-700 text-xs">
                                  {tool}
                                </Badge>
                              ))}
                              {(formData.skills.length + formData.tools.length) > 12 && (
                                <Badge variant="outline" className="text-xs">
                                  +{(formData.skills.length + formData.tools.length) - 12} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-6 sm:py-8 text-gray-500">
                        <Star className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 opacity-50" />
                        <p className="text-sm">Fill in the basic information to see your pipeline preview</p>
                      </div>
                    )}
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          </form>
        </div>

        <DialogFooter className="px-3 sm:px-6 py-3 sm:py-4 border-t border-gray-200 bg-gray-50/50 flex-shrink-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
              <Save className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Changes are saved automatically</span>
              <span className="sm:hidden">Auto-saved</span>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <Button variant="outline" onClick={() => onOpenChange(false)} size="sm" className="h-8 sm:h-9 text-xs sm:text-sm">
                Cancel
              </Button>
              <Button 
                type="submit" 
                onClick={handleSubmit}
                className="bg-[#2E5E47] hover:bg-[#2E5E47]/90 h-8 sm:h-9 text-xs sm:text-sm"
                size="sm"
              >
                <Target className="h-3.5 w-3.5 mr-1.5" />
                <span className="hidden sm:inline">Create Pipeline</span>
                <span className="sm:hidden">Create</span>
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}