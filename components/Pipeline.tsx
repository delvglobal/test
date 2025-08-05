import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Plus, 
  MoreVertical, 
  Search,
  Filter,
  Edit,
  Trash2,
  Copy,
  Eye,
  Mail,
  Phone,
  Calendar,
  ArrowLeft,
  Building2,
  Users,
  MapPin,
  DollarSign,
  Clock,
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  UserPlus,
  Star,
  Archive,
  Settings,
  FileText,
  Briefcase,
  ChevronRight,
  ArrowRight,
  Database
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import type { ScreenType, ModalType } from '../types';

interface PipelineProps {
  onNavigateToScreen: (screen: ScreenType, candidateId?: string) => void;
  onOpenModal: (modal: ModalType) => void;
}

interface PipelineStage {
  id: string;
  name: string;
  description?: string;
  color: string;
  candidates: Candidate[];
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar: string;
  matchScore: number;
  currentSalary?: number;
  expectedSalary?: number;
  location: string;
  experience: number;
  skills: string[];
  lastActivity: string;
  notes?: string;
  appliedDate: string;
}

interface Pipeline {
  id: string;
  name: string; // e.g., "Senior React Developer"
  client: string; // e.g., "TechCorp Inc."
  department?: string;
  location: string;
  salaryRange: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'active' | 'paused' | 'completed' | 'draft';
  startDate: string;
  deadline?: string;
  description: string;
  requirements: string[];
  stages: PipelineStage[];
  totalCandidates: number;
  createdBy: string;
  createdAt: string;
}

// Remote staffing pipeline stages
const defaultStages: PipelineStage[] = [
  {
    id: 'pre-screen',
    name: 'Pre-Screen',
    description: 'Initial application and basic qualification review',
    color: 'bg-blue-100',
    candidates: []
  },
  {
    id: 'screen',
    name: 'Screen',
    description: 'Phone/video screening interview',
    color: 'bg-yellow-100',
    candidates: []
  },
  {
    id: 'interview-coordination',
    name: 'Interview Coordination',
    description: 'Scheduling interviews with client',
    color: 'bg-orange-100',
    candidates: []
  },
  {
    id: 'interviewed',
    name: 'Interviewed',
    description: 'Completed client interviews',
    color: 'bg-purple-100',
    candidates: []
  },
  {
    id: 'shortlisted',
    name: 'Shortlisted',
    description: 'Top candidates for final consideration',
    color: 'bg-indigo-100',
    candidates: []
  },
  {
    id: 'offer-extended',
    name: 'Offer Extended',
    description: 'Job offer has been made',
    color: 'bg-green-100',
    candidates: []
  },
  {
    id: 'hired',
    name: 'Hired',
    description: 'Successfully placed candidate',
    color: 'bg-emerald-100',
    candidates: []
  },
  {
    id: 'disqualified',
    name: 'Disqualified',
    description: 'Did not meet basic requirements',
    color: 'bg-gray-100',
    candidates: []
  },
  {
    id: 'rejected',
    name: 'Rejected',
    description: 'Not selected after interview process',
    color: 'bg-red-100',
    candidates: []
  }
];

