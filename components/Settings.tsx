import React, { useState } from 'react';
import { Settings as SettingsIcon, Upload, Image, Palette, Shield, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import type { ScreenType, ModalType } from '../types';

interface SettingsProps {
  onNavigateToScreen: (screen: ScreenType, candidateId?: string) => void;
  onOpenModal: (modal: ModalType) => void;
}

export function Settings({ onNavigateToScreen, onOpenModal }: SettingsProps) {
  const [settings, setSettings] = useState({
    companyName: 'DELV Global',
    primaryColor: '#2E5E47',
    secondaryColor: '#E4B063',
    logo: null as File | null,
    verificationEnabled: true,
    autoVerification: false,
    requireVerification: true,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('File size must be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      setSettings(prev => ({ ...prev, logo: file }));
      toast.success('Logo uploaded successfully');
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Settings saved successfully!', {
      description: 'Your organization settings have been updated.'
    });
    
    setIsLoading(false);
  };

  const handleColorChange = (colorType: 'primary' | 'secondary', color: string) => {
    setSettings(prev => ({
      ...prev,
      [colorType === 'primary' ? 'primaryColor' : 'secondaryColor']: color
    }));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#2E5E47] mb-2">Settings</h1>
          <p className="text-gray-600">Configure your organization preferences and verification settings.</p>
        </div>
        <Button 
          onClick={handleSave}
          disabled={isLoading}
          className="bg-[#2E5E47] hover:bg-[#2E5E47]/90"
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Branding Settings */}
        <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-[#2E5E47]" />
              Branding
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor="companyName">Organization Name</Label>
              <Input
                id="companyName"
                value={settings.companyName}
                onChange={(e) => setSettings(prev => ({ ...prev, companyName: e.target.value }))}
                placeholder="Enter your organization name"
              />
            </div>

            {/* Logo Upload */}
            <div className="space-y-3">
              <Label>Logo</Label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                  {settings.logo ? (
                    <Image className="h-8 w-8 text-gray-400" />
                  ) : (
                    <div className="w-12 h-8 bg-gradient-to-br from-[#2E5E47] to-[#2E5E47]/80 rounded flex items-center justify-center">
                      <span className="text-white font-bold text-xs">DELV</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="relative">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Logo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </Button>
                    {settings.logo && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        <Check className="h-3 w-3 mr-1" />
                        {settings.logo.name}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG or SVG. Max file size 5MB. Recommended: 200x80px
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Color Scheme */}
            <div className="space-y-4">
              <Label>Brand Colors</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor" className="text-sm">Primary Color</Label>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg border-2 border-gray-200 flex-shrink-0"
                      style={{ backgroundColor: settings.primaryColor }}
                    />
                    <Input
                      id="primaryColor"
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      className="w-20 h-10 p-1 border-0"
                    />
                    <Input
                      value={settings.primaryColor}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      placeholder="#2E5E47"
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor" className="text-sm">Secondary Color</Label>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg border-2 border-gray-200 flex-shrink-0"
                      style={{ backgroundColor: settings.secondaryColor }}
                    />
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) => handleColorChange('secondary', e.target.value)}
                      className="w-20 h-10 p-1 border-0"
                    />
                    <Input
                      value={settings.secondaryColor}
                      onChange={(e) => handleColorChange('secondary', e.target.value)}
                      placeholder="#E4B063"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Color Preview */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <Label className="text-sm text-gray-600 mb-2 block">Preview</Label>
              <div className="flex items-center gap-4">
                <Button 
                  style={{ backgroundColor: settings.primaryColor }}
                  className="text-white hover:opacity-90"
                >
                  Primary Button
                </Button>
                <Button 
                  variant="outline"
                  style={{ 
                    borderColor: settings.secondaryColor,
                    color: settings.secondaryColor 
                  }}
                >
                  Secondary Button
                </Button>
                <div 
                  className="px-3 py-1 rounded text-white text-sm"
                  style={{ backgroundColor: settings.secondaryColor }}
                >
                  Accent Badge
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Settings */}
        <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#2E5E47]" />
              Candidate Verification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Enable Verification System</Label>
                <p className="text-sm text-gray-600">
                  Allow candidates to be marked as verified or unverified in the system
                </p>
              </div>
              <Switch
                checked={settings.verificationEnabled}
                onCheckedChange={(checked) => 
                  setSettings(prev => ({ ...prev, verificationEnabled: checked }))
                }
              />
            </div>

            {settings.verificationEnabled && (
              <>
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base font-medium">Automatic Verification</Label>
                      <p className="text-sm text-gray-600">
                        Automatically verify candidates when they complete certain actions
                      </p>
                    </div>
                    <Switch
                      checked={settings.autoVerification}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, autoVerification: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-base font-medium">Require Verification for Hiring</Label>
                      <p className="text-sm text-gray-600">
                        Only allow verified candidates to be moved to final hiring stages
                      </p>
                    </div>
                    <Switch
                      checked={settings.requireVerification}
                      onCheckedChange={(checked) => 
                        setSettings(prev => ({ ...prev, requireVerification: checked }))
                      }
                    />
                  </div>
                </div>

                {/* Verification Status */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Verification Status</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Verification is currently <strong>enabled</strong>. Candidates will be categorized as verified or unverified based on their documentation and background checks.
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-green-700">Verified: Complete documentation</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          <span className="text-orange-700">Unverified: Pending documentation</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-[#2E5E47]" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="justify-start h-auto p-4"
                onClick={() => onOpenModal('keyboard-shortcuts')}
              >
                <div className="text-left">
                  <div className="font-medium">Keyboard Shortcuts</div>
                  <div className="text-xs text-gray-500 mt-1">View available shortcuts</div>
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                className="justify-start h-auto p-4"
              >
                <div className="text-left">
                  <div className="font-medium">Export Data</div>
                  <div className="text-xs text-gray-500 mt-1">Download candidate data</div>
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                className="justify-start h-auto p-4"
              >
                <div className="text-left">
                  <div className="font-medium">System Backup</div>
                  <div className="text-xs text-gray-500 mt-1">Backup your settings</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}