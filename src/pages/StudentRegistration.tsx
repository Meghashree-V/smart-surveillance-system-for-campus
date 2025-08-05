import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Upload, Video, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    usn: '',
    semester: '',
    section: '',
    branch: '',
    password: '',
    confirmPassword: ''
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [consentAgreed, setConsentAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if it's a video file
      if (!file.type.startsWith('video/')) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a video file (MP4, MOV, AVI, etc.)",
          variant: "destructive",
        });
        return;
      }

      // Check file size (max 50MB)
      const maxSize = 50 * 1024 * 1024; // 50MB
      if (file.size > maxSize) {
        toast({
          title: "File Too Large",
          description: "Video file must be less than 50MB",
          variant: "destructive",
        });
        return;
      }

      setVideoFile(file);
      
      // Create video preview URL
      const previewUrl = URL.createObjectURL(file);
      setVideoPreview(previewUrl);
      
      toast({
        title: "Video Uploaded Successfully",
        description: `Face recognition video "${file.name}" uploaded successfully`,
      });
    }
  };

  const removeVideo = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
    setVideoFile(null);
    setVideoPreview(null);
    
    // Reset the file input
    const fileInput = document.getElementById('video-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!videoFile) {
      toast({
        title: "Video Required",
        description: "Please upload a face video for registration. This is mandatory for attendance tracking.",
        variant: "destructive",
      });
      return;
    }

    if (!consentAgreed) {
      toast({
        title: "Consent Required",
        description: "Please agree to the face data usage terms",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate video processing and registration
    setTimeout(() => {
      toast({
        title: "Registration Successful",
        description: "Your account has been created with face recognition data. You can now login.",
      });
      
      // Clean up video preview URL
      if (videoPreview) {
        URL.revokeObjectURL(videoPreview);
      }
      
      navigate('/');
      setIsLoading(false);
    }, 3000); // Longer timeout to simulate video processing
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Student Registration</h1>
            <p className="text-slate-600">Create your account for the Campus Surveillance System</p>
          </div>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Registration Form</CardTitle>
            <CardDescription>
              Fill in your details to register for the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="usn">USN (University Seat Number)</Label>
                  <Input
                    id="usn"
                    value={formData.usn}
                    onChange={(e) => handleInputChange('usn', e.target.value)}
                    placeholder="e.g., 1MS20CS001"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Select value={formData.semester} onValueChange={(value) => handleInputChange('semester', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                        <SelectItem key={sem} value={sem.toString()}>
                          Semester {sem}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="section">Section</Label>
                  <Select value={formData.section} onValueChange={(value) => handleInputChange('section', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent>
                      {['A', 'B', 'C', 'D'].map(section => (
                        <SelectItem key={section} value={section}>
                          Section {section}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="branch">Branch</Label>
                  <Select value={formData.branch} onValueChange={(value) => handleInputChange('branch', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CSE">Computer Science Engineering</SelectItem>
                      <SelectItem value="ECE">Electronics & Communication</SelectItem>
                      <SelectItem value="ME">Mechanical Engineering</SelectItem>
                      <SelectItem value="Civil">Civil Engineering</SelectItem>
                      <SelectItem value="EEE">Electrical Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Create a password"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Face Recognition Video <span className="text-red-500">*</span>
                  </Label>
                  
                  {!videoFile ? (
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <Video className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                      <div className="space-y-2">
                        <p className="text-sm text-slate-600 font-medium">
                          Upload a short video of your face (Required)
                        </p>
                        <p className="text-xs text-slate-500">
                          Move your head slowly left and right for better recognition accuracy
                        </p>
                        <p className="text-xs text-slate-400">
                          Supported formats: MP4, MOV, AVI • Max size: 50MB
                        </p>
                        <div className="flex items-center justify-center">
                          <label htmlFor="video-upload" className="cursor-pointer">
                            <Button type="button" variant="outline" className="mt-2">
                              <Upload className="w-4 h-4 mr-2" />
                              Choose Video File
                            </Button>
                            <input
                              id="video-upload"
                              type="file"
                              accept="video/*"
                              onChange={handleVideoUpload}
                              className="hidden"
                              required
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center text-green-600">
                          <Check className="w-4 h-4 mr-2" />
                          <span className="text-sm font-medium">Video uploaded successfully</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={removeVideo}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-slate-600">
                          <strong>File:</strong> {videoFile.name}
                        </p>
                        <p className="text-sm text-slate-600">
                          <strong>Size:</strong> {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                        
                        {videoPreview && (
                          <div className="mt-3">
                            <p className="text-xs text-slate-500 mb-2">Preview:</p>
                            <video
                              src={videoPreview}
                              controls
                              className="w-full max-w-sm h-32 object-cover rounded border"
                              preload="metadata"
                            >
                              Your browser does not support video preview.
                            </video>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="consent"
                    checked={consentAgreed}
                    onCheckedChange={(checked) => setConsentAgreed(checked as boolean)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="consent"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the use of my face data
                    </Label>
                    <p className="text-xs text-slate-500">
                      Your face data will be used for attendance tracking and campus security purposes only.
                      This data will be securely stored and not shared with third parties.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading || !videoFile}
              >
                {isLoading ? 'Processing Video & Creating Account...' : 'Register'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentRegistration;
