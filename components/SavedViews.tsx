import React, { useState } from 'react';
import { Eye, Star, Filter, MoreVertical, Search, Plus, Trash2, Edit3, Copy } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import type { ScreenType, ModalType } from '../types';

interface SavedViewsProps {
  onNavigateToScreen: (screen: ScreenType, candidateId?: string) => void;
  onOpenModal: (modal: ModalType) => void;
}

const savedViews = [
  {
    id: 1,
    name: 'Senior Frontend Developers',
    description: 'React developers with 5+ years experience',
    filters: ['React', 'TypeScript', '5+ years', 'Remote'],
    candidateCount: 23,
    lastUsed: '2 hours ago',
    isDefault: true,
  },
  {
    id: 2,
    name: 'DevOps Engineers',
    description: 'AWS and Docker specialists',
    filters: ['AWS', 'Docker', 'Kubernetes', '3+ years'],
    candidateCount: 18,
    lastUsed: '1 day ago',
    isDefault: false,
  },
  {
    id: 3,
    name: 'UX/UI Designers',
    description: 'Creative professionals with Figma skills',
    filters: ['Figma', 'Design', 'UI/UX', 'Portfolio'],
    candidateCount: 31,
    lastUsed: '3 days ago',
    isDefault: false,
  },
  {
    id: 4,
    name: 'Full Stack Python',
    description: 'Python developers with full stack experience',
    filters: ['Python', 'Django', 'React', '4+ years'],
    candidateCount: 15,
    lastUsed: '5 days ago',
    isDefault: false,
  },
];

export function SavedViews({ onNavigateToScreen, onOpenModal }: SavedViewsProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredViews = savedViews.filter(view =>
    view.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    view.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    view.filters.some(filter => filter.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleViewClick = (viewId: number) => {
    // Apply the saved view filters and navigate to candidates
    onNavigateToScreen('candidates');
  };

  const handleCreateView = () => {
    // Open create view modal or navigate to candidates with filter creation
    onNavigateToScreen('candidates');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#2E5E47] mb-2">Saved Views</h1>
          <p className="text-gray-600">Quick access to your frequently used candidate filters and searches.</p>
        </div>
        <Button 
          className="bg-[#2E5E47] hover:bg-[#2E5E47]/90"
          onClick={handleCreateView}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create View
        </Button>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search saved views..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Saved Views Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredViews.map((view) => (
          <Card key={view.id} className="backdrop-blur-md bg-white/80 border border-white/20 shadow-lg hover:shadow-xl transition-all cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <button
                      onClick={() => handleViewClick(view.id)}
                      className="text-left"
                    >
                      <h3 className="font-semibold group-hover:text-[#2E5E47] transition-colors">{view.name}</h3>
                    </button>
                    {view.isDefault && (
                      <Badge className="bg-[#E4B063] text-white text-xs">Default</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{view.description}</p>
                  
                  {/* Filter Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {view.filters.slice(0, 3).map((filter) => (
                      <Badge key={filter} variant="secondary" className="text-xs">
                        {filter}
                      </Badge>
                    ))}
                    {view.filters.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{view.filters.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{view.candidateCount} candidates</span>
                    <span>Used {view.lastUsed}</span>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleViewClick(view.id)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Candidates
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit View
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete View
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full group-hover:bg-[#2E5E47] group-hover:text-white transition-colors"
                onClick={() => handleViewClick(view.id)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredViews.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Eye className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No saved views found</h3>
          <p className="text-gray-600 mb-4">
            Create your first saved view to quickly filter candidates.
          </p>
          <Button onClick={handleCreateView} className="bg-[#2E5E47] hover:bg-[#2E5E47]/90">
            <Plus className="h-4 w-4 mr-2" />
            Create First View
          </Button>
        </div>
      )}
    </div>
  );
}