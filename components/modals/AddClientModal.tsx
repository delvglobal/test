import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { toast } from 'sonner';

interface AddClientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClientAdded?: (client: any) => void;
}

const industries = [
  'Technology',
  'Financial Services',
  'Healthcare',
  'Energy & Utilities',
  'Retail & E-commerce',
  'Manufacturing',
  'Consulting',
  'Media & Entertainment',
  'Education',
  'Government'
];

const companySizes = [
  '1-10',
  '11-50',
  '51-100',
  '101-200',
  '201-500',
  '501-1000',
  '1001-5000',
  '5000+'
];

const clientStatuses = [
  { value: 'trial', label: 'Trial' },
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
  { value: 'inactive', label: 'Inactive' }
];

const clientTiers = [
  { value: 'startup', label: 'Startup' },
  { value: 'growth', label: 'Growth' },
  { value: 'enterprise', label: 'Enterprise' }
];

export function AddClientModal({ open, onOpenChange, onClientAdded }: AddClientModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    size: '',
    location: '',
    status: 'trial',
    tier: 'startup',
    primaryContact: {
      name: '',
      title: '',
      email: '',
      phone: ''
    },
    monthlySubscription: '',
    notes: '',
    satisfactionScore: '5.0'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.industry || !formData.primaryContact.name) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newClient = {
      id: `client_${Date.now()}`,
      ...formData,
      monthlySubscription: parseInt(formData.monthlySubscription) || 0,
      satisfactionScore: parseFloat(formData.satisfactionScore) || 5.0,
      placementsFilled: 0,
      placementsTotal: 0,
      activeRequirements: 0,
      joinDate: new Date().toISOString(),
      lastContact: new Date().toISOString(),
      nextRenewal: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      paymentMethod: 'Credit Card',
      tags: []
    };

    onClientAdded?.(newClient);
    toast.success('Client added successfully!');
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: '',
      industry: '',
      size: '',
      location: '',
      status: 'trial',
      tier: 'startup',
      primaryContact: {
        name: '',
        title: '',
        email: '',
        phone: ''
      },
      monthlySubscription: '',
      notes: '',
      satisfactionScore: '5.0'
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>
            Add a new client to your portfolio and start tracking their hiring progress.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Company Name *</Label>
              <Input
                id="name"
                placeholder="e.g. TechCorp Solutions"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="industry">Industry *</Label>
              <Select 
                value={formData.industry} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map(industry => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="size">Company Size</Label>
              <Select 
                value={formData.size} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, size: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {companySizes.map(size => (
                    <SelectItem key={size} value={size}>
                      {size} employees
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g. San Francisco, CA"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {clientStatuses.map(status => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tier">Tier</Label>
              <Select 
                value={formData.tier} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, tier: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {clientTiers.map(tier => (
                    <SelectItem key={tier.value} value={tier.value}>
                      {tier.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h4 className="font-medium">Primary Contact *</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Name *</Label>
                <Input
                  id="contactName"
                  placeholder="e.g. Sarah Johnson"
                  value={formData.primaryContact.name}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    primaryContact: { ...prev.primaryContact, name: e.target.value }
                  }))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactTitle">Title</Label>
                <Input
                  id="contactTitle"
                  placeholder="e.g. VP of Engineering"
                  value={formData.primaryContact.title}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    primaryContact: { ...prev.primaryContact, title: e.target.value }
                  }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="contact@company.com"
                  value={formData.primaryContact.email}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    primaryContact: { ...prev.primaryContact, email: e.target.value }
                  }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Phone</Label>
                <Input
                  id="contactPhone"
                  placeholder="+1 (555) 123-4567"
                  value={formData.primaryContact.phone}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    primaryContact: { ...prev.primaryContact, phone: e.target.value }
                  }))}
                />
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subscription">Monthly Subscription ($)</Label>
              <Input
                id="subscription"
                type="number"
                placeholder="0"
                value={formData.monthlySubscription}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  monthlySubscription: e.target.value 
                }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="satisfaction">Satisfaction Score (1-5)</Label>
              <Input
                id="satisfaction"
                type="number"
                min="1"
                max="5"
                step="0.1"
                placeholder="5.0"
                value={formData.satisfactionScore}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  satisfactionScore: e.target.value 
                }))}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes about this client..."
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
            />
          </div>
          
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#2E5E47] hover:bg-[#2E5E47]/90">
              Add Client
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}