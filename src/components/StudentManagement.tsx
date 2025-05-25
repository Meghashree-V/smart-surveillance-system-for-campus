
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Plus, Edit, Phone, Mail, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const StudentManagement = () => {
  const { toast } = useToast();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const [students] = useState([
    {
      id: 1,
      usn: '1MS20CS001',
      name: 'John Doe',
      image: '/lovable-uploads/70dbed93-5c1f-44d1-904e-0840187e2a24.png',
      semester: '6th',
      section: 'A',
      branch: 'CSE',
      email: 'john.doe@college.edu',
      phone: '+91 9876543210',
      parentDetails: {
        fatherName: 'Robert Doe',
        fatherPhone: '+91 9876543211',
        motherName: 'Mary Doe',
        motherPhone: '+91 9876543212',
        address: '123 Main St, Bangalore, Karnataka'
      }
    },
    {
      id: 2,
      usn: '1MS20CS002',
      name: 'Jane Smith',
      image: '/lovable-uploads/70dbed93-5c1f-44d1-904e-0840187e2a24.png',
      semester: '6th',
      section: 'A',
      branch: 'CSE',
      email: 'jane.smith@college.edu',
      phone: '+91 9876543213',
      parentDetails: {
        fatherName: 'William Smith',
        fatherPhone: '+91 9876543214',
        motherName: 'Sarah Smith',
        motherPhone: '+91 9876543215',
        address: '456 Oak Ave, Bangalore, Karnataka'
      }
    }
  ]);

  const handleAddParentDetails = (studentId: number) => {
    toast({
      title: "Parent Details Updated",
      description: "Parent contact information has been saved successfully.",
    });
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Student Management</h2>
          <p className="text-slate-600">Manage students and their parent contact details</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>Add student details and parent contact information</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="usn">USN</Label>
                  <Input id="usn" placeholder="1MS20CS001" />
                </div>
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Student Name" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="semester">Semester</Label>
                  <Input id="semester" placeholder="6th" />
                </div>
                <div>
                  <Label htmlFor="section">Section</Label>
                  <Input id="section" placeholder="A" />
                </div>
                <div>
                  <Label htmlFor="branch">Branch</Label>
                  <Input id="branch" placeholder="CSE" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="student@college.edu" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+91 9876543210" />
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium">Parent Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fatherName">Father's Name</Label>
                    <Input id="fatherName" placeholder="Father's Name" />
                  </div>
                  <div>
                    <Label htmlFor="fatherPhone">Father's Phone</Label>
                    <Input id="fatherPhone" placeholder="+91 9876543211" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="motherName">Mother's Name</Label>
                    <Input id="motherName" placeholder="Mother's Name" />
                  </div>
                  <div>
                    <Label htmlFor="motherPhone">Mother's Phone</Label>
                    <Input id="motherPhone" placeholder="+91 9876543212" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Complete Address" />
                </div>
              </div>
              <Button onClick={() => handleAddParentDetails(0)} className="w-full">
                Add Student
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Students List
          </CardTitle>
          <CardDescription>View and manage student information</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>USN</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={student.image} alt={student.name} />
                        <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-slate-500">{student.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{student.usn}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{student.semester} Sem, Section {student.section}</p>
                      <p className="text-slate-500">{student.branch}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4" />
                      <span>{student.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Edit Student Details</DialogTitle>
                          <DialogDescription>Update student and parent contact information</DialogDescription>
                        </DialogHeader>
                        <Tabs defaultValue="student" className="w-full">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="student">Student Info</TabsTrigger>
                            <TabsTrigger value="parent">Parent Details</TabsTrigger>
                          </TabsList>
                          <TabsContent value="student" className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>USN</Label>
                                <Input defaultValue={student.usn} />
                              </div>
                              <div>
                                <Label>Full Name</Label>
                                <Input defaultValue={student.name} />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Email</Label>
                                <Input defaultValue={student.email} />
                              </div>
                              <div>
                                <Label>Phone</Label>
                                <Input defaultValue={student.phone} />
                              </div>
                            </div>
                          </TabsContent>
                          <TabsContent value="parent" className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Father's Name</Label>
                                <Input defaultValue={student.parentDetails.fatherName} />
                              </div>
                              <div>
                                <Label>Father's Phone</Label>
                                <Input defaultValue={student.parentDetails.fatherPhone} />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Mother's Name</Label>
                                <Input defaultValue={student.parentDetails.motherName} />
                              </div>
                              <div>
                                <Label>Mother's Phone</Label>
                                <Input defaultValue={student.parentDetails.motherPhone} />
                              </div>
                            </div>
                            <div>
                              <Label>Address</Label>
                              <Input defaultValue={student.parentDetails.address} />
                            </div>
                          </TabsContent>
                        </Tabs>
                        <Button onClick={() => handleAddParentDetails(student.id)}>
                          Save Changes
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentManagement;
