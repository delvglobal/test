import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { 
  Search, 
  Plus, 
  Filter, 
  Calendar, 
  User, 
  Settings, 
  HelpCircle,
  Command,
  Option,
  Key
} from 'lucide-react';

interface KeyboardShortcutsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const shortcutSections = [
  {
    title: 'Navigation',
    icon: Search,
    shortcuts: [
      { keys: ['Ctrl', 'K'], description: 'Global search' },
      { keys: ['Ctrl', 'D'], description: 'Go to Dashboard' },
      { keys: ['Ctrl', 'C'], description: 'Go to Candidates' },
      { keys: ['Ctrl', 'P'], description: 'Go to Pipeline' },
      { keys: ['Ctrl', 'S'], description: 'Go to Shortlists' },
      { keys: ['Ctrl', 'R'], description: 'Go to Reports' },
    ]
  },
  {
    title: 'Actions',
    icon: Plus,
    shortcuts: [
      { keys: ['Ctrl', 'N'], description: 'Add new candidate' },
      { keys: ['Ctrl', 'Shift', 'I'], description: 'Schedule interview' },
      { keys: ['Ctrl', 'Shift', 'S'], description: 'Create shortlist' },
      { keys: ['Ctrl', 'E'], description: 'Export data' },
      { keys: ['Ctrl', 'U'], description: 'Bulk import' },
    ]
  },
  {
    title: 'Filtering & Search',
    icon: Filter,
    shortcuts: [
      { keys: ['F'], description: 'Focus filter panel' },
      { keys: ['Ctrl', 'F'], description: 'Quick filter' },
      { keys: ['Ctrl', 'Shift', 'F'], description: 'Advanced filters' },
      { keys: ['Esc'], description: 'Clear filters' },
      { keys: ['Ctrl', 'L'], description: 'Load saved view' },
    ]
  },
  {
    title: 'General',
    icon: Settings,
    shortcuts: [
      { keys: ['?'], description: 'Show keyboard shortcuts' },
      { keys: ['Ctrl', ','], description: 'Open preferences' },
      { keys: ['Ctrl', 'Shift', 'P'], description: 'Command palette' },
      { keys: ['Ctrl', 'Z'], description: 'Undo last action' },
      { keys: ['Ctrl', 'Shift', 'Z'], description: 'Redo last action' },
    ]
  }
];

function ShortcutKey({ shortcut }: { shortcut: string }) {
  const getKeyDisplay = (key: string) => {
    switch (key.toLowerCase()) {
      case 'ctrl':
        return '⌘';
      case 'shift':
        return '⇧';
      case 'alt':
        return '⌥';
      case 'enter':
        return '↵';
      case 'esc':
        return '⎋';
      case 'tab':
        return '⇥';
      case 'space':
        return '␣';
      default:
        return key;
    }
  };

  return (
    <Badge 
      variant="outline" 
      className="px-2 py-1 font-mono text-xs bg-gray-100 border-gray-300"
    >
      {getKeyDisplay(shortcut)}
    </Badge>
  );
}

export function KeyboardShortcutsModal({ open, onOpenChange }: KeyboardShortcutsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Key className="h-5 w-5 mr-2 text-[#2E5E47]" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription>
            Speed up your workflow with these keyboard shortcuts. Press any key combination to trigger the action.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto max-h-[600px] pr-2">
          {shortcutSections.map((section, sectionIndex) => {
            const Icon = section.icon;
            return (
              <Card key={sectionIndex} className="h-fit">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <Icon className="h-5 w-5 mr-2 text-[#2E5E47]" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {section.shortcuts.map((shortcut, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <span className="text-sm font-medium text-gray-700">
                        {shortcut.description}
                      </span>
                      <div className="flex items-center space-x-1">
                        {shortcut.keys.map((key, keyIndex) => (
                          <React.Fragment key={keyIndex}>
                            <ShortcutKey shortcut={key} />
                            {keyIndex < shortcut.keys.length - 1 && (
                              <span className="text-gray-400 mx-1">+</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Separator />

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <HelpCircle className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Pro Tips</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Most shortcuts work from anywhere in the application</li>
                <li>• Hold <ShortcutKey shortcut="Ctrl" /> while clicking links to open in new tab</li>
                <li>• Use <ShortcutKey shortcut="Tab" /> to navigate between form fields</li>
                <li>• Press <ShortcutKey shortcut="?" /> anytime to see this dialog</li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}