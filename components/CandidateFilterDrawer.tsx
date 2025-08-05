import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Checkbox } from './ui/checkbox';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { 
  Filter, 
  Search, 
  MapPin, 
  DollarSign, 
  Clock, 
  Briefcase,
  Globe,
  GraduationCap,
  CheckCircle,
  Settings,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  X,
  Code,
  Wrench,
  Award,
  Github,
  Linkedin,
  Calendar,
  Zap,
  Target,
  Home,
  Building,
  Users,
  Star,
  UserCheck,
  UserX
} from 'lucide-react';
import { cn } from './ui/utils';

interface CandidateFilterDrawerProps {
  isOpen: boolean;
  onToggle: () => void;
  onApplyFilters: (filters: FilterState) => void;
  currentFilters: FilterState;
  isMobile: boolean;
  totalResults?: number;
  isFixedSidebar?: boolean;
  alwaysVisible?: boolean;
}

interface FilterState {
  search: string;
  regions: string[];
  countries: string[];
  timezones: string[];
  roles: string[];
  rateRange: [number, number];
  experienceRange: [number, number];
  availability: string[];
  languages: string[];
  education: string[];
  verified: boolean | null;
  skills: string[];
  tools: string[];
  certifications: string[];
  contractType: string[];
  portfolioRequired: boolean | null;
  githubRequired: boolean | null;
  linkedinRequired: boolean | null;
  videoRequired: boolean | null;
  matchScoreRange: [number, number];
  lastActiveRange: string;
  salaryExpectationRange: [number, number];
  noticePeriod: string[];
}

const regionOptions = [
  { id: 'north-america', label: 'North America', count: 1356 },
  { id: 'europe', label: 'Europe', count: 1486 },
  { id: 'asia-pacific', label: 'Asia Pacific', count: 1312 },
  { id: 'latin-america', label: 'Latin America', count: 525 },
  { id: 'middle-east', label: 'Middle East', count: 439 },
  { id: 'africa', label: 'Africa', count: 382 },
];

const countryOptions = [
  // North America
  { id: 'us', label: 'United States', region: 'north-america', count: 892 },
  { id: 'ca', label: 'Canada', region: 'north-america', count: 245 },
  { id: 'mx', label: 'Mexico', region: 'north-america', count: 108 },
  { id: 'cr', label: 'Costa Rica', region: 'north-america', count: 45 },
  { id: 'gt', label: 'Guatemala', region: 'north-america', count: 28 },
  { id: 'pa', label: 'Panama', region: 'north-america', count: 22 },
  
  // Europe
  { id: 'gb', label: 'United Kingdom', region: 'europe', count: 234 },
  { id: 'de', label: 'Germany', region: 'europe', count: 198 },
  { id: 'fr', label: 'France', region: 'europe', count: 156 },
  { id: 'es', label: 'Spain', region: 'europe', count: 134 },
  { id: 'it', label: 'Italy', region: 'europe', count: 98 },
  { id: 'nl', label: 'Netherlands', region: 'europe', count: 72 },
  { id: 'ch', label: 'Switzerland', region: 'europe', count: 68 },
  { id: 'se', label: 'Sweden', region: 'europe', count: 65 },
  { id: 'no', label: 'Norway', region: 'europe', count: 58 },
  { id: 'dk', label: 'Denmark', region: 'europe', count: 52 },
  
  // Asia Pacific
  { id: 'au', label: 'Australia', region: 'asia-pacific', count: 178 },
  { id: 'jp', label: 'Japan', region: 'asia-pacific', count: 145 },
  { id: 'sg', label: 'Singapore', region: 'asia-pacific', count: 123 },
  { id: 'in', label: 'India', region: 'asia-pacific', count: 98 },
  { id: 'nz', label: 'New Zealand', region: 'asia-pacific', count: 90 },
  { id: 'kr', label: 'South Korea', region: 'asia-pacific', count: 87 },
  { id: 'cn', label: 'China', region: 'asia-pacific', count: 156 },
  { id: 'hk', label: 'Hong Kong', region: 'asia-pacific', count: 78 },
  
  // Latin America
  { id: 'br', label: 'Brazil', region: 'latin-america', count: 134 },
  { id: 'ar', label: 'Argentina', region: 'latin-america', count: 89 },
  { id: 'co', label: 'Colombia', region: 'latin-america', count: 45 },
  { id: 'cl', label: 'Chile', region: 'latin-america', count: 30 },
  { id: 'pe', label: 'Peru', region: 'latin-america', count: 38 },
  { id: 'uy', label: 'Uruguay', region: 'latin-america', count: 24 },
  
  // Middle East
  { id: 'ae', label: 'UAE', region: 'middle-east', count: 67 },
  { id: 'il', label: 'Israel', region: 'middle-east', count: 45 },
  { id: 'sa', label: 'Saudi Arabia', region: 'middle-east', count: 44 },
  { id: 'qa', label: 'Qatar', region: 'middle-east', count: 32 },
  { id: 'tr', label: 'Turkey', region: 'middle-east', count: 56 },
  { id: 'eg', label: 'Egypt', region: 'middle-east', count: 48 },
  
  // Africa
  { id: 'za', label: 'South Africa', region: 'africa', count: 56 },
  { id: 'ng', label: 'Nigeria', region: 'africa', count: 33 },
  { id: 'ke', label: 'Kenya', region: 'africa', count: 42 },
  { id: 'gh', label: 'Ghana', region: 'africa', count: 28 },
  { id: 'ma', label: 'Morocco', region: 'africa', count: 35 },
  { id: 'tn', label: 'Tunisia', region: 'africa', count: 26 },
];

