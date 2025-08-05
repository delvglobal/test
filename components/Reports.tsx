import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Download, 
  Filter, 
  Users, 
  Clock, 
  Target, 
  Award,
  PieChart,
  LineChart,
  BarChart,
  Activity,
  Globe,
  UserCheck,
  ChevronDown,
  RefreshCw,
  Info,
  MapPin,
  Star,
  DollarSign,
  Shield,
  Wifi,
  Building
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
  AreaChart,
  Area,
  ComposedChart,
  Legend
} from 'recharts';
import { cn } from './ui/utils';

interface ReportsProps {
  onNavigateToScreen?: (screen: any) => void;
  onOpenModal?: (modal: any) => void;
}

// Mock data for marketplace analytics
const globalDistributionData = [
  { region: 'North America', candidates: 1356, activeJobs: 234, avgRate: 75 },
  { region: 'Europe', candidates: 1486, activeJobs: 198, avgRate: 65 },
  { region: 'Asia Pacific', candidates: 1312, activeJobs: 156, avgRate: 45 },
  { region: 'Latin America', candidates: 525, activeJobs: 89, avgRate: 35 },
  { region: 'Middle East', candidates: 439, activeJobs: 67, avgRate: 55 },
  { region: 'Africa', candidates: 382, activeJobs: 45, avgRate: 30 }
];

const platformActivityData = [
  { month: 'Jan', newCandidates: 423, activeMatches: 156, completedProjects: 42 },
  { month: 'Feb', newCandidates: 389, activeMatches: 178, completedProjects: 38 },
  { month: 'Mar', newCandidates: 567, activeMatches: 234, completedProjects: 51 },
  { month: 'Apr', newCandidates: 498, activeMatches: 189, completedProjects: 47 },
  { month: 'May', newCandidates: 634, activeMatches: 267, completedProjects: 59 },
  { month: 'Jun', newCandidates: 712, activeMatches: 298, completedProjects: 65 },
  { month: 'Jul', newCandidates: 789, activeMatches: 334, completedProjects: 72 }
];

const skillDemandData = [
  { skill: 'React/Frontend', demand: 89, supply: 67, avgRate: 85 },
  { skill: 'Node.js/Backend', demand: 76, supply: 54, avgRate: 78 },
  { skill: 'Python/Data', demand: 82, supply: 43, avgRate: 92 },
  { skill: 'DevOps/Cloud', demand: 94, supply: 31, avgRate: 105 },
  { skill: 'Mobile Dev', demand: 67, supply: 45, avgRate: 73 },
  { skill: 'UI/UX Design', demand: 58, supply: 62, avgRate: 65 }
];

const timezoneDistributionData = [
  { timezone: 'UTC-8 (PST)', count: 892, percentage: 31.3 },
  { timezone: 'UTC-5 (EST)', count: 743, percentage: 26.1 },
  { timezone: 'UTC+0 (GMT)', count: 456, percentage: 16.0 },
  { timezone: 'UTC+1 (CET)', count: 334, percentage: 11.7 },
  { timezone: 'UTC+8 (CST)', count: 287, percentage: 10.1 },
  { timezone: 'Other', count: 135, percentage: 4.8 }
];

const clientActivityData = [
  { month: 'Jan', activeClients: 87, newClients: 12, upgrades: 5, engagementScore: 72 },
  { month: 'Feb', activeClients: 92, newClients: 8, upgrades: 3, engagementScore: 74 },
  { month: 'Mar', activeClients: 98, newClients: 14, upgrades: 7, engagementScore: 78 },
  { month: 'Apr', activeClients: 105, newClients: 11, upgrades: 4, engagementScore: 76 },
  { month: 'May', activeClients: 112, newClients: 15, upgrades: 8, engagementScore: 81 },
  { month: 'Jun', activeClients: 118, newClients: 9, upgrades: 6, engagementScore: 83 },
  { month: 'Jul', activeClients: 124, newClients: 13, upgrades: 9, engagementScore: 85 }
];

const platformHealthData = [
  { metric: 'Search Performance', value: 94, status: 'excellent' },
  { metric: 'Database Response', value: 91, status: 'excellent' },
  { metric: 'API Response Times', value: 87, status: 'good' },
  { metric: 'User Satisfaction', value: 89, status: 'excellent' },
  { metric: 'Platform Uptime', value: 99.8, status: 'excellent' },
  { metric: 'Data Quality', value: 92, status: 'excellent' }
];

const COLORS = ['#2E5E47', '#E4B063', '#F2A65A', '#22c55e', '#3b82f6', '#8b5cf6'];