// Mock data with remote staffing pipelines
const mockPipelines: Pipeline[] = [
  {
    id: 'p1',
    name: 'Senior React Developer',
    client: 'TechCorp Inc.',
    department: 'Engineering',
    location: 'Remote (US)',
    salaryRange: '$120k - $160k',
    priority: 'high',
    status: 'active',
    startDate: '2024-01-15',
    deadline: '2024-02-28',
    description: 'Looking for an experienced React developer to lead frontend initiatives for a growing SaaS platform.',
    requirements: ['5+ years React', 'TypeScript', 'Team leadership', 'Remote work experience'],
    totalCandidates: 23,
    createdBy: 'Sarah Johnson',
    createdAt: '2024-01-15',
    stages: [
      {
        ...defaultStages[0],
        candidates: [
          {
            id: '1',
            name: 'Alex Rivera',
            email: 'alex.rivera@email.com',
            phone: '+1 (555) 123-4567',
            avatar: '/avatar-1.jpg',
            matchScore: 92,
            currentSalary: 110000,
            expectedSalary: 140000,
            location: 'San Francisco, CA',
            experience: 6,
            skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
            lastActivity: '2 hours ago',
            appliedDate: '2024-01-20',
            notes: 'Strong technical background, interested in team lead role'
          },
          {
            id: '2',
            name: 'Sam Wilson',
            email: 'sam.wilson@email.com',
            avatar: '/avatar-2.jpg',
            matchScore: 88,
            currentSalary: 95000,
            expectedSalary: 130000,
            location: 'Austin, TX',
            experience: 5,
            skills: ['React', 'JavaScript', 'AWS', 'Docker'],
            lastActivity: '1 day ago',
            appliedDate: '2024-01-22'
          }
        ]
      },
      {
        ...defaultStages[1],
        candidates: [
          {
            id: '3',
            name: 'Sarah Chen',
            email: 'sarah.chen@email.com',
            avatar: '/avatar-3.jpg',
            matchScore: 94,
            currentSalary: 125000,
            expectedSalary: 155000,
            location: 'Seattle, WA',
            experience: 7,
            skills: ['React', 'TypeScript', 'Redux', 'Testing'],
            lastActivity: '3 hours ago',
            appliedDate: '2024-01-18',
            notes: 'Passed initial screening, excellent communication skills'
          }
        ]
      },
      {
        ...defaultStages[2],
        candidates: [
          {
            id: '4',
            name: 'Marcus Johnson',
            email: 'marcus.johnson@email.com',
            avatar: '/avatar-4.jpg',
            matchScore: 89,
            currentSalary: 115000,
            expectedSalary: 145000,
            location: 'Denver, CO',
            experience: 8,
            skills: ['React', 'Leadership', 'Architecture', 'Mentoring'],
            lastActivity: '5 hours ago',
            appliedDate: '2024-01-16'
          }
        ]
      },
      {
        ...defaultStages[3],
        candidates: [
          {
            id: '5',
            name: 'Lisa Wang',
            email: 'lisa.wang@email.com',
            avatar: '/avatar-5.jpg',
            matchScore: 95,
            currentSalary: 130000,
            expectedSalary: 160000,
            location: 'Portland, OR',
            experience: 9,
            skills: ['React', 'TypeScript', 'Team Lead', 'Product Management'],
            lastActivity: '1 hour ago',
            appliedDate: '2024-01-14',
            notes: 'Completed technical interview, client very impressed'
          }
        ]
      },
      {
        ...defaultStages[4],
        candidates: []
      },
      {
        ...defaultStages[5],
        candidates: []
      },
      {
        ...defaultStages[6],
        candidates: []
      },
      {
        ...defaultStages[7],
        candidates: [
          {
            id: '6',
            name: 'Tom Brown',
            email: 'tom.brown@email.com',
            avatar: '/avatar-6.jpg',
            matchScore: 75,
            location: 'Phoenix, AZ',
            experience: 3,
            skills: ['React', 'JavaScript'],
            lastActivity: '2 days ago',
            appliedDate: '2024-01-25',
            notes: 'Did not meet senior level requirements'
          }
        ]
      },
      {
        ...defaultStages[8],
        candidates: []
      }
    ]
  },
  {
    id: 'p2',
    name: 'UX Designer',
    client: 'DesignStudio LLC',
    department: 'Design',
    location: 'Remote (Global)',
    salaryRange: '$80k - $110k',
    priority: 'medium',
    status: 'active',
    startDate: '2024-01-20',
    deadline: '2024-03-15',
    description: 'Seeking a creative UX designer for product design team working on mobile applications.',
    requirements: ['3+ years UX', 'Figma', 'User research', 'Mobile design'],
    totalCandidates: 15,
    createdBy: 'Mike Chen',
    createdAt: '2024-01-20',
    stages: defaultStages.map(stage => ({ ...stage, candidates: [] }))
  },
  {
    id: 'p3',
    name: 'DevOps Engineer',
    client: 'CloudTech Solutions',
    department: 'Infrastructure',
    location: 'Remote (Americas)',
    salaryRange: '$100k - $140k',
    priority: 'urgent',
    status: 'active',
    startDate: '2024-01-25',
    deadline: '2024-02-15',
    description: 'DevOps engineer needed for cloud infrastructure and CI/CD pipeline management.',
    requirements: ['AWS/Azure', 'Kubernetes', 'CI/CD', '24/7 on-call'],
    totalCandidates: 8,
    createdBy: 'David Kim',
    createdAt: '2024-01-25',
    stages: defaultStages.map(stage => ({ ...stage, candidates: [] }))
  },
  {
    id: 'p4',
    name: 'Full Stack Developer',
    client: 'StartupXYZ',
    department: 'Engineering',
    location: 'Hybrid - Austin, TX',
    salaryRange: '$90k - $130k',
    priority: 'medium',
    status: 'paused',
    startDate: '2024-01-10',
    description: 'Full stack developer for early-stage startup building fintech solutions.',
    requirements: ['Node.js', 'React', 'PostgreSQL', 'Startup experience'],
    totalCandidates: 12,
    createdBy: 'Emma Rodriguez',
    createdAt: '2024-01-10',
    stages: defaultStages.map(stage => ({ ...stage, candidates: [] }))
  },
  {
    id: 'p5',
    name: 'Data Scientist',
    client: 'Analytics Pro',
    department: 'Data',
    location: 'Remote (US)',
    salaryRange: '$110k - $150k',
    priority: 'low',
    status: 'completed',
    startDate: '2023-12-01',
    deadline: '2024-01-31',
    description: 'Senior data scientist for machine learning and predictive analytics projects.',
    requirements: ['Python', 'ML/AI', 'Statistics', 'PhD preferred'],
    totalCandidates: 31,
    createdBy: 'Sarah Johnson',
    createdAt: '2023-12-01',
    stages: defaultStages.map(stage => ({ ...stage, candidates: [] }))
  }
];

