// User and Authentication Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'recruiter' | 'manager' | 'viewer';
  avatar?: string;
  department?: string;
  lastLogin?: string;
  permissions: string[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  user: User | null;
}

// Screen Navigation Types
export type ScreenType = 
  | 'dashboard'
  | 'candidates'
  | 'candidate-detail'
  | 'pipeline'
  | 'shortlists'
  | 'shortlist-detail'
  | 'shortlist-page-wrapper'
  | 'edit-shortlist'
  | 'settings';

// Navigation Types
export interface NavigationItem {
  id: ScreenType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  badgeColor?: string;
  description?: string;
  category?: string;
}

// Modal Types - Removed 'create-candidate' and 'schedule-interview'
export type ModalType = 
  | 'bulk-import'
  | 'create-shortlist'
  | 'create-pipeline'
  | 'add-candidate-to-pipeline'
  | 'profile-settings'
  | 'organization-settings'
  | 'security-privacy'
  | 'regional-settings'
  | 'recent-activity'
  | 'shortlist-preview'
  | null;

// Application State
export interface AppState {
  currentScreen: ScreenType;
  selectedCandidateId?: string;
  sidebarOpen: boolean;
  user: User;
  auth: AuthState;
}

// Dashboard Types
export interface DashboardMetrics {
  candidates: {
    total: number;
    newThisWeek: number;
    pendingReview: number;
    interviewing: number;
    available: number;
    placed: number;
    syncStatus: 'active' | 'paused' | 'error';
    lastSync: string;
  };
  clients: {
    total: number;
    active: number;
    trial: number;
    paused: number;
    inactive: number;
    monthlyRevenue: number;
    avgSatisfaction: number;
  };
  pipeline: {
    activePlacements: number;
    newRequirements: number;
    urgentRoles: number;
    fillRate: number;
    avgTimeToHire: number;
    interviewsThisWeek: number;
  };
  performance: {
    placementRate: number;
    clientSatisfaction: number;
    avgTimeToHire: number;
    revenueGrowth: number;
    teamProductivity: number;
  };
}

export interface DashboardActivity {
  id: string;
  type: 'candidate_sync' | 'interview_scheduled' | 'placement_success' | 'client_request' | 'shortlist_shared';
  title: string;
  candidate?: string;
  client?: string;
  description: string;
  time: string;
  avatar?: string;
  priority: 'urgent' | 'high' | 'medium' | 'low' | 'success';
  skills?: string[];
  location?: string;
  scheduledFor?: string;
  salary?: string;
  deadline?: string;
  candidates?: number;
}

export interface PriorityTask {
  id: string;
  type: 'interview' | 'follow_up' | 'review' | 'deadline';
  title: string;
  description: string;
  time: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  client?: string;
  duration?: string;
  candidates?: number;
  daysLeft?: number;
  status: 'confirmed' | 'pending' | 'active';
}

export interface TrendingInsight {
  id: string;
  title: string;
  description: string;
  trend: 'up' | 'down' | 'stable';
  metric: string;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Candidate Types
export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  title?: string;
  role?: string;
  position?: string;
  experience: string;
  location: string;
  country?: string;
  countryFlag?: string;
  skills: string[];
  tools?: string[];
  languages?: string[];
  summary?: string;
  status: 'available' | 'interviewing' | 'placed' | 'not_available';
  rating?: number;
  rate?: number;
  currency?: string;
  timezone?: string;
  timezoneOffset?: string;
  verified?: boolean;
  availability?: 'immediate' | 'short' | 'medium' | 'long' | 'not-looking';
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  portfolio?: {
    website?: string;
    linkedin?: string;
    github?: string;
  };
  preferences?: {
    remote: boolean;
    relocate: boolean;
    availability: string;
  };
  lastUpdated: string;
  source: 'database_sync' | 'referral' | 'application'; // Updated to reflect sync-based approach
  notes?: string[];
  interviews?: Interview[];
  placements?: Placement[];
  tags?: string[];
}

// Interview Types
export interface Interview {
  id: string;
  candidateId: string;
  clientId: string;
  scheduledAt: string;
  duration: number;
  type: 'phone' | 'video' | 'onsite' | 'technical';
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  interviewers: string[];
  notes?: string;
  feedback?: InterviewFeedback;
  meetingLink?: string;
}

export interface InterviewFeedback {
  rating: number;
  comments: string;
  recommendation: 'hire' | 'no_hire' | 'maybe';
  strengths: string[];
  concerns: string[];
}