export function Reports({ onNavigateToScreen, onOpenModal }: ReportsProps) {
  const [dateRange, setDateRange] = useState('last-30-days');
  const [activeTab, setActiveTab] = useState('marketplace');

  const keyMetrics = [
    {
      title: 'Active Candidates',
      value: '5,247',
      change: '+12.4%',
      changeType: 'positive' as const,
      icon: Users,
      description: 'Verified & available'
    },
    {
      title: 'Active Clients',
      value: '124',
      change: '+8.7%',
      changeType: 'positive' as const,
      icon: Building,
      description: 'Paying subscribers'
    },
    {
      title: 'Global Coverage',
      value: '67',
      change: '+3',
      changeType: 'positive' as const,
      icon: Globe,
      description: 'Countries active'
    },
    {
      title: 'Avg Response Time',
      value: '2.3h',
      change: '-0.4h',
      changeType: 'positive' as const,
      icon: Clock,
      description: 'Admin response time'
    },
    {
      title: 'Platform Health',
      value: '92%',
      change: '+1.1%',
      changeType: 'positive' as const,
      icon: Activity,
      description: 'Overall system score'
    },
    {
      title: 'Client Satisfaction',
      value: '4.6/5',
      change: '+0.2',
      changeType: 'positive' as const,
      icon: Star,
      description: 'Client feedback score'
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'critical': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#2E5E47]">Platform Analytics</h1>
          <p className="text-gray-600">Global marketplace insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 days</SelectItem>
              <SelectItem value="last-30-days">Last 30 days</SelectItem>
              <SelectItem value="last-3-months">Last 3 months</SelectItem>
              <SelectItem value="last-6-months">Last 6 months</SelectItem>
              <SelectItem value="last-year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-[#2E5E47] hover:bg-[#2E5E47]/90">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {keyMetrics.map((metric, index) => (
          <Card key={index} className="relative overflow-hidden group hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <div className="flex items-center gap-1">
                    <span className={cn(
                      "text-xs font-medium",
                      metric.changeType === 'positive' ? "text-green-600" : "text-red-600"
                    )}>
                      {metric.changeType === 'positive' ? (
                        <TrendingUp className="h-3 w-3 inline mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 inline mr-1" />
                      )}
                      {metric.change}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{metric.description}</p>
                </div>
                <div className="flex items-center justify-center w-10 h-10 bg-[#2E5E47]/10 rounded-lg group-hover:bg-[#2E5E47]/20 transition-colors">
                  <metric.icon className="h-5 w-5 text-[#2E5E47]" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-fit">
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="global">Global Insights</TabsTrigger>
          <TabsTrigger value="skills">Skills Market</TabsTrigger>
          <TabsTrigger value="platform">Platform Health</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-1">
            {/* Platform Activity Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Platform Activity Trends
                </CardTitle>
                <CardDescription>
                  Track new candidates, active matches, and completed projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={320}>
                  <ComposedChart data={platformActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="newCandidates" fill="#2E5E47" name="New Candidates" />
                    <Bar yAxisId="left" dataKey="activeMatches" fill="#E4B063" name="Active Matches" />
                    <Line yAxisId="right" type="monotone" dataKey="completedProjects" stroke="#F2A65A" strokeWidth={3} name="Completed Projects" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Client Activity Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Client Activity Metrics
                </CardTitle>
                <CardDescription>
                  Client engagement, growth, and subscription activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={320}>
                  <ComposedChart data={clientActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="activeClients" fill="#2E5E47" name="Active Clients" />
                    <Bar yAxisId="left" dataKey="newClients" fill="#E4B063" name="New Clients" />
                    <Bar yAxisId="left" dataKey="upgrades" fill="#F2A65A" name="Upgrades" />
                    <Line yAxisId="right" type="monotone" dataKey="engagementScore" stroke="#22c55e" strokeWidth={3} name="Engagement Score" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="global" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Global Distribution */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Global Talent Distribution
                </CardTitle>
                <CardDescription>
                  Candidate and job distribution across regions with average rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={320}>
                  <ComposedChart data={globalDistributionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="region" angle={-45} textAnchor="end" height={80} />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="candidates" fill="#2E5E47" name="Candidates" />
                    <Bar yAxisId="left" dataKey="activeJobs" fill="#E4B063" name="Active Jobs" />
                    <Line yAxisId="right" type="monotone" dataKey="avgRate" stroke="#F2A65A" strokeWidth={3} name="Avg Rate ($/hr)" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Timezone Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Timezone Coverage
                </CardTitle>
                <CardDescription>
                  Candidate availability across timezones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timezoneDistributionData.map((tz, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">{tz.timezone}</span>
                        <div className="text-right">
                          <span className="text-sm font-medium">{tz.count.toLocaleString()}</span>
                          <span className="text-xs text-gray-500 ml-1">({tz.percentage}%)</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-[#2E5E47]"
                          style={{ width: `${tz.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Regional Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Regional Performance
                </CardTitle>
                <CardDescription>
                  Success metrics by region
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {globalDistributionData.map((region, index) => {
                    const successRate = ((region.activeJobs / region.candidates) * 100).toFixed(1);
                    const demandLevel = region.activeJobs > 150 ? 'high' : region.activeJobs > 100 ? 'medium' : 'low';
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{region.region}</p>
                          <p className="text-sm text-gray-600">${region.avgRate}/hr average</p>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant="outline" 
                            className={cn(
                              demandLevel === 'high' ? 'bg-green-50 text-green-700 border-green-200' :
                              demandLevel === 'medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                              'bg-gray-50 text-gray-700 border-gray-200'
                            )}
                          >
                            {demandLevel} demand
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">{successRate}% active rate</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Skills Supply vs Demand */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  Skills Market Analysis
                </CardTitle>
                <CardDescription>
                  Supply vs demand with average market rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={320}>
                  <ComposedChart data={skillDemandData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="skill" angle={-45} textAnchor="end" height={80} />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="demand" fill="#E4B063" name="Demand Score" />
                    <Bar yAxisId="left" dataKey="supply" fill="#2E5E47" name="Supply Score" />
                    <Line yAxisId="right" type="monotone" dataKey="avgRate" stroke="#F2A65A" strokeWidth={3} name="Avg Rate ($/hr)" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* High-Demand Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Market Opportunities</CardTitle>
                <CardDescription>Skills with highest demand vs supply gap</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillDemandData
                    .map(skill => ({ ...skill, gap: skill.demand - skill.supply }))
                    .sort((a, b) => b.gap - a.gap)
                    .map((skill, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{skill.skill}</p>
                          <p className="text-sm text-gray-600">Gap: {skill.gap} points</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600">${skill.avgRate}/hr</p>
                          <p className="text-xs text-gray-500">market rate</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Market Insights</CardTitle>
                <CardDescription>Key observations and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-900">DevOps Skills Premium</p>
                        <p className="text-sm text-blue-700">DevOps/Cloud skills command 25% higher rates due to high demand</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-start gap-2">
                      <Award className="h-4 w-4 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-900">UI/UX Balance</p>
                        <p className="text-sm text-green-700">Good supply-demand balance in design skills market</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-yellow-900">Python Data Growth</p>
                        <p className="text-sm text-yellow-700">Increasing demand for Python/Data skills, limited supply</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="platform" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Platform Health Score */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Platform Health Metrics
                </CardTitle>
                <CardDescription>
                  Key system performance and reliability indicators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {platformHealthData.map((metric, index) => (
                    <div key={index} className={cn(
                      "p-4 rounded-lg border-2",
                      getStatusColor(metric.status)
                    )}>
                      <div className="text-center space-y-2">
                        <p className="font-medium">{metric.metric}</p>
                        <p className="text-2xl font-bold">{metric.value}{metric.metric === 'Platform Uptime' ? '%' : metric.metric.includes('Satisfaction') ? '/5' : '%'}</p>
                        <Badge variant="outline" className="bg-white/50">
                          {metric.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="h-5 w-5" />
                  System Performance
                </CardTitle>
                <CardDescription>Real-time platform metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">API Response Time</p>
                      <p className="text-sm text-gray-600">Average: 127ms</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">Search Performance</p>
                      <p className="text-sm text-gray-600">Average: 89ms</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">Database Load</p>
                      <p className="text-sm text-gray-600">Current: 67%</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Good</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">CDN Performance</p>
                      <p className="text-sm text-gray-600">Global avg: 45ms</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Engagement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  Admin Activity
                </CardTitle>
                <CardDescription>Platform usage and admin engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Daily Active Admins</span>
                      <span className="text-sm text-gray-600">47</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full bg-[#2E5E47]" style={{ width: '78%' }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Avg Session Duration</span>
                      <span className="text-sm text-gray-600">45.2 min</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full bg-[#E4B063]" style={{ width: '85%' }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Tasks Completed</span>
                      <span className="text-sm text-gray-600">156/189</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full bg-[#F2A65A]" style={{ width: '83%' }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Client Interactions</span>
                      <span className="text-sm text-gray-600">342 this week</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full bg-[#22c55e]" style={{ width: '92%' }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}