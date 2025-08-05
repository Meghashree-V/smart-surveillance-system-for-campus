
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Upload, FileText, Camera, LogOut, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SubjectDetail from '@/components/SubjectDetail';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState(null);
  
  const [attendanceData] = useState([
    { subject: 'Machine Learning', date: '2024-01-15', status: 'Present', time: '09:00 AM', percentage: 91 },
    { subject: 'Web Technologies', date: '2024-01-15', status: 'Absent', time: '11:00 AM', percentage: 78 },
    { subject: 'Mobile Computing', date: '2024-01-14', status: 'Present', time: '02:00 PM', percentage: 95 },
    { subject: 'Software Engineering', date: '2024-01-14', status: 'Present (Event)', time: '09:00 AM', percentage: 88 },
  ]);

  const [eventRequests] = useState([
    {
      id: 1,
      eventName: 'Tech Conference 2024',
      subject: 'Software Engineering',
      date: '2024-01-14',
      status: 'approved',
      submittedDate: '2024-01-10'
    },
    {
      id: 2,
      eventName: 'Industry Workshop',
      subject: 'Database Systems',
      date: '2024-01-20',
      status: 'pending',
      submittedDate: '2024-01-15'
    },
    {
      id: 3,
      eventName: 'Research Seminar',
      subject: 'Machine Learning',
      date: '2024-01-12',
      status: 'rejected',
      submittedDate: '2024-01-08',
      reason: 'Insufficient documentation provided'
    }
  ]);

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('username');
    navigate('/');
  };

  const todaysClasses = [
    { subject: 'Machine Learning', time: '09:00 AM', room: 'Lab 301', faculty: 'Dr. Smith' },
    { subject: 'Web Technologies', time: '11:00 AM', room: 'Room 205', faculty: 'Prof. Johnson' },
    { subject: 'Mobile Computing', time: '02:00 PM', room: 'Lab 102', faculty: 'Dr. Wilson' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-800';
      case 'Absent': return 'bg-red-100 text-red-800';
      case 'Present (Event)': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 85) return 'text-green-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (selectedSubject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 p-4">
        <div className="max-w-7xl mx-auto">
          <SubjectDetail 
            subject={selectedSubject} 
            onBack={() => setSelectedSubject(null)} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Student Dashboard</h1>
              <p className="text-slate-600">Welcome back, John Doe (1MS20CS001)</p>
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
            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Today's Classes
                </CardTitle>
                <CardDescription>January 16, 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaysClasses.map((class_, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-800">{class_.subject}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {class_.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {class_.room}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500 mt-1">{class_.faculty}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Attendance with Subject Details */}
            <Card>
              <CardHeader>
                <CardTitle>Subject-wise Attendance</CardTitle>
                <CardDescription>Click on any subject to view detailed attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {attendanceData.map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                         onClick={() => setSelectedSubject(record.subject)}>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-medium text-slate-800">{record.subject}</h4>
                          <Badge className={getStatusColor(record.status)}>
                            {record.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <span>Latest: {record.date} at {record.time}</span>
                          <span className={`font-medium ${getPercentageColor(record.percentage)}`}>
                            {record.percentage}% attendance
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Event Attendance Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Event Attendance Requests
                </CardTitle>
                <CardDescription>Status of your submitted event attendance requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {eventRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-medium text-slate-800">{request.eventName}</h4>
                            <Badge className={getEventStatusColor(request.status)}>
                              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="text-sm text-slate-600 space-y-1">
                            <p><strong>Subject:</strong> {request.subject}</p>
                            <p><strong>Event Date:</strong> {request.date}</p>
                            <p><strong>Submitted:</strong> {request.submittedDate}</p>
                            {request.status === 'rejected' && request.reason && (
                              <p className="text-red-600"><strong>Reason:</strong> {request.reason}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button 
                    className="w-full" 
                    onClick={() => navigate('/event-request')}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Submit New Request
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Attendance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">This Week</span>
                    <span className="font-semibold">85%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">This Month</span>
                    <span className="font-semibold">92%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Overall</span>
                    <span className="font-semibold text-green-600">88%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subject Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Subject Summary</CardTitle>
                <CardDescription>Quick overview of all subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {attendanceData.map((subject, index) => (
                    <div key={index} className="flex justify-between items-center p-2 rounded border">
                      <span className="text-sm font-medium text-slate-700">{subject.subject}</span>
                      <span className={`text-sm font-semibold ${getPercentageColor(subject.percentage)}`}>
                        {subject.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Face Recognition Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Face Recognition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Camera className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-sm text-green-600 font-medium">Active & Verified</p>
                  <p className="text-xs text-slate-500 mt-1">Face data is up to date</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
