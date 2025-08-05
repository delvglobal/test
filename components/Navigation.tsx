import React, { useState, useEffect } from 'react';
import { cn } from '../components/ui/utils';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import type { ScreenType, User, ModalType } from '../types';
import { 
  LayoutDashboard,
  Users,
  GitBranch,
  BookmarkCheck,
  Settings,
  Activity,
  User as UserIcon,
  LogOut,
  Shield,
  ChevronUp,
  Menu,
  X
} from 'lucide-react';

interface NavigationItem {
  id: ScreenType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  description?: string;
}

interface NavigationProps {
  isOpen: boolean;
  currentScreen: ScreenType;
  onNavigateToScreen: (screen: ScreenType) => void;
  isMobile: boolean;
  userRole: 'admin' | 'recruiter' | 'manager' | 'viewer';
  user?: User;
  onLogout?: () => void;
  onOpenModal?: (modal: ModalType) => void;
  setIsOpen?: (open: boolean) => void;
}

// Simplified navigation items - all items in one list
const getNavigationItems = (userRole: string): NavigationItem[] => {
  const baseItems: NavigationItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Overview and key metrics'
    },
    {
      id: 'candidates',
      label: 'Candidates',
      icon: Users,
      badge: '8',
      description: 'Candidate database and profiles'
    },
    {
      id: 'pipeline',
      label: 'Pipeline',
      icon: GitBranch,
      badge: '34',
      description: 'Active hiring processes'
    },
    {
      id: 'shortlists',
      label: 'Shortlists',
      icon: BookmarkCheck,
      badge: '12',
      description: 'Curated candidate lists'
    },

    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      description: 'System configuration'
    }
  ];

  return baseItems;
};

