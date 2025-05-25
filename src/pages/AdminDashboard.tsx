
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Users, Camera, Settings, BarChart3, AlertTriangle, LogOut, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UserManagement from '@/components/UserManagement';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('username');
    navigate('/');
  };

  const systemStats = {
    totalStudents: 1250,
    totalTeachers: 45,
    totalCCs: 12,
    activeCameras: 15,
    systemUptime: '99.8%',
    todayAttendance: '87%'
  };

  const recentAlerts = [
    { id: 1, type: 'warning', message: 'Camera 3 (Classroom 301) offline for 2 hours', time: '2 hours ago' },
    { id: 2, type: 'info', message: 'Bulk attendance notification sent to 45 parents', time: '3 hours ago' },
    { id: 3, type: 'error', message: 'Face recognition service temporarily down', time: '5 hours ago' },
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
              <p className="text-slate-600">Campus Surveillance System Control Panel</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="system">System Settings</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* System Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-slate-800">{systemStats.totalStudents}</p>
                      <p className="text-sm text-slate-600">Total Students</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-slate-800">{systemStats.totalTeachers}</p>
                      <p className="text-sm text-slate-600">Teachers</p>
                    </div>
                    <Shield className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-slate-800">{systemStats.activeCameras}</p>
                      <p className="text-sm text-slate-600">Active Cameras</p>
                    </div>
                    <Camera className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-slate-800">{systemStats.systemUptime}</p>
                      <p className="text-sm text-slate-600">System Uptime</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-slate-800">{systemStats.todayAttendance}</p>
                      <p className="text-sm text-slate-600">Today's Attendance</p>
                    </div>
                    <Users className="w-8 h-8 text-cyan-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-slate-800">{systemStats.totalCCs}</p>
                      <p className="text-sm text-slate-600">Class Coordinators</p>
                    </div>
                    <Settings className="w-8 h-8 text-indigo-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - System Alerts */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-500" />
                      System Alerts
                    </CardTitle>
                    <CardDescription>Recent system notifications and alerts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentAlerts.map((alert) => (
                        <div key={alert.id} className={`border rounded-lg p-4 ${getAlertColor(alert.type)}`}>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-medium">{alert.message}</p>
                              <p className="text-sm opacity-75 mt-1">{alert.time}</p>
                            </div>
                            <Badge variant="outline" className="capitalize">
                              {alert.type}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Quick Actions */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>System administration tools</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => setActiveTab('users')}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      User Management
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Camera className="w-4 h-4 mr-2" />
                      Camera Management
                    </Button>
                    <Button className="w-full" variant="outline">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      System Reports
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      System Settings
                    </Button>
                  </CardContent>
                </Card>

                {/* System Status */}
                <Card>
                  <CardHeader>
                    <CardTitle>System Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Face Recognition Service</span>
                        <Badge className="bg-green-100 text-green-800">Running</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Database</span>
                        <Badge className="bg-green-100 text-green-800">Connected</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Notification Service</span>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">Backup System</span>
                        <Badge className="bg-yellow-100 text-yellow-800">Scheduled</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure system-wide settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">System settings interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>System Reports</CardTitle>
                <CardDescription>Generate and view comprehensive system reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Reporting interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
