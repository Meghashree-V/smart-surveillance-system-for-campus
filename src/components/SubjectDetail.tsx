
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, TrendingUp, AlertTriangle } from 'lucide-react';

interface SubjectDetailProps {
  subject: string;
  onBack: () => void;
}

const SubjectDetail = ({ subject, onBack }: SubjectDetailProps) => {
  const [attendanceData] = useState({
    subject: subject,
    totalClasses: 45,
    attended: 41,
    percentage: 91,
    canMiss: 1,
    upcomingClasses: [
      { date: '2024-01-17', time: '09:00 AM', topic: 'Neural Networks', room: 'Lab 301' },
      { date: '2024-01-19', time: '11:00 AM', topic: 'Deep Learning', room: 'Lab 301' },
      { date: '2024-01-22', time: '09:00 AM', topic: 'CNN Architecture', room: 'Lab 301' },
    ],
    recentAttendance: [
      { date: '2024-01-15', status: 'Present', time: '09:00 AM', topic: 'Supervised Learning' },
      { date: '2024-01-12', status: 'Present', time: '09:00 AM', topic: 'Unsupervised Learning' },
      { date: '2024-01-10', status: 'Absent', time: '09:00 AM', topic: 'Data Preprocessing' },
      { date: '2024-01-08', status: 'Present', time: '09:00 AM', topic: 'Feature Engineering' },
      { date: '2024-01-05', status: 'Present', time: '09:00 AM', topic: 'Introduction to ML' },
    ]
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-800';
      case 'Absent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 85) return 'text-green-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h2 className="text-2xl font-bold">{subject}</h2>
          <p className="text-slate-600">Detailed attendance overview</p>
        </div>
      </div>

      {/* Attendance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceData.totalClasses}</div>
            <p className="text-xs text-slate-500">Conducted so far</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Classes Attended</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceData.attended}</div>
            <p className="text-xs text-slate-500">Out of {attendanceData.totalClasses}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Attendance %</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getPercentageColor(attendanceData.percentage)}`}>
              {attendanceData.percentage}%
            </div>
            <p className="text-xs text-slate-500">Current percentage</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Can Miss</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{attendanceData.canMiss}</div>
            <p className="text-xs text-slate-500">More classes</p>
          </CardContent>
        </Card>
      </div>

      {/* Alert for low attendance */}
      {attendanceData.percentage < 75 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">Low Attendance Warning</span>
            </div>
            <p className="text-red-700 mt-1">
              Your attendance is below 75%. You cannot miss any more classes.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Attendance */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Attendance</CardTitle>
            <CardDescription>Your attendance record for the last 5 classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {attendanceData.recentAttendance.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-800">{record.topic}</h4>
                    <div className="flex items-center gap-2 mt-1 text-sm text-slate-600">
                      <Calendar className="w-4 h-4" />
                      <span>{record.date}</span>
                      <Clock className="w-4 h-4" />
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

        {/* Upcoming Classes */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
            <CardDescription>Next scheduled classes for this subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {attendanceData.upcomingClasses.map((class_, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-800">{class_.topic}</h4>
                    <div className="flex items-center gap-2 mt-1 text-sm text-slate-600">
                      <Calendar className="w-4 h-4" />
                      <span>{class_.date}</span>
                      <Clock className="w-4 h-4" />
                      <span>{class_.time}</span>
                    </div>
                    <p className="text-sm text-slate-500">{class_.room}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Attendance Progress
          </CardTitle>
          <CardDescription>Visual representation of your attendance trend</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Progress towards 75% minimum</span>
              <span>{attendanceData.percentage}% / 75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${attendanceData.percentage >= 75 ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ width: `${Math.min(attendanceData.percentage, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
              <span>0%</span>
              <span>75% (Minimum)</span>
              <span>100%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubjectDetail;