export function Navigation({ 
  isOpen, 
  currentScreen, 
  onNavigateToScreen, 
  isMobile, 
  userRole, 
  user, 
  onLogout, 
  onOpenModal, 
  setIsOpen 
}: NavigationProps) {
  const navigationItems = getNavigationItems(userRole);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  // Helper function to get user initials
  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Handle sidebar animation and body scroll lock
  useEffect(() => {
    if (isMobile) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      
      // Prevent body scroll when mobile menu is open
      if (isOpen) {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.classList.add('mobile-menu-open');
      } else {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.classList.remove('mobile-menu-open');
      }
      
      return () => {
        clearTimeout(timer);
        // Cleanup body styles on unmount
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.classList.remove('mobile-menu-open');
      };
    }
  }, [isOpen, isMobile]);

  // Enhanced sidebar toggle for mobile
  const handleToggle = () => {
    setIsOpen?.(!isOpen);
  };

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-white/95 backdrop-blur-md border-r border-gray-200/60 z-50 transition-all duration-300 ease-out flex flex-col",
        "shadow-xl shadow-gray-900/5",
        // Desktop sizing
        !isMobile && (isOpen ? "w-64" : "w-16"),
        // Mobile sizing and positioning
        isMobile && !isOpen && "-translate-x-full w-0",
        isMobile && isOpen && "w-80 sm:w-72", // Wider on very small mobile, narrower on larger mobile
        isAnimating && "transition-transform duration-300"
      )}
      style={{
        backdropFilter: 'blur(12px)',
        background: 'rgba(255, 255, 255, 0.95)',
      }}
    >
      {/* Enhanced Header Section - Mobile Optimized */}
      <div className={cn(
        "flex items-center justify-between border-b border-gray-200/60",
        "bg-gradient-to-r from-[#2E5E47]/5 to-transparent",
        // Responsive padding
        isMobile ? "p-3" : "p-4",
        // Account for header height
        "mt-14 sm:mt-16"
      )}>
        {isOpen ? (
          <>
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#2E5E47] to-[#2E5E47]/80 rounded-xl shadow-sm flex-shrink-0">
                <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="min-w-0">
                <h2 className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                  DELV Global
                </h2>
                <p className="text-xs text-gray-600 truncate">Hiring Cockpit</p>
              </div>
            </div>
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggle}
                className="h-9 w-9 p-0 hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation flex-shrink-0"
                aria-label="Close sidebar"
              >
                <X className="h-4 w-4 text-gray-700" />
              </Button>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center w-full">
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#2E5E47] to-[#2E5E47]/80 rounded-xl shadow-sm">
              <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
          </div>
        )}
      </div>



      {/* Enhanced Navigation Items - Mobile Optimized */}
      <nav className={cn(
        "flex-1 overflow-y-auto scrollbar-none",
        isMobile ? "p-2" : "p-3"
      )}>
        {/* Main Navigation Items - Mobile-First Design */}
        <div className={cn(
          isMobile ? "space-y-1" : "space-y-2"
        )}>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            const isHovered = hoveredItem === item.id;
            
            return (
              <div 
                key={item.id} 
                className="relative group"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <button
                  onClick={() => {
                    onNavigateToScreen(item.id);
                    // Auto-close sidebar on mobile after navigation
                    if (isMobile) {
                      setTimeout(() => setIsOpen?.(false), 150);
                    }
                  }}
                  className={cn(
                    "w-full flex items-center text-left rounded-xl transition-all duration-200",
                    "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#2E5E47]/20 focus:ring-offset-2",
                    // Mobile-optimized touch targets
                    isMobile 
                      ? "gap-3 px-3 py-3 min-h-[48px] touch-manipulation active:bg-gray-200" 
                      : "gap-3 px-3 py-2.5 transform hover:scale-[1.02] active:scale-[0.98]",
                    isActive 
                      ? "bg-gradient-to-r from-[#2E5E47] to-[#2E5E47]/90 text-white shadow-md shadow-[#2E5E47]/20" 
                      : "text-gray-700 hover:text-gray-900",
                    isHovered && !isActive && "bg-gray-50"
                  )}
                >
                  <Icon className={cn(
                    "flex-shrink-0 transition-colors",
                    isMobile ? "h-5 w-5" : "h-5 w-5",
                    isActive ? "text-white" : "text-gray-500 group-hover:text-gray-700"
                  )} />
                  
                  {isOpen && (
                    <>
                      <span className={cn(
                        "flex-1 text-left truncate font-medium",
                        isMobile ? "text-base" : "text-sm"
                      )}>
                        {item.label}
                      </span>
                      {item.badge && (
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "text-xs px-2 py-0.5 border backdrop-blur-sm font-medium flex-shrink-0",
                            isMobile ? "min-w-[24px] h-6" : "",
                            isActive 
                              ? "bg-white/20 text-white border-white/30" 
                              : "bg-gray-100/80 text-gray-600 border-gray-200/60 group-hover:bg-gray-200/80"
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className={cn(
                      "absolute top-1/2 -translate-y-1/2 bg-white rounded-r-full",
                      "-left-1 w-1 h-8"
                    )} />
                  )}
                </button>
                
                {/* Enhanced tooltip for collapsed state */}
                {!isOpen && (
                  <div className={cn(
                    "absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-2",
                    "bg-gray-900/95 backdrop-blur-sm text-white text-sm rounded-lg",
                    "opacity-0 invisible group-hover:opacity-100 group-hover:visible",
                    "transition-all duration-200 whitespace-nowrap z-50 pointer-events-none",
                    "shadow-lg shadow-gray-900/20"
                  )}>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <Badge variant="outline" className="bg-white/20 text-white border-white/30 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    {item.description && (
                      <div className="text-xs text-gray-300 mt-1">{item.description}</div>
                    )}
                    {/* Tooltip arrow */}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900/95" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Enhanced User Section - Mobile Optimized */}
      {user && (
        <div className="nav-user-section border-t border-gray-200/60">
          {isOpen ? (
            <div className={cn(
              isMobile ? "p-3" : "p-4"
            )}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start p-0 h-auto hover:bg-gray-100/50">
                    <div className={cn(
                      "flex items-center w-full rounded-xl nav-user-button transition-all duration-200",
                      isMobile 
                        ? "gap-3 p-3 min-h-[48px] touch-manipulation active:bg-gray-200" 
                        : "gap-3 p-3"
                    )}>
                      <div className="relative flex-shrink-0">
                        <Avatar className={cn(
                          "ring-2 ring-gray-200/60",
                          isMobile ? "h-9 w-9" : "h-10 w-10"
                        )}>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-gradient-to-br from-[#2E5E47] to-[#2E5E47]/80 text-white font-semibold text-sm">
                            {getUserInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className={cn(
                          "absolute bg-green-500 border-2 border-white rounded-full",
                          isMobile 
                            ? "-bottom-0.5 -right-0.5 w-3 h-3" 
                            : "-bottom-1 -right-1 w-4 h-4"
                        )} />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <p className={cn(
                          "font-medium text-gray-900 truncate",
                          isMobile ? "text-sm" : "text-sm"
                        )}>
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-600 truncate capitalize">
                          {user.role}
                        </p>
                      </div>
                      <ChevronUp className={cn(
                        "text-gray-400 transition-transform group-hover:text-gray-600 flex-shrink-0",
                        isMobile ? "h-4 w-4" : "h-4 w-4"
                      )} />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mb-2 shadow-lg">
                  <DropdownMenuLabel>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-br from-[#2E5E47] to-[#2E5E47]/80 text-white">
                          {getUserInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onOpenModal?.('profile-settings')} className="cursor-pointer">
                    <UserIcon className="h-4 w-4 mr-3" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onOpenModal?.('security-privacy')} className="cursor-pointer">
                    <Shield className="h-4 w-4 mr-3" />
                    Security & Privacy
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={onLogout} 
                    className="text-red-600 focus:text-red-600 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className={cn(
              "group",
              isMobile ? "p-3" : "p-4"
            )}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className={cn(
                    "w-full p-0 h-auto",
                    isMobile && "min-h-[48px] touch-manipulation"
                  )}>
                    <div className="flex justify-center relative">
                      <div className="relative">
                        <Avatar className={cn(
                          "ring-2 ring-gray-200/60 hover:ring-[#2E5E47]/30 transition-all duration-200",
                          isMobile ? "h-9 w-9" : "h-10 w-10"
                        )}>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-gradient-to-br from-[#2E5E47] to-[#2E5E47]/80 text-white font-semibold text-sm">
                            {getUserInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className={cn(
                          "absolute bg-green-500 border-2 border-white rounded-full",
                          isMobile 
                            ? "-bottom-0.5 -right-0.5 w-3 h-3" 
                            : "-bottom-1 -right-1 w-4 h-4"
                        )} />
                      </div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mb-2 shadow-lg">
                  <DropdownMenuLabel>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-br from-[#2E5E47] to-[#2E5E47]/80 text-white">
                          {getUserInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onOpenModal?.('profile-settings')} className="cursor-pointer">
                    <UserIcon className="h-4 w-4 mr-3" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onOpenModal?.('security-privacy')} className="cursor-pointer">
                    <Shield className="h-4 w-4 mr-3" />
                    Security & Privacy
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={onLogout} 
                    className="text-red-600 focus:text-red-600 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Enhanced tooltip for collapsed state */}
              <div className="absolute left-full ml-3 bottom-4 px-3 py-2 nav-user-tooltip text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{user.name}</span>
                </div>
                <div className="text-xs text-gray-300 mt-1">{user.email}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}