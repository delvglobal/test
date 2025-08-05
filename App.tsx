import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { cn } from './components/ui/utils';
import { Dashboard } from './components/Dashboard';
import { CandidateListExpandable } from './components/CandidateListExpandable';
import { CandidateDetail } from './components/CandidateDetail';
import { Pipeline } from './components/Pipeline';
import { Settings } from './components/Settings';
import { Shortlists } from './components/Shortlists';
import { ShortlistDetail } from './components/ShortlistDetail';
import { ShortlistPageWrapper } from './components/ShortlistPageWrapper';
import { EditShortlist } from './components/EditShortlist';

import { AdminLogin } from './components/AdminLogin';
import { Navigation } from './components/Navigation';

import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

// Modal Components
import { BulkImportModal } from './components/modals/BulkImportModal';
import { CreateShortlistModal } from './components/modals/CreateShortlistModal';
import { CreatePipelineModal } from './components/modals/CreatePipelineModal';
import { AddCandidateToPipelineModal } from './components/modals/AddCandidateToPipelineModal';
import { ProfileSettingsModal } from './components/modals/ProfileSettingsModal';
import { OrganizationSettingsModal } from './components/modals/OrganizationSettingsModal';
import { SecurityPrivacyModal } from './components/modals/SecurityPrivacyModal';
import { RegionalSettingsModal } from './components/modals/RegionalSettingsModal';
import { RecentActivityModal } from './components/modals/RecentActivityModal';
import { ShortlistPreviewModal } from './components/modals/ShortlistPreviewModal';

import type { ScreenType, ModalType, User, LoginCredentials } from './types';

// Enhanced App State Interface
interface AppState {
  // Auth state
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  authError: string | null;
  user: User | null;
  
  // Navigation state
  currentScreen: ScreenType;
  selectedEntityId: string | undefined;
  selectedShortlist: any | null;
  navigationHistory: ScreenType[];
  
  // UI state
  sidebarOpen: boolean;
  activeModal: ModalType;
  isTransitioning: boolean;
  
  // Responsive state
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
}

// Mock user data
const mockUser: User = {
  id: '1',
  name: 'Alexandra Morgan',
  email: 'admin@delv.global',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b120?w=150&h=150&fit=crop&crop=face',
  department: 'Operations',
  lastLogin: new Date().toISOString(),
  permissions: ['read', 'write', 'admin', 'audit']
};

// Enhanced authentication service
const authService = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (credentials.email === 'admin@delv.global' && credentials.password === 'admin123') {
      return mockUser;
    }
    
    throw new Error('Invalid email or password');
  },
  
  logout: async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    localStorage.removeItem('delv_auth_user');
  },
  
  checkAuth: async (): Promise<User | null> => {
    try {
      const stored = localStorage.getItem('delv_auth_user');
      if (stored) {
        const user = JSON.parse(stored);
        if (user && user.id && user.email && user.name) {
          return user;
        }
      }
    } catch (error) {
      console.warn('Failed to parse stored auth data:', error);
      localStorage.removeItem('delv_auth_user');
    }
    return null;
  }
};

