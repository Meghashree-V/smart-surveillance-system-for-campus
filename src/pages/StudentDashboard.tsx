
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Upload, FileText, Camera, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [attendanceData] = useState([
    { subject: 'Data Structures', date: '2024-01-15', status: 'Present', time: '09:00 AM' },
    { subject: 'Computer Networks', date: '2024-01-15', status: 'Absent', time: '11:00 AM' },
    { subject: 'Database Systems', date: '2024-01-14', status: 'Present', time: '02:00 PM' },
    { subject: 'Software Engineering', date: '2024-01-14', status: 'Present (Event)', time: '09:00 AM' },
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

            {/* Recent Attendance */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Attendance</CardTitle>
                <CardDescription>Your attendance records from the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {attendanceData.map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-800">{record.subject}</h4>
                        <div className="flex items-center gap-2 mt-1 text-sm text-slate-600">
                          <span>{record.date}</span>
                          <span>•</span>
                          <span>{record.time}</span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(record.status)}>
                        {record.status}
                      </Badge>
                    </div>
                  ))}
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

            {/* Event Attendance Request */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Event Attendance
                </CardTitle>
                <CardDescription>Submit request for event or seminar attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  onClick={() => navigate('/event-request')}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Submit Request
                </Button>
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
