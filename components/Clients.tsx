import React, { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import {
  Building2,
  Users,
  MapPin,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Eye,
  MessageSquare,
  FileText,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Globe,
  Briefcase,
  Target,
  DollarSign,
  Activity,
  RefreshCw,
  Download,
  ExternalLink,
  UserCheck,
  ChevronRight,
  Edit,
  Trash2,
  Send,
  Grid3X3,
  List,
  CreditCard,
  Calendar as CalendarIcon,
  Award,
  TrendingDown,
  ArrowUpRight,
  Zap,
  Heart,
  Bookmark,
  Share2,
  MousePointer,
  Sparkles,
  Building,
  Mail as MailIcon,
  Phone as PhoneIcon,
  Crown,
  Flame
} from 'lucide-react';
import { cn } from './ui/utils';
import { toast } from 'sonner';

interface ClientsProps {
  onNavigateToScreen?: (screen: any, clientId?: string) => void;
  onOpenModal?: (modal: any) => void;
}

interface Client {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  size: string;
  location: string;
  status: 'active' | 'trial' | 'paused' | 'inactive';
  tier: 'enterprise' | 'growth' | 'startup';
  primaryContact: {
    name: string;
    title: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  monthlySubscription: number;
  placementsFilled: number;
  placementsTotal: number;
  activeRequirements: number;
  lastContact: string;
  joinDate: string;
  tags: string[];
  notes: string;
  satisfactionScore: number;
  nextRenewal?: string;
  paymentMethod?: string;
  isStarred?: boolean;
  priority?: 'high' | 'medium' | 'low';
  responseTime?: number; // in hours
  successRate?: number; // percentage
}

// Enhanced mock client data
const initialClients: Client[] = [
  {
    id: 'client_001',
    name: 'TechCorp Solutions',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=64&h=64&fit=crop&crop=center',
    industry: 'Technology',
    size: '500-1000',
    location: 'San Francisco, CA',
    status: 'active',
    tier: 'enterprise',
    primaryContact: {
      name: 'Sarah Johnson',
      title: 'VP of Engineering',
      email: 'sarah.johnson@techcorp.com',
      phone: '+1 (555) 123-4567',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b120?w=64&h=64&fit=crop&crop=face'
    },
    monthlySubscription: 12500,
    placementsFilled: 12,
    placementsTotal: 15,
    activeRequirements: 8,
    lastContact: '2024-01-12T10:30:00Z',
    joinDate: '2023-06-15T00:00:00Z',
    tags: ['Preferred Partner', 'Tech Stack: React/Node'],
    notes: 'High-volume client with complex technical requirements. Prefers senior-level candidates.',
    satisfactionScore: 4.8,
    nextRenewal: '2024-06-15T00:00:00Z',
    paymentMethod: 'ACH Transfer',
    isStarred: true,
    priority: 'high',
    responseTime: 2,
    successRate: 85
  },
  {
    id: 'client_002',
    name: 'GreenEnergy Dynamics',
    logo: 'https://images.unsplash.com/photo-1497436072909-f5e4be365263?w=64&h=64&fit=crop&crop=center',
    industry: 'Energy & Utilities',
    size: '200-500',
    location: 'Austin, TX',
    status: 'active',
    tier: 'growth',
    primaryContact: {
      name: 'Michael Chen',
      title: 'Head of Talent',
      email: 'michael.chen@greenenergy.com',
      phone: '+1 (555) 987-6543',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face'
    },
    monthlySubscription: 7500,
    placementsFilled: 6,
    placementsTotal: 8,
    activeRequirements: 4,
    lastContact: '2024-01-10T14:15:00Z',
    joinDate: '2023-09-20T00:00:00Z',
    tags: ['Sustainability Focus', 'Remote-First'],
    notes: 'Focus on renewable energy projects. Values cultural fit and sustainability mindset.',
    satisfactionScore: 4.6,
    nextRenewal: '2024-09-20T00:00:00Z',
    paymentMethod: 'Credit Card',
    isStarred: false,
    priority: 'medium',
    responseTime: 4,
    successRate: 78
  },
  {
    id: 'client_003',
    name: 'FinanceFirst Bank',
    logo: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=64&h=64&fit=crop&crop=center',
    industry: 'Financial Services',
    size: '1000+',
    location: 'New York, NY',
    status: 'paused',
    tier: 'enterprise',
    primaryContact: {
      name: 'Amanda Rodriguez',
      title: 'Chief People Officer',
      email: 'amanda.rodriguez@financefirst.com',
      phone: '+1 (555) 456-7890',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face'
    },
    monthlySubscription: 0,
    placementsFilled: 9,
    placementsTotal: 12,
    activeRequirements: 0,
    lastContact: '2023-12-20T16:45:00Z',
    joinDate: '2023-03-10T00:00:00Z',
    tags: ['Compliance Heavy', 'Security Clearance Required'],
    notes: 'Temporarily paused hiring due to budget review. Expected to resume Q2 2024.',
    satisfactionScore: 4.2,
    nextRenewal: '2024-03-10T00:00:00Z',
    paymentMethod: 'Invoice',
    isStarred: false,
    priority: 'low',
    responseTime: 24,
    successRate: 68
  },
  {
    id: 'client_004',
    name: 'HealthTech Innovations',
    logo: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=64&h=64&fit=crop&crop=center',
    industry: 'Healthcare',
    size: '100-200',
    location: 'Boston, MA',
    status: 'trial',
    tier: 'startup',
    primaryContact: {
      name: 'Dr. James Wilson',
      title: 'CTO',
      email: 'james.wilson@healthtech.com',
      phone: '+1 (555) 234-5678',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=64&h=64&fit=crop&crop=face'
    },
    monthlySubscription: 2500,
    placementsFilled: 2,
    placementsTotal: 3,
    activeRequirements: 2,
    lastContact: '2024-01-14T11:20:00Z',
    joinDate: '2024-01-01T00:00:00Z',
    tags: ['Healthcare', 'FDA Compliance', 'Early Stage'],
    notes: 'New client in trial period. Focus on healthcare IT and regulatory compliance experience.',
    satisfactionScore: 4.9,
    nextRenewal: '2024-04-01T00:00:00Z',
    paymentMethod: 'Credit Card',
    isStarred: true,
    priority: 'high',
    responseTime: 1,
    successRate: 92
  },
  {
    id: 'client_005',
    name: 'RetailMax Corporation',
    logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=64&h=64&fit=crop&crop=center',
    industry: 'Retail & E-commerce',
    size: '5000+',
    location: 'Seattle, WA',
    status: 'inactive',
    tier: 'enterprise',
    primaryContact: {
      name: 'Lisa Thompson',
      title: 'SVP Human Resources',
      email: 'lisa.thompson@retailmax.com',
      phone: '+1 (555) 345-6789',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=64&h=64&fit=crop&crop=face'
    },
    monthlySubscription: 0,
    placementsFilled: 5,
    placementsTotal: 15,
    activeRequirements: 0,
    lastContact: '2023-11-15T09:30:00Z',
    joinDate: '2023-01-15T00:00:00Z',
    tags: ['Large Scale', 'E-commerce', 'Contract Ended'],
    notes: 'Contract concluded. Potential for renewal discussions in Q3 2024.',
    satisfactionScore: 3.8,
    nextRenewal: '2024-07-15T00:00:00Z',
    paymentMethod: 'Invoice',
    isStarred: false,
    priority: 'low',
    responseTime: 12,
    successRate: 45
  },
  {
    id: 'client_006',
    name: 'CloudScale Systems',
    logo: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=64&h=64&fit=crop&crop=center',
    industry: 'Technology',
    size: '50-100',
    location: 'Remote',
    status: 'active',
    tier: 'growth',
    primaryContact: {
      name: 'Alex Kim',
      title: 'Technical Recruiter',
      email: 'alex.kim@cloudscale.io',
      phone: '+1 (555) 789-0123',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face'
    },
    monthlySubscription: 5500,
    placementsFilled: 8,
    placementsTotal: 10,
    activeRequirements: 5,
    lastContact: '2024-01-13T16:45:00Z',
    joinDate: '2023-11-01T00:00:00Z',
    tags: ['Cloud Native', 'DevOps', 'Remote Team'],
    notes: 'Fast-growing cloud infrastructure startup. Needs DevOps and backend engineers.',
    satisfactionScore: 4.7,
    nextRenewal: '2024-11-01T00:00:00Z',
    paymentMethod: 'Credit Card',
    isStarred: true,
    priority: 'high',
    responseTime: 3,
    successRate: 88
  }
];

const clientStatuses = [
  { value: 'active', label: 'Active', color: 'bg-gray-100/80 text-gray-600 border-gray-200/60 backdrop-blur-sm', icon: CheckCircle },
  { value: 'trial', label: 'Trial', color: 'bg-gray-100/80 text-gray-600 border-gray-200/60 backdrop-blur-sm', icon: Clock },
  { value: 'paused', label: 'Paused', color: 'bg-gray-100/80 text-gray-600 border-gray-200/60 backdrop-blur-sm', icon: AlertCircle },
  { value: 'inactive', label: 'Inactive', color: 'bg-gray-100/80 text-gray-600 border-gray-200/60 backdrop-blur-sm', icon: XCircle }
];

const clientTiers = [
  { value: 'enterprise', label: 'Enterprise', color: 'bg-gray-100/80 text-gray-600 border-gray-200/60 backdrop-blur-sm', icon: Crown },
  { value: 'growth', label: 'Growth', color: 'bg-gray-100/80 text-gray-600 border-gray-200/60 backdrop-blur-sm', icon: TrendingUp },
  { value: 'startup', label: 'Startup', color: 'bg-gray-100/80 text-gray-600 border-gray-200/60 backdrop-blur-sm', icon: Sparkles }
];

const priorityColors = {
  high: 'bg-gray-100/80 text-gray-600 border-gray-200/60 backdrop-blur-sm',
  medium: 'bg-gray-100/80 text-gray-600 border-gray-200/60 backdrop-blur-sm',
  low: 'bg-gray-100/80 text-gray-600 border-gray-200/60 backdrop-blur-sm'
};

const industries = [
  'Technology',
  'Financial Services',
  'Healthcare',
  'Energy & Utilities',
  'Retail & E-commerce',
  'Manufacturing',
  'Consulting',
  'Media & Entertainment',
  'Education',
  'Government'
];

const companySizes = [
  '1-10',
  '11-50',
  '51-100',
  '101-200',
  '201-500',
  '501-1000',
  '1001-5000',
  '5000+'
];

export function Clients({ onNavigateToScreen, onOpenModal }: ClientsProps) {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [industryFilter, setIndustryFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('grid');
  const [showClientModal, setShowClientModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'subscription' | 'success' | 'activity'>('activity');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Client form state
  const [clientForm, setClientForm] = useState<Partial<Client>>({
    name: '',
    industry: '',
    size: '',
    location: '',
    status: 'trial',
    tier: 'startup',
    primaryContact: {
      name: '',
      title: '',
      email: '',
      phone: ''
    },
    monthlySubscription: 0,
    placementsFilled: 0,
    placementsTotal: 0,
    activeRequirements: 0,
    tags: [],
    notes: '',
    satisfactionScore: 5.0,
    priority: 'medium',
    responseTime: 4,
    successRate: 75
  });

  // Filter and sort clients
  const filteredAndSortedClients = useMemo(() => {
    let filtered = clients.filter(client => {
      const matchesSearch = searchTerm === '' || 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.primaryContact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
      const matchesTier = tierFilter === 'all' || client.tier === tierFilter;
      const matchesIndustry = industryFilter === 'all' || client.industry === industryFilter;
      const matchesPriority = priorityFilter === 'all' || client.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesTier && matchesIndustry && matchesPriority;
    });

    // Sort clients
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'subscription':
          aValue = a.monthlySubscription;
          bValue = b.monthlySubscription;
          break;
        case 'success':
          aValue = a.successRate || 0;
          bValue = b.successRate || 0;
          break;
        case 'activity':
          aValue = new Date(a.lastContact).getTime();
          bValue = new Date(b.lastContact).getTime();
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    // Put starred clients first
    filtered.sort((a, b) => {
      if (a.isStarred && !b.isStarred) return -1;
      if (!a.isStarred && b.isStarred) return 1;
      return 0;
    });

    return filtered;
  }, [clients, searchTerm, statusFilter, tierFilter, industryFilter, priorityFilter, sortBy, sortOrder]);

  // Calculate summary stats
  const summaryStats = useMemo(() => {
    const activeClients = clients.filter(c => c.status === 'active').length;
    const totalPlacements = clients.reduce((sum, c) => sum + c.placementsFilled, 0);
    const totalRequirements = clients.reduce((sum, c) => sum + c.activeRequirements, 0);
    const monthlyRevenue = clients.reduce((sum, c) => sum + (c.status === 'active' ? c.monthlySubscription : 0), 0);
    const avgSuccessRate = clients.length > 0 ?
      clients.reduce((sum, c) => sum + (c.successRate || 0), 0) / clients.length : 0;
    
    return {
      total: clients.length,
      active: activeClients,
      placements: totalPlacements,
      requirements: totalRequirements,
      monthlyRevenue,
      avgSuccessRate
    };
  }, [clients]);

  const getStatusConfig = (status: string) => {
    return clientStatuses.find(s => s.value === status) || clientStatuses[0];
  };

  const getTierConfig = (tier: string) => {
    return clientTiers.find(t => t.value === tier) || clientTiers[0];
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)}d ago`;
    } else {
      return formatDate(dateString);
    }
  };

  const handleClientClick = (client: Client) => {
    setSelectedClient(client);
  };

  const handleStarClient = (clientId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setClients(prev => prev.map(client => 
      client.id === clientId 
        ? { ...client, isStarred: !client.isStarred }
        : client
    ));
    toast.success('Client updated');
  };

  const handleAddClient = () => {
    setEditingClient(null);
    setClientForm({
      name: '',
      industry: '',
      size: '',
      location: '',
      status: 'trial',
      tier: 'startup',
      primaryContact: {
        name: '',
        title: '',
        email: '',
        phone: ''
      },
      monthlySubscription: 0,
      placementsFilled: 0,
      placementsTotal: 0,
      activeRequirements: 0,
      tags: [],
      notes: '',
      priority: 'medium',
      responseTime: 4,
      successRate: 75
    });
    setShowClientModal(true);
  };

  const handleEditClient = (client: Client, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEditingClient(client);
    setClientForm(client);
    setShowClientModal(true);
  };

  const handleSaveClient = () => {
    if (!clientForm.name || !clientForm.industry || !clientForm.primaryContact?.name) {
      toast.error('Please fill in all required fields');
      return;
    }

    const now = new Date().toISOString();
    
    if (editingClient) {
      setClients(prev => prev.map(client => 
        client.id === editingClient.id 
          ? { ...clientForm as Client, id: editingClient.id }
          : client
      ));
      toast.success('Client updated successfully');
    } else {
      const newClient: Client = {
        ...clientForm as Client,
        id: `client_${Date.now()}`,
        joinDate: now,
        lastContact: now,
        nextRenewal: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        paymentMethod: 'Credit Card',
        isStarred: false
      };
      setClients(prev => [...prev, newClient]);
      toast.success('Client added successfully');
    }
    
    setShowClientModal(false);
    setEditingClient(null);
  };

  const handleDeleteClient = (clientId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setClients(prev => prev.filter(client => client.id !== clientId));
    toast.success('Client removed successfully');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setTierFilter('all');
    setIndustryFilter('all');
    setPriorityFilter('all');
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <span>Business Development</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-gray-900 font-medium">Client Portfolio</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-[#2E5E47] rounded-xl shadow-sm">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl text-gray-900 mb-1">Client Portfolio</h1>
                <p className="text-gray-600">Manage client relationships and subscription revenue</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm">
              <Button 
                variant={viewMode === 'table' ? 'default' : 'ghost'} 
                size="sm"
                className="rounded-r-none border-r"
                onClick={() => setViewMode('table')}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                size="sm"
                className="rounded-l-none"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button 
              className="bg-[#2E5E47] hover:bg-[#2E5E47]/90" 
              size="sm"
              onClick={handleAddClient}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </div>
        </div>

        {/* Enhanced Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          <Card className="lg:col-span-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{summaryStats.total}</p>
                </div>
                <Building2 className="h-5 w-5 text-gray-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active</p>
                  <p className="text-2xl font-bold text-gray-900">{summaryStats.active}</p>
                </div>
                <CheckCircle className="h-5 w-5 text-gray-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Placements</p>
                  <p className="text-2xl font-bold text-gray-900">{summaryStats.placements}</p>
                </div>
                <UserCheck className="h-5 w-5 text-gray-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Open Roles</p>
                  <p className="text-2xl font-bold text-gray-900">{summaryStats.requirements}</p>
                </div>
                <Target className="h-5 w-5 text-gray-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Monthly</p>
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(summaryStats.monthlyRevenue)}</p>
                </div>
                <CreditCard className="h-5 w-5 text-gray-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Success</p>
                  <p className="text-2xl font-bold text-gray-900">{Math.round(summaryStats.avgSuccessRate)}%</p>
                </div>
                <Award className="h-5 w-5 text-gray-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search clients, contacts, industries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-3 overflow-x-auto">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {clientStatuses.map(status => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={tierFilter} onValueChange={setTierFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tiers</SelectItem>
                    {clientTiers.map(tier => (
                      <SelectItem key={tier.value} value={tier.value}>
                        {tier.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={industryFilter} onValueChange={setIndustryFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    {industries.map(industry => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="activity">Last Activity</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="subscription">Subscription</SelectItem>
                    <SelectItem value="success">Success Rate</SelectItem>
                  </SelectContent>
                </Select>

                {(searchTerm || statusFilter !== 'all' || tierFilter !== 'all' || industryFilter !== 'all' || priorityFilter !== 'all') && (
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clients Display */}
        {viewMode === 'grid' ? (
          // Enhanced Grid View with Optimized Cards
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAndSortedClients.map((client) => {
              const statusConfig = getStatusConfig(client.status);
              const tierConfig = getTierConfig(client.tier);
              const StatusIcon = statusConfig.icon;
              const TierIcon = tierConfig.icon;
              const placementProgress = (client.placementsFilled / client.placementsTotal) * 100;
              
              return (
                <Card 
                  key={client.id} 
                  className={cn(
                    "group relative overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer",
                    "border-2 hover:border-[#2E5E47]/20",
                    client.isStarred && "ring-2 ring-yellow-200 border-yellow-300"
                  )}
                  onClick={() => handleClientClick(client)}
                >
                  {/* Priority & Status Indicators */}
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
                    {client.priority === 'high' && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse cursor-help"></div>
                        </TooltipTrigger>
                        <TooltipContent>High Priority</TooltipContent>
                      </Tooltip>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-white/80"
                      onClick={(e) => handleStarClient(client.id, e)}
                    >
                      <Star 
                        className={cn(
                          "h-4 w-4 transition-colors",
                          client.isStarred ? "text-yellow-500 fill-yellow-500" : "text-gray-400 hover:text-yellow-500"
                        )} 
                      />
                    </Button>
                  </div>

                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <Avatar className="h-14 w-14 border-2 border-white shadow-md">
                          <AvatarImage src={client.logo} alt={client.name} />
                          <AvatarFallback className="bg-[#2E5E47] text-white text-lg font-semibold">
                            {client.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {client.status === 'active' && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <CardTitle className="text-lg leading-tight line-clamp-1">{client.name}</CardTitle>
                            <p className="text-sm text-gray-500 mt-1">{client.industry}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-3">
                          <Badge variant="outline" className={cn("gap-1 text-xs", statusConfig.color)}>
                            <StatusIcon className="h-3 w-3" />
                            {statusConfig.label}
                          </Badge>
                          <Badge variant="outline" className={cn("gap-1 text-xs", tierConfig.color)}>
                            <TierIcon className="h-3 w-3" />
                            {tierConfig.label}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500">Monthly Revenue</p>
                        <p className="text-lg font-bold text-[#2E5E47]">
                          {formatCurrency(client.monthlySubscription)}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500">Success Rate</p>
                        <div className="flex items-center gap-2">
                          <p className="text-lg font-bold text-green-600">{client.successRate}%</p>
                          {client.successRate && client.successRate > 80 && (
                            <Flame className="h-4 w-4 text-orange-500" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Placement Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Placements Progress</span>
                        <span className="font-medium">
                          {client.placementsFilled}/{client.placementsTotal}
                        </span>
                      </div>
                      <Progress value={placementProgress} className="h-2" />
                    </div>

                    {/* Performance Indicators */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{client.responseTime}h</span>
                        <span className="text-gray-500">response</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{client.activeRequirements}</span>
                        <span className="text-gray-500">roles</span>
                      </div>
                    </div>

                    {/* Primary Contact */}
                    <div className="border-t pt-4">
                      <p className="text-xs text-gray-500 mb-2">Primary Contact</p>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={client.primaryContact.avatar} alt={client.primaryContact.name} />
                          <AvatarFallback className="text-xs bg-gray-100">
                            {client.primaryContact.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-1">{client.primaryContact.name}</p>
                          <p className="text-xs text-gray-500 line-clamp-1">{client.primaryContact.title}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(`mailto:${client.primaryContact.email}`);
                                }}
                              >
                                <MailIcon className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Send Email</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(`tel:${client.primaryContact.phone}`);
                                }}
                              >
                                <PhoneIcon className="h-3 w-3" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Call</TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </div>

                    {/* Last Activity */}
                    <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-3">
                      <span>Last contact: {formatRelativeTime(client.lastContact)}</span>
                      <div className="flex items-center gap-1">
                        {client.activeRequirements > 0 && (
                          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-xs">
                            {client.activeRequirements} open roles
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>

                  {/* Hover Actions */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="flex items-center gap-1 bg-white rounded-lg shadow-lg border p-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={(e) => handleEditClient(client, e)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit Client</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Add share functionality
                            }}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Share</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm('Are you sure you want to remove this client?')) {
                                handleDeleteClient(client.id);
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete Client</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          // Table View (unchanged but improved)
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-[#2E5E47]" />
                  Client Directory
                </CardTitle>
                <div className="text-sm text-gray-600">
                  {filteredAndSortedClients.length} of {clients.length} clients
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableHead className="font-medium">Client</TableHead>
                      <TableHead className="font-medium">Contact</TableHead>
                      <TableHead className="font-medium">Status</TableHead>
                      <TableHead className="font-medium">Subscription</TableHead>
                      <TableHead className="font-medium">Performance</TableHead>
                      <TableHead className="font-medium">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAndSortedClients.map((client) => {
                      const statusConfig = getStatusConfig(client.status);
                      const tierConfig = getTierConfig(client.tier);
                      const StatusIcon = statusConfig.icon;
                      
                      return (
                        <TableRow 
                          key={client.id} 
                          className="hover:bg-gray-50 cursor-pointer group"
                          onClick={() => handleClientClick(client)}
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              {client.isStarred && (
                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              )}
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={client.logo} alt={client.name} />
                                <AvatarFallback className="bg-[#2E5E47] text-white">
                                  {client.name.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-gray-900">{client.name}</div>
                                <div className="text-sm text-gray-500">{client.industry} • {client.location}</div>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline" className={cn("text-xs", tierConfig.color)}>
                                    {tierConfig.label}
                                  </Badge>
                                  {client.priority === 'high' && (
                                    <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                                      High Priority
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={client.primaryContact.avatar} alt={client.primaryContact.name} />
                                <AvatarFallback className="text-xs">
                                  {client.primaryContact.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="text-sm font-medium">{client.primaryContact.name}</div>
                                <div className="text-xs text-gray-500">{client.primaryContact.title}</div>
                              </div>
                            </div>
                          </TableCell>
                          
                          <TableCell>
                            <Badge variant="outline" className={cn("gap-1", statusConfig.color)}>
                              <StatusIcon className="h-3 w-3" />
                              {statusConfig.label}
                            </Badge>
                          </TableCell>
                          
                          <TableCell>
                            <div className="text-sm font-medium">
                              {formatCurrency(client.monthlySubscription)}/mo
                            </div>
                            <div className="text-xs text-gray-500">
                              Next: {client.nextRenewal ? formatDate(client.nextRenewal) : 'TBD'}
                            </div>
                          </TableCell>
                          
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-900 font-medium">{client.successRate}%</span>
                                <span className="text-gray-500">success</span>
                              </div>
                              <div className="text-xs text-gray-500">
                                {client.placementsFilled}/{client.placementsTotal} placements
                              </div>
                            </div>
                          </TableCell>
                          
                          <TableCell>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={(e) => handleEditClient(client, e)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={(e) => handleDeleteClient(client.id, e)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Empty State */}
        {filteredAndSortedClients.length === 0 && (
          <Card>
            <CardContent className="text-center py-16">
              <div className="relative">
                <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full animate-ping opacity-20"></div>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searchTerm || statusFilter !== 'all' || tierFilter !== 'all' || industryFilter !== 'all' || priorityFilter !== 'all'
                  ? 'No clients match your current filters. Try adjusting your search criteria.'
                  : 'Get started by adding your first client to begin tracking relationships and revenue.'}
              </p>
              <div className="flex items-center justify-center gap-3">
                {searchTerm || statusFilter !== 'all' || tierFilter !== 'all' || industryFilter !== 'all' || priorityFilter !== 'all' ? (
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                ) : (
                  <Button onClick={handleAddClient} className="bg-[#2E5E47] hover:bg-[#2E5E47]/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Client
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Client Modal (unchanged but improved) */}
        <Dialog open={showClientModal} onOpenChange={setShowClientModal}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingClient ? 'Edit Client' : 'Add New Client'}
              </DialogTitle>
              <DialogDescription>
                {editingClient ? 'Update client information and subscription details.' : 'Add a new client to your portfolio.'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company Name *</Label>
                  <Input
                    placeholder="e.g. TechCorp Solutions"
                    value={clientForm.name || ''}
                    onChange={(e) => setClientForm(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Industry *</Label>
                  <Select 
                    value={clientForm.industry || ''} 
                    onValueChange={(value) => setClientForm(prev => ({ ...prev, industry: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map(industry => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Company Size</Label>
                  <Select 
                    value={clientForm.size || ''} 
                    onValueChange={(value) => setClientForm(prev => ({ ...prev, size: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {companySizes.map(size => (
                        <SelectItem key={size} value={size}>
                          {size} employees
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    placeholder="e.g. San Francisco, CA"
                    value={clientForm.location || ''}
                    onChange={(e) => setClientForm(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select 
                    value={clientForm.status || 'trial'} 
                    onValueChange={(value: any) => setClientForm(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {clientStatuses.map(status => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Tier</Label>
                  <Select 
                    value={clientForm.tier || 'startup'} 
                    onValueChange={(value: any) => setClientForm(prev => ({ ...prev, tier: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {clientTiers.map(tier => (
                        <SelectItem key={tier.value} value={tier.value}>
                          {tier.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select 
                    value={clientForm.priority || 'medium'} 
                    onValueChange={(value: any) => setClientForm(prev => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="low">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium">Primary Contact *</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Contact Name *</Label>
                    <Input
                      placeholder="e.g. Sarah Johnson"
                      value={clientForm.primaryContact?.name || ''}
                      onChange={(e) => setClientForm(prev => ({ 
                        ...prev, 
                        primaryContact: { ...prev.primaryContact!, name: e.target.value }
                      }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      placeholder="e.g. VP of Engineering"
                      value={clientForm.primaryContact?.title || ''}
                      onChange={(e) => setClientForm(prev => ({ 
                        ...prev, 
                        primaryContact: { ...prev.primaryContact!, title: e.target.value }
                      }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="contact@company.com"
                      value={clientForm.primaryContact?.email || ''}
                      onChange={(e) => setClientForm(prev => ({ 
                        ...prev, 
                        primaryContact: { ...prev.primaryContact!, email: e.target.value }
                      }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      placeholder="+1 (555) 123-4567"
                      value={clientForm.primaryContact?.phone || ''}
                      onChange={(e) => setClientForm(prev => ({ 
                        ...prev, 
                        primaryContact: { ...prev.primaryContact!, phone: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Monthly Subscription ($)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={clientForm.monthlySubscription || ''}
                    onChange={(e) => setClientForm(prev => ({ 
                      ...prev, 
                      monthlySubscription: parseInt(e.target.value) || 0 
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Response Time (hours)</Label>
                  <Input
                    type="number"
                    min="1"
                    max="168"
                    placeholder="4"
                    value={clientForm.responseTime || ''}
                    onChange={(e) => setClientForm(prev => ({ 
                      ...prev, 
                      responseTime: parseInt(e.target.value) || 4 
                    }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Success Rate (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="75"
                    value={clientForm.successRate || ''}
                    onChange={(e) => setClientForm(prev => ({ 
                      ...prev, 
                      successRate: parseInt(e.target.value) || 0 
                    }))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  placeholder="Add any additional notes about this client..."
                  value={clientForm.notes || ''}
                  onChange={(e) => setClientForm(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setShowClientModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveClient} className="bg-[#2E5E47] hover:bg-[#2E5E47]/90">
                {editingClient ? 'Update Client' : 'Add Client'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Client Detail Modal */}
        {selectedClient && (
          <Dialog open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedClient.logo} alt={selectedClient.name} />
                    <AvatarFallback className="bg-[#2E5E47] text-white text-lg">
                      {selectedClient.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-2xl flex items-center gap-2">
                      {selectedClient.name}
                      {selectedClient.isStarred && (
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      )}
                    </DialogTitle>
                    <DialogDescription className="text-base">
                      {selectedClient.industry} • {selectedClient.location}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <Tabs defaultValue="overview" className="mt-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="billing">Billing</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <DollarSign className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                          <p className="text-2xl font-bold">{formatCurrency(selectedClient.monthlySubscription)}</p>
                          <p className="text-sm text-gray-600">Monthly Subscription</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <UserCheck className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                          <p className="text-2xl font-bold">{selectedClient.placementsFilled}/{selectedClient.placementsTotal}</p>
                          <p className="text-sm text-gray-600">Placements Filled</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <Activity className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                          <p className="text-2xl font-bold">{selectedClient.activeRequirements}</p>
                          <p className="text-sm text-gray-600">Active Requirements</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Rest of overview content remains the same */}
                </TabsContent>
                
                <TabsContent value="performance" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Performance Metrics</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Success Rate</span>
                          <span className="font-bold text-green-600">{selectedClient.successRate}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Response Time</span>
                          <span className="font-bold">{selectedClient.responseTime}h</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Active Requirements</span>
                          <span className="font-bold">{selectedClient.activeRequirements}</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Placement Progress</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Filled</span>
                            <span>{selectedClient.placementsFilled}/{selectedClient.placementsTotal}</span>
                          </div>
                          <Progress 
                            value={(selectedClient.placementsFilled / selectedClient.placementsTotal) * 100} 
                            className="h-3"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="billing">
                  <Card>
                    <CardHeader>
                      <CardTitle>Billing Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm text-gray-600">Monthly Subscription</Label>
                          <p className="text-lg font-medium">{formatCurrency(selectedClient.monthlySubscription)}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Payment Method</Label>
                          <p className="text-lg font-medium">{selectedClient.paymentMethod || 'Not set'}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Next Renewal</Label>
                          <p className="text-lg font-medium">
                            {selectedClient.nextRenewal ? formatDate(selectedClient.nextRenewal) : 'TBD'}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Annual Value</Label>
                          <p className="text-lg font-medium">{formatCurrency(selectedClient.monthlySubscription * 12)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              
              <div className="flex items-center justify-between pt-6 border-t">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedClient(null);
                      handleEditClient(selectedClient);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Client
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                </div>
                <Button variant="outline" onClick={() => setSelectedClient(null)}>
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </TooltipProvider>
  );
}