import React, { useState } from 'react';
import { ArrowLeft, Star, Share, MessageSquare, Calendar, MapPin, DollarSign, Clock, Monitor, Award, Languages, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import type { ScreenType, ModalType } from '../types';

interface CandidateDetailProps {
  candidateId?: string;
  onNavigateToScreen: (screen: ScreenType, candidateId?: string) => void;
  onOpenModal: (modal: ModalType) => void;
}

const candidateData = {
  id: 1,
  name: 'Sarah Chen',
  title: 'Senior Frontend Developer',
  location: 'San Francisco, CA',
  timezone: 'PST (UTC-8)',
  hourlyRate: 85,
  experience: 6,
  matchScore: 94,
  availability: 'Available',
  avatar: '/placeholder-avatar.jpg',
  summary: 'Passionate frontend developer with 6+ years of experience building scalable web applications. Expertise in React, TypeScript, and modern development workflows. Strong advocate for clean code and user-centered design.',
  skills: [
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'JavaScript', level: 95 },
    { name: 'CSS/SCSS', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'GraphQL', level: 75 },
  ],
  tools: ['VS Code', 'Git', 'Docker', 'Webpack', 'Jest', 'Figma'],
  languages: [
    { name: 'English', level: 'Native' },
    { name: 'Mandarin', level: 'Fluent' },
    { name: 'Spanish', level: 'Conversational' },
  ],
  experienceHistory: [
    {
      company: 'TechCorp Inc.',
      position: 'Senior Frontend Developer',
      duration: '2022 - Present',
      description: 'Lead frontend development for e-commerce platform serving 1M+ users. Implemented micro-frontend architecture and improved performance by 40%.',
    },
    {
      company: 'StartupXYZ',
      position: 'Frontend Developer',
      duration: '2020 - 2022',
      description: 'Built responsive web applications using React and Redux. Collaborated with design team to implement pixel-perfect UI components.',
    },
  ],
  education: [
    {
      institution: 'University of California, Berkeley',
      degree: 'B.S. Computer Science',
      year: '2018',
    },
  ],
  certifications: [
    'AWS Certified Developer',
    'Google Analytics Certified',
    'React Professional Certificate',
  ],
  equipment: {
    computer: 'MacBook Pro M2',
    monitor: 'Dual 4K Monitors',
    internet: 'Fiber 1Gbps',
    workspace: 'Dedicated home office',
  },
};

export function CandidateDetail({ candidateId, onNavigateToScreen, onOpenModal }: CandidateDetailProps) {
  const [notes, setNotes] = useState('');
  const [isShortlisted, setIsShortlisted] = useState(false);

  const handleBackToCandidates = () => {
    onNavigateToScreen('candidates');
  };

  const handleScheduleInterview = () => {
    onOpenModal('schedule-interview');
  };

  const handleAddToShortlist = () => {
    setIsShortlisted(!isShortlisted);
    if (!isShortlisted) {
      onOpenModal('create-shortlist');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={handleBackToCandidates}
          className="flex items-center text-[#2E5E47] hover:underline transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Candidates
        </button>
      </div>

      {/* Candidate Header */}
      <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <Avatar className="h-20 w-20">
                <AvatarImage src={candidateData.avatar} alt={candidateData.name} />
                <AvatarFallback className="text-lg">{candidateData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{candidateData.name}</h1>
                <p className="text-lg text-gray-600">{candidateData.title}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {candidateData.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {candidateData.timezone}
                  </div>
                  <Badge className="bg-[#2E5E47] text-white">
                    {candidateData.matchScore}% Match
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-gray-600" />
                <span className="text-lg font-semibold">${candidateData.hourlyRate}/hr</span>
              </div>
              <Badge 
                className={candidateData.availability === 'Available' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
              >
                {candidateData.availability}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle>Professional Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{candidateData.summary}</p>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Languages className="h-5 w-5 mr-2" />
                    Languages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {candidateData.languages.map((lang) => (
                      <div key={lang.name} className="flex justify-between items-center">
                        <span>{lang.name}</span>
                        <Badge variant="secondary">{lang.level}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Monitor className="h-5 w-5 mr-2" />
                    Equipment & Setup
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Computer</p>
                      <p className="font-medium">{candidateData.equipment.computer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Monitor</p>
                      <p className="font-medium">{candidateData.equipment.monitor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Internet</p>
                      <p className="font-medium">{candidateData.equipment.internet}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Workspace</p>
                      <p className="font-medium">{candidateData.equipment.workspace}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="space-y-4">
              {candidateData.experienceHistory.map((exp, index) => (
                <Card key={index} className="backdrop-blur-md bg-white/80 border border-white/20 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{exp.position}</h3>
                        <p className="text-[#2E5E47] font-medium">{exp.company}</p>
                      </div>
                      <Badge variant="outline">{exp.duration}</Badge>
                    </div>
                    <p className="text-gray-700">{exp.description}</p>
                  </CardContent>
                </Card>
              ))}

              <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent>
                  {candidateData.education.map((edu, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{edu.degree}</p>
                        <p className="text-gray-600">{edu.institution}</p>
                      </div>
                      <Badge variant="outline">{edu.year}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {candidateData.certifications.map((cert) => (
                      <Badge key={cert} variant="secondary">{cert}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="space-y-4">
              <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle>Technical Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {candidateData.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-gray-600">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle>Tools & Technologies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {candidateData.tools.map((tool) => (
                      <Badge key={tool} variant="secondary">{tool}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-4">
              <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-lg">
                <CardHeader>
                  <CardTitle>Work Samples</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="h-32 bg-gray-200 rounded mb-2" />
                        <h4 className="font-medium mb-1">Project {item}</h4>
                        <p className="text-sm text-gray-600">Sample project description...</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Action Panel */}
        <div className="space-y-4">
          <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-lg sticky top-4">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className={`w-full ${isShortlisted ? 'bg-[#E4B063]' : 'bg-[#2E5E47]'} hover:opacity-90`}
                onClick={handleAddToShortlist}
              >
                <Star className="h-4 w-4 mr-2" />
                {isShortlisted ? 'Remove from Shortlist' : 'Add to Shortlist'}
              </Button>
              
              <Button variant="outline" className="w-full">
                <Share className="h-4 w-4 mr-2" />
                Share Profile
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleScheduleInterview}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Interview
              </Button>
              
              <Button variant="outline" className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-md bg-white/80 border border-white/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Private Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add your private notes about this candidate..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-24"
              />
              <Button size="sm" className="mt-2 w-full bg-[#2E5E47] hover:bg-[#2E5E47]/90">
                Save Notes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}