
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Camera, Clock, Users, Settings, Play, Pause, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CaptureSession {
  id: string;
  classroom: string;
  subject: string;
  startTime: string;
  endTime: string;
  interval: number;
  isActive: boolean;
  captureCount: number;
  detectedStudents: string[];
}

const ClassroomCapture = () => {
  const [sessions, setSessions] = useState<CaptureSession[]>([]);
  const [newSession, setNewSession] = useState({
    classroom: '',
    subject: '',
    startTime: '',
    endTime: '',
    interval: 20
  });
  const [isConfiguring, setIsConfiguring] = useState(false);
  const { toast } = useToast();

  // Simulate active capture sessions
  useEffect(() => {
    const mockSessions: CaptureSession[] = [
      {
        id: '1',
        classroom: 'Room 101',
        subject: 'Data Structures',
        startTime: '09:00',
        endTime: '10:00',
        interval: 15,
        isActive: true,
        captureCount: 3,
        detectedStudents: ['1MS20CS001', '1MS20CS002', '1MS20CS003']
      },
      {
        id: '2',
        classroom: 'Room 102',
        subject: 'Database Management',
        startTime: '10:00',
        endTime: '11:00',
        interval: 20,
        isActive: false,
        captureCount: 0,
        detectedStudents: []
      }
    ];
    setSessions(mockSessions);
  }, []);

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newSession.classroom || !newSession.subject || !newSession.startTime || !newSession.endTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const session: CaptureSession = {
      id: Date.now().toString(),
      ...newSession,
      isActive: false,
      captureCount: 0,
      detectedStudents: []
    };

    setSessions(prev => [...prev, session]);
    setNewSession({
      classroom: '',
      subject: '',
      startTime: '',
      endTime: '',
      interval: 20
    });
    setIsConfiguring(false);

    toast({
      title: "Session Created",
      description: `Classroom capture session for ${newSession.subject} has been configured`,
    });
  };

  const toggleSession = (sessionId: string) => {
    setSessions(prev => prev.map(session => {
      if (session.id === sessionId) {
        const updatedSession = { ...session, isActive: !session.isActive };
        
        if (updatedSession.isActive) {
          // Simulate starting capture
          setTimeout(() => {
            setSessions(current => current.map(s => 
              s.id === sessionId 
                ? { ...s, captureCount: s.captureCount + 1, detectedStudents: [...s.detectedStudents, `1MS20CS00${s.captureCount + 4}`] }
                : s
            ));
          }, 2000);
        }
        
        return updatedSession;
      }
      return session;
    }));

    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      toast({
        title: session.isActive ? "Session Stopped" : "Session Started",
        description: `Classroom capture for ${session.subject} is now ${session.isActive ? 'inactive' : 'active'}`,
      });
    }
  };

  const resetSession = (sessionId: string) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, captureCount: 0, detectedStudents: [], isActive: false }
        : session
    ));

    toast({
      title: "Session Reset",
      description: "Capture data has been cleared",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Classroom Image Capture</h2>
          <p className="text-slate-600">Configure and monitor automated attendance capture sessions</p>
        </div>
        <Button 
          onClick={() => setIsConfiguring(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Settings className="w-4 h-4 mr-2" />
          New Session
        </Button>
      </div>

      {isConfiguring && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800">Configure New Capture Session</CardTitle>
            <CardDescription>
              Set up automated image capture for a classroom with configurable time intervals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateSession} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="classroom">Classroom</Label>
                  <Select value={newSession.classroom} onValueChange={(value) => setNewSession(prev => ({...prev, classroom: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select classroom" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Room 101">Room 101</SelectItem>
                      <SelectItem value="Room 102">Room 102</SelectItem>
                      <SelectItem value="Room 103">Room 103</SelectItem>
                      <SelectItem value="Lab 201">Lab 201</SelectItem>
                      <SelectItem value="Lab 202">Lab 202</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={newSession.subject}
                    onChange={(e) => setNewSession(prev => ({...prev, subject: e.target.value}))}
                    placeholder="e.g., Data Structures"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={newSession.startTime}
                    onChange={(e) => setNewSession(prev => ({...prev, startTime: e.target.value}))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={newSession.endTime}
                    onChange={(e) => setNewSession(prev => ({...prev, endTime: e.target.value}))}
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="interval">Capture Interval (minutes)</Label>
                  <Select value={newSession.interval.toString()} onValueChange={(value) => setNewSession(prev => ({...prev, interval: parseInt(value)}))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Every 5 minutes</SelectItem>
                      <SelectItem value="10">Every 10 minutes</SelectItem>
                      <SelectItem value="15">Every 15 minutes</SelectItem>
                      <SelectItem value="20">Every 20 minutes</SelectItem>
                      <SelectItem value="30">Every 30 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-slate-500">
                    The system will automatically capture and analyze student presence at these intervals
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Create Session
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsConfiguring(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {sessions.map((session) => (
          <Card key={session.id} className={`${session.isActive ? 'border-green-200 bg-green-50' : 'border-slate-200'}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    {session.classroom} - {session.subject}
                    <Badge variant={session.isActive ? "default" : "secondary"} className={session.isActive ? "bg-green-600" : ""}>
                      {session.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {session.startTime} - {session.endTime} • Every {session.interval} minutes
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={session.isActive ? "destructive" : "default"}
                    size="sm"
                    onClick={() => toggleSession(session.id)}
                  >
                    {session.isActive ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                    {session.isActive ? "Stop" : "Start"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => resetSession(session.id)}
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Reset
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{session.captureCount}</div>
                  <div className="text-sm text-slate-600">Captures</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{session.detectedStudents.length}</div>
                  <div className="text-sm text-slate-600">Students Detected</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{session.interval}m</div>
                  <div className="text-sm text-slate-600">Interval</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {session.isActive ? <Clock className="w-6 h-6 mx-auto animate-pulse" /> : <Clock className="w-6 h-6 mx-auto" />}
                  </div>
                  <div className="text-sm text-slate-600">Status</div>
                </div>
              </div>

              {session.detectedStudents.length > 0 && (
                <div className="mt-4">
                  <Label className="text-sm font-medium text-slate-700">Recently Detected Students:</Label>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {session.detectedStudents.slice(-5).map((usn, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {usn}
                      </Badge>
                    ))}
                    {session.detectedStudents.length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{session.detectedStudents.length - 5} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {sessions.length === 0 && !isConfiguring && (
        <Card className="text-center py-8">
          <CardContent>
            <Camera className="w-12 h-12 mx-auto text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">No Capture Sessions</h3>
            <p className="text-slate-500 mb-4">Create your first classroom capture session to start monitoring attendance</p>
            <Button onClick={() => setIsConfiguring(true)} className="bg-blue-600 hover:bg-blue-700">
              <Settings className="w-4 h-4 mr-2" />
              Create Session
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClassroomCapture;
