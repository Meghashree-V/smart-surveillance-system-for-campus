
import React, { useState, useEffect } from 'react';
import { addSubjectTeacher, addClassCoordinator, getAllClassCoordinators, getAllSubjectTeachers } from '../lib/firestoreHelpers.js';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { UserPlus, Edit, Trash2, Mail, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: 'cc' | 'teacher';
  department: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  lastLogin?: string;
  passwordChanged: boolean;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);

  // Fetch all users from Firestore
  const fetchUsers = async () => {
    try {
      const [ccs, teachers] = await Promise.all([
        getAllClassCoordinators(),
        getAllSubjectTeachers()
      ]);
      // Add role property to each user
      const ccUsers = ccs.map(u => ({ ...u, role: 'cc' as const }));
      const teacherUsers = teachers.map(u => ({ ...u, role: 'teacher' as const }));
      setUsers([...ccUsers, ...teacherUsers]);
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to fetch users from Firestore.', variant: 'destructive' });
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    name: '',
    email: '',
    role: 'cc' as 'cc' | 'teacher',
    department: '',
    tempPassword: '',
    semester: '',
    subject: '',
    subjectCode: ''
  });

  const { toast } = useToast();

  const generateTempPassword = () => {
    const password = Math.random().toString(36).slice(-8);
    setNewUser(prev => ({ ...prev, tempPassword: password }));
  };

  

const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newUser.username || !newUser.name || !newUser.email || !newUser.department || !newUser.tempPassword || (newUser.role === 'teacher' && (!newUser.semester || !newUser.subject || !newUser.subjectCode))) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      if (newUser.role === 'teacher') {
        await addSubjectTeacher({
          username: newUser.username,
          name: newUser.name,
          email: newUser.email,
          role: 'teacher',
          department: newUser.department,
          tempPassword: newUser.tempPassword,
          semester: newUser.semester,
          subject: newUser.subject,
          subjectCode: newUser.subjectCode
        });
      } else {
        await addClassCoordinator({
          username: newUser.username,
          name: newUser.name,
          email: newUser.email,
          role: 'cc',
          department: newUser.department,
          tempPassword: newUser.tempPassword
        });
      }
      toast({
        title: "User Created Successfully",
        description: `Account created for ${newUser.name} and stored in Firestore.`,
      });
      setNewUser({
        username: '',
        name: '',
        email: '',
        role: 'cc',
        department: '',
        tempPassword: '',
        semester: '',
        subject: '',
        subjectCode: ''
      });
      setIsCreateDialogOpen(false);
      // Refresh users from Firestore
      fetchUsers();
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to create user in Firestore.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    toast({
      title: "User Deleted",
      description: "User account has been removed from the system",
    });
  };

  const handleResetPassword = (userId: string) => {
    const tempPassword = Math.random().toString(36).slice(-8);
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: 'pending' as const, passwordChanged: false }
        : user
    ));
    
    toast({
      title: "Password Reset",
      description: `New temporary password sent to user's email: ${tempPassword}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage Class Coordinators and Subject Teachers</CardDescription>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="w-4 h-4 mr-2" />
                Create User
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New User</DialogTitle>
                <DialogDescription>
                  Create a new Class Coordinator or Subject Teacher account
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={newUser.username}
                    onChange={(e) => setNewUser(prev => ({...prev, username: e.target.value}))}
                    placeholder="e.g., cc001"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser(prev => ({...prev, name: e.target.value}))}
                    placeholder="e.g., Dr. John Smith"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser(prev => ({...prev, email: e.target.value}))}
                    placeholder="john.smith@college.edu"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={newUser.role} onValueChange={(value) => setNewUser(prev => ({...prev, role: value as 'cc' | 'teacher'}))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cc">Class Coordinator</SelectItem>
                      <SelectItem value="teacher">Subject Teacher</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {newUser.role === 'teacher' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="semester">Semester</Label>
                      <Input
                        id="semester"
                        value={newUser.semester}
                        onChange={e => setNewUser(prev => ({...prev, semester: e.target.value}))}
                        placeholder="e.g., 5"
                        required={newUser.role === 'teacher'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={newUser.subject}
                        onChange={e => setNewUser(prev => ({...prev, subject: e.target.value}))}
                        placeholder="e.g., Data Structures"
                        required={newUser.role === 'teacher'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subjectCode">Subject Code</Label>
                      <Input
                        id="subjectCode"
                        value={newUser.subjectCode}
                        onChange={e => setNewUser(prev => ({...prev, subjectCode: e.target.value}))}
                        placeholder="e.g., CS501"
                        required={newUser.role === 'teacher'}
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="department">Department/Branch</Label>
                  <Select value={newUser.department} onValueChange={(value) => setNewUser(prev => ({...prev, department: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Mechanical">Mechanical</SelectItem>
                      <SelectItem value="Civil">Civil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tempPassword">Temporary Password</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="tempPassword"
                      type={showPassword ? "text" : "password"}
                      value={newUser.tempPassword}
                      onChange={(e) => setNewUser(prev => ({...prev, tempPassword: e.target.value}))}
                      placeholder="Temporary password"
                      required
                    />
                    <Button type="button" variant="outline" size="sm" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button type="button" variant="outline" size="sm" onClick={generateTempPassword}>
                      Generate
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button type="submit" className="flex-1">Create User</Button>
                  <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.username}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {user.role === 'cc' ? 'Class Coordinator' : 'Subject Teacher'}
                  </Badge>
                </TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(user.status)}>
                    {user.status}
                  </Badge>
                  {!user.passwordChanged && (
                    <p className="text-xs text-orange-600 mt-1">Password change required</p>
                  )}
                </TableCell>
                <TableCell>
                  {user.lastLogin ? (
                    <span className="text-sm">{user.lastLogin}</span>
                  ) : (
                    <span className="text-sm text-gray-400">Never</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline">
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleResetPassword(user.id)}
                    >
                      <Mail className="w-3 h-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
