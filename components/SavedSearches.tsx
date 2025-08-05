import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Plus, Search, Edit, Trash2, Play } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const savedSearches = [
  {
    id: 1,
    name: 'Senior Frontend Developers',
    description: 'React + TypeScript, 5+ years, $80+/hr',
    filters: {
      position: 'Frontend Developer',
      experience: [5, 15],
      hourlyRate: [80, 150],
      skills: ['React', 'TypeScript'],
    },
    resultsCount: 47,
    lastRun: '2 hours ago',
    created: '2024-01-15',
  },
  {
    id: 2,
    name: 'DevOps Engineers - US',
    description: 'AWS/Docker expertise, US timezone',
    filters: {
      position: 'DevOps Engineer',
      experience: [3, 10],
      skills: ['AWS', 'Docker', 'Kubernetes'],
      timezone: 'US',
    },
    resultsCount: 23,
    lastRun: '1 day ago',
    created: '2024-01-10',
  },
  {
    id: 3,
    name: 'UX Designers - Remote',
    description: 'Figma experts, available for remote work',
    filters: {
      position: 'UX Designer',
      experience: [2, 8],
      tools: ['Figma', 'Adobe XD'],
      availability: 'Available',
    },
    resultsCount: 31,
    lastRun: '3 days ago',
    created: '2024-01-08',
  },
  {
    id: 4,
    name: 'Full Stack - JavaScript',
    description: 'Node.js + React, mid-level',
    filters: {
      position: 'Full Stack Developer',
      experience: [3, 7],
      skills: ['JavaScript', 'Node.js', 'React'],
    },
    resultsCount: 67,
    lastRun: '1 week ago',
    created: '2024-01-05',
  },
];

export function SavedSearches() {
  const [searches, setSearches] = useState(savedSearches);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newSearchName, setNewSearchName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleRunSearch = (search: typeof savedSearches[0]) => {
    toast.success(`Running search: ${search.name}`);
    // Here you would typically navigate to the candidates page with the filters applied
  };

  const handleDeleteSearch = (id: number) => {
    setSearches(searches.filter(search => search.id !== id));
    toast.success('Search deleted successfully');
  };

  const handleCreateSearch = () => {
    if (!newSearchName.trim()) return;
    
    const newSearch = {
      id: Date.now(),
      name: newSearchName,
      description: 'Custom search filters',
      filters: {},
      resultsCount: 0,
      lastRun: 'Never',
      created: new Date().toISOString().split('T')[0],
    };
    
    setSearches([newSearch, ...searches]);
    setNewSearchName('');
    setIsCreateDialogOpen(false);
    toast.success('Search saved successfully');
  };

  const filteredSearches = searches.filter(search =>
    search.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    search.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-[#2E5E47] mb-2">Saved Searches</h1>
          <p className="text-gray-600">Manage your saved candidate search filters and run them anytime.</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#2E5E47] hover:bg-[#2E5E47]/90">
              <Plus className="h-4 w-4 mr-2" />
              New Search
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Saved Search</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="search-name">Search Name</Label>
                <Input
                  id="search-name"
                  placeholder="Enter search name..."
                  value={newSearchName}
                  onChange={(e) => setNewSearchName(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateSearch} className="bg-[#2E5E47] hover:bg-[#2E5E47]/90">
                  Save Search
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search Bar */}
      <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-lg">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search saved searches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Saved Searches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSearches.map((search) => (
          <Card key={search.id} className="backdrop-blur-md bg-white/80 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-200">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg">{search.name}</span>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteSearch(search.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">{search.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Results:</span>
                  <Badge variant="secondary">{search.resultsCount} candidates</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last run:</span>
                  <span>{search.lastRun}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Created:</span>
                  <span>{search.created}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button 
                  onClick={() => handleRunSearch(search)}
                  className="w-full bg-[#2E5E47] hover:bg-[#2E5E47]/90"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Run Search
                </Button>
                <Button variant="outline" className="w-full">
                  View Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSearches.length === 0 && (
        <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-lg">
          <CardContent className="p-8 text-center">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg mb-2">No saved searches found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Try adjusting your search terms.' : 'Create your first saved search to get started.'}
            </p>
            {!searchTerm && (
              <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-[#2E5E47] hover:bg-[#2E5E47]/90">
                <Plus className="h-4 w-4 mr-2" />
                Create Saved Search
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}