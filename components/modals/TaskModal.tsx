import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Plus, 
  Calendar as CalendarIcon, 
  Clock, 
  X, 
  AlertCircle,
  CheckCircle,
  Filter,
  Search,
  Trash2
} from 'lucide-react';
import { cn } from '../ui/utils';
import { toast } from 'sonner@2.0.3';

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  completed: boolean;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  category: 'interview' | 'follow_up' | 'review' | 'client' | 'admin' | 'other';
  createdAt: string;
}

interface TaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tasks: Task[];
  onTaskUpdate: (tasks: Task[]) => void;
}

const priorityColors = {
  urgent: 'bg-red-100 text-red-800 border-red-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  low: 'bg-green-100 text-green-800 border-green-200'
};

const categoryColors = {
  interview: 'bg-blue-100 text-blue-800 border-blue-200',
  follow_up: 'bg-purple-100 text-purple-800 border-purple-200',
  review: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  client: 'bg-pink-100 text-pink-800 border-pink-200',
  admin: 'bg-gray-100 text-gray-800 border-gray-200',
  other: 'bg-gray-100 text-gray-800 border-gray-200'
};

// Simple date formatter function
const formatDate = (date: Date | string): string => {
  if (typeof date === 'string') {
    try {
      date = new Date(date);
    } catch {
      return date;
    }
  }
  
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const formatDateTime = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export function TaskModal({ open, onOpenChange, tasks, onTaskUpdate }: TaskModalProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Add task form state
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: new Date(),
    priority: 'medium' as const,
    category: 'other' as const
  });

  const handleTaskToggle = (taskId: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    onTaskUpdate(updatedTasks);
  };

  const handleTaskDelete = (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    onTaskUpdate(updatedTasks);
    toast.success('Task deleted successfully');
  };

  const handleAddTask = () => {
    if (!newTask.title.trim()) {
      toast.error('Task title is required');
      return;
    }

    // Create due date string
    const dueDateStr = newTask.dueDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      dueDate: dueDateStr,
      completed: false,
      priority: newTask.priority,
      category: newTask.category,
      createdAt: new Date().toISOString()
    };

    onTaskUpdate([...tasks, task]);
    setNewTask({
      title: '',
      description: '',
      dueDate: new Date(),
      priority: 'medium',
      category: 'other'
    });
    setShowAddForm(false);
    toast.success('Task added successfully');
  };

  // Filter tasks based on search and filters
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'pending' && !task.completed) ||
                      (activeTab === 'completed' && task.completed);
    
    return matchesSearch && matchesPriority && matchesCategory && matchesTab;
  });

  const taskCounts = {
    all: tasks.length,
    pending: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-[#2E5E47]" />
            Task Management
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {tasks.filter(t => !t.completed).length}/{tasks.length}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        {/* Controls */}
        <div className="flex flex-col gap-4 pb-4 border-b">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={filterPriority} onValueChange={setFilterPriority}>
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

              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="follow_up">Follow Up</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="client">Client</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Add Task Button */}
          <div className="flex justify-between items-center">
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-[#2E5E47] hover:bg-[#2E5E47]/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
            
            <div className="text-sm text-gray-500">
              {filteredTasks.length} of {tasks.length} tasks
            </div>
          </div>
        </div>

        {/* Add Task Form */}
        {showAddForm && (
          <div className="p-4 bg-gray-50 rounded-lg space-y-4">
            <h3 className="font-medium text-gray-900">Add New Task</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Task title *"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>
              
              <div className="md:col-span-2">
                <Textarea
                  placeholder="Description (optional)"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  rows={2}
                />
              </div>
              
              <Select value={newTask.priority} onValueChange={(value: any) => setNewTask({ ...newTask, priority: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">🔴 Urgent</SelectItem>
                  <SelectItem value="high">🟠 High</SelectItem>
                  <SelectItem value="medium">🟡 Medium</SelectItem>
                  <SelectItem value="low">🟢 Low</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={newTask.category} onValueChange={(value: any) => setNewTask({ ...newTask, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="interview">📅 Interview</SelectItem>
                  <SelectItem value="follow_up">📞 Follow Up</SelectItem>
                  <SelectItem value="review">📋 Review</SelectItem>
                  <SelectItem value="client">🏢 Client</SelectItem>
                  <SelectItem value="admin">⚙️ Admin</SelectItem>
                  <SelectItem value="other">📄 Other</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="md:col-span-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {formatDateTime(newTask.dueDate)}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newTask.dueDate}
                      onSelect={(date) => date && setNewTask({ ...newTask, dueDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTask} className="bg-[#2E5E47] hover:bg-[#2E5E47]/90">
                Add Task
              </Button>
            </div>
          </div>
        )}

        {/* Task Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">
              All ({taskCounts.all})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({taskCounts.pending})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({taskCounts.completed})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="flex-1 mt-4 overflow-y-auto">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">
                  {searchTerm || filterPriority !== 'all' || filterCategory !== 'all' 
                    ? 'No tasks match your filters' 
                    : 'No tasks found'}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  {!showAddForm && 'Click "Add Task" to create your first task'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => handleTaskToggle(task.id)}
                      className="h-4 w-4 mt-1"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className={`text-sm font-medium ${
                          task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                        }`}>
                          {task.title}
                        </h4>
                        
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Badge variant="outline" className={priorityColors[task.priority]}>
                            {task.priority}
                          </Badge>
                          <Badge variant="outline" className={categoryColors[task.category]}>
                            {task.category}
                          </Badge>
                          {task.completed && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleTaskDelete(task.id)}
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      {task.description && (
                        <p className={`text-xs mb-2 ${
                          task.completed ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {task.description}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Due: {task.dueDate}
                        </span>
                        <span>
                          Created: {formatDate(task.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}