import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { LoadingButton } from '../ui/loading-button';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import { 
  Globe,
  Clock,
  DollarSign,
  Calendar,
  MapPin,
  Languages,
  Settings,
  Save,
  X
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface RegionalSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock data
const regionalData = {
  language: 'en-US',
  timezone: 'America/Los_Angeles',
  currency: 'USD',
  dateFormat: 'MM/DD/YYYY',
  timeFormat: '12-hour',
  weekStart: 'sunday',
  numberFormat: 'en-US',
  country: 'US',
  region: 'North America'
};

const localizationSettings = {
  autoDetectLanguage: true,
  autoDetectTimezone: true,
  showLocalizedContent: true,
  translateEmails: false,
  regionalCompliance: true
};

const supportedLanguages = [
  { code: 'en-US', name: 'English (US)', native: 'English' },
  { code: 'en-GB', name: 'English (UK)', native: 'English' },
  { code: 'es-ES', name: 'Spanish (Spain)', native: 'Español' },
  { code: 'fr-FR', name: 'French (France)', native: 'Français' },
  { code: 'de-DE', name: 'German', native: 'Deutsch' },
  { code: 'it-IT', name: 'Italian', native: 'Italiano' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)', native: 'Português' },
  { code: 'ja-JP', name: 'Japanese', native: '日本語' },
  { code: 'ko-KR', name: 'Korean', native: '한국어' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', native: '中文' }
];

const timezones = [
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)', offset: 'UTC-8' },
  { value: 'America/Denver', label: 'Mountain Time (MT)', offset: 'UTC-7' },
  { value: 'America/Chicago', label: 'Central Time (CT)', offset: 'UTC-6' },
  { value: 'America/New_York', label: 'Eastern Time (ET)', offset: 'UTC-5' },
  { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)', offset: 'UTC+0' },
  { value: 'Europe/Paris', label: 'Central European Time (CET)', offset: 'UTC+1' },
  { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)', offset: 'UTC+9' },
  { value: 'Asia/Shanghai', label: 'China Standard Time (CST)', offset: 'UTC+8' }
];

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' }
];

export function RegionalSettingsModal({ open, onOpenChange }: RegionalSettingsModalProps) {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('language');
  const [settings, setSettings] = useState(regionalData);
  const [localization, setLocalization] = useState(localizationSettings);

  const handleSave = async (section: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`${section} settings saved`);
    } catch (error) {
      toast.error(`Failed to save ${section.toLowerCase()} settings`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[90vh] p-0 gap-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-gray-600" />
              <div>
                <DialogTitle className="text-lg">Regional Settings</DialogTitle>
                <DialogDescription className="text-sm text-gray-600">
                  Configure language, timezone, currency, and localization preferences.
                </DialogDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 flex flex-col min-h-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
            {/* Tabs */}
            <div className="px-6 py-2 border-b shrink-0">
              <ScrollArea orientation="horizontal" className="w-full whitespace-nowrap">
                <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg">
                  {[
                    { id: 'language', label: 'Language' },
                    { id: 'timezone', label: 'Timezone' },
                    { id: 'currency', label: 'Currency' },
                    { id: 'formats', label: 'Formats' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 min-h-0">
              <ScrollArea className="h-full">
                <div className="p-6 space-y-6">
                  {/* Language Tab */}
                  <TabsContent value="language" className="mt-0">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Language Preferences</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ScrollArea className="h-80">
                            <div className="space-y-4 pr-3">
                              <div className="space-y-2">
                                <Label>Primary Language</Label>
                                <Select value={settings.language} onValueChange={(value) => setSettings(prev => ({ ...prev, language: value }))}>
                                  <SelectTrigger><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    {supportedLanguages.map((lang) => (
                                      <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="flex items-center justify-between">
                                <div>
                                  <Label>Auto-detect Language</Label>
                                  <p className="text-sm text-gray-600">Detect from browser</p>
                                </div>
                                <Switch checked={localization.autoDetectLanguage} onCheckedChange={(checked) => setLocalization(prev => ({ ...prev, autoDetectLanguage: checked }))} />
                              </div>
                            </div>
                          </ScrollArea>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="flex justify-end">
                      <LoadingButton onClick={() => handleSave('Language')} loading={loading} className="bg-[#2E5E47]">Save Changes</LoadingButton>
                    </div>
                  </TabsContent>

                  {/* Timezone Tab */}
                  <TabsContent value="timezone" className="mt-0">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Timezone Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ScrollArea className="h-80">
                            <div className="space-y-4 pr-3">
                              <div className="space-y-2">
                                <Label>Primary Timezone</Label>
                                <Select value={settings.timezone} onValueChange={(value) => setSettings(prev => ({ ...prev, timezone: value }))}>
                                  <SelectTrigger><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    {timezones.map((tz) => (
                                      <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </ScrollArea>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="flex justify-end">
                      <LoadingButton onClick={() => handleSave('Timezone')} loading={loading} className="bg-[#2E5E47]">Save Changes</LoadingButton>
                    </div>
                  </TabsContent>

                  {/* Currency Tab */}
                  <TabsContent value="currency" className="mt-0">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Currency Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ScrollArea className="h-80">
                            <div className="space-y-4 pr-3">
                              <div className="space-y-2">
                                <Label>Primary Currency</Label>
                                <Select value={settings.currency} onValueChange={(value) => setSettings(prev => ({ ...prev, currency: value }))}>
                                  <SelectTrigger><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    {currencies.map((curr) => (
                                      <SelectItem key={curr.code} value={curr.code}>{curr.name} ({curr.symbol})</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </ScrollArea>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="flex justify-end">
                      <LoadingButton onClick={() => handleSave('Currency')} loading={loading} className="bg-[#2E5E47]">Save Changes</LoadingButton>
                    </div>
                  </TabsContent>

                  {/* Formats Tab */}
                  <TabsContent value="formats" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Date & Time Formats</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-80">
                          <div className="space-y-4 pr-3">
                            <div className="space-y-2">
                              <Label>Date Format</Label>
                              <Select value={settings.dateFormat} onValueChange={(value) => setSettings(prev => ({ ...prev, dateFormat: value }))}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                    <div className="flex justify-end">
                      <LoadingButton onClick={() => handleSave('Formats')} loading={loading} className="bg-[#2E5E47]">Save Changes</LoadingButton>
                    </div>
                  </TabsContent>
                </div>
              </ScrollArea>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}