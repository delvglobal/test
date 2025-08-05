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
import { Progress } from '../ui/progress';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { LoadingButton } from '../ui/loading-button';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Download,
  Users,
  Clock,
  Database
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface BulkImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const sampleData = [
  { field: 'name', example: 'John Doe', required: true },
  { field: 'email', example: 'john.doe@email.com', required: true },
  { field: 'title', example: 'Senior Frontend Developer', required: true },
  { field: 'location', example: 'San Francisco, CA', required: false },
  { field: 'hourlyRate', example: '85', required: false },
  { field: 'experience', example: '5', required: false },
  { field: 'skills', example: 'React, TypeScript, Node.js', required: false },
  { field: 'linkedin', example: 'https://linkedin.com/in/johndoe', required: false },
  { field: 'phone', example: '+1-555-123-4567', required: false },
  { field: 'availability', example: 'Available', required: false },
];

export function BulkImportModal({ open, onOpenChange }: BulkImportModalProps) {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [importResults, setImportResults] = useState({
    total: 0,
    successful: 0,
    failed: 0,
    errors: []
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      toast.success(`File "${selectedFile.name}" selected successfully`);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setStep(2);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Simulate results
    setImportResults({
      total: 150,
      successful: 142,
      failed: 8,
      errors: [
        'Row 15: Invalid email format',
        'Row 23: Missing required field "name"',
        'Row 45: Duplicate entry',
        'Row 67: Invalid phone number format',
        'Row 89: Skills field too long',
        'Row 102: Invalid experience value',
        'Row 128: Missing required field "title"',
        'Row 137: Invalid LinkedIn URL'
      ]
    });

    setLoading(false);
    setStep(3);
    
    toast.success('Import completed!', {
      description: `Successfully imported 142 out of 150 candidates.`
    });
  };

  const handleDownloadTemplate = () => {
    toast.success('Template downloaded!', {
      description: 'CSV template has been downloaded to your device.'
    });
  };

  const handleDownloadErrorReport = () => {
    toast.success('Error report downloaded!', {
      description: 'Error report has been downloaded for review.'
    });
  };

  const resetModal = () => {
    setStep(1);
    setFile(null);
    setUploadProgress(0);
    setImportResults({ total: 0, successful: 0, failed: 0, errors: [] });
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(resetModal, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Upload className="h-5 w-5 mr-2 text-[#2E5E47]" />
            Bulk Import Candidates
          </DialogTitle>
          <DialogDescription>
            Import multiple candidates from a CSV file to quickly populate your database.
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            {/* File Upload */}
            <Card className="border-dashed border-2 border-gray-300 hover:border-[#2E5E47] transition-colors">
              <CardContent className="p-8">
                <div className="text-center">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Upload CSV File</h3>
                  <p className="text-gray-600 mb-4">
                    Choose a CSV file containing candidate information. Maximum file size: 10MB.
                  </p>
                  <div className="space-y-3">
                    <Input
                      type="file"
                      accept=".csv"
                      onChange={handleFileSelect}
                      className="cursor-pointer"
                    />
                    {file && (
                      <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span>File selected: {file.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Template Download */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-blue-900 mb-2">Need a template?</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Download our CSV template to ensure your data is formatted correctly.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleDownloadTemplate}
                      className="border-blue-300 text-blue-700 hover:bg-blue-100"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Template
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Field Requirements */}
            <Card>
              <CardContent className="p-6">
                <h4 className="font-medium mb-4">CSV Field Requirements</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sampleData.map((field) => (
                    <div key={field.field} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{field.field}</span>
                          {field.required && (
                            <Badge variant="destructive" className="text-xs">Required</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{field.example}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Important Notes */}
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-orange-900 mb-2">Important Notes</h4>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• Ensure your CSV file uses UTF-8 encoding</li>
                      <li>• Multiple skills should be separated by commas</li>
                      <li>• Date fields should be in YYYY-MM-DD format</li>
                      <li>• Duplicate email addresses will be skipped</li>
                      <li>• Invalid data will be flagged for review</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="p-4 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4">
                <Database className="h-8 w-8 text-blue-600 mx-auto" />
              </div>
              <h3 className="text-lg font-medium mb-2">Processing Import</h3>
              <p className="text-gray-600 mb-6">
                We're processing your file and importing candidate data. This may take a few moments.
              </p>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Upload Progress</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
                
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Processing {file?.name}...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            {/* Results Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4 text-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-900">{importResults.successful}</p>
                  <p className="text-sm text-green-700">Successful</p>
                </CardContent>
              </Card>
              
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-4 text-center">
                  <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-red-900">{importResults.failed}</p>
                  <p className="text-sm text-red-700">Failed</p>
                </CardContent>
              </Card>
              
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-900">{importResults.total}</p>
                  <p className="text-sm text-blue-700">Total Processed</p>
                </CardContent>
              </Card>
            </div>

            {/* Error Details */}
            {importResults.errors.length > 0 && (
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-red-900">Import Errors</h4>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleDownloadErrorReport}
                      className="border-red-300 text-red-700 hover:bg-red-100"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                  </div>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {importResults.errors.map((error, index) => (
                      <div key={index} className="text-sm text-red-700 p-2 bg-red-100 rounded">
                        {error}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Success Message */}
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-green-900 mb-2">Import Completed!</h4>
                    <p className="text-sm text-green-700">
                      {importResults.successful} candidates have been successfully imported and are now available in your database.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <DialogFooter>
          {step === 1 && (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <LoadingButton 
                onClick={handleUpload}
                disabled={!file}
                className="bg-[#2E5E47] hover:bg-[#2E5E47]/90"
              >
                <Upload className="h-4 w-4 mr-2" />
                Start Import
              </LoadingButton>
            </>
          )}
          
          {step === 2 && (
            <Button variant="outline" onClick={handleClose}>
              Cancel Import
            </Button>
          )}
          
          {step === 3 && (
            <Button onClick={handleClose} className="bg-[#2E5E47] hover:bg-[#2E5E47]/90">
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}