const timezoneOptions = [
  { id: 'utc-12', label: 'UTC-12', offset: '-12' },
  { id: 'utc-11', label: 'UTC-11', offset: '-11' },
  { id: 'utc-10', label: 'UTC-10 (HST)', offset: '-10' },
  { id: 'utc-9', label: 'UTC-9 (AKST)', offset: '-9' },
  { id: 'utc-8', label: 'UTC-8 (PST)', offset: '-8' },
  { id: 'utc-7', label: 'UTC-7 (MST)', offset: '-7' },
  { id: 'utc-6', label: 'UTC-6 (CST)', offset: '-6' },
  { id: 'utc-5', label: 'UTC-5 (EST)', offset: '-5' },
  { id: 'utc-4', label: 'UTC-4 (AST)', offset: '-4' },
  { id: 'utc-3', label: 'UTC-3 (BRT)', offset: '-3' },
  { id: 'utc-2', label: 'UTC-2', offset: '-2' },
  { id: 'utc-1', label: 'UTC-1', offset: '-1' },
  { id: 'utc+0', label: 'UTC+0 (GMT)', offset: '+0' },
  { id: 'utc+1', label: 'UTC+1 (CET)', offset: '+1' },
  { id: 'utc+2', label: 'UTC+2 (EET)', offset: '+2' },
  { id: 'utc+3', label: 'UTC+3 (MSK)', offset: '+3' },
  { id: 'utc+4', label: 'UTC+4 (GST)', offset: '+4' },
  { id: 'utc+5', label: 'UTC+5 (PKT)', offset: '+5' },
  { id: 'utc+6', label: 'UTC+6 (BST)', offset: '+6' },
  { id: 'utc+7', label: 'UTC+7 (ICT)', offset: '+7' },
  { id: 'utc+8', label: 'UTC+8 (CST)', offset: '+8' },
  { id: 'utc+9', label: 'UTC+9 (JST)', offset: '+9' },
  { id: 'utc+10', label: 'UTC+10 (AEST)', offset: '+10' },
  { id: 'utc+11', label: 'UTC+11', offset: '+11' },
  { id: 'utc+12', label: 'UTC+12 (NZST)', offset: '+12' },
];

