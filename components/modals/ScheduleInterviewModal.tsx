import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { LoadingButton } from '../ui/loading-button';
import { Calendar, Clock, Users, Video } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ScheduleInterviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidateName?: string;
  candidateEmail?: string;
}

const interviewTypes = [
  { value: 'phone', label: 'Phone Screening', icon: '📞', duration: '30 min' },
  { value: 'video', label: 'Video Interview', icon: '📹', duration: '60 min' },
  { value: 'technical', label: 'Technical Interview', icon: '💻', duration: '90 min' },
  { value: 'panel', label: 'Panel Interview', icon: '👥', duration: '60 min' },
  { value: 'onsite', label: 'On-site Interview', icon: '🏢', duration: '2-3 hours' },
];

const interviewers = [
  'John Smith (Engineering Manager)',
  'Sarah Wilson (Senior Developer)',
  'Mike Chen (Tech Lead)',
  'Lisa Rodriguez (HR Manager)',
  'David Kim (Product Manager)',
];

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM'
];

export function ScheduleInterviewModal({ 
  open, 
  onOpenChange, 
  candidateName = '',
  candidateEmail = ''
}: ScheduleInterviewModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    date: '',
    time: '',
    duration: '60',
    interviewers: [] as string[],
    location: '',
    meetingLink: '',
    notes: '',
    sendCalendarInvite: true,
    sendReminder: true,
    requireConfirmation: true,
    recordInterview: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success('Interview scheduled successfully!', {
      description: `Interview with ${candidateName} has been scheduled for ${formData.date} at ${formData.time}.`
    });

    setLoading(false);
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      type: '',
      date: '',
      time: '',
      duration: '60',
      interviewers: [],
      location: '',
      meetingLink: '',
      notes: '',
      sendCalendarInvite: true,
      sendReminder: true,
      requireConfirmation: true,
      recordInterview: false
    });
  };

  const toggleInterviewer = (interviewer: string) => {
    setFormData(prev => ({
      ...prev,
      interviewers: prev.interviewers.includes(interviewer)
        ? prev.interviewers.filter(i => i !== interviewer)
        : [...prev.interviewers, interviewer]
    }));
  };

  const selectedInterviewType = interviewTypes.find(type => type.value === formData.type);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-[#2E5E47]" />
            Schedule Interview
          </DialogTitle>
          <DialogDescription>
            {candidateName ? (
              <>Schedule an interview with <strong>{candidateName}</strong> ({candidateEmail})</>
            ) : (
              'Schedule a new interview with the selected candidate.'
            )}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Interview Type */}
          <div className="space-y-3">
            <Label>Interview Type *</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {interviewTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
                  className={`p-4 border rounded-lg text-left transition-all hover:border-[#2E5E47] ${
                    formData.type === type.value 
                      ? 'border-[#2E5E47] bg-[#2E5E47]/5' 
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{type.icon}</span>
                    <span className="text-xs text-gray-500">{type.duration}</span>
                  </div>
                  <h4 className="font-medium">{type.label}</h4>
                </button>
              ))}
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Select value={formData.time} onValueChange={(value) => 
                setFormData(prev => ({ ...prev, time: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map(time => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="60"
                min="15"
                max="240"
                step="15"
              />
            </div>
          </div>

          {/* Interviewers */}
          <div className="space-y-3">
            <Label>Interviewers *</Label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {interviewers.map((interviewer) => (
                <div key={interviewer} className="flex items-center space-x-2">
                  <Checkbox
                    id={interviewer}
                    checked={formData.interviewers.includes(interviewer)}
                    onCheckedChange={() => toggleInterviewer(interviewer)}
                  />
                  <Label htmlFor={interviewer} className="text-sm cursor-pointer">
                    {interviewer}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Location/Meeting Details */}
          {(formData.type === 'video' || formData.type === 'panel') && (
            <div className="space-y-2">
              <Label htmlFor="meetingLink">Video Meeting Link</Label>
              <div className="flex">
                <Input
                  id="meetingLink"
                  value={formData.meetingLink}
                  onChange={(e) => setFormData(prev => ({ ...prev, meetingLink: e.target.value }))}
                  placeholder="https://zoom.us/j/..."
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  className="ml-2"
                  onClick={() => setFormData(prev => ({ ...prev, meetingLink: 'https://zoom.us/j/generated-link' }))}
                >
                  <Video className="h-4 w-4 mr-2" />
                  Generate
                </Button>
              </div>
            </div>
          )}

          {(formData.type === 'onsite') && (
            <div className="space-y-2">
              <Label htmlFor="location">Meeting Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Conference Room A, 123 Main St, San Francisco, CA"
              />
            </div>
          )}

          {/* Interview Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Interview Notes & Agenda</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Interview agenda, topics to cover, preparation notes..."
              rows={4}
            />
          </div>

          {/* Options */}
          <div className="space-y-3">
            <Label>Interview Options</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sendCalendarInvite"
                  checked={formData.sendCalendarInvite}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, sendCalendarInvite: !!checked }))
                  }
                />
                <Label htmlFor="sendCalendarInvite" className="text-sm">
                  Send calendar invite to all participants
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sendReminder"
                  checked={formData.sendReminder}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, sendReminder: !!checked }))
                  }
                />
                <Label htmlFor="sendReminder" className="text-sm">
                  Send reminder 24 hours before interview
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="requireConfirmation"
                  checked={formData.requireConfirmation}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, requireConfirmation: !!checked }))
                  }
                />
                <Label htmlFor="requireConfirmation" className="text-sm">
                  Require candidate confirmation
                </Label>
              </div>
              {formData.type === 'video' && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="recordInterview"
                    checked={formData.recordInterview}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, recordInterview: !!checked }))
                    }
                  />
                  <Label htmlFor="recordInterview" className="text-sm">
                    Record interview session
                  </Label>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <LoadingButton 
              type="submit" 
              loading={loading}
              loadingText="Scheduling..."
              className="bg-[#2E5E47] hover:bg-[#2E5E47]/90"
            >
              Schedule Interview
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}