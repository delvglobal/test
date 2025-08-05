import React from 'react';
import { Button } from './ui/button';
import { 
  Menu, 
  Shield
} from 'lucide-react';

import type { User as UserType, ScreenType, ModalType } from '../types';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  user: UserType;
  onNavigateToScreen: (screen: ScreenType) => void;
  onOpenModal: (modal: ModalType) => void;
}

export function Header({ 
  sidebarOpen, 
  setSidebarOpen, 
  user, 
  onNavigateToScreen, 
  onOpenModal
}: HeaderProps) {

  return (
    <header className="fixed top-0 left-0 right-0 h-14 sm:h-16 bg-white/95 backdrop-blur-md border-b border-gray-200/60 shadow-sm z-50">
      <div className="flex items-center justify-between h-full px-3 sm:px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
          {/* Enhanced Mobile Menu Button - Only show on small mobile screens */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="sm:hidden h-10 w-10 p-0 hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <Menu className="h-5 w-5 text-gray-700" />
          </Button>

          {/* Logo & Title - Responsive */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-[#2E5E47] rounded-lg flex-shrink-0">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <div className="hidden xs:block min-w-0">
              <h1 className="text-sm sm:text-lg font-semibold text-gray-900 truncate">
                DELV Global Cockpit
              </h1>
              <p className="text-xs text-gray-600 hidden sm:block">Admin Portal</p>
            </div>
            {/* Mobile-only compact title */}
            <div className="block xs:hidden min-w-0">
              <h1 className="text-sm font-semibold text-gray-900 truncate">
                DELV Global
              </h1>
            </div>
          </div>
        </div>

        {/* Right Section - Mobile optimized */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* User actions or notifications could go here */}
          {user && (
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Mobile user indicator - optional */}
              <div className="hidden xs:flex items-center text-xs text-gray-600">
                <span className="truncate max-w-20 sm:max-w-none">{user.name.split(' ')[0]}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}