export function Pipeline({ onNavigateToScreen, onOpenModal }: PipelineProps) {
  const [pipelines, setPipelines] = useState(mockPipelines);
  const [selectedPipelineId, setSelectedPipelineId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [clientFilter, setClientFilter] = useState<string>('all');

  const selectedPipeline = selectedPipelineId ? pipelines.find(p => p.id === selectedPipelineId) : null;

  // Get unique clients for filter
  const uniqueClients = Array.from(new Set(pipelines.map(p => p.client)));

  // Filter pipelines
  const filteredPipelines = pipelines.filter(pipeline => {
    const matchesSearch = searchTerm === '' || 
      pipeline.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pipeline.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pipeline.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || pipeline.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || pipeline.priority === priorityFilter;
    const matchesClient = clientFilter === 'all' || pipeline.client === clientFilter;

    return matchesSearch && matchesStatus && matchesPriority && matchesClient;
  });

  const moveCandidateToStage = (candidateId: string, fromStageId: string, toStageId: string) => {
    if (!selectedPipeline) return;

    const fromStage = selectedPipeline.stages.find(s => s.id === fromStageId);
    const toStage = selectedPipeline.stages.find(s => s.id === toStageId);
    
    if (!fromStage || !toStage) return;

    const candidate = fromStage.candidates.find(c => c.id === candidateId);
    if (!candidate) return;

    const updatedStages = selectedPipeline.stages.map(stage => {
      if (stage.id === fromStageId) {
        return { ...stage, candidates: stage.candidates.filter(c => c.id !== candidateId) };
      }
      if (stage.id === toStageId) {
        return { ...stage, candidates: [...stage.candidates, candidate] };
      }
      return stage;
    });

    setPipelines(pipelines.map(p =>
      p.id === selectedPipelineId ? { ...p, stages: updatedStages } : p
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'paused': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'draft': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'paused': return <Clock className="h-4 w-4" />;
      case 'completed': return <Target className="h-4 w-4" />;
      case 'draft': return <Edit className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const handleCandidateClick = (candidateId: string) => {
    onNavigateToScreen('candidate-detail', candidateId);
  };

  // If a pipeline is selected, show the board view
  if (selectedPipeline) {
    return (
      <div className="space-y-6">
        {/* Pipeline Board Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setSelectedPipelineId(null)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Pipelines
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-[#2E5E47]">{selectedPipeline.name}</h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                {selectedPipeline.client}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenModal('add-candidate-to-pipeline' as ModalType)}
              className="bg-[#2E5E47] text-white hover:bg-[#2E5E47]/90"
            >
              <Database className="h-4 w-4 mr-2" />
              Add from Talent Pool
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Pipeline Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Pipeline
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate Pipeline
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="h-4 w-4 mr-2" />
                  Export Report
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <Archive className="h-4 w-4 mr-2" />
                  Archive Pipeline
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Pipeline Info Card */}
        <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-medium">{selectedPipeline.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Salary Range</p>
                  <p className="font-medium">{selectedPipeline.salaryRange}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Candidates</p>
                  <p className="font-medium">{selectedPipeline.totalCandidates}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Deadline</p>
                  <p className="font-medium">
                    {selectedPipeline.deadline ? 
                      new Date(selectedPipeline.deadline).toLocaleDateString() : 
                      'No deadline'
                    }
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pipeline Stages Board */}
        <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-4 min-h-[600px]">
          {/* Main workflow stages */}
          {selectedPipeline.stages.filter(stage => 
            !['disqualified', 'rejected'].includes(stage.id)
          ).map((stage) => (
            <div key={stage.id} className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{stage.name}</h3>
                  {stage.description && (
                    <p className="text-xs text-gray-500 mt-1">{stage.description}</p>
                  )}
                </div>
                <Badge variant="secondary">{stage.candidates.length}</Badge>
              </div>

              <div className={`flex-1 min-h-32 rounded-lg p-3 ${stage.color}`}>
                <div className="space-y-3">
                  {stage.candidates.map((candidate) => (
                    <Card
                      key={candidate.id}
                      className="backdrop-blur-md bg-white/95 border border-white/20 shadow-sm hover:shadow-md transition-all"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <button
                            onClick={() => handleCandidateClick(candidate.id)}
                            className="flex items-center space-x-3 text-left flex-1"
                          >
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={candidate.avatar} alt={candidate.name} />
                              <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium hover:text-[#2E5E47] transition-colors truncate">
                                {candidate.name}
                              </p>
                              <p className="text-xs text-gray-600 truncate">{candidate.email}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className="bg-[#2E5E47] text-white text-xs">
                                  {candidate.matchScore}%
                                </Badge>
                                <span className="text-xs text-gray-500">
                                  {candidate.experience}y exp
                                </span>
                              </div>
                            </div>
                          </button>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => handleCandidateClick(candidate.id)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="h-4 w-4 mr-2" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => onOpenModal('schedule-interview')}>
                                <Calendar className="h-4 w-4 mr-2" />
                                Schedule Interview
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => onOpenModal('create-shortlist')}>
                                <Star className="h-4 w-4 mr-2" />
                                Add to Shortlist
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {/* Move to next stage options */}
                              {stage.id !== 'hired' && (
                                <DropdownMenuItem 
                                  onClick={() => {
                                    const nextStageIndex = selectedPipeline.stages.findIndex(s => s.id === stage.id) + 1;
                                    if (nextStageIndex < selectedPipeline.stages.length) {
                                      const nextStage = selectedPipeline.stages[nextStageIndex];
                                      if (!['disqualified', 'rejected'].includes(nextStage.id)) {
                                        moveCandidateToStage(candidate.id, stage.id, nextStage.id);
                                      }
                                    }
                                  }}
                                >
                                  <ArrowRight className="h-4 w-4 mr-2" />
                                  Move to Next Stage
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem 
                                onClick={() => moveCandidateToStage(candidate.id, stage.id, 'disqualified')}
                                className="text-red-600"
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Disqualify
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="space-y-2 text-xs text-gray-600">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {candidate.location}
                            </span>
                            <span className="text-xs text-gray-500">
                              {candidate.lastActivity}
                            </span>
                          </div>
                          
                          {candidate.expectedSalary && (
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              Expected: ${candidate.expectedSalary.toLocaleString()}
                            </div>
                          )}

                          <div className="flex flex-wrap gap-1 mt-2">
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

                          {candidate.notes && (
                            <div className="mt-2 p-2 bg-yellow-50 rounded text-xs">
                              <p className="truncate">{candidate.notes}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {/* Add candidate from talent pool button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-3 border-2 border-dashed border-gray-300 hover:border-[#2E5E47] hover:bg-[#2E5E47]/5"
                  onClick={() => onOpenModal('add-candidate-to-pipeline' as ModalType)}
                >
                  <Database className="h-4 w-4 mr-2" />
                  Add from Talent Pool
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Disqualified/Rejected Section */}
        <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <XCircle className="h-5 w-5" />
              Disqualified & Rejected Candidates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedPipeline.stages.filter(stage => 
                ['disqualified', 'rejected'].includes(stage.id)
              ).map((stage) => (
                <div key={stage.id}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{stage.name}</h4>
                    <Badge variant="secondary">{stage.candidates.length}</Badge>
                  </div>
                  <div className={`min-h-24 rounded-lg p-3 ${stage.color}`}>
                    <div className="space-y-2">
                      {stage.candidates.map((candidate) => (
                        <div
                          key={candidate.id}
                          className="bg-white/90 border border-white/20 rounded p-2 text-sm"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{candidate.name}</span>
                            <Badge className="bg-[#2E5E47] text-white text-xs">
                              {candidate.matchScore}%
                            </Badge>
                          </div>
                          {candidate.notes && (
                            <p className="text-xs text-gray-600 mt-1 truncate">
                              {candidate.notes}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Default view: Pipeline List
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#2E5E47] mb-2">Pipelines</h1>
          <p className="text-gray-600">
            Manage role-specific hiring pipelines for your clients. Total: {pipelines.length} pipelines
          </p>
        </div>
        <Button 
          className="bg-[#2E5E47] hover:bg-[#2E5E47]/90"
          onClick={() => onOpenModal('create-pipeline')}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Pipeline
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search pipelines, clients, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Select value={clientFilter} onValueChange={setClientFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clients</SelectItem>
                  {uniqueClients.map(client => (
                    <SelectItem key={client} value={client}>{client}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pipeline List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPipelines.map((pipeline) => (
          <Card key={pipeline.id} className="backdrop-blur-md bg-white/90 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getPriorityColor(pipeline.priority)}>
                      {pipeline.priority}
                    </Badge>
                    <Badge className={`${getStatusColor(pipeline.status)} flex items-center gap-1`}>
                      {getStatusIcon(pipeline.status)}
                      {pipeline.status}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {pipeline.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Building2 className="h-4 w-4" />
                    {pipeline.client}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSelectedPipelineId(pipeline.id)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Pipeline
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Pipeline
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate Pipeline
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Pipeline
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700 line-clamp-2">
                {pipeline.description}
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {pipeline.location}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="h-4 w-4" />
                    {pipeline.salaryRange}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-600">
                    <Users className="h-4 w-4" />
                    {pipeline.totalCandidates} candidates
                  </span>
                  {pipeline.deadline && (
                    <span className="flex items-center gap-1 text-orange-600">
                      <Clock className="h-3 w-3" />
                      {new Date(pipeline.deadline).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Pipeline Progress</span>
                  <span className="text-gray-600">
                    {pipeline.stages.reduce((sum, stage) => sum + stage.candidates.length, 0)} active
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {pipeline.stages.slice(0, 6).map((stage) => (
                    <div key={stage.id} className="text-center">
                      <div className={`h-2 rounded-full ${stage.color}`} />
                      <p className="text-xs text-gray-600 mt-1 truncate">{stage.candidates.length}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  className="flex-1 bg-[#2E5E47] hover:bg-[#2E5E47]/90"
                  onClick={() => setSelectedPipelineId(pipeline.id)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Pipeline
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onOpenModal('add-candidate-to-pipeline' as ModalType)}
                  title="Add candidates from talent pool"
                >
                  <Database className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPipelines.length === 0 && (
        <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-sm">
          <CardContent className="text-center py-12">
            <Briefcase className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No pipelines found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all' || clientFilter !== 'all'
                ? 'Try adjusting your search criteria or filters.'
                : 'Get started by creating your first role-specific pipeline.'
              }
            </p>
            {(!searchTerm && statusFilter === 'all' && priorityFilter === 'all' && clientFilter === 'all') && (
              <Button 
                className="bg-[#2E5E47] hover:bg-[#2E5E47]/90"
                onClick={() => onOpenModal('create-pipeline')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Pipeline
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold">{pipelines.filter(p => p.status === 'active').length}</p>
            <p className="text-sm text-gray-600">Active Pipelines</p>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold">
              {pipelines.reduce((sum, p) => sum + p.totalCandidates, 0)}
            </p>
            <p className="text-sm text-gray-600">Total Candidates</p>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <p className="text-2xl font-bold">
              {pipelines.filter(p => p.priority === 'urgent').length}
            </p>
            <p className="text-sm text-gray-600">Urgent Pipelines</p>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Building2 className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold">{uniqueClients.length}</p>
            <p className="text-sm text-gray-600">Active Clients</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}