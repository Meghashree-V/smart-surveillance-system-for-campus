
import React, { useEffect, useState } from 'react';
import AutoMarkedAttendanceSection from '../components/AutoMarkedAttendanceSection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CheckCircle, XCircle, Clock, Users, FileText, LogOut, AlertCircle, Edit, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const TeacherDashboard = () => {
  // Get teacher username from localStorage (or auth context)
  const [teacherUsername] = useState(() => localStorage.getItem('username') || '');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [pendingAttendance, setPendingAttendance] = useState([
    { 
      usn: '1MS20CS001', 
      name: 'John Doe', 
      subject: 'Data Structures', 
      date: '2024-01-16', 
      entryTime: '8:45 AM', 
      status: 'pending',
      image: '/lovable-uploads/70dbed93-5c1f-44d1-904e-0840187e2a24.png',
      currentStatus: null
    },
    { 
      usn: '1MS20CS003', 
      name: 'Mike Johnson', 
      subject: 'Data Structures', 
      date: '2024-01-16', 
      entryTime: '8:50 AM', 
      status: 'pending',
      image: '/lovable-uploads/70dbed93-5c1f-44d1-904e-0840187e2a24.png',
      currentStatus: null
    },
    { 
      usn: '1MS20CS007', 
      name: 'Alex Brown', 
      subject: 'Computer Networks', 
      date: '2024-01-15', 
      entryTime: '10:45 AM', 
      status: 'pending',
      image: '/lovable-uploads/70dbed93-5c1f-44d1-904e-0840187e2a24.png',
      currentStatus: null
    },
  ]);

  const [eventRequests] = useState([
    {
      id: 1,
      usn: '1MS20CS002',
      name: 'Jane Smith',
      subject: 'Software Engineering',
      eventName: 'Tech Conference 2024',
      date: '2024-01-16',
      time: '09:00 AM',
      status: 'pending',
      image: '/lovable-uploads/70dbed93-5c1f-44d1-904e-0840187e2a24.png',
      documents: ['permission_letter.pdf', 'event_selfie.jpg']
    },
    {
      id: 2,
      usn: '1MS20CS005',
      name: 'Emily Davis',
      subject: 'Database Systems',
      eventName: 'Industry Seminar',
      date: '2024-01-15',
      time: '11:00 AM',
      status: 'pending',
      image: '/lovable-uploads/70dbed93-5c1f-44d1-904e-0840187e2a24.png',
      documents: ['permission_letter.pdf', 'venue_photo.jpg']
    },
  ]);

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('username');
    navigate('/');
  };

  const markAttendance = (usn: string, status: 'present' | 'absent') => {
    setPendingAttendance(prev => 
      prev.map(student => 
        student.usn === usn 
          ? { ...student, currentStatus: status }
          : student
      )
    );
    
    toast({
      title: "Attendance Updated",
      description: `${usn} marked as ${status}. You can edit this later if needed.`,
    });
  };

  const editAttendance = (usn: string, newStatus: 'present' | 'absent') => {
    setPendingAttendance(prev => 
      prev.map(student => 
        student.usn === usn 
          ? { ...student, currentStatus: newStatus }
          : student
      )
    );
    
    toast({
      title: "Attendance Edited",
      description: `${usn} attendance changed to ${newStatus}`,
    });
  };

  const handleEventRequest = (id: number, action: 'approve' | 'reject') => {
    toast({
      title: `Request ${action}d`,
      description: `Event attendance request has been ${action}d`,
    });
  };

  const todaysClasses = [
    { subject: 'Data Structures', time: '09:00 AM', section: '6A CSE', room: 'Room 301' },
    { subject: 'Computer Networks', time: '11:00 AM', section: '6B CSE', room: 'Lab 205' },
    { subject: 'Software Engineering', time: '02:00 PM', section: '6A CSE', room: 'Room 301' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Teacher Dashboard</h1>
              <p className="text-slate-600">Prof. Dr. John Smith - Computer Science Department</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pending Attendance Review */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  Attendance Review Required
                </CardTitle>
                <CardDescription>
                  Students who entered campus but were not detected in class
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingAttendance.map((student, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-orange-50">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-4 flex-1">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={student.image} alt={student.name} />
                            <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-medium text-slate-800">{student.name}</h3>
                              <Badge variant="outline">{student.usn}</Badge>
                              {student.currentStatus && (
                                <Badge className={student.currentStatus === 'present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                  Marked: {student.currentStatus}
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-slate-600 space-y-1">
                              <p><strong>Subject:</strong> {student.subject}</p>
                              <p><strong>Date:</strong> {student.date}</p>
                              <p><strong>Gate Entry:</strong> {student.entryTime}</p>
                              <p className="text-orange-600">
                                <Clock className="w-4 h-4 inline mr-1" />
                                Not detected in classroom
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          {!student.currentStatus ? (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => markAttendance(student.usn, 'present')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Present
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => markAttendance(student.usn, 'absent')}
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Absent
                              </Button>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm" variant="outline">
                                    <Edit className="w-4 h-4 mr-1" />
                                    Edit
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Edit Attendance</DialogTitle>
                                    <DialogDescription>
                                      Change attendance status for {student.name} ({student.usn})
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                      <Avatar>
                                        <AvatarImage src={student.image} alt={student.name} />
                                        <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="font-medium">{student.name}</p>
                                        <p className="text-sm text-slate-600">{student.usn} • {student.subject}</p>
                                        <p className="text-sm text-slate-500">{student.date} at {student.entryTime}</p>
                                      </div>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button
                                        onClick={() => editAttendance(student.usn, 'present')}
                                        className={student.currentStatus === 'present' ? 'bg-green-600' : 'bg-gray-300'}
                                      >
                                        Mark Present
                                      </Button>
                                      <Button
                                        onClick={() => editAttendance(student.usn, 'absent')}
                                        variant={student.currentStatus === 'absent' ? 'destructive' : 'outline'}
                                      >
                                        Mark Absent
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Event Attendance Requests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Event Attendance Requests
                </CardTitle>
                <CardDescription>Review and approve event/seminar attendance requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {eventRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-4 flex-1">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={request.image} alt={request.name} />
                            <AvatarFallback>{request.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-medium text-slate-800">{request.name}</h3>
                              <Badge variant="outline">{request.usn}</Badge>
                            </div>
                            <div className="text-sm text-slate-600 space-y-1">
                              <p><strong>Event:</strong> {request.eventName}</p>
                              <p><strong>Subject:</strong> {request.subject}</p>
                              <p><strong>Date & Time:</strong> {request.date} at {request.time}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span><strong>Documents:</strong></span>
                                {request.documents.map((doc, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {doc}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            onClick={() => handleEventRequest(request.id, 'approve')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleEventRequest(request.id, 'reject')}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Auto-Marked Attendance Section */}
            <AutoMarkedAttendanceSection teacherUsername={teacherUsername} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Today's Classes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Today's Classes
                </CardTitle>
                <CardDescription>January 16, 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todaysClasses.map((class_, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <h4 className="font-medium text-slate-800">{class_.subject}</h4>
                      <div className="text-sm text-slate-600 mt-1">
                        <p>{class_.time} • {class_.room}</p>
                        <p>{class_.section}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Pending Reviews</span>
                    <Badge className="bg-orange-100 text-orange-800">3</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Event Requests</span>
                    <Badge className="bg-blue-100 text-blue-800">2</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Classes Today</span>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Average Attendance</span>
                    <span className="font-semibold text-green-600">89%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    View All Students
                  </Button>
                  <Button className="w-full" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Attendance Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