const roleOptions = [
  'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
  'Mobile Developer', 'DevOps Engineer', 'Data Scientist',
  'Product Manager', 'UX Designer', 'UI Designer',
  'Software Architect', 'Technical Lead', 'Engineering Manager',
  'Marketing Manager', 'Content Writer', 'SEO Specialist',
  'Virtual Assistant', 'Customer Support', 'Sales Representative',
  'Project Manager', 'Business Analyst', 'Quality Assurance',
  'Graphic Designer', 'Video Editor', 'Social Media Manager'
];

// Simplified availability options
const availabilityOptions = [
  { id: 'available', label: 'Available for work', icon: UserCheck },
  { id: 'not-available', label: 'Not available', icon: UserX },
];

const languageOptions = [
  'English', 'Spanish', 'French', 'German', 'Portuguese',
  'Italian', 'Dutch', 'Russian', 'Chinese', 'Japanese',
  'Korean', 'Arabic', 'Hindi', 'Polish', 'Turkish',
  'Vietnamese', 'Thai', 'Indonesian', 'Tagalog', 'Hebrew'
];

const educationOptions = [
  { id: 'high-school', label: 'High School', icon: GraduationCap },
  { id: 'associates', label: 'Associate Degree', icon: GraduationCap },
  { id: 'bachelors', label: "Bachelor's Degree", icon: GraduationCap },
  { id: 'masters', label: "Master's Degree", icon: GraduationCap },
  { id: 'phd', label: 'PhD/Doctorate', icon: GraduationCap },
  { id: 'bootcamp', label: 'Bootcamp/Certificate', icon: Award },
];

const skillsOptions = [
  // Frontend
  'React', 'Vue.js', 'Angular', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Next.js', 'Nuxt.js',
  'Svelte', 'Tailwind CSS', 'Bootstrap', 'SASS/SCSS', 'Webpack', 'Vite',
  // Backend
  'Node.js', 'Python', 'Java', 'C#', 'Go', 'Rust', 'PHP', 'Ruby', 'Kotlin', 'Swift',
  'Express.js', 'Django', 'Flask', 'Spring Boot', '.NET', 'Laravel', 'Rails',
  // Databases
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'DynamoDB', 'Firebase',
  // Cloud & DevOps
  'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Jenkins', 'GitLab CI', 'GitHub Actions',
  'Terraform', 'Ansible', 'Nginx', 'Apache',
  // Mobile
  'React Native', 'Flutter', 'iOS Development', 'Android Development', 'Ionic', 'Xamarin',
  // Design
  'UI/UX Design', 'Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator', 'Prototyping',
  'User Research', 'Design Systems', 'Accessibility',
  // Marketing & Content
  'SEO', 'SEM', 'Social Media Marketing', 'Content Writing', 'Copywriting', 'Email Marketing',
  'Google Analytics', 'Facebook Ads', 'Google Ads', 'Content Strategy',
  // Healthcare
  'EMR', 'HIPAA', 'Patient Care', 'Medical Terminology', 'Telemedicine', 'Healthcare Administration',
  // Other
  'Project Management', 'Team Leadership', 'Customer Service', 'Sales', 'Data Analysis'
];

const toolsOptions = [
  // Development Tools
  'VS Code', 'IntelliJ IDEA', 'WebStorm', 'Sublime Text', 'Atom', 'Vim', 'Emacs',
  // Version Control
  'Git', 'GitHub', 'GitLab', 'Bitbucket', 'SVN',
  // Design Tools
  'Figma', 'Sketch', 'Adobe XD', 'InVision', 'Framer', 'Principle', 'Zeplin',
  // Project Management
  'Jira', 'Trello', 'Asana', 'Monday.com', 'Notion', 'Linear', 'ClickUp',
  // Communication
  'Slack', 'Discord', 'Microsoft Teams', 'Zoom', 'Google Meet',
  // Marketing Tools
  'HubSpot', 'Mailchimp', 'Hootsuite', 'Buffer', 'Canva', 'Adobe Creative Suite',
  // Healthcare Tools
  'Epic', 'Cerner', 'Allscripts', 'IntakeQ', '8x8 Phone', 'Calendly',
  // Other
  'Postman', 'Docker Desktop', 'Sentry', 'Google Analytics', 'Mixpanel'
];

