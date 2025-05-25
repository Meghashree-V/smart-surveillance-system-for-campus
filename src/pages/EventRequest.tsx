
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Upload, FileText, Camera, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const EventRequest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    eventName: '',
    eventDate: '',
    eventTime: '',
    venue: '',
    description: '',
    affectedSubject: ''
  });
  
  const [permissionLetter, setPermissionLetter] = useState<File | null>(null);
  const [eventSelfie, setEventSelfie] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (type: 'permission' | 'selfie', file: File | null) => {
    if (file) {
      if (type === 'permission') {
        if (file.type.includes('pdf') || file.type.includes('image')) {
          setPermissionLetter(file);
          toast({
            title: "Permission Letter Uploaded",
            description: "Permission letter uploaded successfully",
          });
        } else {
          toast({
            title: "Invalid File Type",
            description: "Please upload a PDF or image file",
            variant: "destructive",
          });
        }
      } else {
        if (file.type.includes('image')) {
          setEventSelfie(file);
          toast({
            title: "Event Selfie Uploaded",
            description: "Event selfie uploaded successfully",
          });
        } else {
          toast({
            title: "Invalid File Type",
            description: "Please upload an image file",
            variant: "destructive",
          });
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!permissionLetter || !eventSelfie) {
      toast({
        title: "Missing Documents",
        description: "Please upload both permission letter and event selfie",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate request submission
    setTimeout(() => {
      toast({
        title: "Request Submitted",
        description: "Your event attendance request has been submitted for review",
      });
      navigate('/student-dashboard');
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/student-dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Event Attendance Request</h1>
            <p className="text-slate-600">Submit your request for event/seminar attendance</p>
          </div>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
            <CardDescription>
              Provide details about the event you're attending instead of your scheduled class
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eventName">Event Name</Label>
                  <Input
                    id="eventName"
                    value={formData.eventName}
                    onChange={(e) => handleInputChange('eventName', e.target.value)}
                    placeholder="e.g., Tech Conference 2024"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="affectedSubject">Affected Subject</Label>
                  <Input
                    id="affectedSubject"
                    value={formData.affectedSubject}
                    onChange={(e) => handleInputChange('affectedSubject', e.target.value)}
                    placeholder="e.g., Software Engineering"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventDate">Event Date</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => handleInputChange('eventDate', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventTime">Event Time</Label>
                  <Input
                    id="eventTime"
                    type="time"
                    value={formData.eventTime}
                    onChange={(e) => handleInputChange('eventTime', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="venue">Venue</Label>
                  <Input
                    id="venue"
                    value={formData.venue}
                    onChange={(e) => handleInputChange('venue', e.target.value)}
                    placeholder="Event venue/location"
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Event Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Brief description of the event and its relevance to your studies"
                    rows={3}
                  />
                </div>
              </div>

              <div className="space-y-6">
                {/* Permission Letter Upload */}
                <div className="space-y-2">
                  <Label>Permission Letter</Label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                    <FileText className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                    <p className="text-sm text-slate-600 mb-3">
                      Upload official permission letter (PDF or Image)
                    </p>
                    <label htmlFor="permission-upload" className="cursor-pointer">
                      <Button type="button" variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        Choose File
                      </Button>
                      <input
                        id="permission-upload"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload('permission', e.target.files?.[0] || null)}
                        className="hidden"
                      />
                    </label>
                    {permissionLetter && (
                      <div className="flex items-center justify-center mt-2 text-green-600">
                        <Check className="w-4 h-4 mr-1" />
                        <span className="text-sm">Uploaded: {permissionLetter.name}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Event Selfie Upload */}
                <div className="space-y-2">
                  <Label>Event Selfie</Label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                    <Camera className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                    <p className="text-sm text-slate-600 mb-3">
                      Upload a selfie taken at the event venue for identity confirmation
                    </p>
                    <label htmlFor="selfie-upload" className="cursor-pointer">
                      <Button type="button" variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Image
                      </Button>
                      <input
                        id="selfie-upload"
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload('selfie', e.target.files?.[0] || null)}
                        className="hidden"
                      />
                    </label>
                    {eventSelfie && (
                      <div className="flex items-center justify-center mt-2 text-green-600">
                        <Check className="w-4 h-4 mr-1" />
                        <span className="text-sm">Uploaded: {eventSelfie.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-800 mb-2">Important Notes:</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Ensure the event timing conflicts with your scheduled class</li>
                  <li>• The permission letter must be from authorized personnel</li>
                  <li>• Take the selfie at the actual event venue for verification</li>
                  <li>• Submit this request before the event for proper approval</li>
                </ul>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? 'Submitting Request...' : 'Submit Request'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventRequest;
