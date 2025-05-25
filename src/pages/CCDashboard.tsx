
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Upload, Users, Calendar, Phone, Search, LogOut, FileSpreadsheet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const CCDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  const [students] = useState([
    { usn: '1MS20CS001', name: 'John Doe', semester: '6', section: 'A', branch: 'CSE', parentPhone: '+91 9876543210' },
    { usn: '1MS20CS002', name: 'Jane Smith', semester: '6', section: 'A', branch: 'CSE', parentPhone: '' },
    { usn: '1MS20CS003', name: 'Mike Johnson', semester: '6', section: 'A', branch: 'CSE', parentPhone: '+91 9876543211' },
    { usn: '1MS20CS004', name: 'Sarah Wilson', semester: '6', section: 'A', branch: 'CSE', parentPhone: '+91 9876543212' },
  ]);

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('username');
    navigate('/');
  };

  const handleTimetableUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast({
        title: "Timetable Uploaded",
        description: "Timetable has been successfully processed and students have been mapped to subjects.",
      });
    }
  };

  const updateParentPhone = (usn: string, phone: string) => {
    toast({
      title: "Parent Contact Updated",
      description: `Parent phone number updated for ${usn}`,
    });
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.usn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Class Coordinator Dashboard</h1>
              <p className="text-slate-600">CSE - 6th Semester Section A</p>
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
            {/* Student Management */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Student Management
                    </CardTitle>
                    <CardDescription>Manage student information and parent contacts</CardDescription>
                  </div>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <Input
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStudents.map((student) => (
                    <div key={student.usn} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium text-slate-800">{student.name}</h3>
                            <Badge variant="outline">{student.usn}</Badge>
                          </div>
                          <div className="text-sm text-slate-600 mb-3">
                            {student.branch} • Semester {student.semester} • Section {student.section}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Label htmlFor={`phone-${student.usn}`} className="text-sm font-medium">
                              Parent Phone:
                            </Label>
                            <Input
                              id={`phone-${student.usn}`}
                              placeholder="Enter parent's phone number"
                              defaultValue={student.parentPhone}
                              className="max-w-xs"
                              onBlur={(e) => {
                                if (e.target.value !== student.parentPhone) {
                                  updateParentPhone(student.usn, e.target.value);
                                }
                              }}
                            />
                            {student.parentPhone && (
                              <Badge className="bg-green-100 text-green-800">
                                <Phone className="w-3 h-3 mr-1" />
                                Added
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
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
                <CardTitle>Class Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Total Students</span>
                    <span className="font-semibold">45</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Parent Contacts Added</span>
                    <span className="font-semibold text-green-600">38</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Pending Contacts</span>
                    <span className="font-semibold text-orange-600">7</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Average Attendance</span>
                    <span className="font-semibold">87%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timetable Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Timetable Management
                </CardTitle>
                <CardDescription>Upload and manage class timetables</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                  <FileSpreadsheet className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                  <p className="text-sm text-slate-600 mb-3">
                    Upload timetable file (CSV/Excel)
                  </p>
                  <label htmlFor="timetable-upload" className="cursor-pointer">
                    <Button type="button" variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                    <input
                      id="timetable-upload"
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleTimetableUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                
                <div className="text-xs text-slate-500">
                  <p className="font-medium mb-1">Required columns:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Day, Time, Subject, Faculty</li>
                    <li>Semester, Branch, Section</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-slate-600">Timetable updated for Week 3</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-slate-600">3 parent contacts added</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-slate-600">Attendance review pending</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CCDashboard;