// Placement Types
export interface Placement {
  id: string;
  candidateId: string;
  clientId: string;
  position: string;
  startDate: string;
  salary: number;
  currency: string;
  status: 'offer_made' | 'accepted' | 'started' | 'completed';
  duration?: number; // in months for contract positions
  notes?: string;
}

// Client Types
export interface Client {
  id: string;
  name: string;
  industry: string;
  size: string;
  location: string;
  contact: {
    name: string;
    email: string;
    phone?: string;
    title?: string;
  };
  requirements: JobRequirement[];
  placements: Placement[];
  status: 'active' | 'inactive' | 'prospect';
  notes?: string;
}

// Job Requirements
export interface JobRequirement {
  id: string;
  title: string;
  description: string;
  skills: string[];
  experience: string;
  location: string;
  remote: boolean;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  urgency: 'low' | 'medium' | 'high';
  status: 'open' | 'filled' | 'on_hold' | 'cancelled';
  createdAt: string;
  deadline?: string;
}

// Pipeline Types
export interface Pipeline {
  id: string;
  name: string;
  stages: PipelineStage[];
  candidates: PipelineCandidateEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface PipelineStage {
  id: string;
  name: string;
  order: number;
  color?: string;
}

export interface PipelineCandidateEntry {
  candidateId: string;
  stageId: string;
  addedAt: string;
  notes?: string;
}

// Shortlist Types
export interface Shortlist {
  id: string;
  name: string;
  description?: string;
  candidateIds: string[];
  clientId?: string;
  jobRequirementId?: string;
  createdAt: string;
  updatedAt: string;
  sharedWith?: string[];
  status: 'draft' | 'shared' | 'archived';
}

// Filter Types
export interface CandidateFilters {
  skills?: string[];
  experience?: string[];
  location?: string[];
  availability?: string[];
  rating?: {
    min: number;
    max: number;
  };
  salary?: {
    min: number;
    max: number;
  };
  remote?: boolean;
  status?: string[];
  source?: string[]; // Updated to include database_sync
}

// Search Types
export interface SavedSearch {
  id: string;
  name: string;
  filters: CandidateFilters;
  createdAt: string;
  lastUsed?: string;
}

// Audit Types
export type AuditEventType = 
  | 'login'
  | 'logout'
  | 'password_change'
  | 'user_created'
  | 'user_updated'
  | 'user_deleted'
  | 'candidate_updated' // Removed candidate_created since it's now sync-based
  | 'candidate_deleted'
  | 'candidate_status_change'
  | 'candidate_sync' // New audit event for database sync
  | 'interview_scheduled'
  | 'interview_completed'
  | 'interview_cancelled'
  | 'pipeline_created'
  | 'pipeline_updated'
  | 'pipeline_deleted'
  | 'shortlist_created'
  | 'shortlist_updated'
  | 'shortlist_shared'
  | 'client_communication'
  | 'client_onboarded'
  | 'client_requirements_updated'
  | 'candidate_export'
  | 'bulk_import'
  | 'report_generated'
  | 'permission_changed'
  | 'settings_updated'
  | 'system_config';

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  adminEmail: string;
  eventType: AuditEventType;
  ipAddress: string;
  userAgent: string;
  details: string;
  metadata?: Record<string, any>;
  target?: string;
  success: boolean;
}

export interface AuditLogFilters {
  eventTypes: AuditEventType[];
  adminUsers: string[];
  dateFrom?: string;
  dateTo?: string;
  searchTerm?: string;
  success?: boolean;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
}

// Report Types
export interface ReportData {
  id: string;
  name: string;
  type: 'candidate_summary' | 'placement_report' | 'client_activity' | 'pipeline_analysis';
  data: any;
  generatedAt: string;
  parameters?: Record<string, any>;
}

// Settings Types
export interface OrganizationSettings {
  name: string;
  logo?: string;
  timezone: string;
  currency: string;
  language: string;
  emailNotifications: boolean;
  slackIntegration?: {
    enabled: boolean;
    webhookUrl?: string;
  };
  databaseSync: {
    enabled: boolean;
    frequency: 'realtime' | 'hourly' | 'daily';
    lastSync?: string;
    status: 'active' | 'paused' | 'error';
  };
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  emailNotifications: {
    newCandidates: boolean;
    interviews: boolean;
    placements: boolean;
    systemUpdates: boolean;
  };
  defaultView: 'grid' | 'list';
  itemsPerPage: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Form Types
export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Export all types for easier importing
export type {
  // Re-export all the types above for convenience
};