// Enhanced screen configuration for layout logic
const SCREEN_CONFIG = {
  'dashboard': { 
    hasSpecialLayout: false, 
    title: 'Dashboard',
    icon: 'LayoutDashboard',
    showBackButton: false,
    containerClass: 'dashboard-container'
  },
  'candidates': { 
    hasSpecialLayout: true, 
    title: 'Candidates',
    icon: 'Users',
    showBackButton: false,
    containerClass: 'candidates-container'
  },
  'candidate-detail': { 
    hasSpecialLayout: false, 
    title: 'Candidate Details',
    icon: 'User',
    showBackButton: true,
    containerClass: 'detail-container'
  },
  'pipeline': { 
    hasSpecialLayout: false, 
    title: 'Pipeline',
    icon: 'GitBranch',
    showBackButton: false,
    containerClass: 'pipeline-container'
  },
  'shortlists': { 
    hasSpecialLayout: false, 
    title: 'Shortlists',
    icon: 'BookmarkCheck',
    showBackButton: false,
    containerClass: 'shortlists-container'
  },
  'shortlist-detail': { 
    hasSpecialLayout: true, 
    title: 'Shortlist Details',
    icon: 'List',
    showBackButton: true,
    containerClass: 'shortlist-detail-container'
  },
  'shortlist-page-wrapper': { 
    hasSpecialLayout: true, 
    title: 'Shortlist Preview',
    icon: 'Eye',
    showBackButton: false,
    containerClass: 'shortlist-preview-container'
  },
  'edit-shortlist': { 
    hasSpecialLayout: true, 
    title: 'Edit Shortlist',
    icon: 'Edit',
    showBackButton: true,
    containerClass: 'edit-shortlist-container'
  },
  'settings': { 
    hasSpecialLayout: false, 
    title: 'Settings',
    icon: 'Settings',
    showBackButton: false,
    containerClass: 'settings-container'
  }
} as const;

// Enhanced breakpoints with better responsive logic
const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
  wide: 1536
} as const;