const certificationOptions = [
  // Cloud
  'AWS Solutions Architect', 'AWS Developer', 'Azure Fundamentals', 'Google Cloud Professional',
  'AWS DevOps Engineer', 'Azure Developer', 'Google Cloud Developer',
  // Project Management
  'PMP', 'Scrum Master', 'Product Owner', 'Agile Certified',
  // Technology
  'Microsoft Certified', 'Oracle Certified', 'Cisco Certified', 'CompTIA',
  // Design
  'Adobe Certified', 'Google UX Design', 'HFI Certified',
  // Healthcare
  'HIPAA Certified', 'Medical Assistant', 'Healthcare Administration',
  // Other
  'ITIL', 'Six Sigma', 'CISSP', 'CEH', 'Security+'
];

const contractTypeOptions = [
  { id: 'fulltime', label: 'Full-time', icon: Briefcase },
  { id: 'contract', label: 'Contract', icon: Clock },
  { id: 'parttime', label: 'Part-time', icon: Users },
  { id: 'freelance', label: 'Freelance', icon: Star },
];

const noticePeriodOptions = [
  { id: 'immediate', label: 'Available Immediately' },
  { id: '2weeks', label: '2 Weeks' },
  { id: '1month', label: '1 Month' },
  { id: '2months', label: '2 Months' },
  { id: '3months', label: '3+ Months' },
];

const lastActiveOptions = [
  { id: '1d', label: 'Last 24 hours' },
  { id: '7d', label: 'Last 7 days' },
  { id: '30d', label: 'Last 30 days' },
  { id: '90d', label: 'Last 90 days' },
  { id: 'all', label: 'All time' },
];

