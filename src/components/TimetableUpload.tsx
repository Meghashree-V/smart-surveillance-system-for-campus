
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, Check, X, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TimetableEntry {
  day: string;
  time: string;
  subject: string;
  faculty: string;
  semester: string;
  branch: string;
  section: string;
}

interface StudentMapping {
  usn: string;
  name: string;
  semester: string;
  branch: string;
  section: string;
  mappedSubjects: string[];
}

const TimetableUpload = () => {
  const [timetableData, setTimetableData] = useState<TimetableEntry[]>([]);
  const [studentMappings, setStudentMappings] = useState<StudentMapping[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  // Mock student data
  const mockStudents: StudentMapping[] = [
    {
      usn: '1MS20CS001',
      name: 'John Doe',
      semester: '5',
      branch: 'CSE',
      section: 'A',
      mappedSubjects: []
    },
    {
      usn: '1MS20CS002',
      name: 'Jane Smith',
      semester: '5',
      branch: 'CSE',
      section: 'A',
      mappedSubjects: []
    },
    {
      usn: '1MS20CS003',
      name: 'Mike Johnson',
      semester: '5',
      branch: 'CSE',
      section: 'B',
      mappedSubjects: []
    }
  ];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ];

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload an Excel (.xlsx, .xls) or CSV file",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate file processing
    setTimeout(() => {
      // Mock parsed timetable data
      const mockTimetable: TimetableEntry[] = [
        {
          day: 'Monday',
          time: '09:00-10:00',
          subject: 'Data Structures',
          faculty: 'Dr. Smith',
          semester: '5',
          branch: 'CSE',
          section: 'A'
        },
        {
          day: 'Monday',
          time: '10:00-11:00',
          subject: 'Database Management',
          faculty: 'Prof. Wilson',
          semester: '5',
          branch: 'CSE',
          section: 'A'
        },
        {
          day: 'Tuesday',
          time: '09:00-10:00',
          subject: 'Operating Systems',
          faculty: 'Dr. Brown',
          semester: '5',
          branch: 'CSE',
          section: 'B'
        }
      ];

      setTimetableData(mockTimetable);
      
      // Map students to subjects
      const mappedStudents = mockStudents.map(student => {
        const relevantSubjects = mockTimetable
          .filter(entry => 
            entry.semester === student.semester && 
            entry.branch === student.branch && 
            entry.section === student.section
          )
          .map(entry => entry.subject);
        
        return {
          ...student,
          mappedSubjects: relevantSubjects
        };
      });

      setStudentMappings(mappedStudents);
      setUploadStatus('success');
      setIsProcessing(false);

      toast({
        title: "Timetable Uploaded Successfully",
        description: `Processed ${mockTimetable.length} timetable entries and mapped ${mappedStudents.length} students`,
      });
    }, 2000);
  };

  const downloadTemplate = () => {
    const csvContent = "Day,Time,Subject,Faculty,Semester,Branch,Section\nMonday,09:00-10:00,Data Structures,Dr. Smith,5,CSE,A\nMonday,10:00-11:00,Database Management,Prof. Wilson,5,CSE,A";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'timetable_template.csv');
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Timetable Upload</CardTitle>
          <CardDescription>
            Upload timetable files to automatically map students to their subject schedules
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Label htmlFor="timetable-file">Upload Timetable File</Label>
              <Input
                id="timetable-file"
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
                disabled={isProcessing}
                className="mt-2"
              />
              <p className="text-sm text-gray-500 mt-1">
                Supported formats: Excel (.xlsx, .xls) or CSV
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <Button
                variant="outline"
                onClick={downloadTemplate}
                disabled={isProcessing}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Template
              </Button>
              {uploadStatus === 'success' && (
                <Badge className="bg-green-100 text-green-800">
                  <Check className="w-3 h-3 mr-1" />
                  Upload Successful
                </Badge>
              )}
              {uploadStatus === 'error' && (
                <Badge className="bg-red-100 text-red-800">
                  <X className="w-3 h-3 mr-1" />
                  Upload Failed
                </Badge>
              )}
            </div>
          </div>

          {isProcessing && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-sm text-gray-600 mt-2">Processing timetable...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {timetableData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Timetable</CardTitle>
            <CardDescription>
              {timetableData.length} entries processed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Faculty</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Section</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timetableData.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{entry.day}</TableCell>
                    <TableCell>{entry.time}</TableCell>
                    <TableCell className="font-medium">{entry.subject}</TableCell>
                    <TableCell>{entry.faculty}</TableCell>
                    <TableCell>{entry.semester}</TableCell>
                    <TableCell>{entry.branch}</TableCell>
                    <TableCell>{entry.section}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {studentMappings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Student-Subject Mapping</CardTitle>
            <CardDescription>
              Students automatically mapped to their relevant subjects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>USN</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Mapped Subjects</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentMappings.map((student) => (
                  <TableRow key={student.usn}>
                    <TableCell className="font-medium">{student.usn}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>
                      {student.semester} Sem {student.branch} - {student.section}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {student.mappedSubjects.map((subject, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                        {student.mappedSubjects.length === 0 && (
                          <span className="text-sm text-gray-500">No subjects mapped</span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TimetableUpload;