function App() {
  // Enhanced consolidated state
  const [appState, setAppState] = useState<AppState>({
    // Auth
    isAuthenticated: false,
    isAuthLoading: true,
    authError: null,
    user: null,
    
    // Navigation
    currentScreen: 'dashboard',
    selectedEntityId: undefined,
    selectedShortlist: null,
    navigationHistory: [],
    
    // UI - Keep sidebar open by default
    sidebarOpen: true,
    activeModal: null,
    isTransitioning: false,
    
    // Responsive
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    screenWidth: typeof window !== 'undefined' ? window.innerWidth : 1280
  });

  // Enhanced derived state
  const currentScreenConfig = SCREEN_CONFIG[appState.currentScreen];
  const hasSpecialLayout = currentScreenConfig?.hasSpecialLayout || false;
  const showBackButton = currentScreenConfig?.showBackButton || false;
  const containerClass = currentScreenConfig?.containerClass || '';

  // Enhanced screen size logic with persistent sidebar
  const screenSizeLogic = useMemo(() => {
    const getScreenSize = (width: number) => {
      const isMobile = width < BREAKPOINTS.mobile;
      const isTablet = width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet;
      const isDesktop = width >= BREAKPOINTS.tablet;
      
      return { isMobile, isTablet, isDesktop, screenWidth: width };
    };
    
    // Modified to keep sidebar open by default
    const getSidebarState = (
      screenSizes: ReturnType<typeof getScreenSize>, 
      isAuthenticated: boolean,
      currentSidebarState: boolean
    ) => {
      if (!isAuthenticated) return false;
      
      // Keep sidebar open on desktop and tablet by default
      // Only close on small mobile screens (< 640px) to maintain usability
      if (screenSizes.screenWidth < 640) return false;
      
      // For all other screen sizes, default to open unless manually closed
      return true;
    };
    
    return { getScreenSize, getSidebarState };
  }, []);

  // Enhanced authentication check effect
  useEffect(() => {
    let isMounted = true;
    
    const checkAuthentication = async () => {
      try {
        const user = await authService.checkAuth();
        
        if (!isMounted) return;
        
        if (user) {
          setAppState(prev => ({
            ...prev,
            isAuthenticated: true,
            isAuthLoading: false,
            authError: null,
            user,
            // Keep sidebar open when authenticated (default to true for desktop/tablet)
            sidebarOpen: prev.screenWidth >= 640
          }));
        } else {
          setAppState(prev => ({
            ...prev,
            isAuthenticated: false,
            isAuthLoading: false,
            authError: null,
            user: null,
            sidebarOpen: false
          }));
        }
      } catch (error) {
        if (!isMounted) return;
        
        setAppState(prev => ({
          ...prev,
          isAuthenticated: false,
          isAuthLoading: false,
          authError: 'Authentication check failed',
          user: null,
          sidebarOpen: false
        }));
      }
    };

    checkAuthentication();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Enhanced responsive behavior effect with persistent sidebar
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let rafId: number;
    
    const handleResize = () => {
      // Cancel previous timeout and RAF
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
      
      // Use RAF for smooth updates
      rafId = requestAnimationFrame(() => {
        // Debounce the actual logic
        timeoutId = setTimeout(() => {
          const width = window.innerWidth;
          const screenSizes = screenSizeLogic.getScreenSize(width);
          // Always prefer open state for desktop/tablet, only force close on small mobile
          const newSidebarState = screenSizes.screenWidth >= 640 ? true : false;
          
          setAppState(prev => ({
            ...prev,
            ...screenSizes,
            sidebarOpen: newSidebarState
          }));
        }, 150);
      });
    };
    
    // Initial size check
    handleResize();
    
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [appState.isAuthenticated, appState.sidebarOpen, screenSizeLogic]);

  // Enhanced authentication handlers with better error handling
  const handleLogin = useCallback(async (credentials: LoginCredentials) => {
    setAppState(prev => ({ ...prev, isAuthLoading: true, authError: null }));
    
    try {
      const user = await authService.login(credentials);
      localStorage.setItem('delv_auth_user', JSON.stringify(user));
      
      setAppState(prev => ({
        ...prev,
        isAuthenticated: true,
        isAuthLoading: false,
        authError: null,
        user,
        // Keep sidebar open after login (default to true for desktop/tablet)
        sidebarOpen: prev.screenWidth >= 640
      }));
      
      toast.success(`Welcome back, ${user.name}!`, {
        description: 'You have successfully logged in to DELV Global Cockpit'
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setAppState(prev => ({
        ...prev,
        isAuthLoading: false,
        authError: errorMessage
      }));
      toast.error('Login Failed', {
        description: errorMessage
      });
    }
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await authService.logout();
      
      setAppState(prev => ({
        ...prev,
        isAuthenticated: false,
        authError: null,
        user: null,
        currentScreen: 'dashboard',
        selectedEntityId: undefined,
        navigationHistory: [],
        sidebarOpen: false,
        activeModal: null
      }));
      
      toast.success('Logged out successfully', {
        description: 'You have been safely logged out'
      });
    } catch (error) {
      toast.error('Logout failed', {
        description: 'There was an issue logging you out. Please try again.'
      });
    }
  }, []);

  // Enhanced navigation handlers - keep sidebar open during navigation
  const navigateToScreen = useCallback((screen: ScreenType, entityId?: string) => {
    // Start transition
    setAppState(prev => ({ ...prev, isTransitioning: true }));
    
    // Use RAF for smooth transition
    requestAnimationFrame(() => {
      setAppState(prev => {
        const newHistory = prev.currentScreen !== screen 
          ? [...prev.navigationHistory.slice(-4), prev.currentScreen]
          : prev.navigationHistory;
        
        return {
          ...prev,
          currentScreen: screen,
          selectedEntityId: entityId,
          navigationHistory: newHistory,
          // Keep sidebar open during navigation (don't change state)
          activeModal: null,
          isTransitioning: false
        };
      });
      
      // Update document title with better formatting
      const screenTitle = SCREEN_CONFIG[screen]?.title || 'Dashboard';
      document.title = `${screenTitle} | DELV Global Cockpit`;
      
      // Scroll to top on navigation
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }, []);

  // Enhanced sidebar toggle with keyboard support
  const toggleSidebar = useCallback(() => {
    setAppState(prev => ({
      ...prev,
      sidebarOpen: !prev.sidebarOpen
    }));
  }, []);

  // Enhanced keyboard handler for mobile menu
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Close mobile menu on Escape key
      if (event.key === 'Escape' && appState.isMobile && appState.sidebarOpen) {
        toggleSidebar();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [appState.isMobile, appState.sidebarOpen, toggleSidebar]);

  // Enhanced modal handlers
  const openModal = useCallback((modal: ModalType, data?: any) => {
    setAppState(prev => ({ 
      ...prev, 
      activeModal: modal,
      selectedShortlist: modal === 'shortlist-preview' ? data : prev.selectedShortlist
    }));
  }, []);

  const closeModal = useCallback(() => {
    setAppState(prev => ({ 
      ...prev, 
      activeModal: null,
      selectedShortlist: null
    }));
  }, []);

  // Enhanced back navigation
  const handleBackNavigation = useCallback(() => {
    const lastScreen = appState.navigationHistory[appState.navigationHistory.length - 1];
    if (lastScreen) {
      navigateToScreen(lastScreen);
    } else {
      // Fallback to dashboard
      navigateToScreen('dashboard');
    }
  }, [appState.navigationHistory, navigateToScreen]);

  // Check if we should show the shortlist page wrapper standalone
  if (appState.currentScreen === 'shortlist-page-wrapper') {
    return <ShortlistPageWrapper />;
  }

  // Enhanced loading screen with better UX
  if (appState.isAuthLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-sm mx-auto">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-[#2E5E47] mx-auto"></div>
            <div className="absolute inset-0 rounded-full border-4 border-gray-100 opacity-20"></div>
          </div>
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">DELV Global Cockpit</h2>
            <p className="text-gray-600">Initializing your workspace...</p>
            <div className="flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-[#2E5E47] rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-[#2E5E47] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-[#2E5E47] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Enhanced login screen
  if (!appState.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <AdminLogin 
          onLogin={handleLogin}
          isLoading={appState.isAuthLoading}
          error={appState.authError}
        />
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 5000,
            className: 'toast-custom',
            style: {
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            },
          }}
        />
      </div>
    );
  }

  // Enhanced screen renderer with error boundary and transitions
  const renderCurrentScreen = () => {
    try {
      const screenProps = {
        onNavigateToScreen: navigateToScreen,
        onOpenModal: openModal,
        onBack: showBackButton ? handleBackNavigation : undefined
      };

      switch (appState.currentScreen) {
        case 'dashboard':
          return <Dashboard {...screenProps} />;
        case 'candidates':
          return <CandidateListExpandable {...screenProps} />;
        case 'candidate-detail':
          return (
            <CandidateDetail 
              candidateId={appState.selectedEntityId}
              {...screenProps}
            />
          );
        case 'pipeline':
          return <Pipeline {...screenProps} />;
        case 'shortlists':
          return <Shortlists {...screenProps} />;
        case 'shortlist-detail':
          return (
            <ShortlistDetail 
              shortlistId={appState.selectedEntityId}
              sidebarOpen={appState.sidebarOpen}
              isMobile={appState.isMobile}
              isTablet={appState.isTablet}
              {...screenProps}
            />
          );
        case 'edit-shortlist':
          return (
            <EditShortlist 
              shortlistId={appState.selectedEntityId}
              {...screenProps}
            />
          );
        case 'settings':
          return <Settings {...screenProps} />;
        default:
          return <Dashboard {...screenProps} />;
      }
    } catch (error) {
      console.error('Error rendering screen:', error);
      return (
        <div className="flex items-center justify-center min-h-96 p-8">
          <div className="text-center space-y-6 max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-red-500 text-2xl">⚠️</span>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Something went wrong</h3>
              <p className="text-gray-600">We encountered an error while loading this page. Please try refreshing or contact support if the issue persists.</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-[#2E5E47] text-white rounded-lg hover:bg-[#2E5E47]/90 transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col overflow-hidden">
      {/* Main Layout Container */}
      <div className="flex flex-1 relative">
        {/* Enhanced Sidebar Navigation */}
        <Navigation 
          isOpen={appState.sidebarOpen}
          currentScreen={appState.currentScreen}
          onNavigateToScreen={navigateToScreen}
          isMobile={appState.isMobile}
          userRole={appState.user?.role || 'user'}
          user={appState.user!}
          onLogout={handleLogout}
          onOpenModal={openModal}
          setIsOpen={toggleSidebar}
        />

        {/* Enhanced Mobile Overlay - Improved with better breakpoints */}
        {appState.isMobile && appState.sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 touch-manipulation"
            onClick={toggleSidebar}
            onTouchEnd={toggleSidebar}
            aria-label="Close sidebar"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
                toggleSidebar();
              }
            }}
          />
        )}

        {/* Enhanced Main Content Area - Mobile-First Responsive */}
        <main className={cn(
          "flex-1 min-h-0 transition-all duration-300 ease-out relative",
          // Top padding for fixed header
          "pt-14 sm:pt-16",
          // Transition overlay for smooth navigation
          appState.isTransitioning && "opacity-95",
          // Mobile: always full width (sidebar overlays)
          appState.isMobile && "ml-0",
          // Tablet and Desktop: responsive sidebar margins
          !appState.isMobile && appState.sidebarOpen && "ml-64",
          !appState.isMobile && !appState.sidebarOpen && "ml-16"
        )}>
          <div className="h-full overflow-auto">
            {hasSpecialLayout ? (
              // Special layout screens handle their own layout
              <div className="h-full">
                {renderCurrentScreen()}
              </div>
            ) : (
              // Enhanced standard layout with mobile-first responsive container
              <div className={cn(
                "container mx-auto h-full",
                // Mobile-first responsive padding with touch-friendly spacing
                "px-3 py-4 xs:px-4 sm:px-6 lg:px-8",
                "py-4 sm:py-6 lg:py-8",
                // Enhanced max-width system
                "max-w-7xl",
                // Screen-specific container classes
                containerClass,
                // Override padding for specific screen types if needed
                appState.isMobile && "px-3 py-3",
                appState.isTablet && "px-5 py-5"
              )}>
                {renderCurrentScreen()}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Enhanced Modal System */}
      <BulkImportModal 
        open={appState.activeModal === 'bulk-import'} 
        onOpenChange={closeModal} 
      />
      <CreateShortlistModal 
        open={appState.activeModal === 'create-shortlist'} 
        onOpenChange={closeModal} 
      />
      <CreatePipelineModal 
        open={appState.activeModal === 'create-pipeline'} 
        onOpenChange={closeModal} 
      />
      <AddCandidateToPipelineModal 
        open={appState.activeModal === 'add-candidate-to-pipeline'} 
        onOpenChange={closeModal}
        pipelineName="Current Pipeline"
      />
      <ProfileSettingsModal 
        open={appState.activeModal === 'profile-settings'} 
        onOpenChange={closeModal} 
      />
      <OrganizationSettingsModal 
        open={appState.activeModal === 'organization-settings'} 
        onOpenChange={closeModal} 
      />
      <SecurityPrivacyModal 
        open={appState.activeModal === 'security-privacy'} 
        onOpenChange={closeModal} 
      />
      <RegionalSettingsModal 
        open={appState.activeModal === 'regional-settings'} 
        onOpenChange={closeModal} 
      />
      <RecentActivityModal 
        open={appState.activeModal === 'recent-activity'} 
        onOpenChange={closeModal} 
      />
      
      {appState.selectedShortlist && (
        <ShortlistPreviewModal
          isOpen={appState.activeModal === 'shortlist-preview'}
          onClose={closeModal}
          shortlist={appState.selectedShortlist}
          onCandidateView={navigateToScreen.bind(null, 'candidate-detail')}
          onCandidateAction={(action, candidateId) => {
            // Handle candidate actions
            switch (action) {
              case 'email':
                toast.success('Email feature coming soon!');
                break;
              case 'schedule':
                toast.success('Scheduling feature coming soon!');
                break;
              case 'shortlist':
                toast.success('Added to shortlist!');
                break;
              case 'pipeline':
                openModal('add-candidate-to-pipeline');
                break;
              default:
                break;
            }
          }}
        />
      )}

      {/* Enhanced Toast Notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          className: 'toast-enhanced',
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            borderRadius: '12px',
          },
        }}
      />
    </div>
  );
}

export default App;