export function CandidateFilterDrawer({ 
  isOpen, 
  onToggle, 
  onApplyFilters, 
  currentFilters, 
  isMobile,
  totalResults,
  isFixedSidebar = false,
  alwaysVisible = false
}: CandidateFilterDrawerProps) {
  const [filters, setFilters] = useState<FilterState>(currentFilters);
  const [searchQueries, setSearchQueries] = useState({
    skills: '',
    tools: '',
    certifications: '',
    countries: '',
    languages: ''
  });

  // Sync filters with currentFilters when they change
  useEffect(() => {
    setFilters(currentFilters);
  }, [currentFilters]);

  // Auto-apply filters in fixed sidebar mode or always visible mode
  useEffect(() => {
    if (isFixedSidebar || alwaysVisible) {
      onApplyFilters(filters);
    }
  }, [filters, isFixedSidebar, alwaysVisible, onApplyFilters]);

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

  const resetFilters = () => {
    const clearedFilters: FilterState = {
      search: '',
      regions: [],
      countries: [],
      timezones: [],
      roles: [],
      rateRange: [0, 200],
      experienceRange: [0, 20],
      availability: [],
      languages: [],
      education: [],
      verified: null,
      skills: [],
      tools: [],
      certifications: [],
      contractType: [],
      portfolioRequired: null,
      githubRequired: null,
      linkedinRequired: null,
      videoRequired: null,
      matchScoreRange: [0, 100],
      lastActiveRange: 'all',
      salaryExpectationRange: [0, 300],
      noticePeriod: [],
    };
    setFilters(clearedFilters);
    setSearchQueries({
      skills: '',
      tools: '',
      certifications: '',
      countries: '',
      languages: ''
    });
    onApplyFilters(clearedFilters);
  };

  const applyFilters = () => {
    onApplyFilters(filters);
    if (isMobile && !alwaysVisible) {
      onToggle();
    }
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    count += filters.regions.length;
    count += filters.countries.length;
    count += filters.timezones.length;
    count += filters.roles.length;
    count += filters.availability.length;
    count += filters.languages.length;
    count += filters.education.length;
    count += filters.skills.length;
    count += filters.tools.length;
    count += filters.certifications.length;
    count += filters.contractType.length;
    count += filters.noticePeriod.length;
    if (filters.verified !== null) count++;
    if (filters.portfolioRequired !== null) count++;
    if (filters.githubRequired !== null) count++;
    if (filters.linkedinRequired !== null) count++;
    if (filters.videoRequired !== null) count++;
    if (filters.rateRange[0] > 0 || filters.rateRange[1] < 200) count++;
    if (filters.experienceRange[0] > 0 || filters.experienceRange[1] < 20) count++;
    if (filters.matchScoreRange[0] > 0 || filters.matchScoreRange[1] < 100) count++;
    if (filters.salaryExpectationRange[0] > 0 || filters.salaryExpectationRange[1] < 300) count++;
    if (filters.lastActiveRange !== 'all') count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  // Filter options based on search queries
  const filteredSkills = skillsOptions.filter(skill => 
    skill.toLowerCase().includes(searchQueries.skills.toLowerCase())
  );

  const filteredTools = toolsOptions.filter(tool => 
    tool.toLowerCase().includes(searchQueries.tools.toLowerCase())
  );

  const filteredCertifications = certificationOptions.filter(cert => 
    cert.toLowerCase().includes(searchQueries.certifications.toLowerCase())
  );

  const filteredCountries = countryOptions.filter(country => 
    country.label.toLowerCase().includes(searchQueries.countries.toLowerCase())
  );

  const filteredLanguages = languageOptions.filter(lang => 
    lang.toLowerCase().includes(searchQueries.languages.toLowerCase())
  );

  // Always Visible Sidebar Content
  const AlwaysVisibleContent = () => (
    <div className="h-full flex flex-col">
      {/* Filter Actions */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-center">
          <Button
            onClick={resetFilters}
            variant="outline"
            size="sm"
            className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Clear All Filters
          </Button>
        </div>
      </div>

      {/* Scrollable Filter Content */}
      <div className="flex-1 overflow-y-auto">
        <Accordion type="multiple" defaultValue={["search", "availability", "location"]} className="w-full">
          {/* Search */}
          <AccordionItem value="search" className="border-b px-4">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-[#2E5E47]" />
                <span>Search</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search candidates..."
                  value={filters.search}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  className="pl-10"
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Availability */}
          <AccordionItem value="availability" className="border-b px-4">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-[#2E5E47]" />
                <span>Availability</span>
                {filters.availability.length > 0 && (
                  <Badge className="ml-auto bg-[#2E5E47] text-white text-xs">
                    {filters.availability.length}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-3">
                {availabilityOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={`availability-${option.id}`}
                      checked={filters.availability.includes(option.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          addToArrayFilter('availability', option.id);
                        } else {
                          removeFromArrayFilter('availability', option.id);
                        }
                      }}
                    />
                    <label htmlFor={`availability-${option.id}`} className="text-sm cursor-pointer flex items-center gap-2 flex-1">
                      <option.icon className="h-4 w-4 text-gray-500" />
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Location & Region */}
          <AccordionItem value="location" className="border-b px-4">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#2E5E47]" />
                <span>Location & Region</span>
                {(filters.regions.length > 0 || filters.countries.length > 0) && (
                  <Badge className="ml-auto bg-[#2E5E47] text-white text-xs">
                    {filters.regions.length + filters.countries.length}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4 space-y-4">
              <div className="space-y-3">
                <Label className="text-sm font-medium">Regions</Label>
                <div className="space-y-2">
                  {regionOptions.map((region) => (
                    <div key={region.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`region-${region.id}`}
                        checked={filters.regions.includes(region.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            addToArrayFilter('regions', region.id);
                          } else {
                            removeFromArrayFilter('regions', region.id);
                          }
                        }}
                      />
                      <label htmlFor={`region-${region.id}`} className="text-sm flex-1 cursor-pointer">
                        {region.label}
                      </label>
                      <span className="text-xs text-gray-500">({region.count})</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Countries</Label>
                <Input
                  placeholder="Search countries..."
                  value={searchQueries.countries}
                  onChange={(e) => setSearchQueries(prev => ({ ...prev, countries: e.target.value }))}
                  className="text-sm"
                />
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {filteredCountries.map((country) => (
                    <div key={country.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`country-${country.id}`}
                        checked={filters.countries.includes(country.label)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            addToArrayFilter('countries', country.label);
                          } else {
                            removeFromArrayFilter('countries', country.label);
                          }
                        }}
                      />
                      <label htmlFor={`country-${country.id}`} className="text-sm flex-1 cursor-pointer">
                        {country.label}
                      </label>
                      <span className="text-xs text-gray-500">({country.count})</span>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Skills */}
          <AccordionItem value="skills" className="border-b px-4">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-[#2E5E47]" />
                <span>Skills</span>
                {filters.skills.length > 0 && (
                  <Badge className="ml-auto bg-[#2E5E47] text-white text-xs">
                    {filters.skills.length}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-3">
                <Input
                  placeholder="Search skills..."
                  value={searchQueries.skills}
                  onChange={(e) => setSearchQueries(prev => ({ ...prev, skills: e.target.value }))}
                  className="text-sm"
                />
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {filteredSkills.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={`skill-${skill}`}
                        checked={filters.skills.includes(skill)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            addToArrayFilter('skills', skill);
                          } else {
                            removeFromArrayFilter('skills', skill);
                          }
                        }}
                      />
                      <label htmlFor={`skill-${skill}`} className="text-sm cursor-pointer">
                        {skill}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Tools */}
          <AccordionItem value="tools" className="border-b px-4">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-[#2E5E47]" />
                <span>Tools & Technologies</span>
                {filters.tools.length > 0 && (
                  <Badge className="ml-auto bg-[#2E5E47] text-white text-xs">
                    {filters.tools.length}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-3">
                <Input
                  placeholder="Search tools..."
                  value={searchQueries.tools}
                  onChange={(e) => setSearchQueries(prev => ({ ...prev, tools: e.target.value }))}
                  className="text-sm"
                />
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {filteredTools.map((tool) => (
                    <div key={tool} className="flex items-center space-x-2">
                      <Checkbox
                        id={`tool-${tool}`}
                        checked={filters.tools.includes(tool)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            addToArrayFilter('tools', tool);
                          } else {
                            removeFromArrayFilter('tools', tool);
                          }
                        }}
                      />
                      <label htmlFor={`tool-${tool}`} className="text-sm cursor-pointer">
                        {tool}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Experience & Compensation */}
          <AccordionItem value="experience" className="border-b px-4">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-[#2E5E47]" />
                <span>Experience & Compensation</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4 space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-medium">Experience Range (Years)</Label>
                <div className="px-3">
                  <Slider
                    value={filters.experienceRange}
                    onValueChange={(value) => updateFilter('experienceRange', value as [number, number])}
                    max={20}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>{filters.experienceRange[0]} years</span>
                    <span>{filters.experienceRange[1]} years</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Hourly Rate Range (USD)</Label>
                <div className="px-3">
                  <Slider
                    value={filters.rateRange}
                    onValueChange={(value) => updateFilter('rateRange', value as [number, number])}
                    max={200}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>${filters.rateRange[0]}</span>
                    <span>${filters.rateRange[1]}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Match Score Range (%)</Label>
                <div className="px-3">
                  <Slider
                    value={filters.matchScoreRange}
                    onValueChange={(value) => updateFilter('matchScoreRange', value as [number, number])}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>{filters.matchScoreRange[0]}%</span>
                    <span>{filters.matchScoreRange[1]}%</span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Languages */}
          <AccordionItem value="languages" className="border-b px-4">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-[#2E5E47]" />
                <span>Languages</span>
                {filters.languages.length > 0 && (
                  <Badge className="ml-auto bg-[#2E5E47] text-white text-xs">
                    {filters.languages.length}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-3">
                <Input
                  placeholder="Search languages..."
                  value={searchQueries.languages}
                  onChange={(e) => setSearchQueries(prev => ({ ...prev, languages: e.target.value }))}
                  className="text-sm"
                />
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {filteredLanguages.map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={`language-${language}`}
                        checked={filters.languages.includes(language)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            addToArrayFilter('languages', language);
                          } else {
                            removeFromArrayFilter('languages', language);
                          }
                        }}
                      />
                      <label htmlFor={`language-${language}`} className="text-sm cursor-pointer">
                        {language}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Education */}
          <AccordionItem value="education" className="border-b px-4">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-[#2E5E47]" />
                <span>Education</span>
                {filters.education.length > 0 && (
                  <Badge className="ml-auto bg-[#2E5E47] text-white text-xs">
                    {filters.education.length}
                  </Badge>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-2">
                {educationOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`education-${option.id}`}
                      checked={filters.education.includes(option.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          addToArrayFilter('education', option.id);
                        } else {
                          removeFromArrayFilter('education', option.id);
                        }
                      }}
                    />
                    <label htmlFor={`education-${option.id}`} className="text-sm cursor-pointer flex items-center gap-2">
                      <option.icon className="h-3 w-3" />
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Verification & Requirements */}
          <AccordionItem value="verification" className="px-4">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[#2E5E47]" />
                <span>Verification & Requirements</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4 space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="verified" className="text-sm">Verified Only</Label>
                <Switch
                  id="verified"
                  checked={filters.verified === true}
                  onCheckedChange={(checked) => updateFilter('verified', checked ? true : null)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="portfolio" className="text-sm">Portfolio Required</Label>
                <Switch
                  id="portfolio"
                  checked={filters.portfolioRequired === true}
                  onCheckedChange={(checked) => updateFilter('portfolioRequired', checked ? true : null)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="github" className="text-sm">GitHub Required</Label>
                <Switch
                  id="github"
                  checked={filters.githubRequired === true}
                  onCheckedChange={(checked) => updateFilter('githubRequired', checked ? true : null)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="linkedin" className="text-sm">LinkedIn Required</Label>
                <Switch
                  id="linkedin"
                  checked={filters.linkedinRequired === true}
                  onCheckedChange={(checked) => updateFilter('linkedinRequired', checked ? true : null)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="video" className="text-sm">Video Required</Label>
                <Switch
                  id="video"
                  checked={filters.videoRequired === true}
                  onCheckedChange={(checked) => updateFilter('videoRequired', checked ? true : null)}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );

  // If always visible, render the always visible content
  if (alwaysVisible) {
    return <AlwaysVisibleContent />;
  }

  // Mobile Sheet View (only if not always visible)
  if (isMobile && !isFixedSidebar) {
    return (
      <Sheet open={isOpen} onOpenChange={onToggle}>
        <SheetContent side="right" className="w-full sm:w-96 flex flex-col h-full">
          <SheetHeader className="pb-4 border-b">
            <SheetTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-[#2E5E47]" />
              Filter Candidates
              {totalResults && (
                <Badge variant="secondary" className="ml-auto">
                  {totalResults.toLocaleString()} results
                </Badge>
              )}
            </SheetTitle>
          </SheetHeader>
          
          {/* Mobile Filter Content */}
          <AlwaysVisibleContent />
          
          {/* Mobile Actions */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <Button
                onClick={resetFilters}
                variant="outline"
                className="flex-1"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
              <Button
                onClick={applyFilters}
                className="flex-1 bg-[#2E5E47] hover:bg-[#2E5E47]/90"
              >
                Apply Filters
                {activeFilterCount > 0 && (
                  <Badge className="ml-2 bg-white text-[#2E5E47] text-xs px-2">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Fixed Sidebar View (fallback for legacy support)
  if (isFixedSidebar || (!isMobile && isOpen)) {
    return <AlwaysVisibleContent />;
  }

  return null;
}